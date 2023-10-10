const appRoot = document.createElement("div");
appRoot.id = "root";
document.body.appendChild(appRoot);
global.ClipboardEvent = function (event, params) {
  params = params || { bubbles: false, cancelable: false, data: undefined };
  var evt = document.createEvent("Events");
  var bubbles = true;
  for (var name in params) {
    name === "bubbles" ? (bubbles = !!params[name]) : (evt[name] = params[name]);
  }
  evt.initEvent(event, bubbles, true);
  return evt;
};
global.DragEvent = function (event, params) {
  params = params || { bubbles: false, cancelable: false };
  var evt = document.createEvent("Events");
  var bubbles = true;
  for (var name in params) {
    name === "bubbles" ? (bubbles = !!params[name]) : (evt[name] = params[name]);
  }
  evt.initEvent(event, bubbles, true);
  return evt;
};
