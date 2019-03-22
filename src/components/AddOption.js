import React from 'react';

class AddOption extends React.Component {
  state = { error: undefined };

  handleAddOption(event) {
    event.preventDefault();

    const option = event.target.elements.option.value.trim();
    const error = this.props.onAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      event.target.elements.option.value = '';
    }
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

export default AddOption;
