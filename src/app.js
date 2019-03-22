class IndicisionApp extends React.Component {
  state = { options: ['One', 'Two', 'Three'] };

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }

  handlePick() {
    const optionNumber = Math.floor(Math.random() * this.state.options.length);

    alert(this.state.options[optionNumber]);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    }

    if (this.state.options.indexOf(option) >= 0) {
      return 'This option already exists';
    }

    this.setState(prevState => {
      return {
        options: [...prevState.options, option]
      };
    });
  }

  render() {
    return (
      <div>
        <Header title="Indicision" subtitle="Put your life in the hands of a computer" />
        <Action hasOptions={this.state.options.length > 0} onClick={() => this.handlePick()} />
        <Options
          options={this.state.options}
          handleDeleteOptions={() => this.handleDeleteOptions()}
        />
        <AddOption onAddOption={o => this.handleAddOption(o)} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button disabled={!this.props.hasOptions} onClick={this.props.onClick}>
          What should I do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <p>{this.props.optionText}</p>;
  }
}

class AddOption extends React.Component {
  state = { error: undefined };

  handleAddOption(event) {
    event.preventDefault();

    const option = event.target.elements.option.value.trim();
    const error = this.props.onAddOption(option);

    this.setState(() => {
      return { error };
    });
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={e => this.handleAddOption(e)}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndicisionApp />, document.getElementById('app'));
