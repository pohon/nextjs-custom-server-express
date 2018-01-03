import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { confirmable } from 'react-confirm';
import PropTypes from 'prop-types';

class Alert extends Component {
  render() {
    const {
      okLabel = 'OK',
      title,
      message,
      show,
      proceed,
      dismiss,
      enableEscape = true,
    } = this.props;

    return (
      <div className="static-modal">
        <Modal show={show} onHide={proceed} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={proceed}>{okLabel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Alert.propTypes = {
  okLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when OK button is clicked.
  dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool,
}

export default confirmable(Alert);