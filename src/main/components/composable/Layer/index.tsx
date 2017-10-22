import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  RenderingTarget,
} from '../../../../main'

export type Props = {
  target: RenderingTarget,
}

export default class Layer extends React.Component<Props, {}> {

  static contextTypes = {
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static propTypes = {
    target: PropTypes.func,
  }

  render() {
    const { width, height } = this.context
    const target = this.props.target || this.context.target
    return (
      <div
        style={{
          width,
          height,
          position: 'absolute',
          top: '0px',
          left: '0px',
        }}
      >
        {target({ width, height, data: {} })}
      </div>
    )
  }

}
