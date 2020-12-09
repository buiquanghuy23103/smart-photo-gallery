import React from 'react';
import logo from './logo.svg';
import './App.css';
import { title } from 'process';

type AppProps = {

}

type AppState = {
  title: string
}

class App extends React.Component<AppProps, AppState> {

  state: AppState = {
    title: "This is the title"
  }

  render() {
    return (
      <div className="bg-gray-600 text-white p-5 border">{ this.state.title }</div>
    );
  }

}

export default App;
