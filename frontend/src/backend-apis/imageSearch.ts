import type { NasaImageSearchResponse } from "../shared/types";


export const searchUrl = "https://images-api.nasa.gov/search?q=";

export const getNasaImageCollections = async (searchword : string)  =>{


    const response  = await fetch(`${searchUrl}${searchword}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(response.status === 200) {

        const responseData : NasaImageSearchResponse = await response.json();
        return responseData

    }

    if (response.status === 404) {
        throw new Error("No results found")
    } else if (response.status === 500) {
        throw new Error("Internal server error.");
    } else if (response.status !== 200) {
        throw new Error("An unexpected error occurred.");
    }



}


export const getRandomImage = (collections : NasaImageSearchResponse)  => {

    const maxCollectionIndex = collections.collection.items.length  - 1
    const randomIndex = Math.floor(Math.random() * (maxCollectionIndex + 1));
    const maxLinksIndex = collections.collection.items[randomIndex].links.length - 1;
    const randomLinkIndex = Math.floor(Math.random() * (maxLinksIndex + 1));
    const randomImageUrl = collections.collection.items[randomIndex].links[randomLinkIndex].href;
    return randomImageUrl;

  }