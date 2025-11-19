/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import { React, useEffect } from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import moment from 'moment-timezone';

// import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import tick from '../../../../assets/images/tick.svg';
import cross from '../../../../assets/images/cross.svg';

// eslint-disable-next-line object-curly-newline

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(8),
    paddingTop: theme.spacing(7),
    textAlign: 'left',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

export default function TaskDetail({
  openDetail,
  setOpenDetail,
  details,
  schedule,
  getTasks,
  prevPopup,
  getDate,
}) {
  const handleClose = () => {
    setOpenDetail(false);
  };
  useEffect(() => {
    document.getElementById('addtask').style.display = 'none';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSchedule = (d) => {
    getDate(new Date(d.split('-').join('/')));
    getTasks(d);

    setOpenDetail(false);
    prevPopup(false);
    handleClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={(e, r) => {
          if (r && r === 'backdropClick') {
            prevPopup(false);
            handleClose(e);
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={openDetail}
        setOpen={setOpenDetail}
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
            <h1
              style={{
                fontSize: '30px',
                color: '#28CDFF',
              }}
            >
              {details?.repeat.length <= 1
                ? 'Task Details'
                : ' Task Repetitions'}
            </h1>
            <p
              className="enterEmailTxt"
              style={{
                fontSize: '22px',
                cursor: 'default',
              }}
            >
              {' '}
              {details?.repeat.length <= 1
                ? ' Following is the detail of task'
                : ' Following are the list of'}
            </p>
            <h1
              style={{
                fontSize: '22px',
                color: '#28CDFF',
                textTransform: 'capitalize',
                marginTop: '30px',
                marginBottom: '5px',
              }}
            >
              {details.service?.aquarium
                ? `${schedule.type}: ${details.service?.aquarium?.tank_details?.size} - ${details.service?.aquarium?.client?.first_name} ${details.service?.aquarium?.client?.last_name}`
                : schedule.type}
            </h1>
            <p
              style={{ color: '#8c8c8c', fontSize: '16px' }}
            >{`${moment(details.service?.start_time)
              .tz('America/Tijuana')
              .format('hh:mm A')} - ${moment(
              details.service?.end_time,
            )
              .tz('America/Tijuana')
              .format('hh:mm A')}`}</p>
            <h1
              style={{
                fontSize: '22px',
                color: '#28CDFF',
                marginTop: '30px',
                marginBottom: '5px',
              }}
            >
              {details?.repeat.length <= 1
                ? ''
                : 'This task repeats on:'}
            </h1>
            {details?.repeat?.map((row) => (
              <>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    background: 'white',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    padding: '15px 40px',
                    borderRadius: '25px',
                  }}
                  className={
                    row.success === true
                      ? 'detailTrueB'
                      : 'detailFalseB'
                  }
                >
                  <div>
                    <p
                      className={
                        row.success === true
                          ? 'detailTrue'
                          : 'detailFalse'
                      }
                    >
                      {` ${moment(row.date).format('dddd')} (${
                        row.title
                      })`}
                    </p>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <p
                      style={{
                        marginRight: '10px',
                        fontFamily: 'Helvetica Neue',
                        color: '#8C8C8C',
                      }}
                    >
                      {moment(row.date).format('MM-DD-YYYY')}
                    </p>
                    {row.success === true ? (
                      <img
                        src={tick}
                        alt=""
                        style={{ marginRight: '-11px' }}
                      />
                    ) : (
                      <img src={cross} alt="" />
                    )}
                  </div>
                </div>
                {row.success === false ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p className="detailFalse">
                      *This slot is already booked
                    </p>
                    <p
                      onClick={
                        () => {
                          openSchedule(
                            moment(row.date).format('MM-DD-YYYY'),
                          );
                        }
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                      role="presentation"
                      className="detailTrue"
                      style={{ cursor: 'pointer' }}
                    >
                      See Schedule
                    </p>
                  </div>
                ) : (
                  ''
                )}
              </>
            ))}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
