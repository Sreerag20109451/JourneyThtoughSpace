import type { NeoBrowseResponse, NeoFeedResponse, NeoLookupResponse } from "../shared/types";

export const backendIndexurl = "https://journeythtoughspace-server.onrender.com/api/";

export const neoBrowse =  async (pagenum :number) : Promise<NeoBrowseResponse> => {

    const response  = await fetch(`${backendIndexurl}neo/browse?page=${pagenum}`, {headers : {
        "Content-Type": "application/json",
    }});

    if (response.status === 404) {
        throw new Error("No results found");
    } else if (response.status === 500) {
        throw new Error("Internal server error.");
    } else if (response.status !== 200) {
        throw new Error("An unexpected error occurred.");
    }
    
    const responseData : NeoBrowseResponse = await response.json();
    return responseData;
    

}


export const neoLookup = async ( refid : number): Promise<NeoLookupResponse> => {

    const response  = await fetch(`${backendIndexurl}neo/lookup/${refid}`, {headers : {
        "Content-Type": "application/json",
    }});

    if (response.status === 404) {
        throw new Error("No results found");
    } else if (response.status === 500) {
        throw new Error("Internal server error.");
    } else if (response.status !== 200) {
        throw new Error("An unexpected error occurred.");
    }
    
    const responseData : NeoLookupResponse = await response.json();
    return responseData;
    

}

export const getNeoFeed = async (startDate: string, endDate: string): Promise<NeoFeedResponse> => {

    const response = await fetch(`${backendIndexurl}neo/feed?start_date=${startDate}&end_date=${endDate}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 404) {
        throw new Error("No results found");
    } else if (response.status === 500) {
        throw new Error("Internal server error.");
    } else if (response.status !== 200) {
        throw new Error("An unexpected error occurred.");
    }

    const responseData = await response.json();
    return responseData;

}

export const getLiveFeed = async (): Promise<NeoFeedResponse> => {

    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; 

    const response = await fetch(`${backendIndexurl}neo/feed?start_date=${startDate}&end_date=${endDate}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 404) {
        throw new Error("No results found");
    } else if (response.status === 500) {
        throw new Error("Internal server error.");
    } else if (response.status !== 200) {
        throw new Error("An unexpected error occurred.");
    }

    const responseData = await response.json();
    return responseData;

}


export const neoSearch = async (queryItem : string) : Promise<NeoLookupResponse[]> => {


    let url = `${backendIndexurl}neo/browse`;

    if(/^\d+$/.test(queryItem)){

        url = `${url}?id=${queryItem}`;

    }
    else{
        url = `${url}?name=${queryItem}`;
    }

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 404) {
        throw new Error("No results found");
    } else if (response.status === 500) {
        throw new Error("Internal server error.");
    } else if (response.status !== 200) {
        throw new Error("An unexpected error occurred.");
    } 
    const responseData : NeoLookupResponse[] = await response.json();
    return responseData;

}