import { Action, ActionTypes } from '../actions/SPFxActions';
import { State } from './SPFxState';
import { Reducer } from 'redux';

const initState = new State();

//Reducer determines how the state should change after every action.
const SPFxReducer: Reducer<State> = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.UPDATE_TITLE:
      return state.setTitle(action.payload);
    case ActionTypes.GET_LISTITEMS_REQUEST:
      return state.setSelector(action.payload.fiscalYear, action.payload.aggregateMonth);
    case ActionTypes.GET_LISTITEMS_SUCCESS:
      return state.setListItems(action.payload);
    case ActionTypes.GET_LISTITEMS_ERROR:
      return state;
    default: return state;
  }
};

export default SPFxReducer;
