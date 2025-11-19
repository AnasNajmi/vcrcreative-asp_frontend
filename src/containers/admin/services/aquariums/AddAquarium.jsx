/* eslint-disable react/jsx-props-no-spreading */
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import api from '../../../../api/index';

// styling for dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

// styling for text field
const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #CDEEFC ',
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

export default function AddAquarium({
  open,
  setOpen,
  editing,
  getAquariums,
  aquarium,
  clients,
  tanks,
  disable,
  setDisable,
}) {
  const outlinedInputStyles = useOutlinedInputStyles();
  const [values, setValues] = useState({
    client: '',
    tank_details: {
      size: '',
      type: '',
      material: '',
      filter: '',
    },
    address: {
      name: '',
      lat: '',
      lng: '',
    },
    service_details: '',
  });
  const [allAddresses, setAllAddresses] = useState([]);

  const divStyle = {
    color: '#8C8C8C',
    fontSize: '19px',
    fontWeight: '700',
  };

  const selectFieldStyle = {
    '.MuiOutlinedInput-notchedOutline': {
      border: '1px solid #CDEEFC',
      padding: '4%',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#28CDFF',
      padding: '4%',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#28CDFF',
      padding: '4%',
    },
    borderRadius: '20px',
    backgroundColor: 'white',
    textAlign: 'left',
    fontSize: 16,
  };

  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    if (aquarium) {
      setValues({
        ...aquarium,
        client: aquarium.client._id,
      });
    }
  }, [aquarium]);

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeEvent = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    if (editing) {
      setDisable(false);
    }
  };
  const onChangeTankDetails = (e) => {
    setValues((prev) => ({
      ...prev,
      tank_details: {
        ...prev.tank_details,
        [e.target.name]: e.target.value,
      },
    }));
    if (editing) {
      setDisable(false);
    }
  };

  const handleGetAddress = async ({ target }) => {
    const { data } = await api(
      'get',
      `/address?text=${target.value}`,
    );
    setAllAddresses(data.results);
  };

  // Handling Address Change
  const handleAddressChange = async (event, value) => {
    setValues({
      ...values,
      address: {
        name: value.name,
        lat: value.lat,
        lng: value.lng,
      },
    });
    if (editing) {
      setDisable(false);
    }
  };

  const handleSubmit = async () => {
    if (editing) {
      await api('put', `/clients/aquariums/${aquarium._id}`, values);
      toast.success('Aquarium edited successfully');
    } else {
      await api('post', '/clients/aquariums', values);
      toast.success('Aquarium created successfully');
    }
    handleClose();
    getAquariums();
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
          style: {
            borderRadius: 25,
            background: '#F3FDFF',
          },
        }}
      >
        <DialogContent>
          <Typography gutterBottom>
            <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>
              {editing ? 'Edit Aquarium' : 'Add Aquarium'}
            </h1>

            <FormControl sx={{ mt: 5, mr: 5, mb: 3, width: '45%' }}>
              <InputLabel
                id="demo-simple-select-label"
                style={divStyle}
              >
                Client Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="client"
                value={values.client}
                label="Client Name"
                onChange={onChangeEvent}
                sx={selectFieldStyle}
              >
                {clients?.map((client) => (
                  <MenuItem value={client._id}>
                    {`${client.first_name} ${client.last_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{ mb: 1, mt: 5, width: '45%' }}
              variant="outlined"
            >
              <Autocomplete
                id="combo-box-demo"
                value={values?.address}
                freeSolo
                options={allAddresses}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  handleAddressChange(event, value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '25px',
                    }}
                    id="select"
                    label="Address&nbsp;&nbsp;"
                    variant="outlined"
                    classes={outlinedInputStyles}
                    onChange={(e) => handleGetAddress(e)}
                    InputLabelProps={{
                      style: {
                        color: '#8C8C8C',
                        fontSize: '19px',
                        fontWeight: '700',
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ width: '95%', mb: 5 }}>
              <TextField
                multiline
                rows={5}
                maxRows={5}
                classes={outlinedInputStyles}
                name="service_details"
                value={values.service_details}
                label="Service Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                onChange={onChangeEvent}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                inputProps={{
                  maxlength: '500',
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
            <h1
              style={{
                fontSize: '24px',
                color: '#28CDFF',
                marginBottom: '2%',
              }}
            >
              Tank Details
            </h1>

            <div className="hl-forget" />
            <FormControl
              sx={{ mb: 2, mt: 5, width: '45%', mr: 5 }}

              // sx={{ mb: 1, mt: 3, width: '85%' }}
              // variant="outlined"
            >
              <InputLabel
                id="demo-simple-select-label"
                style={divStyle}
              >
                Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.size}
                label="size"
                name="size"
                onChange={onChangeTankDetails}
                sx={selectFieldStyle}
              >
                {tanks
                  ?.filter((tank) => tank.type === 'size')
                  .map((tank) => (
                    <MenuItem value={`${tank.value} Gallons Tank`}>
                      {`${tank.value} Gallons Tank`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, mt: 5, width: '45%' }}>
              <InputLabel
                id="demo-simple-select-label"
                style={divStyle}
              >
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.type}
                label="type"
                name="type"
                onChange={onChangeTankDetails}
                sx={selectFieldStyle}
              >
                {tanks
                  ?.filter((tank) => tank.type === 'type')
                  .map((tank) => (
                    <MenuItem value={tank.value}>
                      {tank.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 1, width: '45%', mr: 5 }}>
              <InputLabel
                id="demo-simple-select-label"
                style={divStyle}
              >
                Material
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.material}
                label="material"
                name="material"
                onChange={onChangeTankDetails}
                sx={selectFieldStyle}
              >
                {tanks
                  ?.filter((tank) => tank.type === 'material')
                  .map((tank) => (
                    <MenuItem value={tank.value}>
                      {tank.value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 1, width: '45%' }}>
              <InputLabel
                id="demo-simple-select-label"
                style={divStyle}
              >
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.tank_details.filter}
                label="filter"
                name="filter"
                onChange={onChangeTankDetails}
                sx={selectFieldStyle}
              >
                {tanks
                  ?.filter((tank) => tank.type === 'filter')
                  .map((tank) => (
                    <MenuItem value={tank.value}>
                      {tank.value}
                    </MenuItem>
                  ))}
              </Select>
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
            {editing ? 'Update Aquarium' : 'Add Aquarium'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
