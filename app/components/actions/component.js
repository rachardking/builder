export const NEW_COMPONENT_REQUEST = 'NEW_COMPONENT_REQUEST';
export const NEW_COMPONENT_SUCCESS = 'NEW_COMPONENT_SUCCESS';
export const NEW_COMPONENT_ERROR = 'NEW_COMPONENT_ERROR';

export const DELETE_COMPONENT = 'DELETE_COMPONENT';
export const EDIT_COMPONENT = 'EDIT_COMPONENT';
export const SAVE_COMPONENT = 'SAVE_COMPONENT';



export function newCompoent(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
  };
}