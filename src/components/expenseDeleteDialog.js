import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../hooks/useAuth';
import { deleteExpenseData } from '../firebase/firestore';

export default function DeleteDataDialog({formOpenDelete, handleClose, id}) {
    const [loading, setLoading] = useState(false)
    let {authUser} = useAuth()
    const handleDeleteData = () =>{
        deleteExpenseData(authUser.uid, id ,setLoading);
        handleClose();
    }
  return (
    <Fragment>
      <Dialog
        open={formOpenDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete the expense
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          After that, it cannot be restored
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={handleClose}>Close</Button>
          <Button size='small' onClick={handleDeleteData} 
          color="error" variant="outlined" autoFocus>
          confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
