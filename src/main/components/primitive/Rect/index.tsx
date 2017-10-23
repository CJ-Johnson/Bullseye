import * as React from 'react'

export type Props = {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

export type MutableState = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export default class Path extends React.Component<Props, {}> {

  mutableState: MutableState

  constructor(props: Props) {
    super(props)
    this.mutableState = {
      x: props.x || 0,
      y: props.y || 0,
      width: props.width || 0,
      height: props.height || 0,
    }
  }

}
