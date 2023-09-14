import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CommonStyles from 'components/CommonStyles';
import { get, isEmpty } from 'lodash';
import { FormControl, FormHelperText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => {
  return {
    rootInput: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 14,

      '& > label': {
        marginBottom: 8,
        fontWeight: 600,
      },
      '& .label-header-color-#124072': {
        color: `${theme.custom.colors.darkblue} !important`,
      },
      '& .MuiInputBase-root': {
        borderRadius: theme.custom.borderRadius.input_12,
      },
      '& .MuiSelect-select': {
        padding: theme.custom.padding.paddingInput,
      },
    },
    placeholder: {
      color: theme.custom.colors.lightgray,
    },
    labelHeaderColorPrimary: {
      color: `${theme.custom.colors.darkblue} !important`,
    },
  };
});

export default function AutocompleteAsyncField({
  field,
  form,
  label,
  multiple,
  fullWidth,
  loadOptionsByRequest,
  LabelColorPrimary,
  valueProject,
  afterOnChange,
  roleOption,
  ...props
}) {
  //! State
  const { onBlur, name } = field || {};
  const { setFieldValue, errors, touched } = form || {};
  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);
  const isShowMsg = isTouched && !!errorMsg;

  const [isLoading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [valueInput, setValueInput] = React.useState(null);
  const classes = useStyles();

  const value = useMemo(() => {
    if (props?.value) {
      return props?.value;
    }
    if (field?.value) {
      return field?.value;
    }
    return [];
  }, [props?.value, field?.value]);

  //! Function
  React.useEffect(() => {
    // if (valueInput) {
    loadOptionsByRequest &&
      loadOptionsByRequest(valueInput, roleOption, { setOptions, setLoading }, value, valueProject);
    // }
  }, [valueInput, setOptions, setLoading, value, valueProject]);

  const onChangeInputSearch = (e) => {
    setValueInput(e.target.value);
  };

  const onChangeSelect = (event, value) => {
    if (afterOnChange) {
      afterOnChange(value);
      return;
    }
    setFieldValue(name, value);
  };

  //! Render
  return (
    <FormControl fullWidth={fullWidth} className={classes.rootInput}>
      {/* <InputLabel id={name}>{label}</InputLabel> */}
      {!!label && (
        <label className={LabelColorPrimary ? classes.labelHeaderColorPrimary : ''} htmlFor={name}>
          {label}
        </label>
      )}
      <Autocomplete
        multiple={multiple}
        id={name}
        options={options}
        getOptionLabel={(option) => option?.label || ''}
        onChange={onChangeSelect}
        value={value}
        onBlur={onBlur}
        loading={isLoading}
        renderInput={(params) => (
          <CommonStyles.TextField {...params} value={valueInput} onBlur={onBlur} onChange={onChangeInputSearch} />
        )}
        {...props}
      />
      {isShowMsg && <FormHelperText sx={{ color: 'red' }}>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
