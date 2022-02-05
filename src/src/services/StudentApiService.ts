import axios from 'axios';
import authService from './AuthService';

class StudentApiService {
    constructor() {

    }

    private async getHeaders(): Promise<any> {
        const token = await authService.getAccessToken();
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"

        };
        return headers;
    }

    public async getStudentProfile() {

        const headers = await this.getHeaders();

        return axios.get('https://localhost:5002/student/profile', { headers });
    }
}

const studentApiService = new StudentApiService();
export default studentApiService;
