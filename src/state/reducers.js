export default {
  
  // Used for side-effects and logging
  records: (state=[], action) => [...state, Object.assign({ date: new Date().getTime() }, action)],
};
