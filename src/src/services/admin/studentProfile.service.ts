import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";


class StudentProfileService {
    public async saveStudentProfileImage(studentProfileImage: any, userId: string) {
        if (studentProfileImage) {
            const formData = new FormData();
            formData.append('image', studentProfileImage, 'file');
            await apiRequestService.makeRequest(AxiousRequestMethod.post, `https://localhost:5002/admin/student/profileImage/update?userId=${userId}`, formData);
        }

    }

    public async saveStudentProfileData(profileUpdateRequest: any, userId: string) {


        await apiRequestService.makeRequest(AxiousRequestMethod.post, `https://localhost:5002/admin/student/profile/update?userId=${userId}`, profileUpdateRequest);
    }

    public async getStudentProfile(userId: string) {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/admin/student/profile?userId=${userId}`);
        return result;
    }
}

const studentProfileService = new StudentProfileService();
export default studentProfileService;