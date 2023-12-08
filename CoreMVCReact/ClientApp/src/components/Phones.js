import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import { FetchController } from './FetchController';

export function Phones() {
    const [phoness, setPhones] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const fetchController = new FetchController('https://localhost:7026/api/PhoneNumbers');

    const headers = [
        { field: 'phone_number', headerName: 'Phone Number', width: 200 },
        { field: 'firstName', headerName: 'Contact Name', width: 150 },
        { field: 'lastName', headerName: 'Contact Last Name', width: 200 },
        {
            field: 'edit', headerName: 'Action', width: 100, renderCell: (params) => (
                <Button color="primary" onClick={() => handleEdit(params.row.id)}>Edit</Button>
            )
        }
    ];

    // Define the handleEdit function
    const handleEdit = async (phoneId) => {
        try {
            // Use the OnGetAsync method to fetch the specific phone number data
            const phoneData = await fetchController.OnGetAsync(phoneId);
            
            // Open a modal or form for editing the phone number and pre-fill the form with the fetched phoneData
           // openEditModal(phoneData);
           
        } catch (error) {
            // Handle any errors that occur during the fetch
            console.error('Error fetching phone number data:', error);
        }
    };
/*
    
    // Example of openEditModal function
    const openEditModal = (phoneData) => {
        // Assuming you have a modal element with id "editModal" and input fields for editing phone data
        const modal = document.getElementById('editModal');

        // Pre-fill the input fields with the fetched phoneData
       // document.getElementById('phoneNameInput').value = phoneData.name;
        document.getElementById('phoneNumberInput').value = phoneData.numPhone;

        // Add event listener to the save button inside the modal
        document.getElementById('saveButton').addEventListener('click', async () => {
            // Get the edited data from the input fields
            // const editedName = document.getElementById('phoneNameInput').value;
            const editedNumber = document.getElementById('phoneNumberInput').value;

            try {
                // Use the OnPutAsync method to update the phone number data
                await fetchController.OnPutAsync(phoneData.id, { numPhone: editedNumber });

                // Close the modal after saving the changes
                modal.style.display = 'none';

                // Optionally, you can trigger a refresh of the phone number list or update the UI to reflect the changes
                // Example:
                // refreshPhoneNumberList();
            } catch (error) {
                // Handle any errors that occur during the update
                console.error('Error updating phone number data:', error);
            }
        });

        // Show the modal
        modal.style.display = 'block';
    }; */
    
    React.useEffect(() => {
        fetch("https://localhost:7026/api/Contacts/")
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    fetchPhoneNumbers(data);
                }
            })
            .catch((error) => console.error("Error while fetching contacts:", error));
    }, []);

    const fetchPhoneNumbers = (contacts) => {
        fetch("https://localhost:7026/api/PhoneNumbers")
            .then((res) => {
                res.json().then((data) => {
                    if (data.length > 0) {
                        const phoneData = data.map(itemData => ({
                            id: itemData.phoneId,
                            phone_id: itemData.phoneId,
                            phone_number: itemData.numPhone,
                            contact_id: itemData.contactId,
                            firstName: contacts.find(contact => contact.contactId === itemData.contactId)?.firstName || '',
                            lastName: contacts.find(contact => contact.contactId === itemData.contactId)?.lastName || ''
                        }));
                        setPhones(phoneData);
                    }
                });
            });
    };
  

    const handleRowClick = (params) => {
        if (selectedRows.includes(params.row.id)) {
            setSelectedRows(selectedRows.filter(id => id !== params.row.id))
        }
        else {
            setSelectedRows([...selectedRows, params.row.id])
        }
    };

    return (
        <div style={{ maxHeight: '100%', width: '100%', marginTop: '25px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Link to={'/addPhone'}>
                    <Button color="primary" startIcon={<AddIcon />}>
                        Create
                    </Button>
                </Link>
                <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        Promise.all(
                            selectedRows.map((selectedId) =>
                                fetch(`https://localhost:7026/api/PhoneNumbers/${selectedId}`, {
                                    method: 'DELETE',
                                })
                                    .then((response) => {
                                        if (response.ok) {
                                            // Successfully deleted the item, update the state or perform any necessary actions
                                            console.log(`Successfully deleted item with ID: ${selectedId}`);
                                        } else {
                                            console.error(`Failed to delete item with ID: ${selectedId}`);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(`Error while deleting item with ID: ${selectedId}`, error);
                                    })
                            )
                        )
                            .then(() => {
                                // All delete requests were successful
                                setSelectedRows([]);
                            })
                            .catch((error) => {
                                // Error occurred during the delete requests
                                console.error('Error during deletion:', error);
                            });
                        window.location.href = "/phones";

                    }}
                >
                    Delete
                </Button>
            </div>
            <DataGrid
                onRowClick={handleRowClick}
                rows={phoness}
                columns={headers}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20},
                    },
                }}
                pageSizeOptions={[10, 20]}
            />
        </div> 
    );
}