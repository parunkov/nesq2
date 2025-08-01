import {
  BoundingRect_default,
  CompoundPath_default,
  DEFAULT_FONT,
  DEFAULT_FONT_FAMILY,
  DEFAULT_PATH_STYLE,
  Eventful_default,
  Image_default,
  PathProxy_default,
  Path_default,
  REDRAW_BIT,
  TEXT_ALIGN_TO_ANCHOR,
  TSpan_default,
  __extends,
  adjustTextY,
  assert,
  brush,
  brushSingle,
  clone,
  copyTransform,
  createCanvasPattern,
  createCubicEasingFunc,
  createOrUpdateImage,
  devicePixelRatio,
  disableUserSelect,
  each,
  encodeBase64,
  encodeHTML,
  env_default,
  extend,
  filter,
  getCanvasGradient,
  getElementSSRData,
  getIdURL,
  getLineDash,
  getLineHeight,
  getMatrixStr,
  getPathPrecision,
  getSRTTransformString,
  getShadowKey,
  getSize,
  hasSeparateFont,
  hasShadow,
  indexOf,
  isAroundZero,
  isArray,
  isFunction,
  isGradient,
  isGradientObject,
  isImagePattern,
  isImagePatternObject,
  isLinearGradient,
  isNumber,
  isObject,
  isPattern,
  isRadialGradient,
  isString,
  keys,
  liftColor,
  logError,
  map,
  merge,
  noop,
  normalizeColor,
  parseFontSize,
  platformApi,
  requestAnimationFrame_default,
  retrieve2,
  round4
} from "./chunk-6GXF4SXL.js";
import "./chunk-PZ5AY32C.js";

// node_modules/zrender/lib/svg/SVGPathRebuilder.js
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;
var PI2 = Math.PI * 2;
var degree = 180 / PI;
var SVGPathRebuilder = function() {
  function SVGPathRebuilder2() {
  }
  SVGPathRebuilder2.prototype.reset = function(precision) {
    this._start = true;
    this._d = [];
    this._str = "";
    this._p = Math.pow(10, precision || 4);
  };
  SVGPathRebuilder2.prototype.moveTo = function(x, y) {
    this._add("M", x, y);
  };
  SVGPathRebuilder2.prototype.lineTo = function(x, y) {
    this._add("L", x, y);
  };
  SVGPathRebuilder2.prototype.bezierCurveTo = function(x, y, x2, y2, x3, y3) {
    this._add("C", x, y, x2, y2, x3, y3);
  };
  SVGPathRebuilder2.prototype.quadraticCurveTo = function(x, y, x2, y2) {
    this._add("Q", x, y, x2, y2);
  };
  SVGPathRebuilder2.prototype.arc = function(cx, cy, r, startAngle, endAngle, anticlockwise) {
    this.ellipse(cx, cy, r, r, 0, startAngle, endAngle, anticlockwise);
  };
  SVGPathRebuilder2.prototype.ellipse = function(cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise) {
    var dTheta = endAngle - startAngle;
    var clockwise = !anticlockwise;
    var dThetaPositive = Math.abs(dTheta);
    var isCircle = isAroundZero(dThetaPositive - PI2) || (clockwise ? dTheta >= PI2 : -dTheta >= PI2);
    var unifiedTheta = dTheta > 0 ? dTheta % PI2 : dTheta % PI2 + PI2;
    var large = false;
    if (isCircle) {
      large = true;
    } else if (isAroundZero(dThetaPositive)) {
      large = false;
    } else {
      large = unifiedTheta >= PI === !!clockwise;
    }
    var x0 = cx + rx * mathCos(startAngle);
    var y0 = cy + ry * mathSin(startAngle);
    if (this._start) {
      this._add("M", x0, y0);
    }
    var xRot = Math.round(psi * degree);
    if (isCircle) {
      var p = 1 / this._p;
      var dTheta_1 = (clockwise ? 1 : -1) * (PI2 - p);
      this._add("A", rx, ry, xRot, 1, +clockwise, cx + rx * mathCos(startAngle + dTheta_1), cy + ry * mathSin(startAngle + dTheta_1));
      if (p > 0.01) {
        this._add("A", rx, ry, xRot, 0, +clockwise, x0, y0);
      }
    } else {
      var x = cx + rx * mathCos(endAngle);
      var y = cy + ry * mathSin(endAngle);
      this._add("A", rx, ry, xRot, +large, +clockwise, x, y);
    }
  };
  SVGPathRebuilder2.prototype.rect = function(x, y, w, h) {
    this._add("M", x, y);
    this._add("l", w, 0);
    this._add("l", 0, h);
    this._add("l", -w, 0);
    this._add("Z");
  };
  SVGPathRebuilder2.prototype.closePath = function() {
    if (this._d.length > 0) {
      this._add("Z");
    }
  };
  SVGPathRebuilder2.prototype._add = function(cmd, a, b, c, d, e, f, g, h) {
    var vals = [];
    var p = this._p;
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      if (isNaN(val)) {
        this._invalid = true;
        return;
      }
      vals.push(Math.round(val * p) / p);
    }
    this._d.push(cmd + vals.join(" "));
    this._start = cmd === "Z";
  };
  SVGPathRebuilder2.prototype.generateStr = function() {
    this._str = this._invalid ? "" : this._d.join("");
    this._d = [];
  };
  SVGPathRebuilder2.prototype.getStr = function() {
    return this._str;
  };
  return SVGPathRebuilder2;
}();
var SVGPathRebuilder_default = SVGPathRebuilder;

// node_modules/zrender/lib/svg/mapStyleToAttrs.js
var NONE = "none";
var mathRound = Math.round;
function pathHasFill(style) {
  var fill = style.fill;
  return fill != null && fill !== NONE;
}
function pathHasStroke(style) {
  var stroke = style.stroke;
  return stroke != null && stroke !== NONE;
}
var strokeProps = ["lineCap", "miterLimit", "lineJoin"];
var svgStrokeProps = map(strokeProps, function(prop) {
  return "stroke-" + prop.toLowerCase();
});
function mapStyleToAttrs(updateAttr, style, el, forceUpdate) {
  var opacity = style.opacity == null ? 1 : style.opacity;
  if (el instanceof Image_default) {
    updateAttr("opacity", opacity);
    return;
  }
  if (pathHasFill(style)) {
    var fill = normalizeColor(style.fill);
    updateAttr("fill", fill.color);
    var fillOpacity = style.fillOpacity != null ? style.fillOpacity * fill.opacity * opacity : fill.opacity * opacity;
    if (forceUpdate || fillOpacity < 1) {
      updateAttr("fill-opacity", fillOpacity);
    }
  } else {
    updateAttr("fill", NONE);
  }
  if (pathHasStroke(style)) {
    var stroke = normalizeColor(style.stroke);
    updateAttr("stroke", stroke.color);
    var strokeScale = style.strokeNoScale ? el.getLineScale() : 1;
    var strokeWidth = strokeScale ? (style.lineWidth || 0) / strokeScale : 0;
    var strokeOpacity = style.strokeOpacity != null ? style.strokeOpacity * stroke.opacity * opacity : stroke.opacity * opacity;
    var strokeFirst = style.strokeFirst;
    if (forceUpdate || strokeWidth !== 1) {
      updateAttr("stroke-width", strokeWidth);
    }
    if (forceUpdate || strokeFirst) {
      updateAttr("paint-order", strokeFirst ? "stroke" : "fill");
    }
    if (forceUpdate || strokeOpacity < 1) {
      updateAttr("stroke-opacity", strokeOpacity);
    }
    if (style.lineDash) {
      var _a = getLineDash(el), lineDash = _a[0], lineDashOffset = _a[1];
      if (lineDash) {
        lineDashOffset = mathRound(lineDashOffset || 0);
        updateAttr("stroke-dasharray", lineDash.join(","));
        if (lineDashOffset || forceUpdate) {
          updateAttr("stroke-dashoffset", lineDashOffset);
        }
      }
    } else if (forceUpdate) {
      updateAttr("stroke-dasharray", NONE);
    }
    for (var i = 0; i < strokeProps.length; i++) {
      var propName = strokeProps[i];
      if (forceUpdate || style[propName] !== DEFAULT_PATH_STYLE[propName]) {
        var val = style[propName] || DEFAULT_PATH_STYLE[propName];
        val && updateAttr(svgStrokeProps[i], val);
      }
    }
  } else if (forceUpdate) {
    updateAttr("stroke", NONE);
  }
}

// node_modules/zrender/lib/svg/core.js
var SVGNS = "http://www.w3.org/2000/svg";
var XLINKNS = "http://www.w3.org/1999/xlink";
var XMLNS = "http://www.w3.org/2000/xmlns/";
var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
var META_DATA_PREFIX = "ecmeta_";
function createElement(name) {
  return document.createElementNS(SVGNS, name);
}
function createVNode(tag, key, attrs, children, text) {
  return {
    tag,
    attrs: attrs || {},
    children,
    text,
    key
  };
}
function createElementOpen(name, attrs) {
  var attrsStr = [];
  if (attrs) {
    for (var key in attrs) {
      var val = attrs[key];
      var part = key;
      if (val === false) {
        continue;
      } else if (val !== true && val != null) {
        part += '="' + val + '"';
      }
      attrsStr.push(part);
    }
  }
  return "<" + name + " " + attrsStr.join(" ") + ">";
}
function createElementClose(name) {
  return "</" + name + ">";
}
function vNodeToString(el, opts) {
  opts = opts || {};
  var S = opts.newline ? "\n" : "";
  function convertElToString(el2) {
    var children = el2.children, tag = el2.tag, attrs = el2.attrs, text = el2.text;
    return createElementOpen(tag, attrs) + (tag !== "style" ? encodeHTML(text) : text || "") + (children ? "" + S + map(children, function(child) {
      return convertElToString(child);
    }).join(S) + S : "") + createElementClose(tag);
  }
  return convertElToString(el);
}
function getCssString(selectorNodes, animationNodes, opts) {
  opts = opts || {};
  var S = opts.newline ? "\n" : "";
  var bracketBegin = " {" + S;
  var bracketEnd = S + "}";
  var selectors = map(keys(selectorNodes), function(className) {
    return className + bracketBegin + map(keys(selectorNodes[className]), function(attrName) {
      return attrName + ":" + selectorNodes[className][attrName] + ";";
    }).join(S) + bracketEnd;
  }).join(S);
  var animations = map(keys(animationNodes), function(animationName) {
    return "@keyframes " + animationName + bracketBegin + map(keys(animationNodes[animationName]), function(percent) {
      return percent + bracketBegin + map(keys(animationNodes[animationName][percent]), function(attrName) {
        var val = animationNodes[animationName][percent][attrName];
        if (attrName === "d") {
          val = 'path("' + val + '")';
        }
        return attrName + ":" + val + ";";
      }).join(S) + bracketEnd;
    }).join(S) + bracketEnd;
  }).join(S);
  if (!selectors && !animations) {
    return "";
  }
  return ["<![CDATA[", selectors, animations, "]]>"].join(S);
}
function createBrushScope(zrId) {
  return {
    zrId,
    shadowCache: {},
    patternCache: {},
    gradientCache: {},
    clipPathCache: {},
    defs: {},
    cssNodes: {},
    cssAnims: {},
    cssStyleCache: {},
    cssAnimIdx: 0,
    shadowIdx: 0,
    gradientIdx: 0,
    patternIdx: 0,
    clipPathIdx: 0
  };
}
function createSVGVNode(width, height, children, useViewBox) {
  return createVNode("svg", "root", {
    "width": width,
    "height": height,
    "xmlns": SVGNS,
    "xmlns:xlink": XLINKNS,
    "version": "1.1",
    "baseProfile": "full",
    "viewBox": useViewBox ? "0 0 " + width + " " + height : false
  }, children);
}

