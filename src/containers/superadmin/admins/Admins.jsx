import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';

import AdminTable from './AdminTable';
import add from '../../../assets/images/add.svg';
import AddAdmin from './AddAdmin';

import api from '../../../api/index';

export default function Admins() {
  const [open, setOpen] = useState(false);
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    const { data } = await api('get', '/admins');
    if (data) {
      setAdmins(data?.results);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <AdminTable admins={admins} getAdmins={getAdmins} />
          <div className="btnContainer">
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add Admin &nbsp; &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {open && (
        <AddAdmin
          open={open}
          setOpen={setOpen}
          getAdmins={getAdmins}
        />
      )}
    </div>
  );
}
