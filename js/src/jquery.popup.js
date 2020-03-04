/* global jQueryCrayon
*/

/* exported popdownWindow, popupWindow
*/

// Default Settings
var jqueryPopup = Object();
jqueryPopup.defaultSettings = {
  // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and
  // left
  centerBrowser: 0,
  // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and
  // left
  centerScreen: 0,
  // sets the height in pixels of the window.
  height: 500,
  // left position when the window appears.
  left: 0,
  // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
  location: 0,
  // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
  menubar: 0,
  // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be
  // overloaded using resizable.
  resizable: 0,
  // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
  scrollbars: 0,
  // whether a status line appears at the bottom of the window {1 (YES) or 0
  // (NO)}.
  status: 0,
  // sets the width in pixels of the window.
  width: 500,
  // name of window set from the name attribute of the element that invokes the
  // click
  windowName: null,
  // url used for the popup
  windowURL: null,
  // top position when the window appears.
  top: 0,
  // determines whether a toolbar (includes the forward and back buttons) is
  // displayed {1 (YES) or 0 (NO)}.
  toolbar: 0,
  data: null,
  event: "click"
};

var popdownWindow;
var popupWindow;

(function($) {
  popupWindow = function(
    object,
    instanceSettings,
    beforeCallback,
    afterCallback
  ) {
    beforeCallback =
      typeof beforeCallback !== "undefined" ? beforeCallback : null;
    afterCallback = typeof afterCallback !== "undefined" ? afterCallback : null;

    if (typeof object == "string") {
      object = $(object);
    }
    if (!(object instanceof $)) {
      return false;
    }
    var settings = $.extend(
      {},
      jqueryPopup.defaultSettings,
      instanceSettings || {}
    );
    object.handler = $(object).bind(settings.event, function() {
      if (beforeCallback) {
        beforeCallback();
      }

      var windowFeatures =
        "height=" +
        settings.height +
        ",width=" +
        settings.width +
        ",toolbar=" +
        settings.toolbar +
        ",scrollbars=" +
        settings.scrollbars +
        ",status=" +
        settings.status +
        ",resizable=" +
        settings.resizable +
        ",location=" +
        settings.location +
        ",menuBar=" +
        settings.menubar;

      settings.windowName = settings.windowName || $(this).attr("name");
      var href = $(this).attr("href");
      if (!settings.windowURL && !(href == "#") && !(href == "")) {
        settings.windowURL = $(this).attr("href");
      }

      var centeredY, centeredX;

      var win = null;
      if (settings.centerBrowser) {
        if (typeof window.screenY == "undefined") {
          // not defined for old IE versions
          centeredY =
            window.screenTop -
            120 +
            ((document.documentElement.clientHeight + 120) / 2 -
              settings.height / 2);
          centeredX =
            window.screenLeft +
            ((document.body.offsetWidth + 20) / 2 - settings.width / 2);
        } else {
          centeredY =
            window.screenY + (window.outerHeight / 2 - settings.height / 2);
          centeredX =
            window.screenX + (window.outerWidth / 2 - settings.width / 2);
        }
        win = window.open(
          settings.windowURL,
          settings.windowName,
          windowFeatures + ",left=" + centeredX + ",top=" + centeredY
        );
      } else if (settings.centerScreen) {
        centeredY = (screen.height - settings.height) / 2;
        centeredX = (screen.width - settings.width) / 2;
        win = window.open(
          settings.windowURL,
          settings.windowName,
          windowFeatures + ",left=" + centeredX + ",top=" + centeredY
        );
      } else {
        win = window.open(
          settings.windowURL,
          settings.windowName,
          windowFeatures + ",left=" + settings.left + ",top=" + settings.top
        );
      }
      if (win != null) {
        win.focus();
        if (settings.data) {
          win.document.write(settings.data);
        }
      }

      if (afterCallback) {
        afterCallback();
      }
    });
    return settings;
  };

  popdownWindow = function(object, event) {
    if (typeof event == "undefined") {
      event = "click";
    }
    object = $(object);
    if (!(object instanceof $)) {
      return false;
    }
    object.unbind(event, object.handler);
  };
})(jQueryCrayon);
