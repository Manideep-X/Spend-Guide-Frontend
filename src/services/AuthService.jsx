import GetReqHeader from "./GetReqHeader";

const API_BASE_URL = "https://spend-guide.onrender.com/api/v1";

const signin = async (email, password) => {

    const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify({email, password})
    });
    if (!res.ok) {
        if (res.status >= 500)
            throw new Error("Signing-in failed!");
    }

    // Need to fetch that JWT token and save it in local storage
    const userDetails = await res.json();
    if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
    }
    return data;
    
}

const signup = async (userDetails) => {
    
    const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify(userDetails)
    });
    if (!res.ok) {  
        throw new Error("Signing-up failed!");
    }
    return await res.json();
    
}

export { signin, signup }