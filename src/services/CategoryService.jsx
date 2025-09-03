import CateErrorHandling from "../utils/CateErrorHandling";
import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetReqHeader } from "../utils/GetReqHeader"

// Save a new category
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

// Get a list of all categories
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

// Gets a list of categories of a perticular type
const getCategoriesByType = async ({ type }) => {
    
    const res = await fetch(`${API_ENDPOINTS.category}/${type}`, {
        method: "GET",
        headers: GetReqHeader()
    });
    
    // Error handling for different status code for fetching list of categories
    const resOK = await CateErrorHandling(res);
    
    // This will return the json body of the response
    return await resOK.json();
    
}

// Updates a category by it's ID
const updateCategory = async ({ id, name, iconUrl, type }) => {
    
    const res = await fetch(`${API_ENDPOINTS.category}/${id}`, {
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