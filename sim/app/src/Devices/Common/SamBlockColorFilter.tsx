import React from 'react'
import {
    observer,
} from 'mobx-react'

const id = 1

const SAMBlockColorFilter = observer(({id:filterId,color}:{id:string|number,color:{ r: number; g: number; b: number }}) => (
    <filter id={'samblock-color-' + filterId} x='-75%' y='-75%' width='300%' height='300%'>
        <feMorphology
            operator='dilate'
            radius='4'
            in='SourceAlpha'
            result='thicken'
        />
        <feGaussianBlur
            stdDeviation=''
            in='thicken'
            result='blurred'
        />
        <feFlood floodColor={color ? `rgb(${color.r}, ${color.g}, ${color.b})` : ''} result='glowColor'/>
        <feComposite
            in='glowColor'
            in2='blurred'
            operator='in'
            result='ledglow_colored'
        />
        <feMerge>
            <feMergeNode in='ledglow_colored'/>
            <feMergeNode in='SourceGraphic'/>
        </feMerge>
    </filter>
))

export default ({color}:{id ?:string|number,color:{ r: number; g: number; b: number }}) => ({
    filterName: `url("#samblock-color-${id+1}")`,
    filterComponent: <SAMBlockColorFilter id={id} color={color} />
})