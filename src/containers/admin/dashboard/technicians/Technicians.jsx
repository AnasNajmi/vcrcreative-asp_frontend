import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import TechnicianTable from './TechnicianTable';
import add from '../../../../assets/images/add.svg';
import AddTechnician from './AddTechnician';

import api from '../../../../api/index';

export default function Technicians() {
  const [open, setOpen] = useState(false);
  const [technicians, setTechnicians] = useState([]);

  const getTechnicians = async () => {
    const { data } = await api('get', '/users');
    if (data) {
      setTechnicians(data?.users);
    }
  };

  useEffect(() => {
    getTechnicians();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <TechnicianTable
            technicians={technicians}
            getTechnicians={getTechnicians}
          />
          <div className="btnContainer" style={{ width: '16%' }}>
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Invite a technician &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {open && (
        <AddTechnician
          open={open}
          setOpen={setOpen}
          getTechnicians={getTechnicians}
        />
      )}
    </div>
  );
}
