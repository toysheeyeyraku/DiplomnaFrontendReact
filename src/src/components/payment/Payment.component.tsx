import * as React from 'react';
import './payment.css'
import axios from 'axios';
import authService from '../../services/AuthService';
import studentApiService from '../../services/StudentApiService';
import apiRequestService from '../../services/ApiRequestService';
import { AxiousRequestMethod } from '../../types/axiosRequestMethod.type';
import StudentPaymentComponent from './studentPayment/StudentPayment.component';

export default class PaymentComponent extends React.Component<any> {

    constructor(props: any) {
        super(props)

    }

    public render() {
        return (
            <div>
                <div className='blackLine'></div>
                <StudentPaymentComponent />
            </div>
        )
    }
}
