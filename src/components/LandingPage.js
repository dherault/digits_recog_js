import React from 'react';
import Canvas from './Canvas';

class LandingPage extends React.Component {

  render() {
    
    return <div>
      <header>
        <h1>JavaScript Digits Recognition</h1>
      </header>
      
      <main>
        <Canvas />
      </main>
    </div>;
  }
}

export default LandingPage;

