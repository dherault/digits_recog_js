import React from 'react';

import config from '../config';

export default class ModeSelector extends React.Component {
  
  render() {
    
    const s_row = {
      display: 'flex',
      minHeight: '3rem',
      alignItems: 'center'
    };
    
    const s_text = {
      lineHeight: '1rem',
      marginRight: '0.5rem'
    };
    
    return <div style={s_row}>
      <span style={s_text}>Mode:</span>
      {
        config.modesList.map((label, i) => <span 
          key={label} 
          className='button -blue -mode'
          onClick={() => this.props.setMode(i)}
          style={{ borderBottom: i === this.props.mode ? '3px solid #3ac569' : 'none' }}
        >
          <span>{ label }</span>
        </span>)
      }
    </div>;
  }
}
