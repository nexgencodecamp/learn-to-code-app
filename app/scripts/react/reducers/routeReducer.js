export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'START_COURSE':
      return Object.assign({}, state, {
        route: 'startCourse',
        routeParams: [action.value]
      });
    case 'CHANGE_ROUTE':
      return Object.assign({}, state, {
        route: action.value.route,
        routeParams: action.value.routeParams
      });
    default:
      return state;
  }
}
