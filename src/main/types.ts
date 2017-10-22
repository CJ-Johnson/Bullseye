export type DataSubscriber = (data: any) => void

export type RenderingTargetProps = {
    width: number,
    height: number,
    subscribeToData: ((dataSubscriber: DataSubscriber) => void),
}

export type RenderingTarget = new () => React.Component<RenderingTargetProps, {}>
