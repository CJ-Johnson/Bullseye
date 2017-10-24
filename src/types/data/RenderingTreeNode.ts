export type RenderingTreeNode = (
  | GroupNode
  | PathNode
  | RectNode
  | ClassNode
  | FunctionNode
)

export type GroupNode = {
  type: 'Group',
  x: number,
  y: number,
  children: RenderingTreeNode[],
}

export type PathNode = {
  type: 'Path',
  
}

export type RectNode = {
}

export type ClassNode = {
}

export type FunctionNode = {
}
