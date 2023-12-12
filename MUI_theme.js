import { createTheme, colors } from "@mui/material";



const theme = createTheme({

    typography: {
        fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

    },
    palette: {

        mode: "dark",
        fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,

        background: {

            paper: "#181818",
            default: "#181818"
        },
        primary: {
            main: "#b5cfa9",
            contrastText: "#1f1f1f"
        }, secondary: {
            light: "#f3f4ee",
            main: "#a7e22e",
            dark: "#c17788",
            contrastText: "#001e3c"
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
                        color: "#b5cfa9",
                        fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
                    }
                }
            ]

        }
    }

})

export default theme;


// , 
//                 {
//                     props: {
//                         variant: "body4"
//                     }, style: { color: "#a7e22e" }
//                 }
