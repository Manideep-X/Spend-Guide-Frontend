const GetReqHeader = () => {
    
    // Get token from the localStorage
    const token = localStorage.getItem("token") || "";

    // Set the header data
    const headerData = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    };

    // Return header
    return headerData;

}

const GetReqHeaderAuth = () => {

    // Set the header data
    const headerData = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    // Return header
    return headerData;

}

const GetExcelReqHeader = () => {

    // Get token from the localStorage
    const token = localStorage.getItem("token") || "";

    // Set the header data
    const headerData = {
        "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Authorization": `Bearer ${token}`
    };

    // Return the header
    return headerData;

}

export { GetReqHeaderAuth, GetReqHeader, GetExcelReqHeader }