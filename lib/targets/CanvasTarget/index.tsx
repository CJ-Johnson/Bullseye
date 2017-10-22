import * as React from 'react'

export default function CanvasTarget(args: any) {
    return (
        <canvas
            ref={(...args: any[]) => console.log('Canvas is on the page!', {args})}
            width={args.width}
            height={args.height}
        />
    )
}