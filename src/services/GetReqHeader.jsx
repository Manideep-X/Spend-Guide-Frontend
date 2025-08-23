const GetReqHeader = () => {
    
    // Get token from the localStorage
    const token = localStorage.getItem("token");

    // Set the header data
    const headerData = {
        "Content-type": "application/json"
    };
    if (token) {
        headerData["Authorization"] = `Bearer ${token}`
    }

    // Return header
    return headerData;

}

export default GetReqHeader