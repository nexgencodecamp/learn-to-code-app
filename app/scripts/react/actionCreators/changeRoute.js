export default {
  // when user switches between adding lead/contact
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
