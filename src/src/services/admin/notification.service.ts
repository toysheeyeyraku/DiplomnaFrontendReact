import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";

class NotificationService {
    public async addNotification(notification: any) {
        await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/home', notification);
    }
}

const notificationService = new NotificationService();
export default notificationService;