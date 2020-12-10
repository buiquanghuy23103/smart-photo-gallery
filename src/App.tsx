import React from 'react';
import logo from './logo.svg';
import './App.css';
import { title } from 'process';
import Picture from './components/PictureComponent';

type AppProps = {

}

type AppState = {
  title: string;
  shouldShowPicture: boolean
}

class App extends React.Component<AppProps, AppState> {

  state: AppState = {
    title: "This is the title",
    shouldShowPicture: false,
  }

  toggleImageAppearance = () => {
    this.setState({
      shouldShowPicture: !this.state.shouldShowPicture
    })
  }

  render() {
    return (
      <section className="flex justify-center">
        <div className="w-1/2">
          <div className="text-center">
            <div className="my-4"> { this.state.title } </div>
            <button
              className="p-1 bg-blue-700 text-white my-2"
              onClick={this.toggleImageAppearance}
            >
              Toggle image
              </button>
          </div>
        </div>
        <Picture shouldShowPicture={ this.state.shouldShowPicture } />
      </section>
    );
  }

}

export default App;
