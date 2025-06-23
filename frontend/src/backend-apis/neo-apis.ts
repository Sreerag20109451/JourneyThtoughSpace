import type { NeoBrowseResponse, NeoLookupResponse } from "../shared/types";

export const backendIndexurl = "http://localhost:3000/api/";

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