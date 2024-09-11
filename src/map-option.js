export class MapOption extends HTMLElement {
  static get observedAttributes() {
    return;
  }

  attributeChangedCallback(name, oldValue, newValue) {}
  constructor() {
    // Always call super first in constructor
    super();
  }
  connectedCallback() {
    this.option = document.createElement('option');
    // copy the attributes of this element to the HTML option
    [...this.attributes].forEach(({name, value}) => this.option.setAttribute(name,value));
    // copy the content of this element to the HTML option
    this.option.innerHTML = this.innerHTML;
  }
  disconnectedCallback() {
    delete this.option;
  }
  getHTML() {
    return this.option;
  }
  getLit() {
    return M.html`<option>${this.innerHTML}</option>`
  }
}
window.customElements.define('map-option', MapOption);