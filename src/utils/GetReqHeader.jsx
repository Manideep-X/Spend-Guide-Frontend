const GetReqHeader = ({resType}) => {
    
    // Get token from the localStorage
    const token = localStorage.getItem("token");

    // Set the header data
    const headerData = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
    if (token && (resType != "signin" && resType != "signup")) {
        headerData["Authorization"] = `Bearer ${token}`
    }

    // Return header
    return headerData;

}

export default GetReqHeader