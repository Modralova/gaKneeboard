import { configureStore } from '@reduxjs/toolkit'

import routeReducer from "./routeSlice";
import alertReducer from "./alertSlice";
import idReducer from './idSlice';
import planeReducer from './planeSlice';
import outputReducer from "./outputRouteSlice";
import profileReducer from "./profileSlice";
import loginReducer from "./loginSlice";
import viewReducer from "./viewSlice";
import expaReducer from "./LogbookSlice";
import themeReducer from "./themeSlice";



const store = configureStore({

    reducer: {

        alertReducer: alertReducer,
        routeReducer: routeReducer,
        idReducer: idReducer,
        planeReducer: planeReducer,
        outputReducer: outputReducer,
        profileReducer: profileReducer,
        loginReducer: loginReducer,
        viewReducer: viewReducer,
        expaReducer: expaReducer,
        themeReducer: themeReducer


    }

})


export default store

