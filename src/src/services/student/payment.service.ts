import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";

class PaymentService {
    async uploadPaymentCheck(paymentCheck: any) {
        const formData = new FormData();
        formData.append('image', paymentCheck, 'file');
        await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/student/payment', formData);
    }

    async getPayments() {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, 'https://localhost:5002/student/payment');
        return result;
    }

}

const paymentService = new PaymentService();
export default paymentService;