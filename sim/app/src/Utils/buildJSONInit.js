import addDynamicListMethodsToBlock from './addDynamicListMethodsToBlock'

export default (Blockly, block, blockOptions, translations) => {
    var message = translations[blockOptions.id]

    if(!message) {
        throw new Error(`You forgot to define the "${blockOptions.id}" message`)
    }

    if(!message.includes('{device}')) {
        throw new Error(`Missing {device} input in "${blockOptions.id}"`)
    }

    var jsonInit = {
        colour: blockOptions.colour,
        inputsInline: blockOptions.inputsInline == false ? false : true,
        alignRight: blockOptions.alignRight,
        mutator: 'device_selector_mutator',
    }

    // Define the arguments array for the block
    var args0 = []
    blockOptions.args.forEach((arg, index) => {
        var argumentName = `argument_${index}`
        if(arg.type === 'dynamic_list') {
            addDynamicListMethodsToBlock(Blockly, block, argumentName, arg.fieldTemplate)
            // Adds a dummy so that there is a new line for the dynamic list
            var dummyName = argumentName + '_dynamic_list_dummy'
            argumentName = argumentName + '_dynamic_list_0'
            args0.push({
                type: 'input_dummy',
                name: dummyName,
            })
        }
        switch(arg.type) {
        case 'string':
            args0.push({
                type: 'input_value',
                name: argumentName,
                check: 'String',
            })
            break
        case 'number':
            args0.push({
                type: 'input_value',
                name: argumentName,
                check: 'Number',
            })
            break
        case 'drop_down_field_revealer':
            if(!arg.name) console.warn('name property is required for drop_down_field_revealer')
            if(!arg.fields) console.warn('fields property is required for drop_down_field_revealer')
            if(!arg.revealFieldsMasks) console.warn('revealFieldsMasks property is required for drop_down_field_revealer')

            block.dropDownFieldRevealers = block.dropDownFieldRevealers || []
            block.dropDownFieldRevealers.push({
                name: arg.name,
                argumentName: argumentName,
                fields: arg.fields,
                shadowXmls: {},
                revealFieldsMasks: arg.revealFieldsMasks,
                javascriptDefault: arg.javascriptDefault,
            })
            args0.push({
                type: 'field_dropdown',
                name: argumentName,
                options: arg.options.map((option) => {
                    var text = translations[option[0]]
                    if(!text) {
                        console.warn('Missing translation for key: ' + option[0])
                    }

                    return [text, option[1]]
                }),
            })
            args0.push({
                type: 'input_dummy',
            })
            break
        case 'drop_down':
            args0.push({
                type: 'field_dropdown',
                name: argumentName,
                options: arg.options.map((option) => {
                    var text = translations[option[0]]
                    if(!text) {
                        console.warn('Missing translation for key: ' + option[0])
                    }

                    return [text, option[1]]
                }),
            })
            break
        case 'date_time':
            args0.push({
                type: 'field_date_time',
                name: argumentName,
            })
            break
        case 'icon_picker':
            args0.push({
                type: 'field_icon_picker',
                name: argumentName,
                options: arg.options.map((option) => [
                    {
                        'src': option[0],
                        'width': 50,
                        'height': 50,
                        'alt': translations[option[2]],
                    },
                    option[1],
                ]),
            })
            break
        case 'color':
            args0.push({
                type: 'input_value',
                name: argumentName,
                check: 'Colour',
            })
            break
        case 'array':
            args0.push({
                type: 'input_value',
                name: argumentName,
                check: 'Array',
            })
            break
        case 'any':
            args0.push({
                type: 'input_value',
                name: argumentName,
            })
            break
        case 'dynamic_list':
            args0.push({
                type: 'input_value',
                name: argumentName,
            })
            break
        default:
            console.warn(`Unknown argument type "${arg.type}"`)
        }
    })

    // Add the device argument.
    args0.push({
        type: 'field_input',
        name: 'DEVICE',
    })

    message = message.replace('{device}', `%${args0.length}`)

    switch(blockOptions.type) {
    case 'action':
        jsonInit.nextStatement = null
        jsonInit.previousStatement = null
        break

    case 'wait':
        jsonInit.nextStatement = null
        jsonInit.previousStatement = null
        // Intentionally no break

    // eslint-disable-line no-fallthrough
    case 'event':
        if(blockOptions.type === 'event') {
            // Append two extra arguments to the message for the dummy and statement
            message = `${message} %${args0.length + 1} %${args0.length + 2}`
            // And add the dummy and statement argument
            args0.push({
                type: 'input_dummy',
            })
            args0.push({
                type: 'input_statement',
                name: 'STATEMENT',
            })
        }

        message = message.replace('{event}', `%${args0.length}`)

        if(blockOptions.eventOptions) {
            blockOptions.eventOptions.forEach((eventOptions, index) => {
                args0.push({
                    type: 'field_dropdown',
                    name: `EVENT_${index}`,
                    options: eventOptions.map((option) => [translations[option[0]], option[1]]),
                })

                message = message.replace(`{event_${index}}`, `%${args0.length}`)
            })
        }
        break

    case 'value':
        jsonInit.output = blockOptions.output === 'Any' ? null : blockOptions.output
        break
    }

    // dynamic list fields add a dummy_input, so this is used to keep track of that..
    var extraIndexIncrementer = 0;

    // Replace all of the word place holders with %[index]
    (blockOptions.args || []).forEach((arg, index) => {
        index += extraIndexIncrementer
        if(arg.messagePlaceholder) {
            if(arg.type === 'dynamic_list') {
                message = message.replace(arg.messagePlaceholder, `%${index + 1} ${arg.fieldTemplate(0)} %${index + 2}`)
                extraIndexIncrementer++
            }
            else if(arg.type === 'drop_down_field_revealer') {
                message = message.replace(arg.messagePlaceholder, `%${index + 1} %${index + 2}`)
                extraIndexIncrementer++
            }
            else {
                message = message.replace(arg.messagePlaceholder, `%${index + 1}`)
            }
        }
    })

    if(jsonInit.alignRight) {
        args0.forEach(arg => arg.align = 'RIGHT')
    }

    jsonInit.message0 = message
    jsonInit.args0 = args0

    return jsonInit
}