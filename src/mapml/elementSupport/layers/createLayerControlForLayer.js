export var createLayerControlHTML = async function () {
  //  this._layerControlCheckbox = input;
  //  this._layerControlLabel = itemToggleLabel;
  //  this._opacityControl = opacityControl;
  //  this._opacitySlider = opacity;
  //  this._layerControlHTML = fieldset;
  //  this._layerItemSettingsHTML = layerItemSettings;
  //  this._propertiesGroupAnatomy = extentsFieldset;
  //  this._styles = styles;
  //  extentsFieldset.setAttribute('aria-label', 'Sublayers');
  //  extentsFieldset.setAttribute('hidden', '');
  //  let mapExtents = mapml.querySelectorAll('map-extent:not([hidden])');
  //  let mapExtentLayerControls = [];
  //  for (let i = 0; i < mapExtents.length; i++) {
  //    mapExtentLayerControls.push(mapExtents[i].whenReady());
  //    // if any map-extent is not hidden, the parent fieldset should not be hidden
  //    extentsFieldset.removeAttribute('hidden');
  //  }
  //  await Promise.all(mapExtentLayerControls);
  //  for (let i = 0; i < mapExtents.length; i++) {
  //    extentsFieldset.appendChild(mapExtents[i].getLayerControlHTML());
  //  }
  //  layerItemSettings.appendChild(extentsFieldset);

  const layerItem = (layer) =>
    M.html`<fieldset
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
              <svg
                viewBox="0 0 24 24"
                height="22"
                width="22"
                fill="currentColor"
              >
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
    M.html`<div class="mapml-layer-item-settings" ?hidden=${layer.hidden}>
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

  const mapExtents = (layer) => {
    const node = layer.hasAttribute('src') ? layer.shadowRoot : layer;
    const extents = Array.from(
      node.querySelectorAll('map-extent:not([hidden])')
    );
    const mapExtentsExist = Boolean(extents.length);
    return M.html`<fieldset
      class="mapml-layer-grouped-extents"
      aria-label="Sublayers"
      ?hidden=${mapExtentsExist}
    >
      <!-- this fieldset always exists, but it is only populated when there are non-hidden map-extent elements -->

  //  for (let i = 0; i < mapExtents.length; i++) {
  //    mapExtentLayerControls.push(mapExtents[i].whenReady());
  //    // if any map-extent is not hidden, the parent fieldset should not be hidden
  //    extentsFieldset.removeAttribute('hidden');
  //  }
  //  await Promise.all(mapExtentLayerControls);
  //  for (let i = 0; i < mapExtents.length; i++) {
  //    extentsFieldset.appendChild(mapExtents[i].getLayerControlHTML());
  //  }

      <!-- render each map-extent as a fieldset, in original DOM order  -->
      <!-- probably going to want to use the repeat directvie instead of map
           see docs: https://lit.dev/docs/templates/lists/#the-repeat-directive -->
      ${extents.map((e) => mapExtent(e))}
    </fieldset>`;
  };


  this._layerControlHTML = layerItem(this);
  return this._layerControlHTML;
};
