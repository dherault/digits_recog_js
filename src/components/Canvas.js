import React from 'react';
import config from '../config';

const { canvasSize } = config;

export default class Canvas extends React.Component{
  
  constructor() {
    super();
    this.state = {
      mouseDown: false
    };
    
    // Pixel state: [white/black, not_hovered/hovered]
    // a matrix-based (array of arrays) state is too costly, we use a map
    const initialState = [false, false];
    for (let i = 0; i < canvasSize; i++) {
      for (let j = 0; j < canvasSize; j++) {
        this.state[`${i}_${j}`] = initialState;
      }
    }
  }
  
  handlePixelClick(i, j) {
    // No matrix === no need for another deep copy
    const key = `${i}_${j}`;
    const [isBlack, isHovered] = this.state[key];
    this.setState({
      [key]: [!isBlack, isHovered]
    });
  }
  
  handlePixelHover(i, j, isEnter) {
    const key = `${i}_${j}`;
    this.setState({
      [key]: [this.state[key][0], isEnter]
    });
  }
  
  render() {
    
    const pixelsRows = [];
    
    const s_main = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };
    
    const s_row = {
      width: 'auto',
      display: 'flex',
      flexDirection: 'row',
    };
    
    
    for (let i = 0; i < canvasSize; i++) {
      const pixels = [];
      
      for (let j = 0; j < canvasSize; j++) {
        const [isBlack, isHovered] = this.state[`${i}_${j}`];
        
        pixels.push(<div 
          key={j}
          onClick={this.handlePixelClick.bind(this, i, j)}
          onMouseEnter={this.handlePixelHover.bind(this, i, j, true)}
          onMouseOut={this.handlePixelHover.bind(this, i, j, false)}
          style={{
            borderStyle: 'solid',
            borderWidth: `${i ? '0' : '1px'} 1px 1px ${j ? '0' : '1px'} `,
            background: isHovered ? '#333' : isBlack ? '#000' : '#fff',
            width: '1vw',
            height: '1vw',
          }} 
        ></div>);
      }
      
      pixelsRows.push(<div key={i} style={s_row}>{ pixels }</div>);
    }
    
    return <div style={s_main}>{ pixelsRows }
      
    </div>;
  }
} 
