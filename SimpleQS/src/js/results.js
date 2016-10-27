import React, { PropTypes } from 'react';
import LabeledInput from './input';


class ResultBlock extends React.Component {
    render() {
        const values = [];
        for (let k of Object.keys(this.props.values)) {
            values.push(<LabeledInput key={ k } label={ k } value={ this.props.values[k] } />);
        }
        return (
            <div className="col-md-12">
                { values }
            </div>
        );
    }
}

ResultBlock.PropTypes = {
    values: PropTypes.object
};

export default ResultBlock;