import { React, useState, useEffect } from 'react';
import { styled } from '@mui/styles';
import Table from '@mui/material/Table';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import Avatar from 'react-avatar';
import FiltersSelect from './FiltersSelect';
import DataFiltersSelect from './DataFiltersSelect';
import { genMediaUrl } from '../../../config';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F3FDFF!important',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function ServiceTable({
  serviceHistory,
  exportHistory,
}) {
  // eslint-disable-next-line no-unused-vars, operator-linebreak
  const [serviceHistories, setServiceHistories] =
    useState(serviceHistory);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setServiceHistories(serviceHistory);
  }, [serviceHistory]);

  useEffect(() => {
    exportHistory(serviceHistories);
  }, [exportHistory, serviceHistories]);
  const options = {
    weekday: 'short',
    year: 'numeric',
    day: 'numeric',
    month: 'short',
  };
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
          }}
        >
          <div>
            <h1 className="thead">Service History</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                  placeholderText="DMMMM-dd-yyyy"
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
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <h1>List of Admins</h1> */}
            {serviceHistories.map((row, i) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="center"
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <p className="placename">{`${row.aquarium?.client?.first_name} ${row.aquarium?.client?.last_name}`}</p>

                    <p className="tankname">
                      {' '}
                      {row.aquarium?.tank_details?.size}
                    </p>
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="serviceTableTxt"
                >
                  {/* {moment(row.date).format('DD-MM-YYYY')} */}
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
                    .format('hh:mm A')}-${moment(row.end_time)
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
                            genMediaUrl(row.technician?.profile_pic)
                          }
                          alt=""
                          onError={
                            () =>
                              // eslint-disable-next-line implicit-arrow-linebreak
                              setServiceHistories((prev) => {
                                // eslint-disable-next-line no-param-reassign, operator-linebreak
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
                            borderRadius: '50px',
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
                  {/* </span> */}
                  {/* <span>{row.technician}</span> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
