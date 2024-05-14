import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function CustomSelect({
  id = 'select-small-label',
  label,
  value,
  onChange,
  disabled = false,
  options,
  size = 'small',
  minWidth = 120,
  setMargin = false,
  margin
}) {
  return (
    <FormControl margin={margin} sx={{ mx: setMargin ? 1 : null, minWidth: minWidth, marginBottom: setMargin ? 2 : null }} size={size}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select disabled={disabled} labelId={id} value={value} label={label} onChange={onChange}>
        <MenuItem value={''}>Pilih Data</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
