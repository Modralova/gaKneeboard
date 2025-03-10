import { configureStore } from '@reduxjs/toolkit';

import routeReducer from './routeSlice';
import alertReducer from './alertSlice';
import idReducer from './idSlice';
import planeReducer from './planeSlice';
import outputReducer from './outputRouteSlice';
import profileReducer from './profileSlice';
import loginReducer from './loginSlice';
import viewReducer from './viewSlice';
import expaReducer from './LogbookSlice';
import themeReducer from './themeSlice';
import routeNameReducer from './routeNameSlice';

const store = configureStore({

  reducer: {

    alertReducer,
    routeReducer,
    idReducer,
    planeReducer,
    outputReducer,
    profileReducer,
    loginReducer,
    viewReducer,
    expaReducer,
    themeReducer,
    routeNameReducer,

  },

});

export default store;
