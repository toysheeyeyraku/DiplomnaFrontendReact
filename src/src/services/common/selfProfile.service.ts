import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";


class SelfProfileService {
    public async saveSelfProfileImage(selfProfileImage: any) {
        if (selfProfileImage) {
            const formData = new FormData();
            formData.append('image', selfProfileImage, 'file');
            await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/common/profileImage/update', formData);
        }

    }

    public async saveSignImage(selfSignImage: any) {
        if (selfSignImage) {
            const formData = new FormData();
            formData.append('image', selfSignImage, 'file');
            await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/common/signImage/update', formData);
        }

    }

    public async saveSelfProfileData(profileUpdateRequest: any) {
        await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/common/profile/update', profileUpdateRequest);
    }

    public async getSelfProfile() {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, 'https://localhost:5002/common/profile');
        return result;
    }
}

const selfProfileService = new SelfProfileService();
export default selfProfileService;