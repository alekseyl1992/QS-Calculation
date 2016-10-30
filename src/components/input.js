import React, { PropTypes } from 'react';


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
        return (
            <div className="form-group col-md-12">
                <label>{ this.props.label }: </label>
                <input onChange={ this.onChange }
                       type="number" ref="input"
                       className="form-control"
                       value={ this.props.value }
                />
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