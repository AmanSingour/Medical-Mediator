import { createStore } from 'redux'
import reducers from './modules/reducers'

// persist store code
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  
  const persistedState = loadState();
  

// This persistedState is includedat the time of store creation as initial value
export const store = createStore(reducers,persistedState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
  
  // This is actually call every time when store saved
  store.subscribe(() => {
    saveState(store.getState());
  });

export default store