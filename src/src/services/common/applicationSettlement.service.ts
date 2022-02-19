import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";

class ApplicationSettlementService {
    public async saveApplicationForSettlement(applicationForSettlement: any) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/student/applicationSettlement', applicationForSettlement);
        return result;
    }

    public async getApplicationForSettlementForStudent() {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, 'https://localhost:5002/student/applicationSettlement');
        return result;
    }

    public async getApplicationForSettlement(studentId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/common/applicationSettlement?studentId=${studentId}`);
        return result;
    }

    public async deanSignForSettlement(applicationSettlementId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.post, `https://localhost:5002/dean/applicationSettlement/sign?applicationSettlementId=${applicationSettlementId}`);
        return result;
    }

    public async comendantSignForSettlement(applicationSettlementId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.post, `https://localhost:5002/comendant/applicationSettlement/sign?applicationSettlementId=${applicationSettlementId}`);
        return result;
    }
    public async getWordForSettlement(applicationSettlementId: string) {
        const result = await apiRequestService.downloadFile(`https://localhost:5002/common/generateWord?applicationSettlementId=${applicationSettlementId}`);
        return result;
    }

}

const applicationSettlementService = new ApplicationSettlementService();
export default applicationSettlementService;