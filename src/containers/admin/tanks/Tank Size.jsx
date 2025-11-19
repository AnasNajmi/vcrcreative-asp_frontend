/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import edit from '../../../assets/images/Edit.svg';
import deleteIcon from '../../../assets/images/Delete.svg';
import dropdown from '../../../assets/images/Dropdown.svg';
import AddTank from './AddTank';
import DeletePopup from '../../../components/DeletePopup';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '1% 3.5%',
    width: '100%',
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

export default function TankSize({ tanks, getTanks, type, setType }) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tank, setTank] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [toggleIcon, setToggleIcon] = useState(true);
  const [disable, setDisable] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setToggleIcon(!toggleIcon);
  };

  useEffect(() => {
    if (type === 'size') {
      setExpanded(true);
      setToggleIcon(true);
    }
    setType('');
  }, [type]);

  return (
    <div
      className="tankDetails"
      style={{ padding: ' 1% 3% 1% 1%', marginTop: '3%' }}
    >
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
            padding: '0.5% 1.5%',
          }}
        >
          <h1 className="thead">Size</h1>
          {toggleIcon ? (
            <img
              src={dropdown}
              alt=""
              style={{
                marginRight: '2%',
              }}
              onClick={handleExpandClick}
              role="presentation"
            />
          ) : (
            <img
              src={dropdown}
              alt=""
              style={{
                marginRight: '2%',
                transform: 'rotateX(180deg)',
              }}
              onClick={handleExpandClick}
              role="presentation"
            />
          )}
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
            aria-label="customized table"
          >
            <TableBody fullWidth>
              {tanks
                ?.filter((_) => _.type === 'size')
                .map((row) => (
                  <StyledTableRow key={row.size}>
                    <StyledTableCell
                      align="left"
                      className="tankInfo"
                      sx={{
                        color: '#28cdff',
                      }}
                    >
                      {`${row.value} Gallon Tank`}
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
                          marginRight: '72px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          style={{
                            marginRight: '14%',
                          }}
                          src={edit}
                          alt=""
                          className="editIcon"
                          onClick={() => {
                            setEditing(true);
                            setTank(row);
                            setDisable(true);
                          }}
                          role="presentation"
                        />

                        <img
                          style={{
                            marginLeft: '10px',
                          }}
                          src={deleteIcon}
                          className="deleteIcon"
                          onClick={() => {
                            setDel(true);
                            setTank(row);
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
        </Collapse>
      </TableContainer>

      {editing && (
        <AddTank
          open={editing}
          setOpen={setEditing}
          editing={editing}
          tank={tank}
          getTanks={getTanks}
          disable={disable}
          setDisable={setDisable}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={tank}
          txt="tank"
          getData={getTanks}
        />
      )}
    </div>
  );
}
