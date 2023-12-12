
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { ThemeProvider } from "@mui/material";
import RouteTheme from "../Route/Route_theme";




/*
        0`id` 
        1`dzień` 
        2`zlecenie na lot` 
        3`znaki rejestracyjne`  
        4`statek powietrzny`    
        5`samolot wielosilnikowy` 
        6`pilot/uczeń` 
        7`drugi pilot` 
        8`obserwator`  
        9`instruktor`  
        10`nadzór`       
        11`dowódca załogi` 
        12`miejsce startu` 
        13`miejsce lądowania` 
        14`przelot po trasie` 
        15`godzina startu` 
        16`godzina lądowania` 
        17`czas lotu` 
        18`początek kołowania` 
        19`koniec kołowania po locie` 
        20`czas blokowy` 
        21`IFR` 
        22`VFR` 
        23`VFR noc` 
        24`VFR spec` 
        25`VFR przyrz.` 
        26`godzina uruchomienia` 
        27`godzina wyłączenia` 
        28`czas pracy silnika` 
        29`mth przed lotem`  
        30`mth po locie` 
        31`motogodziny` 
        32`hobbs przed lotem` 
        33`hobbs po locie` 
        34`hobbs` 
        35`ilość lotów` 
        36`il. ląd.` 
        37`il. touch and go` 
        38`il. podejść` 
        39`il. go around` 
        40`rodzaj startu` 
        41`czas holu za samolotem` 
        42`wysokość holu za samolotem` 
        43`rodzaj lotu` 
        44`nazwa produktu/usługi` 
        45`szkolenie` 
        46`zad./ćw.` 
        47`wynik` 
        48`uwagi` 
*/



const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

let history = await axios.get("http://localhost:8080/api/logbook/history", config).then(res => {


    return res.data; // dane w rewersie

})


let XLSX_Logbook = await axios.get("http://localhost:8080/api/logbook/update", config).then(res => {


return res.data; // dane w rewersie

})






//console.log(history[0]);    


const countTaxiTime = (date, TaxiStart, TaxiEnd, DTime, ATime) => {


    let taxiStart = new Date((`${date} ${TaxiStart}`).replace(/-/g, '/'));
    let taxiEnd = new Date((`${date} ${TaxiEnd}`).replace(/-/g, '/'));
    let dTime = new Date((`${date} ${DTime}`).replace(/-/g, '/'));
    let aTime = new Date((`${date} ${ATime}`).replace(/-/g, '/'));

    let beforeStartTaxiTime = Math.abs(dTime - taxiStart);
    let afterLandingTaxiTime = Math.abs(taxiEnd - aTime);


    let seconds = Math.abs(beforeStartTaxiTime + afterLandingTaxiTime);

    var taxiTimeOffset = new Date(0);
    var beforeOffset = new Date(0);
    var afterOffset = new Date(0);


    taxiTimeOffset.setSeconds(seconds / 1000);
    beforeOffset.setSeconds(beforeStartTaxiTime / 1000);
    afterOffset.setSeconds(afterLandingTaxiTime / 1000);

    let taxiTime = taxiTimeOffset.toISOString().substring(11, 19);
    let beforeDeparture = beforeOffset.toISOString().substring(11, 19);
    let afterArrival = afterOffset.toISOString().substring(11, 19);

    return { total: taxiTime, beforeDeparture, afterArrival };


}

const countFligthTime = (chrono) => {

   // console.log(chrono)
   
    let total = chrono.reduce((total, slice) => {


        let mDate = Date.parse(`${slice.date} ${slice.fligthTime}`)
       
        let dDate = new Date(mDate);

        let tM = total.m + dDate.getMinutes(); 
        let tH= total.h + dDate.getHours(); 

       // console.log("H: ",tH)

  return  {h:tH,m:tM};


    }, {h:0,m:0}  );

    let time = new Date(0)

    //console.log("time: ", time)

    //time.setMinutes(total.m);

    //console.log("time: ", time)

    time.setHours(total.h+1,total.m,0);
    //time.setMinutes(total.m);
    //time.setTime(total.h,total.m,0);
   

    let fTime = time.toISOString().substring(11, 19);

    return  fTime

}


let index = 1;
let operation = {};
operation.chrono = [];

let Logbook = [];




