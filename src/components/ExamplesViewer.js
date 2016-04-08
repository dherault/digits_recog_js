import React from 'react';
import config from '../config';

export default class ExamplesViewer extends React.Component{
  
  constructor() {
    super();
    
    this.state = {
      json: false,
    };
  }
  
  handleJson() {
    this.setState({
      json: !this.state.json
    });
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.examples.length !== this.props.examples.length) {
      const node = this.refs.scrollable;
      node.scrollTop = node.scrollHeight;
    }
  }
  
  render() {
    
    const json = this.state.json;
    const examples = this.props.examples;
    
    const s_outter = {
      backgroundColor: '#eee',
      overflow: 'scroll',
      whiteSpace: 'nowrap',
      minHeight: config.canvasSize + '.15rem',
      maxHeight: config.canvasSize + '.15rem'
    };
    
    const s_inner = {
      margin: '8px', // no rem? for scroll computation
    };
    
    const s_buttons = {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    };
    
    return <div>
      <div style={s_outter} ref='scrollable'>
        <div style={s_inner}>
        {
          examples.length ? json ?
          examples.map((x, i) => <div key={i}>{ JSON.stringify(x) + ',' }</div>).concat([<div>-</div>]) :
          
          examples.map(({ input, output }, i) => <div key={i}>
            <strong>{ i + 1}</strong>
            <div>Output: { output }</div>
            <div>{ `Input: ${JSON.stringify(input)}` }</div>
          </div>) :
          
          <div>
            <div>No data yet.</div>
            <div>The neural network trainning examples will appear here.</div>
          </div>
        }
        </div>
      </div>
      <div style={s_buttons}>
        <div className='button -red -rounded -canvas' onClick={this.props.clearExamples}>
          <span>Clear all</span>
        </div>
        <div className='button -blue -rounded -canvas' onClick={this.handleJson.bind(this)}>
          <span>{ json ? 'Human' : 'JSON' }</span>
        </div>
      </div>
    </div>;
  }
} 
