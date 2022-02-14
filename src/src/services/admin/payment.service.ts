import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";

class AdminPaymentService {

    async getPayments(userId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/admin/payment?userId=${userId}`);
        return result;
    }

}

const adminPaymentService = new AdminPaymentService();
export default adminPaymentService;