import * as React from 'react';
import './studentProfile.css'
import axios from 'axios';
import authService from '../../services/AuthService';
import studentApiService from '../../services/StudentApiService';

export default class StudentProfileComponent extends React.Component<any> {
    state = {
        firstName: '',
        secondName: '',
        thirdName: '',
        phone: '',
        email: ''
    }
    constructor(props: any) {
        super(props)
        this.state = {
            firstName: '',
            secondName: '',
            thirdName: '',
            phone: '',
            email: ''
        }
        studentApiService.getStudentProfile();
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeSecondName = this.handleChangeSecondName.bind(this);
        this.handleChangeThirdName = this.handleChangeThirdName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }


    handleChangeFirstName(event: any) {
        this.setState({ firstName: event.target.value });
    }

    handleChangeSecondName(event: any) {
        this.setState({ secondName: event.target.value });
    }

    handleChangeThirdName(event: any) {
        this.setState({ thirdName: event.target.value });
    }

    handleChangePhone(event: any) {
        this.setState({ phone: event.target.value });
    }

    handleChangeEmail(event: any) {
        this.setState({ email: event.target.value });
    }

    async getProfile() {

    }

    async saveProfile() {

    }

    public render() {
        return (
            <div>
                <div className='blackLine'></div>
                <div className='prifileWrapper'>
                    <div className='leftBlock'>
                        <div className='controll-input'>
                            <p>Ім'я</p>
                            <input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} />
                        </div>

                        <div className='controll-input'>
                            <p>Прізвище</p>
                            <input type="text" value={this.state.secondName} onChange={this.handleChangeSecondName} />
                        </div>

                        <div className='controll-input'>
                            <p>По Батькові</p>
                            <input type="text" value={this.state.thirdName} onChange={this.handleChangeThirdName} />
                        </div>

                        <div className='controll-input'>
                            <p>Телефон</p>
                            <input type="text" value={this.state.phone} onChange={this.handleChangePhone} />
                        </div>

                        <div className='controll-input'>
                            <p>Пошта</p>
                            <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
                        </div>
                    </div>
                    <div className='rightBlock'>

                    </div>
                </div>
                <div className='saveSection'>
                    <button onClick={() => this.saveProfile()}>Зберегти</button>
                </div>
            </div>
        )
    }
}
