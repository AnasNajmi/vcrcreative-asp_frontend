/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
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
import InputLabel from '@mui/material/InputLabel';
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
export default function AddTank({
  open,
  setOpen,
  editing,
  getTanks,
  tank,
  getType,
  disable,
  setDisable,
}) {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (tank) {
      setType(tank.type);
      setValue(tank.value);
    }
  }, [tank]);
  // eslint-disable-next-line no-unused-vars

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeEvent = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setValue(e.target.value);
    }
    setDisable(false);
  };

  const handleSubmit = async () => {
    const tankDetails = {
      type,
      value,
    };
    const regex = /^[0-9\b]+$/;
    if (
      // eslint-disable-next-line operator-linebreak
      tankDetails.type === 'size' &&
      !regex.test(tankDetails.value)
    ) {
      toast.error('Only numeric characters are allowed');
    } else {
      if (editing) {
        await api('put', `/tank/${tank._id}`, tankDetails);
        toast.success(`Tank ${type} edited successfully`);
      } else {
        await api('post', '/tank', tankDetails);
        toast.success(`Tank ${type} added successfully`);
      }
      getTanks();
      if (!editing) {
        getType(type);
      }
      handleClose();
    }
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
                paddingBottom: '30px',
              }}
            >
              {editing ? 'Edit Tank Details' : 'Add New Tank Details'}
            </h1>

            <InputLabel
              sx={{
                textAlign: 'left',
                marginLeft: '12%',
                color: '#8C8C8C',
                fontSize: '16px',
                fontFamily: 'HelveticaMedium',
              }}
            >
              New value for
              <span
                style={{
                  fontWeight: '100',
                  letterSpacing: '1px',
                }}
              >
                {' '}
                (select one)
              </span>
            </InputLabel>
            <div>
              <Button
                className={
                  type === 'size' ? 'activeTankBtn' : 'tankOptionBtns'
                }
                variant="outlined"
                disabled={editing}
                onClick={() => setType('size')}
              >
                Size
              </Button>
              <Button
                className={
                  type === 'type' ? 'activeTankBtn' : 'tankOptionBtns'
                }
                variant="outlined"
                disabled={editing}
                onClick={() => setType('type')}
              >
                Type
              </Button>
              <Button
                className={
                  type === 'material'
                    ? 'activeTankBtn'
                    : 'tankOptionBtns'
                }
                variant="outlined"
                disabled={editing}
                onClick={() => setType('material')}
              >
                Material
              </Button>
              <Button
                className={
                  type === 'filter'
                    ? 'activeTankBtn'
                    : 'tankOptionBtns'
                }
                variant="outlined"
                disabled={editing}
                onClick={() => setType('filter')}
              >
                Filter
              </Button>
            </div>
            <FormControl
              sx={{ mb: 1, mt: 2, width: '76%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                inputProps={{
                  style: {
                    color: '#8C8C8C',
                    fontWeight: '700',
                  },
                  maxLength: 30,
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                placeholder={
                  type === 'size'
                    ? 'e.g. 100 Gallon Tank'
                    : type === 'type'
                    ? 'Tank Type'
                    : type === 'material'
                    ? 'Tank Material'
                    : 'Tank Filter'
                }
                size="normal"
                name={type}
                type="text"
                value={value}
                // eslint-disable-next-line no-confusing-arrow
                onChange={
                  // eslint-disable-next-line no-confusing-arrow
                  (e) =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    type === 'size'
                      ? onChangeEvent(e)
                      : setValue(e.target.value) || setDisable(false)
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '17px',
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
            onClick={handleSubmit}
            className={disable ? 'disable' : 'resetPasswordBtn'}
            variant="contained"
            disabled={disable}
          >
            {editing ? 'Update Value' : 'Add Value'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
