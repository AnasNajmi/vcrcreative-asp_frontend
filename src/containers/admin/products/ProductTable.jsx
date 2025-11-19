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
import edit from '../../../assets/images/Edit.svg';
import deleteIcon from '../../../assets/images/Delete.svg';
import AddProduct from './AddProduct';
import DeletePopup from '../../../components/DeletePopup';

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

export default function ProductTable({ products, getProducts }) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [product, setProduct] = useState('');
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);
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
        <h1 className="thead">List of Products</h1>
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
            <TableRow sx={{ background: '#d9f4ff', padding: '40px' }}>
              <StyledTableCell sx={{ width: '2%' }} />
              <StyledTableCell align="left">
                <div
                  style={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                    marginLeft: '30px',
                  }}
                >
                  {' '}
                  Name
                </div>
              </StyledTableCell>

              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontFamily: 'HelveticaBold',
                }}
                align="center"
              >
                Price
              </StyledTableCell>
              {/* <StyledTableCell className="spaceCol" /> */}
              <StyledTableCell
                sx={{
                  width: '40%',
                }}
                align="right"
              >
                <div
                  style={{
                    fontSize: '16px',
                    fontFamily: 'HelveticaBold',
                    marginRight: '45px',
                  }}
                >
                  {' '}
                  Action
                </div>
              </StyledTableCell>
              <StyledTableCell sx={{ width: '2%' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell />
                <StyledTableCell
                  align="left"
                  className="safariMarginClass"
                >
                  <p className="admintxt">{row.name}</p>
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  className="admintxt"
                  sx={{
                    color: '#8C8C8C',
                  }}
                >
                  {`$${row.price}`}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <img
                    src={edit}
                    alt=""
                    className="editIcon"
                    onClick={() => {
                      setEditing(true);
                      setProduct(row);
                      setDisable(true);
                    }}
                    role="presentation"
                  />

                  <img
                    src={deleteIcon}
                    className="deleteIcon"
                    onClick={() => {
                      setDel(true);
                      setProduct(row);
                    }}
                    alt=""
                    role="presentation"
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && (
        <AddProduct
          open={editing}
          setOpen={setEditing}
          editing={editing}
          product={product}
          getProducts={getProducts}
          disable={disable}
          setDisable={setDisable}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={product}
          txt="products"
          getData={getProducts}
        />
      )}
    </div>
  );
}
