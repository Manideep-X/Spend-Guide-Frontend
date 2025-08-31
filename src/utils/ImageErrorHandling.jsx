const ImageErrorHandling = async (res) => {
    
    if (!res.ok) {
        
        // Need to check if the error response have a body before trying to convert it to json.
        let resData = {};
        try {
            resData = await res.json();
        } catch (error) {
            resData = {
                "error": {
                    "message": error
                }
            }
        }

        let message = `Unexpected error happened: ERROR ${resData.error.message || res.status}`;
        
        if(res.status >= 400 && res.status < 500) {
            if(resData.error.message) {
                message = resData.message;
            } else {
                message = "The file no longer exists. Please try again!"
            }
        }
        
        else if(res.status >= 500) {
            message = "The server is down or under maintenance at the monent. Please try again later!"
        }
        
        throw { status: res.status, message, redirect: "/signup" };
        
    }

    return res;

}

export default ImageErrorHandling