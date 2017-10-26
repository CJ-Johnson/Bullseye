import { PathInstruction } from './Path/Instructions'

export type RenderingTreeNode = (
  | ClassNode
  | FunctionNode
  | GroupNode
  | DrawNode
  | PathNode
  | RectNode
)

export interface ReactClass extends React.Component<any, any> {
}

export type ClassNode = {
  type: 'ClassNode',
  props: any,
  class: ReactClass,
  instance: ReactClass,
  children: RenderingTreeNode[],
}

export type FunctionNode = {
  type: 'FunctionNode',
  props: any,
  function: ((props: any) => JSX.Element),
  children: RenderingTreeNode[],
}

export type GroupNode = {
  type: 'GroupNode',
  // instance: Group,
  children: RenderingTreeNode[],
}

export type DrawNode = {
}

export type PathNode = {
  type: 'PathNode',
  x: number,
  y: number,
  d: PathInstruction[],
}

export type RectNode = {
  type: 'RectNode',
  x: number,
  y: number,
  width: number,
  height: number,
}
