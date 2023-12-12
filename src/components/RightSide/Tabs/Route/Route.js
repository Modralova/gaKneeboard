import React, { useEffect, useState, useRef} from "react";

import { Box, Card, Typography } from "@mui/material";


import "./Route.css";

import { useDispatch, useSelector } from "react-redux";

import { setId } from "../../../../Store/idSlice";
import { routeSave } from "../../../../Store/outputRouteSlice";




const Route = () => {

    const dispatch = useDispatch();


   
    let List = useRef();


    const themeState = useSelector(store => store.themeReducer).theme;
    const routeState = useSelector(state => state.routeReducer).route;
    const [route, setRoute] = useState([]);


        useEffect(() => {


            setRoute(routeState);

          //  console.log("LIST: ",List)

        }, [routeState]);


    const handleDragStart = event => {

        event.target.classList.add("dragged");
    }


    const handleSetID = event => {

        let idToSet = "";

        if (event.target.className.includes("draggable")) {

            idToSet = event.target.id;
        }

        if (event.target.parentNode.className.includes("draggable")) {

            idToSet = event.target.parentNode.id;
        }

        dispatch(setId({id: idToSet}));

    };

    const handleDragEnd = event => {


        event.target.classList.remove("dragged");


        const orderedRoute = [...routeState.map((section, s) => {

            return routeState.find(item => item.id === List.current.children[s].id);

        })]

 dispatch(routeSave({newRoute:orderedRoute}));



 
  
     

    }


    const handleDragOver = event => {

        let oneDragged;

        event.preventDefault();

        route.forEach((section, s) => {


            if (!List.current.childNodes[s]) {
                return;
            }


             if((List.current.childNodes[s]) &&
             (List.current.childNodes[s].className.includes("dragged"))) {

                oneDragged = List.current.childNodes[s]; 

             }


        });



        const AfterElement = dragAfter(List, event.clientY); 




        if (oneDragged) {

             
                if (!AfterElement) {    

                List.current.appendChild(oneDragged);

            } else {

                
                
                List.current.insertBefore(oneDragged, AfterElement);
             

            }

        } else {


            return;

        }

    }



    const dragAfter = (List, mouseY) => {


        let onesLeft = new Array;


     


        route.forEach(((section, s) => {


            if (!List.current.childNodes[s]) {

                return;
            }


            if (!List.current.childNodes[s].className.includes("dragged"))


                onesLeft = [...onesLeft, List.current.childNodes[s]];   //eq. onesLeft.push
                



        }));  



        return onesLeft.reduce( (closest, oneLeft)   => {      

            const box = oneLeft.getBoundingClientRect();


            const  offset = mouseY - box.top - box.height / 2;


       
          

            if (offset < 0 && offset > closest.offset) {    

                 


                return { offset: offset, element: oneLeft }


            } else {



                return closest;      
            }


        },


            { offset: Number.NEGATIVE_INFINITY }).element; 

    }

   

    const renderSectionBox = () => {

        

        return (

           route.map((section, key) => {

                return (

                    <Card
                        key={key}
                        className="section draggable"
                        id={section.id}
                        sx={{ mt: 0, mb: 1, mx: 5, p: 3, fontSize: 10 }}
                        draggable={true}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onClick={handleSetID}

                    >
                        
                            <Typography id="AP" variant={"c1"} component="p" >{`${section.from}=>${section.to}`}</Typography>
                            <Typography id="AP" variant={"c2"} component="p" > distance: {section.s}nm </Typography>
                            <Typography id="AP" variant={"c3"} component="p" > time: {section.t} </Typography>
                    
                    </Card>


                );

            })

        )

    }

    return (

        <Box className="route" key={"3"}
            sx={{ my: 0, mx: "auto", height: 400, overflow: "auto" }}
            ref={List}
            onDragOver={handleDragOver}
        >
            {
               renderSectionBox()
            }

        </Box>

    );
}



export default Route;