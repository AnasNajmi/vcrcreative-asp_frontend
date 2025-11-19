/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import filter from '../../../../assets/images/filter.png';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function MultipleSelect({
  text,
  style,
  sx,
  // clients,
  aquariums,
  setAllAquariums,
}) {
  const [Filter, setFilter] = React.useState('');
  let clients = aquariums.map((a) => a.client);

  clients = clients.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.id === value.id &&
          t.first_name === value.first_name &&
          t.last_name === value.last_name,
      ),
  );

  const handleChange = (event) => {
    setFilter(event.target.value);
    setAllAquariums(
      aquariums.filter(
        (aquarium) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          aquarium?.client?._id === event.target.value,
      ),
    );
  };

  return (
    <div>
      <FormControl sx={sx} size="small">
        <Select
          displayEmpty
          value={Filter}
          onChange={handleChange}
          input={<OutlinedInput />}
          style={style}
          IconComponent={() => (
            <>
              <KeyboardArrowDownOutlinedIcon />

              <img src={filter} style={{ margin: '0 2%' }} alt="" />
            </>
          )}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ textAlign: 'left', width: '220px' }}
        >
          <MenuItem disabled value="">
            <em>{text}</em>
          </MenuItem>

          {clients?.map((a) => (
            <MenuItem value={a._id}>
              {`${a.first_name} ${a.last_name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
