import { Box } from '@samovar/ui/Box';
import { FormControl } from '@samovar/ui/FormControl';
import { InputLabel } from '@samovar/ui/InputLabel';
import { MenuItem } from '@samovar/ui/MenuItem';
import { Select, type SelectChangeEvent } from '@samovar/ui/Select';

export interface SearchFormType {
  disabled: boolean;
  dist: string;
  handleDist: (event: SelectChangeEvent) => void;
}

function SearchForm(props: SearchFormType) {
  return (
    <>
      <div>Search Form</div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl disabled={props.disabled} fullWidth>
          <InputLabel id="demo-simple-select-label">Distance</InputLabel>
          <Select
            id="search-distance-select"
            label="Distance"
            labelId="search-distance-select-label"
            onChange={props.handleDist}
            value={props.dist}
          >
            <MenuItem value={1000}>1K</MenuItem>
            <MenuItem value={5000}>5K</MenuItem>
            <MenuItem value={10000}>10K</MenuItem>
            <MenuItem value={50000}>50K</MenuItem>
            <MenuItem value={100000}>100K</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default SearchForm;
