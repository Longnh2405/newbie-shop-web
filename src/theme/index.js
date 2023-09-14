import { createTheme } from '@mui/material';

export const theme = createTheme({
  custom: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      darkblue: '#124072',
      blue: '#115690',
      lightblue: '#2886CF',
      extra_lightblue: '#6BB8F4',
      blackblue: '#112957',
      lightgray: '#afafaf',
      grayborder: '#c4c4c4',
      gray: '#f5f5f5',
      darkgray: '#708090',
      lightgreen: '#25DAC5',
      red: '#F81D1D',
    },
    borderRadius: {
      button_12: '12px',
      button_100: '100px',
      input_12: '12px',
      input_8: '8px',
      modal_12: '12px',
    },
    padding: {
      paddingInput: '12px 16px',
    },
    zIndex: {
      zIndex_max: 999999,
    },
  },
  typography: {
    fontFamily: "'Mulish', sans-serif",
    h1: {
      fontSize: '38px',
      fontWeight: 'bold',
      lineHeight: '46px',
    },
    h2: {
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '38px',
    },
    h3: {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '32px',
    },
    h4: {
      fontSize: '20px',
      fontWeight: '700',
      lineHeight: '28px',
    },
    h5: {
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '24px',
    },
    h6: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '22px',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingRight: '10px',
          fontSize: '16px',
          backgroundColor: '#F1FEFD',
          color: '#434D56',
          width: 130,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
    // MuiPickersPopper: {
    //   styleOverrides: {
    //     root: {
    //       top: '50% !important',
    //       left: '50% !important',
    //       transform: "translate(-50%, -50%) !important"
    //     }
    //   }
    // },
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '12px',
    //       border: "solid 1p"
    //     }
    //   }
    // },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '0',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: '4px',
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          paddingLeft: '18px !important',
        },
      },
    },
    PrivatePickersMonth: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    }
  },
});
