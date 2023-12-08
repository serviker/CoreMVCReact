import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';


export function AddCategory() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '21ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ maxHeight: '100%', width: '200', marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>

                <h4>Create category</h4>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Name Category</InputLabel>
                    <Input id="NameTextField" defaultValue="" color="secondary" />
                </FormControl>
                
                <Button
                    style={{ width: '100px' }}
                    color="primary"
                    onClick={() => {
                        const data = {
                            name: $('#NameTextField').val()
                        };

                        console.log(data);

                        fetch("https://localhost:7026/api/Categories/", {
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
                        window.location.href = "/categories";
                    }}
                >
                    Submit
                </Button>
            </div>
        </Box>
    );
}