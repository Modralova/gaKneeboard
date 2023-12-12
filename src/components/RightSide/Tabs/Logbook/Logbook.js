
import React, { useEffect, useState} from "react";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { setExpa } from "../../../../Store/LogbookSlice";




const fetchLogbook = async () => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    return await axios.get("http://localhost:8080/api/logbook", config).then(res => {


        if (res.status === 200) {
            // console.log("res: ", res)
            return res.data;
        }

    }).catch(err => console.log("error: ", err))



}



const Logbook = () => {


    const themeState = useSelector(store => store.themeReducer).theme;
    const [logbook, setLogbook] = useState([]);

    const loginState = useSelector(state => state.loginReducer).logged;

    const dispatch = useDispatch();

    useEffect(() => {

        if (loginState) {

            fetchLogbook().then(logboookData => {
                // console.log("", logboookData   );
            setLogbook(logboookData)});

        }
    }, [loginState]);

    


    const  Experience = logbook &&  logbook.reduce((total,fligth)=>{

        const miliseconds = (timeString) =>{

            return Date.parse(`1970-01-01 ${timeString} GMT+00:00`,)

        }

         const timeOutput = (time) =>{

            let tArry = (time/3600000).toFixed(2).toString().trim().split('.')

            return `${tArry[0]}:${((tArry[1]/100)*60).toFixed(0)}`
         }

        return { block_time: total.block_time += miliseconds(fligth.block_time),
                 taxi_time: total.taxi_time += miliseconds(fligth.taxi_time),
                 air_time: total.air_time += miliseconds(fligth.air_time),
                 block_time_string: timeOutput(total.block_time),
                 taxi_time_string:timeOutput(total.taxi_time),
                 air_time_string: timeOutput(total.air_time)
                }

    },{block_time:0, air_time:0, taxi_time:0 });  
    
    
useEffect(()=>{

        dispatch(setExpa(Experience));
    
    },[Experience])
    

  

    return (<Box
        className="route" key={"3"}
        sx={{ my: 1, mx: "auto", height: 400, overflow: "auto" }}
    >




        { 

           logbook && logbook.toReversed().map((fligth, f) => {

                return <Card key={f}
                    sx={{ mt: 0, mb: 1, mx: 5, p: 3, fontSize: 10 }}
                >


                        <Typography id="AP" variant={"c1"} component="p" >{fligth.date}</Typography>
                        <Typography id="AP" variant={"c2"} component="p" >{fligth.departure_place}{"=>"}{fligth.arrival_place}</Typography>
                        <Typography id="AP" variant={"c1"} component="p" >{fligth.departure_time}{"=>"}{fligth.arrival_time}</Typography>
                        <Typography id="AP" variant={"c3"} component="p" >{fligth.aircraft_model}{", "}{fligth.aircraft_registration}</Typography>
                        <Typography id="AP" variant={"c3"} component="p" >{"PIC: "}{fligth.PIC_name}</Typography>
                        <Typography id="AP" variant={"c3"} component="p" >{"task: "}{fligth.task}</Typography>
                        <Typography id="AP" variant={"c3"} component="p" >{"landings: "}{fligth.landings_day}</Typography>
                        <Typography id="AP" variant={"c3"} component="p" >{"block time: "}{fligth.block_time}</Typography>
                        <Typography id="AP" variant={"c3"} component="p" >{"air time: "}{fligth.air_time}</Typography>
                        <Typography id="AP" variant={"c3"} component="p" >{"taxi time: "}{fligth.taxi_time}</Typography>

                        {/* <Typography id="AP" variant={"c3"} component="p" >{"[dep] => [arr]: "}</Typography> */}
                        {/* {fligth.chrono.map((task, t) => {
                        return <Typography key={t} id="AP" variant={"c1"} component="p" >{task.slice}</Typography>
                    })} */}
                   
                </Card>


            })

        }

    </Box>);
}



export default Logbook;