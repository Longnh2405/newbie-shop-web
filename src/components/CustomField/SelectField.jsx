import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { get } from 'lodash';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import { Autocomplete, Box } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
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
    boxHeader: {
      display: 'flex',
      // alignItems: 'center',
      marginBottom: '8px',
    },
  };
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

const Placeholder = ({ placeholder }) => {
  const classes = useStyles();
  return <span className={classes.placeholder}>{placeholder}</span>;
};

const SelectField = (props) => {
  //! State
  const {
    label,
    disabled,
    className,
    field,
    form,
    afterOnChange,
    options,
    sx,
    fullWidth = true,
    placeholder,
    isMultiple = false,
    isAutoCompleteOne = false,
    defaultValue,
    LabelColorPrimary,
    getOptionLabel,
    renderOption,
    required,
    ...otherProps
  } = props;

  const { onChange, onBlur, name, handleSubmit } = field || {};
  const { errors, touched } = form || {};

  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);
  const isShowMsg = isTouched && !!errorMsg;

  const value = useMemo(() => {
    if (props?.value) {
      return props?.value;
    }

    if (field?.value) {
      return field?.value;
    }

    if (isMultiple) {
      return [];
    }

    return '';
  }, [isMultiple, props?.value, field?.value]);

  const classes = useStyles();
  //! Function
  const handleChange = (e, selected) => {
    if (afterOnChange) {
      afterOnChange(isMultiple ? selected : e);
    }

    if (isMultiple || isAutoCompleteOne) {
      form?.setFieldValue(name, selected);
      return;
    }
    onChange(e);
  };

  //! Render
  const renderSelectComponent = () => {
    if (isMultiple) {
      return (
        <Autocomplete
          // freeSolo
          multiple
          disableCloseOnSelect
          id={name}
          options={options}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          getOptionLabel={getOptionLabel}
          defaultValue={defaultValue || []}
          filterSelectedOptions
          renderOption={
            renderOption
              ? (props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    {option.label}
                  </Box>
                )
              : null
          }
          renderInput={(params) => <CommonStyles.TextField {...params} onBlur={onBlur} placeholder={placeholder} />}
        />
      );
    }

    if (isAutoCompleteOne) {
      return (
        <Autocomplete
          id={name}
          options={options}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          renderInput={(params) => <CommonStyles.TextField {...params} onBlur={onBlur} placeholder={placeholder} />}
        />
      );
    }

    return (
      <Select
        error={!!isShowMsg}
        IconComponent={CommonIcons.Dropdown}
        displayEmpty
        labelId={name}
        id={name}
        name={name}
        value={value}
        multiple={isMultiple}
        // label={label}
        onChange={handleChange}
        onBlur={onBlur}
        className={className}
        disabled={disabled}
        sx={sx}
        MenuProps={MenuProps}
        renderValue={!!field?.value || value ? undefined : () => <Placeholder placeholder={placeholder} />}
        {...otherProps}
      >
        {(options || []).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  return (
    <FormControl fullWidth={fullWidth} className={classes.rootInput}>
      {/* <InputLabel id={name}>{label}</InputLabel> */}
      {!!label && (
        <label className={LabelColorPrimary ? classes.labelHeaderColorPrimary : ''} htmlFor={name}>
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      {renderSelectComponent()}
      {isShowMsg && <FormHelperText sx={{ color: 'red' }}>{errorMsg}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
