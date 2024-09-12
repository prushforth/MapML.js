export class MapSelect extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'name'];
  }

  constructor() {
    super();

    this._id = '';
    this._name = '';
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
    this.setAttribute('id', value);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this.setAttribute('name', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'id':
        this._id = newValue;
        break;
      case 'name':
        this._name = newValue;
        break;
    }
  }

  connectedCallback() {
    this._extentEl =
      this.parentElement.nodeName === 'map-extent' ? this.parentElement : null;
  }
  disconnectedCallback() {}
  getLit() {
    const redraw = function (event) {
      this.parentElement._extentLayer?.redraw();
    }.bind(this);

    // Get all <map-option> children and call their getLit method
    const options = Array.from(this.querySelectorAll('map-option')).map(
      (option) => option.getLit()
    );

    // Ensure that id is set for both <label> and <select> elements
    const selectId = this.id || 'default-select-id';

    return M.html`
      <details class="mapml-layer-item-details mapml-control-layers">
        <summary>
          <label for="${selectId}">${this.name || 'Select'}</label>
        </summary>
        <select id="${selectId}" name="${this.name}"  @change="${redraw}">
          ${options}
        </select>
      </details>`;
  }
  whenReady() {
    return new Promise((resolve, reject) => {
      let interval, failureTimer;
      if (this._extentEl) {
        resolve();
      } else {
        let selectElement = this;
        interval = setInterval(testForSelect, 300, selectElement);
        failureTimer = setTimeout(selectNotDefined, 10000);
      }
      function testForSelect(selectElement) {
        if (selectElement._extentEl) {
          clearInterval(interval);
          clearTimeout(failureTimer);
          resolve();
        } else if (!selectElement.isConnected) {
          clearInterval(interval);
          clearTimeout(failureTimer);
          reject('map-select was disconnected while waiting to be ready');
        }
      }
      function selectNotDefined() {
        clearInterval(interval);
        clearTimeout(failureTimer);
        reject('Timeout reached waiting for map-select to be ready');
      }
    });
  }
}
