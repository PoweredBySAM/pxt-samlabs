import React from 'react'
import BaseController from 'src/Utils/Controllers/BaseController'
import ButtonController from 'src/SAMDevices/Animatable/Button/Controller'
import BuzzerController from 'src/SAMDevices/Animatable/Buzzer/Controller'
import DCMotorController from 'src/SAMDevices/Animatable/DCMotor/Controller'
import RGBLight from 'src/SAMDevices/Animatable/LED/Controller'
import LightSensor from 'src/SAMDevices/Animatable/LightSensor/Controller'
import Microbit from 'src/SAMDevices/Animatable/Microbit/Controller'
import PressureSensor from 'src/SAMDevices/Animatable/PresureSensor/Controller'
import ProximitySensor from 'src/SAMDevices/Animatable/ProximitySensor/Controller'
import Servo from 'src/SAMDevices/Animatable/Servo/Controller'
import Slider from 'src/SAMDevices/Animatable/Slider/Controller'
import Tilt from 'src/SAMDevices/Animatable/Tilt/Controller'
import HeatSensor from 'src/SAMDevices/Animatable/TemperatureSensor/Controller'

function useAddNewBTDevice() {
    const controllers = {
        Button: ButtonController(BaseController),
        Buzzer: BuzzerController(BaseController),
        DCMotor: DCMotorController(BaseController),
        RGBLight: RGBLight(BaseController),
        LightSensor: LightSensor(BaseController),
        Microbit,
        PressureSensor: PressureSensor(BaseController),
        ProximitySensor: ProximitySensor(BaseController),
        ServoMotor: Servo(BaseController),
        Slider: Slider(BaseController),
        Tilt: Tilt(BaseController),
        HeatSensor: HeatSensor(BaseController),
    }
    const connectBTDevice = async (device: any) => {
        const deviceIndex:keyof typeof controllers = device
        const mappedController = controllers[deviceIndex]
        console.log(device,!!mappedController,"mappedController")

        try{
            if(!mappedController) throw new Error("Device not found")
            const readyController:any = new mappedController('#000000')
            await readyController.connect((err?:any)=>{console.log(err,'success');console.log("shitttttttt")})
            return {status:"success", controller:readyController}
        }catch(error){
            return {status:"error",message:"Connection Error"}
        }  
    }
  return {connectBTDevice}
}
export default useAddNewBTDevice


