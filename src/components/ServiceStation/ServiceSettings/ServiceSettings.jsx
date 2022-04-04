import React, { useState } from 'react';

import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select,
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import detailsMock from '../../../mockData/detailsMock';
import carBrandsMock from '../../../mockData/carBrandsMock';

function ServiceSettings() {
  const [openCheckbox, setOpenCheckbox] = useState(false);
  const [selectCarBrand, setSelectCarBrand] = useState('');

  const handlerChangeBrand = (event) => {
    setSelectCarBrand(event.target.value);
  };

  const handleChangeCheckbox = () => {
    console.log(11111);
  };

  const handleClick = () => {
    setOpenCheckbox((prevState) => !prevState);
  };
  return (
    <Box>
      <FormControl fullWidth style={{ minWidth: 300 }}>
        <Select
          value={selectCarBrand}
          onChange={handlerChangeBrand}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem
            disabled
            value=""
          >
            <em>Марка автомобиля</em>
          </MenuItem>
          {carBrandsMock.map((brand) => (
            <MenuItem key={brand} value={brand}>{brand}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Запчасти" />
        {openCheckbox ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCheckbox} timeout="auto">
        <List component="div">
          <FormGroup style={{ padding: '8px 16px' }}>
            {detailsMock.map((detail) => (
              <FormControlLabel
                key={detail}
                control={<Checkbox name={detail} onChange={handleChangeCheckbox} />}
                label={detail}
              />
            ))}
          </FormGroup>
        </List>
      </Collapse>
    </Box>
  );
}

export default ServiceSettings;
