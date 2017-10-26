export type RenderingTargetProps = {
  width: number,
  height: number,
  subscribeToRender: ((renderSubscriber: Function) => void),
}

export type RenderingTarget = new () => React.Component<RenderingTargetProps, {}>
