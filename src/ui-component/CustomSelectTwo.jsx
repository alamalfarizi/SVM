import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function CustomSelectTwo({
  id = 'select-small-label',
  label,
  value,
  onChange,
  disabled = false,
  options,
  size = 'small',
  minWidth = 120,
  setMargin = false,
  margin,
  product_id,
  product_name
}) {
  return (
    <FormControl margin={margin} sx={{ mx: setMargin ? 1 : null, minWidth: minWidth, marginBottom: setMargin ? 2 : null }} size={size}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select disabled={disabled} labelId={id} value={value || product_id} label={label || product_name} onChange={onChange}>
        <MenuItem value={''}>Pilih Data</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value || option.product_id}>
            {option.label || option.product_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelectTwo;
