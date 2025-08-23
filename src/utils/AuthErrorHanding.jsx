import { useNavigate } from "react-router-dom";

const AuthErrorHanding = async (res) => {
    const navigate = useNavigate();
    
    if (!res.ok) {
        const resData = await res.json();
        let message = `Unexpected error happened: ERROR ${res.status}`;
        
        if(res.status >= 400 || res.status < 500) {
            if(res.status >= 400 || res.status < 409) {
                if(resData.message) {
                    message = resData.message;
                }
            }
            else if(res.status === 409) {
                if(resData.message) {
                    message = resData.message;
                } else {
                    message = "Email already exists: Use a different email";
                }
            }
        }
        
        else if(res.status >= 500) {
            message = "The server is down or under maintenance at the monent. Please try again later!"
            navigate("/server-down", { state: { message: `${message}` } });
            throw new Error(message);
        }
        
        navigate("/login", { state: { message: `${message}` } });
        throw new Error(message);
        
    }

    return res;

}

export default AuthErrorHanding