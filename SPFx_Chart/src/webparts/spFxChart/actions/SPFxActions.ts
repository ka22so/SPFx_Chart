export enum ActionTypes {
  UPDATE_TITLE,
  GET_LISTITEMS_REQUEST,
  GET_LISTITEMS_SUCCESS,
  GET_LISTITEMS_ERROR
}

export type Action =
  { type: ActionTypes.UPDATE_TITLE, payload: string } |
  { type: ActionTypes.GET_LISTITEMS_REQUEST, payload: {fiscalYear, aggregateMonth} } |
  { type: ActionTypes.GET_LISTITEMS_SUCCESS, payload: string[] } |
  { type: ActionTypes.GET_LISTITEMS_ERROR, payload: string };


//Action Creators to create and return Actions
export const updateTitle = (title: string): Action => ({
  type: ActionTypes.UPDATE_TITLE,
  payload: title
});

//Each AJAX request ideally has 3 actions: request, success and error.
//Actions for getLibraryItems
export const getListItemsRequest = (fiscalYear: string, aggregateMonth: string): Action => ({
  type: ActionTypes.GET_LISTITEMS_REQUEST,
  payload: {
    fiscalYear: fiscalYear,
    aggregateMonth: aggregateMonth
  }
});
export const getListItemsSuccess = (lists: string[]): Action => ({
  type: ActionTypes.GET_LISTITEMS_SUCCESS,
  payload: lists
});
export const getListItemsError = (error: Error): Action => ({
  type: ActionTypes.GET_LISTITEMS_ERROR,
  payload: error.message
});

