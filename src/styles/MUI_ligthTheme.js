import { createTheme, colors } from "@mui/material";



const ligthTheme = createTheme({

    typography: {
        fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

    },
    palette: {


        fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,

        background: {

            paper: "#ffffff",
            default: "#ffffff"
        },
        primary: {
            main: "#3f3f3f",
            contrastText: "#ececec"
        }, secondary: {
            light: "#f3f4ee",
            main: "#7a5f26",
            dark: "#a31515",
            contrastText: "#6a6a6a"
        }
    },
    components: {

        MuiTypography: {

            variants: [
                {
                    props: {
                        variant: "body3",
                        //jeśli wariant == "body3"
                    },
                    style: {
                        color: "#333333",
                        fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
                    }
                },
                {
                    props: {
                        variant: "c1",

                    },
                    style: {
                        color: "#0070c2",

                    }
                }, {
                    props: {
                        variant: "c2",

                    },
                    style: {
                        color: "#ce9178",

                    }

                }, {
                    props: {
                        variant: "c3",

                    },
                    style: {
                        color: "#7a5f26",

                    }

                }
            ]

        }, MuiMenu: {
            styleOverrides: {
                root: {

                    '& .MuiMenuItem-root': {
                        a: {
                            color: "#333333",
                            textDecoration: "none"
                        }
                    }
                }
            }

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
                            InputLabelProps: { shrink: true }
                        },
                    },
                    '& .MuiInputBase-input': {
                        width: 100,

                        fontSize: 14,
                        color: "#3f3f3f",
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



                    '& label': { fontSize: 10, paddingTop: 0, margin: 0, color: "#3f3f3f" },
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




        }, MuiPaper: {
            styleOverrides: {
                root: {
                    label: { color: "#3f3f3f" }
                }
            }
        }

    }

})

export default ligthTheme;



