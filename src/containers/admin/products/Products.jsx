import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';

import ProductTable from './ProductTable';
import add from '../../../assets/images/add.svg';
import AddProduct from './AddProduct';

import api from '../../../api/index';

export default function Products() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data } = await api('get', '/products');
    if (data) {
      setProducts(data?.results);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <ProductTable
            products={products}
            getProducts={getProducts}
          />
          <div className="btnContainer">
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add Product &nbsp; &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {open && (
        <AddProduct
          open={open}
          setOpen={setOpen}
          getProducts={getProducts}
        />
      )}
    </div>
  );
}
