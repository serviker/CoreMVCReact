import * as React from 'react';
import Box from '@mui/material/Box';
import $ from 'jquery';
import { FormControl, InputLabel, Input, Button, Select, MenuItem } from '@mui/material';


export function EditPhone() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ maxHeight: '100%', width: '200', marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <h4>Create phone</h4>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Number Phone</InputLabel>
                    <Input id="NumPhoneTextField" defaultValue="" color="secondary" />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">ID Contact</InputLabel>
                    <Input id="ContactIdField" defaultValue="" color="secondary" />
                </FormControl>
                
                <Button
                    style={{ width: '100px' }}
                    color="primary"
                    onClick={() => {
                        const data = {
                            numPhone: $('#NumPhoneTextField').val(),
                            contactId: $('#ContactIdField').val()
                        };

                        console.log(data);

                        fetch("https://localhost:7026/api/PhoneNumbers/", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                            .then((response) => {
                                if (response.ok) {
                                    console.log("Data successfully sent.");
                                } else {
                                    response.json().then((errorData) => {
                                        console.error("Failed to send data. Status:", response.status);
                                        console.error("Error Details:", errorData);
                                    });
                                }
                            })
                            .catch((error) => {
                                console.error("Error while sending data:", error);
                            });
                        window.location.href = "/phones";
                    }}
                >
                    Submit 
                </Button>
            </div>
        </Box>
    );
}