const ExcelErrorHandling = async ({ res, expenseOrIncome }) => {
    
    if (!res.ok) {

        let message = "Unexpected error happened: ERROR " + res.status;
        let redirect = "/" + expenseOrIncome;

        if (res.status >= 400 && res.status < 500) {
            if (res.status === 404) {
                message = "Session expired or user not found! Try signing in again";
                redirect = "/signin";
            }
        }

        else if (res.status >= 500) {
            message = "Internal server error! Try again after some time";
            redirect = "/" + expenseOrIncome;
        }

        throw { status: res.status, message, redirect };

    }

    return res;

}

export default ExcelErrorHandling