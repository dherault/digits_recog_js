export const log = createLogger({
  prefix: '...',
  text: 'Gray',
  background: 'White',
});
export const logWarning = createLogger({
  prefix: '!!!',
  text: 'White',
  background: 'Crimson',
});
export const logStart = createLogger({
  prefix: '.:!',
  text: 'White',
  background: 'Chartreuse',
});
// export const logFetch = createLogger({
//   prefix: '+++',
//   text: 'White',
//   background: 'LightPink',
// });
export const logWebsocket = createLogger({
  prefix: '_w_',
  text: 'White',
  background: 'DarkSlateGray',
});
export const logReducer = createLogger({
  prefix: '.R.',
  text: 'White',
  background: 'SkyBlue',
});
export const logAction = createLogger({
  prefix: '.A.',
  text: 'White',
  background: 'YellowGreen',
});
export const logSideEffect = createLogger({
  prefix: '.E.',
  text: 'White',
  background: 'Gold',
});

export function logError(message, error) {
  logWarning(message);
  console.log(error.stack || error);
}

function createLogger({ prefix, text, background }) {
  
  [prefix, text, background].forEach(x => {
    if (typeof x !== 'string') throw new Error('createLogger: args must be strings');
  });
  
  const x = [`%c${prefix}`, `color:${text};background:${background};`];
  return (...y) => console.log(...x, ...y);
}
