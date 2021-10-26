import React, {Component} from 'react'
import './App.css';
//import TaskPage from './components/taskPage';
import RedirectingFile from './components/redirectingFile';
/*import LoginFrame from './components/loginFrame';*/
/*import MainModulePage from './components/mainModulesPage';*/

class App extends Component {
  render(){
    return (
      <div className="App">
        <RedirectingFile/>
      </div>
    );
  }
}

export default App;
