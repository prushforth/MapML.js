export class MapSelect extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'id'];
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(val) {
    this.setAttribute('name', val);
  }
  get id() {
    return this.getAttribute('id');
  }
  set id(val) {
    this.setAttribute('id', val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        if (oldValue !== newValue) {
          // handle side effects
        }
        break;
      case 'id':
        if (oldValue !== newValue) {
          // handle side effects
        }
        break;
    }
  }
  constructor() {
    // Always call super first in constructor
    super();
  }
  connectedCallback() {
    this._extentEl = this.parentElement;
    this.htmlselect = document.createElement('select');
    [...this.attributes].forEach(({name, value}) =>
        this.htmlselect.setAttribute(name, value)
    );
    var options = this.querySelectorAll('map-option');
    for (let i = 0; i < options.length; i++) {
      this.htmlselect.appendChild(options.getOption());
    }
    const drawLayers = function () {
      this.parentElement._extentLayer.redraw();
    }.bind(this);
    // this goes into the layer control, so add a listener to trigger map
    // or layer redraw with newly selected value
    this.htmlselect.addEventListener('change', drawLayers);
    this._createLayerControlForSelect();
  }
  disconnectedCallback() {}
  _createLayerControlForSelect() {
    const selectdetails = (e) => M.html`
      <details class="mapml-layer-item-details mapml-control-layers">
        <summary>
          <label for="${this.id}">${this.name}</label>
        </summary>
          ${this.htmlselect}
      </details>`;
    this.selectdetails = selectdetails;
  }
  whenReady() {
    return new Promise((resolve, reject) => {
      let interval, failureTimer;
      if (this.selectdetails) {
        resolve();
      } else {
        let selectElement = this;
        interval = setInterval(testForSelect, 300, selectElement);
        failureTimer = setTimeout(selectNotDefined, 10000);
      }
      function testForSelect(selectElement) {
        if (selectElement.selectdetails) {
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
