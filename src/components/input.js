import React, { PropTypes } from 'react';
import _ from 'lodash';

class LabeledInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        const value = parseFloat(this.refs.input.value);
        this.props.onChange(this.props.option, value);
    }

    render() {
        let id = _.uniqueId('input-');

        return (
            <div className="form-group">
                <label className="col-md-6 control-label" htmlFor={id}>{ this.props.label }: </label>
                <div className="col-md-6">
                    <input id={id}
                           onChange={ this.onChange }
                           type="number" ref="input"
                           className="form-control"
                           value={ this.props.value }
                    />
                </div>
            </div>
        );
    }
}

LabeledInput.defaultProps = {
    onChange: () => {}
};

LabeledInput.PropTypes = {
    label: PropTypes.string,
    option: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
};

export default LabeledInput;