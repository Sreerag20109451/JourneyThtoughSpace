import { useState } from "react";
import type { NeoFeedResponse } from "../shared/types";
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from "dayjs";
import { getDateDifferenceInDays } from "../utils/categories";
import { getNeoFeed } from "../backend-apis/neo-apis";
import NeoListItem from "./neolistitem";

export const NeoFeedByDate = () => {
    const [data, setData] = useState<NeoFeedResponse | null>(null);
    const [startDtm, setStartDate] = useState<Dayjs | null>(dayjs()); 
    const [endDtm, setEndDate] = useState<Dayjs | null>(dayjs()); 
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string| null>(null);
    const [isClicked, setIsClicked] = useState(false);


    const resetForm = () => {

        setEndDate(null)
        setStartDate(null);
        setOpenAlert(false);
        setAlertMessage(null);
        setIsClicked(false)

    }



    const handleSubmit = async (event: React.FormEvent) => {

        setIsClicked(true);
        event.preventDefault();  
        if (!startDtm || !endDtm) {
            setAlertMessage("Please select both start and end dates.");
            setOpenAlert(true);
            setIsClicked(false);
    
            return;
        }
    
        try {
            const diff = getDateDifferenceInDays(startDtm.toISOString(), endDtm.toISOString());
    
            if (diff > 7) {
                setAlertMessage("Please select a date range within 7 days.");
                setOpenAlert(true);
                setIsClicked(false);
                return;
            }
    
            if (diff < 0) {
                setAlertMessage("The end date cannot be before the start date.");
                setOpenAlert(true);
                setIsClicked(false);
                return;
            }


            const response = await getNeoFeed(startDtm.toISOString(), endDtm.toISOString());
            setIsClicked(false);
            setData(response);
        } catch (error) {
            setAlertMessage("Invalid date format.");
            setOpenAlert(true);
            setIsClicked(false);
        }
    };
    
    if(openAlert){


        console.log(openAlert, alertMessage);
        return (
            <Dialog open={openAlert}>
                <DialogContent>
                    <DialogContentText>{alertMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={resetForm} 
                        color="primary" 
                        variant="contained"
                    >
                        Close
                    </Button>
                </DialogActions>

            </Dialog>
        )
    }


    if(!openAlert){

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Card>
                    <CardHeader 
                        title="NEO Feed Search"
                    />
                    <CardContent>
                        <form >
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                    width: '100%'
                                }}
                            >
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDtm}
                                        onChange={(newValue) => {
                                            setData(null);
                                            setStartDate(newValue)
                                        }
                                        }
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </FormControl>
    
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <DatePicker
                                        label="End Date"
                                        value={endDtm}
                                        onChange={(newValue) => {
                                            setData(null);
                                            setEndDate(newValue)}}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </FormControl>
    
                                <Button 
                                    variant="contained" 
                                    fullWidth
                                    size="large"
                                    onClick={handleSubmit}
                                >
                                    Search NEOs
                                </Button>
                            </Box>
                        </form>
                        

                        {
                            (data)    && 
                                <Box sx={{ mt: 2 }}>
                                    <NeoListItem feedData={data} date={startDtm!!.format('YYYY-MM-DD')} ></NeoListItem>
                                </Box>
                        

                        }

                        {  
                        isClicked &&
                        <Box sx={{ display:"flex" , justifyContent :"center" , alignItems : "center", mt: 2, width : "100%" }}>

                            <CircularProgress/>
                                     </Box>
                        }

                       
                    </CardContent>
                </Card>
            </LocalizationProvider>
        );

    }


    
    
};