import CateErrorHandling from "../utils/CateErrorHandling";
import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetReqHeader } from "../utils/GetReqHeader"

const saveCategory = async ({ name, iconUrl, type }) => {
    
    const res = await fetch(API_ENDPOINTS.category, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify({ name, iconUrl, type })
    });

    // Error handling for different status code for saving a category
    const resOK = await CateErrorHandling(res);

    // This will return the json body of the response
    return await resOK.json();

}

const getCategories = async () => {

    const res = await fetch(API_ENDPOINTS.category, {
        method: "GET",
        headers: GetReqHeader()
    });

    // Error handling for different status code for fetching list of categories
    const resOK = await CateErrorHandling(res);

    // This will return the json body of the response
    return await resOK.json();
    
}

const getCategoriesByType = async ({ type }) => {
    
    const res = await fetch(API_ENDPOINTS.category, {
        method: "GET",
        headers: GetReqHeader(),
        body: JSON.stringify({ type })
    });
    
    // Error handling for different status code for fetching list of categories
    const resOK = await CateErrorHandling(res);
    
    // This will return the json body of the response
    return await resOK.json();
    
}

const updateCategory = async ({ name, iconUrl, type }) => {
    
    const res = await fetch(API_ENDPOINTS.category, {
        method: "PUT",
        headers: GetReqHeader(),
        body: JSON.stringify({ name, iconUrl, type })
    });
    
    // Error handling for different status code for fetching list of categories
    const resOK = await CateErrorHandling(res);
    
    // This will return the json body of the response
    return await resOK.json();

}

export { saveCategory, getCategories, getCategoriesByType, updateCategory }