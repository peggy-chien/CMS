"use strict";
fetch("./components/update-user/update-user.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class UpdateUser extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = html;
      const template = shadow.getElementById("update-modal").content;

      shadow.appendChild(template.cloneNode(true));
    }

    // connectedCallback() {
    //   this._modal = this.shadowRoot.querySelector(".modal");
    //   this.shadowRoot.querySelector("button").addEventListener('click',        this._showModal.bind(this));
    //   this.shadowRoot.querySelector(".close").addEventListener('click', this._hideModal.bind(this));
    // }

    // disconnectedCallback() {
    //   this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
    //   this.shadowRoot.querySelector(".close").removeEventListener('click', this._hideModal);
    // }

    // _showModal() {
    //  this._modalVisible = true;
    //  this._modal.style.display = 'block';
    // }

    // _hideModal() {
    //   this._modalVisible = false;
    //   this._modal.style.display = 'none';
    // }
  }

  // let the browser know about the custom element
  customElements.define("update-user", UpdateUser);
}
