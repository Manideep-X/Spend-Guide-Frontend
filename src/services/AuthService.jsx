import AuthErrorHanding, { UserFetchErrHandling } from "../utils/AuthErrorHanding";
import { API_ENDPOINTS } from "../utils/EndpointsConfig";
import { GetReqHeader, GetReqHeaderAuth } from "../utils/GetReqHeader";

// Fetching from /login endpoint
const signin = async ({email, password}) => {

    const res = await fetch(`${API_ENDPOINTS.login}`, {
        method: "POST",
        headers: GetReqHeaderAuth(),
        body: JSON.stringify({email, password})
    });
    
    // Error handling for different status code
    const resOK = await AuthErrorHanding(res);

    // This will return the json body of the response
    return await resOK.json();
    
}

// Fetching from /register endpoint
const signup = async ({firstName, lastName, email, password, imageUrl}) => {
    
    const res = await fetch(`${API_ENDPOINTS.register}`, {
        method: "POST",
        headers: GetReqHeaderAuth(),
        body: JSON.stringify({ firstName, lastName, email, password, imageUrl })
    });

    // Error handling for different status code
    const resOK = await AuthErrorHanding(res);

    // This will return the json body of the response
    return await resOK.json();
    
}

const fetchUser = async () => {

    const res = await fetch(`${API_ENDPOINTS.userDetails}`, {
        method: "GET",
        headers: GetReqHeader()
    })
    
    // Error handling for different status code for fetching user details
    const resOK = await UserFetchErrHandling(res);

    // This will return the json body of the response
    return await resOK.json();

}

export { signin, signup, fetchUser }