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

export { GetReqHeaderAuth, GetReqHeader }