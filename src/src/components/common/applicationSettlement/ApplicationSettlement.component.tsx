import * as React from 'react';
import authService from '../../../services/AuthService';
import applicationSettlementService from '../../../services/common/applicationSettlement.service';
import './applicationSettlement.css';
import ApplicationSettlementAddComponent from './ApplicationSettlementAdd.component';
import ApplicationSettlementCardComponent from './ApplicationSettlementCard.component';


export default class ApplicationSettlementComponent extends React.Component<any> {

    state = {
        role: 'anonim',
        applicationSettlements: [],
        startYear: '',
        userId: '',
    }

    constructor(props: any) {
        super(props);
        this.state = {
            role: 'anonim',
            applicationSettlements: [],
            startYear: '',
            userId: '',
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const userId = params.get('userId');
        if (userId != null) {
            this.state.userId = userId;
        }
        this.initializeUserRole().then(() => this.getApplicationSettlements());

    }

    async initializeUserRole() {
        const initialLoginState = await authService.getUserRole();
        this.setState({ role: initialLoginState });
    }

    public async getApplicationSettlements() {
        if (this.state.role === 'student') {
            const applications = await applicationSettlementService.getApplicationForSettlementForStudent();
            this.setState({ applicationSettlements: applications.data });
            console.log(applications.data);
        }

        if (this.state.role === 'dean' || this.state.role === 'comendant') {
            const applications = await applicationSettlementService.getApplicationForSettlement(this.state.userId);
            this.setState({ applicationSettlements: applications.data });

        }
    }

    renderApplicationSettlementAdd() {
        if (this.state.role === 'student') {
            return (
                <ApplicationSettlementAddComponent parent={this} />
            );
        }
        return (
            <div></div>
        );

    }


    public render() {
        return (
            <div>
                {this.renderApplicationSettlementAdd()}
                {this.state.applicationSettlements.map((applicationSettlement: any, i) => {
                    // Return the element. Also pass key     
                    return (<ApplicationSettlementCardComponent key={i} applicationSettlement={applicationSettlement} role={this.state.role} />)
                })}
            </div>
        )
    }



}
