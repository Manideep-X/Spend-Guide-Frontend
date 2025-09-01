const CateErrorHandling = async (res) => {
    
    if (!res.ok) {

        let message = `Unexpected error happened: ERROR ${res.status}`;
        
        if(res.status >= 400 && res.status < 500) {
            if(res.status === 403) {
                message = "Session expired or invalid token: Sign in again";
                throw { status: res.status, message, redirect: "/signin" };
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
            // throw { status: res.status, message, redirect: "/server-down" };
            throw { status: res.status, message, redirect: "/signin" };
        }
        
        throw { status: res.status, message, redirect: "/category" };
        
    }

    return res;

}

export default CateErrorHandling