import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';

import userSlice from './features/UserSlice';
import applicationSlice from './features/ApplicationSlice';
import questionSlice from './features/QuestionSlice';
import pengaduanSlice from './features/PengaduanSlice';
import articleSlice from './features/ArticleSlice';


// ==============================|| COMBINE REDUCER ||============================== //

const RootReducer = combineReducers({
  customization: customizationReducer,
  user: userSlice.reducer,
  aplikasi: applicationSlice.reducer,
  article: articleSlice.reducer,
  question: questionSlice.reducer,
  pengaduan: pengaduanSlice.reducer
});

export default RootReducer;
