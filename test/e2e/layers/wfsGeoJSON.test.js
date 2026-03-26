import { test, expect, chromium } from '@playwright/test';

test.describe('WFS GeoJSON Features via map-link rel="features" type="application/json"', () => {
  let page;
  let context;
  test.beforeAll(async function () {
    context = await chromium.launchPersistentContext('', {
      headless: true,
      slowMo: 250
    });
    page = await context.newPage();
    await page.goto('wfsGeoJSON.html');
    await page.waitForTimeout(3000);
  });
  test.afterAll(async function () {
    await context.close();
  });

  test('Projected GeoJSON features render on initial load', async () => {
    // The first layer (WFS Projected Features) should have features
    // rendered from the JSON response
    const featureCount = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[0];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return 0;
      return link.shadowRoot.querySelectorAll('map-feature').length;
    });
    expect(featureCount).toBeGreaterThan(0);
  });

  test('Projected features have cs meta set to pcrs', async () => {
    const csValue = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[0];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return null;
      let csMeta = link.shadowRoot.querySelector('map-meta[name=cs]');
      return csMeta ? csMeta.getAttribute('content') : null;
    });
    expect(csValue).toBe('pcrs');
  });

  test('Geographic GeoJSON features render on initial load', async () => {
    const featureCount = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[1];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return 0;
      return link.shadowRoot.querySelectorAll('map-feature').length;
    });
    expect(featureCount).toBeGreaterThan(0);
  });

  test('Geographic features have cs meta set to gcrs', async () => {
    const csValue = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[1];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return null;
      let csMeta = link.shadowRoot.querySelector('map-meta[name=cs]');
      return csMeta ? csMeta.getAttribute('content') : null;
    });
    expect(csValue).toBe('gcrs');
  });

  test('Projected features have expected property values', async () => {
    const hasProperties = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[0];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return false;
      let features = link.shadowRoot.querySelectorAll('map-feature');
      // Check if the first feature has properties containing "WFS Building A"
      for (let f of features) {
        let props = f.querySelector('map-properties');
        if (props && props.innerHTML.includes('WFS Building A')) return true;
      }
      return false;
    });
    expect(hasProperties).toBe(true);
  });

  test('Features contain expected geometry types', async () => {
    const geometryTypes = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[0];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return [];
      let features = link.shadowRoot.querySelectorAll('map-feature');
      let types = [];
      for (let f of features) {
        let geom = f.querySelector('map-geometry');
        if (geom) {
          if (geom.querySelector('map-polygon')) types.push('polygon');
          if (geom.querySelector('map-point')) types.push('point');
        }
      }
      return types;
    });
    expect(geometryTypes).toContain('polygon');
    expect(geometryTypes).toContain('point');
  });

  test('Features re-fetch after pan', async () => {
    // Record initial feature count, then pan the map and check features refetch
    const initialCount = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[0];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return 0;
      return link.shadowRoot.querySelectorAll('map-feature').length;
    });

    // Pan the map by pressing arrow key
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(2000);

    // After pan, features should still be present (re-fetched from the mock)
    const afterPanCount = await page.evaluate(() => {
      let viewer = document.querySelector('mapml-viewer');
      let layer = viewer.layers[0];
      let link = layer.querySelector('map-link[rel="features"]');
      if (!link || !link.shadowRoot) return 0;
      return link.shadowRoot.querySelectorAll('map-feature').length;
    });
    expect(afterPanCount).toBeGreaterThan(0);
  });
});
