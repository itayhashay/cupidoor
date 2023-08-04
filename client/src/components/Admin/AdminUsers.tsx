import { useEffect, useMemo, useState, useCallback } from 'react';
import useAPI from '../../hooks/useAPI';
import { Box, Grid, Typography, Stack, Paper, Avatar, Tooltip } from '@mui/material';
import CupidoorSpinner from '../CupidoorSpinner';
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridRowModel,
  MuiEvent,
} from '@mui/x-data-grid';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminEditUserDialog from './AdminEditUserDialog';
import { User } from '../../types/user';
import { useSnackbar } from '../../context/SnackbarContext';

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([] as any[]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const { getAdminUsers, adminUpdateUser } = useAPI();
  const { snackBarState, setSnackBarState } = useSnackbar();

  const handleRestoreClick = (id: string) => {};
  const handleDeleteClick = (id: string) => {};
  const handleEditClick = (id: string) => {
    setEditUserId(id);
    setIsEditDialogOpen(true);
  };
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditUserId(null);
  };

  const updateUserDetails = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel) => {
      try {
        let didChange = false;
        let newValues: any = {};
        for (let key of Object.keys(oldRow)) {
          if (key === '_id') continue;
          if (oldRow[key] !== newRow[key]) {
            didChange = true;
            newValues[key] = newRow[key];
          }
        }
        if (!didChange) return oldRow;

        let updatedUser = users.filter((user: User) => user._id === newRow._id)[0];
        updatedUser = { ...updatedUser, ...newValues };
        const response: any = await adminUpdateUser(updatedUser as User);

        setSnackBarState({
          show: true,
          message: 'User updated successfully!',
          severity: 'success',
        });
        return response;
      } catch (ex) {
        setSnackBarState({
          show: true,
          message: "Couldn't update user!",
          severity: 'error',
        });
      }
    },
    [users],
  );

  const handleProcessRowUpdateError = useCallback(
    (error: Error) => {
      setSnackBarState({
        show: true,
        message: error.message,
        severity: 'error',
      });
    },
    [users],
  );

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

  return users.length > 0 ? (
    <>
      <Box component={Paper} elevation={3}>
        <DataGrid
          sx={{ bgcolor: 'white' }}
          rows={users}
          getRowId={(row) => row._id}
          columns={cols}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          processRowUpdate={updateUserDetails}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </Box>
      {isEditDialogOpen && editUserId && (
        <AdminEditUserDialog
          open={isEditDialogOpen}
          userId={editUserId as string}
          handleDialogClose={handleCloseEditDialog}
        />
      )}
    </>
  ) : (
    <CupidoorSpinner></CupidoorSpinner>
  );
};

export default AdminUsers;
