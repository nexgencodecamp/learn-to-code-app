/**
@param  {Object}  state  The state prior to reduction
@param  {Object}  action  The reducer action
@return  {Object}  The state after reducer operations
*/
export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, action.value);
    case 'UPDATE_FIRST_NAME':
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
}
