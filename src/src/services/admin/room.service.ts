import { AxiousRequestMethod } from "../../types/axiosRequestMethod.type";
import apiRequestService from "../ApiRequestService";

class RoomService {
    public async updateRoom(roomDto: any) {
        await apiRequestService.makeRequest(AxiousRequestMethod.post, 'https://localhost:5002/admin/room', roomDto);
    }

    public async getRoom(roomName?: string | null) {
        if (roomName) {
            const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/admin/room?roomName=${roomName}`);
            return result;
        } else {
            const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/admin/room?roomName=unselected`);
            return result;
        }

    }

    public async getRooms() {
        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, `https://localhost:5002/admin/room/all`);
        return result;
    }

    public async updateRoomImage(studentProfileImage: any, roomName: string) {
        if (studentProfileImage && roomName) {
            const formData = new FormData();
            formData.append('image', studentProfileImage, 'file');
            const result = await apiRequestService.makeRequest(AxiousRequestMethod.post, `https://localhost:5002/admin/room/updateImage?roomName=${roomName}`, formData);
        }

    }
}

const roomService = new RoomService();
export default roomService;