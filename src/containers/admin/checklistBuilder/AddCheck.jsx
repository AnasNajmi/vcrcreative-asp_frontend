/* eslint-disable jsx-a11y/label-has-associated-control */
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
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../../api/index';
import media from '../../../assets/images/attachment.svg';

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
    paddingBottom: theme.spacing(5.5),
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
export default function AddCheck({
  open,
  setOpen,
  editing,
  getChecks,
  check,
  getType,
  disable,
  setDisable,
}) {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (check) {
      setType(check.type);
      setTitle(check.title);
      setDescription(check.description);
      if (check.attachment?.url) {
        setAttachment({
          name: check.attachment?.url?.split('-').pop(),
          editing: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-unused-vars

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    const size = 1024 * 1024 * 20;

    if (myFile.size > size) {
      toast.error('File size can not exceed 20 Mb');
    } else {
      setAttachment(myFile);
      setDescription('');
    }
    setDisable(false);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('title', title);

      formData.append('description', description || '');

      if (type === 'service') {
        if (attachment?.name && !attachment.editing) {
          formData.append('attachment', attachment);
        }
      }
      if (editing) {
        if (type === 'service') {
          setLoading(true);

          if (!attachment?.name && attachment.editing) {
            setAttachment('');
            formData.append('attachment', '');
          }
        }
        await api('put', `/checklist/${check._id}`, formData);

        toast.success('Task edited successfully');
      } else {
        if (type === 'service') {
          setLoading(true);
        }
        await api('post', '/checklist', formData);
        toast.success('Task created successfully');
      }
      getChecks();
      if (!editing) {
        getType(type);
      }
      handleClose();
    } catch (error) {
      if (error) {
        setLoading(false);
      }
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
              {editing ? 'Edit Task' : 'Add new Task'}
            </h1>

            <InputLabel
              sx={{
                textAlign: 'left',
                marginLeft: '12%',
                color: '#8C8C8C',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Task List
              <span
                style={{ fontWeight: '100', letterSpacing: '1px' }}
              >
                {' '}
                (select one)
              </span>
            </InputLabel>
            <div>
              <Button
                className={
                  type === 'service'
                    ? 'activeCheckBtn'
                    : 'checkOptionBtns'
                }
                variant="outlined"
                disabled={editing}
                onClick={() => setType('service')}
              >
                Service
              </Button>
              <Button
                className={
                  type === 'loadup'
                    ? 'activeCheckBtn'
                    : 'checkOptionBtns'
                }
                variant="outlined"
                disabled={editing}
                onClick={() => setType('loadup')}
              >
                Vehicle Loadup
              </Button>
              <Button
                className={
                  type === 'unload'
                    ? 'activeCheckBtn'
                    : 'checkOptionBtns'
                }
                variant="outlined"
                disabled={editing}
                onClick={() => setType('unload')}
              >
                Vehicle Unload
              </Button>
            </div>
            <FormControl
              sx={{ mb: 1, mt: 2, width: '78%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                label="Name"
                size="normal"
                name="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setDisable(false);
                }}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '16px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>

            {type !== 'service' ? (
              <FormControl fullWidth sx={{ width: '78%', mt: 2 }}>
                <TextField
                  multiline
                  rows={5}
                  maxRows={5}
                  classes={outlinedInputStyles}
                  name="description"
                  value={description}
                  label="Description (optional)"
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setDisable(false);
                  }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#8C8C8C',
                      fontSize: '16px',
                      fontWeight: '700',
                    },
                  }}
                />
              </FormControl>
            ) : (
              <div>
                <FormControl
                  sx={{ mb: 1, mt: 2, width: '78%' }}
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
                        width: '86%',
                      },
                    }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    placeholder="Text, Image or video (optional)"
                    size="normal"
                    name="attachment"
                    type="text"
                    value={description || attachment?.name}
                    onChange={(e) => {
                      if (attachment?.name) {
                        setAttachment({
                          ...attachment,
                          name: e.target.value,
                        });
                      } else {
                        setAttachment({});
                        setDescription(e.target.value);
                      }
                      setDisable(false);
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#8C8C8C',
                        fontSize: '16px',
                        fontWeight: '500',
                      },
                    }}
                  />
                  <div
                    style={{
                      width: '0%',
                      position: 'absolute',
                      right: '10%',
                      top: '23%',
                    }}
                  >
                    <label>
                      <input
                        style={{
                          display: 'none',
                        }}
                        name="media"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleSelectedFile}
                        // onClick={(event) => {
                        //   event.target.value = null;
                        // }}
                      />

                      <img
                        style={{
                          textAlign: 'right',
                          cursor: 'pointer',
                        }}
                        src={media}
                        alt=""
                      />
                    </label>
                  </div>
                </FormControl>
              </div>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            // className="closeBtn"
            variant="outlined"
            className={loading ? 'disable' : 'closeBtn'}
            disabled={loading}
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            className={
              disable || loading ? 'disable' : 'resetPasswordBtn'
            }
            variant="contained"
            disabled={disable || loading}
          >
            {editing ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
        {loading ? (
          <CircularProgress
            // size={70}
            thickness={4.5}
            style={{
              position: 'absolute',
              zIndex: '1300',
              top: '50%',
              // width: '1300px',
              left: '50%',
              color: '#28cdff',
            }}
          />
        ) : (
          ''
        )}
      </BootstrapDialog>
    </div>
  );
}
