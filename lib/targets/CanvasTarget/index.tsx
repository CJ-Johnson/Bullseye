import * as React from 'react'

export default function CanvasTarget(args: any) {
    return (
        <canvas
            ref={(e: any): void => console.log({e})}
            width={args.width}
            height={args.height}
        />
    )
}