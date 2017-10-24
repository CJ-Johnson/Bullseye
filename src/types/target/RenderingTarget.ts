import { DataSubscriber } from '../subscriptions'

export type RenderingTargetProps = {
  width: number,
  height: number,
  subscribeToData: ((dataSubscriber: DataSubscriber) => void),
}

export type RenderingTarget = new () => React.Component<RenderingTargetProps, {}>
