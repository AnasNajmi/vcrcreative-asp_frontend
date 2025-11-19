/* eslint-disable indent */
import { React, useState, useEffect } from 'react';
import { styled } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { Box, CircularProgress } from '@mui/material';
import MultipleSelect from './FilterByClientName';
import edit from '../../../../assets/images/Edit.svg';
import deleteIcon from '../../../../assets/images/Delete.svg';
import AddAquarium from './AddAquarium';
import DeletePopup from '../../../../components/DeletePopup';

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

export default function AquariumTable({
  aquariums,
  getAquariums,
  clients,
  tanks,
  loading,
}) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [aquarium, setAquarium] = useState('');
  const [allAquariums, setAllAquariums] = useState(aquariums);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setAllAquariums(aquariums);
  }, [aquariums]);

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
            <h1 className="thead">List of Aquariums</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <MultipleSelect
              text="Client Name"
              style={{
                borderRadius: '17px',
                border: '1px solid #8C8C8C',
                color: '#8C8C8C',
                padding: '2%',
              }}
              aquariums={aquariums}
              setAllAquariums={setAllAquariums}
              sx={{ m: 1, mt: 3, mr: 7 }}
            />
          </div>
        </div>
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
                    width: '18%',
                  }}
                  align="center"
                >
                  Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                    width: '35%',
                  }}
                  align="center"
                >
                  Address
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                  }}
                  align="center"
                >
                  Service Details
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
              {/* <h1>List of Admins</h1> */}
              {allAquariums?.map((row) => (
                <StyledTableRow key={row.name}>
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
                      style={{ textAlign: 'left', marginTop: '15px' }}
                    >
                      <p className="placename">
                        {' '}
                        {`${row.client?.first_name} ${row.client?.last_name}`}
                      </p>

                      <p className="tankname">
                        {row.tank_details.size}
                      </p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell
                    align="justifyContent"
                    className="serviceTableTxt"
                    style={{
                      padding: '0px 80px 0px 60px',
                    }}
                  >
                    {`${row.address.name}`}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="serviceTableTxt"
                    sx={{
                      color: '#8c8c8c',
                      textAlign: 'justify',
                      letterSpacing: '0',
                      wordBreak: 'break-word',
                    }}
                  >
                    {row.service_details.length < 135
                      ? row.service_details
                      : `${row.service_details.substring(
                          0,
                          135,
                        )}  ....`}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      paddingLeft: '2%',
                      paddingRight: '1%',
                    }}
                  >
                    <img
                      src={edit}
                      alt=""
                      className="editIcon"
                      onClick={() => {
                        setEditing(true);
                        setAquarium(row);
                        setDisable(true);
                      }}
                      role="presentation"
                    />

                    <img
                      src={deleteIcon}
                      className="deleteIcon"
                      style={{ marginLeft: '3%' }}
                      onClick={() => {
                        setDel(true);
                        setAquarium(row);
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
        <AddAquarium
          open={editing}
          setOpen={setEditing}
          editing={editing}
          aquarium={aquarium}
          getAquariums={getAquariums}
          clients={clients}
          tanks={tanks}
          disable={disable}
          setDisable={setDisable}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={aquarium}
          txt="clients/aquariums"
          getData={getAquariums}
        />
      )}
    </div>
  );
}
