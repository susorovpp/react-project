import React from "react";
import { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  close(event) {
    event.preventDefault();
    this.closeModal();
  }

  render() {
    return (
      <div>
        <a href="/#" className="link" onClick={() => this.openModal()}>
          Выбрать дату
        </a>
        {this.state.isModalOpen === false ? null : (
          <div>
            <div
              className="Calendar"
              onClose={() => this.closeModal()}
            >
              Здесь будет календарь
            </div>
            <div className="Bg" onClick={(event) => this.close(event)}></div>
          </div>
        )}
        <div></div>
      </div>
    );
  }
}


export default Modal;
