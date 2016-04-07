import React from 'react';
import config from '../config';

const { canvasSize } = config;
const mapRelativeIntensityToColor = [
  '#fff',
  '#eee',
  '#ddd',
  '#ccc',
  '#bbb',
  '#aaa',
  '#999',
  '#888',
  '#777',
  '#666',
  '#555',
  '#444',
  '#333',
  '#222',
  '#111',
  '#000',
];

export default class Canvas extends React.Component{
  
  constructor() {
    super();
    this.state = {
      mouseDown: false,
      erase: false,
    };
    
    // Pixel state: [white/black, not_hovered/hovered]
    // a matrix-based (array of arrays) state is too costly, we use a map
    for (let x = 0; x < canvasSize; x++) {
      for (let y = 0; y < canvasSize; y++) {
        this.state[`${x}_${y}`] = 0;
      }
    }
  }
  
  handleClick(mouseDown) {
    this.setState({ mouseDown });
  }
  
  handlePixelClick(x, y) {
    
    const key = `${x}_${y}`;
    const { erase } = this.state;
    
    const z = canvasSize - 1;
    const x0 = x > 0;
    const y0 = y > 0;
    const xz = x < z;
    const yz = y < z;
    
    const nearNeighbors = [
      x0 ? `${x - 1}_${y}` : undefined, // top
      yz ? `${x}_${y + 1}` : undefined, // right
      xz ? `${x + 1}_${y}` : undefined, // bottom
      y0 ? `${x}_${y - 1}` : undefined, // left
    ].filter(item => item)
    .map(key => ({
      [key]: cap(this.state[key] + (erase ? -1 : 1) * 255 / 3)
    }));
    
    const farNeighbors = [
      x0 && yz ? `${x - 1}_${y + 1}` : undefined, // top-right
      xz && yz ? `${x + 1}_${y + 1}` : undefined, // bottom-right
      xz && y0 ? `${x + 1}_${y - 1}` : undefined, // bottom-left
      x0 && y0 ? `${x - 1}_${y - 1}` : undefined, // top-left
    ].filter(item => item)
    .map(key => ({
      [key]: cap(this.state[key] + (erase ? -1 : 1) * 255 / 6)
    }));
    
    this.setState(Object.assign({
      [key]: erase ? 0 : 255
    }, ...nearNeighbors.concat(farNeighbors)));
  }
  
  handlePixelHover(x, y) {
    if (!this.state.mouseDown) return;
    this.handlePixelClick(x, y);
  }
  
  handleReset() {
    const newState = {};
    for (let x = 0; x < canvasSize; x++) {
      for (let y = 0; y < canvasSize; y++) {
        newState[`${x}_${y}`] = 0;
      }
    }
    
    this.setState(newState);
  }
  
  render() {
    
    const pixelsRows = [];
    
    const s_main = {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      userSelect: 'none',
      msUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
    };
    
    const s_canvas = {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      border: '1px solid black',
      cursor: 'pointer',
    };
    
    const s_row = {
      width: 'auto',
      display: 'flex',
      flexDirection: 'row',
    };
    
    const s_buttons = {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    };
    
    for (let x = 0; x < canvasSize; x++) {
      const pixels = [];
      
      for (let y = 0; y < canvasSize; y++) {
        
        pixels.push(<Pixel 
          key = {y}
          intensity = {this.state[`${x}_${y}`]}
          onClick = {this.handlePixelClick.bind(this, x, y)}
          onHover = {this.handlePixelHover.bind(this, x, y)}
        />);
      }
      
      pixelsRows.push(<div key={x} style={s_row}>{ pixels }</div>);
    }
    
    return <div style={s_main}>
      <div 
        style = {s_canvas} 
        onMouseDown = {this.handleClick.bind(this, true)}
        onMouseUp = {this.handleClick.bind(this, false)}
        children = {pixelsRows}
      />
      <div style = {s_buttons}>
        <div 
          onClick = {this.handleReset.bind(this)}
          className='button -blue'
        >
          Go!
        </div>
        <div 
          onClick = {this.handleReset.bind(this)}
          className='button -red'
        >
          Reset
        </div>
      </div>
      
    </div>;
  }
}

class Pixel extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      hovered: false
    };
  }
  
  handleHover(hovered) {
    this.setState({ hovered });
    this.props.onHover();
  }
  
  render() {
    
    const { intensity } = this.props;
    
    return <div
      style={{
        width: '1rem',
        height: '1rem',
        userSelect: 'none',
        msUserSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        background: this.state.hovered ? '#2b90d9' : mapRelativeIntensityToColor[Math.floor(intensity / 16)],
      }}
      onMouseEnter = {this.handleHover.bind(this, true)}
      onMouseLeave = {this.handleHover.bind(this, false)}
      onMouseDown  = {this.props.onClick}
    />;
  }
}

function cap(n) {
  return Math.min(255, Math.max(n, 0));
}
