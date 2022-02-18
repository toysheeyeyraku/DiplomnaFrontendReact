import * as React from 'react';
import './studentProfile.css'
import selfProfileService from '../../../services/common/selfProfile.service';

export default class StudentProfileComponent extends React.Component<any> {
    state = {
        firstName: '',
        secondName: '',
        thirdName: '',
        phone: '',
        email: '',
        profileImage: '',
        profileImageFile: '',
        passportNumber: '',
        group: '',
        faculty: '',
        passportGivenDate: '',
        dateBirth: '',
        course: '',
        signImage: '',
        signImageFile: '',
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
            passportNumber: '',
            group: '',
            faculty: '',
            passportGivenDate: '',
            dateBirth: '',
            course: '',
            signImage: '',
            signImageFile: '',
        }

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeSecondName = this.handleChangeSecondName.bind(this);
        this.handleChangeThirdName = this.handleChangeThirdName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeProfileImage = this.handleChangeProfileImage.bind(this);
        this.handleChangePassportNumber = this.handleChangePassportNumber.bind(this);
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeFaculty = this.handleChangeFaculty.bind(this);
        this.handleChangePassportGivenDate = this.handleChangePassportGivenDate.bind(this);
        this.handleChangeDateBirth = this.handleChangeDateBirth.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleChangeSignImage = this.handleChangeSignImage.bind(this);
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

    handleChangePassportNumber(event: any) {
        this.setState({ passportNumber: event.target.value });
    }

    handleChangeGroup(event: any) {
        this.setState({ group: event.target.value });
    }

    handleChangePassportGivenDate(event: any) {
        this.setState({ passportGivenDate: event.target.value });
    }

    handleChangeProfileImage(event: any) {
        this.setState({ profileImageFile: event.target.files[0] })

    }

    handleChangeSignImage(event: any) {
        this.setState({ signImageFile: event.target.files[0] })

    }

    handleChangeFaculty(event: any) {
        this.setState({ faculty: event.target.value });
    }

    handleChangeDateBirth(event: any) {
        this.setState({ dateBirth: event.target.value });
    }

    handleChangeCourse(event: any) {
        this.setState({ course: event.target.value });
    }

    updateStudentProfile() {
        selfProfileService.getSelfProfile().then((result) => {
            this.setState({ profileImage: `data:image/png;base64,${result.data.profileImage}` });
            this.setState({ signImage: `data:image/png;base64,${result.data.signImage}` });
            this.setState({ firstName: result.data.firstName || '' });
            this.setState({ secondName: result.data.secondName || '' });
            this.setState({ thirdName: result.data.thirdName || '' });
            this.setState({ phone: result.data.phone || '' });
            this.setState({ email: result.data.email || '' });
            this.setState({ passportNumber: result.data.passportNumber || '' });
            this.setState({ group: result.data.group || '' });
            this.setState({ faculty: result.data.faculty || '' });
            this.setState({ passportGivenDate: result.data.passportGivenDate || '' });
            this.setState({ dateBirth: result.data.dateBirth || '' });
            this.setState({ course: result.data.course || '' });
        });
    }

    async saveProfileImage() {
        await selfProfileService.saveSelfProfileImage(this.state.profileImageFile);
    }

    async saveSignImage() {
        await selfProfileService.saveSignImage(this.state.signImageFile);
    }

    async saveProfileData() {
        const profileUpdateRequest = {
            FirstName: this.state.firstName,
            SecondName: this.state.secondName,
            ThirdName: this.state.thirdName,
            Phone: this.state.phone,
            Email: this.state.email,
            PassportNumber: this.state.passportNumber,
            Group: this.state.group,
            Faculty: this.state.faculty,
            PassportGivenDate: this.state.passportGivenDate,
            DateBirth: this.state.dateBirth,
            Course: this.state.course,
        }
        console.log(profileUpdateRequest);
        await selfProfileService.saveSelfProfileData(profileUpdateRequest);

    }

    async saveProfile() {
        await this.saveSignImage();
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
                        <div className='controll-input'>
                            <p>Номер Паспорта</p>
                            <input type="text" value={this.state.passportNumber} onChange={this.handleChangePassportNumber} />
                        </div>
                        <div className='controll-input'>
                            <p>Група</p>
                            <input type="text" value={this.state.group} onChange={this.handleChangeGroup} />
                        </div>

                        <div className='controll-input'>
                            <p>Факультет</p>
                            <input type="text" value={this.state.faculty} onChange={this.handleChangeFaculty} />
                        </div>

                        <div className='controll-input'>
                            <p>Дата отрамання паспорту</p>
                            <input type="text" value={this.state.passportGivenDate} onChange={this.handleChangePassportGivenDate} />
                        </div>

                        <div className='controll-input'>
                            <p>Дата народження</p>
                            <input type="text" value={this.state.dateBirth} onChange={this.handleChangeDateBirth} />
                        </div>

                        <div className='controll-input'>
                            <p>Курс</p>
                            <input type="text" value={this.state.course} onChange={this.handleChangeCourse} />
                        </div>
                    </div>
                    <div className='rightBlock'>
                        <div className='profileImageWrapper'>
                            <img src={this.state.profileImage} />
                        </div>
                        <input type='file' onChange={this.handleChangeProfileImage} />

                        <div className='profileImageWrapper'>
                            <img src={this.state.signImage} />
                        </div>
                        <input type='file' onChange={this.handleChangeSignImage} />
                    </div>
                </div>
                <div className='saveSection'>
                    <button className='save-btn' onClick={() => this.saveProfile()}>Зберегти</button>
                </div>


            </div>
        )
    }
}
