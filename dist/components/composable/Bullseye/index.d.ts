/// <reference types="react" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type Props = {
    width: number;
    height: number;
    children?: React.ReactElement<any> | React.ReactElement<any>[];
};
export default class Bullseye extends React.Component<Props, {}> {
    static propTypes: {
        width: PropTypes.Validator<any>;
        height: PropTypes.Validator<any>;
        children: () => boolean;
    };
    render(): JSX.Element;
}
