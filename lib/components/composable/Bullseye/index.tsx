import * as React from 'react'
import * as PropTypes from 'prop-types'

export type Props = {
  width: number,
  height: number,
  children?: React.ReactElement<any> | React.ReactElement<any>[],
}

/*

TODO:

allow any react children! users can include components if they so desire
What is not allowed is any Bullseye component other than layer
- no <Bullseye />, no <Group /> and no primitive bullseye components
- <div />, <any /> are fine (I think?)

*/

export default class Bullseye extends React.Component<Props, {}> {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: () => true,
  }

  render() {
    return (
      <div />
    )
  }

}
