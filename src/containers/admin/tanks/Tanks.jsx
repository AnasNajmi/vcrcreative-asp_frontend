import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import add from '../../../assets/images/add.svg';
import AddTank from './AddTank';
import api from '../../../api/index';
import TankType from './Tank Type';
import TankSize from './Tank Size';
import TankMaterial from './Tank Material';
import TankFilter from './Tank Filter';

export default function Tanks() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [tanks, setTanks] = useState([]);
  const getTankDetails = async () => {
    const { data } = await api('get', '/tank');
    if (data) {
      setTanks(data?.tanks);
    }
  };
  const getType = (t) => {
    setType(t);
  };

  useEffect(() => {
    getTankDetails();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid
          xl={10}
          lg={9}
          sx={{
            backgroundColor: '#d9f4ff',
            height: '100%',
            paddingBottom: '3%',
          }}
        >
          <TankSize
            tanks={tanks}
            getTanks={getTankDetails}
            type={type}
            setType={setType}
          />
          <TankType
            tanks={tanks}
            getTanks={getTankDetails}
            type={type}
            setType={setType}
          />
          <TankMaterial
            tanks={tanks}
            getTanks={getTankDetails}
            type={type}
            setType={setType}
          />
          <TankFilter
            tanks={tanks}
            getTanks={getTankDetails}
            type={type}
            setType={setType}
          />
          <div className="btnContainer" style={{ position: 'fixed' }}>
            <Button
              variant="contained"
              fullWidth
              className="tankDetailsBtn"
              onClick={() => setOpen(true)}
            >
              Add New Value &nbsp;
              <img
                style={{
                  height: '24px',
                }}
                src={add}
                alt="add"
              />
            </Button>
          </div>
        </Grid>
      </Grid>

      {open && (
        <AddTank
          open={open}
          setOpen={setOpen}
          getTanks={getTankDetails}
          getType={getType}
        />
      )}
    </div>
  );
}
