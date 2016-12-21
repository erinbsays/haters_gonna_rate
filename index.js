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

  let PURPLE = new Color([178, 18, 178, 0.8]);
  let GRAY5 = new Color("#555555");
  let GREEN = new Color([62, 178, 0, 0.8]);
  let MAP_CENTER = [-80.8440, 35.9522];
  let fields = [
    { fieldName: "Shop", visible: true, label: "Shop: "},
    { fieldName: "Address", visible: true, label: "Address: "},
    { fieldName: "Website", visible: true, label: "Website: "}
  ]

  let types = [
    {
      "name": "./Lovers",
      "csv": "Lovers.csv",
      "color": PURPLE
    },
    {
      "name": "./Haters",
      "csv": "Haters.csv",
      "color": GREEN
    },
  ]

  var fill = new SimpleFillSymbol("solid", null, GRAY5);
  var popup = new Popup({
    fillSymbol: fill,
    titleInBody: false
  }, domConstruct.create("div"));

  // Add the dark theme which is customized further in the <style> tag at the top of this page
  domClass.add(popup.domNode, "dark");

  var map = new Map("map", {
    basemap: "gray-vector",
    center: MAP_CENTER,
    zoom: 5,
    infoWindow: popup
  });

  for (let type of types) {
    var popupTemplate = new PopupTemplate ({
      title: type.title,
      fieldInfos: fields
    });

    var typeLayer = new CSVLayer(type.csv, {});
    var marker = new SimpleMarkerSymbol("solid", 10, null, type.color);
    var renderer = new SimpleRenderer(marker);
    typeLayer.setRenderer(renderer);
    typeLayer.setInfoTemplate(popupTemplate);

    map.addLayer(typeLayer);
  }

});
