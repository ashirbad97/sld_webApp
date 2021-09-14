import React, {Component} from 'react'
import './App.css';
/*import LoginFrame from './components/loginFrame';*/
import MainModulePage from './components/mainModulesPage';

class App extends Component {
  render(){
    return (
      <div className="App">
        <MainModulePage/>
      </div>
    );
  }
}

export default App;
