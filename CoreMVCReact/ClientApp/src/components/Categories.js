import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export function Categories() {
    const [categories, setCategories] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState(/* your initial grid data */);
    const [rowModesModel, setRowModesModel] = useState({});

    const headers = [
        { field: 'name', headerName: 'Name Category', width: 200 },
        {
            field: 'edit', headerName: 'Action', width: 100, renderCell: (params) => (
                <Button color="primary" onClick={() => handleEditClick(params.row.id)}>Edit</Button>
            )
        },
        {
            field: 'save', headerName: 'Action', width: 100, renderCell: (params) => (
                <Button color="primary" onClick={() => handleSaveClick(params.row.id)}>Save</Button>
            )
        }
    ];

    //const handleEdit = (category_Id) => {
    //    // Implement your logic to open a modal or form for editing the phone number
    //    // You can use the phoneId to fetch the specific phone number data and pre-fill the form for editing
    //};

    const handleEditClick = (id) => () => {
        // Assuming your data contains objects with unique identifiers (like 'id')
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'edit' } });
    };

    const handleSaveClick = async (id) => {
        try {
            // Perform the save operation, e.g., send the updated data to the server
            // ...

            // After successful save, update the row mode to 'view' or clear it
            setRowModesModel({ ...rowModesModel, [id]: { mode: 'view' } });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    React.useEffect(() => {
        fetch("https://localhost:7026/api/Categories")
            .then(
                res => {
                    res.json().then(
                        data => {
                            if (data.length > 0) {
                                const categoriesData = data.map(itemData => ({
                                    id: itemData.categoryId,
                                    category_id: itemData.categoryId,
                                    name: itemData.name
                                }));
                                setCategories(categoriesData);
                                console.log(categoriesData);
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
                <Link to={'/addCategory'}>
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
                                fetch(`https://localhost:7026/api/Categories/${selectedId}`, {
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
                            )).then(() => {
                                // All delete requests were successful
                                setSelectedRows([]);
                            })
                            .catch((error) => {
                                // Error occurred during the delete requests
                                console.error('Error during deletion:', error);
                            });
                        window.location.href = "/categories";
                    }}
                >
                    Delete
                </Button>
            </div>
            <DataGrid
                onRowClick={handleRowClick}
                rows={categories}
                columns={headers}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 15 },
                    },
                }}
                pageSizeOptions={[10, 15]}
            />
        </div> 
    );
}