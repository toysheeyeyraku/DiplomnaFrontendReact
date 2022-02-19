import * as React from 'react';
import './applicationSettlement.css';
import applicationSettlementService from '../../../services/common/applicationSettlement.service';

export default class ApplicationSettlementCardComponent extends React.Component<any> {
    state = {
        deanIdChecked: false,
        comendantChecked: false,
    }
    constructor(props: any) {
        super(props);
        this.state = {
            deanIdChecked: this.props.applicationSettlement.deanIdChecked,
            comendantChecked: this.props.applicationSettlement.comendantChecked,
        }

        this.onChangeDeanChecked = this.onChangeDeanChecked.bind(this);
        this.onChangeComendantChecked = this.onChangeComendantChecked.bind(this);

    }

    onChangeDeanChecked(event: any) {
        if (this.props.role === 'dean') {
            if (this.props.applicationSettlement.deanIdChecked === false) {
                this.setState({ deanIdChecked: event.target.checked });
            }
        }
    }

    onChangeComendantChecked(event: any) {
        if (this.props.role === 'comendant') {
            if (this.props.applicationSettlement.comendantChecked === false) {
                this.setState({ comendantChecked: event.target.checked });
            }
        }
    }

    async signDocument() {
        if (this.props.role === 'comendant') {
            await applicationSettlementService.comendantSignForSettlement(this.props.applicationSettlement.id);
        }

        if (this.props.role === 'dean') {
            await applicationSettlementService.deanSignForSettlement(this.props.applicationSettlement.id);
        }
    }

    async generateWord() {
        await applicationSettlementService.getWordForSettlement(this.props.applicationSettlement.id);
    }

    public render() {
        return (
            <div className='application-setlement-card'>
                <p>{this.props.applicationSettlement.date}</p>
                <p>{this.props.applicationSettlement.startYear}-{this.props.applicationSettlement.endYear}</p>
                <div className='check-box'>
                    <p>Декан</p>
                    <input type="checkbox" checked={this.state.deanIdChecked} onChange={this.onChangeDeanChecked} />
                </div>
                <div className='check-box'>
                    <p>Комендант</p>
                    <input type="checkbox" checked={this.state.comendantChecked} onChange={this.onChangeComendantChecked} />
                </div>
                <button onClick={() => this.signDocument()} className='save-btn'>підписати</button>
                <button onClick={() => this.generateWord()} className='generete-word'>Згунерувати заяву</button>
            </div>
        )
    }



}
