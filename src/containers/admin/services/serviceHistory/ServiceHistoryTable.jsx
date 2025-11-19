/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
import { styled } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import Avatar from 'react-avatar';
import { Box, CircularProgress } from '@mui/material';
import DataFiltersSelect from './DataFiltersSelect';
import FiltersSelect from './FiltersSelect';
import { genMediaUrl } from '../../../../config';
import ServiceHistoryPopup from '../../../../components/ServiceHistoryPopup';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F3FDFF',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function ServiceHistoryTable({
  serviceHistory,
  exportHistory,
  loading,
}) {
  // eslint-disable-next-line no-unused-vars, operator-linebreak
  const [serviceHistories, setServiceHistories] = useState([]);
  const [service, setService] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [date, setDate] = useState(new Date());

  const dateChange = (e) => {
    setDate(e);
    setServiceHistories(
      serviceHistory.filter(
        (_) =>
          // eslint-disable-next-line implicit-arrow-linebreak, operator-linebreak
          moment(_.date).format('MM-DD-YYYY') ===
          moment(e).format('MM-DD-YYYY'),
      ),
    );
  };

  useEffect(() => {
    if (serviceHistory) {
      setServiceHistories(serviceHistory);
    }
  }, [serviceHistory]);

  useEffect(() => {
    if (serviceHistories) {
      exportHistory(serviceHistories);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceHistories]);

  const options = {
    weekday: 'short',
    year: 'numeric',
    day: 'numeric',
    month: 'short',
  };

  return (
    <div className="bg">
      <TableContainer
        component={Paper}
        style={{
          borderRadius: '20px',
          maxHeight: '100%',
          overflowX: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '104px',
            alignItems: 'center',
          }}
        >
          <div>
            <h1 className="thead">History</h1>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '-10px',
            }}
          >
            {selectedFilter === 'date' ? (
              <div
                className="date-filter-div2"
                style={{
                  height: 'fit-content',
                  margin: 'auto 0',
                  display: 'flex',
                }}
              >
                <DatePicker
                  showPopperArrow
                  dateFormat="MMMM-dd-yyyy"
                  name="date"
                  placeholderText="MMMM-dd-yyyy"
                  value={date}
                  selected={date}
                  popperPlacement="bottom-start"
                  showYearDropdown
                  onChange={dateChange}
                />
              </div>
            ) : (
              <DataFiltersSelect
                text={selectedFilter || 'Tank Size'}
                style={{
                  border: '1px solid #28CDFF ',
                  borderRadius: '17px',
                  color: '#28CDFF',
                  textAlign: 'left',
                  paddingRight: '4%',
                }}
                sx={{ m: 1, width: 300, mt: 3 }}
                selectedFilter={selectedFilter}
                serviceHistory={serviceHistory}
                setServiceHistories={setServiceHistories}
              />
            )}
            <FiltersSelect
              text="Filter"
              style={{
                borderRadius: '17px',
                border: '1px solid #8C8C8C',
                color: '#8C8C8C',
              }}
              sx={{ m: 1, minWidth: 80, mt: 3 }}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
        </div>
        {loading && serviceHistories.length === 0 ? (
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              padding: '5%',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table
            sx={{
              minWidth: 700,
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow sx={{ background: '#d9f4ff' }}>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                  }}
                  align="center"
                >
                  Client Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                  }}
                  align="center"
                >
                  Date
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                  }}
                  align="center"
                >
                  Service Start Time - End Time
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                    width: '20%',
                  }}
                  align="center"
                >
                  Technician
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                    width: '20%',
                  }}
                  align="center"
                >
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceHistories &&
                serviceHistories.length > 0 &&
                serviceHistories?.map((row, i) => (
                  <StyledTableRow>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: 'max-Content',
                        marginLeft: '20px',
                        alignItems: 'left',
                      }}
                    >
                      <div
                        style={{
                          textAlign: 'left',
                          marginTop: '20px',
                        }}
                      >
                        <p className="placename">{`${row.aquarium?.client?.first_name} ${row.aquarium?.client?.last_name}`}</p>

                        <p className="tankname">
                          {row.aquarium?.tank_details?.size.trim()}
                        </p>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className="serviceTableTxt"
                    >
                      {new Date(row.date).toLocaleDateString(
                        'en-BA',
                        options,
                      )}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className="serviceTableTxt"
                    >
                      {`${moment(row.start_time)
                        .tz('America/Tijuana')
                        .format('hh:mm A')} - ${moment(row.end_time)
                        .tz('America/Tijuana')
                        .format('hh:mm A')}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="technicianCol">
                        <div style={{ height: '56px' }}>
                          {row.technician?.profile_pic ? (
                            <img
                              style={{
                                height: '50px',
                                width: '50px',
                                border: '3px solid #28CDFF',
                                borderRadius: '50%',
                                objectFit: 'cover',
                              }}
                              src={
                                // eslint-disable-next-line operator-linebreak
                                genMediaUrl(
                                  row.technician?.profile_pic,
                                )
                              }
                              alt=""
                              onError={
                                () =>
                                  // eslint-disable-next-line implicit-arrow-linebreak
                                  setServiceHistories((prev) => {
                                    prev[i].technician.profile_pic =
                                      undefined;
                                    return [...prev];
                                  })
                                // eslint-disable-next-line react/jsx-curly-newline
                              }
                            />
                          ) : (
                            <Avatar
                              name={row.technician?.first_name}
                              style={{
                                width: '100%',
                                height: '100%',
                                border: '3px solid #28CDFF',
                                borderRadius: '50%',
                              }}
                              round
                              size="50"
                              alt="profile_pic"
                            />
                          )}
                        </div>
                        <span
                          style={{ margin: 'auto' }}
                          className="serviceTableTxt"
                        >
                          {`${row.technician?.first_name} ${row.technician?.last_name}`}
                        </span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        className="serviceDetailBtn"
                        onClick={() => {
                          setOpen(true);
                          setService(row);
                        }}
                        onKeyDown={() => setOpen(true)}
                        variant="outlined"
                      >
                        Details
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {open && (
        <ServiceHistoryPopup
          open={open}
          setOpen={setOpen}
          service={service}
        />
      )}
    </div>
  );
}
