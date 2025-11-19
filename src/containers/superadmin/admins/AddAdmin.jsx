/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField, IconButton } from '@mui/material';
import api from '../../../api/index';

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
export default function AddAdmin({
  open,
  setOpen,
  editing,
  getAdmins,
  admin,
}) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (admin) {
      setValues(admin);
    }
  }, [admin]);
  const { name, email, password } = values;
  const handleClose = () => {
    setOpen(false);
  };
  const onChangeEvent = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (editing) {
      await api('put', `/admins/${admin._id}`, values);
      toast.success('Admin edited successfully');
    } else {
      await api('post', '/admins', values);
      toast.success('Admin created successfully');
    }
    handleClose();
    getAdmins();
  };
  const outlinedInputStyles = useOutlinedInputStyles();

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
          style: {
            borderRadius: 25,
            width: 800,
            background: '#F3FDFF',
          },
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
              {editing ? 'Edit Admin Profile' : 'Invite A New Admin'}
            </h1>

            <FormControl
              sx={{ mb: 1, mt: 6, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                inputProps={{}}
                id="outlined-fname"
                classes={outlinedInputStyles}
                label="Name"
                size="normal"
                name="name"
                value={name}
                onChange={onChangeEvent}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
            <FormControl
              sx={{ mb: 1, mt: 1, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-email"
                classes={outlinedInputStyles}
                label="Email"
                name="email"
                value={email}
                type="email"
                onChange={onChangeEvent}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
            {!editing && (
              <FormControl
                sx={{ mb: 1, mt: 1, width: '85%' }}
                variant="outlined"
              >
                <TextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                  }}
                  id="outlined-password"
                  classes={outlinedInputStyles}
                  label="Password"
                  size="normal"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  name="password"
                  onChange={onChangeEvent}
                  InputLabelProps={{
                    style: {
                      color: '#8C8C8C',
                      fontSize: '19px',
                      fontWeight: '700',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={() => setShowPassword(true)}
                          edge="end"
                          sx={{ color: '#28CDFF' }}
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            )}
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
            onClick={handleSubmit}
            className="resetPasswordBtn"
            variant="contained"
          >
            {editing ? 'Save' : 'Create Admin & Send Invite'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
