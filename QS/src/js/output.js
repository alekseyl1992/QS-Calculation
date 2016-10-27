import React, { PropTypes } from 'react';


class Output extends React.Component {
    render() {
        return (
            <tr>
                <td style={ { padding: '5px' } }>{ this.props.label }</td>
                <td style={ { padding: '5px' } }>{ this.props.value }</td>
            </tr>
        );
    }
}

Output.PropTypes = {
    label: PropTypes.string,
    value: PropTypes.any
};

export default Output;