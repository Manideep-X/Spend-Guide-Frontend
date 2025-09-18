import { API_ENDPOINTS } from "../utils/EndpointsConfig"
import { GetExcelReqHeader } from "../utils/GetReqHeader"
import ExcelErrorHandling from "../utils/ExcelErrorHandling";

const downloadIncomes = async () => {

    const res = await fetch(API_ENDPOINTS.downloadIncomeDetails, {
        method: "GET",
        headers: GetExcelReqHeader()
    });

    // Error handling for different status code
    const resOK = await ExcelErrorHandling({ res, expenseOrIncome: "income" });

    // This will return the blob of the response as the backend is returning binary(excel)
    return await resOK.blob();

}

const downloadExpenses = async () => {

    const res = await fetch(API_ENDPOINTS.downloadExpenseDetails, {
        method: "GET",
        headers: GetExcelReqHeader()
    });

    // Error handling for different status code
    const resOK = await ExcelErrorHandling({ res, expenseOrIncome: "expense" });

    // This will return the blob of the response as the backend is returning binary(excel)
    return await resOK.blob();

}

const emailIncomes = async () => {

    const res = await fetch(API_ENDPOINTS.emailIncomeDetails, {
        method: "GET",
        headers: GetExcelReqHeader()
    });

    // Error handling for different status code
    await ExcelErrorHandling({ res, expenseOrIncome: "income" });

    // Nothing will be returned for successful sending of email

}

const emailExpenses = async () => {

    const res = await fetch(API_ENDPOINTS.emailExpenseDetails, {
        method: "GET",
        headers: GetExcelReqHeader()
    });

    // Error handling for different status code
    await ExcelErrorHandling({ res, expenseOrIncome: "expense" });

    // Nothing will be returned for successful sending of email

}

export { downloadIncomes, downloadExpenses, emailIncomes, emailExpenses }