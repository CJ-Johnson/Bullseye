import * as React from 'react'

import {
  Instructions,
} from '../../../../main'

export type Props = {
  x?: number,
  y?: number,
  d?: Instructions.PathInstruction[],
}

export type MutableState = {
  x: number,
  y: number,
  d: Instructions.PathInstruction[],
}

export default class Path extends React.Component<Props, {}> {

  mutableState: MutableState

  constructor(props: Props) {
    super(props)
    this.mutableState = {
      x: props.x || 0,
      y: props.y || 0,
      d: props.d || [],
    }
  }

}
