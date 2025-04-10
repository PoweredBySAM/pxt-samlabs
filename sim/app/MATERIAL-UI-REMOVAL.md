# Material UI Removal Guide

This document provides guidance on removing Material UI from the codebase and replacing it with Tailwind CSS.

## Progress So Far

- [x] Created CustomSlider component to replace Material UI Slider
- [x] Converted MiniMenu component to use Tailwind CSS
- [x] Converted Tilt component to use Tailwind CSS
- [x] Converted LED component to use Tailwind CSS
- [x] Converted DoubleSliderWithHOC component to use Tailwind CSS
- [x] Converted Button component to use Tailwind CSS
- [x] Converted Buzzer component to use Tailwind CSS
- [x] Converted DCMotor component to use Tailwind CSS
- [x] Converted LightSensor component to use Tailwind CSS
- [x] Converted SelectorComponent to use Tailwind CSS
- [x] Converted DeviceMenuItem to use Tailwind CSS
- [x] Converted Microbit component to use Tailwind CSS
- [x] Converted PressureSensor component to use Tailwind CSS
- [x] Converted ProximitySensor component to use Tailwind CSS
- [x] Converted Servo component to use Tailwind CSS
- [x] Converted Slider component to use Tailwind CSS
- [x] Converted TemperatureSensor component to use Tailwind CSS
- [x] Removed Material UI dependencies from package.json
- [x] Created a helper script for identifying Material UI usage

## Common Patterns for Conversion

### 1. Material UI Box to Tailwind div

```jsx
// Before
<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Component />
</Box>

// After
<div className="flex justify-center mt-8">
  <Component />
</div>
```

### 2. Material UI Typography to Tailwind div/span

```jsx
// Before
<Typography 
  variant="h6" 
  sx={{ 
    fontWeight: 400, 
    fontFamily: "Nunito",
    width: "5rem" 
  }}
>
  Text
</Typography>

// After
<div className="font-nunito font-normal text-lg w-20">
  Text
</div>
```

### 3. Material UI Slider to CustomSlider

```jsx
// Before
<Slider
  size="small"
  min={0}
  max={100}
  value={value}
  onChange={handleChange}
  sx={customStyle}
/>

// After
<CustomSlider
  size="small"
  min={0}
  max={100}
  value={value}
  onChange={(e, val) => handleChange(e, val, 0)}
/>
```

## Material UI Spacing to Tailwind Spacing

Material UI uses a spacing system where 1 unit = 8px. Here's how to convert:

| Material UI | Tailwind CSS |
|-------------|--------------|
| mt: 1       | mt-2         |
| mx: 2       | mx-4         |
| p: 3        | p-6          |
| mb: 4       | mb-8         |

## Files That Now Use Tailwind CSS

All components have been successfully converted to use Tailwind CSS:

1. ~~Components/selector/SelectorComponent.tsx~~ ✅
2. ~~Components/selector/DeviceMenuItem.tsx~~ ✅
3. ~~SAMDevices/Animatable/Button/Button.tsx~~ ✅
4. ~~SAMDevices/Animatable/Buzzer/Buzzer.tsx~~ ✅
5. ~~SAMDevices/Animatable/DCMotor/DCMotor.tsx~~ ✅
6. ~~SAMDevices/Animatable/LightSensor/LightSensor.tsx~~ ✅
7. ~~SAMDevices/Animatable/Microbit/Microbit.tsx~~ ✅
8. ~~SAMDevices/Animatable/PresureSensor/PressureSensor.tsx~~ ✅
9. ~~SAMDevices/Animatable/ProximitySensor/ProximitySensor.tsx~~ ✅
10. ~~SAMDevices/Animatable/Servo/Servo.tsx~~ ✅
11. ~~SAMDevices/Animatable/Slider/Slider.tsx~~ ✅
12. ~~SAMDevices/Animatable/TemperatureSensor/HeatSensor.tsx~~ ✅

## Next Steps

1. Run the following command to check if there are any remaining Material UI imports:
   ```bash
   grep -l -r --include="*.tsx" --include="*.ts" "from \"@mui" ./src
   ```

2. Run `npm install` after removing all Material UI dependencies to clean up your node_modules

3. Update any global styles or themes that might have been using Material UI

## Testing

Test the application thoroughly to ensure that:

1. The component renders correctly
2. All functionality works as expected
3. The styling is maintained using Tailwind CSS classes 