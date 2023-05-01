var getArgument = (Blockly, block, argumentName, argumentType) => {
    switch(argumentType) {
    case 'any':
    case 'array':
    case 'number':
    case 'value':
    case 'color':
    case 'string':
        return Blockly.JavaScript.valueToCode(block, argumentName)
    case 'drop_down':
    case 'icon_picker':
        return block.getFieldValue(argumentName)
    case 'date_time':
        return 'new Date(\'' + block.getFieldValue(argumentName) + '\')'
    case 'dynamic_list':
        if(!block.getDynamicListInputNames) return ''
        var listInputNames = block.getDynamicListInputNames(argumentName)
        // This should only ever happen when the dynamic list is inside of a drop down
        // field revealer, and has been shown and then hidden.
        if(!listInputNames) return ''
        var list = listInputNames
            .map(argumentName => getArgument(Blockly, block, argumentName, 'any') || 'null')
        // Remove the last item because it is always empty, by definition
        list.pop()

        return '[' + list.join(', ') + ']'
    case 'drop_down_field_revealer':
        var dropDownFieldRevealer = block.dropDownFieldRevealers.find((f) => f.argumentName === argumentName)
        var inputValues = dropDownFieldRevealer.fields
            .map((field, index) =>
                getArgument(Blockly, block, dropDownFieldRevealer.name + '_' + index, field.type)
                || field.javascriptDefault)
            // If field.javascriptDefault is set to null, then whenever the field isn't used don't include it
            // in the generated javascript.
            .filter((javascriptString) => javascriptString !== null)

        if(!inputValues.length && dropDownFieldRevealer.javascriptDefault) {
            inputValues.push(dropDownFieldRevealer.javascriptDefault)
        }

        if(!inputValues.length) {
            console.warn('Empty input values when build drop down field revealer javascript')
        }

        return inputValues.join(', ')
    default:
        console.warn(`Unknown argument type ${argumentType}`)
    }
}

var buildActionBlockJS = (Blockly, blockOptions, block, deviceVariableName) => {
    var args = blockOptions.args.map((arg, index) => {
        var argumentName

        argumentName = `argument_${index}`

        return getArgument(Blockly, block, argumentName, arg.type)
    })

    // TODO the parrot drone utilizes leaving function undefined and making the first
    // argument the function name. I don't think this is very clear, but thats an example
    // of where this is used.
    var deviceFunction = blockOptions.function || args.shift()

    if(Blockly.JavaScript.includeHighlight && blockOptions.isAsync) {
        args.push(`"${block.id}"`)
    }

    return `${deviceVariableName}.${deviceFunction}(${args.join(', ')});\n`
}

var buildValueBlockJS = (Blockly, blockOptions, block, deviceVariableName) => {
    var args = (blockOptions.args || []).map((arg, index) => {
        var argumentName

        argumentName = `argument_${index}`

        return getArgument(Blockly, block, argumentName, arg.type)
    })

    if(blockOptions.getFunction) {
        return [`${deviceVariableName}.${blockOptions.getFunction(...args)}(${(Blockly.JavaScript.includeHighlight && blockOptions.isAsync) ? `"${block.id}"` : ''})`]
    }

    if(Blockly.JavaScript.includeHighlight && blockOptions.isAsync) {
        args.push(`"${block.id}"`)
    }

    return [`${deviceVariableName}.${blockOptions.function}(${args.join(', ')})`]
}

var buildEventBlockJS = (Blockly, blockOptions, block, deviceVariableName) => {
    var statement = Blockly.JavaScript.statementToCode(block, 'STATEMENT')
    var args
    if(blockOptions.eventOptions) {
        args = blockOptions.eventOptions.map((eventOptions, index) => block.getFieldValue(`EVENT_${index}`))
    }
    else {
        args = [blockOptions.event]
    }

    if(Blockly.JavaScript.includeHighlight) {

        return `${deviceVariableName}.on("${args.join('')}", function() {\n${statement}}, "${block.id}");\n`
    }

    return `${deviceVariableName}.on("${args.join('')}", function() {\n${statement}});\n`
}

var buildWaitBlockJS = (Blockly, blockOptions, block, deviceVariableName) => {
    var args
    if(blockOptions.eventOptions) {
        args = blockOptions.eventOptions.map((eventOptions, index) => block.getFieldValue(`EVENT_${index}`))
    }
    else {
        args = [blockOptions.event]
    }

    if(Blockly.JavaScript.includeHighlight) {
        return `sleepUntil(${deviceVariableName}.events.${args.join('')}, "${block.id}");\n`
    }

    return `sleepUntil(${deviceVariableName}.events.${args.join('')});\n`
}

export default (Blockly, blockOptions, block) => {
    var deviceVariableId = block.getField('DEVICE').getVariableId()
    var variable = block.workspace.getVariableById(deviceVariableId)
    var deviceVariableName = Blockly.JavaScript.variableDB_.getName(variable.name, Blockly.Variables.NAME_TYPE)

    switch(blockOptions.type) {
    case 'action':
        return buildActionBlockJS(Blockly, blockOptions, block, deviceVariableName)
    case 'wait':
        return buildWaitBlockJS(Blockly, blockOptions, block, deviceVariableName)
    case 'event':
        return buildEventBlockJS(Blockly, blockOptions, block, deviceVariableName)
    case 'value':
        return buildValueBlockJS(Blockly, blockOptions, block, deviceVariableName)
    default:
        throw new Error('Invalid block type: ' + blockOptions.type)
    }
}