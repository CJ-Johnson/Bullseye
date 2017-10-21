import * as React from 'react'
import * as PropTypes from 'prop-types'

export default class Layer extends React.Component<{}, {}> {

  static contextTypes = {
    // target is the actual rendering agent
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { width, height } = this.context
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
        {this.context.target({ width, height })}
      </div>
    )
  }

}
