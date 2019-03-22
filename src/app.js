class IndicisionApp extends React.Component {
  static defaultProps = { options: [] };
  state = { options: this.props.options };

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
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

    this.setState(prevState => ({
      options: [...prevState.options, option]
    }));
  }

  componentDidMount = () => {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { options } = this.state;

    if (prevState.options.length !== options.length) {
      const json = JSON.stringify(options);
      localStorage.setItem('options', json);
    }
  };

  render() {
    return (
      <div>
        <Header subtitle="Put your life in the hands of a computer" />
        <Action hasOptions={this.state.options.length > 0} onClick={() => this.handlePick()} />
        <Options
          options={this.state.options}
          handleDeleteOptions={() => this.handleDeleteOptions()}
          handleDeleteOption={o => this.handleDeleteOption(o)}
        />
        <AddOption onAddOption={o => this.handleAddOption(o)} />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indicision'
};

const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.onClick}>
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.map(option => (
        <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption} />
      ))}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={e => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};

class AddOption extends React.Component {
  state = { error: undefined };

  handleAddOption(event) {
    event.preventDefault();

    const option = event.target.elements.option.value.trim();
    const error = this.props.onAddOption(option);

    this.setState(() => ({ error }));
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
