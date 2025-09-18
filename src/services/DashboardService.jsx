import { UserFetchErrHandling } from "../utils/AuthErrorHanding";
import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetReqHeader } from "../utils/GetReqHeader"

// Gets a JSON of :
// 1. totalBalance
// 1. totalIncome
// 2. totalExpense
// 3. last5Incomes
// 4. last5Expenses
// 5. last10Transactions

const getDashboardDetails = async () => {

    const res = await fetch(API_ENDPOINTS.dashboard, {
        method: "GET",
        headers: GetReqHeader()
    });

    // Error handling for different status code
    const resOK = await UserFetchErrHandling(res);

    // This will return the json body of the response
    return await resOK.json();

}

export { getDashboardDetails }