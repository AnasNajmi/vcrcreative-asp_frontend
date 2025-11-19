/* eslint-disable consistent-return */

import { React } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

import Typography from '@mui/material/Typography';
import complete from '../assets/images/complete.svg';
import incomplete from '../assets/images/incomplete.svg';

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

export default function ServiceHistoryPopup({
  open,
  setOpen,
  service,
}) {
  const handleClose = () => {
    setOpen(false);
  };

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
              Details
            </h1>
            <div
              className="hl-forget"
              style={{
                marginTop: '16px',
              }}
            />

            <div className="serviceHistoryContainer">
              {service.checklists.length > 0 ? (
                service.checklists.map((row) => (
                  <div className="serviceHistoryContent">
                    <div className="servicesTitle">
                      {row.status === true ? (
                        <img src={complete} alt="" />
                      ) : (
                        <img src={incomplete} alt="" />
                      )}
                      <p
                        style={{
                          color:
                            row.status === true
                              ? '#202020'
                              : '#FF5151',
                          fontWeight: '400',
                          fontSize: '22px',
                        }}
                      >
                        {row.title}
                      </p>
                    </div>
                    {row.status === false ? (
                      <span
                        style={{
                          fontWeight: '400',
                          fontSize: '16px',
                          color: '#8C8C8C',
                          marginLeft: '34px',
                        }}
                      >
                        {`Reason: 
                        ${row.reason}`}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                ))
              ) : (
                <h3
                  style={{
                    marginRight: '56px',
                  }}
                >
                  No Tasklist found
                </h3>
              )}
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
