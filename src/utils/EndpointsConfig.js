export const API_BASE_URL = "https://spend-guide.onrender.com/api/v1";

const CLOUDNAME_CLOUDINARY = "dzujr0hdo";
export const UPLOAD_PRESET_CLOUDINARY = "SpendGuide";

export const API_ENDPOINTS = {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    income: `${API_BASE_URL}/income`,
    expense: `${API_BASE_URL}/expense`,
    category: `${API_BASE_URL}/category`,
    filter: `${API_BASE_URL}/filter`,
    uploadImg: `https://api.cloudinary.com/v1_1/${CLOUDNAME_CLOUDINARY}/image/upload`
};

export const TEST_TOKEN_ENDPOINT = `${API_BASE_URL}/test`;

export const ACTIVATION_ENDPOINT = `${API_BASE_URL}/activate`;

export const TEST_API_ENDPOINTS = [
    `${API_BASE_URL}/health`, `${API_BASE_URL}/info`, `${API_BASE_URL}/status`
];