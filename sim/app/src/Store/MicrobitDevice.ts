class MicrobitDevice{
    constructor(deviceData: any) {
        console.log(deviceData,"deviceData")
    }

}

const device = new MicrobitDevice("Some data");
console.log(device,"device koory out put")

export default MicrobitDevice;