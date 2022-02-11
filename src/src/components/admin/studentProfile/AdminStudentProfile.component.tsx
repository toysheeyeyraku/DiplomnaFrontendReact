import * as React from 'react';
import './adminStudentProfile.css'
import studentProfileService from '../../../services/admin/studentProfile.service';

export default class AdminStudentProfileComponent extends React.Component<any> {
    state = {
        firstName: '',
        secondName: '',
        thirdName: '',
        phone: '',
        email: '',
        profileImage: '',
        profileImageFile: '',
        userId: '',
    }


    constructor(props: any) {

        super(props)
        this.state = {
            firstName: '',
            secondName: '',
            thirdName: '',
            phone: '',
            email: '',
            profileImage: '',
            profileImageFile: '',
            userId: '',
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const userId = params.get('userId');
        if (userId != null) {
            this.state.userId = userId;
        }

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeSecondName = this.handleChangeSecondName.bind(this);
        this.handleChangeThirdName = this.handleChangeThirdName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeProfileImage = this.handleChangeProfileImage.bind(this);
        this.updateStudentProfile();
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

    updateStudentProfile() {
        studentProfileService.getStudentProfile(this.state.userId).then((result) => {
            this.setState({ profileImage: `data:image/png;base64,${result.data.profileImage}` });
            this.setState({ firstName: result.data.firstName || '' });
            this.setState({ secondName: result.data.secondName || '' });
            this.setState({ thirdName: result.data.thirdName || '' });
            this.setState({ phone: result.data.phone || '' });
            this.setState({ email: result.data.email || '' });
        });
    }

    async handleChangeProfileImage(event: any) {
        await this.setState({ profileImageFile: event.target.files[0] })

    }

    async saveProfileImage() {
        await studentProfileService.saveStudentProfileImage(this.state.profileImageFile, this.state.userId);

    }

    async saveProfileData() {
        const profileUpdateRequest = {
            FirstName: this.state.firstName,
            SecondName: this.state.secondName,
            ThirdName: this.state.thirdName,
            Phone: this.state.phone,
            Email: this.state.email,
        }

        await studentProfileService.saveStudentProfileData(profileUpdateRequest, this.state.userId);
    }

    async saveProfile() {
        await this.saveProfileImage();
        await this.saveProfileData();
        await this.updateStudentProfile();
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
                        <div className='profileImageWrapper'>
                            <img src={this.state.profileImage} />
                        </div>
                        <input type='file' onChange={this.handleChangeProfileImage} />
                    </div>
                </div>
                <div className='saveSection'>
                    <button className='save-btn' onClick={() => this.saveProfile()}>Зберегти</button>
                </div>


            </div>
        )
    }
}
