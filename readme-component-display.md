
To build the index.html with an instance of component-display wrapping mapml-viewer,
copy the built component-display project dist/component-display, dist/components and dist/types
folders into the site root component-display, so that you have a
component-display/
  component-display/
  components/
  types/

structure locally.

Build this project, so that you have a new dist folder.  index.html in that folder
refers to ./component-display/component-display/component-display.esm.js, which uses
those other folders

MANUALLY COPY component-display/ to dist

The current instance of component-display here is from that project's main branch
so it doesn't run the gcds-map integration.

run dist/index.html which will run the test file.

NOTES it doesn't seem to matter if the component-display component has the gcds-map
integration or not, it still initializes the <mapml-viewer> badly; something is 
incorrect about the container, even though it doesn't seem to log any exceptions 
in this case.  HOWEVER if you open the dev tools, the map appears to reconnect or something
and all the tiles work fine from then on.  This seems to point to an incorrect
connectedCallback result or something like that TBD should you decide to accept
this mission.