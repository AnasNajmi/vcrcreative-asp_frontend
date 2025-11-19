/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from 'react-avatar';
import edit from '../../../assets/images/Edit.svg';
import deleteIcon from '../../../assets/images/Delete.svg';
import AddAdmin from './AddAdmin';
import DeletePopup from '../../../components/DeletePopup';
import { genMediaUrl } from '../../../config';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
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

export default function AdminTable({ admins, getAdmins }) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [admin, setAdmin] = useState('');
  const [Admins, setAdmins] = useState([]);

  useEffect(() => {
    setAdmins(admins);
  }, [admins]);
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
        <h1 className="thead">List of Admins</h1>
        <Table
          sx={{
            minWidth: 700,
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
          }}
          aria-label="customized table"
        >
          <TableBody>
            {Admins.map((row, i) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="right"
                  className="safariMarginClass"
                  sx={{
                    width: '30%',
                  }}
                >
                  <div className="adminTextAndImage">
                    {row?.profile_pic ? (
                      <img
                        style={{
                          height: '50px',
                          width: '50px',
                          border: '3px solid #28CDFF',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          objectFit: 'cover',
                        }}
                        src={
                          // eslint-disable-next-line operator-linebreak
                          genMediaUrl(row?.profile_pic)
                        }
                        onError={
                          () =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            setAdmins((prev) => {
                              // eslint-disable-next-line no-param-reassign, operator-linebreak
                              prev[i].profile_pic = undefined;
                              return [...prev];
                            })
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                        alt=""
                      />
                    ) : (
                      <Avatar
                        name={row?.name[0]}
                        style={{
                          width: 'fit-content',
                          height: '100%',
                          border: '3px solid #28CDFF',
                          borderRadius: '50%',
                        }}
                        round
                        size="50"
                        alt="profile_pic"
                      />
                    )}
                    <p className="admintxt">{row.name}</p>
                  </div>
                </StyledTableCell>
                {/* <StyledTableCell align="left" className="admintxt">
                {row.name}
                </StyledTableCell> */}
                <StyledTableCell
                  align="center"
                  className="admintxt"
                  sx={{
                    color: '#8C8C8C',
                    paddingLeft: '10%',
                    textAlign: 'justify',
                  }}
                >
                  {row.email}
                </StyledTableCell>

                <StyledTableCell
                  align="right"
                  sx={{
                    paddingLeft: '2%',
                    paddingRight: '2%',
                  }}
                >
                  <div
                    className="action-buttons"
                    style={{
                      display: 'flex',
                      gap: '8px',
                    }}
                  >
                    <img
                      src={edit}
                      alt=""
                      className="editIcon"
                      onClick={() => {
                        setEditing(true);
                        setAdmin(row);
                      }}
                      role="presentation"
                    />

                    <img
                      src={deleteIcon}
                      className="deleteIcon"
                      onClick={() => {
                        setDel(true);
                        setAdmin(row);
                      }}
                      alt=""
                      role="presentation"
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && (
        <AddAdmin
          open={editing}
          setOpen={setEditing}
          editing={editing}
          admin={admin}
          getAdmins={getAdmins}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={admin}
          txt="admins"
          getData={getAdmins}
        />
      )}
    </div>
  );
}
