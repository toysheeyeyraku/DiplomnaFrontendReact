import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";


class DebtService {
    async getDebt(userId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/admin/debt?userId=${userId}`);
        return result;
    }

    async updateDebtDebt(debtDto: any, userId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.post, `https://localhost:5002/admin/debt?userId=${userId}`, debtDto);

    }
}

const debtService = new DebtService();
export default debtService;