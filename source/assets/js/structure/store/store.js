export const createTitleReducer = (state = { title: null }, action ) => {
  switch(action.type) {
    case 'LOAD_GREET':
      return { title: action.title };
    default:
      return state;
  }
};

export const titleAction = (title) => ({ type: 'LOAD_GREET', title });
