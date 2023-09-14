import { UPLOAD_FILES_URL } from "constants/api";
import httpServices from "./httpServices";

class UploadService {
    uploadFiles(data) {
        return httpServices.post(UPLOAD_FILES_URL, data)
    }
}

export default new UploadService