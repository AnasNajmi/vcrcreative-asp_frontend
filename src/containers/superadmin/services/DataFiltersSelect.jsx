/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({
  text,
  style,
  sx,
  selectedFilter,
  serviceHistory,
  setServiceHistories,
}) {
  const [Filter, setFilter] = React.useState([]);

  const handleChange = (event) => {
    setFilter(event.target.value);
    setServiceHistories(
      selectedFilter === 'client'
        ? serviceHistory.filter(
            (_) => _.aquarium?.client._id === event.target.value,
          )
        : serviceHistory.filter(
            (_) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              _.aquarium.tank_details.size === event.target.value,
          ),
    );
  };
  let tanks = serviceHistory.map(
    (a) => a.aquarium?.tank_details?.size.trim(),
    // eslint-disable-next-line function-paren-newline
  );

  tanks = [...new Set(tanks)];

  let clients = serviceHistory.map((a) => a.aquarium?.client);

  clients = clients.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t?.id === value?.id &&
          t?.first_name === value?.first_name &&
          t?.last_name === value?.last_name,
      ),
  );

  return (
    <div>
      <FormControl sx={sx} size="small">
        <Select
          displayEmpty
          value={Filter}
          onChange={handleChange}
          input={<OutlinedInput />}
          style={style}
          IconComponent={() => <KeyboardArrowDownOutlinedIcon />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled selected value="">
            {(selectedFilter === 'client' ? 'Client' : 'Tank Size') ||
              text}
          </MenuItem>
          {selectedFilter === 'client'
            ? clients.map((client) => (
                <MenuItem value={client?._id}>
                  {`${client?.first_name} ${client?.last_name}`}
                </MenuItem>
              ))
            : tanks.map((tank) => (
                <MenuItem value={tank}>{tank}</MenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );
}
