import React, { useState, useEffect } from 'react';
import { Box, Input, FormControl, InputLabel, Button, Select, MenuItem } from '@mui/material';

export function AddPhone() {
    const [contactData, setContactData] = useState([]);
    const [contactId, setContactId] = useState('');

    useEffect(() => {
        fetch("https://localhost:7026/api/Contacts/")
            .then((response) => response.json())
            .then((data) => setContactData(data))
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
            <div style={{ maxHeight: '100%', width: '300', marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <h4>Create phone</h4>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Number Phone</InputLabel>
                    <Input id="NumPhoneTextField" defaultValue="" color="secondary" />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} >
                    <InputLabel htmlFor="contactId">Contact</InputLabel>
                    <Select
                        color="secondary"
                        id="ContactIdField"
                        value={contactId}
                        label="Select Contact"
                        onChange={(event) => setContactId(event.target.value)}
                    >
                        {contactData.map((contact) => (
                            <MenuItem key={contact.contactId} value={contact.contactId}>
                                {contact.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    style={{ width: '100px' }}
                    color="primary"
                    onClick={() => {
                        const data = {
                            numPhone: document.getElementById('NumPhoneTextField').value,
                            contactId: contactId
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