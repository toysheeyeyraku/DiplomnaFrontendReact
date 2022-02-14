import * as React from 'react';
import './adminPayment.css'
import paymentService from '../../../services/admin/payment.service';
import PaymendCardComponent from '../../common/payment/paymentCard.component';
import debtService from '../../../services/admin/debt.service';

export default class AdminPaymentComponent extends React.Component<any> {

    state = {
        paymentCheck: '',
        paymentChecksData: [],
        debtMoney: '',
        userId: '',
    }
    constructor(props: any) {
        super(props)
        this.state = {
            paymentCheck: '',
            paymentChecksData: [],
            debtMoney: '',
            userId: '',
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const userId = params.get('userId');
        if (userId != null) {
            this.state.userId = userId;
        }
        this.updateDebt();
        this.onChangeDebtMoney = this.onChangeDebtMoney.bind(this);
        this.updatePayments();
    }



    async updatePayments() {
        const payments = (await paymentService.getPayments(this.state.userId)).data;
        this.setState({ paymentChecksData: payments });
    }

    async updateDebt() {
        const debt = (await debtService.getDebt(this.state.userId)).data;
        await this.setState({ debtMoney: debt.moneyDept });
    }

    onChangeDebtMoney(event: any) {
        this.setState({ debtMoney: event.target.value });
    }

    async saveDebt() {
        const debtDto = {
            MoneyDept: this.state.debtMoney
        }
        await debtService.updateDebtDebt(debtDto, this.state.userId);
    }

    public render() {
        return (
            <div>
                <div className='blackLine'></div>
                <div className='paymentWrapper'>
                    <div className='adminPaymentDeptWrapper'>
                        <p className='debtWord'>Борг</p>
                        <input type='text' value={this.state.debtMoney} onChange={this.onChangeDebtMoney} />
                        <button className='admin-payment-save-btn' onClick={() => this.saveDebt()}>Зберегти</button>
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
