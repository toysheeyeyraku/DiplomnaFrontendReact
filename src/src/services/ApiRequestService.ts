import authService from "./AuthService";
import axios from 'axios';
import { AxiousRequestMethod } from "../types/axiosRequestMethod.type";

class ApiRequestService {
    constructor() {

    }

    public async getRequestHeaders() {
        let token = await authService.getAccessToken();
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
            'Content-Type': 'application/json',

        };

        return headers;
    }

    public async makeRequest(requestMethod: AxiousRequestMethod, requestUrl: string, data?: any) {
        const headers = await this.getRequestHeaders();
        data = data ? data : {};
        const result = await axios({
            method: requestMethod,
            url: requestUrl,
            data,
            headers,
        });
        return result;
    }

    public async makeRequestAnonim(requestMethod: AxiousRequestMethod, requestUrl: string, data?: any) {
        data = data ? data : {};
        const result = await axios({
            method: requestMethod,
            url: requestUrl,
            data,
        });
        return result;
    }

    public async downloadFile(requestUrl: string) {
        const FileDownload = require('js-file-download');
        const headers = await this.getRequestHeaders();
        axios({
            url: requestUrl,
            method: 'GET',
            responseType: 'blob', // Important,
            headers
        }).then((response) => {
            FileDownload(response.data, 'report.docx');
        });
    }
}

const apiRequestService = new ApiRequestService();
export default apiRequestService;