import React from 'react';
import config from '../config';

export default class DataViewer extends React.Component{
  
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
  
  render() {
    
    const json = this.state.json;
    const data = this.props.data;
    const l = data.length;
    
    const s_outter = {
      backgroundColor: '#eee',
      overflow: 'scroll',
      whiteSpace: 'nowrap',
      minHeight: config.canvasSize + '.15rem',
      maxHeight: config.canvasSize + '.15rem'
    };
    
    const s_inner = {
      margin: '0.5rem',
    };
    
    const s_buttons = {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    };
    
    return <div>
      <div style={s_outter}>
        <div style={s_inner}>
        {
          l ? json ?
          data.map(x => <div>{ JSON.stringify(x) + ',' }</div>).concat([<div>-</div>]) :
          
          data.map(({ input, output }, i) => <div>
            <strong>{ l - i }</strong>
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
        <div className='button -red -rounded -canvas' onClick={this.props.clearData}>
          <span>Clear all</span>
        </div>
        <div className='button -blue -rounded -canvas' onClick={this.handleJson.bind(this)}>
          <span>{ json ? 'Human' : 'JSON' }</span>
        </div>
      </div>
    </div>;
  }
} 
