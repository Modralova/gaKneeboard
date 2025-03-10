import { createTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';




const ntpTheme = (outerTheme) => {
    const theme = createTheme({

        palette: outerTheme.palette,
        typography: outerTheme.typography,
        background: outerTheme.background,



        components: {

            MuiTextField: {

                variants: [
                    {
                        props: {

                            variant: 'outlined',

                        },


                    }],

                styleOverrides: {


                    root: {

                        MuiTextField:{
                            defaultProps: {
                                variant: 'outlined',
                                margin: 'dense',
                                size: 'small',
                                fullWidth: true,
                                InputLabelProps: { shrink: true }
                              },
                        },
                        '& .MuiInputBase-input': {
                            width: 100,

                            fontSize: 14,
                            color: "#b5cfa9",
                            margin: 0,
                            padding: 5,
                            textAlign: "center"
                          
                            
                            

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
                            paddingTop: 0
                        },


                        //'& .MuiInputLabelProps':{shrink: false},



                        '& label': { fontSize: 10, paddingTop: 0, margin: 0, color: "#b5cfa9" },
                        '& .MuiInputLabel-asterisk': { color: "red", fontSize: 7 }

                    }

                }

            },
            MuiButton: {

                variants: [

                    {
                        props: { size: "extraSmall" },
                        style: { minWidth: 0, fontSize: ".6em", padding: 2, height: 14 }
                    }
                ],




            }
        }

    })

    //console.log("theme: ", theme)


    return theme

};



export default ntpTheme

