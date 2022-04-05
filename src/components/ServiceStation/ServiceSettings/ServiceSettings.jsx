import React, { useEffect, useState } from 'react';

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
import useUniqValuesCheckbox from '../../../customHooks/useUniqValuesCheckbox';

// eslint-disable-next-line react/prop-types
function ServiceSettings({ setAllCarBrands }) {
  const [openCheckbox, setOpenCheckbox] = useState(false);
  const [carBrand, setCarBrand] = useState('');
  const [selectDetail, setSelectDetail] = useState([]);

  const handlerSetCarBrand = (event) => {
    setCarBrand(event.target.value);
  };

  const handleChangeCheckbox = (event) => {
    useUniqValuesCheckbox(event, selectDetail, setSelectDetail);
  };

  const handleClick = () => {
    setOpenCheckbox((prevState) => !prevState);
  };

  useEffect(() => {
    const carAndSettings = {
      [carBrand]: {
        spareParts: selectDetail,
      },
    };

    if (!!carAndSettings[carBrand]
      && !!selectDetail.length) {
      setAllCarBrands((prevState) => ({
        ...prevState,
        ...carAndSettings,
      }));
    }
  }, [selectDetail, carBrand]);

  return (
    <Box>
      <FormControl fullWidth style={{ minWidth: 300 }}>
        <Select
          value={carBrand}
          onChange={handlerSetCarBrand}
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
