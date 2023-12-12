import { createTheme, colors } from "@mui/material";




const WheatherTheme = createTheme ({

    components: {

        MuiTypography: {

            variants: [
                {
                    props: {
                        variant: "c1",
                               
                    },
                    style: {
                        color: "#9dddff",
                 
                    }
                },{
                    props: {
                        variant: "c2",
                                
                    },
                    style: {
                        color: "#ce9178",
                       
                    }

                },{
                    props: {
                        variant: "c3",
                                
                    },
                    style: {
                        color: "#b5cfa9",
                       
                    }

                }
            ]

        }

    }

})



export default WheatherTheme