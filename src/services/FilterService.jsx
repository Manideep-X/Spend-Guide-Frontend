import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetReqHeader } from "../utils/GetReqHeader"
import InExErrorHandling from "../utils/InExErrorHandling"

const filterLatestTransactions = async (filterFields) => {

    const res = await fetch(API_ENDPOINTS.filter, {
        method: "POST",
        headers: GetReqHeader(),
        body: JSON.stringify(filterFields)
    });

    // Error handling for different status code
    const resOK = await InExErrorHandling({ res, expenseOrIncome: `${filterFields.type}`, isItFilter: true });

    // This will return the json body of the response
    return await resOK.json();

}

export { filterLatestTransactions }