import React from 'react';

export default class ViewPanel extends React.Component {
  
  render() {
    
    const { index, output, removeExample } = this.props;
    
    const s_lead = {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginTop: '2rem',
    };
    
    const s_buttons = {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    };
    
    return <div>
      <h3>View training set</h3>
      <div>
        Here you can have a look at every example and check its quality.
      </div>
      
      {
        typeof output !== 'undefined' ? 
        <div>
          Example n° { index + 1 }
          <div style={s_lead}>
            Supposed to be a { output }
          </div>
          <div style={s_buttons}>
            <div className='button -red -rounded -canvas' onClick={removeExample}>
              <span>Remove</span>
            </div>
          </div>
        </div> :
        <div>No Data to visualize yet.</div>
      }
    </div>;
  }
}
