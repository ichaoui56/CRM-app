// import { createStore, combineReducers } from 'redux'
// import Mode from './setting/setting'
// export default createStore(
//     combineReducers({
//         mode: Mode
//     })
// )

import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './setting/reducers';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    auth: authReducer
  },
});
