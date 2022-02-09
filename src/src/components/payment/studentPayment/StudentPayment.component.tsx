import * as React from 'react';
import '../payment.css'
import axios from 'axios';
import apiRequestService from '../../../services/ApiRequestService';
import { AxiousRequestMethod } from '../../../types/axiosRequestMethod.type';


export default class StudentPaymentComponent extends React.Component<any> {

    state = {
        paymentCheck: '',
    }
    constructor(props: any) {
        super(props)
        this.state = {
            paymentCheck: '',
        }
        this.handleChangePaymentCheck = this.handleChangePaymentCheck.bind(this);
    }

    async handleChangePaymentCheck(event: any) {
        await this.setState({ paymentCheck: event.target.files[0] })

    }

    async savePymentCheck() {
        const formData = new FormData();
        formData.append('image', this.state.paymentCheck, 'file');
        await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/paymentCheck', formData);
    }

    public render() {
        return (
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
        )
    }
}
