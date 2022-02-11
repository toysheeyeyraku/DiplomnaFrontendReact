import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";


class HomeService {
    public async getNotifications() {
        const result = await apiRequestService.makeRequestAnonim(AxiousRequestMethod.get, 'https://localhost:5002/home');
        return result;
    }
}

const homeService = new HomeService();
export default homeService;