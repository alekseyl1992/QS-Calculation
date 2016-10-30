window.jQuery = require('jquery');
require('bootstrap-webpack');
require('normalize.css');
require('styles/App.css');

import _ from 'lodash';

import React from 'react';
import LabeledInput from './input';
import ResultBlock from './results';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            N: 100,
            T0: 50,
            Tp: 100,
            tk: 1,
            C: 1,
            tpr: 10,
            D: 2,
            td: 10,
            P: 0.5,
            K1: 0.995,
            K2: 100,
            delta: 0.05,
            decimalPlaces: 3
        };
        this.onChange = this.onChange.bind(this);
        this.execute = this.execute.bind(this);
    }

    ready() {
        const { N, T0, Tp, tk, C, D, tpr, td, P } = this.state;
        return (N && T0 && Tp && tk && C && D && tpr && td && P) !== null;
    }

    execute() {
        if (this.ready()) {
            const { N, T0, Tp, tk, C, D, tpr, td, P, K1, K2, delta } = this.state;
            const beta = 1 / (1 - P);
            const Pi = 1 / D;

            // Шаг 1
            let lambdaF1 = K1 * ((N - 1) / N) * Math.min(
                1 / (2 * tk),
                C / (beta * tpr),
                1 / (beta * Pi * td)
            );

            const baseLambdaF1 = lambdaF1;

            let lambdaF = 0.0000001, Tk, Tpr, Td, delta1, Tcycle, steps = 1;

            while ((lambdaF1 - lambdaF) / lambdaF >= delta) {

                // Шаг 2
                Tk = (2 * tk) / (1 - 2 * lambdaF1 * tk);
                Tpr = (beta * tpr) / (1 - Math.pow(beta * lambdaF1 * tpr / C, C));
                Td = (beta * td) / (1 - beta * Pi * lambdaF1 * td);

                // Шаг 3
                Tcycle = T0 + Tp + Tk + Tpr + Td;
                lambdaF = (N - 1) / Tcycle;

                // Шаг 4-5
                if ((lambdaF1 - lambdaF) / lambdaF >= delta) {
                    delta1 = (lambdaF1 - lambdaF) / K2;
                    lambdaF1 = lambdaF1 - delta1;
                }

                steps += 1;
            }

            const lambda = N / Tcycle;

            const RoPC = (T0 + Tp) / Tcycle;
            const RoUser = Tp / Tcycle;
            const RoK = 2 * lambda * tk;
            const RoPr = beta * lambda * tpr / C;
            const RoD = beta * lambda * Pi * td;

            this.setState({
                showResult: true,
                results: [
                    {
                        label: 'Загрузка рабочей станции',
                        value: RoPC
                    },
                    {
                        label: 'Загрузка пользователя рабочей станции',
                        value: RoUser
                    },
                    {
                        label: 'Среднее количество работающих PC',
                        value: RoPC * N
                    },
                    {
                        label: 'Загрузка канала',
                        value: RoK
                    },
                    {
                        label: 'Загрузка процессора',
                        value: RoPr
                    },
                    {
                        label: 'Загрузка дисков',
                        value: RoD
                    },
                    {
                        label: 'Время цикла системы',
                        value: Tcycle
                    },
                    {
                        label: 'Начальная интенсивность фонового потока',
                        value: baseLambdaF1
                    },
                    {
                        label: 'Конечная интенсивность фонового потока',
                        value: lambdaF
                    },
                    {
                        label: 'Количество итераций',
                        value: steps
                    }
                ]
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
                <div className="row">
                    <h2 className="text-center">Аналитическая модель</h2>
                    <form className="col-md-6 form-horizontal">
                        <LabeledInput label="Количество рабочих станций"
                                      onChange={ this.onChange }
                                      value={ this.state.N }
                                      option="N"
                        />
                        <LabeledInput label="Среднее время дообработки запроса на рабочей станции"
                                      onChange={ this.onChange }
                                      value={ this.state.T0 }
                                      option="T0"
                        />
                        <LabeledInput label="Среднее время формирования запроса"
                                      onChange={ this.onChange }
                                      value={ this.state.Tp }
                                      option="Tp"
                        />
                        <LabeledInput label="Среднее время передачи запроса по каналу"
                                      onChange={ this.onChange }
                                      value={ this.state.tk }
                                      option="tk"
                        />
                        <LabeledInput label="Число процессоров на сервере"
                                      onChange={ this.onChange }
                                      value={ this.state.C }
                                      option="C"
                        />
                        <LabeledInput label="Среднее время обработки запроса процессором"
                                      onChange={ this.onChange }
                                      value={ this.state.tpr }
                                      option="tpr"
                        />
                        <LabeledInput label="Число дисков на сервере"
                                      onChange={ this.onChange }
                                      value={ this.state.D }
                                      option="D"
                        />
                        <LabeledInput label="Среднее время обработки запроса диском"
                                      onChange={ this.onChange }
                                      value={ this.state.td }
                                      option="td"
                        />
                        <LabeledInput label="Вероятность обращения запроса к ЦП после обработки на диске"
                                      onChange={ this.onChange }
                                      value={ this.state.P }
                                      option="P"
                        />
                        <LabeledInput label="K1 (настраиваемый параметр)"
                                      onChange={ this.onChange }
                                      value={ this.state.K1 }
                                      option="K1"
                        />
                        <LabeledInput label="K2 (настраиваемый параметр)"
                                      onChange={ this.onChange }
                                      value={ this.state.K2 }
                                      option="K2"
                        />
                        <LabeledInput label="Дельта (настраиваемый параметр)"
                                      onChange={ this.onChange }
                                      value={ this.state.delta }
                                      option="delta"
                        />
                        <LabeledInput label="Знаков после запятой"
                                      onChange={ this.onChange }
                                      value={ this.state.decimalPlaces }
                                      option="decimalPlaces"
                        />
                        <div className="btn btn-primary col-md-12" onClick={ this.execute }>Вычислить</div>
                    </form>
                    <div className="col-md-5 col-md-offset-1">
                        { !this.ready() && <div className="alert alert-warning">Заполните все входные параметры</div> }
                        

                        {
                            this.state.showResult &&
                            <ResultBlock values={ this.state.results } decimalPlaces={ this.state.decimalPlaces } />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;