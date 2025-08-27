import { API_ENDPOINTS, UPLOAD_PRESET_CLOUDINARY } from "../utils/EndpointsConfig";
import ImageErrorHandling from "../utils/ImageErrorHandling";

// Fetching the URL for uploading the profile image
const uploadImg = async (imgFile) => {
    
    const formData = new FormData();
    formData.append("file", imgFile)
    formData.append("upload_preset", UPLOAD_PRESET_CLOUDINARY)

    const res = await fetch(API_ENDPOINTS.uploadImg, {
        method: "POST",
        body: formData
    });

    // Error handling for different status code
    const resOK = await ImageErrorHandling(res);

    // Returns the https url of the uploaded image
    const resData = await resOK.json();
    console.log("Image Uploaded! ", resData);
    return resData.secure_url;

}


export { uploadImg }