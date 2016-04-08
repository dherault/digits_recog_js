import config from '../config';

export default {
  
  mode: (state=config.defaultMode, action) => {
    switch (action.type) {
      case 'SET_MODE':
        return action.params.mode;
      
      default:
        return state;
    }
  },
  
  data: (state=[], action) => {
    switch (action.type) {
      case 'ADD_DATA':
        return [action.params, ...state];
        
      case 'CLEAR_DATA':
        return [];
      
      default:
        return state;
    }
  },
  
  // Used for side-effects and logging
  records: (state=[], action) => [...state, Object.assign({ date: new Date().getTime() }, action)],
};
