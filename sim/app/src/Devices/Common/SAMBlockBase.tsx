import React from 'react'
import getSAMBlockColorFilter from './SamBlockColorFilter'

export default (props: {
    onPointerDown?: () => void,
    onPointerUp?: () => void,
    color: {
        r: number,
        g: number,
        b: number
    },
    childComponents: {
        xViewBox: number,
        yViewBox: number,
        component: JSX.Element
        hidden?: boolean
    }[]
}) => {
    const samBlockColorFilter = getSAMBlockColorFilter(props)
    return (
        <svg viewBox="0 0 108.639 84.459"
            onPointerDown={props.onPointerDown}
            onPointerUp={props.onPointerUp}
            onPointerLeave={props.onPointerUp}
            style={{
                width: '100%',
                maxWidth: '150px',
                overflow: 'visible',
                cursor: props.onPointerDown ? 'pointer' : '',
            }}
        >
            {samBlockColorFilter.filterComponent}
            <g
                id="SAM_Block_Base"
                filter={samBlockColorFilter.filterName}
            >
                <path style={{
                    fill: 'none',
                }} d="M54.455,84.459c-2.043,0-3.978-0.491-5.593-1.42L4.163,57.229C1.562,55.742,0,53.173,0,50.366V34.062
        c0-2.765,1.587-5.318,4.164-6.82L48.573,1.443C50.159,0.515,52.157,0,54.188,0c2.018,0,4.009,0.508,5.606,1.43l44.695,25.803
        c2.602,1.511,4.149,4.076,4.149,6.867v16.305c0,2.765-1.59,5.316-4.172,6.813L60.062,83.031
        C58.455,83.955,56.47,84.459,54.455,84.459z"/>
                <path style={{
                    fill: '#D6D7D9',
                }} d="M102.415,34.094l-0.05,16.301c0,0.51-0.34,1.029-1.012,1.42l-44.4,25.809
        c-1.359,0.781-3.589,0.781-4.949,0L7.306,51.814c-0.682-0.391-1.031-0.92-1.031-1.441l0.051-16.299c0-0.52,0.34-1.041,1.01-1.43
        L51.744,6.844c1.35-0.789,3.58-0.789,4.95,0l44.691,25.801C102.074,33.043,102.415,33.574,102.415,34.094z"/>
                <path style={{
                    fill: '#FFFFFF',
                }} d="M101.36,32.645c1.367,0.789,1.372,2.08,0.015,2.869L56.973,61.316c-1.357,0.789-3.583,0.789-4.95,0
        L7.331,35.514c-1.367-0.789-1.375-2.08-0.018-2.869L51.715,6.842c1.358-0.789,3.587-0.789,4.951,0L101.36,32.645z"/>
                <path style={{
                    fill: '#333333',
                }} d="M54.212,6.252c0.897,0,1.798,0.197,2.482,0.592l44.691,25.801c0.688,0.398,1.029,0.93,1.029,1.449
        l-0.05,16.301c0,0.51-0.34,1.029-1.012,1.42l-44.4,25.809c-0.68,0.391-1.577,0.586-2.475,0.586s-1.795-0.195-2.475-0.586
        L7.306,51.814c-0.682-0.391-1.031-0.92-1.031-1.441l0.051-16.299c0-0.52,0.34-1.041,1.01-1.43L51.744,6.844
        C52.419,6.449,53.314,6.252,54.212,6.252 M54.212,4.002c-1.331,0-2.611,0.318-3.603,0.898L6.204,30.698
        c-1.354,0.785-2.129,2.016-2.129,3.376L4.024,50.365c0,1.377,0.787,2.613,2.162,3.4l44.692,25.806
        c0.998,0.573,2.274,0.888,3.6,0.888c1.326,0,2.603-0.314,3.597-0.886l44.409-25.813c1.354-0.788,2.131-2.015,2.131-3.365
        l0.05-16.295c0-1.375-0.785-2.613-2.154-3.404L57.819,4.895C56.819,4.318,55.538,4.002,54.212,4.002L54.212,4.002z"/>
            </g>
            {props.childComponents.map((child,index) => (
                <g key={index} style={{
                    // This translation is because I'm combining svgs and they have different viewBoxes.
                    // Its just half the difference between the two.
                    transform: `translate(${(108.639 - child.xViewBox) / 2}px, ${(84.459 - child.yViewBox) / 2}px)`,
                }}>{child.hidden ? null : child.component}</g>
            ))}
        </svg>
    )
}