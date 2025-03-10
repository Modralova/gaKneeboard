import { createTheme } from '@mui/material';

const darkTheme = createTheme({

  typography: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  },
  palette: {

    mode: 'dark',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

    background: {

      paper: '#181818',
      default: '#181818',
    },
    primary: {
      main: '#b5cfa9',
      contrastText: '#1f1f1f',
    },
    secondary: {
      light: '#f3f4ee',
      main: '#a7e22e',
      dark: '#c17788',
      contrastText: '#001e3c',
    },
  },
  components: {

    MuiTypography: {

      variants: [
        {
          props: {
            variant: 'body3',
            // jeśli wariant == "body3"
          },
          style: {
            color: '#b5cfa9',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
        },
        {
          props: {
            variant: 'c1',

          },
          style: {
            color: '#9dddff',

          },
        }, {
          props: {
            variant: 'c2',

          },
          style: {
            color: '#ce9178',

          },

        }, {
          props: {
            variant: 'c3',

          },
          style: {
            color: '#b5cfa9',

          },

        },
      ],

    },
    MuiMenu: {
      styleOverrides: {
        root: {

          '& .MuiMenuItem-root': {
            a: {
              color: '#B5CFA9',
              textDecoration: 'none',
            },
          },
        },
      },

    },
    MuiTextField: {

      variants: [
        {
          props: {

            variant: 'outlined',

          },

        }],

      styleOverrides: {

        root: {

          MuiTextField: {
            defaultProps: {
              variant: 'outlined',
              margin: 'dense',
              size: 'small',
              fullWidth: true,
              InputLabelProps: { shrink: true },
            },
          },
          '& .MuiInputBase-input': {
            width: 100,
            fontSize: 14,
            color: '#b5cfa9',
            margin: 0,
            padding: 5,
            textAlign: 'center',
          },
          '& .MuiOutlinedInput-notchedOutline legend': {
            // display: "none"
          },
          '& .MuiInputLabel-root': {

            shrink: true,
            notched: true,
          },
          '& .MuiInputLabel-outlined': {

          },
          //  '& .MuiOutlinedInput-notchedOutline legend': { display: "none" },

          '--TextField-brandBorderColor': '#E0E3E7',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor': '#6F7E8C',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
            //    fontSize: '.7rem',
            paddingTop: 0,
          },

          // '& .MuiInputLabelProps':{shrink: false},

          '& label': {
            fontSize: 10, paddingTop: 0, margin: 0, color: '#b5cfa9',
          },
          '& .MuiInputLabel-asterisk': { color: 'red', fontSize: 7 },

        },

      },

    },
    MuiButton: {

      variants: [

        {
          props: { size: 'extraSmall' },
          style: {
            minWidth: 0, fontSize: '.6em', padding: 2, height: 14,
          },
        },
      ],

    },
    MuiPaper: {
      styleOverrides: {
        root: {
          label: { color: '#b5cfa9' },
        },
      },
    },

  },

});

export default darkTheme;
