import * as React from 'react'
import * as PropTypes from 'prop-types'

export type Props = {
  target: Function,
  width: number,
  height: number,
  children?: React.ReactElement<any> | React.ReactElement<any>[],
}

export default class Bullseye extends React.Component<Props, {}> {

  static propTypes = {
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    // TODO: Only allow Layer elements for now and then maybe non layer in the future
    children: () => true,
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
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height,
          position: 'relative',
        }}
      >
        {this.props.children}
      </div>
    )
  }

}
