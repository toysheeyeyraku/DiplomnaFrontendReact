import * as React from 'react';
import notificationService from '../../../services/admin/notification.service';
import apiRequestService from '../../../services/ApiRequestService';
import { AxiousRequestMethod } from '../../../types/axiosRequestMethod.type';

export default class RegistrationComponent extends React.Component<any> {

    state = {
        header: '',
        body: '',
        author: '',
    }


    constructor(props: any) {
        super(props);
        this.state = {
            header: '',
            body: '',
            author: '',
        }
        this.letOnChangeHeader = this.letOnChangeHeader.bind(this);
        this.letOnChangeBody = this.letOnChangeBody.bind(this);
        this.letOnChangeAuthor = this.letOnChangeAuthor.bind(this);
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
        let notification = {
            Header: this.state.header,
            Author: this.state.author,
            Body: this.state.body,
            Date: new Date().toString()
        }
        await notificationService.addNotification(notification);
        await this.updateNotifications();
    }

    async updateNotifications() {
        const result = await apiRequestService.makeRequestAnonim(AxiousRequestMethod.get, 'https://localhost:5002/home');
        this.props.parent.setState({ notifications: result.data });
    }


    public render() {
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
        )
    }
}
