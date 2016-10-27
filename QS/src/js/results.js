import React, { PropTypes } from 'react';
import Output from './output';


class ResultBlock extends React.Component {
    render() {
        const values = this.props.values.map((item, i) => <Output key={ i } { ...item } />);

        return (
            <table style={ { borderSpacing: '1px' } }>
                <tr>
                    <th>Характеристика</th>
                    <th>Значение</th>
                </tr>
                { values }
            </table>
        );
    }
}

ResultBlock.PropTypes = {
    values: PropTypes.arrayOf({
        label: PropTypes.string,
        value: PropTypes.number
    })
};

export default ResultBlock;