// node_modules/zrender/lib/svg/cssClassId.js
var cssClassIdx = 0;
function getClassId() {
  return cssClassIdx++;
}

// node_modules/zrender/lib/svg/cssAnimation.js
var EASING_MAP = {
  cubicIn: "0.32,0,0.67,0",
  cubicOut: "0.33,1,0.68,1",
  cubicInOut: "0.65,0,0.35,1",
  quadraticIn: "0.11,0,0.5,0",
  quadraticOut: "0.5,1,0.89,1",
  quadraticInOut: "0.45,0,0.55,1",
  quarticIn: "0.5,0,0.75,0",
  quarticOut: "0.25,1,0.5,1",
  quarticInOut: "0.76,0,0.24,1",
  quinticIn: "0.64,0,0.78,0",
  quinticOut: "0.22,1,0.36,1",
  quinticInOut: "0.83,0,0.17,1",
  sinusoidalIn: "0.12,0,0.39,0",
  sinusoidalOut: "0.61,1,0.88,1",
  sinusoidalInOut: "0.37,0,0.63,1",
  exponentialIn: "0.7,0,0.84,0",
  exponentialOut: "0.16,1,0.3,1",
  exponentialInOut: "0.87,0,0.13,1",
  circularIn: "0.55,0,1,0.45",
  circularOut: "0,0.55,0.45,1",
  circularInOut: "0.85,0,0.15,1"
};
var transformOriginKey = "transform-origin";
function buildPathString(el, kfShape, path) {
  var shape = extend({}, el.shape);
  extend(shape, kfShape);
  el.buildPath(path, shape);
  var svgPathBuilder = new SVGPathRebuilder_default();
  svgPathBuilder.reset(getPathPrecision(el));
  path.rebuildPath(svgPathBuilder, 1);
  svgPathBuilder.generateStr();
  return svgPathBuilder.getStr();
}
function setTransformOrigin(target, transform) {
  var originX = transform.originX, originY = transform.originY;
  if (originX || originY) {
    target[transformOriginKey] = originX + "px " + originY + "px";
  }
}
var ANIMATE_STYLE_MAP = {
  fill: "fill",
  opacity: "opacity",
  lineWidth: "stroke-width",
  lineDashOffset: "stroke-dashoffset"
};
function addAnimation(cssAnim, scope) {
  var animationName = scope.zrId + "-ani-" + scope.cssAnimIdx++;
  scope.cssAnims[animationName] = cssAnim;
  return animationName;
}
function createCompoundPathCSSAnimation(el, attrs, scope) {
  var paths = el.shape.paths;
  var composedAnim = {};
  var cssAnimationCfg;
  var cssAnimationName;
  each(paths, function(path) {
    var subScope = createBrushScope(scope.zrId);
    subScope.animation = true;
    createCSSAnimation(path, {}, subScope, true);
    var cssAnims = subScope.cssAnims;
    var cssNodes = subScope.cssNodes;
    var animNames = keys(cssAnims);
    var len = animNames.length;
    if (!len) {
      return;
    }
    cssAnimationName = animNames[len - 1];
    var lastAnim = cssAnims[cssAnimationName];
    for (var percent in lastAnim) {
      var kf = lastAnim[percent];
      composedAnim[percent] = composedAnim[percent] || { d: "" };
      composedAnim[percent].d += kf.d || "";
    }
    for (var className in cssNodes) {
      var val = cssNodes[className].animation;
      if (val.indexOf(cssAnimationName) >= 0) {
        cssAnimationCfg = val;
      }
    }
  });
  if (!cssAnimationCfg) {
    return;
  }
  attrs.d = false;
  var animationName = addAnimation(composedAnim, scope);
  return cssAnimationCfg.replace(cssAnimationName, animationName);
}
function getEasingFunc(easing) {
  return isString(easing) ? EASING_MAP[easing] ? "cubic-bezier(" + EASING_MAP[easing] + ")" : createCubicEasingFunc(easing) ? easing : "" : "";
}
function createCSSAnimation(el, attrs, scope, onlyShape) {
  var animators = el.animators;
  var len = animators.length;
  var cssAnimations = [];
  if (el instanceof CompoundPath_default) {
    var animationCfg = createCompoundPathCSSAnimation(el, attrs, scope);
    if (animationCfg) {
      cssAnimations.push(animationCfg);
    } else if (!len) {
      return;
    }
  } else if (!len) {
    return;
  }
  var groupAnimators = {};
  for (var i = 0; i < len; i++) {
    var animator = animators[i];
    var cfgArr = [animator.getMaxTime() / 1e3 + "s"];
    var easing = getEasingFunc(animator.getClip().easing);
    var delay = animator.getDelay();
    if (easing) {
      cfgArr.push(easing);
    } else {
      cfgArr.push("linear");
    }
    if (delay) {
      cfgArr.push(delay / 1e3 + "s");
    }
    if (animator.getLoop()) {
      cfgArr.push("infinite");
    }
    var cfg = cfgArr.join(" ");
    groupAnimators[cfg] = groupAnimators[cfg] || [cfg, []];
    groupAnimators[cfg][1].push(animator);
  }
  function createSingleCSSAnimation(groupAnimator) {
    var animators2 = groupAnimator[1];
    var len2 = animators2.length;
    var transformKfs = {};
    var shapeKfs = {};
    var finalKfs = {};
    var animationTimingFunctionAttrName = "animation-timing-function";
    function saveAnimatorTrackToCssKfs(animator3, cssKfs, toCssAttrName) {
      var tracks = animator3.getTracks();
      var maxTime = animator3.getMaxTime();
      for (var k = 0; k < tracks.length; k++) {
        var track = tracks[k];
        if (track.needsAnimate()) {
          var kfs = track.keyframes;
          var attrName = track.propName;
          toCssAttrName && (attrName = toCssAttrName(attrName));
          if (attrName) {
            for (var i3 = 0; i3 < kfs.length; i3++) {
              var kf = kfs[i3];
              var percent2 = Math.round(kf.time / maxTime * 100) + "%";
              var kfEasing = getEasingFunc(kf.easing);
              var rawValue = kf.rawValue;
              if (isString(rawValue) || isNumber(rawValue)) {
                cssKfs[percent2] = cssKfs[percent2] || {};
                cssKfs[percent2][attrName] = kf.rawValue;
                if (kfEasing) {
                  cssKfs[percent2][animationTimingFunctionAttrName] = kfEasing;
                }
              }
            }
          }
        }
      }
    }
    for (var i2 = 0; i2 < len2; i2++) {
      var animator2 = animators2[i2];
      var targetProp = animator2.targetName;
      if (!targetProp) {
        !onlyShape && saveAnimatorTrackToCssKfs(animator2, transformKfs);
      } else if (targetProp === "shape") {
        saveAnimatorTrackToCssKfs(animator2, shapeKfs);
      }
    }
    for (var percent in transformKfs) {
      var transform = {};
      copyTransform(transform, el);
      extend(transform, transformKfs[percent]);
      var str = getSRTTransformString(transform);
      var timingFunction = transformKfs[percent][animationTimingFunctionAttrName];
      finalKfs[percent] = str ? {
        transform: str
      } : {};
      setTransformOrigin(finalKfs[percent], transform);
      if (timingFunction) {
        finalKfs[percent][animationTimingFunctionAttrName] = timingFunction;
      }
    }
    ;
    var path;
    var canAnimateShape = true;
    for (var percent in shapeKfs) {
      finalKfs[percent] = finalKfs[percent] || {};
      var isFirst = !path;
      var timingFunction = shapeKfs[percent][animationTimingFunctionAttrName];
      if (isFirst) {
        path = new PathProxy_default();
      }
      var len_1 = path.len();
      path.reset();
      finalKfs[percent].d = buildPathString(el, shapeKfs[percent], path);
      var newLen = path.len();
      if (!isFirst && len_1 !== newLen) {
        canAnimateShape = false;
        break;
      }
      if (timingFunction) {
        finalKfs[percent][animationTimingFunctionAttrName] = timingFunction;
      }
    }
    ;
    if (!canAnimateShape) {
      for (var percent in finalKfs) {
        delete finalKfs[percent].d;
      }
    }
    if (!onlyShape) {
      for (var i2 = 0; i2 < len2; i2++) {
        var animator2 = animators2[i2];
        var targetProp = animator2.targetName;
        if (targetProp === "style") {
          saveAnimatorTrackToCssKfs(animator2, finalKfs, function(propName) {
            return ANIMATE_STYLE_MAP[propName];
          });
        }
      }
    }
    var percents = keys(finalKfs);
    var allTransformOriginSame = true;
    var transformOrigin;
    for (var i2 = 1; i2 < percents.length; i2++) {
      var p0 = percents[i2 - 1];
      var p1 = percents[i2];
      if (finalKfs[p0][transformOriginKey] !== finalKfs[p1][transformOriginKey]) {
        allTransformOriginSame = false;
        break;
      }
      transformOrigin = finalKfs[p0][transformOriginKey];
    }
    if (allTransformOriginSame && transformOrigin) {
      for (var percent in finalKfs) {
        if (finalKfs[percent][transformOriginKey]) {
          delete finalKfs[percent][transformOriginKey];
        }
      }
      attrs[transformOriginKey] = transformOrigin;
    }
    if (filter(percents, function(percent2) {
      return keys(finalKfs[percent2]).length > 0;
    }).length) {
      var animationName = addAnimation(finalKfs, scope);
      return animationName + " " + groupAnimator[0] + " both";
    }
  }
  for (var key in groupAnimators) {
    var animationCfg = createSingleCSSAnimation(groupAnimators[key]);
    if (animationCfg) {
      cssAnimations.push(animationCfg);
    }
  }
  if (cssAnimations.length) {
    var className = scope.zrId + "-cls-" + getClassId();
    scope.cssNodes["." + className] = {
      animation: cssAnimations.join(",")
    };
    attrs["class"] = className;
  }
}

