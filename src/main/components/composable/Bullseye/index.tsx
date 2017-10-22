import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  Layer,
  RenderingTarget,
} from '../../../../main'

export type Props = {
  target: RenderingTarget,
  width: number,
  height: number,
  children?: React.ReactElement<any> | React.ReactElement<any>[],
}

type EventSubscriber = (event: React.MouseEvent<HTMLElement>) => boolean

export default class Bullseye extends React.Component<Props, {}> {

  static propTypes = {
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static childContextTypes = {
    target: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    subscribeToEvents: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      target: this.props.target,
      width: this.props.width,
      height: this.props.height,
      subscribeToEvents: this.subscribeToEvents,
    }
  }

  private eventSubscribers: EventSubscriber[] = []

  subscribeToEvents = (eventSubscriber: EventSubscriber): void => {
    this.eventSubscribers.push(eventSubscriber)
  }

  notifySubscribersOfEvent = (event: React.MouseEvent<HTMLElement>): void => {
    const { eventSubscribers } = this
    for (let i = eventSubscribers.length - 1; i >= 0; --i) {
      const eventWasHandled = eventSubscribers[i](event)
      if (eventWasHandled) {
        break
      }
    }
  }

  render() {
    const { children } = this.props
    if (!children) {
      throw new Error('At least one Layer must be provided to Bullseye')
    }
    React.Children.forEach(children, (child: React.ReactChild, index: number): void => {
      if (
        typeof child === 'string' ||
        typeof child === 'number' ||
        child.type !== Layer
      ) {
        throw new Error('Only Layer is a valid child of Bullseye')
      }
    })
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height,
          position: 'relative',
        }}
        onMouseMove={this.notifySubscribersOfEvent}
      >
        {children}
      </div>
    )
  }

}
