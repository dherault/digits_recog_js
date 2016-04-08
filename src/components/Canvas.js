import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      mouseDown: false,
    };
    
    const neighbors = {};
    const z = canvasSize - 1;
    
    // Pixel state === intensity
    // a matrix-based (array of arrays) state is too costly, we use a map
    for (let x = 0; x < canvasSize; x++) {
      for (let y = 0; y < canvasSize; y++) {
        
        const key = `${x}_${y}`;
        const x0 = x > 0;
        const y0 = y > 0;
        const xz = x < z;
        const yz = y < z;
        const localNeighbors = {};
        
        // Antialiasing gradients
        if (x0) localNeighbors[`${x - 1}_${y}`] = 64; // top
        if (yz) localNeighbors[`${x}_${y + 1}`] = 64; // right
        if (xz) localNeighbors[`${x + 1}_${y}`] = 64; // bottom
        if (y0) localNeighbors[`${x}_${y - 1}`] = 64; // left
        if (x0 && yz) localNeighbors[`${x - 1}_${y + 1}`] = 32; // top-right
        if (xz && yz) localNeighbors[`${x + 1}_${y + 1}`] = 32; // bottom-right
        if (xz && y0) localNeighbors[`${x + 1}_${y - 1}`] = 32; // bottom-left
        if (x0 && y0) localNeighbors[`${x - 1}_${y - 1}`] = 32; // top-left
        
        neighbors[key] = localNeighbors;
        this.state[`${x}_${y}`] = 0; // White at start
      }
    }
    
    this.state.neighbors = neighbors;
  }
  
  handleClick(mouseDown) {
    this.setState({ mouseDown });
  }
  
  handlePixelClick(x, y) {
    const key = `${x}_${y}`;
    const neighbors = this.state.neighbors[key];
    const newState = {
      [key]: 255
    };
    
    for (let k in neighbors) {
      newState[k] = Math.min(255, this.state[k] + neighbors[k]);
    }
    
    this.setState(newState);
  }
  
  handlePixelHover(x, y) {
    if (this.state.mouseDown) this.handlePixelClick(x, y);
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
  
  handleGo() {
    const data = [];
    for (let x = 0; x < canvasSize; x++) {
      for (let y = 0; y < canvasSize; y++) {
        data.push(this.state[`${x}_${y}`]);
      }
    }
    this.props.goAction(data);
    if (this.props.clearOnGo) this.handleReset();
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
      width: canvasSize + 'rem',
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
    
    return <div style={s_main}
      onMouseUp={this.handleClick.bind(this, false)}
      onMouseDown={this.handleClick.bind(this, true)}
    >
      <div style={s_canvas}  children={pixelsRows} />
      <div style={s_buttons}>
        <div className='button -red -rounded -canvas' onClick={this.handleReset.bind(this)}>
          <span>Reset</span>
        </div>
        <div className='button -blue -rounded -canvas' onClick={this.handleGo.bind(this)}>
          <span>{ this.props.rightButtonCaption || 'Go!' }</span>
        </div>
      </div>
    </div>;
  }
}

class Pixel extends React.Component {
  
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      hovered: false
    };
  }
  
  handleHover(hovered) {
    this.setState({ hovered });
    if (hovered) this.props.onHover();
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
