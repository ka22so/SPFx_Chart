import * as Immutable from 'immutable';
import { Store } from 'redux';
import { SPHttpClient } from '@microsoft/sp-http';

export interface ISPFxProps {
  store: Store<State>;
  description: string;
  spHttpClient: SPHttpClient;
  currentWebUrl: string;
  displayName: string;
  loginName: string;
}

export interface IState {
  title: string;
  listItems: any[];
  fiscalYear: string;
  aggregateMonth: string;
}

const now = new Date();
const _returnFiscalYear = (now): string => {
  const adujstNum = (now.getMonth() < 5) ? 5 : 4;
  return (now.getFullYear() + adujstNum).toString().substr(2, 2);
}

export const initialState: IState = {
  title: "AssignManagement",
  listItems: [],
  fiscalYear: _returnFiscalYear(now),
  aggregateMonth: (now.getMonth() + 1).toString()
};

//Immutable State.
export class State extends Immutable.Record(initialState) implements IState {

  //Getters
  public readonly title: string;
  public readonly listItems: any[];
  public readonly fiscalYear: string;
  public readonly aggregateMonth: string;

  //Setters
  public setTitle(newTitle: string): State {
    return this.set("title", newTitle) as State;
  }

  public setSelector(fiscalYear: string, aggregateMonth: string): State {
    return this.set("fiscalYear", fiscalYear)
      .set("aggregateMonth", aggregateMonth) as State;
  }

  public setListItems(items: any[]): State {
    return this.set("listItems", items) as State;
  }
}
