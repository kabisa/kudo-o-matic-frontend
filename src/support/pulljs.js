"use strict";

let _SETTINGS = {};
let defaultHTML = void 0;
let _defaults = {
  distThreshold: 40,
  distMax: 80,
  distReload: 50,
  bodyOffset: 20,
  mainElement: "body",
  triggerElement: "body",
  ptrElement: ".ptr",
  classPrefix: "ptr--",
  cssProp: "min-height",
  containerClassName: "",
  boxClassName: "",
  contentClassName: "",
  textClassName: "",
  instructionsPullToRefresh: "Pull down to refresh",
  instructionsReleaseToRefresh: "Release to refresh",
  instructionsRefreshing: "Refreshing",
  refreshTimeout: 500,
  onInit: function onInit() {},
  onRefresh: function onRefresh() {
    return location.reload();
  },
  resistanceFunction: function resistanceFunction(t) {
    return Math.min(1, t / 2.5);
  }
};

let pullStartY = null;
let pullMoveY = null;
let dist = 0;
let distResisted = 0;

let _state = "pending";
let started = false;
let _setup = false;
let _enable = false;
let _timeout = void 0;

function _update() {
  let _SETTINGS2 = _SETTINGS,
    classPrefix = _SETTINGS2.classPrefix,
    ptrElement = _SETTINGS2.ptrElement,
    instructionsRefreshing = _SETTINGS2.instructionsRefreshing,
    instructionsPullToRefresh = _SETTINGS2.instructionsPullToRefresh,
    instructionsReleaseToRefresh = _SETTINGS2.instructionsReleaseToRefresh;

  let textEl = ptrElement.querySelector("." + classPrefix + "text");

  if (_state === "releasing") {
    textEl.innerHTML = instructionsReleaseToRefresh;
  }

  if (_state === "pulling" || _state === "pending") {
    textEl.innerHTML = instructionsPullToRefresh;
  }

  if (_state === "refreshing") {
    textEl.innerHTML = instructionsRefreshing;
  }
}

function _setupEvents() {
  function onReset() {
    let _SETTINGS3 = _SETTINGS,
      cssProp = _SETTINGS3.cssProp,
      ptrElement = _SETTINGS3.ptrElement,
      classPrefix = _SETTINGS3.classPrefix;

    ptrElement.classList.remove(classPrefix + "refresh");
    ptrElement.style[cssProp] = "0px";

    _state = "pending";
  }

  function _onTouchStart(e) {
    let _SETTINGS4 = _SETTINGS,
      triggerElement = _SETTINGS4.triggerElement;

    if (_SETTINGS.mainElement.parentNode.scrollTop > 0) {
      return;
    }

    started = true;

    if (!window.scrollY) {
      pullStartY = e.touches[0].screenY;
    }

    if (_state !== "pending") {
      return;
    }

    clearTimeout(_timeout);

    _enable = triggerElement.contains(e.target);
    _state = "pending";
    _update();
  }

  function _onTouchMove(e) {
    let _SETTINGS5 = _SETTINGS,
      ptrElement = _SETTINGS5.ptrElement,
      resistanceFunction = _SETTINGS5.resistanceFunction,
      distMax = _SETTINGS5.distMax,
      distThreshold = _SETTINGS5.distThreshold,
      cssProp = _SETTINGS5.cssProp,
      classPrefix = _SETTINGS5.classPrefix;

    if (_SETTINGS.mainElement.parentNode.scrollTop > 0) {
      return;
    }

    if (!started) {
      return;
    }

    if (!pullStartY) {
      if (!window.scrollY) {
        pullStartY = e.touches[0].screenY;
      }
    } else {
      pullMoveY = e.touches[0].screenY;
    }

    if (!_enable || _state === "refreshing") {
      if (!window.scrollY && pullStartY < pullMoveY) {
        e.preventDefault();
      }

      return;
    }

    if (_state === "pending") {
      ptrElement.classList.add(classPrefix + "pull");
      _state = "pulling";
      _update();
    }

    if (pullStartY && pullMoveY) {
      dist = pullMoveY - pullStartY;
    }

    if (dist > 0) {
      ptrElement.style[cssProp] = distResisted + "px";

      distResisted =
        resistanceFunction(dist / distThreshold) * Math.min(distMax, dist);

      if (_state === "pulling" && distResisted > distThreshold) {
        ptrElement.classList.add(classPrefix + "release");
        _state = "releasing";
        _update();
      }

      if (_state === "releasing" && distResisted < distThreshold) {
        ptrElement.classList.remove(classPrefix + "release");
        _state = "pulling";
        _update();
      }
    }
  }

  function _onTouchEnd() {
    let _SETTINGS6 = _SETTINGS,
      ptrElement = _SETTINGS6.ptrElement,
      onRefresh = _SETTINGS6.onRefresh,
      refreshTimeout = _SETTINGS6.refreshTimeout,
      distThreshold = _SETTINGS6.distThreshold,
      distReload = _SETTINGS6.distReload,
      cssProp = _SETTINGS6.cssProp,
      classPrefix = _SETTINGS6.classPrefix;

    if (_state === "releasing" && distResisted > distThreshold) {
      _state = "refreshing";

      ptrElement.style[cssProp] = distReload + "px";
      ptrElement.classList.add(classPrefix + "refresh");

      _timeout = setTimeout(function() {
        let retval = onRefresh(onReset);

        if (retval && typeof retval.then === "function") {
          retval.then(function() {
            return onReset();
          });
        }

        if (!retval && !onRefresh.length) {
          onReset();
        }
      }, refreshTimeout);
    } else {
      if (_state === "refreshing") {
        return;
      }

      ptrElement.style[cssProp] = "0px";

      started = false;
      _state = "pending";
    }

    _update();

    ptrElement.classList.remove(classPrefix + "release");
    ptrElement.classList.remove(classPrefix + "pull");

    pullStartY = pullMoveY = null;
    dist = distResisted = 0;
  }

  window.addEventListener("touchend", _onTouchEnd);
  window.addEventListener("touchstart", _onTouchStart);
  window.addEventListener("touchmove", _onTouchMove, { passive: false });

  // Store event handlers to use for teardown later
  return {
    onTouchStart: _onTouchStart,
    onTouchMove: _onTouchMove,
    onTouchEnd: _onTouchEnd
  };
}

