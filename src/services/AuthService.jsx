import AuthErrorHanding from "../utils/AuthErrorHanding";
import GetReqHeader from "../utils/GetReqHeader";
import { API_ENDPOINTS } from "../utils/EndpointsConfig";

// Fetching from /login endpoint
const signin = async ({email, password}) => {

    const res = await fetch(`${API_ENDPOINTS.login}`, {
        method: "POST",
        headers: GetReqHeader({ resType: "signin" }),
        body: JSON.stringify({email, password})
    });
    
    // Error handling for different status code
    const resOK = await AuthErrorHanding(res);

    // Need to fetch that JWT token and save it in the local storage
    const userDetails = await resOK.json();
    if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
    }
    return userDetails;
    
}

// Fetching from /register endpoint
const signup = async ({firstName, lastName, email, password}) => {
    
    const res = await fetch(`${API_ENDPOINTS.register}`, {
        method: "POST",
        headers: GetReqHeader({ resType: "signup" }),
        body: JSON.stringify({ firstName, lastName, email, password })
    });

    // Error handling for different status code
    const resOK = await AuthErrorHanding(res);
    return await resOK.json();
    
}

export { signin, signup }