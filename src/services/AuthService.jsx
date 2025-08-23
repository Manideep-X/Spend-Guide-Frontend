import AuthErrorHanding from "../utils/AuthErrorHanding";
import GetReqHeader from "../utils/GetReqHeader";
import { API_ENDPOINTS } from "../utils/EndpointsConfig";

// Fetching from /login endpoint
const signin = async (email, password) => {

    const res = await fetch(`${API_ENDPOINTS.login}`, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify({email, password})
    });
    
    // Error handling for different status code
    const resOK = null;
    try {
        resOK = await AuthErrorHanding(res);
    } catch (error) {
        console.error(error);
    }

    // Need to fetch that JWT token and save it in the local storage
    if(resOK != null) {
        const userDetails = await resOK.json();
        if (userDetails.token) {
            localStorage.setItem("token", userDetails.token);
        }
        return userDetails;
    }
    return null;
    
}

// Fetching from /register endpoint
const signup = async (userDetails) => {
    
    const res = await fetch(`${API_ENDPOINTS.register}`, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify(userDetails)
    });

    // Error handling for different status code
    const resOK = null;
    try {
        resOK = await AuthErrorHanding(res);
        return await resOK.json();
    } catch (error) {
        console.error(error);
    }
    return null;
    
}

export { signin, signup }