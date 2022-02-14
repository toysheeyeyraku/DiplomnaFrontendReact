import * as React from 'react';
import './payment.css'
import paymentService from '../../../services/student/payment.service';
import PaymendCardComponent from '../../common/payment/paymentCard.component';
import debtService from '../../../services/student/debt.service';

export default class StudentPaymentComponent extends React.Component<any> {

    state = {
        paymentCheck: '',
        paymentChecksData: [],
        debtWord: '',
        debtMoney: '',
    }
    constructor(props: any) {
        super(props)
        this.state = {
            paymentCheck: '',
            paymentChecksData: [],
            debtWord: '',
            debtMoney: '',
        }
        this.updateDebt();
        this.handleChangePaymentCheck = this.handleChangePaymentCheck.bind(this);
        this.updatePayments();
    }

    async handleChangePaymentCheck(event: any) {
        await this.setState({ paymentCheck: event.target.files[0] })

    }

    async savePymentCheck() {
        if (this.state.paymentCheck) {
            await paymentService.uploadPaymentCheck(this.state.paymentCheck);
            this.updatePayments();
        }
    }

    async updatePayments() {
        const payments = (await paymentService.getPayments()).data;
        this.setState({ paymentChecksData: payments });
    }

    async updateDebt() {
        const debt = (await debtService.getDebt()).data;
        if (debt.moneyDept >= 0) {
            await this.setState({ debtWord: 'Борг' });

        } else {
            await this.setState({ debtWord: 'Переплата' });
        }
        await this.setState({ debtMoney: Math.abs(debt.moneyDept) });
    }

    public render() {
        return (
            <div>
                <div className='blackLine'></div>
                <div className='paymentWrapper'>
                    <div className='paymentLoadWrapper'>
                        <input type='file' onChange={this.handleChangePaymentCheck} />
                        <button className='save-btn' onClick={() => this.savePymentCheck()}>Зберегти</button>
                    </div>
                    <div className='paymentDeptWrapper'>
                        <p>{this.state.debtWord}</p>
                        <p>{this.state.debtMoney}</p>
                    </div>
                </div>
                <div className='payments'>
                    {this.state.paymentChecksData.map((payment, i) => {
                        // Return the element. Also pass key     
                        return (<PaymendCardComponent key={i} props={payment} />)
                    })}
                </div>
            </div>
        )
    }
}
