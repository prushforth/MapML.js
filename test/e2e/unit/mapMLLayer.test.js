import { test, expect, chromium } from '@playwright/test';

test.describe("Tests for basic M.mapMLLayer(url)", () => {
  
  let page;
  let context;
  test.beforeAll(async () => {
    context = await chromium.launchPersistentContext('');
    page = context.pages().find((page) => page.url() === 'about:blank') || await context.newPage();
    await page.goto("mapMLLayer.html");
  });

  test.afterAll(async function () {
    await context.close();
  });
  
  test("<layer- src='url'>._layer should return a MapMLLayer object", async () => {
      await expect(page.locator('layer-')).toHaveCount(1);
      await expect(page.locator('layer-[src]')).toHaveCount(1);
      var ml_no_content = await page.$eval("layer-", 
        (l) => (l._layer._content === undefined));
      expect(ml_no_content).toEqual(true);
      var ml_container_exists = await page.$eval("layer-", 
        (l) => (l._layer._container instanceof HTMLElement));
      expect(ml_container_exists).toEqual(true);
      var ml_is_leaflet_layer = await page.$eval("layer-", 
        (l) => (l._layer._container.classList.contains("leaflet-layer")));
      expect(ml_is_leaflet_layer).toEqual(true);
      var ml_imageContainer_exists = await page.$eval("layer-", 
        (l) => (l._layer._imageContainer instanceof HTMLElement));
      expect(ml_imageContainer_exists).toEqual(true);
      var ml_imageContainer_is_leaflet_layer = await page.$eval("layer-", 
        (l) => (l._layer._imageContainer.classList.contains("leaflet-layer")));
      expect(ml_imageContainer_is_leaflet_layer).toEqual(true);
      var layer_src = await page.$eval("layer-", (l) => l.getAttribute('src'));
      var ml_href = await page.$eval("layer-", (l) => l._layer._href);
      expect(ml_href === layer_src).toBe(true);
      var ml_zIndex = await page.$eval("layer-", (l) => (l._layer.options.zIndex));
      expect(ml_zIndex).toBe(1);
  });
});

