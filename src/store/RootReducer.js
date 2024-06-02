import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userSlice from './features/UserSlice';
import productTypeSlice from './features/ProductTypeSlice';
import productSlice from './features/ProductSlice';
import transactionSlice from './features/TransactionSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const RootReducer = combineReducers({
  customization: customizationReducer,
  user: userSlice.reducer,
  productType: productTypeSlice.reducer,
  product: productSlice.reducer,
  transaction: transactionSlice.reducer
});

export default RootReducer;
