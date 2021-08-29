class FloatingFeedbackButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSc5EntMenmeKRUGQOAEj5dAJHUdQGzFSUc0IgbXg4oGhqPxXA/viewform?usp=sf_link" class="floatingButton">
        <i class="fa fa-comment fa-2x floatingButtonContent"></i>
      </a>
    `;
  }
}

customElements.define('floating-feedback-button', FloatingFeedbackButton);
