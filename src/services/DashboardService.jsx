import { UserFetchErrHandling } from "../utils/AuthErrorHanding";
import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetReqHeader } from "../utils/GetReqHeader"

// Gets a JSON of :
// 1. total income
// 2. total expense
// 3. last 5 incomes
// 4. last 5 expenses
// 5. last 10 transactions

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