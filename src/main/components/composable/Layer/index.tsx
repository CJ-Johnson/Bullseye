import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import { RenderingTarget } from '../../../../types/target'
import Group from '../Group'
import {
  Draw,
  Path,
  Rect,
} from '../../primitive'
import { RenderingTreeNode } from '../../../../types/data'

export type Props = {
  target?: RenderingTarget,
  children?: JSX.Element | JSX.Element[],
}

export type Context = {
  target: RenderingTarget,
  width: number,
  height: number,
  subscribeToEvents: ((eventSubscriber: Function) => void),
}

export type State = {
  rootDiv: HTMLDivElement,
  rootGroup: React.ReactElement<Group>,
}

export default class Layer extends React.Component<Props, State> {

  context: Context
  state: State

  constructor(props: Props, context: Context) {
    super(props, context)
    const rootDiv = document.createElement('div')
    const { width, height } = context
    const children = React.Children.toArray(props.children) as JSX.Element[]
    const rootGroup = (
      <LayerRenderRoot
        initialProps={{ width, height, children }}
        subscribeToProps={this.subscribeToProps}
        subscribeToEvents={context.subscribeToEvents}
      />
    )
    this.state = { rootDiv, rootGroup }
    observeFullTree(rootDiv, convertElementTreeToRenderingTree(this.rerenderTarget))
    ReactDOM.render(rootGroup, rootDiv)
  }

  currentlyRendering: boolean

  rerenderTarget = () => {// ------------------------ test that this actually gets called when setState() is used in the inner bullseye components
    window.console.log('STATE CHANGE IN REACT VIRTUAL DOM! WE HAVE TO RE-RENDER TARGET!')
    if (this.currentlyRendering) {
      return
    }
    this.currentlyRendering = true
    this.renderSubscriber(this.state.rootDiv)
    this.currentlyRendering = false
  }

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
    subscribeToRender: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      subscribeToRender: this.subscribeToRender,
    }
  }

  propsSubscriber: Function

  subscribeToProps = (propsSubscriber: Function): void => {
    this.propsSubscriber = propsSubscriber
  }

  renderSubscriber: Function

  subscribeToRender = (renderSubscriber: Function): void => {
    this.renderSubscriber = renderSubscriber
  }

  render() {
    return (
      <div
        style={{
          width: this.context.width,
          height: this.context.height,
          top: '0px',
          left: '0px',
          position: 'absolute',
          pointerEvents: 'none',
        }}
      >
        {React.createElement(this.props.target || this.context.target)}
      </div>
    )
  }

}

type RenderRootUpdatableProps = {
  width: number,
  height: number,
  children: JSX.Element[],
}

type RenderRootInitialProps = {
  initialProps: RenderRootUpdatableProps,
  subscribeToProps: ((propsSubscriber: Function) => void),
  subscribeToEvents: ((eventSubscriber: Function) => void),
}

type RenderRootState = {
  props: RenderRootUpdatableProps,
}

type LayerRenderRootDataSource = {
  [key: string]: any,
}

class LayerRenderRoot extends React.Component<RenderRootInitialProps, RenderRootState> {

  idCounter: number = 0

  ___bullseyeGenerateId = (): string => {
    return `bullseye-id-${this.idCounter++}`
  }

  dataSource: LayerRenderRootDataSource = {
    group: {},
    rect: {},
  }

  ___bullseyeSaveData = (type: string, id: string, data: any): void => {
    window.console.log('Save data!', { type, id, data })
    this.dataSource[type][id] = data
  }

  static childContextTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ___bullseyeGenerateId: PropTypes.func.isRequired,
    ___bullseyeSaveData: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      width: this.getCurrentProps().width,
      height: this.getCurrentProps().height,
      ___bullseyeGenerateId: this.___bullseyeGenerateId,
      ___bullseyeSaveData: this.___bullseyeSaveData,
    }
  }

  state: RenderRootState

  propsSubscriber = (props: RenderRootUpdatableProps): void => {
    this.setState({ props })
  }

  eventSubscriber = (event: Event): void => {
    window.console.log('wow! an event!', event)
  }

  constructor(props: RenderRootInitialProps) {
    super(props)
    this.state = {
      props: props.initialProps,
    }
    props.subscribeToProps(this.propsSubscriber)
    props.subscribeToEvents(this.eventSubscriber)
  }

  getCurrentProps = (): RenderRootUpdatableProps => {
    return this.state.props
  }

  render() {
    const { children } = this.getCurrentProps()
    return <Group children={children} />
  }

}

function observeFullTree(rootDiv: HTMLDivElement, observeCallback: ((e?: Event) => void)): void {
  const win = window as any
  const MutationObserver = win.MutationObserver || win.WebKitMutationObserver
  if (MutationObserver) {
    const mutationObserver = new MutationObserver((mutations: any[]): void => {
      if(mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
        observeCallback()
      }
    })
    mutationObserver.observe(rootDiv, { childList: true, subtree: true })
  } else if (win.addEventListener) {
    rootDiv.addEventListener('DOMNodeInserted', observeCallback, false)
    rootDiv.addEventListener('DOMNodeRemoved', observeCallback, false)
  } else {
    throw new Error('Unable to observe DOM changes')
  }
}

// function extractStructure(element: JSX.Element): any {
//   // React primitive
//   if (typeof element.type === 'string') {
//     throw new Error('React primitives are not valid in Bullseye')
//   }
//   // Bullseye Rect
//   if (element.type === Rect) {
//     const instance: any = element.type.call({}, element.props)
//     const { x, y, width, height } = instance.mutableState
//     return { type: 'Rect', x, y, width, height, meta: { element, instance } }
//   }
//   // Bullseye Group
//   if (element.type === Group) {
//     const instance = element.type.call({}, element.props)
//     const children = instance.mutableState.children.map(extractStructure)
//     const { x, y } = instance.mutableState
//     return { type: 'Group', children, x, y, meta: { element, instance } }
//   }
//   // React Component class
//   if (element.type.prototype && element.type.prototype.isReactComponent) {
//     const Component = (element.type as { new(...args: any[]): any })
//     const instance = new Component(element.props)
//     const children = [extractStructure(instance.render.call(instance))]
//     return { type: 'Component', children, x: 0, y: 0, meta: { element, instance, isClass: true } }
//   }
//   // Functional stateless component (?)
//   const children = [extractStructure(element.type.call(null, element.props))]
//   return { type: 'Component', children, x: 0, y: 0, meta: { element, isClass: false } }
// }

  // componentDidMount() {
  //   this.notifySubscriberOfData(this.structureData)
  // }

  // componentDidUpdate() {
  //   this.notifySubscriberOfData(this.structureData)
  // }
