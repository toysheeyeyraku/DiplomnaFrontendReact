import * as React from 'react';
import './registration.css'
import axios from 'axios';
import authService from '../../services/AuthService';

export default class RegistrationComponent extends React.Component<any> {

  state = {
    userName: '',
    password: '',
    role: '',
  }

  constructor(props: any) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      role: '',
    }
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.register = this.register.bind(this);
  }

  handleChangeUserName(event: any) {
    this.setState({ userName: event.target.value });
  }

  handleChangePassword(event: any) {
    this.setState({ password: event.target.value });
  }

  handleChangeRole(event: any) {
    this.setState({ role: event.target.value });
  }


  private async register(): Promise<void> {
    try {
      let token = await authService.getAccessToken();
      const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"

      };

      let registrationObject = {
        UserName: this.state.userName,
        Password: this.state.password,
        Role: this.state.role
      }


      let result = await axios.post('https://localhost:5000/registration', registrationObject, { headers });
      console.log(result);
    }
    catch (error) {
      console.log(error);
    }

  }

  private updateUserName(event: any) {
    console.log(event);
  }



  public render() {
    return (
      <div>
        <div className='text-component'>
          <p>UserName</p>
          <input type="text" value={this.state.userName} onChange={this.handleChangeUserName} />
        </div>
        <div className='text-component'>
          <p>Password</p>
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
        </div>
        <div className='text-component'>
          <p>Role</p>
          <input type="text" value={this.state.role} onChange={this.handleChangeRole} />
        </div>
        <button onClick={this.register}>Register</button>
      </div>
    )
  }
}
