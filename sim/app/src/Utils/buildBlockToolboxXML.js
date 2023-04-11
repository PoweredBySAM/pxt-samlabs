var getBlockToolboxXML = (arg, index) => {
    switch(arg.type) {
    case 'array':
        return ''

    case 'string':
        return `<value name="argument_${index}">
            <shadow type="text">
                ${arg.default ? `<field name="TEXT">${arg.default}</field>` : ''}
            </shadow>
        </value>`

    case 'color':
        return `<value name="argument_${index}">
            <shadow type="colour_picker">
                ${arg.default ? `<field name="COLOUR">${arg.default}</field>` : ''}
            </shadow>
        </value>`

    case 'number':
        return `<value name="argument_${index}">
            <shadow type="math_number">
                ${arg.default ? `<field name="NUM">${arg.default}</field>` : ''}
            </shadow>
        </value>`

    case 'any':
        if(arg.default) {
            return getBlockToolboxXML({
                type: typeof arg.default,
                default: arg.default,
            }, index)
        }

        return ''

    case 'drop_down':
    case 'date_time':
    case 'icon_picker':
    case 'dynamic_list':
    case 'drop_down_field_revealer':
        // No toolbox XML for these types.
        return ''

    default:
        console.warn('unknown argument type: ' + arg.type)

        return ''
    }
}
export default (blockArguments = []) => blockArguments.map(getBlockToolboxXML).join('')