// node_modules/zrender/lib/svg/cssEmphasis.js
function createCSSEmphasis(el, attrs, scope) {
  if (!el.ignore) {
    if (el.isSilent()) {
      var style = {
        "pointer-events": "none"
      };
      setClassAttribute(style, attrs, scope, true);
    } else {
      var emphasisStyle = el.states.emphasis && el.states.emphasis.style ? el.states.emphasis.style : {};
      var fill = emphasisStyle.fill;
      if (!fill) {
        var normalFill = el.style && el.style.fill;
        var selectFill = el.states.select && el.states.select.style && el.states.select.style.fill;
        var fromFill = el.currentStates.indexOf("select") >= 0 ? selectFill || normalFill : normalFill;
        if (fromFill) {
          fill = liftColor(fromFill);
        }
      }
      var lineWidth = emphasisStyle.lineWidth;
      if (lineWidth) {
        var scaleX = !emphasisStyle.strokeNoScale && el.transform ? el.transform[0] : 1;
        lineWidth = lineWidth / scaleX;
      }
      var style = {
        cursor: "pointer"
      };
      if (fill) {
        style.fill = fill;
      }
      if (emphasisStyle.stroke) {
        style.stroke = emphasisStyle.stroke;
      }
      if (lineWidth) {
        style["stroke-width"] = lineWidth;
      }
      setClassAttribute(style, attrs, scope, true);
    }
  }
}
function setClassAttribute(style, attrs, scope, withHover) {
  var styleKey = JSON.stringify(style);
  var className = scope.cssStyleCache[styleKey];
  if (!className) {
    className = scope.zrId + "-cls-" + getClassId();
    scope.cssStyleCache[styleKey] = className;
    scope.cssNodes["." + className + (withHover ? ":hover" : "")] = style;
  }
  attrs["class"] = attrs["class"] ? attrs["class"] + " " + className : className;
}

