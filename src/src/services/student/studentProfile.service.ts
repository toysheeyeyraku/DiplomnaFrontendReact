import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";


class StudentProfileService {
    public async saveStudentProfileImage(studentProfileImage: any) {
        if (studentProfileImage) {
            const formData = new FormData();
            formData.append('image', studentProfileImage, 'file');
            await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/student/profileImage/update', formData);
        }

    }

    public async saveStudentProfileData(profileUpdateRequest: any) {
        await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/student/profile/update', profileUpdateRequest);
    }

    public async getStudentProfile() {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, 'https://localhost:5002/student/profile');
        return result;
    }
}

const studentProfileService = new StudentProfileService();
export default studentProfileService;