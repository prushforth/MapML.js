import { html, render } from '../../node_modules/lit-html/lit-html.js';

let normalOrItalic = 'normal';
let layerChecked = true;
let layerLeafletId = 143;
let hidden = false;

const layerItem = (layerName) =>
  html`<fieldset
    class="mapml-layer-item"
    aria-grabbed="false"
    aria-labelledby="mapml-layer-item-name-{${layerLeafletId}}"
  >
    <div class="mapml-layer-item-properties">
      <label
        class="mapml-layer-item-toggle"
        style="font-style: ${normalOrItalic};"
      >
        <input
          class="leaflet-control-layers-selector"
          ?checked=${layerChecked}
          type="checkbox"
        />
        <span class="mapml-layer-item-name" id="mapml-layer-item-name-{143}"
          >${layerName}</span
        >
      </label>
      <div class="mapml-layer-item-controls">
        <button
          class="mapml-layer-item-remove-control mapml-button"
          type="button"
          title="Remove Layer"
        >
          <span aria-hidden="true">✕</span>
        </button>
        <button
          class="mapml-layer-item-settings-control mapml-button"
          type="button"
          title="Layer Settings"
          aria-expanded="false"
        >
          <span class="" aria-hidden="true">
            <svg viewBox="0 0 24 24" height="22" width="22" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <!-- cut 1 -->
    ${layerItemSettings()}
  </fieldset>`;

const layerItemSettings = () =>
  html`<div class="mapml-layer-item-settings" ?hidden=${hidden}>
    <details
      class="mapml-layer-item-opacity mapml-control-layers"
      style="font-style: ${normalOrItalic};"
    >
      <summary class="" id="mapml-layer-item-opacity-144">Opacity</summary>
      <input
        class=""
        type="range"
        min="0"
        max="1.0"
        value="1"
        step="0.1"
        aria-labelledby="mapml-layer-item-opacity-144"
      />
    </details>
    <!-- cut 2 -->
    ${mapExtents()}
  </div>`;

const mapExtents = () =>
  html`<fieldset
    class="mapml-layer-grouped-extents"
    aria-label="Sublayers"
    ?hidden=${hidden}
  >
    <!-- this fieldset always exists, but it is only populated when there are non-hidden map-extent elements -->
    <!-- cut 3 -->
    <!-- repeat this for each map-extent in DOM order  -->
    ${document.querySelectorAll('map-extent').forEach((e) => mapExtent(e))}
  </fieldset>`;

const mapExtent = (name) => html`<fieldset
  class="mapml-layer-extent"
  aria-grabbed="false"
  aria-labelledby="mapml-extent-item-name-{92}"
>
  <!-- this fieldset is repeated for each extent -->
  <div class="mapml-layer-item-properties">
    <label class="mapml-layer-item-toggle" style="font-style: normal;">
      <input class="" type="checkbox" checked="" />
      <span class="mapml-extent-item-name" id="mapml-extent-item-name-{92}"
        >${name}</span
      >
    </label>
    <div class="mapml-layer-item-controls">
      <button
        class="mapml-layer-item-remove-control mapml-button"
        type="button"
        title="Remove Sub Layer"
      >
        <span aria-hidden="true">✕</span>
      </button>
      <button
        class="mapml-layer-item-settings-control mapml-button"
        type="button"
        title="Extent Settings"
        aria-expanded="false"
      >
        <span class="" aria-hidden="true">
          <svg viewBox="0 0 24 24" height="22" width="22">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
  <div class="mapml-layer-item-settings" hidden="">
    <details
      class="mapml-layer-item-details mapml-control-layers"
      style="font-style: normal;"
    >
      <summary class="" id="mapml-extent-item-opacity-91">Opacity</summary>
      <input
        class=""
        type="range"
        min="0"
        max="1.0"
        step="0.1"
        aria-labelledby="mapml-extent-item-opacity-91"
        value="1"
      />
    </details>
  </div>
</fieldset>`;

render(mapExtent('Foo', document.body));
