import { useNavigate } from "react-router-dom";

const CateErrorHandling = async (res) => {
    const navigate = useNavigate();
    
    if (!res.ok) {
        let message = `Unexpected error happened: ERROR ${res.status}`;
        
        if(res.status >= 400 || res.status < 500) {
            if(res.status === 403) {
                message = "Session expired or invalid token: Sign in again";
                navigate("/login", { state: { message: `${message}` } });
                throw new Error(message);
            }
            else if(res.status === 404) {
                message = `Unknown Category: This Category is not present`;
            }
            else if(res.status === 409) {
                message = `Duplicate Category: This Category is already present`;
            }
        }
        
        else if(res.status >= 500) {
            message = "The server is down or under maintenance at the monent. Please try again later!"
            navigate("/server-down", { state: { message: `${message}` } });
            throw new Error(message);
        }
        
        navigate("/category", { state: { message: `${message}` } });
        throw new Error(message);
        
    }

    return res;

}

export default CateErrorHandling