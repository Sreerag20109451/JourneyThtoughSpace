import { catchAsync } from "async-handler-express";
import { Request, Response } from "express";
import { NeoBrowseResponse, NeoFeedResponse, NeoLookupResponse } from "../shared/types";
import dotenv from "dotenv";
import { getDateDifferenceInDays, neoBrowseURL, neoFeedURL, neoLookupURL } from "../shared/utils";
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
    if(response.status == 200) {
      const responseData :  NeoLookupResponse = await response.json();
      return res.status(200).json(responseData);
    }

  }
);


// For brwsing the entire dataset

export const browseNeo = catchAsync(
  async (req: Request, res: Response) => {

    const response = await fetch(neoBrowseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if(response.status == 404) return res.status(404).json({ message: "NEO not found." });
    if(response.status == 500) return res.status(500).json({ message: "Internal server error." });
    if(response.status == 200) {
      const responseData :  NeoBrowseResponse = await response.json();
      return res.status(200).json(responseData);
    }

  }
);