test.describe("M.mapMLLayer(null, <layer-></layer->, options) factory function ", () => {
    let page;
    let context;
    let t;

    test.beforeAll(async () => {
      
      context = await chromium.launchPersistentContext('');
      page = context.pages().find((page) => page.url() === 'about:blank') || await context.newPage();
      await page.goto("mapMLLayer.html");
      t = await page.evaluateHandle(() => {
        const template = document.createElement("template");
        template.innerHTML = `<layer- label="CBMT" checked><map-extent units="CBMTILE">
                    <map-input name="zoomLevel" type="zoom" value="3" min="0" max="3"></map-input>
                    <map-input name="row" type="location" axis="row" units="tilematrix" min="14" max="21"></map-input>
                    <map-input name="col" type="location" axis="column" units="tilematrix" min="14" max="19"></map-input>
                    <map-link rel="tile" tref="./images/cbmt/{zoomLevel}/c{col}_r{row}.png"></map-link>
                    </map-extent></layer->`;
        return template;
      });
      expect(t).toBeTruthy();
    });
    test.afterAll(async function () {
      await context.close();
    });
    test("No src, non-null <layer->content</layer-> should return a MapMLLayer object",async () => {
      let ml_content_exists = await t.evaluate((template) => {
        let layer = document.querySelector('mapml-viewer').appendChild(template.content.firstElementChild.cloneNode(true));
        return layer._layer._content instanceof HTMLElement;
      });
      await expect(page.locator('layer-')).toHaveCount(2);
      expect(ml_content_exists).toBe(true);
      
      var ml_container_exists = await page.$eval("layer-:not([src])", 
        (l) => (l._layer._container instanceof HTMLElement));
      expect(ml_container_exists).toEqual(true);
      var ml_is_leaflet_layer = await page.$eval("layer-:not([src])", 
        (l) => (l._layer._container.classList.contains("leaflet-layer")));
      expect(ml_is_leaflet_layer).toEqual(true);
      var ml_imageContainer_exists = await page.$eval("layer-:not([src])", 
        (l) => (l._layer._imageContainer instanceof HTMLElement));
      expect(ml_imageContainer_exists).toEqual(true);
      var ml_imageContainer_is_leaflet_layer = await page.$eval("layer-:not([src])", 
        (l) => (l._layer._imageContainer.classList.contains("leaflet-layer")));
      expect(ml_imageContainer_is_leaflet_layer).toEqual(true);
      var ml_zIndex = await page.$eval("layer-:not([src])", 
        (l) => (l._layer.options.zIndex));
      // zIndex is set by the element to its DOM position, which includes
      // non-layer elements, in this case a <style> has been created by the 
      // element, probably incorrectly, which accounts for why the zIndex is 3 not 2
      expect(ml_zIndex).toBe(3);
    });
    test.skip("url should return a MapMLLayer object",async () => {
      
      let pageArg = { url: "https://geogratis.gc.ca/mapml/en/cbmtile/cbmt/",
                      template: t
      };
      await page.pause();
      var ml = await page.evaluateHandle((pageArg) => (M.mapMLLayer(pageArg.url, pageArg.template.content.firstElementChild.cloneNode(true))),pageArg);
      await expect(ml._content).toBeFalsy();
      await expect(ml._layerEl).toBeTruthy();
//      await expect(ml._layerEl).toBe(content);
//      await expect(
//          ml._container.classList.contains("leaflet-layer")
//      ).toBeTruthy();
//      await expect(ml._imageContainer).toBeTruthy();
//      await expect(
//          ml._imageContainer.classList.contains("leaflet-layer")
//      ).toBeTruthy();
//      await expect(ml._href).toBeTruthy();
//      await expect(ml._href).toBe(url);
//      await expect(ml.options.zIndex).toBe(0);
    });
});
//
//	describe("M.mapMLLayer(url | null, <foo>mapml content</foo>, options) factory function ", () => {
//		var content;
//		beforeEach(async () => {
//			content = document.createElement("foo");
//			content.innerHTML = `<map-extent units="CBMTILE">
//                        <map-input name="zoomLevel" type="zoom" value="3" min="0" max="3"></map-input>
//                        <map-input name="row" type="location" axis="row" units="tilematrix" min="14" max="21"></map-input>
//                        <map-input name="col" type="location" axis="column" units="tilematrix" min="14" max="19"></map-input>
//                        <map-link rel="tile" tref="./images/cbmt/{zoomLevel}/c{col}_r{row}.png"></map-link>
//                    </map-extent>`;
//
//			await expect(content instanceof HTMLElement).toBeTruthy();
//		});
//		test("url value should return a url-based MapMLLayer object", async () => {
//			var url = "https://geogratis.gc.ca/mapml/en/cbmtile/cbmt/";
//			var ml = M.mapMLLayer(url, content);
//			await expect(ml._content).toBeFalsy();
//			await expect(ml._layerEl).toBeTruthy();
//			await expect(ml._layerEl).toBe(content);
//			await expect(
//				ml._container.classList.contains("leaflet-layer")
//			).toBeTruthy();
//			await expect(ml._imageContainer).toBeTruthy();
//			await expect(
//				ml._imageContainer.classList.contains("leaflet-layer")
//			).toBeTruthy();
//			await expect(ml._href).toBeTruthy();
//			await expect(ml._href).toBe(url);
//			await expect(ml.options.zIndex).toBe(0);
//		});
//		test("null url should return a inline-content based MapMLLayer object", async () => {
//			var ml = M.mapMLLayer(null, content);
//			await expect(ml._content).toBeTruthy();
//			await expect(ml._layerEl).toBeTruthy();
//			await expect(ml._layerEl).toBe(content);
//			await expect(
//				ml._container.classList.contains("leaflet-layer")
//			).toBeTruthy();
//			await expect(ml._imageContainer).toBeTruthy();
//			await expect(
//				ml._imageContainer.classList.contains("leaflet-layer")
//			).toBeTruthy();
//			await expect(ml._href).toBeFalsy();
//			await expect(ml.options.zIndex).toBe(0);
//		});
//	});
//	describe("M.mapMLLayer(url, <foo>(empty)</foo>, options) factory function ", () => {
//		test("url value should return a url-based MapMLLayer object", async () => {
//			var url = "https://geogratis.gc.ca/mapml/en/cbmtile/cbmt/";
//			var empty = document.createElement("bar");
//			var ml = M.mapMLLayer(url, empty);
//			await expect(ml._content).toBeFalsy();
//			await expect(ml._layerEl).toBeTruthy();
//			await expect(ml._layerEl).toBe(empty);
//			await expect(
//				ml._container.classList.contains("leaflet-layer")
//			).toBeTruthy();
//			await expect(ml._imageContainer).toBeTruthy();
//			await expect(
//				ml._imageContainer.classList.contains("leaflet-layer")
//			).toBeTruthy();
//			await expect(ml._href).toBeTruthy();
//			await expect(ml._href).toBe(url);
//			await expect(ml.options.zIndex).toBe(0);
//		});
//	});
//	describe("M.mapMLLayer(null, null, options) factory function ", () => {
//		test("null url, null content, any object params should NOT return a MapMLLayer object", async () => {
//			var ml = M.mapMLLayer(null, null, {});
//			await expect(ml).toBeFalsy();
//		});
//	});
