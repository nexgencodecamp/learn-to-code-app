export default {
  changeRoute(route, extraParams) {
    return {
      type: 'CHANGE_ROUTE',
      value: {
        route,
        extraParams
      }
    };
  }
};
