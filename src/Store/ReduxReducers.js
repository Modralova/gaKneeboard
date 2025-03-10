

const initialRouteState = { route: [] };
const initialXLS = { route: [] };
const initialAlerts = { show: false, showQuery: false, message: "", issue: "info", data: {} };
const initialId = {};
const initialPlane = { plane: "" };
const initialRouteName = { routeName: "" };



const setRouteNameR = (routeName) => {

    return {

        type: "SET_ROUTE_NAME",
        routeName: routeName

    }

}


const planeReducer = (state = initialPlane, action) => {


    switch (action.type) {

        case "SET_SIGNS":

            
            return {

                ...state,
                plane: state.plane = action.plane
            }

            break;

        default:

            return state;

    }

};


const setSigns = (plane) => {

    return {

        type: "SET_SIGNS",
        plane: plane

    }

}


const idReducer = (state = initialId, action) => {

    switch (action.type) {


        case "SET_ID":

            return {

                ...state,

                id: state.id = action.id,
                logbookId: state.logbookId = action.logbookId

            }

        default:

            return state;

    }

}


const setId = id => {

    

    return {

        type: "SET_ID",

        id: id

    }

}



const alertReducer = (state = initialAlerts, action) => {

    switch (action.type) {

        case "ALERT_QUERY":

    

            return {

                ...state,

                showQuery: state.showQuery = true,
                issue: state.issue = action.issue,
                message: state.message = action.message,
                data: state.data = action.data

            };

        case "ALERT_RESPONSE":

      

            return {

                ...state,

                showQuery: state.showQuery = false,
                show: state.show = true,
                issue: "success",
                message: state.message = action.message,
                data: state.data = {}
            };

        case "SET_ALERT":

 
            return {

                ...state,

                show: state.show = true,
                message: state.message = action.message,
                issue: state.issue = action.issue,
                data: state.data = action.data

            };

        case "UNSET_ALERT":

            return {

                ...state,


                show: state.show = false,
                showQuery: state.showQuery = false,
                data: state.data = {},
                message: state.message = ""

            };


        default:

            return state;

    }

}


const alertQuery = (props) => {


    return {

        type: "ALERT_QUERY",
        ...props,

    }

}


const alertResponse = (props) => {

    

    return {

        type: "ALERT_RESPONSE",
        ...props

    }
}


const unsetAlert = () => {

    

    return {

        type: "UNSET_ALERT",


    }
}

const setAlert = (props) => {

    return {

        type: "SET_ALERT",

        ...props

    }
}

const xlsReducer = (state = initialXLS, action) => {


    switch (action.type) {


        case "STORE_ROUTE":




            return {
                ...state,

                route: [...action.route]

            };


        default:

            return state;
    }

}


  const storeRoute = (route) => {

        return {


            type: "STORE_ROUTE",

            route: [...route]


        };
    }


const routeReducer = (state = initialRouteState, action) => {


    switch (action.type) {


        case "ADD_SECTION":

            return {

                ...state,

              //  route: [...state.route, { ...action.section }]
                route: [ { ...action.section }, ...state.route,]
                
            };

        case "REMOVE_SECTION":

           
            return {
                ...state,
                route: [...state.route.filter(section => section.id !== action.id)]
            };


        case "UPDATE_SECTION":

           

            let toUpdate = { ...action.data }

            let INDEX = state.route.indexOf(state.route.find(section => section.id === toUpdate.id))


            let newRoute = [...state.route]
            newRoute[INDEX] = toUpdate


            return {
                ...state,
                route: state.route = [...newRoute]
            };


        case "ROUTE_UPDATE":
      

        
            return {
                 ...state,
                 route: state.route = action.route
            };



        case "ROUTE_DELETE":

            return {
                ...state,
                route: state.route = []
            };

        default:

            return state;

    }

}

const addSection = (section) => {

   


    return {
        type: "ADD_SECTION",
        section: { ...section }
    };
};


const removeSection = (id) => {




    return {
        type: "REMOVE_SECTION",
        id: id
    };
};

const updateSection = (data) => {




    return {
        type: "UPDATE_SECTION",
        data: data
    };
};


const routeUpdate = (orderedRoute) => {



    orderedRoute.forEach((slice, i) => console.log("oR: ", i, ": ", slice.id, ", L: ", orderedRoute.length   ));



    return {
        type: "ROUTE_UPDATE",
        route: [...orderedRoute]
    };

};

const routeDelete = () => {




    return {

        type: "ROUTE_DELETE",

    };

};


export {
    routeReducer,
    alertReducer,
    idReducer,
    planeReducer,
    xlsReducer,
    addSection,
    removeSection,
    updateSection,
    routeUpdate,
    routeDelete,
    alertQuery,
    alertResponse,
    unsetAlert,
    setAlert,
    setId,
    setSigns,
    storeRoute,
    setRouteNameR
}