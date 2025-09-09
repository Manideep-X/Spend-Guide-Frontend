import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetReqHeader } from "../utils/GetReqHeader"
import InExErrorHandling from "../utils/InExErrorHandling"

const saveNewExpense = async (expense) => {
    
    const res = await fetch(API_ENDPOINTS.expense, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify(expense)
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: "expense", isItFilter: false });

    // This will return the json body of the response
    return await resOK.json();

}

const getExpensesForCurrMonth = async () => {

    const res = await fetch(API_ENDPOINTS.expense, {
        method: "GET",
        headers: GetReqHeader()
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: "expense", isItFilter: false });

    // This will return the json body of the response
    return await resOK.json();

}

const deleteAnExpenseById = async ({ id }) => {

    const res = await fetch(`${API_ENDPOINTS.expense}/${id}`, {
        method: "GET",
        headers: GetReqHeader()
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: "expense", isItFilter: false });

    // This will return the json body of the response
    return await resOK.json();

}

export { saveNewExpense, getExpensesForCurrMonth, deleteAnExpenseById }