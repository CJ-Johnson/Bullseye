import * as React from 'react'

export type Props = {
  x?: number,
  y?: number,
  d?: string,
}

export default class Path extends React.Component<Props, {}> {

  private x: number
  private y: number
  private d: string

  render() {
    this.x = this.props.x || 0
    this.y = this.props.y || 0
    this.d = this.props.d || ''
    return (
      <div />
    )
  }

}
