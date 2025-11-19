/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import edit from '../../../../assets/images/Edit.svg';
import deleteIcon from '../../../../assets/images/Delete.svg';
import AddClient from './AddClient';
import DeletePopup from '../../../../components/DeletePopup';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
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

export default function ClientsTable({
  clients,
  getClients,
  loading,
}) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [client, setClient] = useState('');
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  const phoneFormat = (num) => {
    const match = num.match(/(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      // eslint-disable-next-line no-param-reassign
      num = ['(', match[1], ') ', match[2], '-', match[3]].join('');
      return num;
    }
    return num;
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
        <h1 className="thead">List of Clients</h1>
        {loading ? (
          <Box
            sx={{
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
              justifyContent: 'center',
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
            aria-label="customized table"
          >
            {' '}
            <TableHead>
              <TableRow sx={{ background: '#d9f4ff' }}>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    width: '20%',
                    fontFamily: 'HelveticaBold',
                    padding: '0px',
                  }}
                  align="center"
                >
                  Name
                </StyledTableCell>

                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                    padding: '0px',
                  }}
                  align="center"
                >
                  Phone Number
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                    width: '25%',
                    padding: '8px',
                  }}
                  align="center"
                >
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients?.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    align="center"
                    className="technicianName"
                    sx={{
                      textAlign: 'justify',
                      padding: '0px 0px 0px 40px',
                    }}
                  >
                    {`${row.first_name} ${row.last_name}`}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="admintxt"
                    sx={{
                      color: '#8C8C8C',
                      padding: '0px',
                    }}
                  >
                    {phoneFormat(row.phone_number)}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    sx={{
                      paddingLeft: '2%',
                      paddingRight: '2%',
                      padding: '10px',
                    }}
                  >
                    <img
                      style={{ height: '40px' }}
                      src={edit}
                      alt=""
                      className="editIcon"
                      onClick={() => {
                        setEditing(true);
                        setClient(row);
                        setDisable(true);
                      }}
                      role="presentation"
                    />

                    <img
                      src={deleteIcon}
                      className="deleteIcon"
                      style={{ marginLeft: '3%', height: '40px' }}
                      onClick={() => {
                        setDel(true);
                        setClient(row);
                      }}
                      alt=""
                      role="presentation"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {editing && (
        <AddClient
          open={editing}
          setOpen={setEditing}
          editing={editing}
          client={client}
          getClients={getClients}
          disable={disable}
          setDisable={setDisable}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={client}
          txt="clients"
          getData={getClients}
        />
      )}
    </div>
  );
}
