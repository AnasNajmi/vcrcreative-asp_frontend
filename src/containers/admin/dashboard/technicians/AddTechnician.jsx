/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField } from '@mui/material';
// import { Backspace } from '@mui/icons-material';
import api from '../../../../api/index';

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
export default function AddTechnician({
  open,
  setOpen,
  editing,
  getTechnicians,
  technician,
  disable,
  setDisable,
}) {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    rate: '',
  });

  const [clicked, setClicked] = useState(false);
  const onClickEventRate = () => {
    if (editing) {
      setClicked(true);
    }
  };
  useEffect(() => {
    if (technician) {
      setValues(technician);
    }
  }, [technician]);
  const { first_name, last_name, phone_number, rate } = values;
  const handleClose = () => {
    setOpen(false);
  };
  const onChangeEvent = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setDisable(false);
  };
  const onChangePhoneNmbr = (e) => {
    const regex = /^[0-9\b]+$/;

    if (!e.target.value || regex.test(e.target.value)) {
      setValues({
        ...values,
        phone_number: e.target.value,
      });
    }
    setDisable(false);
  };

  const handleSubmit = async () => {
    // const regex = /^[0-9\b]+$/;
    if (editing) {
      await api('put', `/users/${technician._id}`, values);
      toast.success('Technician edited successfully');
    } else {
      await api('post', '/users', values);
      toast.success('Technician created successfully');
    }
    handleClose();
    getTechnicians();
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
            <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>
              {editing
                ? 'Edit Technician Profile'
                : 'Invite a new Technician'}
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
                inputProps={{
                  maxlength: 30,
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                label="First Name"
                size="normal"
                name="first_name"
                value={first_name}
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
                inputProps={{
                  maxlength: 30,
                }}
                id="outlined-email"
                classes={outlinedInputStyles}
                label="Last Name"
                name="last_name"
                value={last_name}
                type="text"
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
                id="outlined-password"
                classes={outlinedInputStyles}
                label="Phone Number"
                size="normal"
                type="text"
                value={phone_number}
                name="phone_number"
                inputProps={{
                  maxLength: 10,
                }}
                onChange={onChangePhoneNmbr}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
              <FormControl
                sx={{ mb: 1, mt: 2, width: '100%' }}
                variant="outlined"
              >
                <TextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                  }}
                  id="outlined-password"
                  classes={outlinedInputStyles}
                  label="Hourly Rate"
                  size="normal"
                  type="text"
                  value={
                    // eslint-disable-next-line no-nested-ternary
                    editing ? (clicked ? rate : `$${rate}/hr`) : rate
                  }
                  onClick={onClickEventRate}
                  name="rate"
                  inputProps={{
                    maxLength: 10,
                  }}
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
            onClick={handleSubmit}
            className={disable ? 'disable' : 'resetPasswordBtn'}
            variant="contained"
            disabled={disable}
          >
            {editing ? 'Save' : 'Send Invite'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
