import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SelectField from './SelectField';
import { Field, Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    BoxSelect: {
      width: '100% !important',
    },
  };
});

const AntTabs = styled(Tabs)({
  borderBottom: 'none',
  '& .MuiTabs-indicator': {
    display: 'none',
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: '#434D56',
  border: '1px solid #ddd',
  borderBottom: 'none',
  borderRadius: '8px 8px 0 0',
  margin: 0,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#6BB8F4',
    opacity: 1,
  },
  '&.Mui-selected': {
    border: 'none',
    color: '#fff',
    backgroundColor: '#6BB8F4',
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: '8px 8px 0 0',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '70%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

const optionsDataProject = [
  {
    value: 'Chi nhánh',
    label: 'Chi nhánh',
  },
  {
    value: 'Trụ sở chính',
    label: 'Trụ sở chính',
  },
];

const dataProject = [
  {
    value: 'Medicskin',
    label: 'Medicskin',
  },
  {
    value: 'Mayo',
    label: 'Mayo',
  },
  {
    value: 'Johnson',
    label: 'Johnson',
  },
];

export default function CustomizedTabsField() {
  const [value, setValue] = React.useState('Medicskin');

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs value={value} onChange={handleChange}>
          {(dataProject || []).map((data, index) => {
            return <AntTab key={index} label={data.label} value={data.value} />;
          })}
        </AntTabs>
      </Box>
      <Box sx={{ width: '100%' }}>
        <StyledTabs sx={{ width: '100%' }}>
          <Formik
            initialValues={{
              project: 'Trụ sở chính',
            }}
          >
            {(formik) => (
              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <Grid container md={12} sm={12} xs={12}>
                  <Grid item md={10} sm={12} xs={12}>
                    <Field
                      name="project"
                      sx={{ width: '100% !important', borderRadius: '0 12px 12px 12px !important' }}
                      options={optionsDataProject}
                      component={SelectField}
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </StyledTabs>
      </Box>
    </Box>
  );
}
