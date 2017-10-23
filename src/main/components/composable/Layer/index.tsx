import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  RenderingTarget,
  DataSubscriber,
  Group,
  Rect,
} from '../../../../main'

export type Props = {
  target?: RenderingTarget,
  children?: JSX.Element | JSX.Element[],
}

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
    this.notifySubscriberOfData(this.structureData)
  }

  componentDidUpdate() {
    this.notifySubscriberOfData(this.structureData)
  }

  private dataSubscriber: DataSubscriber = (data: any) => {}

  subscribeToData = (dataSubscriber: DataSubscriber) => {
    this.dataSubscriber = dataSubscriber
  }

  notifySubscriberOfData = (data: any): void => {
    this.dataSubscriber(data)
  }

  onMouseMove = (event: React.MouseEvent<HTMLElement>): boolean => {
    // TODO: Traverse local layer tree, detect if event is to be handled and handle it
    this.notifySubscriberOfData(this.structureData)
    return false
  }

  structureData: any

  render() {
    const { width, height, subscribeToEvents } = this.context
    subscribeToEvents(this.onMouseMove)
    const {
      target = this.context.target,
    } = this.props
    const { subscribeToData } = this
    const implicitGroupForLayer = (
      <Group children={this.props.children} />
    )
    this.structureData = extractStructure(implicitGroupForLayer)
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

function extractStructure(element: JSX.Element): any {
  // React primitive
  if (typeof element.type === 'string') {
    throw new Error('React primitives are not valid in Bullseye')
  }
  // Bullseye Rect
  if (element.type === Rect) {
    const instance: any = element.type.call({}, element.props)
    const { x, y, width, height } = instance.mutableState
    return { type: 'Rect', x, y, width, height, meta: { element, instance } }
  }
  // Bullseye Group
  if (element.type === Group) {
    const instance = element.type.call({}, element.props)
    const children = instance.mutableState.children.map(extractStructure)
    const { x, y } = instance.mutableState
    return { type: 'Group', children, x, y, meta: { element, instance } }
  }
  // React Component class
  if (element.type.prototype && element.type.prototype.isReactComponent) {
    const Component = (element.type as { new(...args: any[]): any })
    const instance = new Component(element.props)
    const children = [extractStructure(instance.render.call(instance))]
    return { type: 'Component', children, x: 0, y: 0, meta: { element, instance, isClass: true } }
  }
  // Functional stateless component (?)
  const children = [extractStructure(element.type.call(null, element.props))]
  return { type: 'Component', children, x: 0, y: 0, meta: { element, isClass: false } }
}
