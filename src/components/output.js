import React, { PropTypes } from 'react';


class Output extends React.Component {
    render() {
        return (
            <tr>
                <td style={ { padding: '5px' } }>{ this.props.label }</td>
                <td style={ { padding: '5px' } }>{ this.props.value.toFixed(this.props.decimalPlaces) }</td>
            </tr>
        );
    }
}

Output.PropTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    decimalPlaces: PropTypes.number
};

export default Output;