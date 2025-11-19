import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import AquariumTable from './AquariumTable';
import add from '../../../../assets/images/add.svg';
import AddAquarium from './AddAquarium';
import api from '../../../../api/index';

export default function Aquariums() {
  const [open, setOpen] = useState(false);
  const [aquariums, setAquariums] = useState([]);
  const [clients, setClients] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAquariums = async () => {
    setLoading(true);
    const { data } = await api('get', '/clients/aquariums');
    if (data) {
      setAquariums(data?.results);
      setLoading(false);
    }
  };
  const getClients = async () => {
    const { data } = await api('get', '/clients');
    if (data) {
      setClients(data?.results);
    }
  };
  const getTankDetails = async () => {
    const { data } = await api('get', '/tank');
    if (data) {
      setTanks(data?.tanks);
    }
  };

  useEffect(() => {
    getAquariums();
    getClients();
    getTankDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <AquariumTable
            aquariums={aquariums}
            getAquariums={getAquariums}
            clients={clients}
            tanks={tanks}
            loading={loading}
          />

          <div className="btnContainer">
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add Aquarium &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {open && (
        <AddAquarium
          open={open}
          setOpen={setOpen}
          getAquariums={getAquariums}
          clients={clients}
          tanks={tanks}
        />
      )}
    </div>
  );
}