// node_modules/zrender/lib/svg/graphic.js
var round = Math.round;
function isImageLike(val) {
  return val && isString(val.src);
}
function isCanvasLike(val) {
  return val && isFunction(val.toDataURL);
}
function setStyleAttrs(attrs, style, el, scope) {
  mapStyleToAttrs(function(key, val) {
    var isFillStroke = key === "fill" || key === "stroke";
    if (isFillStroke && isGradient(val)) {
      setGradient(style, attrs, key, scope);
    } else if (isFillStroke && isPattern(val)) {
      setPattern(el, attrs, key, scope);
    } else {
      attrs[key] = val;
    }
    if (isFillStroke && scope.ssr && val === "none") {
      attrs["pointer-events"] = "visible";
    }
  }, style, el, false);
  setShadow(el, attrs, scope);
}
function setMetaData(attrs, el) {
  var metaData = getElementSSRData(el);
  if (metaData) {
    metaData.each(function(val, key) {
      val != null && (attrs[(META_DATA_PREFIX + key).toLowerCase()] = val + "");
    });
    if (el.isSilent()) {
      attrs[META_DATA_PREFIX + "silent"] = "true";
    }
  }
}
function noRotateScale(m) {
  return isAroundZero(m[0] - 1) && isAroundZero(m[1]) && isAroundZero(m[2]) && isAroundZero(m[3] - 1);
}
function noTranslate(m) {
  return isAroundZero(m[4]) && isAroundZero(m[5]);
}
function setTransform(attrs, m, compress) {
  if (m && !(noTranslate(m) && noRotateScale(m))) {
    var mul = compress ? 10 : 1e4;
    attrs.transform = noRotateScale(m) ? "translate(" + round(m[4] * mul) / mul + " " + round(m[5] * mul) / mul + ")" : getMatrixStr(m);
  }
}
function convertPolyShape(shape, attrs, mul) {
  var points = shape.points;
  var strArr = [];
  for (var i = 0; i < points.length; i++) {
    strArr.push(round(points[i][0] * mul) / mul);
    strArr.push(round(points[i][1] * mul) / mul);
  }
  attrs.points = strArr.join(" ");
}
function validatePolyShape(shape) {
  return !shape.smooth;
}
function createAttrsConvert(desc) {
  var normalizedDesc = map(desc, function(item) {
    return typeof item === "string" ? [item, item] : item;
  });
  return function(shape, attrs, mul) {
    for (var i = 0; i < normalizedDesc.length; i++) {
      var item = normalizedDesc[i];
      var val = shape[item[0]];
      if (val != null) {
        attrs[item[1]] = round(val * mul) / mul;
      }
    }
  };
}
var builtinShapesDef = {
  circle: [createAttrsConvert(["cx", "cy", "r"])],
  polyline: [convertPolyShape, validatePolyShape],
  polygon: [convertPolyShape, validatePolyShape]
};
function hasShapeAnimation(el) {
  var animators = el.animators;
  for (var i = 0; i < animators.length; i++) {
    if (animators[i].targetName === "shape") {
      return true;
    }
  }
  return false;
}
function brushSVGPath(el, scope) {
  var style = el.style;
  var shape = el.shape;
  var builtinShpDef = builtinShapesDef[el.type];
  var attrs = {};
  var needsAnimate = scope.animation;
  var svgElType = "path";
  var strokePercent = el.style.strokePercent;
  var precision = scope.compress && getPathPrecision(el) || 4;
  if (builtinShpDef && !scope.willUpdate && !(builtinShpDef[1] && !builtinShpDef[1](shape)) && !(needsAnimate && hasShapeAnimation(el)) && !(strokePercent < 1)) {
    svgElType = el.type;
    var mul = Math.pow(10, precision);
    builtinShpDef[0](shape, attrs, mul);
  } else {
    var needBuildPath = !el.path || el.shapeChanged();
    if (!el.path) {
      el.createPathProxy();
    }
    var path = el.path;
    if (needBuildPath) {
      path.beginPath();
      el.buildPath(path, el.shape);
      el.pathUpdated();
    }
    var pathVersion = path.getVersion();
    var elExt = el;
    var svgPathBuilder = elExt.__svgPathBuilder;
    if (elExt.__svgPathVersion !== pathVersion || !svgPathBuilder || strokePercent !== elExt.__svgPathStrokePercent) {
      if (!svgPathBuilder) {
        svgPathBuilder = elExt.__svgPathBuilder = new SVGPathRebuilder_default();
      }
      svgPathBuilder.reset(precision);
      path.rebuildPath(svgPathBuilder, strokePercent);
      svgPathBuilder.generateStr();
      elExt.__svgPathVersion = pathVersion;
      elExt.__svgPathStrokePercent = strokePercent;
    }
    attrs.d = svgPathBuilder.getStr();
  }
  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, style, el, scope);
  setMetaData(attrs, el);
  scope.animation && createCSSAnimation(el, attrs, scope);
  scope.emphasis && createCSSEmphasis(el, attrs, scope);
  return createVNode(svgElType, el.id + "", attrs);
}
function brushSVGImage(el, scope) {
  var style = el.style;
  var image = style.image;
  if (image && !isString(image)) {
    if (isImageLike(image)) {
      image = image.src;
    } else if (isCanvasLike(image)) {
      image = image.toDataURL();
    }
  }
  if (!image) {
    return;
  }
  var x = style.x || 0;
  var y = style.y || 0;
  var dw = style.width;
  var dh = style.height;
  var attrs = {
    href: image,
    width: dw,
    height: dh
  };
  if (x) {
    attrs.x = x;
  }
  if (y) {
    attrs.y = y;
  }
  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, style, el, scope);
  setMetaData(attrs, el);
  scope.animation && createCSSAnimation(el, attrs, scope);
  return createVNode("image", el.id + "", attrs);
}
function brushSVGTSpan(el, scope) {
  var style = el.style;
  var text = style.text;
  text != null && (text += "");
  if (!text || isNaN(style.x) || isNaN(style.y)) {
    return;
  }
  var font = style.font || DEFAULT_FONT;
  var x = style.x || 0;
  var y = adjustTextY(style.y || 0, getLineHeight(font), style.textBaseline);
  var textAlign = TEXT_ALIGN_TO_ANCHOR[style.textAlign] || style.textAlign;
  var attrs = {
    "dominant-baseline": "central",
    "text-anchor": textAlign
  };
  if (hasSeparateFont(style)) {
    var separatedFontStr = "";
    var fontStyle = style.fontStyle;
    var fontSize = parseFontSize(style.fontSize);
    if (!parseFloat(fontSize)) {
      return;
    }
    var fontFamily = style.fontFamily || DEFAULT_FONT_FAMILY;
    var fontWeight = style.fontWeight;
    separatedFontStr += "font-size:" + fontSize + ";font-family:" + fontFamily + ";";
    if (fontStyle && fontStyle !== "normal") {
      separatedFontStr += "font-style:" + fontStyle + ";";
    }
    if (fontWeight && fontWeight !== "normal") {
      separatedFontStr += "font-weight:" + fontWeight + ";";
    }
    attrs.style = separatedFontStr;
  } else {
    attrs.style = "font: " + font;
  }
  if (text.match(/\s/)) {
    attrs["xml:space"] = "preserve";
  }
  if (x) {
    attrs.x = x;
  }
  if (y) {
    attrs.y = y;
  }
  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, style, el, scope);
  setMetaData(attrs, el);
  scope.animation && createCSSAnimation(el, attrs, scope);
  return createVNode("text", el.id + "", attrs, void 0, text);
}
function brush2(el, scope) {
  if (el instanceof Path_default) {
    return brushSVGPath(el, scope);
  } else if (el instanceof Image_default) {
    return brushSVGImage(el, scope);
  } else if (el instanceof TSpan_default) {
    return brushSVGTSpan(el, scope);
  }
}
function setShadow(el, attrs, scope) {
  var style = el.style;
  if (hasShadow(style)) {
    var shadowKey = getShadowKey(el);
    var shadowCache = scope.shadowCache;
    var shadowId = shadowCache[shadowKey];
    if (!shadowId) {
      var globalScale = el.getGlobalScale();
      var scaleX = globalScale[0];
      var scaleY = globalScale[1];
      if (!scaleX || !scaleY) {
        return;
      }
      var offsetX = style.shadowOffsetX || 0;
      var offsetY = style.shadowOffsetY || 0;
      var blur_1 = style.shadowBlur;
      var _a = normalizeColor(style.shadowColor), opacity = _a.opacity, color = _a.color;
      var stdDx = blur_1 / 2 / scaleX;
      var stdDy = blur_1 / 2 / scaleY;
      var stdDeviation = stdDx + " " + stdDy;
      shadowId = scope.zrId + "-s" + scope.shadowIdx++;
      scope.defs[shadowId] = createVNode("filter", shadowId, {
        "id": shadowId,
        "x": "-100%",
        "y": "-100%",
        "width": "300%",
        "height": "300%"
      }, [
        createVNode("feDropShadow", "", {
          "dx": offsetX / scaleX,
          "dy": offsetY / scaleY,
          "stdDeviation": stdDeviation,
          "flood-color": color,
          "flood-opacity": opacity
        })
      ]);
      shadowCache[shadowKey] = shadowId;
    }
    attrs.filter = getIdURL(shadowId);
  }
}
function setGradient(style, attrs, target, scope) {
  var val = style[target];
  var gradientTag;
  var gradientAttrs = {
    "gradientUnits": val.global ? "userSpaceOnUse" : "objectBoundingBox"
  };
  if (isLinearGradient(val)) {
    gradientTag = "linearGradient";
    gradientAttrs.x1 = val.x;
    gradientAttrs.y1 = val.y;
    gradientAttrs.x2 = val.x2;
    gradientAttrs.y2 = val.y2;
  } else if (isRadialGradient(val)) {
    gradientTag = "radialGradient";
    gradientAttrs.cx = retrieve2(val.x, 0.5);
    gradientAttrs.cy = retrieve2(val.y, 0.5);
    gradientAttrs.r = retrieve2(val.r, 0.5);
  } else {
    if (true) {
      logError("Illegal gradient type.");
    }
    return;
  }
  var colors = val.colorStops;
  var colorStops = [];
  for (var i = 0, len = colors.length; i < len; ++i) {
    var offset = round4(colors[i].offset) * 100 + "%";
    var stopColor = colors[i].color;
    var _a = normalizeColor(stopColor), color = _a.color, opacity = _a.opacity;
    var stopsAttrs = {
      "offset": offset
    };
    stopsAttrs["stop-color"] = color;
    if (opacity < 1) {
      stopsAttrs["stop-opacity"] = opacity;
    }
    colorStops.push(createVNode("stop", i + "", stopsAttrs));
  }
  var gradientVNode = createVNode(gradientTag, "", gradientAttrs, colorStops);
  var gradientKey = vNodeToString(gradientVNode);
  var gradientCache = scope.gradientCache;
  var gradientId = gradientCache[gradientKey];
  if (!gradientId) {
    gradientId = scope.zrId + "-g" + scope.gradientIdx++;
    gradientCache[gradientKey] = gradientId;
    gradientAttrs.id = gradientId;
    scope.defs[gradientId] = createVNode(gradientTag, gradientId, gradientAttrs, colorStops);
  }
  attrs[target] = getIdURL(gradientId);
}
function setPattern(el, attrs, target, scope) {
  var val = el.style[target];
  var boundingRect = el.getBoundingRect();
  var patternAttrs = {};
  var repeat = val.repeat;
  var noRepeat = repeat === "no-repeat";
  var repeatX = repeat === "repeat-x";
  var repeatY = repeat === "repeat-y";
  var child;
  if (isImagePattern(val)) {
    var imageWidth_1 = val.imageWidth;
    var imageHeight_1 = val.imageHeight;
    var imageSrc = void 0;
    var patternImage = val.image;
    if (isString(patternImage)) {
      imageSrc = patternImage;
    } else if (isImageLike(patternImage)) {
      imageSrc = patternImage.src;
    } else if (isCanvasLike(patternImage)) {
      imageSrc = patternImage.toDataURL();
    }
    if (typeof Image === "undefined") {
      var errMsg = "Image width/height must been given explictly in svg-ssr renderer.";
      assert(imageWidth_1, errMsg);
      assert(imageHeight_1, errMsg);
    } else if (imageWidth_1 == null || imageHeight_1 == null) {
      var setSizeToVNode_1 = function(vNode, img) {
        if (vNode) {
          var svgEl = vNode.elm;
          var width = imageWidth_1 || img.width;
          var height = imageHeight_1 || img.height;
          if (vNode.tag === "pattern") {
            if (repeatX) {
              height = 1;
              width /= boundingRect.width;
            } else if (repeatY) {
              width = 1;
              height /= boundingRect.height;
            }
          }
          vNode.attrs.width = width;
          vNode.attrs.height = height;
          if (svgEl) {
            svgEl.setAttribute("width", width);
            svgEl.setAttribute("height", height);
          }
        }
      };
      var createdImage = createOrUpdateImage(imageSrc, null, el, function(img) {
        noRepeat || setSizeToVNode_1(patternVNode, img);
        setSizeToVNode_1(child, img);
      });
      if (createdImage && createdImage.width && createdImage.height) {
        imageWidth_1 = imageWidth_1 || createdImage.width;
        imageHeight_1 = imageHeight_1 || createdImage.height;
      }
    }
    child = createVNode("image", "img", {
      href: imageSrc,
      width: imageWidth_1,
      height: imageHeight_1
    });
    patternAttrs.width = imageWidth_1;
    patternAttrs.height = imageHeight_1;
  } else if (val.svgElement) {
    child = clone(val.svgElement);
    patternAttrs.width = val.svgWidth;
    patternAttrs.height = val.svgHeight;
  }
  if (!child) {
    return;
  }
  var patternWidth;
  var patternHeight;
  if (noRepeat) {
    patternWidth = patternHeight = 1;
  } else if (repeatX) {
    patternHeight = 1;
    patternWidth = patternAttrs.width / boundingRect.width;
  } else if (repeatY) {
    patternWidth = 1;
    patternHeight = patternAttrs.height / boundingRect.height;
  } else {
    patternAttrs.patternUnits = "userSpaceOnUse";
  }
  if (patternWidth != null && !isNaN(patternWidth)) {
    patternAttrs.width = patternWidth;
  }
  if (patternHeight != null && !isNaN(patternHeight)) {
    patternAttrs.height = patternHeight;
  }
  var patternTransform = getSRTTransformString(val);
  patternTransform && (patternAttrs.patternTransform = patternTransform);
  var patternVNode = createVNode("pattern", "", patternAttrs, [child]);
  var patternKey = vNodeToString(patternVNode);
  var patternCache = scope.patternCache;
  var patternId = patternCache[patternKey];
  if (!patternId) {
    patternId = scope.zrId + "-p" + scope.patternIdx++;
    patternCache[patternKey] = patternId;
    patternAttrs.id = patternId;
    patternVNode = scope.defs[patternId] = createVNode("pattern", patternId, patternAttrs, [child]);
  }
  attrs[target] = getIdURL(patternId);
}
function setClipPath(clipPath, attrs, scope) {
  var clipPathCache = scope.clipPathCache, defs = scope.defs;
  var clipPathId = clipPathCache[clipPath.id];
  if (!clipPathId) {
    clipPathId = scope.zrId + "-c" + scope.clipPathIdx++;
    var clipPathAttrs = {
      id: clipPathId
    };
    clipPathCache[clipPath.id] = clipPathId;
    defs[clipPathId] = createVNode("clipPath", clipPathId, clipPathAttrs, [brushSVGPath(clipPath, scope)]);
  }
  attrs["clip-path"] = getIdURL(clipPathId);
}

