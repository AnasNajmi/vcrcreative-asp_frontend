/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable consistent-return */

import { React, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField, IconButton } from '@mui/material';
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

export default function UpdatePasswordPopup({
  openUpdateModal,
  setOpenUpdateModal,
  closeProfilePopup,
  disable,
  setDisable,
}) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  // eslint-disable-next-line operator-linebreak
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { oldPassword, newPassword, confirmPassword } = values;
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setDisable(false);
  };
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenUpdateModal(false);
  };

  const handleForgetPassword = async () => {
    const res = await api('put', '/admins/password', values);
    if (res) {
      toast.success('You have successfully updated your password');
      closeProfilePopup();
      handleClose();
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
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
                fontFamily: 'HelveticaBold',
              }}
            >
              Change Password
            </h1>
            <p className="enterEmailTxt">
              Enter your new password to update!
            </p>
            <div className="hl-forget" />
            <FormControl
              sx={{ mb: 2, mt: 6, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                label="Old Password&nbsp;&nbsp;&nbsp;"
                name="oldPassword"
                size="normal"
                varient="filled"
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
                value={oldPassword}
                type={showOldPassword ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowOldPassword(!showOldPassword);
                        }}
                        onMouseDown={() => setShowOldPassword(true)}
                        edge="end"
                        sx={{ color: '#28CDFF' }}
                      >
                        {showOldPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
            <FormControl
              sx={{ mb: 2, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                label="New Password&nbsp;&nbsp;&nbsp;"
                name="newPassword"
                size="normal"
                varient="filled"
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
                value={newPassword}
                type={showNewPassword ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowNewPassword(!showNewPassword)
                        }
                        onMouseDown={() => setShowNewPassword(true)}
                        edge="end"
                        sx={{ color: '#28CDFF' }}
                      >
                        {showNewPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
            <FormControl
              sx={{ mb: 3, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                label="Confirm Password&nbsp;&nbsp;&nbsp;&nbsp;"
                name="confirmPassword"
                // inputProps={{}}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                    marginRight: '30%',
                  },
                }}
                value={confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        onMouseDown={() =>
                          setShowConfirmPassword(true)
                        }
                        edge="end"
                        sx={{ color: '#28CDFF' }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
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
            className={disable ? 'disable' : 'resetPasswordBtn'}
            disabled={disable}
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
