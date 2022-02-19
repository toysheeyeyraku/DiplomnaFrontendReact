import * as React from 'react';
import authService from '../../../services/AuthService';
import applicationSettlementService from '../../../services/common/applicationSettlement.service';
import './applicationSettlement.css';


export default class ApplicationSettlementAddComponent extends React.Component<any> {

    state = {
        role: 'anonim',
        applicationSettlements: [],
        startYear: '',
    }

    constructor(props: any) {
        super(props);
        this.state = {
            role: 'anonim',
            applicationSettlements: [],
            startYear: '',
        }
        this.onChangeStartYear = this.onChangeStartYear.bind(this);

    }

    async initializeUserRole() {
        const initialLoginState = await authService.getUserRole();
        this.setState({ role: initialLoginState });
    }



    async addApplicationSettlement() {
        const dto = {
            StartYear: this.state.startYear
        }
        await applicationSettlementService.saveApplicationForSettlement(dto);
        await this.props.parent.getApplicationSettlements();
    }

    onChangeStartYear(event: any) {
        this.state.startYear = event.target.value;
    }


    public render() {
        return (
            <div>
                <div className='application-setlement-student-add'>
                    <p>Навчальний рік</p>
                    <input type='text' onChange={this.onChangeStartYear} />
                    <button onClick={() => this.addApplicationSettlement()} className='save-btn'>Додати Заяву</button>
                </div>
            </div>
        )
    }



}
