import * as React from 'react'
import * as PropTypes from 'prop-types'

export type Props = {
  x?: number,
  y?: number,
  children?: JSX.Element | JSX.Element[],
}

export default class Group extends React.Component<Props, {}> {

  private x: number
  private y: number

  render() {
    this.x = this.props.x || 0
    this.y = this.props.y || 0
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}
