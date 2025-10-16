// For Production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// For local
// export const API_BASE_URL = "http://localhost:8082/api/v1";

const UPLOAD_IMG = import.meta.env.VITE_IMG_PRESET_CLOUDINARY;
export const UPLOAD_PRESET_CLOUDINARY = import.meta.env.VITE_UPLOAD_PRESET_CLOUDINARY;

export const API_ENDPOINTS = {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    userDetails: `${API_BASE_URL}/profile-details`,
    income: `${API_BASE_URL}/income`,
    expense: `${API_BASE_URL}/expense`,
    category: `${API_BASE_URL}/category`,
    dashboard: `${API_BASE_URL}/dashboard`,
    filter: `${API_BASE_URL}/filter`,
    downloadIncomeDetails: `${API_BASE_URL}/excel/download-income`,
    downloadExpenseDetails: `${API_BASE_URL}/excel/download-expense`,
    emailIncomeDetails: `${API_BASE_URL}/excel/email-income`,
    emailExpenseDetails: `${API_BASE_URL}/excel/email-expense`,
    uploadImg: `${UPLOAD_IMG}`
};

export const TEST_TOKEN_ENDPOINT = `${API_BASE_URL}/test`;

export const ACTIVATION_ENDPOINT = `${API_BASE_URL}/activate`;

export const TEST_API_ENDPOINTS = [
    `${API_BASE_URL}/health`, `${API_BASE_URL}/info`, `${API_BASE_URL}/status`
];