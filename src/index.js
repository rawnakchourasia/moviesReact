import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./reducers";

// THIS IS THE CURRIED FORM OF function logger(obj, next, action)
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       // MIDDLEWARE CODES
//       console.log("ACTION_TYPE = ", action.type);
//       next(action);
//     };
//   };
// };

// THE ABOVE FUNCTION CAN ALSO BE WRITTEN AS ..
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    // console.log("ACTION_TYPE = ", action.type);
    if (typeof action !== "function") {
      console.log("ACTION_TYPE = ", action.type);
    }
    next(action);
  };

// THUNK IS BASICALLY A FUNCTION RETURNED BY ACTION WITH DISPATCH AS PARAMETER
// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       action(dispatch);
//       return;
//     }
//     next(action);
//   };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log("store", store);
// console.log('BEFORE STATE',store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{name:'Superman'}]
// })

// console.log('AFTER STATE',store.getState());

// export const StoreContext = createContext();

// console.log("StoreContext", StoreContext);

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

//This is Connect function
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//           <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//         ); //Here we are spreading properties like - {movies:movies, search:search}
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
