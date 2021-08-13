import reducerApp from '../reducers/reducers'
import { createStore } from 'redux';

const store = createStore(reducerApp);

export default store