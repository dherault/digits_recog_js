import isPlainObject from 'lodash.isplainobject';
import { logAction } from '../logger';

// An action creator takes a plain object as input (params) 
// and outputs a redux-style action ({ params, type });

export const setMode = createSyncActionCreator('setMode');
export const addData = createSyncActionCreator('addData');
export const clearData = createSyncActionCreator('clearData');


/* Utilities */

// Reduces boilerplate, ensures logging and validates params
function createSyncActionCreator(intention) {
  const type = createTypeFromIntention(intention);
  
  return (params={}) => {
    logAction(intention, params);
    validateParams(params);
    
    return { type, params };
  };
}

// doSomeStuff --> DO_SOME_STUFF
// An action has one intention (camel-cased), but can have multiple types (caps, _-separated)
function createTypeFromIntention(intention, prefix) {
  return `${prefix ? prefix + '_' :  ''}${intention.replace(/[A-Z]/g, '_$&')}`.toUpperCase();
}

function validateParams(params) {
  if (!isPlainObject(params)) throw new Error('In action: params must be a plain object!');
}
