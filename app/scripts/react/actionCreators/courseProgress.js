export default {
  // when user switches between adding lead/contact
  completeSection(course, section) {
    return {
      type: 'COMPLETE_SECTION',
      value: {
        course,
        section
      }
    };
  }
};
