import React from "react";
import { NumericFormat } from 'react-number-format';

const CurrencyFormat = React.forwardRef(function CurrencyFormat(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
    />
  );
});

export default CurrencyFormat;