history.forEach((rec, r) => {

    let fligth = {

        index: index,
        date: history[r][1],
        order: history[r][2],
        time: history[r][20],
        task: history[r][46],
        signs: history[r][3],
        plane: history[r][4],
        multiEngine: history[r][5] === "nie" ? false : true,
        pilot: history[r][6],
        coPilot: history[r][7],
        instructor: history[r][9],
        PIC: history[r][11],
        route: history[r][14] === "nie" ? false : true,


    }


    let fligthData = {

        date: history[r][1],
        departureTime: history[r][15],
        arrivalTime: history[r][16],
        fligthTime: history[r][17],
        taxiStart: history[r][18],
        taxiEnd: history[r][19],
        totalTime: history[r][20],
        IFR: history[r][21],
        VFR: history[r][22],
        VFRnigth: history[r][23],
        VFRspec: history[r][24],
        taxiTime: countTaxiTime(

            history[r][1],
            history[r][18],
            history[r][19],
            history[r][15],
            history[r][16]),

        slice: `${history[r][12]} => ${history[r][13]}`,
        id: history[r][0],

    }


    if (r < history.length - 1 && (history[r][1] == history[r + 1][1])) {



        if (history[r][46] != history[r + 1][46] ||
            `${history[r][12]}${history[r][13]}` != `${history[r + 1][12]}${history[r + 1][13]}` ||
            history[r][11] != history[r + 1][11]
        ) {




            operation.chrono.push(fligthData);

        
            operation.fligthTime = countFligthTime(operation.chrono);

            operation = { ...operation, ...fligth };
            //operation.landings = operation.chrono.length;

            ////////
            Logbook.push(operation);
            ////////


            operation = {};
            operation.chrono = [];
            index++;

        } else {

            operation.chrono.push(fligthData);

        }

    }


    if (r < history.length - 1 && (history[r][1] != history[(r + 1)][1])) {

        operation = { ...operation, ...fligth };

        operation.chrono.push(fligthData);

        operation.fligthTime = countFligthTime(operation.chrono);

        ////////
        Logbook.push(operation);
        ////////

        operation = {};
        operation.chrono = [];
        index++;

    }

})


Logbook = Logbook.toReversed();

//console.log("Logbook: ", Logbook);


const History = () => {



    return (<Box
        className="route" key={"3"}
        sx={{ my: 5, mx: "auto", height: 450, overflow: "auto" }}
    >
       
        {/* {Logbook.map((fligth, f) => { */}
        {XLSX_Logbook.map((fligth, f) => {

            return <Card key={f}
                sx={{ mt: 0, mb: 1, mx: 5, p: 3, fontSize: 10 }}
            >

                <ThemeProvider theme={RouteTheme}>
                    <Typography id="AP" variant={"c1"} component="p" >{fligth.date}</Typography>
                    <Typography id="AP" variant={"c1"} component="p" >{fligth.departure_place}{" => "}{fligth.arrival_place}</Typography>
                    <Typography id="AP" variant={"c1"} component="p" >{fligth.departure_time}{" => "}{fligth.arrival_time}</Typography>
                    <Typography id="AP" variant={"c1"} component="p" >{fligth.begin_time}{" => "}{fligth.end_time}</Typography>
                    <Typography id="AP" variant={"c3"} component="p" >{fligth.aircraft_model}{", "}{fligth.aircraft_registration}</Typography>
                    <Typography id="AP" variant={"c2"} component="p" >{"task: "}{fligth.task}</Typography>
                    <Typography id="AP" variant={"c2"} component="p" >{"fligth time: "}{fligth.total_time}</Typography>
                    <Typography id="AP" variant={"c2"} component="p" >{"pilot: "}{fligth.pilot}</Typography>
                    <Typography id="AP" variant={"c2"} component="p" >{"PIC: "}{fligth.PIC_name}</Typography>
                    <Typography id="AP" variant={"c2"} component="p" >{"teacher: "}{fligth.instructor}</Typography>
                    <Typography id="AP" variant={"c3"} component="p" >{"[dep] => [arr]: "}</Typography>
                    {fligth.chrono.map((task, t) => {
                        return <Typography key={t} id="AP" variant={"c1"} component="p" >{task.slice}</Typography>
                    })}
                </ThemeProvider>
            </Card>


        })}


    </Box>);
}

export default History;