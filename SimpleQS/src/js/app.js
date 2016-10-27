require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');


import React from 'react';
import LabeledInput from './input';
import ResultBlock from './results';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lambda: 10,
            mu: 0,
            k: 1,
            nuEnter: 0,
            results: {},
            showResult: false
        };
        this.onChange = this.onChange.bind(this);
        this.execute = this.execute.bind(this);
    }

    ready() {
        const { lambda, mu, k } = this.state;
        return lambda && mu && k;
    }

    execute() {
        if (this.ready()) {
            const p = this.state.lambda / this.state.mu;
            const nu = 1 / this.state.k;
            const nuEnter = this.state.nuEnter ? this.state.nuEnter : nu;
            const Q = (p * p * (nu + nuEnter)) / (2 * (1 - p));
            const L = Q + p;
            const W = Q / this.state.lambda;
            const T = L / this.state.lambda;
            const nuExit = nuEnter + p * p * (nu - nuEnter);
            const nuExitExact = (1 - p) * nuEnter + p * nu - p * p + p;
            this.setState({
                showResult: true,
                results: { p, Q, L, W, T, nuExit, nuExitExact }
            })
        }
    }

    onChange(k, v) {
        this.setState({
            [k]: v
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-12 row">
                    <div className="col-md-3">
                        <LabeledInput label="Лямбда" onChange={ this.onChange } value={ this.state.lambda } option="lambda" />
                        <LabeledInput label="Мю" onChange={ this.onChange } value={ this.state.mu } option="mu" />
                        <LabeledInput
                            label="Параметр потока Эрланга K"
                            onChange={ this.onChange } value={ this.state.k } option="k" />
                        <LabeledInput
                            label="Квадрат коэффициента вариации интервалов времени поступления заявок (необязательно)"
                            onChange={ this.onChange } value={ this.state.nuExit } option="nuEnter" />
                    </div>
                    <div className="col-md-5 col-md-offset-2">
                        { !this.ready() && <div className="alert alert-warning">Заполните все входные параметры</div> }
                        <div className="btn btn-success col-md-12" onClick={ this.execute }>Посчитать</div>

                        {
                            this.state.showResult &&
                            <ResultBlock values={ this.state.results } />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;