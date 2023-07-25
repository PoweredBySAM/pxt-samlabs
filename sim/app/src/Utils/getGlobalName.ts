export const getGlobalName = (globals:any,id ?:any):string => {
    console.log(globals,"globals,id")

    for (const key in globals) {
        console.log(globals[key],"final")

        if (globals[key]._id === id) {
            return key.split('__')[0];
        }
    }
    return '';
}