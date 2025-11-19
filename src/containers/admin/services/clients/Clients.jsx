import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';

import ClientTable from './ClientTable';
import add from '../../../../assets/images/add.svg';
import AddClient from './AddClient';
import api from '../../../../api/index';

export default function Clients() {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClients = async () => {
    setLoading(true);
    const { data } = await api('get', '/clients');
    if (data) {
      setClients(data?.results);
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <ClientTable
            loading={loading}
            clients={clients}
            getClients={getClients}
          />
          <div className="btnContainer">
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add new Client &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {open && (
        <AddClient
          open={open}
          setOpen={setOpen}
          getClients={getClients}
        />
      )}
    </div>
  );
}
