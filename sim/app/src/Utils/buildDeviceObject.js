import initializeBlock from './initializeBlock';
import buildBlockToolboxXML from './buildBlockToolboxXML';

export default (options) => {
    if (!options.familyId) throw new Error('FamilyId is required');
    if (!options.translations) throw new Error('Translations are required');
    if (!options.deviceInfo) throw new Error('DeviceInfo is required');

    var familyId = options.familyId;
    var translations = options.translations;
    var deviceInfo = options.deviceInfo;
    var Controller = deviceInfo.Controller;
    var VirtualController = deviceInfo.VirtualController;
    var getBlocksConfig = deviceInfo.getBlocksConfig;
    var deviceId = `${options.familyId}_${deviceInfo.id}`;

    return {
        getDeviceName: (language) =>
            (translations[language] || translations['en'])[deviceInfo.id + '_Name'],
        deviceId: deviceId,
        deviceSimpleId: deviceInfo.id,
        meta: deviceInfo.meta || {},
        initializeBlocks: (Blockly, getVariablesOfType, getMessage, language) => {
            var blocksConfig = getBlocksConfig(
                `${familyId}_${deviceInfo.id}`,
                deviceInfo.meta
            );
            var deviceXML = ``;
            var deviceSyncFunctions = [];
            var deviceAsyncFunctions = [];
            var deviceEvents = [];

            function processBlocks(blocks, categoryNameKey, options) {
                if (blocks && blocks.length > 0) {
                    deviceXML = `${deviceXML}\n<category name="${getMessage(
                        categoryNameKey
                    )}" colour="${options.categoryColour || 0}">\n`;
                    blocks.forEach((block) => {
                        initializeBlock(
                            Blockly,
                            translations[language] || translations['en'],
                            () => getVariablesOfType(deviceId),
                            Object.assign({}, options, block)
                        );

                        // Add to the xml used to display the toolbox.
                        if (!block.hideFromToolbox) {
                            deviceXML = `${deviceXML}\n<block isDeviceBlock="true" type="${
                                block.id
                            }">\n${buildBlockToolboxXML(block.args)}\n</block>`;
                        }

                        // If the block has a single event, add it to deviceEvents.
                        if (block.event) {
                            deviceEvents.push(block.event);
                        }

                        // If the block has multiple events, add them to deviceEvents.
                        if (block.eventOptions) {
                            if (block.eventOptions.length === 1) {
                                block.eventOptions[0].forEach((options) =>
                                    deviceEvents.push(options[1])
                                );
                            } else if (block.eventOptions.length === 2) {
                                var events = [];
                                var eventPrefixes = [];
                                block.eventOptions[0].forEach((options) =>
                                    eventPrefixes.push(options[1])
                                );
                                block.eventOptions[1].forEach((options) => {
                                    eventPrefixes.forEach((prefix) =>
                                        events.push(prefix + options[1])
                                    );
                                });
                                events.forEach((event) => deviceEvents.push(event));
                            } else {
                                console.warn(
                                    'Unsupported block eventOptions length: ' +
                                        block.eventOptions.length
                                );
                            }
                        }

                        // If the block has a single function, add it to the appropriate
                        // array of device functions.
                        if (block.function) {
                            if (block.isAsync) {
                                deviceAsyncFunctions.push(block.function);
                            } else {
                                deviceSyncFunctions.push(block.function);
                            }
                        }

                        // If the block has multiple functions, add them to the appropriate
                        // array of device functions
                        if (block.functions) {
                            if (block.isAsync) {
                                deviceAsyncFunctions = deviceAsyncFunctions.concat(
                                    block.functions
                                );
                            } else {
                                deviceSyncFunctions = deviceSyncFunctions.concat(
                                    block.functions
                                );
                            }
                        }

                        // If the block is an event block, add the "wait until" block
                        // unless the block specifies not to include a "wait until"
                        if (options.type === 'event' && !block.noWaitUntil) {
                            var waitBlockOptions = Object.assign({}, options, block, {
                                id: `${block.id}_Wait`,
                                type: 'wait',
                            });
                            initializeBlock(
                                Blockly,
                                translations[language] || translations['en'],
                                () => getVariablesOfType(deviceId),
                                waitBlockOptions
                            );
                            deviceXML = `${deviceXML}\n<block type="${waitBlockOptions.id}">\n</block>`;
                        }
                    });

                    deviceXML = `${deviceXML}\n</category>`;
                }
            }

            processBlocks(
                blocksConfig.eventBlocks,
                'toolboxCategoryEvents',
                blocksConfig.eventBlockOptions
            );
            processBlocks(
                blocksConfig.actionBlocks,
                'toolboxCategoryActions',
                blocksConfig.actionBlockOptions
            );
            processBlocks(
                blocksConfig.valueBlocks,
                'toolboxCategoryValues',
                blocksConfig.valueBlockOptions
            );

            return {
                toolboxXml: deviceXML,
                events: deviceEvents,
                syncFunctions: deviceSyncFunctions.filter(
                    (item, pos) => deviceSyncFunctions.indexOf(item) == pos
                ),
                asyncFunctions: deviceAsyncFunctions.filter(
                    (item, pos) => deviceAsyncFunctions.indexOf(item) == pos
                ),
            };
        },
        Controller: Controller,
        VirtualController: VirtualController,
    };
};
