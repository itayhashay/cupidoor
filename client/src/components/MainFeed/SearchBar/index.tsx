import { useEffect, useState } from 'react';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { City } from '../../../types/address';
import { Container } from './styles';
import { Cities } from '../../../utils/cities';
import { getFirsthundredCities } from '../../../utils/logic';

// const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
// const checkedIcon = <CheckBoxIcon fontSize='small' />;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [citiesList, setCities] = useState<City[]>([]);

  useEffect(() => {
    setCities(getFirsthundredCities(Cities));
  }, []);

  useEffect(() => {
    const filteredCities = Cities.filter((city: City) => city.city_name.includes(searchValue));
    setCities(getFirsthundredCities(filteredCities));
  }, [searchValue]);

  // const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(event.target.value);
  // };

  return (
    <Container>
      {/* <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        limitTags={3}
        options={citiesList}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Where do you want live?"
            onChange={onValueChange}
          />
        )}
      />
      <Button id="main-search-button" variant="contained">
        Find my house!
      </Button> */}
    </Container>
  );
};

export default SearchBar;
