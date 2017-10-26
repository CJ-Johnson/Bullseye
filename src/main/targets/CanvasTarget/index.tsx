import * as React from 'react'
import * as PropTypes from 'prop-types'

import { RenderingTargetProps } from '../../../types/target/RenderingTarget'

const CONTEXT_2D = '2d'
const rand = () => Math.floor(Math.random() * 255)
const randRGB = () => `rgb(${rand()},${rand()},${rand()})`

export type Context = {
  width: number,
  height: number,
  subscribeToRender: ((renderSubscriber: Function) => void),
}

export default class CanvasTarget extends React.Component<RenderingTargetProps, {}> {

  static contextTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    subscribeToRender: PropTypes.func.isRequired,
  }

  context: Context
  ctx: CanvasRenderingContext2D | undefined

  constructor(props: RenderingTargetProps, context: Context) {
    super(props, context)
    context.subscribeToRender(this.drawOnCanvas)
  }

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
    return <canvas ref={this.saveCtx} width={this.context.width} height={this.context.height} />
  }

}
