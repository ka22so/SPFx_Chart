import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, ISPFxProps, IState } from '../state/SPFxState';
import App from '../components/SpfxChart';
import * as Actions from '../actions/SPFxActions';
import { SPHttpClient } from '@microsoft/sp-http';

import { getListItems } from '../api/getListItems';

export interface IConnectedDispatch {
  updateTitle: (title: string) => void;
  getListItems: (spHttpClient: SPHttpClient, currentWebUrl: string, listName: string, fiscalYear: string, aggregateMonth: string) => void;
}
export type ISPFxType = ISPFxProps & IConnectedDispatch & IState;

//Map the application state to the properties of the Components. Making them available in this.props inside the component.
export function mapStateToProps(state: State, ownProps: ISPFxProps): IState {
  return {
    title: state.title,
    listItems: state.listItems,
    fiscalYear: state.fiscalYear,
    aggregateMonth: state.aggregateMonth
  };
}

//Map the actions to the properties of the Component. Making them available in this.props inside the component.
export const mapDispatchToProps = (dispatch: Dispatch<State>): IConnectedDispatch => ({
  updateTitle: (title: string) => {
    dispatch(Actions.updateTitle(title));
  },
  getListItems: (spHttpClient: SPHttpClient, currentWebUrl: string, listName: string, fiscalYear: string, aggregateMonth: string) => {
    dispatch(getListItems(spHttpClient, currentWebUrl, listName, fiscalYear, aggregateMonth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
