var getBaseArgumentName = (inputName) => {
    var parts = inputName.split('_')
    // Remove dynamic list index
    parts.pop()
    // Remove the word list
    parts.pop()
    // Remove the word dynamic
    parts.pop()

    return parts.join('_')
}

var getInputList = (block, inputName) => {
    if(!inputName.includes('_dynamic_list_')) {
        console.warn('Provided inputName is not a dynamic list: ' + inputName)

        return []
    }

    var baseArgumentName = getBaseArgumentName(inputName)
    var inputList = block.inputList.filter((input) => input.name.startsWith(baseArgumentName) && !input.name.endsWith('dummy'))

    return inputList
}

var getDummy = (block, inputName) => block.getInput(getBaseArgumentName(inputName) + '_dynamic_list_dummy')

var getFieldTemplate = (block, inputName) => block.dynamicListInputFieldTemplates[getBaseArgumentName(inputName)]

var getNextDynamicListInputName = (inputName) => {
    var parts = inputName.split('_')
    if(parts[parts.length - 1] === 'dummy') {
        parts[parts.length -1] = 0
    }
    else {
        parts[parts.length - 1] = Number(parts[parts.length - 1]) + 1
    }

    return parts.join('_')
}

var getDynamicListInputIndex = (inputName) => {
    var parts = inputName.split('_')

    return Number(parts[parts.length - 1])
}

var getDynamicListInputArgumentIndex = (baseArgumentName, inputName) => {
    var baseArgumentPartsLength = baseArgumentName.split('_').length
    var parts = inputName.split('_')

    return Number(parts[baseArgumentPartsLength - 1])
}

var isDynamicListInput = (inputName) => {
    var parts = inputName.split('_')

    return parts[parts.length - 2] === 'list' && parts[parts.length - 3] === 'dynamic'
}

var replaceArgumentIndex = (argument, newIndex) => {
    var parts = argument.split('_')
    parts[parts.length - 1] = newIndex

    return parts.join('_')
}

export default (Blockly, block, baseArgumentName, fieldTemplate, manualSetup) => {


    block.dynamicListInputFieldTemplates = block.dynamicListInputFieldTemplates || {}

    block.dynamicListInputFieldTemplates[baseArgumentName] = fieldTemplate

    // Make sure that the dynamic list that the provided inputName is a part of
    // has an empty last input.
    block.ensureDynamicListHasEmptyLastInput = (inputName) => {
        var inputList = getInputList(block, inputName)
        var lastInput = inputList.pop()
        if(lastInput.connection.isConnected()) {
            block.addDynamicListInput(getDynamicListInputArgumentIndex(baseArgumentName, inputName))
        }
    }

    // Adds a dynamic list input to the argument at the provided argument index.
    // This just adds blindly, and does no check to make sure that there is only
    // a single empty input at the end. This is important because the domToMutation
    // function uses this function when a program is loaded.
    block.addDynamicListInput = (argumentIndex) => {
        var inputName = replaceArgumentIndex(baseArgumentName, argumentIndex) + '_dynamic_list_0'
        // var inputName = 'argument_' + argumentIndex + '_dynamic_list_0'
        var inputList = getInputList(block, inputName)
        var lastInput = inputList.pop() || getDummy(block, inputName)
        var newInput = block.appendValueInput(getNextDynamicListInputName(lastInput.name))
        var fieldTemplate = getFieldTemplate(block, inputName)
        newInput.appendField(fieldTemplate(getDynamicListInputIndex(newInput.name)))
        newInput.setAlign(Blockly.ALIGN_RIGHT)

        // Move the newInput to the spot after the lastInput
        var lastInputIndex = block.inputList.indexOf(lastInput)
        block.moveNumberedInputBefore(block.inputList.length - 1, lastInputIndex + 1)

        return newInput
    }

    // Removes excessive empty inputs at the end of a dynamic list.
    block.removeTrailingDynamicListInputs = (inputName) => {
        var backwardInputsList = getInputList(block, inputName).reverse()

        // Using find because once you 'return true' it stops.
        backwardInputsList.find((input, index) => {
            // Remove all inputs until you get to one where the next one is connected or the first one.
            if(backwardInputsList[index + 1] && !backwardInputsList[index + 1].connection.isConnected()) {
                block.removeInput(input.name)
            }
            else {
                return true
            }
        })
    }

    block.getDynamicListInputNames = (baseArgumentName) => {
        var inputList = getInputList(block, baseArgumentName + '_dynamic_list_0')

        if(!inputList.length) return null

        return inputList
            .map(input => input.name)
            .filter(name => !name.endsWith('dummy'))
    }

    // When getInput is called, we can assume that the caller
    // really needs that input to exist. As long as its a dynamic list
    // input, we can make sure it exists.
    var originalBlockGetInput = block.getInput

    block.getInput = function(inputName) {
        if(isDynamicListInput(inputName)) {
            var requiredIndex = getDynamicListInputIndex(inputName)
            var lastInputIndex = getInputList(block, inputName).length - 1

            while(lastInputIndex++ < requiredIndex) {
                block.addDynamicListInput(getDynamicListInputArgumentIndex(baseArgumentName, inputName))
            }
        }

        return originalBlockGetInput.call(this, inputName)
    }

    if(manualSetup) {
        var firstInput = block.getInput(baseArgumentName + '_dynamic_list_0')
        if(!firstInput) {
            firstInput = block.addDynamicListInput(0)
        }
    }
}

