import * as React from 'react'

export type Props = {
  x?: number,
  y?: number,
  d?: string,
}

export type MutableState = {
  x: number,
  y: number,
  d: string,
}

export default class Path extends React.Component<Props, {}> {

  mutableState: MutableState

  constructor(props: Props) {
    super(props)
    this.mutableState = {
      x: props.x || 0,
      y: props.y || 0,
      d: props.d || '',
    }
  }

}