function _run() {
  let _SETTINGS7 = _SETTINGS,
    mainElement = _SETTINGS7.mainElement,
    classPrefix = _SETTINGS7.classPrefix,
    onInit = _SETTINGS7.onInit,
    containerClassName = _SETTINGS7.containerClassName;

  if (!_SETTINGS.ptrElement) {
    let ptr = document.createElement("div");
    if (mainElement !== document.body) {
      mainElement.parentNode.insertBefore(ptr, mainElement);
    } else {
      document.body.insertBefore(ptr, document.body.firstChild);
    }

    ptr.classList.add(classPrefix + "ptr");
    if (containerClassName !== "") {
      ptr.classList.add("" + containerClassName);
    }
    _SETTINGS.ptrElement = ptr;
  }

  if (_SETTINGS.ptrElement.innerHTML.length === 0) {
    _SETTINGS.ptrElement.innerHTML = defaultHTML;
  }

  if (typeof onInit === "function") {
    onInit(_SETTINGS);
  }

  return {
    ptrElement: _SETTINGS.ptrElement
  };
}

let updateElement = function updateElement() {
  defaultHTML =
    '\n    <div class="' +
    _SETTINGS.classPrefix +
    "box" +
    (_SETTINGS.boxClassName ? " " + _SETTINGS.boxClassName : "") +
    '">\n      <div class="' +
    _SETTINGS.classPrefix +
    "content" +
    (_SETTINGS.contentClassName ? " " + _SETTINGS.contentClassName : "") +
    '">\n        <div class="' +
    _SETTINGS.classPrefix +
    "text" +
    (_SETTINGS.textClassName ? " " + _SETTINGS.textClassName : "") +
    '"></div>\n      </div>\n    </div>\n  ';
};

let Pull = {
  init: function init() {
    let options =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let handlers = void 0;
    Object.keys(_defaults).forEach(function(key) {
      _SETTINGS[key] = options[key] || _defaults[key];
    });

    if (typeof _SETTINGS.mainElement === "string") {
      _SETTINGS.mainElement = document.querySelector(_SETTINGS.mainElement);
    }

    if (typeof _SETTINGS.ptrElement === "string") {
      _SETTINGS.ptrElement = document.querySelector(_SETTINGS.ptrElement);
    }

    if (typeof _SETTINGS.triggerElement === "string") {
      _SETTINGS.triggerElement = document.querySelector(
        _SETTINGS.triggerElement
      );
    }

    updateElement();

    if (!_setup) {
      handlers = _setupEvents();
      _setup = true;
    }

    let _run2 = _run(),
      ptrElement = _run2.ptrElement;

    return {
      handlers: handlers,
      destroy: function destroy(handlers) {
        // Teardown event listeners
        window.removeEventListener("touchstart", handlers.onTouchStart);
        window.removeEventListener("touchend", handlers.onTouchEnd);
        window.removeEventListener("touchmove", handlers.onTouchMove);

        // Remove ptr element and style tag
        ptrElement.parentNode.removeChild(ptrElement);

        // Enable setupEvents to run again
        _setup = false;

        // null object references
        handlers = null;
        ptrElement = null;
        _SETTINGS = {};
      }
    };
  }
};

module.exports = Pull;