// node_modules/zrender/lib/svg/domapi.js
function createTextNode(text) {
  return document.createTextNode(text);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function setTextContent(node, text) {
  node.textContent = text;
}

// node_modules/zrender/lib/svg/patch.js
var colonChar = 58;
var xChar = 120;
var emptyNode = createVNode("", "");
function isUndef(s) {
  return s === void 0;
}
function isDef(s) {
  return s !== void 0;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var map2 = {};
  for (var i = beginIdx; i <= endIdx; ++i) {
    var key = children[i].key;
    if (key !== void 0) {
      if (true) {
        if (map2[key] != null) {
          console.error("Duplicate key " + key);
        }
      }
      map2[key] = i;
    }
  }
  return map2;
}
function sameVnode(vnode1, vnode2) {
  var isSameKey = vnode1.key === vnode2.key;
  var isSameTag = vnode1.tag === vnode2.tag;
  return isSameTag && isSameKey;
}
function createElm(vnode) {
  var i;
  var children = vnode.children;
  var tag = vnode.tag;
  if (isDef(tag)) {
    var elm = vnode.elm = createElement(tag);
    updateAttrs(emptyNode, vnode);
    if (isArray(children)) {
      for (i = 0; i < children.length; ++i) {
        var ch = children[i];
        if (ch != null) {
          appendChild(elm, createElm(ch));
        }
      }
    } else if (isDef(vnode.text) && !isObject(vnode.text)) {
      appendChild(elm, createTextNode(vnode.text));
    }
  } else {
    vnode.elm = createTextNode(vnode.text);
  }
  return vnode.elm;
}
function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    if (ch != null) {
      insertBefore(parentElm, createElm(ch), before);
    }
  }
}
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    if (ch != null) {
      if (isDef(ch.tag)) {
        var parent_1 = parentNode(ch.elm);
        removeChild(parent_1, ch.elm);
      } else {
        removeChild(parentElm, ch.elm);
      }
    }
  }
}
function updateAttrs(oldVnode, vnode) {
  var key;
  var elm = vnode.elm;
  var oldAttrs = oldVnode && oldVnode.attrs || {};
  var attrs = vnode.attrs || {};
  if (oldAttrs === attrs) {
    return;
  }
  for (key in attrs) {
    var cur = attrs[key];
    var old = oldAttrs[key];
    if (old !== cur) {
      if (cur === true) {
        elm.setAttribute(key, "");
      } else if (cur === false) {
        elm.removeAttribute(key);
      } else {
        if (key === "style") {
          elm.style.cssText = cur;
        } else if (key.charCodeAt(0) !== xChar) {
          elm.setAttribute(key, cur);
        } else if (key === "xmlns:xlink" || key === "xmlns") {
          elm.setAttributeNS(XMLNS, key, cur);
        } else if (key.charCodeAt(3) === colonChar) {
          elm.setAttributeNS(XML_NAMESPACE, key, cur);
        } else if (key.charCodeAt(5) === colonChar) {
          elm.setAttributeNS(XLINKNS, key, cur);
        } else {
          elm.setAttribute(key, cur);
        }
      }
    }
  }
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}
function updateChildren(parentElm, oldCh, newCh) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newEndIdx];
  var oldKeyToIdx;
  var idxInOld;
  var elmToMove;
  var before;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      insertBefore(parentElm, oldStartVnode.elm, nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (isUndef(idxInOld)) {
        insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
      } else {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.tag !== newStartVnode.tag) {
          insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
        } else {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = void 0;
          insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
    } else {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
}
function patchVnode(oldVnode, vnode) {
  var elm = vnode.elm = oldVnode.elm;
  var oldCh = oldVnode.children;
  var ch = vnode.children;
  if (oldVnode === vnode) {
    return;
  }
  updateAttrs(oldVnode, vnode);
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) {
        updateChildren(elm, oldCh, ch);
      }
    } else if (isDef(ch)) {
      if (isDef(oldVnode.text)) {
        setTextContent(elm, "");
      }
      addVnodes(elm, null, ch, 0, ch.length - 1);
    } else if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      setTextContent(elm, "");
    }
  } else if (oldVnode.text !== vnode.text) {
    if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    }
    setTextContent(elm, vnode.text);
  }
}
function patch(oldVnode, vnode) {
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode);
  } else {
    var elm = oldVnode.elm;
    var parent_2 = parentNode(elm);
    createElm(vnode);
    if (parent_2 !== null) {
      insertBefore(parent_2, vnode.elm, nextSibling(elm));
      removeVnodes(parent_2, [oldVnode], 0, 0);
    }
  }
  return vnode;
}

// node_modules/zrender/lib/svg/Painter.js
var svgId = 0;
var SVGPainter = function() {
  function SVGPainter2(root, storage, opts) {
    this.type = "svg";
    this.refreshHover = createMethodNotSupport("refreshHover");
    this.configLayer = createMethodNotSupport("configLayer");
    this.storage = storage;
    this._opts = opts = extend({}, opts);
    this.root = root;
    this._id = "zr" + svgId++;
    this._oldVNode = createSVGVNode(opts.width, opts.height);
    if (root && !opts.ssr) {
      var viewport = this._viewport = document.createElement("div");
      viewport.style.cssText = "position:relative;overflow:hidden";
      var svgDom = this._svgDom = this._oldVNode.elm = createElement("svg");
      updateAttrs(null, this._oldVNode);
      viewport.appendChild(svgDom);
      root.appendChild(viewport);
    }
    this.resize(opts.width, opts.height);
  }
  SVGPainter2.prototype.getType = function() {
    return this.type;
  };
  SVGPainter2.prototype.getViewportRoot = function() {
    return this._viewport;
  };
  SVGPainter2.prototype.getViewportRootOffset = function() {
    var viewportRoot = this.getViewportRoot();
    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  };
  SVGPainter2.prototype.getSvgDom = function() {
    return this._svgDom;
  };
  SVGPainter2.prototype.refresh = function() {
    if (this.root) {
      var vnode = this.renderToVNode({
        willUpdate: true
      });
      vnode.attrs.style = "position:absolute;left:0;top:0;user-select:none";
      patch(this._oldVNode, vnode);
      this._oldVNode = vnode;
    }
  };
  SVGPainter2.prototype.renderOneToVNode = function(el) {
    return brush2(el, createBrushScope(this._id));
  };
  SVGPainter2.prototype.renderToVNode = function(opts) {
    opts = opts || {};
    var list = this.storage.getDisplayList(true);
    var width = this._width;
    var height = this._height;
    var scope = createBrushScope(this._id);
    scope.animation = opts.animation;
    scope.willUpdate = opts.willUpdate;
    scope.compress = opts.compress;
    scope.emphasis = opts.emphasis;
    scope.ssr = this._opts.ssr;
    var children = [];
    var bgVNode = this._bgVNode = createBackgroundVNode(width, height, this._backgroundColor, scope);
    bgVNode && children.push(bgVNode);
    var mainVNode = !opts.compress ? this._mainVNode = createVNode("g", "main", {}, []) : null;
    this._paintList(list, scope, mainVNode ? mainVNode.children : children);
    mainVNode && children.push(mainVNode);
    var defs = map(keys(scope.defs), function(id) {
      return scope.defs[id];
    });
    if (defs.length) {
      children.push(createVNode("defs", "defs", {}, defs));
    }
    if (opts.animation) {
      var animationCssStr = getCssString(scope.cssNodes, scope.cssAnims, { newline: true });
      if (animationCssStr) {
        var styleNode = createVNode("style", "stl", {}, [], animationCssStr);
        children.push(styleNode);
      }
    }
    return createSVGVNode(width, height, children, opts.useViewBox);
  };
  SVGPainter2.prototype.renderToString = function(opts) {
    opts = opts || {};
    return vNodeToString(this.renderToVNode({
      animation: retrieve2(opts.cssAnimation, true),
      emphasis: retrieve2(opts.cssEmphasis, true),
      willUpdate: false,
      compress: true,
      useViewBox: retrieve2(opts.useViewBox, true)
    }), { newline: true });
  };
  SVGPainter2.prototype.setBackgroundColor = function(backgroundColor) {
    this._backgroundColor = backgroundColor;
  };
  SVGPainter2.prototype.getSvgRoot = function() {
    return this._mainVNode && this._mainVNode.elm;
  };
  SVGPainter2.prototype._paintList = function(list, scope, out) {
    var listLen = list.length;
    var clipPathsGroupsStack = [];
    var clipPathsGroupsStackDepth = 0;
    var currentClipPathGroup;
    var prevClipPaths;
    var clipGroupNodeIdx = 0;
    for (var i = 0; i < listLen; i++) {
      var displayable = list[i];
      if (!displayable.invisible) {
        var clipPaths = displayable.__clipPaths;
        var len = clipPaths && clipPaths.length || 0;
        var prevLen = prevClipPaths && prevClipPaths.length || 0;
        var lca = void 0;
        for (lca = Math.max(len - 1, prevLen - 1); lca >= 0; lca--) {
          if (clipPaths && prevClipPaths && clipPaths[lca] === prevClipPaths[lca]) {
            break;
          }
        }
        for (var i_1 = prevLen - 1; i_1 > lca; i_1--) {
          clipPathsGroupsStackDepth--;
          currentClipPathGroup = clipPathsGroupsStack[clipPathsGroupsStackDepth - 1];
        }
        for (var i_2 = lca + 1; i_2 < len; i_2++) {
          var groupAttrs = {};
          setClipPath(clipPaths[i_2], groupAttrs, scope);
          var g = createVNode("g", "clip-g-" + clipGroupNodeIdx++, groupAttrs, []);
          (currentClipPathGroup ? currentClipPathGroup.children : out).push(g);
          clipPathsGroupsStack[clipPathsGroupsStackDepth++] = g;
          currentClipPathGroup = g;
        }
        prevClipPaths = clipPaths;
        var ret = brush2(displayable, scope);
        if (ret) {
          (currentClipPathGroup ? currentClipPathGroup.children : out).push(ret);
        }
      }
    }
  };
  SVGPainter2.prototype.resize = function(width, height) {
    var opts = this._opts;
    var root = this.root;
    var viewport = this._viewport;
    width != null && (opts.width = width);
    height != null && (opts.height = height);
    if (root && viewport) {
      viewport.style.display = "none";
      width = getSize(root, 0, opts);
      height = getSize(root, 1, opts);
      viewport.style.display = "";
    }
    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      if (viewport) {
        var viewportStyle = viewport.style;
        viewportStyle.width = width + "px";
        viewportStyle.height = height + "px";
      }
      if (!isPattern(this._backgroundColor)) {
        var svgDom = this._svgDom;
        if (svgDom) {
          svgDom.setAttribute("width", width);
          svgDom.setAttribute("height", height);
        }
        var bgEl = this._bgVNode && this._bgVNode.elm;
        if (bgEl) {
          bgEl.setAttribute("width", width);
          bgEl.setAttribute("height", height);
        }
      } else {
        this.refresh();
      }
    }
  };
  SVGPainter2.prototype.getWidth = function() {
    return this._width;
  };
  SVGPainter2.prototype.getHeight = function() {
    return this._height;
  };
  SVGPainter2.prototype.dispose = function() {
    if (this.root) {
      this.root.innerHTML = "";
    }
    this._svgDom = this._viewport = this.storage = this._oldVNode = this._bgVNode = this._mainVNode = null;
  };
  SVGPainter2.prototype.clear = function() {
    if (this._svgDom) {
      this._svgDom.innerHTML = null;
    }
    this._oldVNode = null;
  };
  SVGPainter2.prototype.toDataURL = function(base64) {
    var str = this.renderToString();
    var prefix = "data:image/svg+xml;";
    if (base64) {
      str = encodeBase64(str);
      return str && prefix + "base64," + str;
    }
    return prefix + "charset=UTF-8," + encodeURIComponent(str);
  };
  return SVGPainter2;
}();
function createMethodNotSupport(method) {
  return function() {
    if (true) {
      logError('In SVG mode painter not support method "' + method + '"');
    }
  };
}
function createBackgroundVNode(width, height, backgroundColor, scope) {
  var bgVNode;
  if (backgroundColor && backgroundColor !== "none") {
    bgVNode = createVNode("rect", "bg", {
      width,
      height,
      x: "0",
      y: "0"
    });
    if (isGradient(backgroundColor)) {
      setGradient({ fill: backgroundColor }, bgVNode.attrs, "fill", scope);
    } else if (isPattern(backgroundColor)) {
      setPattern({
        style: {
          fill: backgroundColor
        },
        dirty: noop,
        getBoundingRect: function() {
          return { width, height };
        }
      }, bgVNode.attrs, "fill", scope);
    } else {
      var _a = normalizeColor(backgroundColor), color = _a.color, opacity = _a.opacity;
      bgVNode.attrs.fill = color;
      opacity < 1 && (bgVNode.attrs["fill-opacity"] = opacity);
    }
  }
  return bgVNode;
}
var Painter_default = SVGPainter;

