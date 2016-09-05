export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'COMPLETE_SECTION':
      return getNewStateAfterCompletingSection(state, action);
    default:
      return state;
  }
}

function getNewStateAfterCompletingSection(state, action) {
  const newState = Object.assign({}, state);
  const relevantCourse = newState[action.value.course];
  relevantCourse[action.value.section].isComplete = true;
  return newState;
}
