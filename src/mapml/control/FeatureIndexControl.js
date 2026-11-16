import { Control, DomUtil, DomEvent } from 'leaflet';
import { featureIndexPreference } from '../layers/FeatureIndexOverlay.js';

// Material Symbols `campaign` (megaphone): the index is on.
const CAMPAIGN_PATH =
  'M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z';
// The Material Symbols `*_off` slash, cut out of the megaphone: the index is off.
const SLASH_PATH = 'M792-56 56-792l56-56 736 736-56 56Z';
const SVG_OPEN =
  '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 -960 960 960" fill="currentColor">';
const CAMPAIGN_SVG = `${SVG_OPEN}<path d="${CAMPAIGN_PATH}"/></svg>`;
const CAMPAIGN_OFF_SVG =
  SVG_OPEN +
  '<mask id="mapml-feature-index-off" maskUnits="userSpaceOnUse" x="0" y="-960" width="960" height="960">' +
  '<rect x="0" y="-960" width="960" height="960" fill="#fff"/>' +
  `<path d="${SLASH_PATH}" stroke="#000" stroke-width="80"/></mask>` +
  `<path d="${CAMPAIGN_PATH}" mask="url(#mapml-feature-index-off)"/>` +
  `<path d="${SLASH_PATH}"/></svg>`;

// Toggles the feature index overlay (the reticle and its numbered list of the
// features under it). Opt-in with controlslist="featureindex"; ported from
// MapML-MapLibre / MapML-OpenLayers. The button drives the viewer's public
// featureIndex property and follows its mapml:featureindexchanged event; its
// icon shows the state, as the static button's lock does (a megaphone when the
// index is on, crossed out when it is off). When
// M.options.featureIndexOverlayOption forces the state, the button shows that
// state but is aria-disabled and ignores clicks: a user's accessibility
// preference can't be overridden from the map.
export var FeatureIndexControl = Control.extend({
  options: {
    position: 'topright'
  },
  _getLocale: function (map) {
    return map.options.mapEl && map.options.mapEl.locale
      ? map.options.mapEl.locale
      : M.options.locale;
  },
  onAdd: function (map) {
    this._mapEl = map.options.mapEl;
    this._locale = this._getLocale(map);
    let container = DomUtil.create(
      'div',
      'mapml-feature-index-control leaflet-bar'
    );
    container.dataset.testid = 'feature-index-control';

    let button = DomUtil.create(
      'button',
      'mapml-feature-index-button mapml-button',
      container
    );
    button.setAttribute('type', 'button');
    this._button = button;

    DomEvent.disableClickPropagation(button);
    DomEvent.on(button, 'click', DomEvent.stop);
    DomEvent.on(button, 'click', this._toggleFeatureIndex, this);

    this._onFeatureIndexChanged = () => this._updateButton();
    this._mapEl.addEventListener(
      'mapml:featureindexchanged',
      this._onFeatureIndexChanged
    );

    this._updateButton();

    return container;
  },

  onRemove: function (map) {
    this._mapEl.removeEventListener(
      'mapml:featureindexchanged',
      this._onFeatureIndexChanged
    );
  },

  _toggleFeatureIndex: function () {
    if (featureIndexPreference() !== undefined) return;
    this._mapEl.featureIndex = !this._mapEl.featureIndex;
    // The overlay shows only while the map has focus, so hand it back, as
    // the geolocation button does.
    this._map.getContainer().focus({ preventScroll: true });
  },

  _updateButton: function () {
    let forced = featureIndexPreference() !== undefined;
    let on = this._mapEl.featureIndex;
    let label = this._locale.btnFeatureIndex || 'Feature index';
    this._button.title = label;
    this._button.setAttribute('aria-label', label);
    this._button.setAttribute('aria-pressed', String(on));
    this._button.innerHTML = on ? CAMPAIGN_SVG : CAMPAIGN_OFF_SVG;
    // aria-disabled, not disabled: a natively disabled button gets no mouse
    // events, so a click on it would focus the map around it instead.
    if (forced) this._button.setAttribute('aria-disabled', 'true');
    else this._button.removeAttribute('aria-disabled');
  }
});

export var featureIndexControl = function (options) {
  return new FeatureIndexControl(options);
};
