import * as React from 'react'

import {
  RenderingTarget,
  RenderingTargetArguments,
} from '../../../main'

const drawOnCanvas = (args: RenderingTargetArguments, canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to load 2d context from provided canvas element')
  }
  context.fillStyle = 'rgb(0,0,0)'
  context.fillRect(10, 20, 255, 150)
}

const CanvasTarget: RenderingTarget = (args: RenderingTargetArguments) => (
  <canvas
    ref={(canvas: HTMLCanvasElement): void => drawOnCanvas(args, canvas)}
    width={args.width}
    height={args.height}
  >
  </canvas>
)

export default CanvasTarget
