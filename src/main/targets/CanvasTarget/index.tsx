import * as React from 'react'

import {
  RenderingTargetProps,
} from '../../../main'

const CONTEXT_2D = '2d'

const rand = () => Math.floor(Math.random() * 255)
const padding = 30

export default class CanvasTarget extends React.Component<RenderingTargetProps, {}> {

  ctx: CanvasRenderingContext2D | undefined

  drawOnCanvas = (data: any): void => {
    const { ctx } = this
    console.log('Trying to draw on ', ctx)
    if (ctx) {
      ctx.fillStyle = `rgb(${rand()},${rand()},${rand()})`
      ctx.fillRect(
        padding,
        padding,
        this.props.width - (2 * padding),
        this.props.height - (2 * padding),
      )
    }
  }

  saveCtx = (canvas: HTMLCanvasElement | null): void => {
    if (canvas) {
      const ctx = canvas.getContext(CONTEXT_2D)
      if (ctx) {
        this.ctx = ctx
      }
    }
  }

  render() {
    const { width, height, subscribeToData } = this.props
    subscribeToData(this.drawOnCanvas)
    return (
      <canvas ref={this.saveCtx} width={width} height={height} />
    )
  }

}
