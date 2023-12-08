//import DeleteIcon from '@mui/icons-material/Delete';
//import Button from '@mui/material/Button';
//import { DataGrid } from '@mui/x-data-grid';
//import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import { FetchController } from './FetchController.js';

//function EditToolbar(props) {
//    const { setRows, setRowModesModel } = props;
//    //let Controller = new FetchController('https://localhost:7026/api/Contacts');

//    const handleClick = () => {
//          const contactId = 20;
//          setRows((oldRows) => [...oldRows, { id: contactId, firstName: '', lastName: '', name: '', phone_number: '', isNew: true }]);
//          setRowModesModel((oldModel) => ({
//              ...oldModel,
//              [contactId]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
//          }));
//    };

//    return (
//        <GridToolbarContainer>
//            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
//                <Link to={'/addContact'}>
//                    <Button color="primary" startIcon={<AddIcon />}>
//                        Create
//                    </Button>
//                </Link>
//            </div>
//            {/*<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>*/}
//            {/*    Create*/}
//            {/*</Button>*/}
//        </GridToolbarContainer>
//    );
//}

function EditToolbar(props) {
    const { setRows, setRowModesModel, setCreating, setContacts } = props;

    const handleClick = () => {
        const id = 0;
        setContacts((oldRows) => [{
            id, firstName: '', lastName: '', name: '', phone_number: '', isNew: true }, ...oldRows]);

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
        }));

        setCreating(true);
    };

    return (
        <GridToolbarContainer>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                {/*<Link to={'/addContact'}>*/}
                    <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                        Create
                    </Button>
               {/* </Link>*/}
            </div>
        </GridToolbarContainer>
    );
}

export function Contacts() {
    const [contacts, setContacts] = React.useState([]);
    const [creating, setCreating] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    //const [creating, setCreating] = React.UseState(false);

    let Controller = new FetchController('https://localhost:7026/api/Contacts');

        React.useEffect(() => {
            async function fetchData() {
                const data = await fetchContacts();
                setRows(data);
                //console.log(data);
            }
            
            fetchData();
    }, []);

    async function fetchCategoryData() {
        try {
            const response = await fetch('https://localhost:7026/api/Categories');
            if (!response.ok) {
                throw new Error('Failed to fetch category data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching category data:', error);
            return [];
        }
    } 

    async function fetchConactData() {
        try {
            const response = await fetch('https://localhost:7026/api/Contacts');
            if (!response.ok) {
                throw new Error('Failed to fetch phone data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching phone data:', error);
            return [];
        }
    }

    async function fetchContacts() {
        try {
            const response = await fetch('https://localhost:7026/api/PhoneNumbers');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            //console.log(data);
            // Fetch related data for categories and phone numbers
            const categoryData = await fetchCategoryData();
            const contactData = await fetchConactData();
            //console.log(categoryData);
            //console.log(phoneData);

            // Combine the related data with the contact data
            const combinedData = data.map(itemData => {
                
                const contact = contactData.find(con => con.contactId === itemData.contactId);
                const category = categoryData.find(cat => cat.categoryId === contact.categoryId);
                //console.log(category);
               // console.log(contact);
                return {
                    id: contact.contactId,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    name: category ? category.name : '',
                    phone_number: itemData.numPhone
                };
            });

            return combinedData;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    /*
    const handleEditClick = async (id) => {
        try {
            const response = await fetch(`https://localhost:7026/api/Contacts/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch phone data');
            }

            const contact = await response.json();

            Controller.OnPutAsync(id, contact)
                .then(data => {
                    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
                })
                .catch(error => {
                    alert(error);
                });
        } catch (error) {
            alert(error);
        }
    };  */
/*
    const handleEditClick = (id) => async () => {
        // При нажатии на кнопку редактирования, загружаем данные для редактирования
        try {
            const data = await FetchController.OnGetAsync(id);
            // Переключаем режим редактирования и передаем данные для отображения в форме редактирования
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit, data } });
        }

        catch (error) {


            console.error("Error fetching data for editing:", error);
        }
    };*/

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };



    /*
    const handleSaveClick = (id) => async () => {
        // Получаем данные из состояния, которые были изменены в форме редактирования
        const editedData = rowModesModel[id].data;
    
        try {
            // Отправляем измененные данные на сервер для сохранения
            const response = await FetchController.OnPutAsync(id, editedData);
    
            if (response.ok) {
                // Если успешно, переключаем режим отображения и, возможно, обновляем данные в UI
    
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    
    
                // Можно также обновить данные в UI, если требуется
                // Например, вызвать метод для обновления списка элементов
                 updateGridData();
            } else {
                console.error("Error saving data:", response.statusText);
            }
        } 
    catch (error) {
        console.error("Error saving data:", error);
    
    };*/

    //const handleEditClick = (id) => () => {
    //    // Assuming your data contains objects with unique identifiers (like 'id')
    //    const updatedRowModesModel = { ...rowModesModel, [id]: { mode: 'edit' } };
    //    setRowModesModel(updatedRowModesModel);
    //};

    //const handleSaveClick = (id) => () => {
    //        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //};

    const handleDeleteClick = (id) => () => {
        Controller.OnDeleteAsync(id).then(data =>
            setRows(rows.filter((row) => row.id !== id))).catch(error => alert(error));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setContacts(contacts.map((row) => (row.id === newRow.id ? updatedRow : row)));
        Controller.OnPutAsync(newRow.id, newRow).then(response => { });

        console.log(updatedRow);
        return updatedRow;
    };
 /*
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRow(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        if (creating) {
            //let oldId = newRow.id;
            //delete newRow.id;
           // newRow.phoneNumber = newRow.phoneNumber.toString();

            Controller.OnPostAsync(newRow).then(response => {
                //let tooltip;
                //if (response.id) {
                //    console.log(response.id);
                //    tooltip = "Phone added successfully";

                //    //response.creationDate = new Date(response.creationDate);
                //    setPhones([...phones.filter(row => row.id !== oldId), response]);
                //    //setPhones(phones.map(row => (row.id === oldId ? )));
                //}
                //else {
                //    tooltip = response.title;
                //    setPhones(phones.filter(row => row.id !== newRow.id));
                //}

                //setSnackBarSettings({
                //    open: true,
                //    message: tooltip
                //});
            });
        }
        else {
           // console.log('edit here');

           // newRow.phoneNumber = newRow.phoneNumber.toString();
            Controller.OnPutAsync(newRow.id, newRow).then(response => {
                //console.log(response);
                //let tooltip;
                //if (response.ok) {
                //    tooltip = "Phone edited successfully";
                //}
                //else {
                //    tooltip = response.statusText;
                //    let oldRow = phones.filter(row => row.id == newRow.id)[0];
                //    newRow.phoneNumber = oldRow.phoneNumber;
                //    newRow.fullName = oldRow.fullName;
                //    newRow.creationDate = oldRow.creationDate;
                //    newRow.note = oldRow.note;
                //}

                //setSnackBarSettings({
                //    open: true,
                //    message: tooltip
                //});
            });

        }
        setCreating(false);

        return updatedRow;
    };
    */
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 100,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 180,
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Category',
            width: 180,
            editable: true,
        },
        {
            field: 'phone_number',
            headerName: 'Phone',
            width: 200,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="error"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleEditClick(id)}
                        color="secondary"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="warning"
                    />,
                ];
            },
        },
        ];
       

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.error',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
        );
        
}

   