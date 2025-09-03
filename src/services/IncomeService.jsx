import { API_ENDPOINTS } from "../utils/EndpointsConfig";
import { GetReqHeader } from "../utils/GetReqHeader";
import InExErrorHandling from "../utils/InExErrorHandling";

const saveNewIncome = async ({ name, iconUrl, date, amount }) => {
    
    const res = await fetch(API_ENDPOINTS.income, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify({ name, iconUrl, date, amount })
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: "income", isItFilter: false });

    // This will return the json body of the response
    return await resOK.json();

}

const getIncomesForCurrMonth = async () => {

    const res = await fetch(API_ENDPOINTS.income, {
        method: "GET",
        headers: GetReqHeader()
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: "income", isItFilter: false });

    // This will return the json body of the response
    return await resOK.json();

}

const deleteAnIncomeById = async ({ id }) => {

    const res = await fetch(`${API_ENDPOINTS.income}/${id}`, {
        method: "GET",
        headers: GetReqHeader()
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: "income", isItFilter: false });

    // This will return the json body of the response
    return await resOK.json();

}

export { saveNewIncome, getIncomesForCurrMonth, deleteAnIncomeById }