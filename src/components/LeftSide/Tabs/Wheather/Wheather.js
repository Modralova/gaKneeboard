import React from "react";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";




const config = {

    headers: {

        'Content-Type': 'application/json'
    }
}


const TAF = await axios.get(process.env.WHEATHER_URI_PROXY, config).then(res => { return res.data })

const Wheather = () => {

    const themeState = useSelector(store => store.themeReducer).theme;

    return (

        <Box className="wheather" key={"0"} sx={{ my: 5, mx: "auto", height: 440 }}>
            {/* color:"#b5cfa9" */}
            {TAF && TAF.map((report, i) => {

                return (

                    <Card key={`${report.id}`} sx={{ mt: 0, mb: 1, mx: 5, p: 3, fontSize: 10 }}>



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

export default Wheather;