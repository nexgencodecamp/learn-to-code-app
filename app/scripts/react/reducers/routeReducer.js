export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_ROUTE':
      return Object.assign({}, state, {
        route: action.value.route,
        routeParams: action.value.routeParams
      });
    default:
      return state;
  }
}
