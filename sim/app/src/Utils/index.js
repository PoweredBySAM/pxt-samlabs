import buildDeviceObject from './buildDeviceObject'

export function buildDeviceFamilyObject(options) {
    if(!options.familyId) throw new Error('FamilyId is required')
    if(!options.translations) throw new Error('Translations are required')
    if(!options.devices || !options.devices.length) throw new Error('Devices are required')

    return {
        getFamilyName: (language) => (options.translations[language] || options.translations['en'])['Family_Name'],
        familyId: options.familyId,
        devices: options.devices.map(device => buildDeviceObject(
            {
                familyId: options.familyId,
                translations: options.translations,
                deviceInfo: device,
            }
        )),
    }
}

export function parameterValidator(types, fn) {
    return (...args) => {
        types.forEach((type, index) => {
            if(!type || type === '*') return
            if(index >= args.length) return
            if(typeof args[index] !== type) throw new Error(`Invalid data of type "${typeof args[index]}", expected "${type}".`)
        })

        return fn(...args)
    }
}

