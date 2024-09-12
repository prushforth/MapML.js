export class MapOption extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'label', 'selected', 'defaultselected'];
  }

  constructor() {
    super();

    // Internal properties
    this._selected = false;
    this._defaultSelected = false;
  }

  get value() {
    return this.hasAttribute('value')
      ? this.getAttribute('value')
      : this.textContent;
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get label() {
    return this.hasAttribute('label')
      ? this.getAttribute('label')
      : this.textContent;
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get text() {
    return this.textContent;
  }

  set text(value) {
    this.textContent = value;
    if (this.getAttribute('value') === this.textContent) {
      this.removeAttribute('value');
    }
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    this._selected = value;
    if (value) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }

  get defaultSelected() {
    return this._defaultSelected;
  }

  set defaultSelected(value) {
    this._defaultSelected = value;
    if (value) {
      this.setAttribute('defaultselected', '');
    } else {
      this.removeAttribute('defaultselected');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'id':
        this._id = newValue;
        break;
      case 'value':
        break;
      case 'label':
        break;
      case 'selected':
        this._selected = newValue !== null;
        break;
      case 'defaultselected':
        this._defaultSelected = newValue !== null;
        break;
    }
  }

  connectedCallback() {}

  getLit() {
    // Precedence for rendering: text -> label -> value
    const content = this.text || this.label || this.value;

    return M.html`
      <option
        ${this.hasAttribute('id') ? html`id="${this.id}"` : ''}
        ${this.hasAttribute('value') ? html`value="${this.value}"` : ''}
        ${this.hasAttribute('label') ? html`label="${this.label}"` : ''}
        ${this.hasAttribute('selected') ? html`selected` : ''}
        ${this.hasAttribute('defaultselected') ? html`defaultselected` : ''}>
        ${content}
      </option>
    `;
  }
}
