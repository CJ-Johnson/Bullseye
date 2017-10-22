import * as React from 'react'

import {
  RenderingTarget,
  RenderingTargetArguments,
} from '../../../main'

const CanvasTarget: RenderingTarget = (args: RenderingTargetArguments) => (
  <canvas
    ref={(...args: any[]) => console.log('Canvas is on the page!', {args})}
    width={args.width}
    height={args.height}
  />
)

export default CanvasTarget
