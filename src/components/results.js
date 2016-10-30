import React, { PropTypes } from 'react';
import Output from './output';


class ResultBlock extends React.Component {
    render() {
        const decimalPlaces = this.props.decimalPlaces;
        const values = this.props.values.map((item, i) => {
            return <Output key={ i } { ...item } decimalPlaces={decimalPlaces}/>;
        });

        return (
            <table className="b-output-table">
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