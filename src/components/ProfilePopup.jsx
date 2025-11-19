/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import Avatar from 'react-avatar';
import { UpdateStore } from '../StoreContext';
import editIcon from '../assets/images/EditIcon.svg';
import arrow from '../assets/images/rightArrow.svg';
// import { genMediaUrl } from '../config';
import api from '../api/index';
import UpdatePasswordPopup from './UpdatePasswordPopup';
import { genMediaUrl } from '../config';
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
export default function ProfilePopup({
  open,
  setOpen,
  admin,
  disable,
  setDisable,
}) {
  const [values, setValues] = useState({
    name: admin.name,
    phone_number: admin.phone_number,
    email: admin.email,
    profile_pic: '',
  });
  // eslint-disable-next-line no-unused-vars
  const updateStore = UpdateStore();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { name, phone_number, email } = values;
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
  const handleSelectedFile = async (e) => {
    const myFile = e.target.files[0];
    setValues({ ...values, profile_pic: myFile });
    setDisable(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    // formData.append('phone_number', phone_number);

    if (email) {
      formData.append('email', email);
    }

    if (values.profile_pic) {
      formData.append('profile_pic', values.profile_pic);
    }
    const { data } = await api('put', '/admins', formData);

    toast.success('Profile edited successfully');
    updateStore({ admin: data.results });
    handleClose();
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
        maxWidth="sm"
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
              Profile
            </h1>

            <div
              className="hl-forget"
              style={{ marginTop: '2%', marginBottom: '5%' }}
            />
            <div>
              <div
                style={{
                  width: '26%',
                  height: '145px',
                  margin: 'auto',
                }}
              >
                {admin?.profile_pic ? (
                  <img
                    src={
                      values.profile_pic
                        ? URL.createObjectURL(values.profile_pic)
                        : genMediaUrl(admin.profile_pic)
                    }
                    id="profilePic"
                    style={{
                      border: '3px solid #28CDFF',
                      borderRadius: '100px',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    alt=""
                  />
                ) : (
                  <Avatar
                    name={name}
                    style={{
                      width: 'fit-content',
                      height: 'fit-content',
                      border: '3px solid #28CDFF',
                      borderRadius: '50%',
                    }}
                    round
                    size="140"
                    alt="profile_pic"
                  />
                )}
              </div>
              <label>
                <input
                  style={{
                    display: 'none',
                  }}
                  name="profile_pic"
                  type="file"
                  accept="image/*"
                  onChange={handleSelectedFile}
                />

                <img
                  src={editIcon}
                  style={{
                    position: 'relative',
                    top: '-30px',
                    left: '7%',
                    cursor: 'pointer',
                  }}
                  alt=""
                />
              </label>
            </div>
            <FormControl
              sx={{ mb: 1, mt: 3, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                placeholder="Name"
                size="normal"
                name="name"
                value={name}
                inputProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                    paddingLeft: '20px',
                  },
                }}
                onChange={onChangeEvent}
              />
            </FormControl>
            {phone_number ? (
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
                  placeholder="Phone Number"
                  size="normal"
                  type="text"
                  inputProps={{
                    maxLength: 10,
                    style: {
                      color: '#8C8C8C',
                      fontSize: '19px',
                      fontWeight: '700',
                      paddingLeft: '20px',
                    },
                  }}
                  value={phone_number}
                  name="phone_number"
                  onChange={onChangeEvent}
                />
              </FormControl>
            ) : (
              ''
            )}

            <FormControl
              sx={{ mb: 2, mt: 1, width: '85%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                placeholder="Email"
                size="normal"
                type="email"
                value={email}
                name="email"
                onChange={onChangeEvent}
                inputProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                    paddingLeft: '20px',
                  },
                }}
              />
            </FormControl>
            <Button
              onClick={() => {
                setOpenUpdateModal(true);
                // setOpen(false);
              }}
              sx={{
                width: '85%',
                borderRadius: '19px',
              }}
              variant="outlined"
              size="large"
              className="profileBtn"
            >
              <p>Change Password</p>
              <img src={arrow} alt="" />
            </Button>
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
            Save Changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {openUpdateModal && (
        <UpdatePasswordPopup
          disable={disable}
          setDisable={setDisable}
          openUpdateModal={openUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
          closeProfilePopup={handleClose}
        />
      )}
    </div>
  );
}
