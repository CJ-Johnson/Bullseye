import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  RenderingTarget,
  DataSubscriber,
} from '../../../../main'

export type Props = {
  target?: RenderingTarget,
}

const SOME_DATA = { key: 'data from above!!!!!' }

export default class Layer extends React.Component<Props, {}> {

  static contextTypes = {
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    subscribeToEvents: PropTypes.func.isRequired,
  }

  static propTypes = {
    target: PropTypes.func,
  }

  static childContextTypes = {
    subscribeToData: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      subscribeToData: this.subscribeToData,
    }
  }

  componentDidMount() {
    this.notifySubscriberOfData(SOME_DATA)
  }

  private dataSubscriber: DataSubscriber = (data: any) => {}

  subscribeToData = (dataSubscriber: DataSubscriber) => {
    this.dataSubscriber = dataSubscriber
  }

  notifySubscriberOfData = (data: any): void => {
    this.dataSubscriber(data)
  }

  onMouseMove = (event: React.MouseEvent<HTMLElement>): boolean => {
    console.log('moved mouse :)))')
    // TODO: Traverse local layer tree, detect if event is to be handled and handle it
    this.notifySubscriberOfData(SOME_DATA)
    return false
  }

  render() {
    const { width, height, subscribeToEvents } = this.context
    subscribeToEvents(this.onMouseMove)
    const {
      target = this.context.target,
    } = this.props
    const { subscribeToData } = this
    return (
      <div
        style={{
          width,
          height,
          position: 'absolute',
          top: '0px',
          left: '0px',
          pointerEvents: 'none',
        }}
      >
        {React.createElement(target, { width, height, subscribeToData })}
      </div>
    )
  }

}
