export type RenderingTargetArguments = {
    width: number,
    height: number,
    data?: any,
}

export type RenderingTarget = (args: RenderingTargetArguments) => React.ReactElement<any>
