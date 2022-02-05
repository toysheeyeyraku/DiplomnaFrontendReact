import axios from 'axios';
import authService from './AuthService';

export class ApiService {
  constructor() {
    
  }

  public callApi(): Promise<any> {
    return authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._callApi(user.access_token).catch(error => {
          if (error.response.status === 401) {
            return authService.renewToken().then(renewedUser => {
              return this._callApi(renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return authService.renewToken().then(renewedUser => {
          return this._callApi(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  private _callApi(token: string) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Access-Control-Allow-Origin' : "*",
      'Access-Control-Allow-Headers' : "Origin, X-Requested-With, Content-Type, Accept"
      
    };

    return axios.get('https://localhost:5001/weatherforecast', { headers });
  }
}
