import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { confirmable } from 'react-confirm';

class Confirm extends Component {
  render() {
    const {
      okLabel = 'OK',
      cancelLabel = 'Cancel',
      title,
      message,
      show,
      proceed,
      dismiss,
      cancel,
      enableEscape = true,
    } = this.props;
    
    return (
      <div className="static-modal">
        <Modal show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={cancel}>{cancelLabel}</Button>
            <Button bsStyle="primary" onClick={proceed}>{okLabel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Confirm.propTypes = {
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func,      // called when cancel button is clicked.
  dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool,
}

export default confirmable(Confirm);
