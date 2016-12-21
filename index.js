var map;

require([
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/parser",

  "esri/Color",
  "esri/dijit/Popup",
  "esri/dijit/PopupTemplate",
  "esri/InfoTemplate",
  "esri/map",
  "esri/layers/CSVLayer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/symbols/SimpleFillSymbol",

  "dojo/domReady!"
],
function(
  domConstruct,
  domClass,
  parser,
  Color,
  Popup,
  PopupTemplate,
  InfoTemplate,
  Map,
  CSVLayer,
  SimpleMarkerSymbol,
  SimpleRenderer,
  SimpleFillSymbol
  ) {

  var fill = new SimpleFillSymbol("solid", null, new Color("#555555"));
  var popup = new Popup({
    fillSymbol: fill,
    titleInBody: false
  }, domConstruct.create("div"));

  // Add the dark theme which is customized further in the <style> tag at the top of this page
  domClass.add(popup.domNode, "dark");

  var map = new Map("map", {
    basemap: "gray-vector",
    center: [-80.8440, 35.9522],
    zoom: 5,
    infoWindow: popup
  });

  var loversPopupTemplate = new PopupTemplate ({
    title: "Lovers",
    fieldInfos: [
      { fieldName: "Shop", visible: true, label: "Shop: "},
      { fieldName: "Address", visible: true, label: "Address: "},
      { fieldName: "Website", visible: true, label: "Website: "}
    ]
  });

  var loversCSV = new CSVLayer("Lovers.csv", {});
  var purple = new Color([178, 18, 178, 0.8]);
  var loversMarker = new SimpleMarkerSymbol("solid", 10, null, purple);
  var loversRenderer = new SimpleRenderer(loversMarker);
  loversCSV.setRenderer(loversRenderer);
  loversCSV.setInfoTemplate(loversPopupTemplate);

  map.addLayer(loversCSV);

  var hatersPopupTemplate = new PopupTemplate ({
    title: "Haters",
    fieldInfos: [
      { fieldName: "Shop", visible: true, label: "Shop: "},
      { fieldName: "Address", visible: true, label: "Address: "},
      { fieldName: "Website", visible: true, label: "Website: "}
    ]
  });

  var hatersCSV = new CSVLayer("Haters.csv", {});
  var green = new Color([62, 178, 0, 0.8]);
  var hatersMarker = new SimpleMarkerSymbol("solid", 10, null, green);
  var hatersRenderer = new SimpleRenderer(hatersMarker);
  hatersCSV.setRenderer(hatersRenderer);
  hatersCSV.setInfoTemplate(hatersPopupTemplate);

  map.addLayer(hatersCSV);
});
