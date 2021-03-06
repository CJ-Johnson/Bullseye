import * as React from 'react'
import * as PropTypes from 'prop-types'

import { PathInstruction } from '../../../../types/data/Path/Instructions'

export type Props = {
  x?: number,
  y?: number,
  d?: PathInstruction[],
}

export type Context = {
  ___bullseyeGenerateId: (() => string),
  ___bullseyeSaveData: ((type: string, id: string, data: any) => void),
}

export type State = {
  bullseye_id: string,
  x: number,
  y: number,
  d: PathInstruction[],
}

const type = 'path'

export default class Path extends React.Component<Props, State> {

  static contextTypes = {
    ___bullseyeGenerateId: PropTypes.func.isRequired,
    ___bullseyeSaveData: PropTypes.func.isRequired,
  }

  context: Context
  state: State

  constructor(props: Props, context: Context) {
    super(props, context)
    const bullseye_id = context.___bullseyeGenerateId()
    const x = props.x || 0
    const y = props.y || 0
    const d = props.d || []
    this.state = { bullseye_id, x, y, d }
    context.___bullseyeSaveData(type, bullseye_id, this.state)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({...this.state, ...nextProps})
    const { bullseye_id } = this.state
    this.context.___bullseyeSaveData(type, bullseye_id, this.state)
  }

  render() {
    return <div data-bullseye-type={type} data-bullseye-id={this.state.bullseye_id} />
  }

}
