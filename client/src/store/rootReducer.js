import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";
import cardReducer from "./reducers/cardReducer";
import chatReducer from "./reducers/chatReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducers = {
  home: homeReducer,
  auth: authReducer,
  card: cardReducer,
  chat: chatReducer,
  dashboard: dashboardReducer,
  order: orderReducer,
};
export default rootReducers;
