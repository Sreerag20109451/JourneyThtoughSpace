import { useState } from "react";
import type {   NeoLookupResponse } from "../shared/types";
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, Input, Typography } from "@mui/material";
import { neoSearch } from "../backend-apis/neo-apis";
import NeoBrowseListItems from "./neobrowseListItems";


export const NeoSearch = () => {
    const [data, setData] = useState<NeoLookupResponse[] | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string| null>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [nameOrId, setNameOrId] = useState<string | null>(null);


    const resetForm = () => {

        setOpenAlert(false);
        setAlertMessage(null);
        setIsClicked(false)

    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        console.log("Form submitted with value: ", nameOrId);

        
     
        const searchValue = nameOrId?.trim();
    
        console.log("Search Value: ", searchValue);

        if(searchValue === null || searchValue === "") {
            setOpenAlert(true);
            setAlertMessage("You have to specify the name or id")
            return
        }

        const result = await neoSearch(searchValue!!);
        if(!result) {
            setOpenAlert(true);
            setAlertMessage("NEO not found or an error occurred.");
            return;
        }

        console.log("Result Value: ", result);
        setData(result);

    }

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    setNameOrId(event.target.value);

    };
    
    if(openAlert){
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
                <Card>
                    <CardHeader 
                        title="NEO Feed Search"
                    />
                    <CardContent>
                        <form onSubmit={handleSubmit} >
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
                                    <Input   onChange={handleInputChange} value={nameOrId} type="text" placeholder="Enter the Name or id"></Input>
                                    </FormControl>
                                    <FormControl>
                                <Button 
                                type="submit"
                                   variant="contained"
                                   color="primary"
                                >
                                    Search NEOs
                                </Button>
                                </FormControl>
                            </Box>
                        </form>
                        

                        {
                            data   && 
                                <Box sx={{ mt: 2 }}>

                                    <NeoBrowseListItems feedData={data} searchWord={nameOrId!!}></NeoBrowseListItems>
                                   
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
        );

    }


    
    
};