// node_modules/echarts/lib/renderer/installSVGRenderer.js
function install(registers) {
  registers.registerPainter("svg", Painter_default);
}

// node_modules/zrender/lib/canvas/Layer.js
function createDom(id, painter, dpr) {
  var newDom = platformApi.createCanvas();
  var width = painter.getWidth();
  var height = painter.getHeight();
  var newDomStyle = newDom.style;
  if (newDomStyle) {
    newDomStyle.position = "absolute";
    newDomStyle.left = "0";
    newDomStyle.top = "0";
    newDomStyle.width = width + "px";
    newDomStyle.height = height + "px";
    newDom.setAttribute("data-zr-dom-id", id);
  }
  newDom.width = width * dpr;
  newDom.height = height * dpr;
  return newDom;
}
var Layer = function(_super) {
  __extends(Layer2, _super);
  function Layer2(id, painter, dpr) {
    var _this = _super.call(this) || this;
    _this.motionBlur = false;
    _this.lastFrameAlpha = 0.7;
    _this.dpr = 1;
    _this.virtual = false;
    _this.config = {};
    _this.incremental = false;
    _this.zlevel = 0;
    _this.maxRepaintRectCount = 5;
    _this.__dirty = true;
    _this.__firstTimePaint = true;
    _this.__used = false;
    _this.__drawIndex = 0;
    _this.__startIndex = 0;
    _this.__endIndex = 0;
    _this.__prevStartIndex = null;
    _this.__prevEndIndex = null;
    var dom;
    dpr = dpr || devicePixelRatio;
    if (typeof id === "string") {
      dom = createDom(id, painter, dpr);
    } else if (isObject(id)) {
      dom = id;
      id = dom.id;
    }
    _this.id = id;
    _this.dom = dom;
    var domStyle = dom.style;
    if (domStyle) {
      disableUserSelect(dom);
      dom.onselectstart = function() {
        return false;
      };
      domStyle.padding = "0";
      domStyle.margin = "0";
      domStyle.borderWidth = "0";
    }
    _this.painter = painter;
    _this.dpr = dpr;
    return _this;
  }
  Layer2.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  };
  Layer2.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex;
    this.__prevEndIndex = this.__endIndex;
  };
  Layer2.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d");
    this.ctx.dpr = this.dpr;
  };
  Layer2.prototype.setUnpainted = function() {
    this.__firstTimePaint = true;
  };
  Layer2.prototype.createBackBuffer = function() {
    var dpr = this.dpr;
    this.domBack = createDom("back-" + this.id, this.painter, dpr);
    this.ctxBack = this.domBack.getContext("2d");
    if (dpr !== 1) {
      this.ctxBack.scale(dpr, dpr);
    }
  };
  Layer2.prototype.createRepaintRects = function(displayList, prevList, viewWidth, viewHeight) {
    if (this.__firstTimePaint) {
      this.__firstTimePaint = false;
      return null;
    }
    var mergedRepaintRects = [];
    var maxRepaintRectCount = this.maxRepaintRectCount;
    var full = false;
    var pendingRect = new BoundingRect_default(0, 0, 0, 0);
    function addRectToMergePool(rect) {
      if (!rect.isFinite() || rect.isZero()) {
        return;
      }
      if (mergedRepaintRects.length === 0) {
        var boundingRect = new BoundingRect_default(0, 0, 0, 0);
        boundingRect.copy(rect);
        mergedRepaintRects.push(boundingRect);
      } else {
        var isMerged = false;
        var minDeltaArea = Infinity;
        var bestRectToMergeIdx = 0;
        for (var i2 = 0; i2 < mergedRepaintRects.length; ++i2) {
          var mergedRect = mergedRepaintRects[i2];
          if (mergedRect.intersect(rect)) {
            var pendingRect_1 = new BoundingRect_default(0, 0, 0, 0);
            pendingRect_1.copy(mergedRect);
            pendingRect_1.union(rect);
            mergedRepaintRects[i2] = pendingRect_1;
            isMerged = true;
            break;
          } else if (full) {
            pendingRect.copy(rect);
            pendingRect.union(mergedRect);
            var aArea = rect.width * rect.height;
            var bArea = mergedRect.width * mergedRect.height;
            var pendingArea = pendingRect.width * pendingRect.height;
            var deltaArea = pendingArea - aArea - bArea;
            if (deltaArea < minDeltaArea) {
              minDeltaArea = deltaArea;
              bestRectToMergeIdx = i2;
            }
          }
        }
        if (full) {
          mergedRepaintRects[bestRectToMergeIdx].union(rect);
          isMerged = true;
        }
        if (!isMerged) {
          var boundingRect = new BoundingRect_default(0, 0, 0, 0);
          boundingRect.copy(rect);
          mergedRepaintRects.push(boundingRect);
        }
        if (!full) {
          full = mergedRepaintRects.length >= maxRepaintRectCount;
        }
      }
    }
    for (var i = this.__startIndex; i < this.__endIndex; ++i) {
      var el = displayList[i];
      if (el) {
        var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
        var prevRect = el.__isRendered && (el.__dirty & REDRAW_BIT || !shouldPaint) ? el.getPrevPaintRect() : null;
        if (prevRect) {
          addRectToMergePool(prevRect);
        }
        var curRect = shouldPaint && (el.__dirty & REDRAW_BIT || !el.__isRendered) ? el.getPaintRect() : null;
        if (curRect) {
          addRectToMergePool(curRect);
        }
      }
    }
    for (var i = this.__prevStartIndex; i < this.__prevEndIndex; ++i) {
      var el = prevList[i];
      var shouldPaint = el && el.shouldBePainted(viewWidth, viewHeight, true, true);
      if (el && (!shouldPaint || !el.__zr) && el.__isRendered) {
        var prevRect = el.getPrevPaintRect();
        if (prevRect) {
          addRectToMergePool(prevRect);
        }
      }
    }
    var hasIntersections;
    do {
      hasIntersections = false;
      for (var i = 0; i < mergedRepaintRects.length; ) {
        if (mergedRepaintRects[i].isZero()) {
          mergedRepaintRects.splice(i, 1);
          continue;
        }
        for (var j = i + 1; j < mergedRepaintRects.length; ) {
          if (mergedRepaintRects[i].intersect(mergedRepaintRects[j])) {
            hasIntersections = true;
            mergedRepaintRects[i].union(mergedRepaintRects[j]);
            mergedRepaintRects.splice(j, 1);
          } else {
            j++;
          }
        }
        i++;
      }
    } while (hasIntersections);
    this._paintRects = mergedRepaintRects;
    return mergedRepaintRects;
  };
  Layer2.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  };
  Layer2.prototype.resize = function(width, height) {
    var dpr = this.dpr;
    var dom = this.dom;
    var domStyle = dom.style;
    var domBack = this.domBack;
    if (domStyle) {
      domStyle.width = width + "px";
      domStyle.height = height + "px";
    }
    dom.width = width * dpr;
    dom.height = height * dpr;
    if (domBack) {
      domBack.width = width * dpr;
      domBack.height = height * dpr;
      if (dpr !== 1) {
        this.ctxBack.scale(dpr, dpr);
      }
    }
  };
  Layer2.prototype.clear = function(clearAll, clearColor, repaintRects) {
    var dom = this.dom;
    var ctx = this.ctx;
    var width = dom.width;
    var height = dom.height;
    clearColor = clearColor || this.clearColor;
    var haveMotionBLur = this.motionBlur && !clearAll;
    var lastFrameAlpha = this.lastFrameAlpha;
    var dpr = this.dpr;
    var self = this;
    if (haveMotionBLur) {
      if (!this.domBack) {
        this.createBackBuffer();
      }
      this.ctxBack.globalCompositeOperation = "copy";
      this.ctxBack.drawImage(dom, 0, 0, width / dpr, height / dpr);
    }
    var domBack = this.domBack;
    function doClear(x, y, width2, height2) {
      ctx.clearRect(x, y, width2, height2);
      if (clearColor && clearColor !== "transparent") {
        var clearColorGradientOrPattern = void 0;
        if (isGradientObject(clearColor)) {
          var shouldCache = clearColor.global || clearColor.__width === width2 && clearColor.__height === height2;
          clearColorGradientOrPattern = shouldCache && clearColor.__canvasGradient || getCanvasGradient(ctx, clearColor, {
            x: 0,
            y: 0,
            width: width2,
            height: height2
          });
          clearColor.__canvasGradient = clearColorGradientOrPattern;
          clearColor.__width = width2;
          clearColor.__height = height2;
        } else if (isImagePatternObject(clearColor)) {
          clearColor.scaleX = clearColor.scaleX || dpr;
          clearColor.scaleY = clearColor.scaleY || dpr;
          clearColorGradientOrPattern = createCanvasPattern(ctx, clearColor, {
            dirty: function() {
              self.setUnpainted();
              self.painter.refresh();
            }
          });
        }
        ctx.save();
        ctx.fillStyle = clearColorGradientOrPattern || clearColor;
        ctx.fillRect(x, y, width2, height2);
        ctx.restore();
      }
      if (haveMotionBLur) {
        ctx.save();
        ctx.globalAlpha = lastFrameAlpha;
        ctx.drawImage(domBack, x, y, width2, height2);
        ctx.restore();
      }
    }
    ;
    if (!repaintRects || haveMotionBLur) {
      doClear(0, 0, width, height);
    } else if (repaintRects.length) {
      each(repaintRects, function(rect) {
        doClear(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
      });
    }
  };
  return Layer2;
}(Eventful_default);
var Layer_default = Layer;

