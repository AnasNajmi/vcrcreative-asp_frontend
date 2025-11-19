/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import edit from '../../../../assets/images/Edit.svg';
import back from '../../../../assets/images/BackButton.svg';
import down from '../../../../assets/images/down.svg';
import filter from '../../../../assets/images/blueFilter.png';
import deleteIcon from '../../../../assets/images/Delete.svg';
import AddTask from './AddTask';
import DeletePopup from '../../../../components/DeletePopup';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ScheduleTable({
  taskList,
  getTasks,
  aquariums,
  getDate,
  technician,
  scheduleDate,
}) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState({});
  const navigate = useNavigate();
  const [date, setDate] = useState(moment()._d);
  const [disable, setDisable] = useState(false);

  const dateChange = (e) => {
    setDate(e);
    getTasks(moment(e).format('MM-DD-YYYY'));
    getDate(e);
  };

  useEffect(() => {
    if (scheduleDate) {
      setDate(scheduleDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleDate]);

  return (
    <div className="bg">
      <TableContainer
        style={{
          maxHeight: '100%',
          overflowX: 'hidden',
        }}
      >
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
            <div
              className="scehduleTableRow"
              style={{ padding: '10px', border: 'none' }}
            >
              <div style={{ display: 'flex' }}>
                <img
                  src={back}
                  alt=""
                  onClick={() => navigate('/admin/technicians')}
                  style={{ cursor: 'pointer' }}
                  role="presentation"
                />
                <h1 className="thead">{`${technician.first_name}'s Schedule`}</h1>
              </div>
              <div
                className="date-filter-div"
                style={{
                  height: 'fit-content',
                  margin: 'auto 0',
                  display: 'flex',
                }}
              >
                <DatePicker
                  showPopperArrow
                  style={{ cursor: 'pointer' }}
                  dateFormat="MMMM-dd-yyyy"
                  name="date"
                  placeholderText="MMMM-dd-yyyy"
                  value={date}
                  selected={date}
                  popperPlacement="bottom-start"
                  showYearDropdown
                  onChange={dateChange}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    right: '70px',
                    width: '70px',
                    justifyContent: 'space-between',
                  }}
                >
                  <img src={down} alt="" />
                  <img src={filter} alt="" />
                </div>
              </div>
            </div>
          </TableHead>
          <TableBody>
            {taskList.tasks ? (
              taskList.tasks?.map((row) => (
                <div
                  className={
                    row.type === 'lunch'
                      ? 'scehduleTableBreakRow'
                      : row.type === 'drive'
                      ? 'scehduleTableDrivingRow'
                      : 'scehduleTableRow'
                  }
                >
                  <StyledTableCell
                    align="left"
                    className={
                      row.type === 'lunch'
                        ? 'technicianBreakType'
                        : 'technicianServiceType'
                    }
                  >
                    {row.type === 'service'
                      ? 'Service'
                      : row.type === 'loadup'
                      ? 'Start Vehicle Loadup'
                      : row.type === 'unload'
                      ? 'Start Vehicle Unload'
                      : row.type === 'drive'
                      ? 'Driving Period'
                      : row.type === 'lunch'
                      ? 'Break: Lunch'
                      : row.type === 'break'
                      ? 'Break'
                      : row.type === 'outOfOffice'
                      ? 'Out Of Office'
                      : row.type === 'endOfShift'
                      ? 'Shift Ended'
                      : ''}

                    <p
                      style={{ fontSize: '17px', marginTop: '10px' }}
                    >
                      {`${moment(row.start_time)
                        .tz('America/Tijuana')
                        .format('hh:mm A')}-${moment(row.end_time)
                        .tz('America/Tijuana')
                        .format('hh:mm A')}`}
                    </p>
                  </StyledTableCell>

                  <StyledTableCell
                    align="right"
                    sx={{
                      paddingLeft: '2%',
                      paddingRight: '2%',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        padding: '5px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <img
                          src={edit}
                          alt=""
                          className="editIcon flexitem"
                          onClick={() => {
                            setEditing(true);
                            setTask(row);
                            setDisable(true);
                          }}
                          role="presentation"
                        />

                        <img
                          src={deleteIcon}
                          className="deleteIcon flexitem"
                          onClick={() => {
                            setDel(true);
                            setTask(row);
                          }}
                          alt=""
                          role="presentation"
                        />
                      </div>
                    </div>
                  </StyledTableCell>
                </div>
              ))
            ) : (
              <div
                className="scehduleTableRow"
                style={{ padding: '40px' }}
              >
                <StyledTableCell> NOTHING FOUND</StyledTableCell>
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && (
        <AddTask
          open={editing}
          setOpen={setEditing}
          editing={editing}
          task={task}
          selectedDate={date}
          aquariums={aquariums}
          getTasks={getTasks}
          disable={disable}
          setDisable={setDisable}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={task}
          txt="schedule/tasks"
          getData={getTasks}
          selectedDate={date}
        />
      )}
    </div>
  );
}
