import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import Loader from '../Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = {
    showSpinner: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    const largeImage = document.querySelector('#largeImage');
    largeImage.addEventListener('load', this.hideSpinner);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    const largeImage = document.querySelector('#largeImage');
    largeImage.removeEventListener('load', this.hideSpinner);
    this.setState({ showSpinner: true });
  }

  hideSpinner = () => {
    this.setState({ showSpinner: false });
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onImgClick('');
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onImgClick('');
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        {this.state.showSpinner === true && <Loader />}
        <div className={styles.Modal}>
          <img
            id="largeImage"
            src={this.props.largeImageURL}
            alt={this.props.alt}
          />
        </div>
      </div>,

      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
