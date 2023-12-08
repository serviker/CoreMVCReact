import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export function Contacts() {
    const [contacts, setContact] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const headers = [
        /*{ field: 'ContactId', headerName: 'ID', width: 100 },*/
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'lastName', headerName: 'Last Name', width: 200 }
    ];

    React.useEffect(() => {
        fetch("https://localhost:7026/api/Contacts")
            .then(
                res => {
                    res.json().then(
                        data => {
                            if (data.length > 0) {
                                const contactData = data.map(itemData => ({
                                    id: itemData.contactId,
                                    contact_id: itemData.contactId,
                                    firstName: itemData.firstName,
                                    lastName: itemData.lastName
                                }));
                                setContact(contactData);
                            }
                        }
                    )
                }
            )
    }, []);

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
                <Link to={'/addContact'}>
                    <Button variant="outlined" size="medium">
                        Create
                    </Button>
                </Link>
                <Button variant="outlined" color="error" color="error"startIcon={<DeleteIcon />} onClick={() =>
                    selectedRows.forEach((selectedId) => {
                    console.log(selectedId);
                    fetch(`https://localhost:7026/api/Contacts/${selectedId}`, {
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
                        });
                     setSelectedRows([]);
                     })}> Delete
            </Button>
            </div>
            <DataGrid
                onRowClick={handleRowClick}
                rows={contacts}
                columns={headers}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10},
                    },
                }}
                pageSizeOptions={[10, 15]}
                checkboxSelection
            />
        </div> 
    );
}