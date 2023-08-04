import { useEffect, useMemo, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import { AdminAnalyticsType } from '../../types/AdminAnalytics';
import { Box, Grid, Typography, Stack, Paper, Avatar, Tooltip } from '@mui/material';
import CupidoorSpinner from '../CupidoorSpinner';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([] as any[]);
  const { getAdminUsers } = useAPI();

  const handleRestoreClick = (id: string) => {};
  const handleDeleteClick = (id: string) => {};
  const handleEditClick = (id: string) => {};
  // const updateUserDetails = async (params, event, details) => {
  //   try {
  //     if (params.field === 'id') {
  //       return;
  //     }

  //     const updatedUser = users.filter((user) => user.uid === params.id)[0];
  //     if (updatedUser[params.field] === params.value) {
  //       return;
  //     }
  //     updatedUser[params.field] = params.value;
  //     await backendAPI.admin.user.update(updatedUser, token);
  //     showSuccessSnackbar();
  //     checkIfLogoutNeeded(updatedUser.email);
  //   } catch (ex) {
  //     showErrorSnackbar(ex);
  //   }
  // };
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
        field: 'firstName',
        headerName: 'First name',
        flex: 1,
        editable: true,
        hideable: false,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
        flex: 1,
        editable: true,
        hideable: false,
      },
      {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        flex: 1,
        editable: true,
        hideable: false,
      },
      {
        field: 'isAdmin',
        headerName: 'Is admin?',
        description: 'This column indicates whether the user is admin or not.',
        type: 'boolean',
        editable: true,
        hideable: false,
        flex: 1,
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
    const fetchUsers = async () => {
      const data = await getAdminUsers();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  return Object.keys(users).length > 0 ? (
    <Box component={Paper} elevation={3}>
      <DataGrid
        sx={{ bgcolor: 'white' }}
        getRowId={(row) => row._id}
        rows={users}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
      />
    </Box>
  ) : (
    <CupidoorSpinner></CupidoorSpinner>
  );
};

export default AdminUsers;
