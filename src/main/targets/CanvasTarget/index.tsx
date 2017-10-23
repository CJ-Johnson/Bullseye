import * as React from 'react'

import {
  RenderingTargetProps,
} from '../../../main'

const CONTEXT_2D = '2d'

const rand = () => Math.floor(Math.random() * 255)
const randRGB = () => `rgb(${rand()},${rand()},${rand()})`

export default class CanvasTarget extends React.Component<RenderingTargetProps, {}> {

  ctx: CanvasRenderingContext2D | undefined

  drawOnCanvas = (data: any): void => {
    const { ctx } = this
    console.log('drawOnCanvas', {ctx, data})
    if (!ctx) {
      return
    }
    function draw(
      treeNode: any,
      parentX: number,
      parentY: number,
    ) {
      const {
        type,
        x: myX,
        y: myY,
        width,
        height,
        children,
      } = treeNode
      const calcX = parentX + myX
      const calcY = parentX + myX
      if (type === 'Rect') {
        if (ctx) {
          ctx.fillStyle = randRGB()
          ctx.fillRect(
            calcX,
            calcY,
            width,
            height,
          )
        }
      } else {
        for(const child of treeNode.children) {
          draw(child, calcX, calcY)
        }
      }
    }
    draw(data, 0, 0)
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
