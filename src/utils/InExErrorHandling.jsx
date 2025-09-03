const InExErrorHandling = async ({ res, expenseOrIncome, isItFilter }) => {
    
    if (!res.ok) {

        const resData = {};
        try {
            resData = await res.json();
        } catch (error) {
            resData = {};
        }

        let message = `Unexpected error happened: ERROR ${res.status}`;
        
        if(res.status >= 400 || res.status < 500) {
            if(res.status === 403) {
                message = "Session expired or invalid token: Sign in again";
            }
            else if(res.status === 404) {
                if(resData.message) {
                    expenseOrIncome = resData.message;
                }
                message = `Unknown ${expenseOrIncome}: This ${expenseOrIncome} is not present`;

                if(isItFilter)
                    throw { status: res.status, message, redirect: "/filter" };
                
                throw { status: res.status, message, redirect: `/${expenseOrIncome}` };
            }
        }
        
        else if(res.status >= 500) {
            message = "The server is down or under maintenance at the monent. Please try again later!"
        }
        
        throw { status: res.status, message, redirect: "/signin" };
        
    }

    return res;

}

export default InExErrorHandling