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
export default function AddProduct({
  open,
  setOpen,
  editing,
  getProducts,
  product,
  disable,
  setDisable,
}) {
  const [values, setValues] = useState({
    name: '',
    price: '',
  });

  useEffect(() => {
    if (product) {
      setValues(product);
    }
  }, [product]);
  const { name, price } = values;
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

  const handleSubmit = async (e) => {
    const regex = /^[0-9\b]+$/;
    if (
      // eslint-disable-next-line operator-linebreak
      e.target.name === 'price' &&
      !regex.test(e.target.value)
    ) {
      toast.error('Only numeric characters are allowed');
    } else {
      if (editing) {
        await api('put', `/products/${product._id}`, values);
        toast.success('Product edited successfully');
      } else {
        await api('post', '/products', values);
        toast.success('Product created successfully');
      }
      handleClose();
      getProducts();
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
                fontFamily: 'HelveticaMedium',
              }}
            >
              {editing ? 'Edit Product' : 'Add new Product'}
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
                  maxLength: 30,
                }}
                id="outlined-name"
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
                inputProps={{
                  maxlength: 11,
                }}
                id="outlined-price"
                classes={outlinedInputStyles}
                label="Price"
                name="price"
                value={price ? `$${price}` : ''}
                type="text"
                onChange={(e) => {
                  e.target.value = e.target.value.replace('$', '');
                  onChangeEvent(e);
                }}
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
            onClick={handleSubmit}
            className={disable ? 'disable' : 'resetPasswordBtn'}
            disabled={disable}
            variant="contained"
          >
            {editing ? 'Save' : 'Add Product'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
