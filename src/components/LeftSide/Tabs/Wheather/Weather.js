import React from "react";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";




const config = {

    headers: {

        'Content-Type': 'application/json'
    }
}


const TAF = await axios.get("http://localhost:8080/api/taf", config).then(res => { return res.data })

const Weather = () => {

    const themeState = useSelector(store => store.themeReducer).theme;

    return (

        <Box className="weather" key={"0"}
            sx={{
                my: 5,
                mx: "auto",
                height: 440,
                width: 200
                
            }}>
            {/* color:"#b5cfa9" */}
            {TAF && TAF.map((report, i) => {

                return (

                    <Card key={`${report.id}`} sx={{ mt: 0, mb: 1, mx: 0, p: 3, fontSize: 10,
                    
                        
                        "@media screen and (orientation: portrait)": {
                            fontSize: 8,
                            px:1,
                        }
                    
                    
                    }}>



                        <Typography id="AP" variant="c1" component="p" >{report.airport}{" "}{report.filetime}</Typography>
                        <br />
                        <Typography variant="c2" component="p">{report.valid_from}</Typography>
                        <Typography variant="c2" component="p">{report.valid_to}</Typography>
                        <br />
                        <Typography variant="c3" component="p">{report.message}</Typography>
                        <br />


                    </Card>
                )
            }
            )
            }

        </Box>
    )


}

export default Weather;