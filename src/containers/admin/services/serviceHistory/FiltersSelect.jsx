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
      width: 250,
    },
  },
};

export default function MultipleSelect({
  text,
  style,
  sx,
  setSelectedFilter,
}) {
  const [Filter, setFilter] = React.useState([]);

  const handleChange = (event) => {
    setFilter(event.target.value);
    setSelectedFilter(event.target.value);
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
          sx={{ textAlign: 'left', width: '260px' }}
          IconComponent={() => (
            <>
              <KeyboardArrowDownOutlinedIcon />
              <img src={filter} style={{ margin: '0 12%' }} alt="" />
            </>
          )}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            {text}
          </MenuItem>
          <MenuItem value="client">Client Name</MenuItem>
          <MenuItem value="tankSize">Tank Size</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
