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

    // This will return the json body of the response
    return await resOK.json();
    
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

    // This will return the json body of the response
    return await resOK.json();
    
}

export { signin, signup }