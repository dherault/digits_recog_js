import React from 'react';

export default class TrainPanel extends React.Component {
  
  render() {
    
    const s_lead = {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginTop: '2rem',
    };
    
    return <div>
      <h3>Training mode</h3>
      <div>
        Here you can train the neural network by teaching it more examples.
        Draw what is asked bellow and press "Train"!
      </div>
      <div style={s_lead}>
        Give me a { this.props.output }
      </div>
    </div>;
  }
}
