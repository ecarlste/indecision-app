class IndicisionApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Indicision</h1>
        <h2>Put your life in the hands of a computer</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <ol>
        <Option title="Item One" />
        <Option title="Item Two" />
      </ol>
    );
  }
}

class Option extends React.Component {
  render() {
    return <li>{this.props.title}</li>;
  }
}

class AddOption extends React.Component {
  render() {
    return (
      <form>
        <input />
        <button>Add Option</button>
      </form>
    );
  }
}

ReactDOM.render(<IndicisionApp />, document.getElementById('app'));
