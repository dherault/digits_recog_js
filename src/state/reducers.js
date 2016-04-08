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
  
  examples: (state=[], action) => {
    switch (action.type) {
      case 'ADD_EXAMPLE':
        return [...state, action.params];
        
      case 'REMOVE_EXAMPLE':
        return [...state.slice(0, action.params.index), ...state.slice(action.params.index + 1, state.length)];
        
      case 'CLEAR_EXAMPLES':
        return [];
      
      default:
        return state;
    }
  },
  
  // Used for side-effects and logging
  records: (state=[], action) => [...state, Object.assign({ date: new Date().getTime() }, action)],
};
