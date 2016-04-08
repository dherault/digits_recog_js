import React from 'react';
import { connect } from 'react-redux';

import Canvas from './Canvas';
import ModeSelector from './ModeSelector';
import TrainPanel from './TrainPanel';
import DataViewer from './DataViewer';

import { setMode, addData, clearData } from '../state/actionCreators';


class LandingPage extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      trainingCount: 1,
      trainingOutput: getRandomOutput(),
    };
  }
  
  handleTrain(input) {
    this.props.dispatch(addData({ output: this.state.trainingOutput, input }));
    this.setState({
      trainingOutput: getRandomOutput(),
    });
  }

  render() {
    
    const { mode, data, dispatch } = this.props;
    
    const ph = () => <div>Hello</div>; //placeholder
    const panels = [
      {
        Panel: ph,
        panelProps: {
          
        },
        canvasProps: {
          goAction: () => undefined,
          // leftButtonCaption: '',
          // rightButtonCaption: '',
        },
      },
      {
        Panel: TrainPanel,
        panelProps: {
          trainingOutput: this.state.trainingOutput,
        },
        canvasProps: {
          goAction: this.handleTrain.bind(this),
          clearOnGo: true,
          rightButtonCaption: 'Train!',
        },
      },
      {
        Panel: ph,
        props: {
          goAction: () => undefined,
          // leftButtonCaption: '',
          // rightButtonCaption: '',
        }
      },
    ];
    
    const { Panel, panelProps, canvasProps } = panels[mode];
    
    return <div>
      <header>
        <h1>JavaScript Digits Recognition</h1>
      </header>
      
      <main>
        <div>
          <ModeSelector mode={mode} setMode={mode => dispatch(setMode({ mode }))} />
          { React.createElement(Panel, panelProps) }
        </div>
        { React.createElement(Canvas, canvasProps) }
        <DataViewer data={data} clearData={() => dispatch(clearData())}/>
      </main>
    </div>;
  }
}

const mapStateToProps = s => ({ 
  mode: s.mode,
  data: s.data,
});

function getRandomOutput() {
  return Math.floor(Math.random() * 10) ;
}

export default connect(mapStateToProps)(LandingPage);

