import React from 'react';
import { connect } from 'react-redux';

import Canvas from './Canvas';
import ModeSelector from './ModeSelector';
import TrainPanel from './TrainPanel';
import ViewPanel from './ViewPanel';
import ExamplesViewer from './ExamplesViewer';

import { setMode, addExample, clearExamples, removeExample } from '../state/actionCreators';


class LandingPage extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      trainingOutput: getRandomOutput(),
      viewIndex: 0,
    };
  }
  
  handleTrain(input) {
    this.props.dispatch(addExample({ output: this.state.trainingOutput, input }));
    this.setState({
      trainingOutput: getRandomOutput(),
    });
  }
  
  handleView(next) {
    const l = this.props.examples.length - 1;
    let viewIndex = next ? this.state.viewIndex + 1 : this.state.viewIndex - 1;
    
    if (viewIndex < 0) viewIndex = l;
    if (viewIndex > l) viewIndex = 0;
    
    this.setState({ viewIndex });
  }
  
  handleRemove() {
    const l = this.props.examples.length - 2;
    let index = this.state.viewIndex;
    this.props.dispatch(removeExample({ index }));
    
    if (index > l) index = l;
    if (index <= 0) index = 0;
    
    this.setState({ viewIndex: index });
  }

  render() {
    
    const { mode, examples, dispatch } = this.props;
    const { trainingOutput, viewIndex } = this.state;
    const currentViewedExample = examples[viewIndex] || {};
    
    const ph = () => <div>Hello</div>; //placeholder
    const panels = [
      {
        Panel: ph,
        panelProps: {
          
        },
        canvasProps: {
          leftButton: {
            color: 'red',
            caption: 'Reset',
            shouldReset: true,
          },
          rightButton: {
            color: 'blue',
            caption: 'Detect',
            shouldPassInputToAction: true,
          },
        },
      },
      {
        Panel: TrainPanel,
        panelProps: {
          output: trainingOutput,
        },
        canvasProps: {
          leftButton: {
            color: 'red',
            caption: 'Reset',
            shouldReset: true,
          },
          rightButton: {
            color: 'blue',
            caption: 'Train',
            action: this.handleTrain.bind(this),
            shouldReset: true,
            shouldPassInputToAction: true,
          },
        },
      },
      {
        Panel: ViewPanel,
        panelProps: {
          index: viewIndex,
          output: currentViewedExample.output,
          removeExample: this.handleRemove.bind(this),
        },
        canvasProps: {
          input: currentViewedExample.input,
          leftButton: {
            color: 'blue',
            caption: '<<',
            action: this.handleView.bind(this, false),
          },
          rightButton: {
            color: 'blue',
            caption: '>>',
            action: this.handleView.bind(this, true),
          },
        },
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
        <ExamplesViewer examples={examples} clearData={() => dispatch(clearExamples())}/>
      </main>
    </div>;
  }
}

const mapStateToProps = s => ({ 
  mode: s.mode,
  examples: s.examples,
});

function getRandomOutput() {
  return Math.floor(Math.random() * 10) ;
}

export default connect(mapStateToProps)(LandingPage);

