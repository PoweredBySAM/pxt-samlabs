import buildJSONInit from './buildJSONInit'
import buildBlockJavaScript from './buildBlockJavaScript'

export default (Blockly, translations, getDeviceVariables, blockOptions) => {
    blockOptions.args = blockOptions.args || []

    Blockly.Blocks[blockOptions.id] = {
        init: function() {
            if(blockOptions.type === 'event') {
                this.isEntryPoint = true
            }

            this.getDeviceVariables = getDeviceVariables
            this.jsonInit(buildJSONInit(Blockly, this, blockOptions, translations))
        },
    }

    Blockly.JavaScript[blockOptions.id] = function(block) {
        return buildBlockJavaScript(Blockly, blockOptions, block)
    }
}