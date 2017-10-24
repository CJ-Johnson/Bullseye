import * as React from 'react'
import * as PropTypes from 'prop-types'

export type Props = {
  x?: number,
  y?: number,
  children?: JSX.Element | JSX.Element[],
}

export type MutableState = {
  x: number,
  y: number,
  children: JSX.Element[],
}

export default class Group extends React.Component<Props, {}> {

  mutableState: MutableState

  constructor(props: Props) {
    super(props)
    this.mutableState = {
      x: props.x || 0,
      y: props.y || 0,
      children: React.Children.toArray(props.children) as JSX.Element[],
    }
  }

}
