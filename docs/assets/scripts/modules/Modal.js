import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.closeModalButton = $(".modal__close");
    this.events();
  }

  events() {
    // Clicking the open modal button
    this.openModalButton.click(this.openModal.bind(this));
    // Clicking the X close modal button
    this.closeModalButton.click(this.closeModal.bind(this));
    // User presses any key
    $(document).keyup(this.keyPressHandler.bind(this));
  }

  keyPressHandler(e) {
    // Test for escape key (key code = 27)
    if (e.keyCode == 27) {
      this.closeModal();
    }
  }

  openModal() {
    this.modal.addClass("modal--is-visible");
    // Prevent default behavior of returning to top of page
    return false;
  }

  closeModal() {
    this.modal.removeClass("modal--is-visible");
  }
}

export default Modal;
