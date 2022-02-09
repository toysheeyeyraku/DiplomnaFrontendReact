import * as React from 'react';
import axios from 'axios';
import authService from '../../services/AuthService';
import './home.css'
import { useState, useEffect } from 'react';
import apiRequestService from '../../services/ApiRequestService';
import { AxiousRequestMethod } from '../../types/axiosRequestMethod.type';
import NotificationComponent from './notificationCard/NotificationCard.component';

export default class HomeComponent extends React.Component<any> {
    state = {
        header: '',
        body: '',
        author: '',
        role: 'anonim',
        notifications: [],
    }

    constructor(props: any) {
        super(props);
        this.state = {
            header: '',
            body: '',
            author: '',
            role: 'anonim',
            notifications: [],
        }
        this.letOnChangeHeader = this.letOnChangeHeader.bind(this);
        this.letOnChangeBody = this.letOnChangeBody.bind(this);
        this.letOnChangeAuthor = this.letOnChangeAuthor.bind(this);
        this.initializeUserRole();
        this.updateNotifications();
    }

    async initializeUserRole() {
        const initialLoginState = await authService.getUserRole();
        this.setState({ role: initialLoginState });
    }

    letOnChangeHeader(event: any) {
        this.state.header = event.target.value;
    }

    letOnChangeBody(event: any) {
        this.state.body = event.target.value;
    }

    letOnChangeAuthor(event: any) {
        this.state.author = event.target.value;
    }

    async sendNotification() {
        let data = {
            Header: this.state.header,
            Author: this.state.author,
            Body: this.state.body,
            Date: new Date().toString()
        }
        await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/home', data);
        await this.updateNotifications();
    }

    renderAddNotification() {
        if (this.state.role === 'admin') {
            return (
                <div>
                    <div className='inline-add-notification add-common'>
                        <p>Заголовок</p>
                        <input type='text' onChange={this.letOnChangeHeader} />
                    </div>
                    <div className='add-common'>
                        <p>Повідомлення</p>
                        <textarea className='add-text-area' onChange={this.letOnChangeBody} />
                    </div>
                    <div className='inline-add-notification add-common'>
                        <p>Автор</p>
                        <input onChange={this.letOnChangeAuthor} />
                    </div>
                    <div className='add-common'>
                        <button className='save-btn' onClick={() => this.sendNotification()}>Розмістити</button>
                    </div>
                    <div className='blackLine'></div>
                </div>
            );
        }
        return (
            <div>
            </div>
        );
    }

    async updateNotifications() {
        const result = await apiRequestService.makeRequestAnonim(AxiousRequestMethod.get, 'https://localhost:5002/home');
        this.setState({ notifications: result.data })
    }

    renderNotifications() {
        return (
            <div>
                {this.state.notifications.map((notification, i) => {
                    // Return the element. Also pass key     
                    return (<NotificationComponent key={i} props={notification} />)
                })}
            </div>
        );
    }


    public render() {
        return (
            <div>
                <div className='blackLine'></div>
                {this.renderAddNotification()}
                {this.renderNotifications()}
            </div>
        )
    }



}
