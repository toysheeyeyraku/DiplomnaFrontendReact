import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";


class DebtService {
    async getDebt() {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, 'https://localhost:5002/student/debt');
        return result;
    }
}

const debtService = new DebtService();
export default debtService;