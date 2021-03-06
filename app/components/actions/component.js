
//component
export const COMPONENT_CREATE_REQUEST = 'COMPONENT_CREATE_REQUEST';
export const COMPONENT_CREATE_SUCCESS = 'COMPONENT_CREATE_SUCCESS';
export const COMPONENT_CREATE_ERROR = 'COMPONENT_CREATE_ERROR';

export const COMPONENT_RETRIEVE_REQUEST = 'COMPONENT_RETRIEVE_REQUEST';
export const COMPONENT_RETRIEVE_SUCCESS = 'COMPONENT_RETRIEVE_SUCCESS';
export const COMPONENT_RETRIEVE_ERROR = 'COMPONENT_RETRIEVE_ERROR';

export const COMPONENT_UPDATE_REQUEST = 'COMPONENT_UPDATE_REQUEST';
export const COMPONENT_UPDATE_SUCCESS = 'COMPONENT_UPDATE_SUCCESS';
export const COMPONENT_UPDATE_ERROR = 'COMPONENT_UPDATE_ERROR';

export const COMPONENT_DELETE_REQUEST = 'COMPONENT_DELETE_REQUEST';
export const COMPONENT_DELETE_SUCCESS = 'COMPONENT_DELETE_SUCCESS';
export const COMPONENT_DELETE_ERROR = 'COMPONENT_DELETE_ERROR';

//gallery
export const GALLERY_CREATE_REQUEST = 'GALLERY_CREATE_REQUEST';
export const GALLERY_CREATE_SUCCESS = 'GALLERY_CREATE_SUCCESS';
export const GALLERY_CREATE_ERROR = 'GALLERY_CREATE_ERROR';

export const GALLERY_RETRIEVE_REQUEST = 'GALLERY_RETRIEVE_REQUEST';
export const GALLERY_RETRIEVE_SUCCESS = 'GALLERY_RETRIEVE_SUCCESS';
export const GALLERY_RETRIEVE_ERROR = 'GALLERY_RETRIEVE_ERROR';

export const GALLERY_UPDATE_REQUEST = 'GALLERY_UPDATE_REQUEST';
export const GALLERY_UPDATE_SUCCESS = 'GALLERY_UPDATE_SUCCESS';
export const GALLERY_UPDATE_ERROR = 'GALLERY_UPDATE_ERROR';

export const GALLERY_DELETE_REQUEST = 'GALLERY_DELETE_REQUEST';
export const GALLERY_DELETE_SUCCESS = 'GALLERY_DELETE_SUCCESS';
export const GALLERY_DELETE_ERROR = 'GALLERY_DELETE_ERROR';

//project
export const PROJECT_CREATE_REQUEST = 'PROJECT_CREATE_REQUEST';
export const PROJECT_CREATE_SUCCESS = 'PROJECT_CREATE_SUCCESS';
export const PROJECT_CREATE_ERROR = 'PROJECT_CREATE_ERROR';

export const PROJECT_RETRIEVE_REQUEST = 'PROJECT_RETRIEVE_REQUEST';
export const PROJECT_RETRIEVE_SUCCESS = 'PROJECT_RETRIEVE_SUCCESS';
export const PROJECT_RETRIEVE_ERROR = 'PROJECT_RETRIEVE_ERROR';

export const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST';
export const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
export const PROJECT_UPDATE_ERROR = 'PROJECT_UPDATE_ERROR';

export const PROJECT_DELETE_REQUEST = 'PROJECT_DELETE_REQUEST';
export const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
export const PROJECT_DELETE_ERROR = 'PROJECT_DELETE_ERROR';






export function newCompoent(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
  };
}