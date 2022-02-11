import * as React from 'react';
import './payment.css'
import paymentService from '../../../services/student/payment.service';
import PaymendCardComponent from '../../common/payment/paymentCard.component';


export default class StudentPaymentComponent extends React.Component<any> {

    state = {
        paymentCheck: '',
        paymentChecksData: [],
    }
    constructor(props: any) {
        super(props)
        this.state = {
            paymentCheck: '',
            paymentChecksData: [],
        }
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
                        <p>Борг/Переплата</p>
                        <p>1000</p>
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
