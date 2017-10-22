import * as React from 'react'
import * as PropTypes from 'prop-types'

import { RenderingTarget } from 'lib/types'
import { Layer } from 'lib'

export type Props = {
  target: RenderingTarget,
  width: number,
  height: number,
  children?: React.ReactElement<any> | React.ReactElement<any>[],
}

export default class Bullseye extends React.Component<Props, {}> {

  static propTypes = {
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: (props: Props) => {
      if (!props.children) {
        return null
      }
      const children = Array.isArray(props.children)
        ? props.children
        : [props.children]
      for (const child of children) {
        if (child.type !== Layer) {
          throw new Error('All children of Bullseye must be of type Layer')
        }
      }
      return null
    },
  }

  static childContextTypes = {
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  getChildContext() {
    return {
      target: this.props.target,
      width: this.props.width,
      height: this.props.height,
    }
  }

  render() {
    const { children } = this.props
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height,
          position: 'relative',
        }}
      >
        {children}
      </div>
    )
  }

}
