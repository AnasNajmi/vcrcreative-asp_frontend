/* eslint-disable consistent-return */

import { React, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField } from '@mui/material';
import api from '../api/index';

// eslint-disable-next-line object-curly-newline

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));
const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #CDEEFC ',
        borderRadius: '20px',
        fontSize: 16,
        width: 'auto',
      },
      '&:hover fieldset': {
        borderColor: '#28CDFF',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#28CDFF',
      },
    },
  },
});

export default function ForgetPasswordPopup({ open, setOpen }) {
  const [email, setEmail] = useState('');
  const outlinedInputStyles = useOutlinedInputStyles();
  const handleInput = (e) => {
    setEmail(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleForgetPassword = async () => {
    if (!email) {
      return toast.error('Please enter your email');
    }
    const res = await api('put', `/admins/forgot/${email}`);
    if (res) {
      toast.success('Please check your email to reset your password');
      handleClose();
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        setOpen={setOpen}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: 25, background: '#F3FDFF' },
        }}
      >
        <DialogContent>
          <Typography gutterBottom>
            <h1
              style={{
                fontSize: '24px',
                color: '#28CDFF',
                fontFamily: 'HelveticaMedium',
              }}
            >
              Forgot Password
            </h1>
            <p className="enterEmailTxt">
              Enter your email, So we can send you reset instructions
            </p>
            <div className="hl-forget" />
            <FormControl
              sx={{ mb: 3, mt: 6, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-email"
                classes={outlinedInputStyles}
                label="Email&nbsp;"
                size="normal"
                value={email}
                type={email}
                onChange={handleInput}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="closeBtn"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={handleForgetPassword}
            className="resetPasswordBtn"
            variant="contained"
          >
            {window.innerWidth < 768
              ? 'Reset'
              : ' Send Reset Instructions'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
