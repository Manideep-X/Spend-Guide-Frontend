import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetReqHeader } from "../utils/GetReqHeader"
import InExErrorHandling from "../utils/InExErrorHandling"

const filterLatestTransactions = async (
        { type, startDate, endDate, keyword, sortingParameter, sortingOrder }
    ) => {

    const res = await fetch(API_ENDPOINTS.filter, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify({ type, startDate, endDate, keyword, sortingParameter, sortingOrder })
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: `${type}`, isItFilter: true });

    // This will return the json body of the response
    return await resOK.json();

}

export { filterLatestTransactions }