import axios from 'axios';
import authService from './AuthService';
import apiRequestService from './ApiRequestService';
import { AxiousRequestMethod } from '../types/axiosRequestMethod.type';

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
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, 'https://localhost:5002/student/profile');
        return result;
    }

    public async getStudentAdminProfile(userId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/admin/student/profile?userId=${userId}`);
        return result;
    }
}

const studentApiService = new StudentApiService();
export default studentApiService;
