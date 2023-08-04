import { useEffect, useMemo, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import { Box, Grid, Typography, Stack, Paper, Avatar, Tooltip } from '@mui/material';
import CupidoorSpinner from '../CupidoorSpinner';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminEditApartmentDialog from './AdminEditApartmentDialog';

const AdminProperties = () => {
  const [apartments, setApartments] = useState<any[] | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editApartmentId, setEditApartmentId] = useState<string | null>(null);
  const { getAdminApartments } = useAPI();

  const handleRestoreClick = (id: string) => {};
  const handleDeleteClick = (id: string) => {};
  const handleEditClick = (id: string) => {
    setEditApartmentId(id);
    setIsEditDialogOpen(true);
  };
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditApartmentId(null);
  };

  const handleDialogSave = ()=>{
    setApartments(null);
  }

  const cols = useMemo(
    () => [
      {
        field: '_id',
        headerName: 'ID',
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: 'city',
        headerName: 'City',
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: 'street',
        headerName: 'Street',
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: 'houseNumber',
        headerName: 'House Number',
        type: 'string',
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: 'user',
        headerName: 'Landlord',
        type: 'string',
        editable: false,
        hideable: false,
        flex: 1,
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: 'tax',
        headerName: 'Taxes',
        type: 'number',
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: 'committee',
        headerName: 'Committee',
        type: 'number',
        flex: 1,
        editable: false,
        hideable: false,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        getActions: ({ id, row }: { id: string; row: any }) => {
          const deleteAction = row.disabled ? (
            <GridActionsCellItem
              icon={
                <Tooltip title={'Enable'}>
                  <UndoIcon color='info' />
                </Tooltip>
              }
              label='Enable'
              onClick={() => handleRestoreClick(id)}
              color='inherit'
            />
          ) : (
            <GridActionsCellItem
              icon={
                <Tooltip title={'Disable'}>
                  <DeleteIcon color='error' />
                </Tooltip>
              }
              label='Disable'
              onClick={() => handleDeleteClick(id)}
              color='inherit'
            />
          );
          const editAction = (
            <GridActionsCellItem
              icon={
                <Tooltip title='Edit product'>
                  <EditIcon />
                </Tooltip>
              }
              label='Edit'
              className='textPrimary'
              onClick={() => {
                handleEditClick(id);
              }}
              color='inherit'
            />
          );
          return [editAction, deleteAction];
        },
      },
    ],
    [handleDeleteClick, handleRestoreClick, handleEditClick],
  );

  useEffect(() => {
    const fetchApartments = async () => {
      const data = await getAdminApartments();
      const apartments = [];
      for (let apartment of data.apartments) {
        apartments.push({
          ...apartment,
          user: `${apartment.user.firstName} ${apartment.user.lastName}`,
        });
      }
      setApartments(apartments);
    };
    if(apartments == null){
      fetchApartments();
    }
    
  }, [apartments]);

  return apartments && Object.keys(apartments).length > 0 ? (
    <>
      <Box component={Paper} elevation={3}>
        <DataGrid
          sx={{ bgcolor: 'white' }}
          getRowId={(row) => row._id}
          rows={apartments}
          columns={cols}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </Box>
      {isEditDialogOpen && editApartmentId && (
        <AdminEditApartmentDialog
          open={isEditDialogOpen}
          apartmentId={editApartmentId as string}
          handleDialogClose={handleCloseEditDialog}
          handleDialogSave={handleDialogSave}
        />
      )}
    </>
  ) : (
    <CupidoorSpinner></CupidoorSpinner>
  );
};

export default AdminProperties;
