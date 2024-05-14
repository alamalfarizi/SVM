import React from "react";
import { NumericFormat } from 'react-number-format';

const NumFormat = React.forwardRef(function NumFormat(props, ref) {
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
    />
  );
});

export default NumFormat;
