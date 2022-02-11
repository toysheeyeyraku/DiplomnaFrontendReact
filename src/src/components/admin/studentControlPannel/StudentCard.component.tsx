import * as React from 'react';
import apiRequestService from '../../../services/ApiRequestService';
import { AxiousRequestMethod } from '../../../types/axiosRequestMethod.type';
import './studentControlPannel.css';
import { useNavigate } from 'react-router-dom';

export default function StudentCard(props: any) {

    const navigate = useNavigate();

    return (
        <div className='studentCardBody'>
            <p className='userName'>{props.userName}</p>
            <button className='controll-button' onClick={() => navigate(`/admin/student/profile?userId=${props.userId}`)}>Профіль</button>
            <button className='controll-button' onClick={() => navigate(`/admin/student/payment?userId=${props.userId}`)}>Проплата</button>
        </div>
    )

}
