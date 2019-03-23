import React from 'react';
import Modal from 'react-modal';

class OptionModal extends React.Component {
  componentWillMount() {
    if (this.props.appElementId) {
      Modal.setAppElement(`#${this.props.appElementId}`);
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.selectedOption}
        contentLabel="Selected Option"
        onRequestClose={this.props.handleClearSelectedOption}
        closeTimeoutMS={200}
        className="modal"
      >
        <h3 className="modal__title">OptionModal</h3>
        {this.props.selectedOption && <p className="modal__body">{this.props.selectedOption}</p>}
        <button className="button" onClick={this.props.handleClearSelectedOption}>
          Okay
        </button>
      </Modal>
    );
  }
}

export default OptionModal;
