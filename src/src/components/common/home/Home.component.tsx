import * as React from 'react';
import axios from 'axios';
import authService from '../../../services/AuthService';
import './home.css'
import NotificationComponent from './notificationCard/NotificationCard.component';
import AddNotificationComponent from '../../admin/addNotification/addNotification.component';
import homeService from '../../../services/common/home.service';

export default class HomeComponent extends React.Component<any> {

    state = {
        role: 'anonim',
        notifications: [],
    }

    constructor(props: any) {
        super(props);
        this.state = {
            role: 'anonim',
            notifications: [],
        }

        this.initializeUserRole();
        this.updateNotifications();
    }

    async initializeUserRole() {
        const initialLoginState = await authService.getUserRole();
        this.setState({ role: initialLoginState });
    }

    async updateNotifications() {
        const result = await homeService.getNotifications();
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

    renderAddNotificationForAdmin() {
        if (this.state.role === 'admin') {
            return (<AddNotificationComponent parent={this} />)
        }
        return (
            <div></div>
        )
    }


    public render() {
        return (
            <div>
                <div className='blackLine'></div>
                {this.renderAddNotificationForAdmin()}
                {this.renderNotifications()}
            </div>
        )
    }



}
