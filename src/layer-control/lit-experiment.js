import { html, render } from '../../node_modules/lit-html/lit-html.js';

const layerItem = (layer) =>
  html`<fieldset
    class="mapml-layer-item"
    aria-grabbed="false"
    aria-labelledby="mapml-layer-item-name-{${layer._layer._leaflet_id}}"
  >
    <div class="mapml-layer-item-properties">
      <label
        class="mapml-layer-item-toggle"
        style="font-style: ${layer.disabled ? 'italic' : 'normal'};"
      >
        <input
          class="leaflet-control-layers-selector"
          ?checked=${layer.checked}
          type="checkbox"
        />
        <span
          class="mapml-layer-item-name"
          id="mapml-layer-item-name-{${layer._layer._leaflet_id}}"
          >${layer.label}</span
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
    ${layerItemSettings(layer)}
  </fieldset>`;

const layerItemSettings = (layer) =>
  html`<div class="mapml-layer-item-settings" ?hidden=${layer.hidden}>
    <details
      class="mapml-layer-item-opacity mapml-control-layers"
      style="font-style: ${layer.disabled ? 'italic' : 'normal'};"
    >
      <summary
        class=""
        id="mapml-layer-item-opacity-${layer._layer._leaflet_id}"
      >
        Opacity
      </summary>
      <input
        class=""
        type="range"
        min="0"
        max="1.0"
        value="1"
        step="0.1"
        aria-labelledby="mapml-layer-item-opacity-${layer._layer._leaflet_id}"
      />
    </details>
    ${mapExtents(layer)}
  </div>`;

const mapExtents = () =>
  html`<fieldset
    class="mapml-layer-grouped-extents"
    aria-label="Sublayers"
    ?hidden=${hidden}
  >
    <!-- this fieldset always exists, but it is only populated when there are non-hidden map-extent elements -->
    <!-- render each map-extent as a fieldset, in original DOM order  -->
    <!-- probably going to want to use the repeat directvie instead of map
           see docs: https://lit.dev/docs/templates/lists/#the-repeat-directive -->
    ${Array.from(
      layer.hasAttribute('src')
        ? layer.shadowRoot.querySelectorAll('map-extent:not([hidden])')
        : layer.querySelectorAll('map-extent:not([hidden])')
    ).map((e) => mapExtent(e))}
  </fieldset>`;

const mapExtent = (e) => html`<fieldset
  class="mapml-layer-extent"
  aria-grabbed="false"
  aria-labelledby="mapml-extent-item-name-{${e._extentLayer._leaflet_id}}"
>
  <!-- this fieldset is repeated for each extent -->
  <div class="mapml-layer-item-properties">
    <label
      class="mapml-layer-item-toggle"
      style="font-style: ${e.hasAttribute('disabled') ? 'italic' : 'normal'};"
    >
      <input class="" type="checkbox" checked="" />
      <span class="mapml-extent-item-name" id="mapml-extent-item-name-{92}"
        >${e.getAttribute('label')}</span
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

return layerItem();
