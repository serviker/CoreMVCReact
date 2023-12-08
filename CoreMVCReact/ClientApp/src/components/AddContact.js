import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';

export function AddContact() {
    const [categoryData, setCategoryData] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetch("https://localhost:7026/api/Categories/")
            .then((response) => response.json())
            .then((data) => setCategoryData(data))
            .catch((error) => console.error("Error while fetching contacts:", error));
    }, []);

    useEffect(() => {
        fetch("https://localhost:7026/api/PhoneNumbers/")
            .then((response) => response.json())
            .then((data) => setPhoneNumber(data))
            .catch((error) => console.error("Error while fetching contacts:", error));
    }, []);


    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ maxHeight: '100%', width: '200', marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'Left' }}>

                <h4>Create contact</h4>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">First Name</InputLabel>
                    <Input id="FirstNameTextField" defaultValue="" color="warning" />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Last Name</InputLabel>
                    <Input id="LastNameTextField" defaultValue="" color="warning" />
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 210 }} >
                    <InputLabel htmlFor="categoryId">Category</InputLabel>
                    <Select
                        color="warning"
                        id="CategoryIdTextField"
                        value={categoryId}
                        label="Select Category"
                        onChange={(event) => setCategoryId(event.target.value)}
                    >
                        {categoryData.map((category) => (
                            <MenuItem key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/*<FormControl variant="standard">*/}
                {/*    <InputLabel htmlFor="component-simple">Phone Number</InputLabel>*/}
                {/*    <Input id="PhoneNumberTextField" defaultValue="" color="warning" onChange={(event) => setPhoneNumber(event.target.value)} />*/}
                {/*</FormControl>*/}

                <Button
                    style={{ width: '100px' }}
                    color="primary"
                    onClick={() => {
                        const data = {
                            firstName: document.getElementById('FirstNameTextField').value,
                            lastName: document.getElementById('LastNameTextField').value,
                            categoryId: categoryId,
                            /*numPhone: document.getElementById('PhoneNumberTextField').value*/
                        };
                        console.log(data);

                        fetch("https://localhost:7026/api/Contacts/", {
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
                        window.location.href = "/";
                        }}
                >
                    Submit
                   
                </Button>
            </div>
        </Box>
    );
}