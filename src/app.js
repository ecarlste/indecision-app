class IndicisionApp extends React.Component {
  state = { options: ['One', 'Two', 'Three'] };

  onAddOption(option) {
    this.setState({ options: [...this.state.options, option] });
  }

  render() {
    return (
      <div>
        <Header title="Indicision" subtitle="Put your life in the hands of a computer" />
        <Action />
        <Options options={this.state.options} />
        <AddOption onAddOption={o => this.onAddOption(o)} />
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
  handlePick() {
    alert('handle pick');
  }

  render() {
    return (
      <div>
        <button>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  handleRemoveAll() {
    alert('removed all options');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        {this.props.options.map(option => {
          console.log(option);
          return <Option key={option} optionText={option} />;
        })}
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
  handleAddOption(event) {
    event.preventDefault();

    const option = event.target.elements.option.value.trim();
    if (option) {
      this.props.onAddOption(option);
      event.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleAddOption(e)}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    );
  }
}

ReactDOM.render(<IndicisionApp />, document.getElementById('app'));
