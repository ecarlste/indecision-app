import React from 'react';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

class IndicisionApp extends React.Component {
  static defaultProps = {
    options: [],
    selectedOption: undefined,
    appElementId: 'app'
  };
  state = {
    options: this.props.options,
    selectedOption: this.props.selectedOption
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  };

  handlePick = () => {
    const optionNumber = Math.floor(Math.random() * this.state.options.length);
    const selectedOption = this.state.options[optionNumber];

    this.setState(() => ({ selectedOption }));
  };

  handleAddOption = option => {
    if (!option) {
      return 'Enter valid value to add item';
    }

    if (this.state.options.indexOf(option) >= 0) {
      return 'This option already exists';
    }

    this.setState(prevState => ({
      options: [...prevState.options, option]
    }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: this.props.selectedOption }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.state;

    if (prevState.options.length !== options.length) {
      const json = JSON.stringify(options);
      localStorage.setItem('options', json);
    }
  }

  render() {
    return (
      <div>
        <Header subtitle="Put your life in the hands of a computer" />
        <div className="container">
          <Action hasOptions={this.state.options.length > 0} onClick={this.handlePick} />
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption onAddOption={this.handleAddOption} />
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
          appElementId={this.props.appElementId}
        />
      </div>
    );
  }
}

export default IndicisionApp;