// node_modules/zrender/lib/canvas/Painter.js
var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;
var EL_AFTER_INCREMENTAL_INC = 0.01;
var INCREMENTAL_INC = 1e-3;
function isLayerValid(layer) {
  if (!layer) {
    return false;
  }
  if (layer.__builtin__) {
    return true;
  }
  if (typeof layer.resize !== "function" || typeof layer.refresh !== "function") {
    return false;
  }
  return true;
}
function createRoot(width, height) {
  var domRoot = document.createElement("div");
  domRoot.style.cssText = [
    "position:relative",
    "width:" + width + "px",
    "height:" + height + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";";
  return domRoot;
}
var CanvasPainter = function() {
  function CanvasPainter2(root, storage, opts, id) {
    this.type = "canvas";
    this._zlevelList = [];
    this._prevDisplayList = [];
    this._layers = {};
    this._layerConfig = {};
    this._needsManuallyCompositing = false;
    this.type = "canvas";
    var singleCanvas = !root.nodeName || root.nodeName.toUpperCase() === "CANVAS";
    this._opts = opts = extend({}, opts || {});
    this.dpr = opts.devicePixelRatio || devicePixelRatio;
    this._singleCanvas = singleCanvas;
    this.root = root;
    var rootStyle = root.style;
    if (rootStyle) {
      disableUserSelect(root);
      root.innerHTML = "";
    }
    this.storage = storage;
    var zlevelList = this._zlevelList;
    this._prevDisplayList = [];
    var layers = this._layers;
    if (!singleCanvas) {
      this._width = getSize(root, 0, opts);
      this._height = getSize(root, 1, opts);
      var domRoot = this._domRoot = createRoot(this._width, this._height);
      root.appendChild(domRoot);
    } else {
      var rootCanvas = root;
      var width = rootCanvas.width;
      var height = rootCanvas.height;
      if (opts.width != null) {
        width = opts.width;
      }
      if (opts.height != null) {
        height = opts.height;
      }
      this.dpr = opts.devicePixelRatio || 1;
      rootCanvas.width = width * this.dpr;
      rootCanvas.height = height * this.dpr;
      this._width = width;
      this._height = height;
      var mainLayer = new Layer_default(rootCanvas, this, this.dpr);
      mainLayer.__builtin__ = true;
      mainLayer.initContext();
      layers[CANVAS_ZLEVEL] = mainLayer;
      mainLayer.zlevel = CANVAS_ZLEVEL;
      zlevelList.push(CANVAS_ZLEVEL);
      this._domRoot = root;
    }
  }
  CanvasPainter2.prototype.getType = function() {
    return "canvas";
  };
  CanvasPainter2.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  };
  CanvasPainter2.prototype.getViewportRoot = function() {
    return this._domRoot;
  };
  CanvasPainter2.prototype.getViewportRootOffset = function() {
    var viewportRoot = this.getViewportRoot();
    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  };
  CanvasPainter2.prototype.refresh = function(paintAll) {
    var list = this.storage.getDisplayList(true);
    var prevList = this._prevDisplayList;
    var zlevelList = this._zlevelList;
    this._redrawId = Math.random();
    this._paintList(list, prevList, paintAll, this._redrawId);
    for (var i = 0; i < zlevelList.length; i++) {
      var z = zlevelList[i];
      var layer = this._layers[z];
      if (!layer.__builtin__ && layer.refresh) {
        var clearColor = i === 0 ? this._backgroundColor : null;
        layer.refresh(clearColor);
      }
    }
    if (this._opts.useDirtyRect) {
      this._prevDisplayList = list.slice();
    }
    return this;
  };
  CanvasPainter2.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(false));
  };
  CanvasPainter2.prototype._paintHoverList = function(list) {
    var len = list.length;
    var hoverLayer = this._hoverlayer;
    hoverLayer && hoverLayer.clear();
    if (!len) {
      return;
    }
    var scope = {
      inHover: true,
      viewWidth: this._width,
      viewHeight: this._height
    };
    var ctx;
    for (var i = 0; i < len; i++) {
      var el = list[i];
      if (el.__inHover) {
        if (!hoverLayer) {
          hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
        }
        if (!ctx) {
          ctx = hoverLayer.ctx;
          ctx.save();
        }
        brush(ctx, el, scope, i === len - 1);
      }
    }
    if (ctx) {
      ctx.restore();
    }
  };
  CanvasPainter2.prototype.getHoverLayer = function() {
    return this.getLayer(HOVER_LAYER_ZLEVEL);
  };
  CanvasPainter2.prototype.paintOne = function(ctx, el) {
    brushSingle(ctx, el);
  };
  CanvasPainter2.prototype._paintList = function(list, prevList, paintAll, redrawId) {
    if (this._redrawId !== redrawId) {
      return;
    }
    paintAll = paintAll || false;
    this._updateLayerStatus(list);
    var _a = this._doPaintList(list, prevList, paintAll), finished = _a.finished, needsRefreshHover = _a.needsRefreshHover;
    if (this._needsManuallyCompositing) {
      this._compositeManually();
    }
    if (needsRefreshHover) {
      this._paintHoverList(list);
    }
    if (!finished) {
      var self_1 = this;
      requestAnimationFrame_default(function() {
        self_1._paintList(list, prevList, paintAll, redrawId);
      });
    } else {
      this.eachLayer(function(layer) {
        layer.afterBrush && layer.afterBrush();
      });
    }
  };
  CanvasPainter2.prototype._compositeManually = function() {
    var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
    var width = this._domRoot.width;
    var height = this._domRoot.height;
    ctx.clearRect(0, 0, width, height);
    this.eachBuiltinLayer(function(layer) {
      if (layer.virtual) {
        ctx.drawImage(layer.dom, 0, 0, width, height);
      }
    });
  };
  CanvasPainter2.prototype._doPaintList = function(list, prevList, paintAll) {
    var _this = this;
    var layerList = [];
    var useDirtyRect = this._opts.useDirtyRect;
    for (var zi = 0; zi < this._zlevelList.length; zi++) {
      var zlevel = this._zlevelList[zi];
      var layer = this._layers[zlevel];
      if (layer.__builtin__ && layer !== this._hoverlayer && (layer.__dirty || paintAll)) {
        layerList.push(layer);
      }
    }
    var finished = true;
    var needsRefreshHover = false;
    var _loop_1 = function(k2) {
      var layer2 = layerList[k2];
      var ctx = layer2.ctx;
      var repaintRects = useDirtyRect && layer2.createRepaintRects(list, prevList, this_1._width, this_1._height);
      var start = paintAll ? layer2.__startIndex : layer2.__drawIndex;
      var useTimer = !paintAll && layer2.incremental && Date.now;
      var startTime = useTimer && Date.now();
      var clearColor = layer2.zlevel === this_1._zlevelList[0] ? this_1._backgroundColor : null;
      if (layer2.__startIndex === layer2.__endIndex) {
        layer2.clear(false, clearColor, repaintRects);
      } else if (start === layer2.__startIndex) {
        var firstEl = list[start];
        if (!firstEl.incremental || !firstEl.notClear || paintAll) {
          layer2.clear(false, clearColor, repaintRects);
        }
      }
      if (start === -1) {
        console.error("For some unknown reason. drawIndex is -1");
        start = layer2.__startIndex;
      }
      var i;
      var repaint = function(repaintRect) {
        var scope = {
          inHover: false,
          allClipped: false,
          prevEl: null,
          viewWidth: _this._width,
          viewHeight: _this._height
        };
        for (i = start; i < layer2.__endIndex; i++) {
          var el = list[i];
          if (el.__inHover) {
            needsRefreshHover = true;
          }
          _this._doPaintEl(el, layer2, useDirtyRect, repaintRect, scope, i === layer2.__endIndex - 1);
          if (useTimer) {
            var dTime = Date.now() - startTime;
            if (dTime > 15) {
              break;
            }
          }
        }
        if (scope.prevElClipPaths) {
          ctx.restore();
        }
      };
      if (repaintRects) {
        if (repaintRects.length === 0) {
          i = layer2.__endIndex;
        } else {
          var dpr = this_1.dpr;
          for (var r = 0; r < repaintRects.length; ++r) {
            var rect = repaintRects[r];
            ctx.save();
            ctx.beginPath();
            ctx.rect(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
            ctx.clip();
            repaint(rect);
            ctx.restore();
          }
        }
      } else {
        ctx.save();
        repaint();
        ctx.restore();
      }
      layer2.__drawIndex = i;
      if (layer2.__drawIndex < layer2.__endIndex) {
        finished = false;
      }
    };
    var this_1 = this;
    for (var k = 0; k < layerList.length; k++) {
      _loop_1(k);
    }
    if (env_default.wxa) {
      each(this._layers, function(layer2) {
        if (layer2 && layer2.ctx && layer2.ctx.draw) {
          layer2.ctx.draw();
        }
      });
    }
    return {
      finished,
      needsRefreshHover
    };
  };
  CanvasPainter2.prototype._doPaintEl = function(el, currentLayer, useDirtyRect, repaintRect, scope, isLast) {
    var ctx = currentLayer.ctx;
    if (useDirtyRect) {
      var paintRect = el.getPaintRect();
      if (!repaintRect || paintRect && paintRect.intersect(repaintRect)) {
        brush(ctx, el, scope, isLast);
        el.setPrevPaintRect(paintRect);
      }
    } else {
      brush(ctx, el, scope, isLast);
    }
  };
  CanvasPainter2.prototype.getLayer = function(zlevel, virtual) {
    if (this._singleCanvas && !this._needsManuallyCompositing) {
      zlevel = CANVAS_ZLEVEL;
    }
    var layer = this._layers[zlevel];
    if (!layer) {
      layer = new Layer_default("zr_" + zlevel, this, this.dpr);
      layer.zlevel = zlevel;
      layer.__builtin__ = true;
      if (this._layerConfig[zlevel]) {
        merge(layer, this._layerConfig[zlevel], true);
      } else if (this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC]) {
        merge(layer, this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC], true);
      }
      if (virtual) {
        layer.virtual = virtual;
      }
      this.insertLayer(zlevel, layer);
      layer.initContext();
    }
    return layer;
  };
  CanvasPainter2.prototype.insertLayer = function(zlevel, layer) {
    var layersMap = this._layers;
    var zlevelList = this._zlevelList;
    var len = zlevelList.length;
    var domRoot = this._domRoot;
    var prevLayer = null;
    var i = -1;
    if (layersMap[zlevel]) {
      if (true) {
        logError("ZLevel " + zlevel + " has been used already");
      }
      return;
    }
    if (!isLayerValid(layer)) {
      if (true) {
        logError("Layer of zlevel " + zlevel + " is not valid");
      }
      return;
    }
    if (len > 0 && zlevel > zlevelList[0]) {
      for (i = 0; i < len - 1; i++) {
        if (zlevelList[i] < zlevel && zlevelList[i + 1] > zlevel) {
          break;
        }
      }
      prevLayer = layersMap[zlevelList[i]];
    }
    zlevelList.splice(i + 1, 0, zlevel);
    layersMap[zlevel] = layer;
    if (!layer.virtual) {
      if (prevLayer) {
        var prevDom = prevLayer.dom;
        if (prevDom.nextSibling) {
          domRoot.insertBefore(layer.dom, prevDom.nextSibling);
        } else {
          domRoot.appendChild(layer.dom);
        }
      } else {
        if (domRoot.firstChild) {
          domRoot.insertBefore(layer.dom, domRoot.firstChild);
        } else {
          domRoot.appendChild(layer.dom);
        }
      }
    }
    layer.painter || (layer.painter = this);
  };
  CanvasPainter2.prototype.eachLayer = function(cb, context) {
    var zlevelList = this._zlevelList;
    for (var i = 0; i < zlevelList.length; i++) {
      var z = zlevelList[i];
      cb.call(context, this._layers[z], z);
    }
  };
  CanvasPainter2.prototype.eachBuiltinLayer = function(cb, context) {
    var zlevelList = this._zlevelList;
    for (var i = 0; i < zlevelList.length; i++) {
      var z = zlevelList[i];
      var layer = this._layers[z];
      if (layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  };
  CanvasPainter2.prototype.eachOtherLayer = function(cb, context) {
    var zlevelList = this._zlevelList;
    for (var i = 0; i < zlevelList.length; i++) {
      var z = zlevelList[i];
      var layer = this._layers[z];
      if (!layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  };
  CanvasPainter2.prototype.getLayers = function() {
    return this._layers;
  };
  CanvasPainter2.prototype._updateLayerStatus = function(list) {
    this.eachBuiltinLayer(function(layer2, z) {
      layer2.__dirty = layer2.__used = false;
    });
    function updatePrevLayer(idx) {
      if (prevLayer) {
        if (prevLayer.__endIndex !== idx) {
          prevLayer.__dirty = true;
        }
        prevLayer.__endIndex = idx;
      }
    }
    if (this._singleCanvas) {
      for (var i_1 = 1; i_1 < list.length; i_1++) {
        var el = list[i_1];
        if (el.zlevel !== list[i_1 - 1].zlevel || el.incremental) {
          this._needsManuallyCompositing = true;
          break;
        }
      }
    }
    var prevLayer = null;
    var incrementalLayerCount = 0;
    var prevZlevel;
    var i;
    for (i = 0; i < list.length; i++) {
      var el = list[i];
      var zlevel = el.zlevel;
      var layer = void 0;
      if (prevZlevel !== zlevel) {
        prevZlevel = zlevel;
        incrementalLayerCount = 0;
      }
      if (el.incremental) {
        layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
        layer.incremental = true;
        incrementalLayerCount = 1;
      } else {
        layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
      }
      if (!layer.__builtin__) {
        logError("ZLevel " + zlevel + " has been used by unkown layer " + layer.id);
      }
      if (layer !== prevLayer) {
        layer.__used = true;
        if (layer.__startIndex !== i) {
          layer.__dirty = true;
        }
        layer.__startIndex = i;
        if (!layer.incremental) {
          layer.__drawIndex = i;
        } else {
          layer.__drawIndex = -1;
        }
        updatePrevLayer(i);
        prevLayer = layer;
      }
      if (el.__dirty & REDRAW_BIT && !el.__inHover) {
        layer.__dirty = true;
        if (layer.incremental && layer.__drawIndex < 0) {
          layer.__drawIndex = i;
        }
      }
    }
    updatePrevLayer(i);
    this.eachBuiltinLayer(function(layer2, z) {
      if (!layer2.__used && layer2.getElementCount() > 0) {
        layer2.__dirty = true;
        layer2.__startIndex = layer2.__endIndex = layer2.__drawIndex = 0;
      }
      if (layer2.__dirty && layer2.__drawIndex < 0) {
        layer2.__drawIndex = layer2.__startIndex;
      }
    });
  };
  CanvasPainter2.prototype.clear = function() {
    this.eachBuiltinLayer(this._clearLayer);
    return this;
  };
  CanvasPainter2.prototype._clearLayer = function(layer) {
    layer.clear();
  };
  CanvasPainter2.prototype.setBackgroundColor = function(backgroundColor) {
    this._backgroundColor = backgroundColor;
    each(this._layers, function(layer) {
      layer.setUnpainted();
    });
  };
  CanvasPainter2.prototype.configLayer = function(zlevel, config) {
    if (config) {
      var layerConfig = this._layerConfig;
      if (!layerConfig[zlevel]) {
        layerConfig[zlevel] = config;
      } else {
        merge(layerConfig[zlevel], config, true);
      }
      for (var i = 0; i < this._zlevelList.length; i++) {
        var _zlevel = this._zlevelList[i];
        if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
          var layer = this._layers[_zlevel];
          merge(layer, layerConfig[zlevel], true);
        }
      }
    }
  };
  CanvasPainter2.prototype.delLayer = function(zlevel) {
    var layers = this._layers;
    var zlevelList = this._zlevelList;
    var layer = layers[zlevel];
    if (!layer) {
      return;
    }
    layer.dom.parentNode.removeChild(layer.dom);
    delete layers[zlevel];
    zlevelList.splice(indexOf(zlevelList, zlevel), 1);
  };
  CanvasPainter2.prototype.resize = function(width, height) {
    if (!this._domRoot.style) {
      if (width == null || height == null) {
        return;
      }
      this._width = width;
      this._height = height;
      this.getLayer(CANVAS_ZLEVEL).resize(width, height);
    } else {
      var domRoot = this._domRoot;
      domRoot.style.display = "none";
      var opts = this._opts;
      var root = this.root;
      width != null && (opts.width = width);
      height != null && (opts.height = height);
      width = getSize(root, 0, opts);
      height = getSize(root, 1, opts);
      domRoot.style.display = "";
      if (this._width !== width || height !== this._height) {
        domRoot.style.width = width + "px";
        domRoot.style.height = height + "px";
        for (var id in this._layers) {
          if (this._layers.hasOwnProperty(id)) {
            this._layers[id].resize(width, height);
          }
        }
        this.refresh(true);
      }
      this._width = width;
      this._height = height;
    }
    return this;
  };
  CanvasPainter2.prototype.clearLayer = function(zlevel) {
    var layer = this._layers[zlevel];
    if (layer) {
      layer.clear();
    }
  };
  CanvasPainter2.prototype.dispose = function() {
    this.root.innerHTML = "";
    this.root = this.storage = this._domRoot = this._layers = null;
  };
  CanvasPainter2.prototype.getRenderedCanvas = function(opts) {
    opts = opts || {};
    if (this._singleCanvas && !this._compositeManually) {
      return this._layers[CANVAS_ZLEVEL].dom;
    }
    var imageLayer = new Layer_default("image", this, opts.pixelRatio || this.dpr);
    imageLayer.initContext();
    imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);
    var ctx = imageLayer.ctx;
    if (opts.pixelRatio <= this.dpr) {
      this.refresh();
      var width_1 = imageLayer.dom.width;
      var height_1 = imageLayer.dom.height;
      this.eachLayer(function(layer) {
        if (layer.__builtin__) {
          ctx.drawImage(layer.dom, 0, 0, width_1, height_1);
        } else if (layer.renderToCanvas) {
          ctx.save();
          layer.renderToCanvas(ctx);
          ctx.restore();
        }
      });
    } else {
      var scope = {
        inHover: false,
        viewWidth: this._width,
        viewHeight: this._height
      };
      var displayList = this.storage.getDisplayList(true);
      for (var i = 0, len = displayList.length; i < len; i++) {
        var el = displayList[i];
        brush(ctx, el, scope, i === len - 1);
      }
    }
    return imageLayer.dom;
  };
  CanvasPainter2.prototype.getWidth = function() {
    return this._width;
  };
  CanvasPainter2.prototype.getHeight = function() {
    return this._height;
  };
  return CanvasPainter2;
}();
var Painter_default2 = CanvasPainter;

// node_modules/echarts/lib/renderer/installCanvasRenderer.js
function install2(registers) {
  registers.registerPainter("canvas", Painter_default2);
}
export {
  install2 as CanvasRenderer,
  install as SVGRenderer
};
//# sourceMappingURL=echarts_renderers.js.map
