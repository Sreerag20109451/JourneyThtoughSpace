import { catchAsync } from "async-handler-express";
import { Request, Response } from "express";
import { NeoBrowseResponse, NeoFeedResponse, NeoLookupResponse } from "../shared/types";
import dotenv from "dotenv";
import { getDateDifferenceInDays} from "../shared/utils";
import { neoBrowseURL, neoFeedURL, neoLookupURL } from "../nasa-apis/neo-apis";
import { log } from "console";
dotenv.config();


// For feeds with start and end dates

export const neoFeed = catchAsync(async (req: Request, res: Response) => {

const { start_date, end_date } = req.query!!;
  if (getDateDifferenceInDays(start_date as string, end_date as string) > 7) {
    return res
      .status(403)
      .json({ message: "The date range cannot exceed 7 days." });
  }

  const feedUrl = `${neoFeedURL}?start_date=${start_date}&end_date=${end_date}&api_key=${process.env.NASA_API_KEY}`;
  const response = await fetch(feedUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(response.status == 404) return res.status(404).json({ message: "NEO not found." });
  if(response.status == 500) return res.status(500).json({ message: "Internal server error." });
  const responseData: NeoFeedResponse = await response.json();
  return res.status(200).json(responseData);
});



// For lookup one particular NEO by ID

export const lookupNeo = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;
    if(!id) return res.status(400).json({ message: "ID parameter is required." });
    const lookupUrl = `${neoLookupURL}/${id}?api_key=${process.env.NASA_API_KEY}`;
    const response = await fetch(lookupUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if(response.status == 404) return res.status(404).json({ message: "NEO not found." });
    if(response.status == 500) return res.status(500).json({ message: "Internal server error." });
    if(response.status ==400) return res.status(400).json({ message: "Invalid request" });
    if(response.status == 200) {
      const responseData :  NeoLookupResponse = await response.json();
      return res.status(200).json(responseData);
    }

  }
);


// For brwsing the entire dataset

export const browseNeo = catchAsync(
  async (req: Request, res: Response) => {


    let browseURL = `${neoBrowseURL}?api_key=${process.env.NASA_API_KEY}`;
    if( req.query.page) {

      browseURL += `&page=${req.query.page}`;
    }



    console.log(browseURL)

    const response = await fetch(browseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data
    if(response.status == 404) return res.status(404).json({ message: "NEO not found." });
    if(response.status == 500) return res.status(500).json({ message: "Internal server error." });
    if(response.status == 200) {
      const responseData :  NeoBrowseResponse = await response.json();
      data = responseData
      if(req.query.name){
        data = responseData.near_earth_objects.filter((neo) => {
          return neo.name.toLowerCase().includes((req.query.name!!.toString()).toLowerCase());
        });
      }
      if(req.query.id){
        data = responseData.near_earth_objects.filter((neo) => {
          return neo.neo_reference_id === req.query.id;
        });
      }


      return res.status(200).json(data);
    }

  }
);



