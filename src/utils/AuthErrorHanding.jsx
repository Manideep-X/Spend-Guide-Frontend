const AuthErrorHanding = async (res) => {
    
    if (!res.ok) {
        
        // Need to check if the response have a body before trying to convert it to json.
        let resData = {};
        try {
            resData = await res.json();
        } catch (error) {
            resData = {}
        }

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
            throw { status: res.status, message, redirect: "/signup" };
        }
        
        throw { status: res.status, message, redirect: "/signin" };
        
    }

    return res;

}

export default AuthErrorHanding