import { useNavigate } from "react-router-dom";

const InExErrorHandling = async (res, isItExpense) => {
    const navigate = useNavigate();
    
    if (!res.ok) {
        const resData = await res.json();
        let expenseOrIncome = isItExpense ? "expense" : "income";
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
                navigate(`/${expenseOrIncome}`, { state: { message: `${message}` } });
                throw new Error(message);
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

export default InExErrorHandling