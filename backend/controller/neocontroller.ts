import { catchAsync } from "async-handler-express";
import { Request, Response } from "express";
import { NeoObjectsResponse } from "../shared/types";
import dotenv from "dotenv";
import { getDateDifferenceInDays, neoFeedURL } from "../shared/utils";
dotenv.config();


export const getNeoFeed = catchAsync(async(req : Request, res : Response) => {

   const {start_date, end_date} = req.query!!
   if(getDateDifferenceInDays(start_date as string, end_date as string) > 7) {

    return res.status(403).json({message : "The date range cannot exceed 7 days."});

   }
   const feedUrl = `${neoFeedURL}?start_date=${start_date}&end_date=${end_date}&api_key=${process.env.NASA_API_KEY}`;
    const response = await fetch(feedUrl, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseData : NeoObjectsResponse = await response.json();
    return res.status(200).json(responseData);
}
)

export const getSpecificNEO = catchAsync(async(req : Request, res : Response) => {
 }
 )