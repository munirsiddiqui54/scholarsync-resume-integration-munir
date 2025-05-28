// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';
import scholarReducer from './scholarSlice';
import projectReducer from './projectSlice';

const store = configureStore({
  reducer: {
    resume: resumeReducer,
    scholar: scholarReducer,
    projects: projectReducer,
  },
});

export default store;
