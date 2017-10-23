import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  RenderingTarget,
  DataSubscriber,
  Group,
  Path,
} from '../../../../main'

export type Props = {
  target?: RenderingTarget,
  children?: JSX.Element | JSX.Element[],
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
    // TODO: Traverse local layer tree, detect if event is to be handled and handle it
    this.notifySubscriberOfData(SOME_DATA)
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
    console.log(this.structureData)
    if (!(window as any).first) {
      (window as any).first = this.structureData
    } else if (!(window as any).second) {
      (window as any).second = this.structureData
    }
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
  /*
  cases
    Group
      consume (and get back the temp div)
      map over div.children against extractStructure
      return { type: 'group', x, y, children }
    Path
      return { type: 'path', x, y, d }
    React class
      consume
      recurse on result
    React primitive
      error
  */
  if (typeof element.type === 'string') {
    throw new Error('React primitives are not valid in Bullseye')
  }
  if (element.type === Path) {
    const reactData: any = element.type.call({}, element.props)
    return { type: 'path', element, reactData }
  }
  if (element.type === Group) {
    const reactData = element.type.call({}, element.props)
    const children = reactData.mutableState.children.map(extractStructure)
    return { type: 'group', element, children, reactData }
  }
  // TODO: tell difference between class that needs to be instantiated
  // and a functional stateless component
  const reactData = element.type.call({}, element.props)
  return { type: 'ReactWrapperClass', element, reactData }
}
