import {
  LineDraw_default,
  Line_default as Line_default2,
  MapDraw_default,
  RoamController_default,
  SymbolDraw_default,
  Symbol_default,
  View_default,
  VisualMapping_default,
  applyKeyframeAnimation,
  applyLeaveTransition,
  applyUpdateTransition,
  convertFromEC4CompatibleStyle,
  convertToEC4StyleForCustomSerise,
  geoSourceManager_default,
  getDefaultInterpolatedLabel,
  getDefaultLabel,
  install,
  install2,
  install3,
  install4,
  isCoordinateSystemType,
  isEC4CompatibleStyle,
  onIrrelevantElement,
  stopPreviousKeyframeAnimationAndRestore,
  updateCenterAndZoom,
  updateViewOnPan,
  updateViewOnZoom,
  warnDeprecated
} from "./chunk-ZNXD35GQ.js";
import {
  createSeriesData_default,
  getLabelLineStatesModels,
  limitSurfaceAngle,
  limitTurnAngle,
  prepareSeriesDataSchema,
  setLabelLineStyle
} from "./chunk-LVBDWL3K.js";
import {
  BezierCurve_default,
  Chart_default,
  Circle_default,
  CoordinateSystem_default,
  DISPLAY_STATES,
  DataDiffer_default,
  HOVER_STATE_BLUR,
  Line_default,
  LinearGradient_default,
  MAX_SAFE_INTEGER,
  Model_default,
  Polygon_default,
  Polyline_default,
  SINGLE_REFERRING,
  SOURCE_FORMAT_ARRAY_ROWS,
  SPECIAL_STATES,
  Sector_default,
  SeriesData_default,
  Series_default,
  Z2_EMPHASIS_LIFT,
  __extends,
  animateLabelValue,
  asc,
  convertOptionIdName,
  convertToColorString,
  createFloat32Array,
  createLegacyDataSelectAction,
  createOrUpdatePatternFromDecal,
  createProgressiveLayout,
  createRenderPlanner,
  createSymbol,
  createTextConfig,
  createTextStyle,
  createTooltipMarkup,
  defaultEmphasis,
  defaultSeriesFormatTooltip,
  deprecateReplaceLog,
  enableHoverFocus,
  enterEmphasis,
  error,
  getAvailableSize,
  getDecalFromPalette,
  getDimensionTypeByAxis,
  getECData,
  getFont,
  getLabelStatesModels,
  getLayoutOnAxis,
  getLayoutRect,
  getPercentSeats,
  getShapeClass,
  graphic_exports,
  groupData,
  inheritDefaultOption,
  initProps,
  interpolateRawValues,
  isDimensionStacked,
  isHighDownDispatcher,
  isNumeric,
  isRadianAroundZero,
  labelInner,
  layout,
  leaveEmphasis,
  linearMap,
  makeInner,
  makePath,
  makePrintable,
  makeSeriesEncodeForAxisCoordSys,
  makeSeriesEncodeForNameBased,
  makeStyleMapper,
  normalizeSymbolOffset,
  normalizeSymbolSize,
  normalizeToArray,
  numericToNumber,
  parsePercent as parsePercent2,
  positionElement,
  quantile,
  queryDataIndex,
  removeElement,
  removeElementWithFadeOut,
  retrieveVisualColorForTooltipMarker,
  round,
  saveOldStyle,
  setAsHighDownDispatcher,
  setCommonECData,
  setDefaultStateProxy,
  setLabelStyle,
  setLabelValueAnimation,
  setStatesFlag,
  setStatesStylesFromModel,
  shiftLayoutOnY,
  subPixelOptimize,
  throttle,
  throwError,
  toggleHoverEmphasis,
  traverseElements,
  updateProps,
  use,
  warn,
  windowOpen
} from "./chunk-GZAGD2NU.js";
import {
  BoundingRect_default,
  Displayable_default,
  Group_default,
  Image_default,
  PathProxy_default,
  Path_default,
  Point_default,
  Rect_default,
  Text_default,
  assert,
  bind,
  calculateTextPosition,
  clone,
  clone2,
  clone3,
  concatArray,
  containStroke,
  containStroke2,
  copy,
  create,
  create2,
  createHashMap,
  cubicAt,
  cubicRootAt,
  curry,
  defaults,
  dist,
  distSquare,
  each,
  eqNaN,
  extend,
  filter,
  find,
  fromPoints,
  hasOwn,
  indexOf,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isString,
  keys,
  len,
  lerp2 as lerp,
  lift,
  map,
  merge,
  mergeAll,
  mixin,
  modifyAlpha,
  modifyHSL,
  noop,
  normalize,
  normalizeArcAngles,
  normalizeCssArray,
  normalizeRadian,
  parsePercent,
  platformApi,
  quadraticAt,
  quadraticDerivativeAt,
  quadraticSubdivide,
  retrieve,
  retrieve2,
  retrieve3,
  scale,
  scale2,
  scaleAndAdd,
  set,
  sub,
  translate
} from "./chunk-6GXF4SXL.js";
import "./chunk-PZ5AY32C.js";

// node_modules/echarts/lib/chart/line/LineSeries.js
var LineSeriesModel = (
  /** @class */
  function(_super) {
    __extends(LineSeriesModel2, _super);
    function LineSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = LineSeriesModel2.type;
      _this.hasSymbolVisual = true;
      return _this;
    }
    LineSeriesModel2.prototype.getInitialData = function(option) {
      if (true) {
        var coordSys = option.coordinateSystem;
        if (coordSys !== "polar" && coordSys !== "cartesian2d") {
          throw new Error("Line not support coordinateSystem besides cartesian and polar");
        }
      }
      return createSeriesData_default(null, this, {
        useEncodeDefaulter: true
      });
    };
    LineSeriesModel2.prototype.getLegendIcon = function(opt) {
      var group = new Group_default();
      var line = createSymbol("line", 0, opt.itemHeight / 2, opt.itemWidth, 0, opt.lineStyle.stroke, false);
      group.add(line);
      line.setStyle(opt.lineStyle);
      var visualType = this.getData().getVisual("symbol");
      var visualRotate = this.getData().getVisual("symbolRotate");
      var symbolType = visualType === "none" ? "circle" : visualType;
      var size = opt.itemHeight * 0.8;
      var symbol = createSymbol(symbolType, (opt.itemWidth - size) / 2, (opt.itemHeight - size) / 2, size, size, opt.itemStyle.fill);
      group.add(symbol);
      symbol.setStyle(opt.itemStyle);
      var symbolRotate = opt.iconRotate === "inherit" ? visualRotate : opt.iconRotate || 0;
      symbol.rotation = symbolRotate * Math.PI / 180;
      symbol.setOrigin([opt.itemWidth / 2, opt.itemHeight / 2]);
      if (symbolType.indexOf("empty") > -1) {
        symbol.style.stroke = symbol.style.fill;
        symbol.style.fill = "#fff";
        symbol.style.lineWidth = 2;
      }
      return group;
    };
    LineSeriesModel2.type = "series.line";
    LineSeriesModel2.dependencies = ["grid", "polar"];
    LineSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: true,
      clip: true,
      label: {
        position: "top"
      },
      // itemStyle: {
      // },
      endLabel: {
        show: false,
        valueAnimation: true,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: true
      },
      // areaStyle: {
      // origin of areaStyle. Valid values:
      // `'auto'/null/undefined`: from axisLine to data
      // `'start'`: from min to data
      // `'end'`: from data to max
      // origin: 'auto'
      // },
      // false, 'start', 'end', 'middle'
      step: false,
      // Disabled if step is true
      smooth: false,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: true,
      // `false`: follow the label interval strategy.
      // `true`: show all symbols.
      // `'auto'`: If possible, show all symbols, otherwise
      //           follow the label interval strategy.
      showAllSymbol: "auto",
      // Whether to connect break point.
      connectNulls: false,
      // Sampling for large data. Can be: 'average', 'max', 'min', 'sum', 'lttb'.
      sampling: "none",
      animationEasing: "linear",
      // Disable progressive
      progressive: 0,
      hoverLayerThreshold: Infinity,
      universalTransition: {
        divideShape: "clone"
      },
      triggerLineEvent: false
    };
    return LineSeriesModel2;
  }(Series_default)
);
var LineSeries_default = LineSeriesModel;

// node_modules/echarts/lib/chart/line/helper.js
function prepareDataCoordInfo(coordSys, data, valueOrigin) {
  var baseAxis = coordSys.getBaseAxis();
  var valueAxis = coordSys.getOtherAxis(baseAxis);
  var valueStart = getValueStart(valueAxis, valueOrigin);
  var baseAxisDim = baseAxis.dim;
  var valueAxisDim = valueAxis.dim;
  var valueDim = data.mapDimension(valueAxisDim);
  var baseDim = data.mapDimension(baseAxisDim);
  var baseDataOffset = valueAxisDim === "x" || valueAxisDim === "radius" ? 1 : 0;
  var dims = map(coordSys.dimensions, function(coordDim) {
    return data.mapDimension(coordDim);
  });
  var stacked = false;
  var stackResultDim = data.getCalculationInfo("stackResultDimension");
  if (isDimensionStacked(
    data,
    dims[0]
    /* , dims[1] */
  )) {
    stacked = true;
    dims[0] = stackResultDim;
  }
  if (isDimensionStacked(
    data,
    dims[1]
    /* , dims[0] */
  )) {
    stacked = true;
    dims[1] = stackResultDim;
  }
  return {
    dataDimsForPoint: dims,
    valueStart,
    valueAxisDim,
    baseAxisDim,
    stacked: !!stacked,
    valueDim,
    baseDim,
    baseDataOffset,
    stackedOverDimension: data.getCalculationInfo("stackedOverDimension")
  };
}
function getValueStart(valueAxis, valueOrigin) {
  var valueStart = 0;
  var extent = valueAxis.scale.getExtent();
  if (valueOrigin === "start") {
    valueStart = extent[0];
  } else if (valueOrigin === "end") {
    valueStart = extent[1];
  } else if (isNumber(valueOrigin) && !isNaN(valueOrigin)) {
    valueStart = valueOrigin;
  } else {
    if (extent[0] > 0) {
      valueStart = extent[0];
    } else if (extent[1] < 0) {
      valueStart = extent[1];
    }
  }
  return valueStart;
}
function getStackedOnPoint(dataCoordInfo, coordSys, data, idx) {
  var value = NaN;
  if (dataCoordInfo.stacked) {
    value = data.get(data.getCalculationInfo("stackedOverDimension"), idx);
  }
  if (isNaN(value)) {
    value = dataCoordInfo.valueStart;
  }
  var baseDataOffset = dataCoordInfo.baseDataOffset;
  var stackedData = [];
  stackedData[baseDataOffset] = data.get(dataCoordInfo.baseDim, idx);
  stackedData[1 - baseDataOffset] = value;
  return coordSys.dataToPoint(stackedData);
}

// node_modules/echarts/lib/chart/line/lineAnimationDiff.js
function diffData(oldData, newData) {
  var diffResult = [];
  newData.diff(oldData).add(function(idx) {
    diffResult.push({
      cmd: "+",
      idx
    });
  }).update(function(newIdx, oldIdx) {
    diffResult.push({
      cmd: "=",
      idx: oldIdx,
      idx1: newIdx
    });
  }).remove(function(idx) {
    diffResult.push({
      cmd: "-",
      idx
    });
  }).execute();
  return diffResult;
}
function lineAnimationDiff(oldData, newData, oldStackedOnPoints, newStackedOnPoints, oldCoordSys, newCoordSys, oldValueOrigin, newValueOrigin) {
  var diff = diffData(oldData, newData);
  var currPoints = [];
  var nextPoints = [];
  var currStackedPoints = [];
  var nextStackedPoints = [];
  var status = [];
  var sortedIndices = [];
  var rawIndices = [];
  var newDataOldCoordInfo = prepareDataCoordInfo(oldCoordSys, newData, oldValueOrigin);
  var oldPoints = oldData.getLayout("points") || [];
  var newPoints = newData.getLayout("points") || [];
  for (var i = 0; i < diff.length; i++) {
    var diffItem = diff[i];
    var pointAdded = true;
    var oldIdx2 = void 0;
    var newIdx2 = void 0;
    switch (diffItem.cmd) {
      case "=":
        oldIdx2 = diffItem.idx * 2;
        newIdx2 = diffItem.idx1 * 2;
        var currentX = oldPoints[oldIdx2];
        var currentY = oldPoints[oldIdx2 + 1];
        var nextX = newPoints[newIdx2];
        var nextY = newPoints[newIdx2 + 1];
        if (isNaN(currentX) || isNaN(currentY)) {
          currentX = nextX;
          currentY = nextY;
        }
        currPoints.push(currentX, currentY);
        nextPoints.push(nextX, nextY);
        currStackedPoints.push(oldStackedOnPoints[oldIdx2], oldStackedOnPoints[oldIdx2 + 1]);
        nextStackedPoints.push(newStackedOnPoints[newIdx2], newStackedOnPoints[newIdx2 + 1]);
        rawIndices.push(newData.getRawIndex(diffItem.idx1));
        break;
      case "+":
        var newIdx = diffItem.idx;
        var newDataDimsForPoint = newDataOldCoordInfo.dataDimsForPoint;
        var oldPt = oldCoordSys.dataToPoint([newData.get(newDataDimsForPoint[0], newIdx), newData.get(newDataDimsForPoint[1], newIdx)]);
        newIdx2 = newIdx * 2;
        currPoints.push(oldPt[0], oldPt[1]);
        nextPoints.push(newPoints[newIdx2], newPoints[newIdx2 + 1]);
        var stackedOnPoint = getStackedOnPoint(newDataOldCoordInfo, oldCoordSys, newData, newIdx);
        currStackedPoints.push(stackedOnPoint[0], stackedOnPoint[1]);
        nextStackedPoints.push(newStackedOnPoints[newIdx2], newStackedOnPoints[newIdx2 + 1]);
        rawIndices.push(newData.getRawIndex(newIdx));
        break;
      case "-":
        pointAdded = false;
    }
    if (pointAdded) {
      status.push(diffItem);
      sortedIndices.push(sortedIndices.length);
    }
  }
  sortedIndices.sort(function(a, b) {
    return rawIndices[a] - rawIndices[b];
  });
  var len2 = currPoints.length;
  var sortedCurrPoints = createFloat32Array(len2);
  var sortedNextPoints = createFloat32Array(len2);
  var sortedCurrStackedPoints = createFloat32Array(len2);
  var sortedNextStackedPoints = createFloat32Array(len2);
  var sortedStatus = [];
  for (var i = 0; i < sortedIndices.length; i++) {
    var idx = sortedIndices[i];
    var i2 = i * 2;
    var idx2 = idx * 2;
    sortedCurrPoints[i2] = currPoints[idx2];
    sortedCurrPoints[i2 + 1] = currPoints[idx2 + 1];
    sortedNextPoints[i2] = nextPoints[idx2];
    sortedNextPoints[i2 + 1] = nextPoints[idx2 + 1];
    sortedCurrStackedPoints[i2] = currStackedPoints[idx2];
    sortedCurrStackedPoints[i2 + 1] = currStackedPoints[idx2 + 1];
    sortedNextStackedPoints[i2] = nextStackedPoints[idx2];
    sortedNextStackedPoints[i2 + 1] = nextStackedPoints[idx2 + 1];
    sortedStatus[i] = status[idx];
  }
  return {
    current: sortedCurrPoints,
    next: sortedNextPoints,
    stackedOnCurrent: sortedCurrStackedPoints,
    stackedOnNext: sortedNextStackedPoints,
    status: sortedStatus
  };
}

// node_modules/echarts/lib/chart/line/poly.js
var mathMin = Math.min;
var mathMax = Math.max;
function isPointNull(x, y) {
  return isNaN(x) || isNaN(y);
}
function drawSegment(ctx, points, start, segLen, allLen, dir, smooth, smoothMonotone, connectNulls) {
  var prevX;
  var prevY;
  var cpx0;
  var cpy0;
  var cpx1;
  var cpy1;
  var idx = start;
  var k = 0;
  for (; k < segLen; k++) {
    var x = points[idx * 2];
    var y = points[idx * 2 + 1];
    if (idx >= allLen || idx < 0) {
      break;
    }
    if (isPointNull(x, y)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }
      break;
    }
    if (idx === start) {
      ctx[dir > 0 ? "moveTo" : "lineTo"](x, y);
      cpx0 = x;
      cpy0 = y;
    } else {
      var dx = x - prevX;
      var dy = y - prevY;
      if (dx * dx + dy * dy < 0.5) {
        idx += dir;
        continue;
      }
      if (smooth > 0) {
        var nextIdx = idx + dir;
        var nextX = points[nextIdx * 2];
        var nextY = points[nextIdx * 2 + 1];
        while (nextX === x && nextY === y && k < segLen) {
          k++;
          nextIdx += dir;
          idx += dir;
          nextX = points[nextIdx * 2];
          nextY = points[nextIdx * 2 + 1];
          x = points[idx * 2];
          y = points[idx * 2 + 1];
          dx = x - prevX;
          dy = y - prevY;
        }
        var tmpK = k + 1;
        if (connectNulls) {
          while (isPointNull(nextX, nextY) && tmpK < segLen) {
            tmpK++;
            nextIdx += dir;
            nextX = points[nextIdx * 2];
            nextY = points[nextIdx * 2 + 1];
          }
        }
        var ratioNextSeg = 0.5;
        var vx = 0;
        var vy = 0;
        var nextCpx0 = void 0;
        var nextCpy0 = void 0;
        if (tmpK >= segLen || isPointNull(nextX, nextY)) {
          cpx1 = x;
          cpy1 = y;
        } else {
          vx = nextX - prevX;
          vy = nextY - prevY;
          var dx0 = x - prevX;
          var dx1 = nextX - x;
          var dy0 = y - prevY;
          var dy1 = nextY - y;
          var lenPrevSeg = void 0;
          var lenNextSeg = void 0;
          if (smoothMonotone === "x") {
            lenPrevSeg = Math.abs(dx0);
            lenNextSeg = Math.abs(dx1);
            var dir_1 = vx > 0 ? 1 : -1;
            cpx1 = x - dir_1 * lenPrevSeg * smooth;
            cpy1 = y;
            nextCpx0 = x + dir_1 * lenNextSeg * smooth;
            nextCpy0 = y;
          } else if (smoothMonotone === "y") {
            lenPrevSeg = Math.abs(dy0);
            lenNextSeg = Math.abs(dy1);
            var dir_2 = vy > 0 ? 1 : -1;
            cpx1 = x;
            cpy1 = y - dir_2 * lenPrevSeg * smooth;
            nextCpx0 = x;
            nextCpy0 = y + dir_2 * lenNextSeg * smooth;
          } else {
            lenPrevSeg = Math.sqrt(dx0 * dx0 + dy0 * dy0);
            lenNextSeg = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg);
            cpx1 = x - vx * smooth * (1 - ratioNextSeg);
            cpy1 = y - vy * smooth * (1 - ratioNextSeg);
            nextCpx0 = x + vx * smooth * ratioNextSeg;
            nextCpy0 = y + vy * smooth * ratioNextSeg;
            nextCpx0 = mathMin(nextCpx0, mathMax(nextX, x));
            nextCpy0 = mathMin(nextCpy0, mathMax(nextY, y));
            nextCpx0 = mathMax(nextCpx0, mathMin(nextX, x));
            nextCpy0 = mathMax(nextCpy0, mathMin(nextY, y));
            vx = nextCpx0 - x;
            vy = nextCpy0 - y;
            cpx1 = x - vx * lenPrevSeg / lenNextSeg;
            cpy1 = y - vy * lenPrevSeg / lenNextSeg;
            cpx1 = mathMin(cpx1, mathMax(prevX, x));
            cpy1 = mathMin(cpy1, mathMax(prevY, y));
            cpx1 = mathMax(cpx1, mathMin(prevX, x));
            cpy1 = mathMax(cpy1, mathMin(prevY, y));
            vx = x - cpx1;
            vy = y - cpy1;
            nextCpx0 = x + vx * lenNextSeg / lenPrevSeg;
            nextCpy0 = y + vy * lenNextSeg / lenPrevSeg;
          }
        }
        ctx.bezierCurveTo(cpx0, cpy0, cpx1, cpy1, x, y);
        cpx0 = nextCpx0;
        cpy0 = nextCpy0;
      } else {
        ctx.lineTo(x, y);
      }
    }
    prevX = x;
    prevY = y;
    idx += dir;
  }
  return k;
}
var ECPolylineShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function ECPolylineShape2() {
      this.smooth = 0;
      this.smoothConstraint = true;
    }
    return ECPolylineShape2;
  }()
);
var ECPolyline = (
  /** @class */
  function(_super) {
    __extends(ECPolyline2, _super);
    function ECPolyline2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "ec-polyline";
      return _this;
    }
    ECPolyline2.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    };
    ECPolyline2.prototype.getDefaultShape = function() {
      return new ECPolylineShape();
    };
    ECPolyline2.prototype.buildPath = function(ctx, shape) {
      var points = shape.points;
      var i = 0;
      var len2 = points.length / 2;
      if (shape.connectNulls) {
        for (; len2 > 0; len2--) {
          if (!isPointNull(points[len2 * 2 - 2], points[len2 * 2 - 1])) {
            break;
          }
        }
        for (; i < len2; i++) {
          if (!isPointNull(points[i * 2], points[i * 2 + 1])) {
            break;
          }
        }
      }
      while (i < len2) {
        i += drawSegment(ctx, points, i, len2, len2, 1, shape.smooth, shape.smoothMonotone, shape.connectNulls) + 1;
      }
    };
    ECPolyline2.prototype.getPointOn = function(xOrY, dim) {
      if (!this.path) {
        this.createPathProxy();
        this.buildPath(this.path, this.shape);
      }
      var path = this.path;
      var data = path.data;
      var CMD = PathProxy_default.CMD;
      var x0;
      var y0;
      var isDimX = dim === "x";
      var roots = [];
      for (var i = 0; i < data.length; ) {
        var cmd = data[i++];
        var x = void 0;
        var y = void 0;
        var x2 = void 0;
        var y2 = void 0;
        var x3 = void 0;
        var y3 = void 0;
        var t = void 0;
        switch (cmd) {
          case CMD.M:
            x0 = data[i++];
            y0 = data[i++];
            break;
          case CMD.L:
            x = data[i++];
            y = data[i++];
            t = isDimX ? (xOrY - x0) / (x - x0) : (xOrY - y0) / (y - y0);
            if (t <= 1 && t >= 0) {
              var val = isDimX ? (y - y0) * t + y0 : (x - x0) * t + x0;
              return isDimX ? [xOrY, val] : [val, xOrY];
            }
            x0 = x;
            y0 = y;
            break;
          case CMD.C:
            x = data[i++];
            y = data[i++];
            x2 = data[i++];
            y2 = data[i++];
            x3 = data[i++];
            y3 = data[i++];
            var nRoot = isDimX ? cubicRootAt(x0, x, x2, x3, xOrY, roots) : cubicRootAt(y0, y, y2, y3, xOrY, roots);
            if (nRoot > 0) {
              for (var i_1 = 0; i_1 < nRoot; i_1++) {
                var t_1 = roots[i_1];
                if (t_1 <= 1 && t_1 >= 0) {
                  var val = isDimX ? cubicAt(y0, y, y2, y3, t_1) : cubicAt(x0, x, x2, x3, t_1);
                  return isDimX ? [xOrY, val] : [val, xOrY];
                }
              }
            }
            x0 = x3;
            y0 = y3;
            break;
        }
      }
    };
    return ECPolyline2;
  }(Path_default)
);
var ECPolygonShape = (
  /** @class */
  function(_super) {
    __extends(ECPolygonShape2, _super);
    function ECPolygonShape2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return ECPolygonShape2;
  }(ECPolylineShape)
);
var ECPolygon = (
  /** @class */
  function(_super) {
    __extends(ECPolygon2, _super);
    function ECPolygon2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "ec-polygon";
      return _this;
    }
    ECPolygon2.prototype.getDefaultShape = function() {
      return new ECPolygonShape();
    };
    ECPolygon2.prototype.buildPath = function(ctx, shape) {
      var points = shape.points;
      var stackedOnPoints = shape.stackedOnPoints;
      var i = 0;
      var len2 = points.length / 2;
      var smoothMonotone = shape.smoothMonotone;
      if (shape.connectNulls) {
        for (; len2 > 0; len2--) {
          if (!isPointNull(points[len2 * 2 - 2], points[len2 * 2 - 1])) {
            break;
          }
        }
        for (; i < len2; i++) {
          if (!isPointNull(points[i * 2], points[i * 2 + 1])) {
            break;
          }
        }
      }
      while (i < len2) {
        var k = drawSegment(ctx, points, i, len2, len2, 1, shape.smooth, smoothMonotone, shape.connectNulls);
        drawSegment(ctx, stackedOnPoints, i + k - 1, k, len2, -1, shape.stackedOnSmooth, smoothMonotone, shape.connectNulls);
        i += k + 1;
        ctx.closePath();
      }
    };
    return ECPolygon2;
  }(Path_default)
);

// node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys.js
function createGridClipPath(cartesian, hasAnimation, seriesModel, done, during) {
  var rect = cartesian.getArea();
  var x = rect.x;
  var y = rect.y;
  var width = rect.width;
  var height = rect.height;
  var lineWidth = seriesModel.get(["lineStyle", "width"]) || 0;
  x -= lineWidth / 2;
  y -= lineWidth / 2;
  width += lineWidth;
  height += lineWidth;
  width = Math.ceil(width);
  if (x !== Math.floor(x)) {
    x = Math.floor(x);
    width++;
  }
  var clipPath = new Rect_default({
    shape: {
      x,
      y,
      width,
      height
    }
  });
  if (hasAnimation) {
    var baseAxis = cartesian.getBaseAxis();
    var isHorizontal = baseAxis.isHorizontal();
    var isAxisInversed = baseAxis.inverse;
    if (isHorizontal) {
      if (isAxisInversed) {
        clipPath.shape.x += width;
      }
      clipPath.shape.width = 0;
    } else {
      if (!isAxisInversed) {
        clipPath.shape.y += height;
      }
      clipPath.shape.height = 0;
    }
    var duringCb = isFunction(during) ? function(percent) {
      during(percent, clipPath);
    } : null;
    initProps(clipPath, {
      shape: {
        width,
        height,
        x,
        y
      }
    }, seriesModel, null, done, duringCb);
  }
  return clipPath;
}
function createPolarClipPath(polar, hasAnimation, seriesModel) {
  var sectorArea = polar.getArea();
  var r0 = round(sectorArea.r0, 1);
  var r = round(sectorArea.r, 1);
  var clipPath = new Sector_default({
    shape: {
      cx: round(polar.cx, 1),
      cy: round(polar.cy, 1),
      r0,
      r,
      startAngle: sectorArea.startAngle,
      endAngle: sectorArea.endAngle,
      clockwise: sectorArea.clockwise
    }
  });
  if (hasAnimation) {
    var isRadial = polar.getBaseAxis().dim === "angle";
    if (isRadial) {
      clipPath.shape.endAngle = sectorArea.startAngle;
    } else {
      clipPath.shape.r = r0;
    }
    initProps(clipPath, {
      shape: {
        endAngle: sectorArea.endAngle,
        r
      }
    }, seriesModel);
  }
  return clipPath;
}
function createClipPath(coordSys, hasAnimation, seriesModel, done, during) {
  if (!coordSys) {
    return null;
  } else if (coordSys.type === "polar") {
    return createPolarClipPath(coordSys, hasAnimation, seriesModel);
  } else if (coordSys.type === "cartesian2d") {
    return createGridClipPath(coordSys, hasAnimation, seriesModel, done, during);
  }
  return null;
}

// node_modules/echarts/lib/chart/line/LineView.js
function isPointsSame(points1, points2) {
  if (points1.length !== points2.length) {
    return;
  }
  for (var i = 0; i < points1.length; i++) {
    if (points1[i] !== points2[i]) {
      return;
    }
  }
  return true;
}
function bboxFromPoints(points) {
  var minX = Infinity;
  var minY = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;
  for (var i = 0; i < points.length; ) {
    var x = points[i++];
    var y = points[i++];
    if (!isNaN(x)) {
      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
    }
    if (!isNaN(y)) {
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }
  }
  return [[minX, minY], [maxX, maxY]];
}
function getBoundingDiff(points1, points2) {
  var _a = bboxFromPoints(points1), min1 = _a[0], max1 = _a[1];
  var _b = bboxFromPoints(points2), min2 = _b[0], max2 = _b[1];
  return Math.max(Math.abs(min1[0] - min2[0]), Math.abs(min1[1] - min2[1]), Math.abs(max1[0] - max2[0]), Math.abs(max1[1] - max2[1]));
}
function getSmooth(smooth) {
  return isNumber(smooth) ? smooth : smooth ? 0.5 : 0;
}
function getStackedOnPoints(coordSys, data, dataCoordInfo) {
  if (!dataCoordInfo.valueDim) {
    return [];
  }
  var len2 = data.count();
  var points = createFloat32Array(len2 * 2);
  for (var idx = 0; idx < len2; idx++) {
    var pt = getStackedOnPoint(dataCoordInfo, coordSys, data, idx);
    points[idx * 2] = pt[0];
    points[idx * 2 + 1] = pt[1];
  }
  return points;
}
function turnPointsIntoStep(points, basePoints, coordSys, stepTurnAt, connectNulls) {
  var baseAxis = coordSys.getBaseAxis();
  var baseIndex = baseAxis.dim === "x" || baseAxis.dim === "radius" ? 0 : 1;
  var stepPoints = [];
  var i = 0;
  var stepPt = [];
  var pt = [];
  var nextPt = [];
  var filteredPoints = [];
  if (connectNulls) {
    for (i = 0; i < points.length; i += 2) {
      var reference = basePoints || points;
      if (!isNaN(reference[i]) && !isNaN(reference[i + 1])) {
        filteredPoints.push(points[i], points[i + 1]);
      }
    }
    points = filteredPoints;
  }
  for (i = 0; i < points.length - 2; i += 2) {
    nextPt[0] = points[i + 2];
    nextPt[1] = points[i + 3];
    pt[0] = points[i];
    pt[1] = points[i + 1];
    stepPoints.push(pt[0], pt[1]);
    switch (stepTurnAt) {
      case "end":
        stepPt[baseIndex] = nextPt[baseIndex];
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
        break;
      case "middle":
        var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
        var stepPt2 = [];
        stepPt[baseIndex] = stepPt2[baseIndex] = middle;
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
        stepPoints.push(stepPt2[0], stepPt2[1]);
        break;
      default:
        stepPt[baseIndex] = pt[baseIndex];
        stepPt[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
    }
  }
  stepPoints.push(points[i++], points[i++]);
  return stepPoints;
}
function clipColorStops(colorStops, maxSize) {
  var newColorStops = [];
  var len2 = colorStops.length;
  var prevOutOfRangeColorStop;
  var prevInRangeColorStop;
  function lerpStop(stop0, stop1, clippedCoord) {
    var coord0 = stop0.coord;
    var p = (clippedCoord - coord0) / (stop1.coord - coord0);
    var color = lerp(p, [stop0.color, stop1.color]);
    return {
      coord: clippedCoord,
      color
    };
  }
  for (var i = 0; i < len2; i++) {
    var stop_1 = colorStops[i];
    var coord = stop_1.coord;
    if (coord < 0) {
      prevOutOfRangeColorStop = stop_1;
    } else if (coord > maxSize) {
      if (prevInRangeColorStop) {
        newColorStops.push(lerpStop(prevInRangeColorStop, stop_1, maxSize));
      } else if (prevOutOfRangeColorStop) {
        newColorStops.push(lerpStop(prevOutOfRangeColorStop, stop_1, 0), lerpStop(prevOutOfRangeColorStop, stop_1, maxSize));
      }
      break;
    } else {
      if (prevOutOfRangeColorStop) {
        newColorStops.push(lerpStop(prevOutOfRangeColorStop, stop_1, 0));
        prevOutOfRangeColorStop = null;
      }
      newColorStops.push(stop_1);
      prevInRangeColorStop = stop_1;
    }
  }
  return newColorStops;
}
function getVisualGradient(data, coordSys, api) {
  var visualMetaList = data.getVisual("visualMeta");
  if (!visualMetaList || !visualMetaList.length || !data.count()) {
    return;
  }
  if (coordSys.type !== "cartesian2d") {
    if (true) {
      console.warn("Visual map on line style is only supported on cartesian2d.");
    }
    return;
  }
  var coordDim;
  var visualMeta;
  for (var i = visualMetaList.length - 1; i >= 0; i--) {
    var dimInfo = data.getDimensionInfo(visualMetaList[i].dimension);
    coordDim = dimInfo && dimInfo.coordDim;
    if (coordDim === "x" || coordDim === "y") {
      visualMeta = visualMetaList[i];
      break;
    }
  }
  if (!visualMeta) {
    if (true) {
      console.warn("Visual map on line style only support x or y dimension.");
    }
    return;
  }
  var axis = coordSys.getAxis(coordDim);
  var colorStops = map(visualMeta.stops, function(stop) {
    return {
      coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)),
      color: stop.color
    };
  });
  var stopLen = colorStops.length;
  var outerColors = visualMeta.outerColors.slice();
  if (stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord) {
    colorStops.reverse();
    outerColors.reverse();
  }
  var colorStopsInRange = clipColorStops(colorStops, coordDim === "x" ? api.getWidth() : api.getHeight());
  var inRangeStopLen = colorStopsInRange.length;
  if (!inRangeStopLen && stopLen) {
    return colorStops[0].coord < 0 ? outerColors[1] ? outerColors[1] : colorStops[stopLen - 1].color : outerColors[0] ? outerColors[0] : colorStops[0].color;
  }
  var tinyExtent = 10;
  var minCoord = colorStopsInRange[0].coord - tinyExtent;
  var maxCoord = colorStopsInRange[inRangeStopLen - 1].coord + tinyExtent;
  var coordSpan = maxCoord - minCoord;
  if (coordSpan < 1e-3) {
    return "transparent";
  }
  each(colorStopsInRange, function(stop) {
    stop.offset = (stop.coord - minCoord) / coordSpan;
  });
  colorStopsInRange.push({
    // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
    offset: inRangeStopLen ? colorStopsInRange[inRangeStopLen - 1].offset : 0.5,
    color: outerColors[1] || "transparent"
  });
  colorStopsInRange.unshift({
    offset: inRangeStopLen ? colorStopsInRange[0].offset : 0.5,
    color: outerColors[0] || "transparent"
  });
  var gradient = new LinearGradient_default(0, 0, 0, 0, colorStopsInRange, true);
  gradient[coordDim] = minCoord;
  gradient[coordDim + "2"] = maxCoord;
  return gradient;
}
function getIsIgnoreFunc(seriesModel, data, coordSys) {
  var showAllSymbol = seriesModel.get("showAllSymbol");
  var isAuto = showAllSymbol === "auto";
  if (showAllSymbol && !isAuto) {
    return;
  }
  var categoryAxis = coordSys.getAxesByScale("ordinal")[0];
  if (!categoryAxis) {
    return;
  }
  if (isAuto && canShowAllSymbolForCategory(categoryAxis, data)) {
    return;
  }
  var categoryDataDim = data.mapDimension(categoryAxis.dim);
  var labelMap = {};
  each(categoryAxis.getViewLabels(), function(labelItem) {
    var ordinalNumber = categoryAxis.scale.getRawOrdinalNumber(labelItem.tickValue);
    labelMap[ordinalNumber] = 1;
  });
  return function(dataIndex) {
    return !labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex));
  };
}
function canShowAllSymbolForCategory(categoryAxis, data) {
  var axisExtent = categoryAxis.getExtent();
  var availSize = Math.abs(axisExtent[1] - axisExtent[0]) / categoryAxis.scale.count();
  isNaN(availSize) && (availSize = 0);
  var dataLen = data.count();
  var step = Math.max(1, Math.round(dataLen / 5));
  for (var dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
    if (Symbol_default.getSymbolSize(
      data,
      dataIndex
      // Only for cartesian, where `isHorizontal` exists.
    )[categoryAxis.isHorizontal() ? 1 : 0] * 1.5 > availSize) {
      return false;
    }
  }
  return true;
}
function isPointNull2(x, y) {
  return isNaN(x) || isNaN(y);
}
function getLastIndexNotNull(points) {
  var len2 = points.length / 2;
  for (; len2 > 0; len2--) {
    if (!isPointNull2(points[len2 * 2 - 2], points[len2 * 2 - 1])) {
      break;
    }
  }
  return len2 - 1;
}
function getPointAtIndex(points, idx) {
  return [points[idx * 2], points[idx * 2 + 1]];
}
function getIndexRange(points, xOrY, dim) {
  var len2 = points.length / 2;
  var dimIdx = dim === "x" ? 0 : 1;
  var a;
  var b;
  var prevIndex = 0;
  var nextIndex = -1;
  for (var i = 0; i < len2; i++) {
    b = points[i * 2 + dimIdx];
    if (isNaN(b) || isNaN(points[i * 2 + 1 - dimIdx])) {
      continue;
    }
    if (i === 0) {
      a = b;
      continue;
    }
    if (a <= xOrY && b >= xOrY || a >= xOrY && b <= xOrY) {
      nextIndex = i;
      break;
    }
    prevIndex = i;
    a = b;
  }
  return {
    range: [prevIndex, nextIndex],
    t: (xOrY - a) / (b - a)
  };
}
function anyStateShowEndLabel(seriesModel) {
  if (seriesModel.get(["endLabel", "show"])) {
    return true;
  }
  for (var i = 0; i < SPECIAL_STATES.length; i++) {
    if (seriesModel.get([SPECIAL_STATES[i], "endLabel", "show"])) {
      return true;
    }
  }
  return false;
}
function createLineClipPath(lineView, coordSys, hasAnimation, seriesModel) {
  if (isCoordinateSystemType(coordSys, "cartesian2d")) {
    var endLabelModel_1 = seriesModel.getModel("endLabel");
    var valueAnimation_1 = endLabelModel_1.get("valueAnimation");
    var data_1 = seriesModel.getData();
    var labelAnimationRecord_1 = {
      lastFrameIndex: 0
    };
    var during = anyStateShowEndLabel(seriesModel) ? function(percent, clipRect) {
      lineView._endLabelOnDuring(percent, clipRect, data_1, labelAnimationRecord_1, valueAnimation_1, endLabelModel_1, coordSys);
    } : null;
    var isHorizontal = coordSys.getBaseAxis().isHorizontal();
    var clipPath = createGridClipPath(coordSys, hasAnimation, seriesModel, function() {
      var endLabel = lineView._endLabel;
      if (endLabel && hasAnimation) {
        if (labelAnimationRecord_1.originalX != null) {
          endLabel.attr({
            x: labelAnimationRecord_1.originalX,
            y: labelAnimationRecord_1.originalY
          });
        }
      }
    }, during);
    if (!seriesModel.get("clip", true)) {
      var rectShape = clipPath.shape;
      var expandSize = Math.max(rectShape.width, rectShape.height);
      if (isHorizontal) {
        rectShape.y -= expandSize;
        rectShape.height += expandSize * 2;
      } else {
        rectShape.x -= expandSize;
        rectShape.width += expandSize * 2;
      }
    }
    if (during) {
      during(1, clipPath);
    }
    return clipPath;
  } else {
    if (true) {
      if (seriesModel.get(["endLabel", "show"])) {
        console.warn("endLabel is not supported for lines in polar systems.");
      }
    }
    return createPolarClipPath(coordSys, hasAnimation, seriesModel);
  }
}
function getEndLabelStateSpecified(endLabelModel, coordSys) {
  var baseAxis = coordSys.getBaseAxis();
  var isHorizontal = baseAxis.isHorizontal();
  var isBaseInversed = baseAxis.inverse;
  var align = isHorizontal ? isBaseInversed ? "right" : "left" : "center";
  var verticalAlign = isHorizontal ? "middle" : isBaseInversed ? "top" : "bottom";
  return {
    normal: {
      align: endLabelModel.get("align") || align,
      verticalAlign: endLabelModel.get("verticalAlign") || verticalAlign
    }
  };
}
var LineView = (
  /** @class */
  function(_super) {
    __extends(LineView2, _super);
    function LineView2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    LineView2.prototype.init = function() {
      var lineGroup = new Group_default();
      var symbolDraw = new SymbolDraw_default();
      this.group.add(symbolDraw.group);
      this._symbolDraw = symbolDraw;
      this._lineGroup = lineGroup;
      this._changePolyState = bind(this._changePolyState, this);
    };
    LineView2.prototype.render = function(seriesModel, ecModel, api) {
      var coordSys = seriesModel.coordinateSystem;
      var group = this.group;
      var data = seriesModel.getData();
      var lineStyleModel = seriesModel.getModel("lineStyle");
      var areaStyleModel = seriesModel.getModel("areaStyle");
      var points = data.getLayout("points") || [];
      var isCoordSysPolar = coordSys.type === "polar";
      var prevCoordSys = this._coordSys;
      var symbolDraw = this._symbolDraw;
      var polyline = this._polyline;
      var polygon = this._polygon;
      var lineGroup = this._lineGroup;
      var hasAnimation = !ecModel.ssr && seriesModel.get("animation");
      var isAreaChart = !areaStyleModel.isEmpty();
      var valueOrigin = areaStyleModel.get("origin");
      var dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);
      var stackedOnPoints = isAreaChart && getStackedOnPoints(coordSys, data, dataCoordInfo);
      var showSymbol = seriesModel.get("showSymbol");
      var connectNulls = seriesModel.get("connectNulls");
      var isIgnoreFunc = showSymbol && !isCoordSysPolar && getIsIgnoreFunc(seriesModel, data, coordSys);
      var oldData = this._data;
      oldData && oldData.eachItemGraphicEl(function(el, idx) {
        if (el.__temp) {
          group.remove(el);
          oldData.setItemGraphicEl(idx, null);
        }
      });
      if (!showSymbol) {
        symbolDraw.remove();
      }
      group.add(lineGroup);
      var step = !isCoordSysPolar ? seriesModel.get("step") : false;
      var clipShapeForSymbol;
      if (coordSys && coordSys.getArea && seriesModel.get("clip", true)) {
        clipShapeForSymbol = coordSys.getArea();
        if (clipShapeForSymbol.width != null) {
          clipShapeForSymbol.x -= 0.1;
          clipShapeForSymbol.y -= 0.1;
          clipShapeForSymbol.width += 0.2;
          clipShapeForSymbol.height += 0.2;
        } else if (clipShapeForSymbol.r0) {
          clipShapeForSymbol.r0 -= 0.5;
          clipShapeForSymbol.r += 0.5;
        }
      }
      this._clipShapeForSymbol = clipShapeForSymbol;
      var visualColor = getVisualGradient(data, coordSys, api) || data.getVisual("style")[data.getVisual("drawType")];
      if (!(polyline && prevCoordSys.type === coordSys.type && step === this._step)) {
        showSymbol && symbolDraw.updateData(data, {
          isIgnore: isIgnoreFunc,
          clipShape: clipShapeForSymbol,
          disableAnimation: true,
          getSymbolPoint: function(idx) {
            return [points[idx * 2], points[idx * 2 + 1]];
          }
        });
        hasAnimation && this._initSymbolLabelAnimation(data, coordSys, clipShapeForSymbol);
        if (step) {
          if (stackedOnPoints) {
            stackedOnPoints = turnPointsIntoStep(stackedOnPoints, points, coordSys, step, connectNulls);
          }
          points = turnPointsIntoStep(points, null, coordSys, step, connectNulls);
        }
        polyline = this._newPolyline(points);
        if (isAreaChart) {
          polygon = this._newPolygon(points, stackedOnPoints);
        } else if (polygon) {
          lineGroup.remove(polygon);
          polygon = this._polygon = null;
        }
        if (!isCoordSysPolar) {
          this._initOrUpdateEndLabel(seriesModel, coordSys, convertToColorString(visualColor));
        }
        lineGroup.setClipPath(createLineClipPath(this, coordSys, true, seriesModel));
      } else {
        if (isAreaChart && !polygon) {
          polygon = this._newPolygon(points, stackedOnPoints);
        } else if (polygon && !isAreaChart) {
          lineGroup.remove(polygon);
          polygon = this._polygon = null;
        }
        if (!isCoordSysPolar) {
          this._initOrUpdateEndLabel(seriesModel, coordSys, convertToColorString(visualColor));
        }
        var oldClipPath = lineGroup.getClipPath();
        if (oldClipPath) {
          var newClipPath = createLineClipPath(this, coordSys, false, seriesModel);
          initProps(oldClipPath, {
            shape: newClipPath.shape
          }, seriesModel);
        } else {
          lineGroup.setClipPath(createLineClipPath(this, coordSys, true, seriesModel));
        }
        showSymbol && symbolDraw.updateData(data, {
          isIgnore: isIgnoreFunc,
          clipShape: clipShapeForSymbol,
          disableAnimation: true,
          getSymbolPoint: function(idx) {
            return [points[idx * 2], points[idx * 2 + 1]];
          }
        });
        if (!isPointsSame(this._stackedOnPoints, stackedOnPoints) || !isPointsSame(this._points, points)) {
          if (hasAnimation) {
            this._doUpdateAnimation(data, stackedOnPoints, coordSys, api, step, valueOrigin, connectNulls);
          } else {
            if (step) {
              if (stackedOnPoints) {
                stackedOnPoints = turnPointsIntoStep(stackedOnPoints, points, coordSys, step, connectNulls);
              }
              points = turnPointsIntoStep(points, null, coordSys, step, connectNulls);
            }
            polyline.setShape({
              points
            });
            polygon && polygon.setShape({
              points,
              stackedOnPoints
            });
          }
        }
      }
      var emphasisModel = seriesModel.getModel("emphasis");
      var focus = emphasisModel.get("focus");
      var blurScope = emphasisModel.get("blurScope");
      var emphasisDisabled = emphasisModel.get("disabled");
      polyline.useStyle(defaults(
        // Use color in lineStyle first
        lineStyleModel.getLineStyle(),
        {
          fill: "none",
          stroke: visualColor,
          lineJoin: "bevel"
        }
      ));
      setStatesStylesFromModel(polyline, seriesModel, "lineStyle");
      if (polyline.style.lineWidth > 0 && seriesModel.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var emphasisLineStyle = polyline.getState("emphasis").style;
        emphasisLineStyle.lineWidth = +polyline.style.lineWidth + 1;
      }
      getECData(polyline).seriesIndex = seriesModel.seriesIndex;
      toggleHoverEmphasis(polyline, focus, blurScope, emphasisDisabled);
      var smooth = getSmooth(seriesModel.get("smooth"));
      var smoothMonotone = seriesModel.get("smoothMonotone");
      polyline.setShape({
        smooth,
        smoothMonotone,
        connectNulls
      });
      if (polygon) {
        var stackedOnSeries = data.getCalculationInfo("stackedOnSeries");
        var stackedOnSmooth = 0;
        polygon.useStyle(defaults(areaStyleModel.getAreaStyle(), {
          fill: visualColor,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: data.getVisual("style").decal
        }));
        if (stackedOnSeries) {
          stackedOnSmooth = getSmooth(stackedOnSeries.get("smooth"));
        }
        polygon.setShape({
          smooth,
          stackedOnSmooth,
          smoothMonotone,
          connectNulls
        });
        setStatesStylesFromModel(polygon, seriesModel, "areaStyle");
        getECData(polygon).seriesIndex = seriesModel.seriesIndex;
        toggleHoverEmphasis(polygon, focus, blurScope, emphasisDisabled);
      }
      var changePolyState = this._changePolyState;
      data.eachItemGraphicEl(function(el) {
        el && (el.onHoverStateChange = changePolyState);
      });
      this._polyline.onHoverStateChange = changePolyState;
      this._data = data;
      this._coordSys = coordSys;
      this._stackedOnPoints = stackedOnPoints;
      this._points = points;
      this._step = step;
      this._valueOrigin = valueOrigin;
      if (seriesModel.get("triggerLineEvent")) {
        this.packEventData(seriesModel, polyline);
        polygon && this.packEventData(seriesModel, polygon);
      }
    };
    LineView2.prototype.packEventData = function(seriesModel, el) {
      getECData(el).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: seriesModel.componentIndex,
        seriesIndex: seriesModel.seriesIndex,
        seriesName: seriesModel.name,
        seriesType: "line"
      };
    };
    LineView2.prototype.highlight = function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData();
      var dataIndex = queryDataIndex(data, payload);
      this._changePolyState("emphasis");
      if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
        var points = data.getLayout("points");
        var symbol = data.getItemGraphicEl(dataIndex);
        if (!symbol) {
          var x = points[dataIndex * 2];
          var y = points[dataIndex * 2 + 1];
          if (isNaN(x) || isNaN(y)) {
            return;
          }
          if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(x, y)) {
            return;
          }
          var zlevel = seriesModel.get("zlevel") || 0;
          var z = seriesModel.get("z") || 0;
          symbol = new Symbol_default(data, dataIndex);
          symbol.x = x;
          symbol.y = y;
          symbol.setZ(zlevel, z);
          var symbolLabel = symbol.getSymbolPath().getTextContent();
          if (symbolLabel) {
            symbolLabel.zlevel = zlevel;
            symbolLabel.z = z;
            symbolLabel.z2 = this._polyline.z2 + 1;
          }
          symbol.__temp = true;
          data.setItemGraphicEl(dataIndex, symbol);
          symbol.stopSymbolAnimation(true);
          this.group.add(symbol);
        }
        symbol.highlight();
      } else {
        Chart_default.prototype.highlight.call(this, seriesModel, ecModel, api, payload);
      }
    };
    LineView2.prototype.downplay = function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData();
      var dataIndex = queryDataIndex(data, payload);
      this._changePolyState("normal");
      if (dataIndex != null && dataIndex >= 0) {
        var symbol = data.getItemGraphicEl(dataIndex);
        if (symbol) {
          if (symbol.__temp) {
            data.setItemGraphicEl(dataIndex, null);
            this.group.remove(symbol);
          } else {
            symbol.downplay();
          }
        }
      } else {
        Chart_default.prototype.downplay.call(this, seriesModel, ecModel, api, payload);
      }
    };
    LineView2.prototype._changePolyState = function(toState) {
      var polygon = this._polygon;
      setStatesFlag(this._polyline, toState);
      polygon && setStatesFlag(polygon, toState);
    };
    LineView2.prototype._newPolyline = function(points) {
      var polyline = this._polyline;
      if (polyline) {
        this._lineGroup.remove(polyline);
      }
      polyline = new ECPolyline({
        shape: {
          points
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      });
      this._lineGroup.add(polyline);
      this._polyline = polyline;
      return polyline;
    };
    LineView2.prototype._newPolygon = function(points, stackedOnPoints) {
      var polygon = this._polygon;
      if (polygon) {
        this._lineGroup.remove(polygon);
      }
      polygon = new ECPolygon({
        shape: {
          points,
          stackedOnPoints
        },
        segmentIgnoreThreshold: 2
      });
      this._lineGroup.add(polygon);
      this._polygon = polygon;
      return polygon;
    };
    LineView2.prototype._initSymbolLabelAnimation = function(data, coordSys, clipShape) {
      var isHorizontalOrRadial;
      var isCoordSysPolar;
      var baseAxis = coordSys.getBaseAxis();
      var isAxisInverse = baseAxis.inverse;
      if (coordSys.type === "cartesian2d") {
        isHorizontalOrRadial = baseAxis.isHorizontal();
        isCoordSysPolar = false;
      } else if (coordSys.type === "polar") {
        isHorizontalOrRadial = baseAxis.dim === "angle";
        isCoordSysPolar = true;
      }
      var seriesModel = data.hostModel;
      var seriesDuration = seriesModel.get("animationDuration");
      if (isFunction(seriesDuration)) {
        seriesDuration = seriesDuration(null);
      }
      var seriesDelay = seriesModel.get("animationDelay") || 0;
      var seriesDelayValue = isFunction(seriesDelay) ? seriesDelay(null) : seriesDelay;
      data.eachItemGraphicEl(function(symbol, idx) {
        var el = symbol;
        if (el) {
          var point = [symbol.x, symbol.y];
          var start = void 0;
          var end = void 0;
          var current = void 0;
          if (clipShape) {
            if (isCoordSysPolar) {
              var polarClip = clipShape;
              var coord = coordSys.pointToCoord(point);
              if (isHorizontalOrRadial) {
                start = polarClip.startAngle;
                end = polarClip.endAngle;
                current = -coord[1] / 180 * Math.PI;
              } else {
                start = polarClip.r0;
                end = polarClip.r;
                current = coord[0];
              }
            } else {
              var gridClip = clipShape;
              if (isHorizontalOrRadial) {
                start = gridClip.x;
                end = gridClip.x + gridClip.width;
                current = symbol.x;
              } else {
                start = gridClip.y + gridClip.height;
                end = gridClip.y;
                current = symbol.y;
              }
            }
          }
          var ratio = end === start ? 0 : (current - start) / (end - start);
          if (isAxisInverse) {
            ratio = 1 - ratio;
          }
          var delay = isFunction(seriesDelay) ? seriesDelay(idx) : seriesDuration * ratio + seriesDelayValue;
          var symbolPath = el.getSymbolPath();
          var text = symbolPath.getTextContent();
          el.attr({
            scaleX: 0,
            scaleY: 0
          });
          el.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: true,
            delay
          });
          if (text) {
            text.animateFrom({
              style: {
                opacity: 0
              }
            }, {
              duration: 300,
              delay
            });
          }
          symbolPath.disableLabelAnimation = true;
        }
      });
    };
    LineView2.prototype._initOrUpdateEndLabel = function(seriesModel, coordSys, inheritColor) {
      var endLabelModel = seriesModel.getModel("endLabel");
      if (anyStateShowEndLabel(seriesModel)) {
        var data_2 = seriesModel.getData();
        var polyline = this._polyline;
        var points = data_2.getLayout("points");
        if (!points) {
          polyline.removeTextContent();
          this._endLabel = null;
          return;
        }
        var endLabel = this._endLabel;
        if (!endLabel) {
          endLabel = this._endLabel = new Text_default({
            z2: 200
            // should be higher than item symbol
          });
          endLabel.ignoreClip = true;
          polyline.setTextContent(this._endLabel);
          polyline.disableLabelAnimation = true;
        }
        var dataIndex = getLastIndexNotNull(points);
        if (dataIndex >= 0) {
          setLabelStyle(polyline, getLabelStatesModels(seriesModel, "endLabel"), {
            inheritColor,
            labelFetcher: seriesModel,
            labelDataIndex: dataIndex,
            defaultText: function(dataIndex2, opt, interpolatedValue) {
              return interpolatedValue != null ? getDefaultInterpolatedLabel(data_2, interpolatedValue) : getDefaultLabel(data_2, dataIndex2);
            },
            enableTextSetter: true
          }, getEndLabelStateSpecified(endLabelModel, coordSys));
          polyline.textConfig.position = null;
        }
      } else if (this._endLabel) {
        this._polyline.removeTextContent();
        this._endLabel = null;
      }
    };
    LineView2.prototype._endLabelOnDuring = function(percent, clipRect, data, animationRecord, valueAnimation, endLabelModel, coordSys) {
      var endLabel = this._endLabel;
      var polyline = this._polyline;
      if (endLabel) {
        if (percent < 1 && animationRecord.originalX == null) {
          animationRecord.originalX = endLabel.x;
          animationRecord.originalY = endLabel.y;
        }
        var points = data.getLayout("points");
        var seriesModel = data.hostModel;
        var connectNulls = seriesModel.get("connectNulls");
        var precision = endLabelModel.get("precision");
        var distance = endLabelModel.get("distance") || 0;
        var baseAxis = coordSys.getBaseAxis();
        var isHorizontal = baseAxis.isHorizontal();
        var isBaseInversed = baseAxis.inverse;
        var clipShape = clipRect.shape;
        var xOrY = isBaseInversed ? isHorizontal ? clipShape.x : clipShape.y + clipShape.height : isHorizontal ? clipShape.x + clipShape.width : clipShape.y;
        var distanceX = (isHorizontal ? distance : 0) * (isBaseInversed ? -1 : 1);
        var distanceY = (isHorizontal ? 0 : -distance) * (isBaseInversed ? -1 : 1);
        var dim = isHorizontal ? "x" : "y";
        var dataIndexRange = getIndexRange(points, xOrY, dim);
        var indices = dataIndexRange.range;
        var diff = indices[1] - indices[0];
        var value = void 0;
        if (diff >= 1) {
          if (diff > 1 && !connectNulls) {
            var pt = getPointAtIndex(points, indices[0]);
            endLabel.attr({
              x: pt[0] + distanceX,
              y: pt[1] + distanceY
            });
            valueAnimation && (value = seriesModel.getRawValue(indices[0]));
          } else {
            var pt = polyline.getPointOn(xOrY, dim);
            pt && endLabel.attr({
              x: pt[0] + distanceX,
              y: pt[1] + distanceY
            });
            var startValue = seriesModel.getRawValue(indices[0]);
            var endValue = seriesModel.getRawValue(indices[1]);
            valueAnimation && (value = interpolateRawValues(data, precision, startValue, endValue, dataIndexRange.t));
          }
          animationRecord.lastFrameIndex = indices[0];
        } else {
          var idx = percent === 1 || animationRecord.lastFrameIndex > 0 ? indices[0] : 0;
          var pt = getPointAtIndex(points, idx);
          valueAnimation && (value = seriesModel.getRawValue(idx));
          endLabel.attr({
            x: pt[0] + distanceX,
            y: pt[1] + distanceY
          });
        }
        if (valueAnimation) {
          var inner4 = labelInner(endLabel);
          if (typeof inner4.setLabelText === "function") {
            inner4.setLabelText(value);
          }
        }
      }
    };
    LineView2.prototype._doUpdateAnimation = function(data, stackedOnPoints, coordSys, api, step, valueOrigin, connectNulls) {
      var polyline = this._polyline;
      var polygon = this._polygon;
      var seriesModel = data.hostModel;
      var diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys, this._valueOrigin, valueOrigin);
      var current = diff.current;
      var stackedOnCurrent = diff.stackedOnCurrent;
      var next = diff.next;
      var stackedOnNext = diff.stackedOnNext;
      if (step) {
        stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, diff.current, coordSys, step, connectNulls);
        current = turnPointsIntoStep(diff.current, null, coordSys, step, connectNulls);
        stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, diff.next, coordSys, step, connectNulls);
        next = turnPointsIntoStep(diff.next, null, coordSys, step, connectNulls);
      }
      if (getBoundingDiff(current, next) > 3e3 || polygon && getBoundingDiff(stackedOnCurrent, stackedOnNext) > 3e3) {
        polyline.stopAnimation();
        polyline.setShape({
          points: next
        });
        if (polygon) {
          polygon.stopAnimation();
          polygon.setShape({
            points: next,
            stackedOnPoints: stackedOnNext
          });
        }
        return;
      }
      polyline.shape.__points = diff.current;
      polyline.shape.points = current;
      var target = {
        shape: {
          points: next
        }
      };
      if (diff.current !== current) {
        target.shape.__points = diff.next;
      }
      polyline.stopAnimation();
      updateProps(polyline, target, seriesModel);
      if (polygon) {
        polygon.setShape({
          // Reuse the points with polyline.
          points: current,
          stackedOnPoints: stackedOnCurrent
        });
        polygon.stopAnimation();
        updateProps(polygon, {
          shape: {
            stackedOnPoints: stackedOnNext
          }
        }, seriesModel);
        if (polyline.shape.points !== polygon.shape.points) {
          polygon.shape.points = polyline.shape.points;
        }
      }
      var updatedDataInfo = [];
      var diffStatus = diff.status;
      for (var i = 0; i < diffStatus.length; i++) {
        var cmd = diffStatus[i].cmd;
        if (cmd === "=") {
          var el = data.getItemGraphicEl(diffStatus[i].idx1);
          if (el) {
            updatedDataInfo.push({
              el,
              ptIdx: i
              // Index of points
            });
          }
        }
      }
      if (polyline.animators && polyline.animators.length) {
        polyline.animators[0].during(function() {
          polygon && polygon.dirtyShape();
          var points = polyline.shape.__points;
          for (var i2 = 0; i2 < updatedDataInfo.length; i2++) {
            var el2 = updatedDataInfo[i2].el;
            var offset = updatedDataInfo[i2].ptIdx * 2;
            el2.x = points[offset];
            el2.y = points[offset + 1];
            el2.markRedraw();
          }
        });
      }
    };
    LineView2.prototype.remove = function(ecModel) {
      var group = this.group;
      var oldData = this._data;
      this._lineGroup.removeAll();
      this._symbolDraw.remove(true);
      oldData && oldData.eachItemGraphicEl(function(el, idx) {
        if (el.__temp) {
          group.remove(el);
          oldData.setItemGraphicEl(idx, null);
        }
      });
      this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    };
    LineView2.type = "line";
    return LineView2;
  }(Chart_default)
);
var LineView_default = LineView;

// node_modules/echarts/lib/layout/points.js
function pointsLayout(seriesType, forceStoreInTypedArray) {
  return {
    seriesType,
    plan: createRenderPlanner(),
    reset: function(seriesModel) {
      var data = seriesModel.getData();
      var coordSys = seriesModel.coordinateSystem;
      var pipelineContext = seriesModel.pipelineContext;
      var useTypedArray = forceStoreInTypedArray || pipelineContext.large;
      if (!coordSys) {
        return;
      }
      var dims = map(coordSys.dimensions, function(dim) {
        return data.mapDimension(dim);
      }).slice(0, 2);
      var dimLen = dims.length;
      var stackResultDim = data.getCalculationInfo("stackResultDimension");
      if (isDimensionStacked(data, dims[0])) {
        dims[0] = stackResultDim;
      }
      if (isDimensionStacked(data, dims[1])) {
        dims[1] = stackResultDim;
      }
      var store = data.getStore();
      var dimIdx0 = data.getDimensionIndex(dims[0]);
      var dimIdx1 = data.getDimensionIndex(dims[1]);
      return dimLen && {
        progress: function(params, data2) {
          var segCount = params.end - params.start;
          var points = useTypedArray && createFloat32Array(segCount * dimLen);
          var tmpIn = [];
          var tmpOut = [];
          for (var i = params.start, offset = 0; i < params.end; i++) {
            var point = void 0;
            if (dimLen === 1) {
              var x = store.get(dimIdx0, i);
              point = coordSys.dataToPoint(x, null, tmpOut);
            } else {
              tmpIn[0] = store.get(dimIdx0, i);
              tmpIn[1] = store.get(dimIdx1, i);
              point = coordSys.dataToPoint(tmpIn, null, tmpOut);
            }
            if (useTypedArray) {
              points[offset++] = point[0];
              points[offset++] = point[1];
            } else {
              data2.setItemLayout(i, point.slice());
            }
          }
          useTypedArray && data2.setLayout("points", points);
        }
      };
    }
  };
}

// node_modules/echarts/lib/processor/dataSample.js
var samplers = {
  average: function(frame) {
    var sum2 = 0;
    var count = 0;
    for (var i = 0; i < frame.length; i++) {
      if (!isNaN(frame[i])) {
        sum2 += frame[i];
        count++;
      }
    }
    return count === 0 ? NaN : sum2 / count;
  },
  sum: function(frame) {
    var sum2 = 0;
    for (var i = 0; i < frame.length; i++) {
      sum2 += frame[i] || 0;
    }
    return sum2;
  },
  max: function(frame) {
    var max = -Infinity;
    for (var i = 0; i < frame.length; i++) {
      frame[i] > max && (max = frame[i]);
    }
    return isFinite(max) ? max : NaN;
  },
  min: function(frame) {
    var min = Infinity;
    for (var i = 0; i < frame.length; i++) {
      frame[i] < min && (min = frame[i]);
    }
    return isFinite(min) ? min : NaN;
  },
  // TODO
  // Median
  nearest: function(frame) {
    return frame[0];
  }
};
var indexSampler = function(frame) {
  return Math.round(frame.length / 2);
};
function dataSample(seriesType) {
  return {
    seriesType,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var sampling = seriesModel.get("sampling");
      var coordSys = seriesModel.coordinateSystem;
      var count = data.count();
      if (count > 10 && coordSys.type === "cartesian2d" && sampling) {
        var baseAxis = coordSys.getBaseAxis();
        var valueAxis = coordSys.getOtherAxis(baseAxis);
        var extent = baseAxis.getExtent();
        var dpr = api.getDevicePixelRatio();
        var size = Math.abs(extent[1] - extent[0]) * (dpr || 1);
        var rate = Math.round(count / size);
        if (isFinite(rate) && rate > 1) {
          if (sampling === "lttb") {
            seriesModel.setData(data.lttbDownSample(data.mapDimension(valueAxis.dim), 1 / rate));
          } else if (sampling === "minmax") {
            seriesModel.setData(data.minmaxDownSample(data.mapDimension(valueAxis.dim), 1 / rate));
          }
          var sampler = void 0;
          if (isString(sampling)) {
            sampler = samplers[sampling];
          } else if (isFunction(sampling)) {
            sampler = sampling;
          }
          if (sampler) {
            seriesModel.setData(data.downSample(data.mapDimension(valueAxis.dim), 1 / rate, sampler, indexSampler));
          }
        }
      }
    }
  };
}

// node_modules/echarts/lib/chart/line/install.js
function install5(registers) {
  registers.registerChartView(LineView_default);
  registers.registerSeriesModel(LineSeries_default);
  registers.registerLayout(pointsLayout("line", true));
  registers.registerVisual({
    seriesType: "line",
    reset: function(seriesModel) {
      var data = seriesModel.getData();
      var lineStyle = seriesModel.getModel("lineStyle").getLineStyle();
      if (lineStyle && !lineStyle.stroke) {
        lineStyle.stroke = data.getVisual("style").fill;
      }
      data.setVisual("legendLineStyle", lineStyle);
    }
  });
  registers.registerProcessor(registers.PRIORITY.PROCESSOR.STATISTIC, dataSample("line"));
}

// node_modules/echarts/lib/chart/bar/BaseBarSeries.js
var BaseBarSeriesModel = (
  /** @class */
  function(_super) {
    __extends(BaseBarSeriesModel2, _super);
    function BaseBarSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = BaseBarSeriesModel2.type;
      return _this;
    }
    BaseBarSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesData_default(null, this, {
        useEncodeDefaulter: true
      });
    };
    BaseBarSeriesModel2.prototype.getMarkerPosition = function(value, dims, startingAtTick) {
      var coordSys = this.coordinateSystem;
      if (coordSys && coordSys.clampData) {
        var clampData_1 = coordSys.clampData(value);
        var pt_1 = coordSys.dataToPoint(clampData_1);
        if (startingAtTick) {
          each(coordSys.getAxes(), function(axis, idx) {
            if (axis.type === "category" && dims != null) {
              var tickCoords = axis.getTicksCoords();
              var alignTicksWithLabel = axis.getTickModel().get("alignWithLabel");
              var targetTickId = clampData_1[idx];
              var isEnd = dims[idx] === "x1" || dims[idx] === "y1";
              if (isEnd && !alignTicksWithLabel) {
                targetTickId += 1;
              }
              if (tickCoords.length < 2) {
                return;
              } else if (tickCoords.length === 2) {
                pt_1[idx] = axis.toGlobalCoord(axis.getExtent()[isEnd ? 1 : 0]);
                return;
              }
              var leftCoord = void 0;
              var coord = void 0;
              var stepTickValue = 1;
              for (var i = 0; i < tickCoords.length; i++) {
                var tickCoord = tickCoords[i].coord;
                var tickValue = i === tickCoords.length - 1 ? tickCoords[i - 1].tickValue + stepTickValue : tickCoords[i].tickValue;
                if (tickValue === targetTickId) {
                  coord = tickCoord;
                  break;
                } else if (tickValue < targetTickId) {
                  leftCoord = tickCoord;
                } else if (leftCoord != null && tickValue > targetTickId) {
                  coord = (tickCoord + leftCoord) / 2;
                  break;
                }
                if (i === 1) {
                  stepTickValue = tickValue - tickCoords[0].tickValue;
                }
              }
              if (coord == null) {
                if (!leftCoord) {
                  coord = tickCoords[0].coord;
                } else if (leftCoord) {
                  coord = tickCoords[tickCoords.length - 1].coord;
                }
              }
              pt_1[idx] = axis.toGlobalCoord(coord);
            }
          });
        } else {
          var data = this.getData();
          var offset = data.getLayout("offset");
          var size = data.getLayout("size");
          var offsetIndex = coordSys.getBaseAxis().isHorizontal() ? 0 : 1;
          pt_1[offsetIndex] += offset + size / 2;
        }
        return pt_1;
      }
      return [NaN, NaN];
    };
    BaseBarSeriesModel2.type = "series.__base_bar__";
    BaseBarSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: true,
      // stack: null
      // Cartesian coordinate system
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      barMinHeight: 0,
      barMinAngle: 0,
      // cursor: null,
      large: false,
      largeThreshold: 400,
      progressive: 3e3,
      progressiveChunkMode: "mod"
    };
    return BaseBarSeriesModel2;
  }(Series_default)
);
Series_default.registerClass(BaseBarSeriesModel);
var BaseBarSeries_default = BaseBarSeriesModel;

// node_modules/echarts/lib/chart/bar/BarSeries.js
var BarSeriesModel = (
  /** @class */
  function(_super) {
    __extends(BarSeriesModel2, _super);
    function BarSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = BarSeriesModel2.type;
      return _this;
    }
    BarSeriesModel2.prototype.getInitialData = function() {
      return createSeriesData_default(null, this, {
        useEncodeDefaulter: true,
        createInvertedIndices: !!this.get("realtimeSort", true) || null
      });
    };
    BarSeriesModel2.prototype.getProgressive = function() {
      return this.get("large") ? this.get("progressive") : false;
    };
    BarSeriesModel2.prototype.getProgressiveThreshold = function() {
      var progressiveThreshold = this.get("progressiveThreshold");
      var largeThreshold = this.get("largeThreshold");
      if (largeThreshold > progressiveThreshold) {
        progressiveThreshold = largeThreshold;
      }
      return progressiveThreshold;
    };
    BarSeriesModel2.prototype.brushSelector = function(dataIndex, data, selectors) {
      return selectors.rect(data.getItemLayout(dataIndex));
    };
    BarSeriesModel2.type = "series.bar";
    BarSeriesModel2.dependencies = ["grid", "polar"];
    BarSeriesModel2.defaultOption = inheritDefaultOption(BaseBarSeries_default.defaultOption, {
      // If clipped
      // Only available on cartesian2d
      clip: true,
      roundCap: false,
      showBackground: false,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
        borderColor: null,
        borderWidth: 0,
        borderType: "solid",
        borderRadius: 0,
        shadowBlur: 0,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      },
      realtimeSort: false
    });
    return BarSeriesModel2;
  }(BaseBarSeries_default)
);
var BarSeries_default = BarSeriesModel;

// node_modules/echarts/lib/util/shape/sausage.js
var SausageShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function SausageShape2() {
      this.cx = 0;
      this.cy = 0;
      this.r0 = 0;
      this.r = 0;
      this.startAngle = 0;
      this.endAngle = Math.PI * 2;
      this.clockwise = true;
    }
    return SausageShape2;
  }()
);
var SausagePath = (
  /** @class */
  function(_super) {
    __extends(SausagePath2, _super);
    function SausagePath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "sausage";
      return _this;
    }
    SausagePath2.prototype.getDefaultShape = function() {
      return new SausageShape();
    };
    SausagePath2.prototype.buildPath = function(ctx, shape) {
      var cx = shape.cx;
      var cy = shape.cy;
      var r0 = Math.max(shape.r0 || 0, 0);
      var r = Math.max(shape.r, 0);
      var dr = (r - r0) * 0.5;
      var rCenter = r0 + dr;
      var startAngle = shape.startAngle;
      var endAngle = shape.endAngle;
      var clockwise = shape.clockwise;
      var PI22 = Math.PI * 2;
      var lessThanCircle = clockwise ? endAngle - startAngle < PI22 : startAngle - endAngle < PI22;
      if (!lessThanCircle) {
        startAngle = endAngle - (clockwise ? PI22 : -PI22);
      }
      var unitStartX = Math.cos(startAngle);
      var unitStartY = Math.sin(startAngle);
      var unitEndX = Math.cos(endAngle);
      var unitEndY = Math.sin(endAngle);
      if (lessThanCircle) {
        ctx.moveTo(unitStartX * r0 + cx, unitStartY * r0 + cy);
        ctx.arc(unitStartX * rCenter + cx, unitStartY * rCenter + cy, dr, -Math.PI + startAngle, startAngle, !clockwise);
      } else {
        ctx.moveTo(unitStartX * r + cx, unitStartY * r + cy);
      }
      ctx.arc(cx, cy, r, startAngle, endAngle, !clockwise);
      ctx.arc(unitEndX * rCenter + cx, unitEndY * rCenter + cy, dr, endAngle - Math.PI * 2, endAngle - Math.PI, !clockwise);
      if (r0 !== 0) {
        ctx.arc(cx, cy, r0, endAngle, startAngle, clockwise);
      }
    };
    return SausagePath2;
  }(Path_default)
);
var sausage_default = SausagePath;

// node_modules/echarts/lib/label/sectorLabel.js
function createSectorCalculateTextPosition(positionMapping, opts) {
  opts = opts || {};
  var isRoundCap = opts.isRoundCap;
  return function(out, opts2, boundingRect) {
    var textPosition = opts2.position;
    if (!textPosition || textPosition instanceof Array) {
      return calculateTextPosition(out, opts2, boundingRect);
    }
    var mappedSectorPosition = positionMapping(textPosition);
    var distance = opts2.distance != null ? opts2.distance : 5;
    var sector = this.shape;
    var cx = sector.cx;
    var cy = sector.cy;
    var r = sector.r;
    var r0 = sector.r0;
    var middleR = (r + r0) / 2;
    var startAngle = sector.startAngle;
    var endAngle = sector.endAngle;
    var middleAngle = (startAngle + endAngle) / 2;
    var extraDist = isRoundCap ? Math.abs(r - r0) / 2 : 0;
    var mathCos = Math.cos;
    var mathSin = Math.sin;
    var x = cx + r * mathCos(startAngle);
    var y = cy + r * mathSin(startAngle);
    var textAlign = "left";
    var textVerticalAlign = "top";
    switch (mappedSectorPosition) {
      case "startArc":
        x = cx + (r0 - distance) * mathCos(middleAngle);
        y = cy + (r0 - distance) * mathSin(middleAngle);
        textAlign = "center";
        textVerticalAlign = "top";
        break;
      case "insideStartArc":
        x = cx + (r0 + distance) * mathCos(middleAngle);
        y = cy + (r0 + distance) * mathSin(middleAngle);
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "startAngle":
        x = cx + middleR * mathCos(startAngle) + adjustAngleDistanceX(startAngle, distance + extraDist, false);
        y = cy + middleR * mathSin(startAngle) + adjustAngleDistanceY(startAngle, distance + extraDist, false);
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      case "insideStartAngle":
        x = cx + middleR * mathCos(startAngle) + adjustAngleDistanceX(startAngle, -distance + extraDist, false);
        y = cy + middleR * mathSin(startAngle) + adjustAngleDistanceY(startAngle, -distance + extraDist, false);
        textAlign = "left";
        textVerticalAlign = "middle";
        break;
      case "middle":
        x = cx + middleR * mathCos(middleAngle);
        y = cy + middleR * mathSin(middleAngle);
        textAlign = "center";
        textVerticalAlign = "middle";
        break;
      case "endArc":
        x = cx + (r + distance) * mathCos(middleAngle);
        y = cy + (r + distance) * mathSin(middleAngle);
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "insideEndArc":
        x = cx + (r - distance) * mathCos(middleAngle);
        y = cy + (r - distance) * mathSin(middleAngle);
        textAlign = "center";
        textVerticalAlign = "top";
        break;
      case "endAngle":
        x = cx + middleR * mathCos(endAngle) + adjustAngleDistanceX(endAngle, distance + extraDist, true);
        y = cy + middleR * mathSin(endAngle) + adjustAngleDistanceY(endAngle, distance + extraDist, true);
        textAlign = "left";
        textVerticalAlign = "middle";
        break;
      case "insideEndAngle":
        x = cx + middleR * mathCos(endAngle) + adjustAngleDistanceX(endAngle, -distance + extraDist, true);
        y = cy + middleR * mathSin(endAngle) + adjustAngleDistanceY(endAngle, -distance + extraDist, true);
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      default:
        return calculateTextPosition(out, opts2, boundingRect);
    }
    out = out || {};
    out.x = x;
    out.y = y;
    out.align = textAlign;
    out.verticalAlign = textVerticalAlign;
    return out;
  };
}
function setSectorTextRotation(sector, textPosition, positionMapping, rotateType) {
  if (isNumber(rotateType)) {
    sector.setTextConfig({
      rotation: rotateType
    });
    return;
  } else if (isArray(textPosition)) {
    sector.setTextConfig({
      rotation: 0
    });
    return;
  }
  var shape = sector.shape;
  var startAngle = shape.clockwise ? shape.startAngle : shape.endAngle;
  var endAngle = shape.clockwise ? shape.endAngle : shape.startAngle;
  var middleAngle = (startAngle + endAngle) / 2;
  var anchorAngle;
  var mappedSectorPosition = positionMapping(textPosition);
  switch (mappedSectorPosition) {
    case "startArc":
    case "insideStartArc":
    case "middle":
    case "insideEndArc":
    case "endArc":
      anchorAngle = middleAngle;
      break;
    case "startAngle":
    case "insideStartAngle":
      anchorAngle = startAngle;
      break;
    case "endAngle":
    case "insideEndAngle":
      anchorAngle = endAngle;
      break;
    default:
      sector.setTextConfig({
        rotation: 0
      });
      return;
  }
  var rotate = Math.PI * 1.5 - anchorAngle;
  if (mappedSectorPosition === "middle" && rotate > Math.PI / 2 && rotate < Math.PI * 1.5) {
    rotate -= Math.PI;
  }
  sector.setTextConfig({
    rotation: rotate
  });
}
function adjustAngleDistanceX(angle, distance, isEnd) {
  return distance * Math.sin(angle) * (isEnd ? -1 : 1);
}
function adjustAngleDistanceY(angle, distance, isEnd) {
  return distance * Math.cos(angle) * (isEnd ? 1 : -1);
}

// node_modules/echarts/lib/chart/helper/sectorHelper.js
function getSectorCornerRadius(model, shape, zeroIfNull) {
  var cornerRadius = model.get("borderRadius");
  if (cornerRadius == null) {
    return zeroIfNull ? {
      cornerRadius: 0
    } : null;
  }
  if (!isArray(cornerRadius)) {
    cornerRadius = [cornerRadius, cornerRadius, cornerRadius, cornerRadius];
  }
  var dr = Math.abs(shape.r || 0 - shape.r0 || 0);
  return {
    cornerRadius: map(cornerRadius, function(cr) {
      return parsePercent(cr, dr);
    })
  };
}

// node_modules/echarts/lib/chart/bar/BarView.js
var mathMax2 = Math.max;
var mathMin2 = Math.min;
function getClipArea(coord, data) {
  var coordSysClipArea = coord.getArea && coord.getArea();
  if (isCoordinateSystemType(coord, "cartesian2d")) {
    var baseAxis = coord.getBaseAxis();
    if (baseAxis.type !== "category" || !baseAxis.onBand) {
      var expandWidth = data.getLayout("bandWidth");
      if (baseAxis.isHorizontal()) {
        coordSysClipArea.x -= expandWidth;
        coordSysClipArea.width += expandWidth * 2;
      } else {
        coordSysClipArea.y -= expandWidth;
        coordSysClipArea.height += expandWidth * 2;
      }
    }
  }
  return coordSysClipArea;
}
var BarView = (
  /** @class */
  function(_super) {
    __extends(BarView2, _super);
    function BarView2() {
      var _this = _super.call(this) || this;
      _this.type = BarView2.type;
      _this._isFirstFrame = true;
      return _this;
    }
    BarView2.prototype.render = function(seriesModel, ecModel, api, payload) {
      this._model = seriesModel;
      this._removeOnRenderedListener(api);
      this._updateDrawMode(seriesModel);
      var coordinateSystemType = seriesModel.get("coordinateSystem");
      if (coordinateSystemType === "cartesian2d" || coordinateSystemType === "polar") {
        this._progressiveEls = null;
        this._isLargeDraw ? this._renderLarge(seriesModel, ecModel, api) : this._renderNormal(seriesModel, ecModel, api, payload);
      } else if (true) {
        warn("Only cartesian2d and polar supported for bar.");
      }
    };
    BarView2.prototype.incrementalPrepareRender = function(seriesModel) {
      this._clear();
      this._updateDrawMode(seriesModel);
      this._updateLargeClip(seriesModel);
    };
    BarView2.prototype.incrementalRender = function(params, seriesModel) {
      this._progressiveEls = [];
      this._incrementalRenderLarge(params, seriesModel);
    };
    BarView2.prototype.eachRendered = function(cb) {
      traverseElements(this._progressiveEls || this.group, cb);
    };
    BarView2.prototype._updateDrawMode = function(seriesModel) {
      var isLargeDraw = seriesModel.pipelineContext.large;
      if (this._isLargeDraw == null || isLargeDraw !== this._isLargeDraw) {
        this._isLargeDraw = isLargeDraw;
        this._clear();
      }
    };
    BarView2.prototype._renderNormal = function(seriesModel, ecModel, api, payload) {
      var group = this.group;
      var data = seriesModel.getData();
      var oldData = this._data;
      var coord = seriesModel.coordinateSystem;
      var baseAxis = coord.getBaseAxis();
      var isHorizontalOrRadial;
      if (coord.type === "cartesian2d") {
        isHorizontalOrRadial = baseAxis.isHorizontal();
      } else if (coord.type === "polar") {
        isHorizontalOrRadial = baseAxis.dim === "angle";
      }
      var animationModel = seriesModel.isAnimationEnabled() ? seriesModel : null;
      var realtimeSortCfg = shouldRealtimeSort(seriesModel, coord);
      if (realtimeSortCfg) {
        this._enableRealtimeSort(realtimeSortCfg, data, api);
      }
      var needsClip = seriesModel.get("clip", true) || realtimeSortCfg;
      var coordSysClipArea = getClipArea(coord, data);
      group.removeClipPath();
      var roundCap = seriesModel.get("roundCap", true);
      var drawBackground = seriesModel.get("showBackground", true);
      var backgroundModel = seriesModel.getModel("backgroundStyle");
      var barBorderRadius = backgroundModel.get("borderRadius") || 0;
      var bgEls = [];
      var oldBgEls = this._backgroundEls;
      var isInitSort = payload && payload.isInitSort;
      var isChangeOrder = payload && payload.type === "changeAxisOrder";
      function createBackground(dataIndex) {
        var bgLayout = getLayout[coord.type](data, dataIndex);
        var bgEl = createBackgroundEl(coord, isHorizontalOrRadial, bgLayout);
        bgEl.useStyle(backgroundModel.getItemStyle());
        if (coord.type === "cartesian2d") {
          bgEl.setShape("r", barBorderRadius);
        } else {
          bgEl.setShape("cornerRadius", barBorderRadius);
        }
        bgEls[dataIndex] = bgEl;
        return bgEl;
      }
      ;
      data.diff(oldData).add(function(dataIndex) {
        var itemModel = data.getItemModel(dataIndex);
        var layout2 = getLayout[coord.type](data, dataIndex, itemModel);
        if (drawBackground) {
          createBackground(dataIndex);
        }
        if (!data.hasValue(dataIndex) || !isValidLayout[coord.type](layout2)) {
          return;
        }
        var isClipped = false;
        if (needsClip) {
          isClipped = clip[coord.type](coordSysClipArea, layout2);
        }
        var el = elementCreator[coord.type](seriesModel, data, dataIndex, layout2, isHorizontalOrRadial, animationModel, baseAxis.model, false, roundCap);
        if (realtimeSortCfg) {
          el.forceLabelAnimation = true;
        }
        updateStyle(el, data, dataIndex, itemModel, layout2, seriesModel, isHorizontalOrRadial, coord.type === "polar");
        if (isInitSort) {
          el.attr({
            shape: layout2
          });
        } else if (realtimeSortCfg) {
          updateRealtimeAnimation(realtimeSortCfg, animationModel, el, layout2, dataIndex, isHorizontalOrRadial, false, false);
        } else {
          initProps(el, {
            shape: layout2
          }, seriesModel, dataIndex);
        }
        data.setItemGraphicEl(dataIndex, el);
        group.add(el);
        el.ignore = isClipped;
      }).update(function(newIndex, oldIndex) {
        var itemModel = data.getItemModel(newIndex);
        var layout2 = getLayout[coord.type](data, newIndex, itemModel);
        if (drawBackground) {
          var bgEl = void 0;
          if (oldBgEls.length === 0) {
            bgEl = createBackground(oldIndex);
          } else {
            bgEl = oldBgEls[oldIndex];
            bgEl.useStyle(backgroundModel.getItemStyle());
            if (coord.type === "cartesian2d") {
              bgEl.setShape("r", barBorderRadius);
            } else {
              bgEl.setShape("cornerRadius", barBorderRadius);
            }
            bgEls[newIndex] = bgEl;
          }
          var bgLayout = getLayout[coord.type](data, newIndex);
          var shape = createBackgroundShape(isHorizontalOrRadial, bgLayout, coord);
          updateProps(bgEl, {
            shape
          }, animationModel, newIndex);
        }
        var el = oldData.getItemGraphicEl(oldIndex);
        if (!data.hasValue(newIndex) || !isValidLayout[coord.type](layout2)) {
          group.remove(el);
          return;
        }
        var isClipped = false;
        if (needsClip) {
          isClipped = clip[coord.type](coordSysClipArea, layout2);
          if (isClipped) {
            group.remove(el);
          }
        }
        if (!el) {
          el = elementCreator[coord.type](seriesModel, data, newIndex, layout2, isHorizontalOrRadial, animationModel, baseAxis.model, !!el, roundCap);
        } else {
          saveOldStyle(el);
        }
        if (realtimeSortCfg) {
          el.forceLabelAnimation = true;
        }
        if (isChangeOrder) {
          var textEl = el.getTextContent();
          if (textEl) {
            var labelInnerStore = labelInner(textEl);
            if (labelInnerStore.prevValue != null) {
              labelInnerStore.prevValue = labelInnerStore.value;
            }
          }
        } else {
          updateStyle(el, data, newIndex, itemModel, layout2, seriesModel, isHorizontalOrRadial, coord.type === "polar");
        }
        if (isInitSort) {
          el.attr({
            shape: layout2
          });
        } else if (realtimeSortCfg) {
          updateRealtimeAnimation(realtimeSortCfg, animationModel, el, layout2, newIndex, isHorizontalOrRadial, true, isChangeOrder);
        } else {
          updateProps(el, {
            shape: layout2
          }, seriesModel, newIndex, null);
        }
        data.setItemGraphicEl(newIndex, el);
        el.ignore = isClipped;
        group.add(el);
      }).remove(function(dataIndex) {
        var el = oldData.getItemGraphicEl(dataIndex);
        el && removeElementWithFadeOut(el, seriesModel, dataIndex);
      }).execute();
      var bgGroup = this._backgroundGroup || (this._backgroundGroup = new Group_default());
      bgGroup.removeAll();
      for (var i = 0; i < bgEls.length; ++i) {
        bgGroup.add(bgEls[i]);
      }
      group.add(bgGroup);
      this._backgroundEls = bgEls;
      this._data = data;
    };
    BarView2.prototype._renderLarge = function(seriesModel, ecModel, api) {
      this._clear();
      createLarge(seriesModel, this.group);
      this._updateLargeClip(seriesModel);
    };
    BarView2.prototype._incrementalRenderLarge = function(params, seriesModel) {
      this._removeBackground();
      createLarge(seriesModel, this.group, this._progressiveEls, true);
    };
    BarView2.prototype._updateLargeClip = function(seriesModel) {
      var clipPath = seriesModel.get("clip", true) && createClipPath(seriesModel.coordinateSystem, false, seriesModel);
      var group = this.group;
      if (clipPath) {
        group.setClipPath(clipPath);
      } else {
        group.removeClipPath();
      }
    };
    BarView2.prototype._enableRealtimeSort = function(realtimeSortCfg, data, api) {
      var _this = this;
      if (!data.count()) {
        return;
      }
      var baseAxis = realtimeSortCfg.baseAxis;
      if (this._isFirstFrame) {
        this._dispatchInitSort(data, realtimeSortCfg, api);
        this._isFirstFrame = false;
      } else {
        var orderMapping_1 = function(idx) {
          var el = data.getItemGraphicEl(idx);
          var shape = el && el.shape;
          return shape && // The result should be consistent with the initial sort by data value.
          // Do not support the case that both positive and negative exist.
          Math.abs(baseAxis.isHorizontal() ? shape.height : shape.width) || 0;
        };
        this._onRendered = function() {
          _this._updateSortWithinSameData(data, orderMapping_1, baseAxis, api);
        };
        api.getZr().on("rendered", this._onRendered);
      }
    };
    BarView2.prototype._dataSort = function(data, baseAxis, orderMapping) {
      var info = [];
      data.each(data.mapDimension(baseAxis.dim), function(ordinalNumber, dataIdx) {
        var mappedValue = orderMapping(dataIdx);
        mappedValue = mappedValue == null ? NaN : mappedValue;
        info.push({
          dataIndex: dataIdx,
          mappedValue,
          ordinalNumber
        });
      });
      info.sort(function(a, b) {
        return b.mappedValue - a.mappedValue;
      });
      return {
        ordinalNumbers: map(info, function(item) {
          return item.ordinalNumber;
        })
      };
    };
    BarView2.prototype._isOrderChangedWithinSameData = function(data, orderMapping, baseAxis) {
      var scale3 = baseAxis.scale;
      var ordinalDataDim = data.mapDimension(baseAxis.dim);
      var lastValue = Number.MAX_VALUE;
      for (var tickNum = 0, len2 = scale3.getOrdinalMeta().categories.length; tickNum < len2; ++tickNum) {
        var rawIdx = data.rawIndexOf(ordinalDataDim, scale3.getRawOrdinalNumber(tickNum));
        var value = rawIdx < 0 ? Number.MIN_VALUE : orderMapping(data.indexOfRawIndex(rawIdx));
        if (value > lastValue) {
          return true;
        }
        lastValue = value;
      }
      return false;
    };
    BarView2.prototype._isOrderDifferentInView = function(orderInfo, baseAxis) {
      var scale3 = baseAxis.scale;
      var extent = scale3.getExtent();
      var tickNum = Math.max(0, extent[0]);
      var tickMax = Math.min(extent[1], scale3.getOrdinalMeta().categories.length - 1);
      for (; tickNum <= tickMax; ++tickNum) {
        if (orderInfo.ordinalNumbers[tickNum] !== scale3.getRawOrdinalNumber(tickNum)) {
          return true;
        }
      }
    };
    BarView2.prototype._updateSortWithinSameData = function(data, orderMapping, baseAxis, api) {
      if (!this._isOrderChangedWithinSameData(data, orderMapping, baseAxis)) {
        return;
      }
      var sortInfo = this._dataSort(data, baseAxis, orderMapping);
      if (this._isOrderDifferentInView(sortInfo, baseAxis)) {
        this._removeOnRenderedListener(api);
        api.dispatchAction({
          type: "changeAxisOrder",
          componentType: baseAxis.dim + "Axis",
          axisId: baseAxis.index,
          sortInfo
        });
      }
    };
    BarView2.prototype._dispatchInitSort = function(data, realtimeSortCfg, api) {
      var baseAxis = realtimeSortCfg.baseAxis;
      var sortResult = this._dataSort(data, baseAxis, function(dataIdx) {
        return data.get(data.mapDimension(realtimeSortCfg.otherAxis.dim), dataIdx);
      });
      api.dispatchAction({
        type: "changeAxisOrder",
        componentType: baseAxis.dim + "Axis",
        isInitSort: true,
        axisId: baseAxis.index,
        sortInfo: sortResult
      });
    };
    BarView2.prototype.remove = function(ecModel, api) {
      this._clear(this._model);
      this._removeOnRenderedListener(api);
    };
    BarView2.prototype.dispose = function(ecModel, api) {
      this._removeOnRenderedListener(api);
    };
    BarView2.prototype._removeOnRenderedListener = function(api) {
      if (this._onRendered) {
        api.getZr().off("rendered", this._onRendered);
        this._onRendered = null;
      }
    };
    BarView2.prototype._clear = function(model) {
      var group = this.group;
      var data = this._data;
      if (model && model.isAnimationEnabled() && data && !this._isLargeDraw) {
        this._removeBackground();
        this._backgroundEls = [];
        data.eachItemGraphicEl(function(el) {
          removeElementWithFadeOut(el, model, getECData(el).dataIndex);
        });
      } else {
        group.removeAll();
      }
      this._data = null;
      this._isFirstFrame = true;
    };
    BarView2.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup);
      this._backgroundGroup = null;
    };
    BarView2.type = "bar";
    return BarView2;
  }(Chart_default)
);
var clip = {
  cartesian2d: function(coordSysBoundingRect, layout2) {
    var signWidth = layout2.width < 0 ? -1 : 1;
    var signHeight = layout2.height < 0 ? -1 : 1;
    if (signWidth < 0) {
      layout2.x += layout2.width;
      layout2.width = -layout2.width;
    }
    if (signHeight < 0) {
      layout2.y += layout2.height;
      layout2.height = -layout2.height;
    }
    var coordSysX2 = coordSysBoundingRect.x + coordSysBoundingRect.width;
    var coordSysY2 = coordSysBoundingRect.y + coordSysBoundingRect.height;
    var x = mathMax2(layout2.x, coordSysBoundingRect.x);
    var x2 = mathMin2(layout2.x + layout2.width, coordSysX2);
    var y = mathMax2(layout2.y, coordSysBoundingRect.y);
    var y2 = mathMin2(layout2.y + layout2.height, coordSysY2);
    var xClipped = x2 < x;
    var yClipped = y2 < y;
    layout2.x = xClipped && x > coordSysX2 ? x2 : x;
    layout2.y = yClipped && y > coordSysY2 ? y2 : y;
    layout2.width = xClipped ? 0 : x2 - x;
    layout2.height = yClipped ? 0 : y2 - y;
    if (signWidth < 0) {
      layout2.x += layout2.width;
      layout2.width = -layout2.width;
    }
    if (signHeight < 0) {
      layout2.y += layout2.height;
      layout2.height = -layout2.height;
    }
    return xClipped || yClipped;
  },
  polar: function(coordSysClipArea, layout2) {
    var signR = layout2.r0 <= layout2.r ? 1 : -1;
    if (signR < 0) {
      var tmp = layout2.r;
      layout2.r = layout2.r0;
      layout2.r0 = tmp;
    }
    var r = mathMin2(layout2.r, coordSysClipArea.r);
    var r0 = mathMax2(layout2.r0, coordSysClipArea.r0);
    layout2.r = r;
    layout2.r0 = r0;
    var clipped = r - r0 < 0;
    if (signR < 0) {
      var tmp = layout2.r;
      layout2.r = layout2.r0;
      layout2.r0 = tmp;
    }
    return clipped;
  }
};
var elementCreator = {
  cartesian2d: function(seriesModel, data, newIndex, layout2, isHorizontal, animationModel, axisModel, isUpdate, roundCap) {
    var rect = new Rect_default({
      shape: extend({}, layout2),
      z2: 1
    });
    rect.__dataIndex = newIndex;
    rect.name = "item";
    if (animationModel) {
      var rectShape = rect.shape;
      var animateProperty = isHorizontal ? "height" : "width";
      rectShape[animateProperty] = 0;
    }
    return rect;
  },
  polar: function(seriesModel, data, newIndex, layout2, isRadial, animationModel, axisModel, isUpdate, roundCap) {
    var ShapeClass = !isRadial && roundCap ? sausage_default : Sector_default;
    var sector = new ShapeClass({
      shape: layout2,
      z2: 1
    });
    sector.name = "item";
    var positionMap = createPolarPositionMapping(isRadial);
    sector.calculateTextPosition = createSectorCalculateTextPosition(positionMap, {
      isRoundCap: ShapeClass === sausage_default
    });
    if (animationModel) {
      var sectorShape = sector.shape;
      var animateProperty = isRadial ? "r" : "endAngle";
      var animateTarget = {};
      sectorShape[animateProperty] = isRadial ? layout2.r0 : layout2.startAngle;
      animateTarget[animateProperty] = layout2[animateProperty];
      (isUpdate ? updateProps : initProps)(sector, {
        shape: animateTarget
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, animationModel);
    }
    return sector;
  }
};
function shouldRealtimeSort(seriesModel, coordSys) {
  var realtimeSortOption = seriesModel.get("realtimeSort", true);
  var baseAxis = coordSys.getBaseAxis();
  if (true) {
    if (realtimeSortOption) {
      if (baseAxis.type !== "category") {
        warn("`realtimeSort` will not work because this bar series is not based on a category axis.");
      }
      if (coordSys.type !== "cartesian2d") {
        warn("`realtimeSort` will not work because this bar series is not on cartesian2d.");
      }
    }
  }
  if (realtimeSortOption && baseAxis.type === "category" && coordSys.type === "cartesian2d") {
    return {
      baseAxis,
      otherAxis: coordSys.getOtherAxis(baseAxis)
    };
  }
}
function updateRealtimeAnimation(realtimeSortCfg, seriesAnimationModel, el, layout2, newIndex, isHorizontal, isUpdate, isChangeOrder) {
  var seriesTarget;
  var axisTarget;
  if (isHorizontal) {
    axisTarget = {
      x: layout2.x,
      width: layout2.width
    };
    seriesTarget = {
      y: layout2.y,
      height: layout2.height
    };
  } else {
    axisTarget = {
      y: layout2.y,
      height: layout2.height
    };
    seriesTarget = {
      x: layout2.x,
      width: layout2.width
    };
  }
  if (!isChangeOrder) {
    (isUpdate ? updateProps : initProps)(el, {
      shape: seriesTarget
    }, seriesAnimationModel, newIndex, null);
  }
  var axisAnimationModel = seriesAnimationModel ? realtimeSortCfg.baseAxis.model : null;
  (isUpdate ? updateProps : initProps)(el, {
    shape: axisTarget
  }, axisAnimationModel, newIndex);
}
function checkPropertiesNotValid(obj, props) {
  for (var i = 0; i < props.length; i++) {
    if (!isFinite(obj[props[i]])) {
      return true;
    }
  }
  return false;
}
var rectPropties = ["x", "y", "width", "height"];
var polarPropties = ["cx", "cy", "r", "startAngle", "endAngle"];
var isValidLayout = {
  cartesian2d: function(layout2) {
    return !checkPropertiesNotValid(layout2, rectPropties);
  },
  polar: function(layout2) {
    return !checkPropertiesNotValid(layout2, polarPropties);
  }
};
var getLayout = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(data, dataIndex, itemModel) {
    var layout2 = data.getItemLayout(dataIndex);
    var fixedLineWidth = itemModel ? getLineWidth(itemModel, layout2) : 0;
    var signX = layout2.width > 0 ? 1 : -1;
    var signY = layout2.height > 0 ? 1 : -1;
    return {
      x: layout2.x + signX * fixedLineWidth / 2,
      y: layout2.y + signY * fixedLineWidth / 2,
      width: layout2.width - signX * fixedLineWidth,
      height: layout2.height - signY * fixedLineWidth
    };
  },
  polar: function(data, dataIndex, itemModel) {
    var layout2 = data.getItemLayout(dataIndex);
    return {
      cx: layout2.cx,
      cy: layout2.cy,
      r0: layout2.r0,
      r: layout2.r,
      startAngle: layout2.startAngle,
      endAngle: layout2.endAngle,
      clockwise: layout2.clockwise
    };
  }
};
function isZeroOnPolar(layout2) {
  return layout2.startAngle != null && layout2.endAngle != null && layout2.startAngle === layout2.endAngle;
}
function createPolarPositionMapping(isRadial) {
  return /* @__PURE__ */ function(isRadial2) {
    var arcOrAngle = isRadial2 ? "Arc" : "Angle";
    return function(position2) {
      switch (position2) {
        case "start":
        case "insideStart":
        case "end":
        case "insideEnd":
          return position2 + arcOrAngle;
        default:
          return position2;
      }
    };
  }(isRadial);
}
function updateStyle(el, data, dataIndex, itemModel, layout2, seriesModel, isHorizontalOrRadial, isPolar) {
  var style = data.getItemVisual(dataIndex, "style");
  if (!isPolar) {
    var borderRadius = itemModel.get(["itemStyle", "borderRadius"]) || 0;
    el.setShape("r", borderRadius);
  } else if (!seriesModel.get("roundCap")) {
    var sectorShape = el.shape;
    var cornerRadius = getSectorCornerRadius(itemModel.getModel("itemStyle"), sectorShape, true);
    extend(sectorShape, cornerRadius);
    el.setShape(sectorShape);
  }
  el.useStyle(style);
  var cursorStyle = itemModel.getShallow("cursor");
  cursorStyle && el.attr("cursor", cursorStyle);
  var labelPositionOutside = isPolar ? isHorizontalOrRadial ? layout2.r >= layout2.r0 ? "endArc" : "startArc" : layout2.endAngle >= layout2.startAngle ? "endAngle" : "startAngle" : isHorizontalOrRadial ? layout2.height >= 0 ? "bottom" : "top" : layout2.width >= 0 ? "right" : "left";
  var labelStatesModels = getLabelStatesModels(itemModel);
  setLabelStyle(el, labelStatesModels, {
    labelFetcher: seriesModel,
    labelDataIndex: dataIndex,
    defaultText: getDefaultLabel(seriesModel.getData(), dataIndex),
    inheritColor: style.fill,
    defaultOpacity: style.opacity,
    defaultOutsidePosition: labelPositionOutside
  });
  var label = el.getTextContent();
  if (isPolar && label) {
    var position2 = itemModel.get(["label", "position"]);
    el.textConfig.inside = position2 === "middle" ? true : null;
    setSectorTextRotation(el, position2 === "outside" ? labelPositionOutside : position2, createPolarPositionMapping(isHorizontalOrRadial), itemModel.get(["label", "rotate"]));
  }
  setLabelValueAnimation(label, labelStatesModels, seriesModel.getRawValue(dataIndex), function(value) {
    return getDefaultInterpolatedLabel(data, value);
  });
  var emphasisModel = itemModel.getModel(["emphasis"]);
  toggleHoverEmphasis(el, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
  setStatesStylesFromModel(el, itemModel);
  if (isZeroOnPolar(layout2)) {
    el.style.fill = "none";
    el.style.stroke = "none";
    each(el.states, function(state) {
      if (state.style) {
        state.style.fill = state.style.stroke = "none";
      }
    });
  }
}
function getLineWidth(itemModel, rawLayout) {
  var borderColor = itemModel.get(["itemStyle", "borderColor"]);
  if (!borderColor || borderColor === "none") {
    return 0;
  }
  var lineWidth = itemModel.get(["itemStyle", "borderWidth"]) || 0;
  var width = isNaN(rawLayout.width) ? Number.MAX_VALUE : Math.abs(rawLayout.width);
  var height = isNaN(rawLayout.height) ? Number.MAX_VALUE : Math.abs(rawLayout.height);
  return Math.min(lineWidth, width, height);
}
var LagePathShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function LagePathShape2() {
    }
    return LagePathShape2;
  }()
);
var LargePath = (
  /** @class */
  function(_super) {
    __extends(LargePath2, _super);
    function LargePath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "largeBar";
      return _this;
    }
    LargePath2.prototype.getDefaultShape = function() {
      return new LagePathShape();
    };
    LargePath2.prototype.buildPath = function(ctx, shape) {
      var points = shape.points;
      var baseDimIdx = this.baseDimIdx;
      var valueDimIdx = 1 - this.baseDimIdx;
      var startPoint = [];
      var size = [];
      var barWidth = this.barWidth;
      for (var i = 0; i < points.length; i += 3) {
        size[baseDimIdx] = barWidth;
        size[valueDimIdx] = points[i + 2];
        startPoint[baseDimIdx] = points[i + baseDimIdx];
        startPoint[valueDimIdx] = points[i + valueDimIdx];
        ctx.rect(startPoint[0], startPoint[1], size[0], size[1]);
      }
    };
    return LargePath2;
  }(Path_default)
);
function createLarge(seriesModel, group, progressiveEls, incremental) {
  var data = seriesModel.getData();
  var baseDimIdx = data.getLayout("valueAxisHorizontal") ? 1 : 0;
  var largeDataIndices = data.getLayout("largeDataIndices");
  var barWidth = data.getLayout("size");
  var backgroundModel = seriesModel.getModel("backgroundStyle");
  var bgPoints = data.getLayout("largeBackgroundPoints");
  if (bgPoints) {
    var bgEl = new LargePath({
      shape: {
        points: bgPoints
      },
      incremental: !!incremental,
      silent: true,
      z2: 0
    });
    bgEl.baseDimIdx = baseDimIdx;
    bgEl.largeDataIndices = largeDataIndices;
    bgEl.barWidth = barWidth;
    bgEl.useStyle(backgroundModel.getItemStyle());
    group.add(bgEl);
    progressiveEls && progressiveEls.push(bgEl);
  }
  var el = new LargePath({
    shape: {
      points: data.getLayout("largePoints")
    },
    incremental: !!incremental,
    ignoreCoarsePointer: true,
    z2: 1
  });
  el.baseDimIdx = baseDimIdx;
  el.largeDataIndices = largeDataIndices;
  el.barWidth = barWidth;
  group.add(el);
  el.useStyle(data.getVisual("style"));
  el.style.stroke = null;
  getECData(el).seriesIndex = seriesModel.seriesIndex;
  if (!seriesModel.get("silent")) {
    el.on("mousedown", largePathUpdateDataIndex);
    el.on("mousemove", largePathUpdateDataIndex);
  }
  progressiveEls && progressiveEls.push(el);
}
var largePathUpdateDataIndex = throttle(function(event) {
  var largePath = this;
  var dataIndex = largePathFindDataIndex(largePath, event.offsetX, event.offsetY);
  getECData(largePath).dataIndex = dataIndex >= 0 ? dataIndex : null;
}, 30, false);
function largePathFindDataIndex(largePath, x, y) {
  var baseDimIdx = largePath.baseDimIdx;
  var valueDimIdx = 1 - baseDimIdx;
  var points = largePath.shape.points;
  var largeDataIndices = largePath.largeDataIndices;
  var startPoint = [];
  var size = [];
  var barWidth = largePath.barWidth;
  for (var i = 0, len2 = points.length / 3; i < len2; i++) {
    var ii = i * 3;
    size[baseDimIdx] = barWidth;
    size[valueDimIdx] = points[ii + 2];
    startPoint[baseDimIdx] = points[ii + baseDimIdx];
    startPoint[valueDimIdx] = points[ii + valueDimIdx];
    if (size[valueDimIdx] < 0) {
      startPoint[valueDimIdx] += size[valueDimIdx];
      size[valueDimIdx] = -size[valueDimIdx];
    }
    if (x >= startPoint[0] && x <= startPoint[0] + size[0] && y >= startPoint[1] && y <= startPoint[1] + size[1]) {
      return largeDataIndices[i];
    }
  }
  return -1;
}
function createBackgroundShape(isHorizontalOrRadial, layout2, coord) {
  if (isCoordinateSystemType(coord, "cartesian2d")) {
    var rectShape = layout2;
    var coordLayout = coord.getArea();
    return {
      x: isHorizontalOrRadial ? rectShape.x : coordLayout.x,
      y: isHorizontalOrRadial ? coordLayout.y : rectShape.y,
      width: isHorizontalOrRadial ? rectShape.width : coordLayout.width,
      height: isHorizontalOrRadial ? coordLayout.height : rectShape.height
    };
  } else {
    var coordLayout = coord.getArea();
    var sectorShape = layout2;
    return {
      cx: coordLayout.cx,
      cy: coordLayout.cy,
      r0: isHorizontalOrRadial ? coordLayout.r0 : sectorShape.r0,
      r: isHorizontalOrRadial ? coordLayout.r : sectorShape.r,
      startAngle: isHorizontalOrRadial ? sectorShape.startAngle : 0,
      endAngle: isHorizontalOrRadial ? sectorShape.endAngle : Math.PI * 2
    };
  }
}
function createBackgroundEl(coord, isHorizontalOrRadial, layout2) {
  var ElementClz = coord.type === "polar" ? Sector_default : Rect_default;
  return new ElementClz({
    shape: createBackgroundShape(isHorizontalOrRadial, layout2, coord),
    silent: true,
    z2: 0
  });
}
var BarView_default = BarView;

// node_modules/echarts/lib/chart/bar/install.js
function install6(registers) {
  registers.registerChartView(BarView_default);
  registers.registerSeriesModel(BarSeries_default);
  registers.registerLayout(registers.PRIORITY.VISUAL.LAYOUT, curry(layout, "bar"));
  registers.registerLayout(registers.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, createProgressiveLayout("bar"));
  registers.registerProcessor(registers.PRIORITY.PROCESSOR.STATISTIC, dataSample("bar"));
  registers.registerAction({
    type: "changeAxisOrder",
    event: "changeAxisOrder",
    update: "update"
  }, function(payload, ecModel) {
    var componentType = payload.componentType || "series";
    ecModel.eachComponent({
      mainType: componentType,
      query: payload
    }, function(componentModel) {
      if (payload.sortInfo) {
        componentModel.axis.setCategorySortInfo(payload.sortInfo);
      }
    });
  });
}

// node_modules/echarts/lib/chart/pie/pieLayout.js
var PI2 = Math.PI * 2;
var RADIAN = Math.PI / 180;
function getViewRect(seriesModel, api) {
  return getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}
function getBasicPieLayout(seriesModel, api) {
  var viewRect = getViewRect(seriesModel, api);
  var center2 = seriesModel.get("center");
  var radius = seriesModel.get("radius");
  if (!isArray(radius)) {
    radius = [0, radius];
  }
  var width = parsePercent2(viewRect.width, api.getWidth());
  var height = parsePercent2(viewRect.height, api.getHeight());
  var size = Math.min(width, height);
  var r0 = parsePercent2(radius[0], size / 2);
  var r = parsePercent2(radius[1], size / 2);
  var cx;
  var cy;
  var coordSys = seriesModel.coordinateSystem;
  if (coordSys) {
    var point = coordSys.dataToPoint(center2);
    cx = point[0] || 0;
    cy = point[1] || 0;
  } else {
    if (!isArray(center2)) {
      center2 = [center2, center2];
    }
    cx = parsePercent2(center2[0], width) + viewRect.x;
    cy = parsePercent2(center2[1], height) + viewRect.y;
  }
  return {
    cx,
    cy,
    r0,
    r
  };
}
function pieLayout(seriesType, ecModel, api) {
  ecModel.eachSeriesByType(seriesType, function(seriesModel) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension("value");
    var viewRect = getViewRect(seriesModel, api);
    var _a = getBasicPieLayout(seriesModel, api), cx = _a.cx, cy = _a.cy, r = _a.r, r0 = _a.r0;
    var startAngle = -seriesModel.get("startAngle") * RADIAN;
    var endAngle = seriesModel.get("endAngle");
    var padAngle = seriesModel.get("padAngle") * RADIAN;
    endAngle = endAngle === "auto" ? startAngle - PI2 : -endAngle * RADIAN;
    var minAngle = seriesModel.get("minAngle") * RADIAN;
    var minAndPadAngle = minAngle + padAngle;
    var validDataCount = 0;
    data.each(valueDim, function(value) {
      !isNaN(value) && validDataCount++;
    });
    var sum2 = data.getSum(valueDim);
    var unitRadian = Math.PI / (sum2 || validDataCount) * 2;
    var clockwise = seriesModel.get("clockwise");
    var roseType = seriesModel.get("roseType");
    var stillShowZeroSum = seriesModel.get("stillShowZeroSum");
    var extent = data.getDataExtent(valueDim);
    extent[0] = 0;
    var dir = clockwise ? 1 : -1;
    var angles = [startAngle, endAngle];
    var halfPadAngle = dir * padAngle / 2;
    normalizeArcAngles(angles, !clockwise);
    startAngle = angles[0], endAngle = angles[1];
    var layoutData = getSeriesLayoutData(seriesModel);
    layoutData.startAngle = startAngle;
    layoutData.endAngle = endAngle;
    layoutData.clockwise = clockwise;
    var angleRange = Math.abs(endAngle - startAngle);
    var restAngle = angleRange;
    var valueSumLargerThanMinAngle = 0;
    var currentAngle = startAngle;
    data.setLayout({
      viewRect,
      r
    });
    data.each(valueDim, function(value, idx) {
      var angle;
      if (isNaN(value)) {
        data.setItemLayout(idx, {
          angle: NaN,
          startAngle: NaN,
          endAngle: NaN,
          clockwise,
          cx,
          cy,
          r0,
          r: roseType ? NaN : r
        });
        return;
      }
      if (roseType !== "area") {
        angle = sum2 === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;
      } else {
        angle = angleRange / validDataCount;
      }
      if (angle < minAndPadAngle) {
        angle = minAndPadAngle;
        restAngle -= minAndPadAngle;
      } else {
        valueSumLargerThanMinAngle += value;
      }
      var endAngle2 = currentAngle + dir * angle;
      var actualStartAngle = 0;
      var actualEndAngle = 0;
      if (padAngle > angle) {
        actualStartAngle = currentAngle + dir * angle / 2;
        actualEndAngle = actualStartAngle;
      } else {
        actualStartAngle = currentAngle + halfPadAngle;
        actualEndAngle = endAngle2 - halfPadAngle;
      }
      data.setItemLayout(idx, {
        angle,
        startAngle: actualStartAngle,
        endAngle: actualEndAngle,
        clockwise,
        cx,
        cy,
        r0,
        r: roseType ? linearMap(value, extent, [r0, r]) : r
      });
      currentAngle = endAngle2;
    });
    if (restAngle < PI2 && validDataCount) {
      if (restAngle <= 1e-3) {
        var angle_1 = angleRange / validDataCount;
        data.each(valueDim, function(value, idx) {
          if (!isNaN(value)) {
            var layout_1 = data.getItemLayout(idx);
            layout_1.angle = angle_1;
            var actualStartAngle = 0;
            var actualEndAngle = 0;
            if (angle_1 < padAngle) {
              actualStartAngle = startAngle + dir * (idx + 1 / 2) * angle_1;
              actualEndAngle = actualStartAngle;
            } else {
              actualStartAngle = startAngle + dir * idx * angle_1 + halfPadAngle;
              actualEndAngle = startAngle + dir * (idx + 1) * angle_1 - halfPadAngle;
            }
            layout_1.startAngle = actualStartAngle;
            layout_1.endAngle = actualEndAngle;
          }
        });
      } else {
        unitRadian = restAngle / valueSumLargerThanMinAngle;
        currentAngle = startAngle;
        data.each(valueDim, function(value, idx) {
          if (!isNaN(value)) {
            var layout_2 = data.getItemLayout(idx);
            var angle = layout_2.angle === minAndPadAngle ? minAndPadAngle : value * unitRadian;
            var actualStartAngle = 0;
            var actualEndAngle = 0;
            if (angle < padAngle) {
              actualStartAngle = currentAngle + dir * angle / 2;
              actualEndAngle = actualStartAngle;
            } else {
              actualStartAngle = currentAngle + halfPadAngle;
              actualEndAngle = currentAngle + dir * angle - halfPadAngle;
            }
            layout_2.startAngle = actualStartAngle;
            layout_2.endAngle = actualEndAngle;
            currentAngle += dir * angle;
          }
        });
      }
    }
  });
}
var getSeriesLayoutData = makeInner();

// node_modules/echarts/lib/processor/dataFilter.js
function dataFilter(seriesType) {
  return {
    seriesType,
    reset: function(seriesModel, ecModel) {
      var legendModels = ecModel.findComponents({
        mainType: "legend"
      });
      if (!legendModels || !legendModels.length) {
        return;
      }
      var data = seriesModel.getData();
      data.filterSelf(function(idx) {
        var name = data.getName(idx);
        for (var i = 0; i < legendModels.length; i++) {
          if (!legendModels[i].isSelected(name)) {
            return false;
          }
        }
        return true;
      });
    }
  };
}

// node_modules/echarts/lib/chart/pie/labelLayout.js
var RADIAN2 = Math.PI / 180;
function adjustSingleSide(list, cx, cy, r, dir, viewWidth, viewHeight, viewLeft, viewTop, farthestX) {
  if (list.length < 2) {
    return;
  }
  ;
  function recalculateXOnSemiToAlignOnEllipseCurve(semi) {
    var rB = semi.rB;
    var rB2 = rB * rB;
    for (var i2 = 0; i2 < semi.list.length; i2++) {
      var item = semi.list[i2];
      var dy = Math.abs(item.label.y - cy);
      var rA = r + item.len;
      var rA2 = rA * rA;
      var dx2 = Math.sqrt(Math.abs((1 - dy * dy / rB2) * rA2));
      var newX = cx + (dx2 + item.len2) * dir;
      var deltaX = newX - item.label.x;
      var newTargetWidth = item.targetTextWidth - deltaX * dir;
      constrainTextWidth(item, newTargetWidth, true);
      item.label.x = newX;
    }
  }
  function recalculateX(items) {
    var topSemi = {
      list: [],
      maxY: 0
    };
    var bottomSemi = {
      list: [],
      maxY: 0
    };
    for (var i2 = 0; i2 < items.length; i2++) {
      if (items[i2].labelAlignTo !== "none") {
        continue;
      }
      var item = items[i2];
      var semi = item.label.y > cy ? bottomSemi : topSemi;
      var dy = Math.abs(item.label.y - cy);
      if (dy >= semi.maxY) {
        var dx2 = item.label.x - cx - item.len2 * dir;
        var rA = r + item.len;
        var rB = Math.abs(dx2) < rA ? Math.sqrt(dy * dy / (1 - dx2 * dx2 / rA / rA)) : rA;
        semi.rB = rB;
        semi.maxY = dy;
      }
      semi.list.push(item);
    }
    recalculateXOnSemiToAlignOnEllipseCurve(topSemi);
    recalculateXOnSemiToAlignOnEllipseCurve(bottomSemi);
  }
  var len2 = list.length;
  for (var i = 0; i < len2; i++) {
    if (list[i].position === "outer" && list[i].labelAlignTo === "labelLine") {
      var dx = list[i].label.x - farthestX;
      list[i].linePoints[1][0] += dx;
      list[i].label.x = farthestX;
    }
  }
  if (shiftLayoutOnY(list, viewTop, viewTop + viewHeight)) {
    recalculateX(list);
  }
}
function avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop) {
  var leftList = [];
  var rightList = [];
  var leftmostX = Number.MAX_VALUE;
  var rightmostX = -Number.MAX_VALUE;
  for (var i = 0; i < labelLayoutList.length; i++) {
    var label = labelLayoutList[i].label;
    if (isPositionCenter(labelLayoutList[i])) {
      continue;
    }
    if (label.x < cx) {
      leftmostX = Math.min(leftmostX, label.x);
      leftList.push(labelLayoutList[i]);
    } else {
      rightmostX = Math.max(rightmostX, label.x);
      rightList.push(labelLayoutList[i]);
    }
  }
  for (var i = 0; i < labelLayoutList.length; i++) {
    var layout2 = labelLayoutList[i];
    if (!isPositionCenter(layout2) && layout2.linePoints) {
      if (layout2.labelStyleWidth != null) {
        continue;
      }
      var label = layout2.label;
      var linePoints = layout2.linePoints;
      var targetTextWidth = void 0;
      if (layout2.labelAlignTo === "edge") {
        if (label.x < cx) {
          targetTextWidth = linePoints[2][0] - layout2.labelDistance - viewLeft - layout2.edgeDistance;
        } else {
          targetTextWidth = viewLeft + viewWidth - layout2.edgeDistance - linePoints[2][0] - layout2.labelDistance;
        }
      } else if (layout2.labelAlignTo === "labelLine") {
        if (label.x < cx) {
          targetTextWidth = leftmostX - viewLeft - layout2.bleedMargin;
        } else {
          targetTextWidth = viewLeft + viewWidth - rightmostX - layout2.bleedMargin;
        }
      } else {
        if (label.x < cx) {
          targetTextWidth = label.x - viewLeft - layout2.bleedMargin;
        } else {
          targetTextWidth = viewLeft + viewWidth - label.x - layout2.bleedMargin;
        }
      }
      layout2.targetTextWidth = targetTextWidth;
      constrainTextWidth(layout2, targetTextWidth);
    }
  }
  adjustSingleSide(rightList, cx, cy, r, 1, viewWidth, viewHeight, viewLeft, viewTop, rightmostX);
  adjustSingleSide(leftList, cx, cy, r, -1, viewWidth, viewHeight, viewLeft, viewTop, leftmostX);
  for (var i = 0; i < labelLayoutList.length; i++) {
    var layout2 = labelLayoutList[i];
    if (!isPositionCenter(layout2) && layout2.linePoints) {
      var label = layout2.label;
      var linePoints = layout2.linePoints;
      var isAlignToEdge = layout2.labelAlignTo === "edge";
      var padding = label.style.padding;
      var paddingH = padding ? padding[1] + padding[3] : 0;
      var extraPaddingH = label.style.backgroundColor ? 0 : paddingH;
      var realTextWidth = layout2.rect.width + extraPaddingH;
      var dist2 = linePoints[1][0] - linePoints[2][0];
      if (isAlignToEdge) {
        if (label.x < cx) {
          linePoints[2][0] = viewLeft + layout2.edgeDistance + realTextWidth + layout2.labelDistance;
        } else {
          linePoints[2][0] = viewLeft + viewWidth - layout2.edgeDistance - realTextWidth - layout2.labelDistance;
        }
      } else {
        if (label.x < cx) {
          linePoints[2][0] = label.x + layout2.labelDistance;
        } else {
          linePoints[2][0] = label.x - layout2.labelDistance;
        }
        linePoints[1][0] = linePoints[2][0] + dist2;
      }
      linePoints[1][1] = linePoints[2][1] = label.y;
    }
  }
}
function constrainTextWidth(layout2, availableWidth, forceRecalculate) {
  if (forceRecalculate === void 0) {
    forceRecalculate = false;
  }
  if (layout2.labelStyleWidth != null) {
    return;
  }
  var label = layout2.label;
  var style = label.style;
  var textRect = layout2.rect;
  var bgColor = style.backgroundColor;
  var padding = style.padding;
  var paddingH = padding ? padding[1] + padding[3] : 0;
  var overflow = style.overflow;
  var oldOuterWidth = textRect.width + (bgColor ? 0 : paddingH);
  if (availableWidth < oldOuterWidth || forceRecalculate) {
    var oldHeight = textRect.height;
    if (overflow && overflow.match("break")) {
      label.setStyle("backgroundColor", null);
      label.setStyle("width", availableWidth - paddingH);
      var innerRect = label.getBoundingRect();
      label.setStyle("width", Math.ceil(innerRect.width));
      label.setStyle("backgroundColor", bgColor);
    } else {
      var availableInnerWidth = availableWidth - paddingH;
      var newWidth = availableWidth < oldOuterWidth ? availableInnerWidth : (
        // Current available width is enough, but the text may have
        // already been wrapped with a smaller available width.
        forceRecalculate ? availableInnerWidth > layout2.unconstrainedWidth ? null : availableInnerWidth : null
      );
      label.setStyle("width", newWidth);
    }
    var newRect = label.getBoundingRect();
    textRect.width = newRect.width;
    var margin = (label.style.margin || 0) + 2.1;
    textRect.height = newRect.height + margin;
    textRect.y -= (textRect.height - oldHeight) / 2;
  }
}
function isPositionCenter(sectorShape) {
  return sectorShape.position === "center";
}
function pieLabelLayout(seriesModel) {
  var data = seriesModel.getData();
  var labelLayoutList = [];
  var cx;
  var cy;
  var hasLabelRotate = false;
  var minShowLabelRadian = (seriesModel.get("minShowLabelAngle") || 0) * RADIAN2;
  var viewRect = data.getLayout("viewRect");
  var r = data.getLayout("r");
  var viewWidth = viewRect.width;
  var viewLeft = viewRect.x;
  var viewTop = viewRect.y;
  var viewHeight = viewRect.height;
  function setNotShow(el) {
    el.ignore = true;
  }
  function isLabelShown(label2) {
    if (!label2.ignore) {
      return true;
    }
    for (var key in label2.states) {
      if (label2.states[key].ignore === false) {
        return true;
      }
    }
    return false;
  }
  data.each(function(idx) {
    var sector = data.getItemGraphicEl(idx);
    var sectorShape = sector.shape;
    var label2 = sector.getTextContent();
    var labelLine2 = sector.getTextGuideLine();
    var itemModel = data.getItemModel(idx);
    var labelModel = itemModel.getModel("label");
    var labelPosition = labelModel.get("position") || itemModel.get(["emphasis", "label", "position"]);
    var labelDistance = labelModel.get("distanceToLabelLine");
    var labelAlignTo = labelModel.get("alignTo");
    var edgeDistance = parsePercent2(labelModel.get("edgeDistance"), viewWidth);
    var bleedMargin = labelModel.get("bleedMargin");
    var labelLineModel = itemModel.getModel("labelLine");
    var labelLineLen = labelLineModel.get("length");
    labelLineLen = parsePercent2(labelLineLen, viewWidth);
    var labelLineLen2 = labelLineModel.get("length2");
    labelLineLen2 = parsePercent2(labelLineLen2, viewWidth);
    if (Math.abs(sectorShape.endAngle - sectorShape.startAngle) < minShowLabelRadian) {
      each(label2.states, setNotShow);
      label2.ignore = true;
      if (labelLine2) {
        each(labelLine2.states, setNotShow);
        labelLine2.ignore = true;
      }
      return;
    }
    if (!isLabelShown(label2)) {
      return;
    }
    var midAngle = (sectorShape.startAngle + sectorShape.endAngle) / 2;
    var nx = Math.cos(midAngle);
    var ny = Math.sin(midAngle);
    var textX;
    var textY;
    var linePoints2;
    var textAlign;
    cx = sectorShape.cx;
    cy = sectorShape.cy;
    var isLabelInside = labelPosition === "inside" || labelPosition === "inner";
    if (labelPosition === "center") {
      textX = sectorShape.cx;
      textY = sectorShape.cy;
      textAlign = "center";
    } else {
      var x1 = (isLabelInside ? (sectorShape.r + sectorShape.r0) / 2 * nx : sectorShape.r * nx) + cx;
      var y1 = (isLabelInside ? (sectorShape.r + sectorShape.r0) / 2 * ny : sectorShape.r * ny) + cy;
      textX = x1 + nx * 3;
      textY = y1 + ny * 3;
      if (!isLabelInside) {
        var x2 = x1 + nx * (labelLineLen + r - sectorShape.r);
        var y2 = y1 + ny * (labelLineLen + r - sectorShape.r);
        var x3 = x2 + (nx < 0 ? -1 : 1) * labelLineLen2;
        var y3 = y2;
        if (labelAlignTo === "edge") {
          textX = nx < 0 ? viewLeft + edgeDistance : viewLeft + viewWidth - edgeDistance;
        } else {
          textX = x3 + (nx < 0 ? -labelDistance : labelDistance);
        }
        textY = y3;
        linePoints2 = [[x1, y1], [x2, y2], [x3, y3]];
      }
      textAlign = isLabelInside ? "center" : labelAlignTo === "edge" ? nx > 0 ? "right" : "left" : nx > 0 ? "left" : "right";
    }
    var PI3 = Math.PI;
    var labelRotate = 0;
    var rotate = labelModel.get("rotate");
    if (isNumber(rotate)) {
      labelRotate = rotate * (PI3 / 180);
    } else if (labelPosition === "center") {
      labelRotate = 0;
    } else if (rotate === "radial" || rotate === true) {
      var radialAngle = nx < 0 ? -midAngle + PI3 : -midAngle;
      labelRotate = radialAngle;
    } else if (rotate === "tangential" && labelPosition !== "outside" && labelPosition !== "outer") {
      var rad = Math.atan2(nx, ny);
      if (rad < 0) {
        rad = PI3 * 2 + rad;
      }
      var isDown = ny > 0;
      if (isDown) {
        rad = PI3 + rad;
      }
      labelRotate = rad - PI3;
    }
    hasLabelRotate = !!labelRotate;
    label2.x = textX;
    label2.y = textY;
    label2.rotation = labelRotate;
    label2.setStyle({
      verticalAlign: "middle"
    });
    if (!isLabelInside) {
      var textRect = label2.getBoundingRect().clone();
      textRect.applyTransform(label2.getComputedTransform());
      var margin = (label2.style.margin || 0) + 2.1;
      textRect.y -= margin / 2;
      textRect.height += margin;
      labelLayoutList.push({
        label: label2,
        labelLine: labelLine2,
        position: labelPosition,
        len: labelLineLen,
        len2: labelLineLen2,
        minTurnAngle: labelLineModel.get("minTurnAngle"),
        maxSurfaceAngle: labelLineModel.get("maxSurfaceAngle"),
        surfaceNormal: new Point_default(nx, ny),
        linePoints: linePoints2,
        textAlign,
        labelDistance,
        labelAlignTo,
        edgeDistance,
        bleedMargin,
        rect: textRect,
        unconstrainedWidth: textRect.width,
        labelStyleWidth: label2.style.width
      });
    } else {
      label2.setStyle({
        align: textAlign
      });
      var selectState2 = label2.states.select;
      if (selectState2) {
        selectState2.x += label2.x;
        selectState2.y += label2.y;
      }
    }
    sector.setTextConfig({
      inside: isLabelInside
    });
  });
  if (!hasLabelRotate && seriesModel.get("avoidLabelOverlap")) {
    avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop);
  }
  for (var i = 0; i < labelLayoutList.length; i++) {
    var layout2 = labelLayoutList[i];
    var label = layout2.label;
    var labelLine = layout2.labelLine;
    var notShowLabel = isNaN(label.x) || isNaN(label.y);
    if (label) {
      label.setStyle({
        align: layout2.textAlign
      });
      if (notShowLabel) {
        each(label.states, setNotShow);
        label.ignore = true;
      }
      var selectState = label.states.select;
      if (selectState) {
        selectState.x += label.x;
        selectState.y += label.y;
      }
    }
    if (labelLine) {
      var linePoints = layout2.linePoints;
      if (notShowLabel || !linePoints) {
        each(labelLine.states, setNotShow);
        labelLine.ignore = true;
      } else {
        limitTurnAngle(linePoints, layout2.minTurnAngle);
        limitSurfaceAngle(linePoints, layout2.surfaceNormal, layout2.maxSurfaceAngle);
        labelLine.setShape({
          points: linePoints
        });
        label.__hostTarget.textGuideLineConfig = {
          anchor: new Point_default(linePoints[0][0], linePoints[0][1])
        };
      }
    }
  }
}

// node_modules/echarts/lib/chart/pie/PieView.js
var PiePiece = (
  /** @class */
  function(_super) {
    __extends(PiePiece2, _super);
    function PiePiece2(data, idx, startAngle) {
      var _this = _super.call(this) || this;
      _this.z2 = 2;
      var text = new Text_default();
      _this.setTextContent(text);
      _this.updateData(data, idx, startAngle, true);
      return _this;
    }
    PiePiece2.prototype.updateData = function(data, idx, startAngle, firstCreate) {
      var sector = this;
      var seriesModel = data.hostModel;
      var itemModel = data.getItemModel(idx);
      var emphasisModel = itemModel.getModel("emphasis");
      var layout2 = data.getItemLayout(idx);
      var sectorShape = extend(getSectorCornerRadius(itemModel.getModel("itemStyle"), layout2, true), layout2);
      if (isNaN(sectorShape.startAngle)) {
        sector.setShape(sectorShape);
        return;
      }
      if (firstCreate) {
        sector.setShape(sectorShape);
        var animationType = seriesModel.getShallow("animationType");
        if (seriesModel.ecModel.ssr) {
          initProps(sector, {
            scaleX: 0,
            scaleY: 0
          }, seriesModel, {
            dataIndex: idx,
            isFrom: true
          });
          sector.originX = sectorShape.cx;
          sector.originY = sectorShape.cy;
        } else if (animationType === "scale") {
          sector.shape.r = layout2.r0;
          initProps(sector, {
            shape: {
              r: layout2.r
            }
          }, seriesModel, idx);
        } else {
          if (startAngle != null) {
            sector.setShape({
              startAngle,
              endAngle: startAngle
            });
            initProps(sector, {
              shape: {
                startAngle: layout2.startAngle,
                endAngle: layout2.endAngle
              }
            }, seriesModel, idx);
          } else {
            sector.shape.endAngle = layout2.startAngle;
            updateProps(sector, {
              shape: {
                endAngle: layout2.endAngle
              }
            }, seriesModel, idx);
          }
        }
      } else {
        saveOldStyle(sector);
        updateProps(sector, {
          shape: sectorShape
        }, seriesModel, idx);
      }
      sector.useStyle(data.getItemVisual(idx, "style"));
      setStatesStylesFromModel(sector, itemModel);
      var midAngle = (layout2.startAngle + layout2.endAngle) / 2;
      var offset = seriesModel.get("selectedOffset");
      var dx = Math.cos(midAngle) * offset;
      var dy = Math.sin(midAngle) * offset;
      var cursorStyle = itemModel.getShallow("cursor");
      cursorStyle && sector.attr("cursor", cursorStyle);
      this._updateLabel(seriesModel, data, idx);
      sector.ensureState("emphasis").shape = extend({
        r: layout2.r + (emphasisModel.get("scale") ? emphasisModel.get("scaleSize") || 0 : 0)
      }, getSectorCornerRadius(emphasisModel.getModel("itemStyle"), layout2));
      extend(sector.ensureState("select"), {
        x: dx,
        y: dy,
        shape: getSectorCornerRadius(itemModel.getModel(["select", "itemStyle"]), layout2)
      });
      extend(sector.ensureState("blur"), {
        shape: getSectorCornerRadius(itemModel.getModel(["blur", "itemStyle"]), layout2)
      });
      var labelLine = sector.getTextGuideLine();
      var labelText = sector.getTextContent();
      labelLine && extend(labelLine.ensureState("select"), {
        x: dx,
        y: dy
      });
      extend(labelText.ensureState("select"), {
        x: dx,
        y: dy
      });
      toggleHoverEmphasis(this, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
    };
    PiePiece2.prototype._updateLabel = function(seriesModel, data, idx) {
      var sector = this;
      var itemModel = data.getItemModel(idx);
      var labelLineModel = itemModel.getModel("labelLine");
      var style = data.getItemVisual(idx, "style");
      var visualColor = style && style.fill;
      var visualOpacity = style && style.opacity;
      setLabelStyle(sector, getLabelStatesModels(itemModel), {
        labelFetcher: data.hostModel,
        labelDataIndex: idx,
        inheritColor: visualColor,
        defaultOpacity: visualOpacity,
        defaultText: seriesModel.getFormattedLabel(idx, "normal") || data.getName(idx)
      });
      var labelText = sector.getTextContent();
      sector.setTextConfig({
        // reset position, rotation
        position: null,
        rotation: null
      });
      labelText.attr({
        z2: 10
      });
      var labelPosition = seriesModel.get(["label", "position"]);
      if (labelPosition !== "outside" && labelPosition !== "outer") {
        sector.removeTextGuideLine();
      } else {
        var polyline = this.getTextGuideLine();
        if (!polyline) {
          polyline = new Polyline_default();
          this.setTextGuideLine(polyline);
        }
        setLabelLineStyle(this, getLabelLineStatesModels(itemModel), {
          stroke: visualColor,
          opacity: retrieve3(labelLineModel.get(["lineStyle", "opacity"]), visualOpacity, 1)
        });
      }
    };
    return PiePiece2;
  }(Sector_default)
);
var PieView = (
  /** @class */
  function(_super) {
    __extends(PieView2, _super);
    function PieView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.ignoreLabelLineUpdate = true;
      return _this;
    }
    PieView2.prototype.render = function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData();
      var oldData = this._data;
      var group = this.group;
      var startAngle;
      if (!oldData && data.count() > 0) {
        var shape = data.getItemLayout(0);
        for (var s = 1; isNaN(shape && shape.startAngle) && s < data.count(); ++s) {
          shape = data.getItemLayout(s);
        }
        if (shape) {
          startAngle = shape.startAngle;
        }
      }
      if (this._emptyCircleSector) {
        group.remove(this._emptyCircleSector);
      }
      if (data.count() === 0 && seriesModel.get("showEmptyCircle")) {
        var layoutData = getSeriesLayoutData(seriesModel);
        var sector = new Sector_default({
          shape: extend(getBasicPieLayout(seriesModel, api), layoutData)
        });
        sector.useStyle(seriesModel.getModel("emptyCircleStyle").getItemStyle());
        this._emptyCircleSector = sector;
        group.add(sector);
      }
      data.diff(oldData).add(function(idx) {
        var piePiece = new PiePiece(data, idx, startAngle);
        data.setItemGraphicEl(idx, piePiece);
        group.add(piePiece);
      }).update(function(newIdx, oldIdx) {
        var piePiece = oldData.getItemGraphicEl(oldIdx);
        piePiece.updateData(data, newIdx, startAngle);
        piePiece.off("click");
        group.add(piePiece);
        data.setItemGraphicEl(newIdx, piePiece);
      }).remove(function(idx) {
        var piePiece = oldData.getItemGraphicEl(idx);
        removeElementWithFadeOut(piePiece, seriesModel, idx);
      }).execute();
      pieLabelLayout(seriesModel);
      if (seriesModel.get("animationTypeUpdate") !== "expansion") {
        this._data = data;
      }
    };
    PieView2.prototype.dispose = function() {
    };
    PieView2.prototype.containPoint = function(point, seriesModel) {
      var data = seriesModel.getData();
      var itemLayout = data.getItemLayout(0);
      if (itemLayout) {
        var dx = point[0] - itemLayout.cx;
        var dy = point[1] - itemLayout.cy;
        var radius = Math.sqrt(dx * dx + dy * dy);
        return radius <= itemLayout.r && radius >= itemLayout.r0;
      }
    };
    PieView2.type = "pie";
    return PieView2;
  }(Chart_default)
);
var PieView_default = PieView;

// node_modules/echarts/lib/chart/helper/createSeriesDataSimply.js
function createSeriesDataSimply(seriesModel, opt, nameList) {
  opt = isArray(opt) && {
    coordDimensions: opt
  } || extend({
    encodeDefine: seriesModel.getEncode()
  }, opt);
  var source = seriesModel.getSource();
  var dimensions = prepareSeriesDataSchema(source, opt).dimensions;
  var list = new SeriesData_default(dimensions, seriesModel);
  list.initData(source, nameList);
  return list;
}

// node_modules/echarts/lib/visual/LegendVisualProvider.js
var LegendVisualProvider = (
  /** @class */
  function() {
    function LegendVisualProvider2(getDataWithEncodedVisual, getRawData) {
      this._getDataWithEncodedVisual = getDataWithEncodedVisual;
      this._getRawData = getRawData;
    }
    LegendVisualProvider2.prototype.getAllNames = function() {
      var rawData = this._getRawData();
      return rawData.mapArray(rawData.getName);
    };
    LegendVisualProvider2.prototype.containName = function(name) {
      var rawData = this._getRawData();
      return rawData.indexOfName(name) >= 0;
    };
    LegendVisualProvider2.prototype.indexOfName = function(name) {
      var dataWithEncodedVisual = this._getDataWithEncodedVisual();
      return dataWithEncodedVisual.indexOfName(name);
    };
    LegendVisualProvider2.prototype.getItemVisual = function(dataIndex, key) {
      var dataWithEncodedVisual = this._getDataWithEncodedVisual();
      return dataWithEncodedVisual.getItemVisual(dataIndex, key);
    };
    return LegendVisualProvider2;
  }()
);
var LegendVisualProvider_default = LegendVisualProvider;

// node_modules/echarts/lib/chart/pie/PieSeries.js
var innerData = makeInner();
var PieSeriesModel = (
  /** @class */
  function(_super) {
    __extends(PieSeriesModel2, _super);
    function PieSeriesModel2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PieSeriesModel2.prototype.init = function(option) {
      _super.prototype.init.apply(this, arguments);
      this.legendVisualProvider = new LegendVisualProvider_default(bind(this.getData, this), bind(this.getRawData, this));
      this._defaultLabelLine(option);
    };
    PieSeriesModel2.prototype.mergeOption = function() {
      _super.prototype.mergeOption.apply(this, arguments);
    };
    PieSeriesModel2.prototype.getInitialData = function() {
      return createSeriesDataSimply(this, {
        coordDimensions: ["value"],
        encodeDefaulter: curry(makeSeriesEncodeForNameBased, this)
      });
    };
    PieSeriesModel2.prototype.getDataParams = function(dataIndex) {
      var data = this.getData();
      var dataInner = innerData(data);
      var seats = dataInner.seats;
      if (!seats) {
        var valueList_1 = [];
        data.each(data.mapDimension("value"), function(value) {
          valueList_1.push(value);
        });
        seats = dataInner.seats = getPercentSeats(valueList_1, data.hostModel.get("percentPrecision"));
      }
      var params = _super.prototype.getDataParams.call(this, dataIndex);
      params.percent = seats[dataIndex] || 0;
      params.$vars.push("percent");
      return params;
    };
    PieSeriesModel2.prototype._defaultLabelLine = function(option) {
      defaultEmphasis(option, "labelLine", ["show"]);
      var labelLineNormalOpt = option.labelLine;
      var labelLineEmphasisOpt = option.emphasis.labelLine;
      labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
      labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
    };
    PieSeriesModel2.type = "series.pie";
    PieSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      legendHoverLink: true,
      colorBy: "data",
      // 默认全局居中
      center: ["50%", "50%"],
      radius: [0, "75%"],
      // 默认顺时针
      clockwise: true,
      startAngle: 90,
      endAngle: "auto",
      padAngle: 0,
      // 最小角度改为0
      minAngle: 0,
      // If the angle of a sector less than `minShowLabelAngle`,
      // the label will not be displayed.
      minShowLabelAngle: 0,
      // 选中时扇区偏移量
      selectedOffset: 10,
      // 选择模式，默认关闭，可选single，multiple
      // selectedMode: false,
      // 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
      // roseType: null,
      percentPrecision: 2,
      // If still show when all data zero.
      stillShowZeroSum: true,
      // cursor: null,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: null,
      height: null,
      label: {
        // color: 'inherit',
        // If rotate around circle
        rotate: 0,
        show: true,
        overflow: "truncate",
        // 'outer', 'inside', 'center'
        position: "outer",
        // 'none', 'labelLine', 'edge'. Works only when position is 'outer'
        alignTo: "none",
        // Closest distance between label and chart edge.
        // Works only position is 'outer' and alignTo is 'edge'.
        edgeDistance: "25%",
        // Works only position is 'outer' and alignTo is not 'edge'.
        bleedMargin: 10,
        // Distance between text and label line.
        distanceToLabelLine: 5
        // formatter: 标签文本格式器，同 tooltip.formatter，不支持异步回调
        // 默认使用全局文本样式，详见 textStyle
        // distance: 当position为inner时有效，为label位置到圆心的距离与圆半径(环状图为内外半径和)的比例系数
      },
      // Enabled when label.normal.position is 'outer'
      labelLine: {
        show: true,
        // 引导线两段中的第一段长度
        length: 15,
        // 引导线两段中的第二段长度
        length2: 15,
        smooth: false,
        minTurnAngle: 90,
        maxSurfaceAngle: 90,
        lineStyle: {
          // color: 各异,
          width: 1,
          type: "solid"
        }
      },
      itemStyle: {
        borderWidth: 1,
        borderJoin: "round"
      },
      showEmptyCircle: true,
      emptyCircleStyle: {
        color: "lightgray",
        opacity: 1
      },
      labelLayout: {
        // Hide the overlapped label.
        hideOverlap: true
      },
      emphasis: {
        scale: true,
        scaleSize: 5
      },
      // If use strategy to avoid label overlapping
      avoidLabelOverlap: true,
      // Animation type. Valid values: expansion, scale
      animationType: "expansion",
      animationDuration: 1e3,
      // Animation type when update. Valid values: transition, expansion
      animationTypeUpdate: "transition",
      animationEasingUpdate: "cubicInOut",
      animationDurationUpdate: 500,
      animationEasing: "cubicInOut"
    };
    return PieSeriesModel2;
  }(Series_default)
);
var PieSeries_default = PieSeriesModel;

// node_modules/echarts/lib/processor/negativeDataFilter.js
function negativeDataFilter(seriesType) {
  return {
    seriesType,
    reset: function(seriesModel, ecModel) {
      var data = seriesModel.getData();
      data.filterSelf(function(idx) {
        var valueDim = data.mapDimension("value");
        var curValue = data.get(valueDim, idx);
        if (isNumber(curValue) && !isNaN(curValue) && curValue < 0) {
          return false;
        }
        return true;
      });
    }
  };
}

// node_modules/echarts/lib/chart/pie/install.js
function install7(registers) {
  registers.registerChartView(PieView_default);
  registers.registerSeriesModel(PieSeries_default);
  createLegacyDataSelectAction("pie", registers.registerAction);
  registers.registerLayout(curry(pieLayout, "pie"));
  registers.registerProcessor(dataFilter("pie"));
  registers.registerProcessor(negativeDataFilter("pie"));
}

// node_modules/echarts/lib/chart/scatter/ScatterSeries.js
var ScatterSeriesModel = (
  /** @class */
  function(_super) {
    __extends(ScatterSeriesModel2, _super);
    function ScatterSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ScatterSeriesModel2.type;
      _this.hasSymbolVisual = true;
      return _this;
    }
    ScatterSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesData_default(null, this, {
        useEncodeDefaulter: true
      });
    };
    ScatterSeriesModel2.prototype.getProgressive = function() {
      var progressive = this.option.progressive;
      if (progressive == null) {
        return this.option.large ? 5e3 : this.get("progressive");
      }
      return progressive;
    };
    ScatterSeriesModel2.prototype.getProgressiveThreshold = function() {
      var progressiveThreshold = this.option.progressiveThreshold;
      if (progressiveThreshold == null) {
        return this.option.large ? 1e4 : this.get("progressiveThreshold");
      }
      return progressiveThreshold;
    };
    ScatterSeriesModel2.prototype.brushSelector = function(dataIndex, data, selectors) {
      return selectors.point(data.getItemLayout(dataIndex));
    };
    ScatterSeriesModel2.prototype.getZLevelKey = function() {
      return this.getData().count() > this.getProgressiveThreshold() ? this.id : "";
    };
    ScatterSeriesModel2.type = "series.scatter";
    ScatterSeriesModel2.dependencies = ["grid", "polar", "geo", "singleAxis", "calendar"];
    ScatterSeriesModel2.defaultOption = {
      coordinateSystem: "cartesian2d",
      // zlevel: 0,
      z: 2,
      legendHoverLink: true,
      symbolSize: 10,
      // symbolRotate: null,  // 图形旋转控制
      large: false,
      // Available when large is true
      largeThreshold: 2e3,
      // cursor: null,
      itemStyle: {
        opacity: 0.8
        // color: 各异
      },
      emphasis: {
        scale: true
      },
      // If clip the overflow graphics
      // Works on cartesian / polar series
      clip: true,
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      },
      universalTransition: {
        divideShape: "clone"
      }
      // progressive: null
    };
    return ScatterSeriesModel2;
  }(Series_default)
);
var ScatterSeries_default = ScatterSeriesModel;

// node_modules/echarts/lib/chart/helper/LargeSymbolDraw.js
var BOOST_SIZE_THRESHOLD = 4;
var LargeSymbolPathShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function LargeSymbolPathShape2() {
    }
    return LargeSymbolPathShape2;
  }()
);
var LargeSymbolPath = (
  /** @class */
  function(_super) {
    __extends(LargeSymbolPath2, _super);
    function LargeSymbolPath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this._off = 0;
      _this.hoverDataIdx = -1;
      return _this;
    }
    LargeSymbolPath2.prototype.getDefaultShape = function() {
      return new LargeSymbolPathShape();
    };
    LargeSymbolPath2.prototype.reset = function() {
      this.notClear = false;
      this._off = 0;
    };
    LargeSymbolPath2.prototype.buildPath = function(path, shape) {
      var points = shape.points;
      var size = shape.size;
      var symbolProxy = this.symbolProxy;
      var symbolProxyShape = symbolProxy.shape;
      var ctx = path.getContext ? path.getContext() : path;
      var canBoost = ctx && size[0] < BOOST_SIZE_THRESHOLD;
      var softClipShape = this.softClipShape;
      var i;
      if (canBoost) {
        this._ctx = ctx;
        return;
      }
      this._ctx = null;
      for (i = this._off; i < points.length; ) {
        var x = points[i++];
        var y = points[i++];
        if (isNaN(x) || isNaN(y)) {
          continue;
        }
        if (softClipShape && !softClipShape.contain(x, y)) {
          continue;
        }
        symbolProxyShape.x = x - size[0] / 2;
        symbolProxyShape.y = y - size[1] / 2;
        symbolProxyShape.width = size[0];
        symbolProxyShape.height = size[1];
        symbolProxy.buildPath(path, symbolProxyShape, true);
      }
      if (this.incremental) {
        this._off = i;
        this.notClear = true;
      }
    };
    LargeSymbolPath2.prototype.afterBrush = function() {
      var shape = this.shape;
      var points = shape.points;
      var size = shape.size;
      var ctx = this._ctx;
      var softClipShape = this.softClipShape;
      var i;
      if (!ctx) {
        return;
      }
      for (i = this._off; i < points.length; ) {
        var x = points[i++];
        var y = points[i++];
        if (isNaN(x) || isNaN(y)) {
          continue;
        }
        if (softClipShape && !softClipShape.contain(x, y)) {
          continue;
        }
        ctx.fillRect(x - size[0] / 2, y - size[1] / 2, size[0], size[1]);
      }
      if (this.incremental) {
        this._off = i;
        this.notClear = true;
      }
    };
    LargeSymbolPath2.prototype.findDataIndex = function(x, y) {
      var shape = this.shape;
      var points = shape.points;
      var size = shape.size;
      var w = Math.max(size[0], 4);
      var h = Math.max(size[1], 4);
      for (var idx = points.length / 2 - 1; idx >= 0; idx--) {
        var i = idx * 2;
        var x0 = points[i] - w / 2;
        var y0 = points[i + 1] - h / 2;
        if (x >= x0 && y >= y0 && x <= x0 + w && y <= y0 + h) {
          return idx;
        }
      }
      return -1;
    };
    LargeSymbolPath2.prototype.contain = function(x, y) {
      var localPos = this.transformCoordToLocal(x, y);
      var rect = this.getBoundingRect();
      x = localPos[0];
      y = localPos[1];
      if (rect.contain(x, y)) {
        var dataIdx = this.hoverDataIdx = this.findDataIndex(x, y);
        return dataIdx >= 0;
      }
      this.hoverDataIdx = -1;
      return false;
    };
    LargeSymbolPath2.prototype.getBoundingRect = function() {
      var rect = this._rect;
      if (!rect) {
        var shape = this.shape;
        var points = shape.points;
        var size = shape.size;
        var w = size[0];
        var h = size[1];
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i = 0; i < points.length; ) {
          var x = points[i++];
          var y = points[i++];
          minX = Math.min(x, minX);
          maxX = Math.max(x, maxX);
          minY = Math.min(y, minY);
          maxY = Math.max(y, maxY);
        }
        rect = this._rect = new BoundingRect_default(minX - w / 2, minY - h / 2, maxX - minX + w, maxY - minY + h);
      }
      return rect;
    };
    return LargeSymbolPath2;
  }(Path_default)
);
var LargeSymbolDraw = (
  /** @class */
  function() {
    function LargeSymbolDraw2() {
      this.group = new Group_default();
    }
    LargeSymbolDraw2.prototype.updateData = function(data, opt) {
      this._clear();
      var symbolEl = this._create();
      symbolEl.setShape({
        points: data.getLayout("points")
      });
      this._setCommon(symbolEl, data, opt);
    };
    LargeSymbolDraw2.prototype.updateLayout = function(data) {
      var points = data.getLayout("points");
      this.group.eachChild(function(child) {
        if (child.startIndex != null) {
          var len2 = (child.endIndex - child.startIndex) * 2;
          var byteOffset = child.startIndex * 4 * 2;
          points = new Float32Array(points.buffer, byteOffset, len2);
        }
        child.setShape("points", points);
        child.reset();
      });
    };
    LargeSymbolDraw2.prototype.incrementalPrepareUpdate = function(data) {
      this._clear();
    };
    LargeSymbolDraw2.prototype.incrementalUpdate = function(taskParams, data, opt) {
      var lastAdded = this._newAdded[0];
      var points = data.getLayout("points");
      var oldPoints = lastAdded && lastAdded.shape.points;
      if (oldPoints && oldPoints.length < 2e4) {
        var oldLen = oldPoints.length;
        var newPoints = new Float32Array(oldLen + points.length);
        newPoints.set(oldPoints);
        newPoints.set(points, oldLen);
        lastAdded.endIndex = taskParams.end;
        lastAdded.setShape({
          points: newPoints
        });
      } else {
        this._newAdded = [];
        var symbolEl = this._create();
        symbolEl.startIndex = taskParams.start;
        symbolEl.endIndex = taskParams.end;
        symbolEl.incremental = true;
        symbolEl.setShape({
          points
        });
        this._setCommon(symbolEl, data, opt);
      }
    };
    LargeSymbolDraw2.prototype.eachRendered = function(cb) {
      this._newAdded[0] && cb(this._newAdded[0]);
    };
    LargeSymbolDraw2.prototype._create = function() {
      var symbolEl = new LargeSymbolPath({
        cursor: "default"
      });
      symbolEl.ignoreCoarsePointer = true;
      this.group.add(symbolEl);
      this._newAdded.push(symbolEl);
      return symbolEl;
    };
    LargeSymbolDraw2.prototype._setCommon = function(symbolEl, data, opt) {
      var hostModel = data.hostModel;
      opt = opt || {};
      var size = data.getVisual("symbolSize");
      symbolEl.setShape("size", size instanceof Array ? size : [size, size]);
      symbolEl.softClipShape = opt.clipShape || null;
      symbolEl.symbolProxy = createSymbol(data.getVisual("symbol"), 0, 0, 0, 0);
      symbolEl.setColor = symbolEl.symbolProxy.setColor;
      var extrudeShadow = symbolEl.shape.size[0] < BOOST_SIZE_THRESHOLD;
      symbolEl.useStyle(
        // Draw shadow when doing fillRect is extremely slow.
        hostModel.getModel("itemStyle").getItemStyle(extrudeShadow ? ["color", "shadowBlur", "shadowColor"] : ["color"])
      );
      var globalStyle = data.getVisual("style");
      var visualColor = globalStyle && globalStyle.fill;
      if (visualColor) {
        symbolEl.setColor(visualColor);
      }
      var ecData = getECData(symbolEl);
      ecData.seriesIndex = hostModel.seriesIndex;
      symbolEl.on("mousemove", function(e) {
        ecData.dataIndex = null;
        var dataIndex = symbolEl.hoverDataIdx;
        if (dataIndex >= 0) {
          ecData.dataIndex = dataIndex + (symbolEl.startIndex || 0);
        }
      });
    };
    LargeSymbolDraw2.prototype.remove = function() {
      this._clear();
    };
    LargeSymbolDraw2.prototype._clear = function() {
      this._newAdded = [];
      this.group.removeAll();
    };
    return LargeSymbolDraw2;
  }()
);
var LargeSymbolDraw_default = LargeSymbolDraw;

// node_modules/echarts/lib/chart/scatter/ScatterView.js
var ScatterView = (
  /** @class */
  function(_super) {
    __extends(ScatterView2, _super);
    function ScatterView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ScatterView2.type;
      return _this;
    }
    ScatterView2.prototype.render = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var symbolDraw = this._updateSymbolDraw(data, seriesModel);
      symbolDraw.updateData(data, {
        // TODO
        // If this parameter should be a shape or a bounding volume
        // shape will be more general.
        // But bounding volume like bounding rect will be much faster in the contain calculation
        clipShape: this._getClipShape(seriesModel)
      });
      this._finished = true;
    };
    ScatterView2.prototype.incrementalPrepareRender = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var symbolDraw = this._updateSymbolDraw(data, seriesModel);
      symbolDraw.incrementalPrepareUpdate(data);
      this._finished = false;
    };
    ScatterView2.prototype.incrementalRender = function(taskParams, seriesModel, ecModel) {
      this._symbolDraw.incrementalUpdate(taskParams, seriesModel.getData(), {
        clipShape: this._getClipShape(seriesModel)
      });
      this._finished = taskParams.end === seriesModel.getData().count();
    };
    ScatterView2.prototype.updateTransform = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      this.group.dirty();
      if (!this._finished || data.count() > 1e4) {
        return {
          update: true
        };
      } else {
        var res = pointsLayout("").reset(seriesModel, ecModel, api);
        if (res.progress) {
          res.progress({
            start: 0,
            end: data.count(),
            count: data.count()
          }, data);
        }
        this._symbolDraw.updateLayout(data);
      }
    };
    ScatterView2.prototype.eachRendered = function(cb) {
      this._symbolDraw && this._symbolDraw.eachRendered(cb);
    };
    ScatterView2.prototype._getClipShape = function(seriesModel) {
      if (!seriesModel.get("clip", true)) {
        return;
      }
      var coordSys = seriesModel.coordinateSystem;
      return coordSys && coordSys.getArea && coordSys.getArea(0.1);
    };
    ScatterView2.prototype._updateSymbolDraw = function(data, seriesModel) {
      var symbolDraw = this._symbolDraw;
      var pipelineContext = seriesModel.pipelineContext;
      var isLargeDraw = pipelineContext.large;
      if (!symbolDraw || isLargeDraw !== this._isLargeDraw) {
        symbolDraw && symbolDraw.remove();
        symbolDraw = this._symbolDraw = isLargeDraw ? new LargeSymbolDraw_default() : new SymbolDraw_default();
        this._isLargeDraw = isLargeDraw;
        this.group.removeAll();
      }
      this.group.add(symbolDraw.group);
      return symbolDraw;
    };
    ScatterView2.prototype.remove = function(ecModel, api) {
      this._symbolDraw && this._symbolDraw.remove(true);
      this._symbolDraw = null;
    };
    ScatterView2.prototype.dispose = function() {
    };
    ScatterView2.type = "scatter";
    return ScatterView2;
  }(Chart_default)
);
var ScatterView_default = ScatterView;

// node_modules/echarts/lib/chart/scatter/install.js
function install8(registers) {
  use(install);
  registers.registerSeriesModel(ScatterSeries_default);
  registers.registerChartView(ScatterView_default);
  registers.registerLayout(pointsLayout("scatter"));
}

// node_modules/echarts/lib/chart/radar/radarLayout.js
function radarLayout(ecModel) {
  ecModel.eachSeriesByType("radar", function(seriesModel) {
    var data = seriesModel.getData();
    var points = [];
    var coordSys = seriesModel.coordinateSystem;
    if (!coordSys) {
      return;
    }
    var axes = coordSys.getIndicatorAxes();
    each(axes, function(axis, axisIndex) {
      data.each(data.mapDimension(axes[axisIndex].dim), function(val, dataIndex) {
        points[dataIndex] = points[dataIndex] || [];
        var point = coordSys.dataToPoint(val, axisIndex);
        points[dataIndex][axisIndex] = isValidPoint(point) ? point : getValueMissingPoint(coordSys);
      });
    });
    data.each(function(idx) {
      var firstPoint = find(points[idx], function(point) {
        return isValidPoint(point);
      }) || getValueMissingPoint(coordSys);
      points[idx].push(firstPoint.slice());
      data.setItemLayout(idx, points[idx]);
    });
  });
}
function isValidPoint(point) {
  return !isNaN(point[0]) && !isNaN(point[1]);
}
function getValueMissingPoint(coordSys) {
  return [coordSys.cx, coordSys.cy];
}

// node_modules/echarts/lib/chart/radar/backwardCompat.js
function radarBackwardCompat(option) {
  var polarOptArr = option.polar;
  if (polarOptArr) {
    if (!isArray(polarOptArr)) {
      polarOptArr = [polarOptArr];
    }
    var polarNotRadar_1 = [];
    each(polarOptArr, function(polarOpt, idx) {
      if (polarOpt.indicator) {
        if (polarOpt.type && !polarOpt.shape) {
          polarOpt.shape = polarOpt.type;
        }
        option.radar = option.radar || [];
        if (!isArray(option.radar)) {
          option.radar = [option.radar];
        }
        option.radar.push(polarOpt);
      } else {
        polarNotRadar_1.push(polarOpt);
      }
    });
    option.polar = polarNotRadar_1;
  }
  each(option.series, function(seriesOpt) {
    if (seriesOpt && seriesOpt.type === "radar" && seriesOpt.polarIndex) {
      seriesOpt.radarIndex = seriesOpt.polarIndex;
    }
  });
}

// node_modules/echarts/lib/chart/radar/RadarView.js
var RadarView = (
  /** @class */
  function(_super) {
    __extends(RadarView2, _super);
    function RadarView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = RadarView2.type;
      return _this;
    }
    RadarView2.prototype.render = function(seriesModel, ecModel, api) {
      var polar = seriesModel.coordinateSystem;
      var group = this.group;
      var data = seriesModel.getData();
      var oldData = this._data;
      function createSymbol2(data2, idx) {
        var symbolType = data2.getItemVisual(idx, "symbol") || "circle";
        if (symbolType === "none") {
          return;
        }
        var symbolSize = normalizeSymbolSize(data2.getItemVisual(idx, "symbolSize"));
        var symbolPath = createSymbol(symbolType, -1, -1, 2, 2);
        var symbolRotate = data2.getItemVisual(idx, "symbolRotate") || 0;
        symbolPath.attr({
          style: {
            strokeNoScale: true
          },
          z2: 100,
          scaleX: symbolSize[0] / 2,
          scaleY: symbolSize[1] / 2,
          rotation: symbolRotate * Math.PI / 180 || 0
        });
        return symbolPath;
      }
      function updateSymbols(oldPoints, newPoints, symbolGroup, data2, idx, isInit) {
        symbolGroup.removeAll();
        for (var i = 0; i < newPoints.length - 1; i++) {
          var symbolPath = createSymbol2(data2, idx);
          if (symbolPath) {
            symbolPath.__dimIdx = i;
            if (oldPoints[i]) {
              symbolPath.setPosition(oldPoints[i]);
              graphic_exports[isInit ? "initProps" : "updateProps"](symbolPath, {
                x: newPoints[i][0],
                y: newPoints[i][1]
              }, seriesModel, idx);
            } else {
              symbolPath.setPosition(newPoints[i]);
            }
            symbolGroup.add(symbolPath);
          }
        }
      }
      function getInitialPoints(points) {
        return map(points, function(pt) {
          return [polar.cx, polar.cy];
        });
      }
      data.diff(oldData).add(function(idx) {
        var points = data.getItemLayout(idx);
        if (!points) {
          return;
        }
        var polygon = new Polygon_default();
        var polyline = new Polyline_default();
        var target = {
          shape: {
            points
          }
        };
        polygon.shape.points = getInitialPoints(points);
        polyline.shape.points = getInitialPoints(points);
        initProps(polygon, target, seriesModel, idx);
        initProps(polyline, target, seriesModel, idx);
        var itemGroup = new Group_default();
        var symbolGroup = new Group_default();
        itemGroup.add(polyline);
        itemGroup.add(polygon);
        itemGroup.add(symbolGroup);
        updateSymbols(polyline.shape.points, points, symbolGroup, data, idx, true);
        data.setItemGraphicEl(idx, itemGroup);
      }).update(function(newIdx, oldIdx) {
        var itemGroup = oldData.getItemGraphicEl(oldIdx);
        var polyline = itemGroup.childAt(0);
        var polygon = itemGroup.childAt(1);
        var symbolGroup = itemGroup.childAt(2);
        var target = {
          shape: {
            points: data.getItemLayout(newIdx)
          }
        };
        if (!target.shape.points) {
          return;
        }
        updateSymbols(polyline.shape.points, target.shape.points, symbolGroup, data, newIdx, false);
        saveOldStyle(polygon);
        saveOldStyle(polyline);
        updateProps(polyline, target, seriesModel);
        updateProps(polygon, target, seriesModel);
        data.setItemGraphicEl(newIdx, itemGroup);
      }).remove(function(idx) {
        group.remove(oldData.getItemGraphicEl(idx));
      }).execute();
      data.eachItemGraphicEl(function(itemGroup, idx) {
        var itemModel = data.getItemModel(idx);
        var polyline = itemGroup.childAt(0);
        var polygon = itemGroup.childAt(1);
        var symbolGroup = itemGroup.childAt(2);
        var itemStyle = data.getItemVisual(idx, "style");
        var color = itemStyle.fill;
        group.add(itemGroup);
        polyline.useStyle(defaults(itemModel.getModel("lineStyle").getLineStyle(), {
          fill: "none",
          stroke: color
        }));
        setStatesStylesFromModel(polyline, itemModel, "lineStyle");
        setStatesStylesFromModel(polygon, itemModel, "areaStyle");
        var areaStyleModel = itemModel.getModel("areaStyle");
        var polygonIgnore = areaStyleModel.isEmpty() && areaStyleModel.parentModel.isEmpty();
        polygon.ignore = polygonIgnore;
        each(["emphasis", "select", "blur"], function(stateName) {
          var stateModel = itemModel.getModel([stateName, "areaStyle"]);
          var stateIgnore = stateModel.isEmpty() && stateModel.parentModel.isEmpty();
          polygon.ensureState(stateName).ignore = stateIgnore && polygonIgnore;
        });
        polygon.useStyle(defaults(areaStyleModel.getAreaStyle(), {
          fill: color,
          opacity: 0.7,
          decal: itemStyle.decal
        }));
        var emphasisModel = itemModel.getModel("emphasis");
        var itemHoverStyle = emphasisModel.getModel("itemStyle").getItemStyle();
        symbolGroup.eachChild(function(symbolPath) {
          if (symbolPath instanceof Image_default) {
            var pathStyle = symbolPath.style;
            symbolPath.useStyle(extend({
              // TODO other properties like x, y ?
              image: pathStyle.image,
              x: pathStyle.x,
              y: pathStyle.y,
              width: pathStyle.width,
              height: pathStyle.height
            }, itemStyle));
          } else {
            symbolPath.useStyle(itemStyle);
            symbolPath.setColor(color);
            symbolPath.style.strokeNoScale = true;
          }
          var pathEmphasisState = symbolPath.ensureState("emphasis");
          pathEmphasisState.style = clone(itemHoverStyle);
          var defaultText = data.getStore().get(data.getDimensionIndex(symbolPath.__dimIdx), idx);
          (defaultText == null || isNaN(defaultText)) && (defaultText = "");
          setLabelStyle(symbolPath, getLabelStatesModels(itemModel), {
            labelFetcher: data.hostModel,
            labelDataIndex: idx,
            labelDimIndex: symbolPath.__dimIdx,
            defaultText,
            inheritColor: color,
            defaultOpacity: itemStyle.opacity
          });
        });
        toggleHoverEmphasis(itemGroup, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
      });
      this._data = data;
    };
    RadarView2.prototype.remove = function() {
      this.group.removeAll();
      this._data = null;
    };
    RadarView2.type = "radar";
    return RadarView2;
  }(Chart_default)
);
var RadarView_default = RadarView;

// node_modules/echarts/lib/chart/radar/RadarSeries.js
var RadarSeriesModel = (
  /** @class */
  function(_super) {
    __extends(RadarSeriesModel2, _super);
    function RadarSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = RadarSeriesModel2.type;
      _this.hasSymbolVisual = true;
      return _this;
    }
    RadarSeriesModel2.prototype.init = function(option) {
      _super.prototype.init.apply(this, arguments);
      this.legendVisualProvider = new LegendVisualProvider_default(bind(this.getData, this), bind(this.getRawData, this));
    };
    RadarSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesDataSimply(this, {
        generateCoord: "indicator_",
        generateCoordCount: Infinity
      });
    };
    RadarSeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      var data = this.getData();
      var coordSys = this.coordinateSystem;
      var indicatorAxes = coordSys.getIndicatorAxes();
      var name = this.getData().getName(dataIndex);
      var nameToDisplay = name === "" ? this.name : name;
      var markerColor = retrieveVisualColorForTooltipMarker(this, dataIndex);
      return createTooltipMarkup("section", {
        header: nameToDisplay,
        sortBlocks: true,
        blocks: map(indicatorAxes, function(axis) {
          var val = data.get(data.mapDimension(axis.dim), dataIndex);
          return createTooltipMarkup("nameValue", {
            markerType: "subItem",
            markerColor,
            name: axis.name,
            value: val,
            sortParam: val
          });
        })
      });
    };
    RadarSeriesModel2.prototype.getTooltipPosition = function(dataIndex) {
      if (dataIndex != null) {
        var data_1 = this.getData();
        var coordSys = this.coordinateSystem;
        var values = data_1.getValues(map(coordSys.dimensions, function(dim) {
          return data_1.mapDimension(dim);
        }), dataIndex);
        for (var i = 0, len2 = values.length; i < len2; i++) {
          if (!isNaN(values[i])) {
            var indicatorAxes = coordSys.getIndicatorAxes();
            return coordSys.coordToPoint(indicatorAxes[i].dataToCoord(values[i]), i);
          }
        }
      }
    };
    RadarSeriesModel2.type = "series.radar";
    RadarSeriesModel2.dependencies = ["radar"];
    RadarSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      colorBy: "data",
      coordinateSystem: "radar",
      legendHoverLink: true,
      radarIndex: 0,
      lineStyle: {
        width: 2,
        type: "solid",
        join: "round"
      },
      label: {
        position: "top"
      },
      // areaStyle: {
      // },
      // itemStyle: {}
      symbolSize: 8
      // symbolRotate: null
    };
    return RadarSeriesModel2;
  }(Series_default)
);
var RadarSeries_default = RadarSeriesModel;

// node_modules/echarts/lib/chart/radar/install.js
function install9(registers) {
  use(install2);
  registers.registerChartView(RadarView_default);
  registers.registerSeriesModel(RadarSeries_default);
  registers.registerLayout(radarLayout);
  registers.registerProcessor(dataFilter("radar"));
  registers.registerPreprocessor(radarBackwardCompat);
}

// node_modules/echarts/lib/chart/map/MapView.js
var MapView = (
  /** @class */
  function(_super) {
    __extends(MapView2, _super);
    function MapView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = MapView2.type;
      return _this;
    }
    MapView2.prototype.render = function(mapModel, ecModel, api, payload) {
      if (payload && payload.type === "mapToggleSelect" && payload.from === this.uid) {
        return;
      }
      var group = this.group;
      group.removeAll();
      if (mapModel.getHostGeoModel()) {
        return;
      }
      if (this._mapDraw && payload && payload.type === "geoRoam") {
        this._mapDraw.resetForLabelLayout();
      }
      if (!(payload && payload.type === "geoRoam" && payload.componentType === "series" && payload.seriesId === mapModel.id)) {
        if (mapModel.needsDrawMap) {
          var mapDraw = this._mapDraw || new MapDraw_default(api);
          group.add(mapDraw.group);
          mapDraw.draw(mapModel, ecModel, api, this, payload);
          this._mapDraw = mapDraw;
        } else {
          this._mapDraw && this._mapDraw.remove();
          this._mapDraw = null;
        }
      } else {
        var mapDraw = this._mapDraw;
        mapDraw && group.add(mapDraw.group);
      }
      mapModel.get("showLegendSymbol") && ecModel.getComponent("legend") && this._renderSymbols(mapModel, ecModel, api);
    };
    MapView2.prototype.remove = function() {
      this._mapDraw && this._mapDraw.remove();
      this._mapDraw = null;
      this.group.removeAll();
    };
    MapView2.prototype.dispose = function() {
      this._mapDraw && this._mapDraw.remove();
      this._mapDraw = null;
    };
    MapView2.prototype._renderSymbols = function(mapModel, ecModel, api) {
      var originalData = mapModel.originalData;
      var group = this.group;
      originalData.each(originalData.mapDimension("value"), function(value, originalDataIndex) {
        if (isNaN(value)) {
          return;
        }
        var layout2 = originalData.getItemLayout(originalDataIndex);
        if (!layout2 || !layout2.point) {
          return;
        }
        var point = layout2.point;
        var offset = layout2.offset;
        var circle = new Circle_default({
          style: {
            // Because the special of map draw.
            // Which needs statistic of multiple series and draw on one map.
            // And each series also need a symbol with legend color
            //
            // Layout and visual are put one the different data
            // TODO
            fill: mapModel.getData().getVisual("style").fill
          },
          shape: {
            cx: point[0] + offset * 9,
            cy: point[1],
            r: 3
          },
          silent: true,
          // Do not overlap the first series, on which labels are displayed.
          z2: 8 + (!offset ? Z2_EMPHASIS_LIFT + 1 : 0)
        });
        if (!offset) {
          var fullData = mapModel.mainSeries.getData();
          var name_1 = originalData.getName(originalDataIndex);
          var fullIndex_1 = fullData.indexOfName(name_1);
          var itemModel = originalData.getItemModel(originalDataIndex);
          var labelModel = itemModel.getModel("label");
          var regionGroup = fullData.getItemGraphicEl(fullIndex_1);
          setLabelStyle(circle, getLabelStatesModels(itemModel), {
            labelFetcher: {
              getFormattedLabel: function(idx, state) {
                return mapModel.getFormattedLabel(fullIndex_1, state);
              }
            },
            defaultText: name_1
          });
          circle.disableLabelAnimation = true;
          if (!labelModel.get("position")) {
            circle.setTextConfig({
              position: "bottom"
            });
          }
          regionGroup.onHoverStateChange = function(toState) {
            setStatesFlag(circle, toState);
          };
        }
        group.add(circle);
      });
    };
    MapView2.type = "map";
    return MapView2;
  }(Chart_default)
);
var MapView_default = MapView;

// node_modules/echarts/lib/chart/map/MapSeries.js
var MapSeries = (
  /** @class */
  function(_super) {
    __extends(MapSeries2, _super);
    function MapSeries2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = MapSeries2.type;
      _this.needsDrawMap = false;
      _this.seriesGroup = [];
      _this.getTooltipPosition = function(dataIndex) {
        if (dataIndex != null) {
          var name_1 = this.getData().getName(dataIndex);
          var geo = this.coordinateSystem;
          var region = geo.getRegion(name_1);
          return region && geo.dataToPoint(region.getCenter());
        }
      };
      return _this;
    }
    MapSeries2.prototype.getInitialData = function(option) {
      var data = createSeriesDataSimply(this, {
        coordDimensions: ["value"],
        encodeDefaulter: curry(makeSeriesEncodeForNameBased, this)
      });
      var dataNameIndexMap = createHashMap();
      var toAppendItems = [];
      for (var i = 0, len2 = data.count(); i < len2; i++) {
        var name_2 = data.getName(i);
        dataNameIndexMap.set(name_2, i);
      }
      var geoSource = geoSourceManager_default.load(this.getMapType(), this.option.nameMap, this.option.nameProperty);
      each(geoSource.regions, function(region) {
        var name = region.name;
        var dataNameIdx = dataNameIndexMap.get(name);
        var specifiedGeoJSONRegionStyle = region.properties && region.properties.echartsStyle;
        var dataItem;
        if (dataNameIdx == null) {
          dataItem = {
            name
          };
          toAppendItems.push(dataItem);
        } else {
          dataItem = data.getRawDataItem(dataNameIdx);
        }
        specifiedGeoJSONRegionStyle && merge(dataItem, specifiedGeoJSONRegionStyle);
      });
      data.appendData(toAppendItems);
      return data;
    };
    MapSeries2.prototype.getHostGeoModel = function() {
      var geoIndex = this.option.geoIndex;
      return geoIndex != null ? this.ecModel.getComponent("geo", geoIndex) : null;
    };
    MapSeries2.prototype.getMapType = function() {
      return (this.getHostGeoModel() || this).option.map;
    };
    MapSeries2.prototype.getRawValue = function(dataIndex) {
      var data = this.getData();
      return data.get(data.mapDimension("value"), dataIndex);
    };
    MapSeries2.prototype.getRegionModel = function(regionName) {
      var data = this.getData();
      return data.getItemModel(data.indexOfName(regionName));
    };
    MapSeries2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      var data = this.getData();
      var value = this.getRawValue(dataIndex);
      var name = data.getName(dataIndex);
      var seriesGroup = this.seriesGroup;
      var seriesNames = [];
      for (var i = 0; i < seriesGroup.length; i++) {
        var otherIndex = seriesGroup[i].originalData.indexOfName(name);
        var valueDim = data.mapDimension("value");
        if (!isNaN(seriesGroup[i].originalData.get(valueDim, otherIndex))) {
          seriesNames.push(seriesGroup[i].name);
        }
      }
      return createTooltipMarkup("section", {
        header: seriesNames.join(", "),
        noHeader: !seriesNames.length,
        blocks: [createTooltipMarkup("nameValue", {
          name,
          value
        })]
      });
    };
    MapSeries2.prototype.setZoom = function(zoom) {
      this.option.zoom = zoom;
    };
    MapSeries2.prototype.setCenter = function(center2) {
      this.option.center = center2;
    };
    MapSeries2.prototype.getLegendIcon = function(opt) {
      var iconType = opt.icon || "roundRect";
      var icon = createSymbol(iconType, 0, 0, opt.itemWidth, opt.itemHeight, opt.itemStyle.fill);
      icon.setStyle(opt.itemStyle);
      icon.style.stroke = "none";
      if (iconType.indexOf("empty") > -1) {
        icon.style.stroke = icon.style.fill;
        icon.style.fill = "#fff";
        icon.style.lineWidth = 2;
      }
      return icon;
    };
    MapSeries2.type = "series.map";
    MapSeries2.dependencies = ["geo"];
    MapSeries2.layoutMode = "box";
    MapSeries2.defaultOption = {
      // 一级层叠
      // zlevel: 0,
      // 二级层叠
      z: 2,
      coordinateSystem: "geo",
      // map should be explicitly specified since ec3.
      map: "",
      // If `geoIndex` is not specified, a exclusive geo will be
      // created. Otherwise use the specified geo component, and
      // `map` and `mapType` are ignored.
      // geoIndex: 0,
      // 'center' | 'left' | 'right' | 'x%' | {number}
      left: "center",
      // 'center' | 'top' | 'bottom' | 'x%' | {number}
      top: "center",
      // right
      // bottom
      // width:
      // height
      // Aspect is width / height. Inited to be geoJson bbox aspect
      // This parameter is used for scale this aspect
      // Default value:
      // for geoSVG source: 1,
      // for geoJSON source: 0.75.
      aspectScale: null,
      // Layout with center and size
      // If you want to put map in a fixed size box with right aspect ratio
      // This two properties may be more convenient.
      // layoutCenter: [50%, 50%]
      // layoutSize: 100
      showLegendSymbol: true,
      // Define left-top, right-bottom coords to control view
      // For example, [ [180, 90], [-180, -90] ],
      // higher priority than center and zoom
      boundingCoords: null,
      // Default on center of map
      center: null,
      zoom: 1,
      scaleLimit: null,
      selectedMode: true,
      label: {
        show: false,
        color: "#000"
      },
      // scaleLimit: null,
      itemStyle: {
        borderWidth: 0.5,
        borderColor: "#444",
        areaColor: "#eee"
      },
      emphasis: {
        label: {
          show: true,
          color: "rgb(100,0,0)"
        },
        itemStyle: {
          areaColor: "rgba(255,215,0,0.8)"
        }
      },
      select: {
        label: {
          show: true,
          color: "rgb(100,0,0)"
        },
        itemStyle: {
          color: "rgba(255,215,0,0.8)"
        }
      },
      nameProperty: "name"
    };
    return MapSeries2;
  }(Series_default)
);
var MapSeries_default = MapSeries;

// node_modules/echarts/lib/chart/map/mapDataStatistic.js
function dataStatistics(datas, statisticType) {
  var dataNameMap = {};
  each(datas, function(data) {
    data.each(data.mapDimension("value"), function(value, idx) {
      var mapKey = "ec-" + data.getName(idx);
      dataNameMap[mapKey] = dataNameMap[mapKey] || [];
      if (!isNaN(value)) {
        dataNameMap[mapKey].push(value);
      }
    });
  });
  return datas[0].map(datas[0].mapDimension("value"), function(value, idx) {
    var mapKey = "ec-" + datas[0].getName(idx);
    var sum2 = 0;
    var min = Infinity;
    var max = -Infinity;
    var len2 = dataNameMap[mapKey].length;
    for (var i = 0; i < len2; i++) {
      min = Math.min(min, dataNameMap[mapKey][i]);
      max = Math.max(max, dataNameMap[mapKey][i]);
      sum2 += dataNameMap[mapKey][i];
    }
    var result;
    if (statisticType === "min") {
      result = min;
    } else if (statisticType === "max") {
      result = max;
    } else if (statisticType === "average") {
      result = sum2 / len2;
    } else {
      result = sum2;
    }
    return len2 === 0 ? NaN : result;
  });
}
function mapDataStatistic(ecModel) {
  var seriesGroups = {};
  ecModel.eachSeriesByType("map", function(seriesModel) {
    var hostGeoModel = seriesModel.getHostGeoModel();
    var key = hostGeoModel ? "o" + hostGeoModel.id : "i" + seriesModel.getMapType();
    (seriesGroups[key] = seriesGroups[key] || []).push(seriesModel);
  });
  each(seriesGroups, function(seriesList, key) {
    var data = dataStatistics(map(seriesList, function(seriesModel) {
      return seriesModel.getData();
    }), seriesList[0].get("mapValueCalculation"));
    for (var i = 0; i < seriesList.length; i++) {
      seriesList[i].originalData = seriesList[i].getData();
    }
    for (var i = 0; i < seriesList.length; i++) {
      seriesList[i].seriesGroup = seriesList;
      seriesList[i].needsDrawMap = i === 0 && !seriesList[i].getHostGeoModel();
      seriesList[i].setData(data.cloneShallow());
      seriesList[i].mainSeries = seriesList[0];
    }
  });
}

// node_modules/echarts/lib/chart/map/mapSymbolLayout.js
function mapSymbolLayout(ecModel) {
  var processedMapType = {};
  ecModel.eachSeriesByType("map", function(mapSeries) {
    var mapType = mapSeries.getMapType();
    if (mapSeries.getHostGeoModel() || processedMapType[mapType]) {
      return;
    }
    var mapSymbolOffsets = {};
    each(mapSeries.seriesGroup, function(subMapSeries) {
      var geo = subMapSeries.coordinateSystem;
      var data2 = subMapSeries.originalData;
      if (subMapSeries.get("showLegendSymbol") && ecModel.getComponent("legend")) {
        data2.each(data2.mapDimension("value"), function(value, idx) {
          var name = data2.getName(idx);
          var region = geo.getRegion(name);
          if (!region || isNaN(value)) {
            return;
          }
          var offset = mapSymbolOffsets[name] || 0;
          var point = geo.dataToPoint(region.getCenter());
          mapSymbolOffsets[name] = offset + 1;
          data2.setItemLayout(idx, {
            point,
            offset
          });
        });
      }
    });
    var data = mapSeries.getData();
    data.each(function(idx) {
      var name = data.getName(idx);
      var layout2 = data.getItemLayout(idx) || {};
      layout2.showLabel = !mapSymbolOffsets[name];
      data.setItemLayout(idx, layout2);
    });
    processedMapType[mapType] = true;
  });
}

// node_modules/echarts/lib/chart/map/install.js
function install10(registers) {
  use(install3);
  registers.registerChartView(MapView_default);
  registers.registerSeriesModel(MapSeries_default);
  registers.registerLayout(mapSymbolLayout);
  registers.registerProcessor(registers.PRIORITY.PROCESSOR.STATISTIC, mapDataStatistic);
  createLegacyDataSelectAction("map", registers.registerAction);
}

// node_modules/echarts/lib/chart/tree/layoutHelper.js
function init(inRoot) {
  var root = inRoot;
  root.hierNode = {
    defaultAncestor: null,
    ancestor: root,
    prelim: 0,
    modifier: 0,
    change: 0,
    shift: 0,
    i: 0,
    thread: null
  };
  var nodes = [root];
  var node;
  var children;
  while (node = nodes.pop()) {
    children = node.children;
    if (node.isExpand && children.length) {
      var n = children.length;
      for (var i = n - 1; i >= 0; i--) {
        var child = children[i];
        child.hierNode = {
          defaultAncestor: null,
          ancestor: child,
          prelim: 0,
          modifier: 0,
          change: 0,
          shift: 0,
          i,
          thread: null
        };
        nodes.push(child);
      }
    }
  }
}
function firstWalk(node, separation2) {
  var children = node.isExpand ? node.children : [];
  var siblings = node.parentNode.children;
  var subtreeW = node.hierNode.i ? siblings[node.hierNode.i - 1] : null;
  if (children.length) {
    executeShifts(node);
    var midPoint = (children[0].hierNode.prelim + children[children.length - 1].hierNode.prelim) / 2;
    if (subtreeW) {
      node.hierNode.prelim = subtreeW.hierNode.prelim + separation2(node, subtreeW);
      node.hierNode.modifier = node.hierNode.prelim - midPoint;
    } else {
      node.hierNode.prelim = midPoint;
    }
  } else if (subtreeW) {
    node.hierNode.prelim = subtreeW.hierNode.prelim + separation2(node, subtreeW);
  }
  node.parentNode.hierNode.defaultAncestor = apportion(node, subtreeW, node.parentNode.hierNode.defaultAncestor || siblings[0], separation2);
}
function secondWalk(node) {
  var nodeX = node.hierNode.prelim + node.parentNode.hierNode.modifier;
  node.setLayout({
    x: nodeX
  }, true);
  node.hierNode.modifier += node.parentNode.hierNode.modifier;
}
function separation(cb) {
  return arguments.length ? cb : defaultSeparation;
}
function radialCoordinate(rad, r) {
  rad -= Math.PI / 2;
  return {
    x: r * Math.cos(rad),
    y: r * Math.sin(rad)
  };
}
function getViewRect2(seriesModel, api) {
  return getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}
function executeShifts(node) {
  var children = node.children;
  var n = children.length;
  var shift = 0;
  var change = 0;
  while (--n >= 0) {
    var child = children[n];
    child.hierNode.prelim += shift;
    child.hierNode.modifier += shift;
    change += child.hierNode.change;
    shift += child.hierNode.shift + change;
  }
}
function apportion(subtreeV, subtreeW, ancestor, separation2) {
  if (subtreeW) {
    var nodeOutRight = subtreeV;
    var nodeInRight = subtreeV;
    var nodeOutLeft = nodeInRight.parentNode.children[0];
    var nodeInLeft = subtreeW;
    var sumOutRight = nodeOutRight.hierNode.modifier;
    var sumInRight = nodeInRight.hierNode.modifier;
    var sumOutLeft = nodeOutLeft.hierNode.modifier;
    var sumInLeft = nodeInLeft.hierNode.modifier;
    while (nodeInLeft = nextRight(nodeInLeft), nodeInRight = nextLeft(nodeInRight), nodeInLeft && nodeInRight) {
      nodeOutRight = nextRight(nodeOutRight);
      nodeOutLeft = nextLeft(nodeOutLeft);
      nodeOutRight.hierNode.ancestor = subtreeV;
      var shift = nodeInLeft.hierNode.prelim + sumInLeft - nodeInRight.hierNode.prelim - sumInRight + separation2(nodeInLeft, nodeInRight);
      if (shift > 0) {
        moveSubtree(nextAncestor(nodeInLeft, subtreeV, ancestor), subtreeV, shift);
        sumInRight += shift;
        sumOutRight += shift;
      }
      sumInLeft += nodeInLeft.hierNode.modifier;
      sumInRight += nodeInRight.hierNode.modifier;
      sumOutRight += nodeOutRight.hierNode.modifier;
      sumOutLeft += nodeOutLeft.hierNode.modifier;
    }
    if (nodeInLeft && !nextRight(nodeOutRight)) {
      nodeOutRight.hierNode.thread = nodeInLeft;
      nodeOutRight.hierNode.modifier += sumInLeft - sumOutRight;
    }
    if (nodeInRight && !nextLeft(nodeOutLeft)) {
      nodeOutLeft.hierNode.thread = nodeInRight;
      nodeOutLeft.hierNode.modifier += sumInRight - sumOutLeft;
      ancestor = subtreeV;
    }
  }
  return ancestor;
}
function nextRight(node) {
  var children = node.children;
  return children.length && node.isExpand ? children[children.length - 1] : node.hierNode.thread;
}
function nextLeft(node) {
  var children = node.children;
  return children.length && node.isExpand ? children[0] : node.hierNode.thread;
}
function nextAncestor(nodeInLeft, node, ancestor) {
  return nodeInLeft.hierNode.ancestor.parentNode === node.parentNode ? nodeInLeft.hierNode.ancestor : ancestor;
}
function moveSubtree(wl, wr, shift) {
  var change = shift / (wr.hierNode.i - wl.hierNode.i);
  wr.hierNode.change -= change;
  wr.hierNode.shift += shift;
  wr.hierNode.modifier += shift;
  wr.hierNode.prelim += shift;
  wl.hierNode.change += change;
}
function defaultSeparation(node1, node2) {
  return node1.parentNode === node2.parentNode ? 1 : 2;
}

// node_modules/echarts/lib/chart/tree/TreeView.js
var TreeEdgeShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function TreeEdgeShape2() {
      this.parentPoint = [];
      this.childPoints = [];
    }
    return TreeEdgeShape2;
  }()
);
var TreePath = (
  /** @class */
  function(_super) {
    __extends(TreePath2, _super);
    function TreePath2(opts) {
      return _super.call(this, opts) || this;
    }
    TreePath2.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    };
    TreePath2.prototype.getDefaultShape = function() {
      return new TreeEdgeShape();
    };
    TreePath2.prototype.buildPath = function(ctx, shape) {
      var childPoints = shape.childPoints;
      var childLen = childPoints.length;
      var parentPoint = shape.parentPoint;
      var firstChildPos = childPoints[0];
      var lastChildPos = childPoints[childLen - 1];
      if (childLen === 1) {
        ctx.moveTo(parentPoint[0], parentPoint[1]);
        ctx.lineTo(firstChildPos[0], firstChildPos[1]);
        return;
      }
      var orient = shape.orient;
      var forkDim = orient === "TB" || orient === "BT" ? 0 : 1;
      var otherDim = 1 - forkDim;
      var forkPosition = parsePercent2(shape.forkPosition, 1);
      var tmpPoint = [];
      tmpPoint[forkDim] = parentPoint[forkDim];
      tmpPoint[otherDim] = parentPoint[otherDim] + (lastChildPos[otherDim] - parentPoint[otherDim]) * forkPosition;
      ctx.moveTo(parentPoint[0], parentPoint[1]);
      ctx.lineTo(tmpPoint[0], tmpPoint[1]);
      ctx.moveTo(firstChildPos[0], firstChildPos[1]);
      tmpPoint[forkDim] = firstChildPos[forkDim];
      ctx.lineTo(tmpPoint[0], tmpPoint[1]);
      tmpPoint[forkDim] = lastChildPos[forkDim];
      ctx.lineTo(tmpPoint[0], tmpPoint[1]);
      ctx.lineTo(lastChildPos[0], lastChildPos[1]);
      for (var i = 1; i < childLen - 1; i++) {
        var point = childPoints[i];
        ctx.moveTo(point[0], point[1]);
        tmpPoint[forkDim] = point[forkDim];
        ctx.lineTo(tmpPoint[0], tmpPoint[1]);
      }
    };
    return TreePath2;
  }(Path_default)
);
var TreeView = (
  /** @class */
  function(_super) {
    __extends(TreeView2, _super);
    function TreeView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = TreeView2.type;
      _this._mainGroup = new Group_default();
      return _this;
    }
    TreeView2.prototype.init = function(ecModel, api) {
      this._controller = new RoamController_default(api.getZr());
      this._controllerHost = {
        target: this.group
      };
      this.group.add(this._mainGroup);
    };
    TreeView2.prototype.render = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var layoutInfo = seriesModel.layoutInfo;
      var group = this._mainGroup;
      var layout2 = seriesModel.get("layout");
      if (layout2 === "radial") {
        group.x = layoutInfo.x + layoutInfo.width / 2;
        group.y = layoutInfo.y + layoutInfo.height / 2;
      } else {
        group.x = layoutInfo.x;
        group.y = layoutInfo.y;
      }
      this._updateViewCoordSys(seriesModel, api);
      this._updateController(seriesModel, ecModel, api);
      var oldData = this._data;
      data.diff(oldData).add(function(newIdx) {
        if (symbolNeedsDraw(data, newIdx)) {
          updateNode(data, newIdx, null, group, seriesModel);
        }
      }).update(function(newIdx, oldIdx) {
        var symbolEl = oldData.getItemGraphicEl(oldIdx);
        if (!symbolNeedsDraw(data, newIdx)) {
          symbolEl && removeNode(oldData, oldIdx, symbolEl, group, seriesModel);
          return;
        }
        updateNode(data, newIdx, symbolEl, group, seriesModel);
      }).remove(function(oldIdx) {
        var symbolEl = oldData.getItemGraphicEl(oldIdx);
        if (symbolEl) {
          removeNode(oldData, oldIdx, symbolEl, group, seriesModel);
        }
      }).execute();
      this._nodeScaleRatio = seriesModel.get("nodeScaleRatio");
      this._updateNodeAndLinkScale(seriesModel);
      if (seriesModel.get("expandAndCollapse") === true) {
        data.eachItemGraphicEl(function(el, dataIndex) {
          el.off("click").on("click", function() {
            api.dispatchAction({
              type: "treeExpandAndCollapse",
              seriesId: seriesModel.id,
              dataIndex
            });
          });
        });
      }
      this._data = data;
    };
    TreeView2.prototype._updateViewCoordSys = function(seriesModel, api) {
      var data = seriesModel.getData();
      var points = [];
      data.each(function(idx) {
        var layout2 = data.getItemLayout(idx);
        if (layout2 && !isNaN(layout2.x) && !isNaN(layout2.y)) {
          points.push([+layout2.x, +layout2.y]);
        }
      });
      var min = [];
      var max = [];
      fromPoints(points, min, max);
      var oldMin = this._min;
      var oldMax = this._max;
      if (max[0] - min[0] === 0) {
        min[0] = oldMin ? oldMin[0] : min[0] - 1;
        max[0] = oldMax ? oldMax[0] : max[0] + 1;
      }
      if (max[1] - min[1] === 0) {
        min[1] = oldMin ? oldMin[1] : min[1] - 1;
        max[1] = oldMax ? oldMax[1] : max[1] + 1;
      }
      var viewCoordSys = seriesModel.coordinateSystem = new View_default();
      viewCoordSys.zoomLimit = seriesModel.get("scaleLimit");
      viewCoordSys.setBoundingRect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
      viewCoordSys.setCenter(seriesModel.get("center"), api);
      viewCoordSys.setZoom(seriesModel.get("zoom"));
      this.group.attr({
        x: viewCoordSys.x,
        y: viewCoordSys.y,
        scaleX: viewCoordSys.scaleX,
        scaleY: viewCoordSys.scaleY
      });
      this._min = min;
      this._max = max;
    };
    TreeView2.prototype._updateController = function(seriesModel, ecModel, api) {
      var _this = this;
      var controller = this._controller;
      var controllerHost = this._controllerHost;
      var group = this.group;
      controller.setPointerChecker(function(e, x, y) {
        var rect = group.getBoundingRect();
        rect.applyTransform(group.transform);
        return rect.contain(x, y) && !onIrrelevantElement(e, api, seriesModel);
      });
      controller.enable(seriesModel.get("roam"));
      controllerHost.zoomLimit = seriesModel.get("scaleLimit");
      controllerHost.zoom = seriesModel.coordinateSystem.getZoom();
      controller.off("pan").off("zoom").on("pan", function(e) {
        updateViewOnPan(controllerHost, e.dx, e.dy);
        api.dispatchAction({
          seriesId: seriesModel.id,
          type: "treeRoam",
          dx: e.dx,
          dy: e.dy
        });
      }).on("zoom", function(e) {
        updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
        api.dispatchAction({
          seriesId: seriesModel.id,
          type: "treeRoam",
          zoom: e.scale,
          originX: e.originX,
          originY: e.originY
        });
        _this._updateNodeAndLinkScale(seriesModel);
        api.updateLabelLayout();
      });
    };
    TreeView2.prototype._updateNodeAndLinkScale = function(seriesModel) {
      var data = seriesModel.getData();
      var nodeScale = this._getNodeGlobalScale(seriesModel);
      data.eachItemGraphicEl(function(el, idx) {
        el.setSymbolScale(nodeScale);
      });
    };
    TreeView2.prototype._getNodeGlobalScale = function(seriesModel) {
      var coordSys = seriesModel.coordinateSystem;
      if (coordSys.type !== "view") {
        return 1;
      }
      var nodeScaleRatio = this._nodeScaleRatio;
      var groupZoom = coordSys.scaleX || 1;
      var roamZoom = coordSys.getZoom();
      var nodeScale = (roamZoom - 1) * nodeScaleRatio + 1;
      return nodeScale / groupZoom;
    };
    TreeView2.prototype.dispose = function() {
      this._controller && this._controller.dispose();
      this._controllerHost = null;
    };
    TreeView2.prototype.remove = function() {
      this._mainGroup.removeAll();
      this._data = null;
    };
    TreeView2.type = "tree";
    return TreeView2;
  }(Chart_default)
);
function symbolNeedsDraw(data, dataIndex) {
  var layout2 = data.getItemLayout(dataIndex);
  return layout2 && !isNaN(layout2.x) && !isNaN(layout2.y);
}
function updateNode(data, dataIndex, symbolEl, group, seriesModel) {
  var isInit = !symbolEl;
  var node = data.tree.getNodeByDataIndex(dataIndex);
  var itemModel = node.getModel();
  var visualColor = node.getVisual("style").fill;
  var symbolInnerColor = node.isExpand === false && node.children.length !== 0 ? visualColor : "#fff";
  var virtualRoot = data.tree.root;
  var source = node.parentNode === virtualRoot ? node : node.parentNode || node;
  var sourceSymbolEl = data.getItemGraphicEl(source.dataIndex);
  var sourceLayout = source.getLayout();
  var sourceOldLayout = sourceSymbolEl ? {
    x: sourceSymbolEl.__oldX,
    y: sourceSymbolEl.__oldY,
    rawX: sourceSymbolEl.__radialOldRawX,
    rawY: sourceSymbolEl.__radialOldRawY
  } : sourceLayout;
  var targetLayout = node.getLayout();
  if (isInit) {
    symbolEl = new Symbol_default(data, dataIndex, null, {
      symbolInnerColor,
      useNameLabel: true
    });
    symbolEl.x = sourceOldLayout.x;
    symbolEl.y = sourceOldLayout.y;
  } else {
    symbolEl.updateData(data, dataIndex, null, {
      symbolInnerColor,
      useNameLabel: true
    });
  }
  symbolEl.__radialOldRawX = symbolEl.__radialRawX;
  symbolEl.__radialOldRawY = symbolEl.__radialRawY;
  symbolEl.__radialRawX = targetLayout.rawX;
  symbolEl.__radialRawY = targetLayout.rawY;
  group.add(symbolEl);
  data.setItemGraphicEl(dataIndex, symbolEl);
  symbolEl.__oldX = symbolEl.x;
  symbolEl.__oldY = symbolEl.y;
  updateProps(symbolEl, {
    x: targetLayout.x,
    y: targetLayout.y
  }, seriesModel);
  var symbolPath = symbolEl.getSymbolPath();
  if (seriesModel.get("layout") === "radial") {
    var realRoot = virtualRoot.children[0];
    var rootLayout = realRoot.getLayout();
    var length_1 = realRoot.children.length;
    var rad = void 0;
    var isLeft = void 0;
    if (targetLayout.x === rootLayout.x && node.isExpand === true && realRoot.children.length) {
      var center2 = {
        x: (realRoot.children[0].getLayout().x + realRoot.children[length_1 - 1].getLayout().x) / 2,
        y: (realRoot.children[0].getLayout().y + realRoot.children[length_1 - 1].getLayout().y) / 2
      };
      rad = Math.atan2(center2.y - rootLayout.y, center2.x - rootLayout.x);
      if (rad < 0) {
        rad = Math.PI * 2 + rad;
      }
      isLeft = center2.x < rootLayout.x;
      if (isLeft) {
        rad = rad - Math.PI;
      }
    } else {
      rad = Math.atan2(targetLayout.y - rootLayout.y, targetLayout.x - rootLayout.x);
      if (rad < 0) {
        rad = Math.PI * 2 + rad;
      }
      if (node.children.length === 0 || node.children.length !== 0 && node.isExpand === false) {
        isLeft = targetLayout.x < rootLayout.x;
        if (isLeft) {
          rad = rad - Math.PI;
        }
      } else {
        isLeft = targetLayout.x > rootLayout.x;
        if (!isLeft) {
          rad = rad - Math.PI;
        }
      }
    }
    var textPosition = isLeft ? "left" : "right";
    var normalLabelModel = itemModel.getModel("label");
    var rotate = normalLabelModel.get("rotate");
    var labelRotateRadian = rotate * (Math.PI / 180);
    var textContent = symbolPath.getTextContent();
    if (textContent) {
      symbolPath.setTextConfig({
        position: normalLabelModel.get("position") || textPosition,
        rotation: rotate == null ? -rad : labelRotateRadian,
        origin: "center"
      });
      textContent.setStyle("verticalAlign", "middle");
    }
  }
  var focus = itemModel.get(["emphasis", "focus"]);
  var focusDataIndices = focus === "relative" ? concatArray(node.getAncestorsIndices(), node.getDescendantIndices()) : focus === "ancestor" ? node.getAncestorsIndices() : focus === "descendant" ? node.getDescendantIndices() : null;
  if (focusDataIndices) {
    getECData(symbolEl).focus = focusDataIndices;
  }
  drawEdge(seriesModel, node, virtualRoot, symbolEl, sourceOldLayout, sourceLayout, targetLayout, group);
  if (symbolEl.__edge) {
    symbolEl.onHoverStateChange = function(toState) {
      if (toState !== "blur") {
        var parentEl = node.parentNode && data.getItemGraphicEl(node.parentNode.dataIndex);
        if (!(parentEl && parentEl.hoverState === HOVER_STATE_BLUR)) {
          setStatesFlag(symbolEl.__edge, toState);
        }
      }
    };
  }
}
function drawEdge(seriesModel, node, virtualRoot, symbolEl, sourceOldLayout, sourceLayout, targetLayout, group) {
  var itemModel = node.getModel();
  var edgeShape = seriesModel.get("edgeShape");
  var layout2 = seriesModel.get("layout");
  var orient = seriesModel.getOrient();
  var curvature = seriesModel.get(["lineStyle", "curveness"]);
  var edgeForkPosition = seriesModel.get("edgeForkPosition");
  var lineStyle = itemModel.getModel("lineStyle").getLineStyle();
  var edge = symbolEl.__edge;
  if (edgeShape === "curve") {
    if (node.parentNode && node.parentNode !== virtualRoot) {
      if (!edge) {
        edge = symbolEl.__edge = new BezierCurve_default({
          shape: getEdgeShape(layout2, orient, curvature, sourceOldLayout, sourceOldLayout)
        });
      }
      updateProps(edge, {
        shape: getEdgeShape(layout2, orient, curvature, sourceLayout, targetLayout)
      }, seriesModel);
    }
  } else if (edgeShape === "polyline") {
    if (layout2 === "orthogonal") {
      if (node !== virtualRoot && node.children && node.children.length !== 0 && node.isExpand === true) {
        var children = node.children;
        var childPoints = [];
        for (var i = 0; i < children.length; i++) {
          var childLayout = children[i].getLayout();
          childPoints.push([childLayout.x, childLayout.y]);
        }
        if (!edge) {
          edge = symbolEl.__edge = new TreePath({
            shape: {
              parentPoint: [targetLayout.x, targetLayout.y],
              childPoints: [[targetLayout.x, targetLayout.y]],
              orient,
              forkPosition: edgeForkPosition
            }
          });
        }
        updateProps(edge, {
          shape: {
            parentPoint: [targetLayout.x, targetLayout.y],
            childPoints
          }
        }, seriesModel);
      }
    } else {
      if (true) {
        throw new Error("The polyline edgeShape can only be used in orthogonal layout");
      }
    }
  }
  if (edge && !(edgeShape === "polyline" && !node.isExpand)) {
    edge.useStyle(defaults({
      strokeNoScale: true,
      fill: null
    }, lineStyle));
    setStatesStylesFromModel(edge, itemModel, "lineStyle");
    setDefaultStateProxy(edge);
    group.add(edge);
  }
}
function removeNodeEdge(node, data, group, seriesModel, removeAnimationOpt) {
  var virtualRoot = data.tree.root;
  var _a = getSourceNode(virtualRoot, node), source = _a.source, sourceLayout = _a.sourceLayout;
  var symbolEl = data.getItemGraphicEl(node.dataIndex);
  if (!symbolEl) {
    return;
  }
  var sourceSymbolEl = data.getItemGraphicEl(source.dataIndex);
  var sourceEdge = sourceSymbolEl.__edge;
  var edge = symbolEl.__edge || (source.isExpand === false || source.children.length === 1 ? sourceEdge : void 0);
  var edgeShape = seriesModel.get("edgeShape");
  var layoutOpt = seriesModel.get("layout");
  var orient = seriesModel.get("orient");
  var curvature = seriesModel.get(["lineStyle", "curveness"]);
  if (edge) {
    if (edgeShape === "curve") {
      removeElement(edge, {
        shape: getEdgeShape(layoutOpt, orient, curvature, sourceLayout, sourceLayout),
        style: {
          opacity: 0
        }
      }, seriesModel, {
        cb: function() {
          group.remove(edge);
        },
        removeOpt: removeAnimationOpt
      });
    } else if (edgeShape === "polyline" && seriesModel.get("layout") === "orthogonal") {
      removeElement(edge, {
        shape: {
          parentPoint: [sourceLayout.x, sourceLayout.y],
          childPoints: [[sourceLayout.x, sourceLayout.y]]
        },
        style: {
          opacity: 0
        }
      }, seriesModel, {
        cb: function() {
          group.remove(edge);
        },
        removeOpt: removeAnimationOpt
      });
    }
  }
}
function getSourceNode(virtualRoot, node) {
  var source = node.parentNode === virtualRoot ? node : node.parentNode || node;
  var sourceLayout;
  while (sourceLayout = source.getLayout(), sourceLayout == null) {
    source = source.parentNode === virtualRoot ? source : source.parentNode || source;
  }
  return {
    source,
    sourceLayout
  };
}
function removeNode(data, dataIndex, symbolEl, group, seriesModel) {
  var node = data.tree.getNodeByDataIndex(dataIndex);
  var virtualRoot = data.tree.root;
  var sourceLayout = getSourceNode(virtualRoot, node).sourceLayout;
  var removeAnimationOpt = {
    duration: seriesModel.get("animationDurationUpdate"),
    easing: seriesModel.get("animationEasingUpdate")
  };
  removeElement(symbolEl, {
    x: sourceLayout.x + 1,
    y: sourceLayout.y + 1
  }, seriesModel, {
    cb: function() {
      group.remove(symbolEl);
      data.setItemGraphicEl(dataIndex, null);
    },
    removeOpt: removeAnimationOpt
  });
  symbolEl.fadeOut(null, data.hostModel, {
    fadeLabel: true,
    animation: removeAnimationOpt
  });
  node.children.forEach(function(childNode) {
    removeNodeEdge(childNode, data, group, seriesModel, removeAnimationOpt);
  });
  removeNodeEdge(node, data, group, seriesModel, removeAnimationOpt);
}
function getEdgeShape(layoutOpt, orient, curvature, sourceLayout, targetLayout) {
  var cpx1;
  var cpy1;
  var cpx2;
  var cpy2;
  var x1;
  var x2;
  var y1;
  var y2;
  if (layoutOpt === "radial") {
    x1 = sourceLayout.rawX;
    y1 = sourceLayout.rawY;
    x2 = targetLayout.rawX;
    y2 = targetLayout.rawY;
    var radialCoor1 = radialCoordinate(x1, y1);
    var radialCoor2 = radialCoordinate(x1, y1 + (y2 - y1) * curvature);
    var radialCoor3 = radialCoordinate(x2, y2 + (y1 - y2) * curvature);
    var radialCoor4 = radialCoordinate(x2, y2);
    return {
      x1: radialCoor1.x || 0,
      y1: radialCoor1.y || 0,
      x2: radialCoor4.x || 0,
      y2: radialCoor4.y || 0,
      cpx1: radialCoor2.x || 0,
      cpy1: radialCoor2.y || 0,
      cpx2: radialCoor3.x || 0,
      cpy2: radialCoor3.y || 0
    };
  } else {
    x1 = sourceLayout.x;
    y1 = sourceLayout.y;
    x2 = targetLayout.x;
    y2 = targetLayout.y;
    if (orient === "LR" || orient === "RL") {
      cpx1 = x1 + (x2 - x1) * curvature;
      cpy1 = y1;
      cpx2 = x2 + (x1 - x2) * curvature;
      cpy2 = y2;
    }
    if (orient === "TB" || orient === "BT") {
      cpx1 = x1;
      cpy1 = y1 + (y2 - y1) * curvature;
      cpx2 = x2;
      cpy2 = y2 + (y1 - y2) * curvature;
    }
  }
  return {
    x1,
    y1,
    x2,
    y2,
    cpx1,
    cpy1,
    cpx2,
    cpy2
  };
}
var TreeView_default = TreeView;

// node_modules/echarts/lib/data/helper/linkSeriesData.js
var inner = makeInner();
function linkSeriesData(opt) {
  var mainData = opt.mainData;
  var datas = opt.datas;
  if (!datas) {
    datas = {
      main: mainData
    };
    opt.datasAttr = {
      main: "data"
    };
  }
  opt.datas = opt.mainData = null;
  linkAll(mainData, datas, opt);
  each(datas, function(data) {
    each(mainData.TRANSFERABLE_METHODS, function(methodName) {
      data.wrapMethod(methodName, curry(transferInjection, opt));
    });
  });
  mainData.wrapMethod("cloneShallow", curry(cloneShallowInjection, opt));
  each(mainData.CHANGABLE_METHODS, function(methodName) {
    mainData.wrapMethod(methodName, curry(changeInjection, opt));
  });
  assert(datas[mainData.dataType] === mainData);
}
function transferInjection(opt, res) {
  if (isMainData(this)) {
    var datas = extend({}, inner(this).datas);
    datas[this.dataType] = res;
    linkAll(res, datas, opt);
  } else {
    linkSingle(res, this.dataType, inner(this).mainData, opt);
  }
  return res;
}
function changeInjection(opt, res) {
  opt.struct && opt.struct.update();
  return res;
}
function cloneShallowInjection(opt, res) {
  each(inner(res).datas, function(data, dataType) {
    data !== res && linkSingle(data.cloneShallow(), dataType, res, opt);
  });
  return res;
}
function getLinkedData(dataType) {
  var mainData = inner(this).mainData;
  return dataType == null || mainData == null ? mainData : inner(mainData).datas[dataType];
}
function getLinkedDataAll() {
  var mainData = inner(this).mainData;
  return mainData == null ? [{
    data: mainData
  }] : map(keys(inner(mainData).datas), function(type) {
    return {
      type,
      data: inner(mainData).datas[type]
    };
  });
}
function isMainData(data) {
  return inner(data).mainData === data;
}
function linkAll(mainData, datas, opt) {
  inner(mainData).datas = {};
  each(datas, function(data, dataType) {
    linkSingle(data, dataType, mainData, opt);
  });
}
function linkSingle(data, dataType, mainData, opt) {
  inner(mainData).datas[dataType] = data;
  inner(data).mainData = mainData;
  data.dataType = dataType;
  if (opt.struct) {
    data[opt.structAttr] = opt.struct;
    opt.struct[opt.datasAttr[dataType]] = data;
  }
  data.getLinkedData = getLinkedData;
  data.getLinkedDataAll = getLinkedDataAll;
}
var linkSeriesData_default = linkSeriesData;

// node_modules/echarts/lib/data/Tree.js
var TreeNode = (
  /** @class */
  function() {
    function TreeNode2(name, hostTree) {
      this.depth = 0;
      this.height = 0;
      this.dataIndex = -1;
      this.children = [];
      this.viewChildren = [];
      this.isExpand = false;
      this.name = name || "";
      this.hostTree = hostTree;
    }
    TreeNode2.prototype.isRemoved = function() {
      return this.dataIndex < 0;
    };
    TreeNode2.prototype.eachNode = function(options, cb, context) {
      if (isFunction(options)) {
        context = cb;
        cb = options;
        options = null;
      }
      options = options || {};
      if (isString(options)) {
        options = {
          order: options
        };
      }
      var order = options.order || "preorder";
      var children = this[options.attr || "children"];
      var suppressVisitSub;
      order === "preorder" && (suppressVisitSub = cb.call(context, this));
      for (var i = 0; !suppressVisitSub && i < children.length; i++) {
        children[i].eachNode(options, cb, context);
      }
      order === "postorder" && cb.call(context, this);
    };
    TreeNode2.prototype.updateDepthAndHeight = function(depth) {
      var height = 0;
      this.depth = depth;
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.updateDepthAndHeight(depth + 1);
        if (child.height > height) {
          height = child.height;
        }
      }
      this.height = height + 1;
    };
    TreeNode2.prototype.getNodeById = function(id) {
      if (this.getId() === id) {
        return this;
      }
      for (var i = 0, children = this.children, len2 = children.length; i < len2; i++) {
        var res = children[i].getNodeById(id);
        if (res) {
          return res;
        }
      }
    };
    TreeNode2.prototype.contains = function(node) {
      if (node === this) {
        return true;
      }
      for (var i = 0, children = this.children, len2 = children.length; i < len2; i++) {
        var res = children[i].contains(node);
        if (res) {
          return res;
        }
      }
    };
    TreeNode2.prototype.getAncestors = function(includeSelf) {
      var ancestors = [];
      var node = includeSelf ? this : this.parentNode;
      while (node) {
        ancestors.push(node);
        node = node.parentNode;
      }
      ancestors.reverse();
      return ancestors;
    };
    TreeNode2.prototype.getAncestorsIndices = function() {
      var indices = [];
      var currNode = this;
      while (currNode) {
        indices.push(currNode.dataIndex);
        currNode = currNode.parentNode;
      }
      indices.reverse();
      return indices;
    };
    TreeNode2.prototype.getDescendantIndices = function() {
      var indices = [];
      this.eachNode(function(childNode) {
        indices.push(childNode.dataIndex);
      });
      return indices;
    };
    TreeNode2.prototype.getValue = function(dimension) {
      var data = this.hostTree.data;
      return data.getStore().get(data.getDimensionIndex(dimension || "value"), this.dataIndex);
    };
    TreeNode2.prototype.setLayout = function(layout2, merge2) {
      this.dataIndex >= 0 && this.hostTree.data.setItemLayout(this.dataIndex, layout2, merge2);
    };
    TreeNode2.prototype.getLayout = function() {
      return this.hostTree.data.getItemLayout(this.dataIndex);
    };
    TreeNode2.prototype.getModel = function(path) {
      if (this.dataIndex < 0) {
        return;
      }
      var hostTree = this.hostTree;
      var itemModel = hostTree.data.getItemModel(this.dataIndex);
      return itemModel.getModel(path);
    };
    TreeNode2.prototype.getLevelModel = function() {
      return (this.hostTree.levelModels || [])[this.depth];
    };
    TreeNode2.prototype.setVisual = function(key, value) {
      this.dataIndex >= 0 && this.hostTree.data.setItemVisual(this.dataIndex, key, value);
    };
    TreeNode2.prototype.getVisual = function(key) {
      return this.hostTree.data.getItemVisual(this.dataIndex, key);
    };
    TreeNode2.prototype.getRawIndex = function() {
      return this.hostTree.data.getRawIndex(this.dataIndex);
    };
    TreeNode2.prototype.getId = function() {
      return this.hostTree.data.getId(this.dataIndex);
    };
    TreeNode2.prototype.getChildIndex = function() {
      if (this.parentNode) {
        var children = this.parentNode.children;
        for (var i = 0; i < children.length; ++i) {
          if (children[i] === this) {
            return i;
          }
        }
        return -1;
      }
      return -1;
    };
    TreeNode2.prototype.isAncestorOf = function(node) {
      var parent = node.parentNode;
      while (parent) {
        if (parent === this) {
          return true;
        }
        parent = parent.parentNode;
      }
      return false;
    };
    TreeNode2.prototype.isDescendantOf = function(node) {
      return node !== this && node.isAncestorOf(this);
    };
    return TreeNode2;
  }()
);
var Tree = (
  /** @class */
  function() {
    function Tree2(hostModel) {
      this.type = "tree";
      this._nodes = [];
      this.hostModel = hostModel;
    }
    Tree2.prototype.eachNode = function(options, cb, context) {
      this.root.eachNode(options, cb, context);
    };
    Tree2.prototype.getNodeByDataIndex = function(dataIndex) {
      var rawIndex = this.data.getRawIndex(dataIndex);
      return this._nodes[rawIndex];
    };
    Tree2.prototype.getNodeById = function(name) {
      return this.root.getNodeById(name);
    };
    Tree2.prototype.update = function() {
      var data = this.data;
      var nodes = this._nodes;
      for (var i = 0, len2 = nodes.length; i < len2; i++) {
        nodes[i].dataIndex = -1;
      }
      for (var i = 0, len2 = data.count(); i < len2; i++) {
        nodes[data.getRawIndex(i)].dataIndex = i;
      }
    };
    Tree2.prototype.clearLayouts = function() {
      this.data.clearItemLayouts();
    };
    Tree2.createTree = function(dataRoot, hostModel, beforeLink) {
      var tree = new Tree2(hostModel);
      var listData = [];
      var dimMax = 1;
      buildHierarchy(dataRoot);
      function buildHierarchy(dataNode, parentNode) {
        var value = dataNode.value;
        dimMax = Math.max(dimMax, isArray(value) ? value.length : 1);
        listData.push(dataNode);
        var node = new TreeNode(convertOptionIdName(dataNode.name, ""), tree);
        parentNode ? addChild(node, parentNode) : tree.root = node;
        tree._nodes.push(node);
        var children = dataNode.children;
        if (children) {
          for (var i = 0; i < children.length; i++) {
            buildHierarchy(children[i], node);
          }
        }
      }
      tree.root.updateDepthAndHeight(0);
      var dimensions = prepareSeriesDataSchema(listData, {
        coordDimensions: ["value"],
        dimensionsCount: dimMax
      }).dimensions;
      var list = new SeriesData_default(dimensions, hostModel);
      list.initData(listData);
      beforeLink && beforeLink(list);
      linkSeriesData_default({
        mainData: list,
        struct: tree,
        structAttr: "tree"
      });
      tree.update();
      return tree;
    };
    return Tree2;
  }()
);
function addChild(child, node) {
  var children = node.children;
  if (child.parentNode === node) {
    return;
  }
  children.push(child);
  child.parentNode = node;
}
var Tree_default = Tree;

// node_modules/echarts/lib/chart/helper/treeHelper.js
function retrieveTargetInfo(payload, validPayloadTypes, seriesModel) {
  if (payload && indexOf(validPayloadTypes, payload.type) >= 0) {
    var root = seriesModel.getData().tree.root;
    var targetNode = payload.targetNode;
    if (isString(targetNode)) {
      targetNode = root.getNodeById(targetNode);
    }
    if (targetNode && root.contains(targetNode)) {
      return {
        node: targetNode
      };
    }
    var targetNodeId = payload.targetNodeId;
    if (targetNodeId != null && (targetNode = root.getNodeById(targetNodeId))) {
      return {
        node: targetNode
      };
    }
  }
}
function getPathToRoot(node) {
  var path = [];
  while (node) {
    node = node.parentNode;
    node && path.push(node);
  }
  return path.reverse();
}
function aboveViewRoot(viewRoot, node) {
  var viewPath = getPathToRoot(viewRoot);
  return indexOf(viewPath, node) >= 0;
}
function wrapTreePathInfo(node, seriesModel) {
  var treePathInfo = [];
  while (node) {
    var nodeDataIndex = node.dataIndex;
    treePathInfo.push({
      name: node.name,
      dataIndex: nodeDataIndex,
      value: seriesModel.getRawValue(nodeDataIndex)
    });
    node = node.parentNode;
  }
  treePathInfo.reverse();
  return treePathInfo;
}

// node_modules/echarts/lib/chart/tree/TreeSeries.js
var TreeSeriesModel = (
  /** @class */
  function(_super) {
    __extends(TreeSeriesModel2, _super);
    function TreeSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.hasSymbolVisual = true;
      _this.ignoreStyleOnData = true;
      return _this;
    }
    TreeSeriesModel2.prototype.getInitialData = function(option) {
      var root = {
        name: option.name,
        children: option.data
      };
      var leaves = option.leaves || {};
      var leavesModel = new Model_default(leaves, this, this.ecModel);
      var tree = Tree_default.createTree(root, this, beforeLink);
      function beforeLink(nodeData) {
        nodeData.wrapMethod("getItemModel", function(model, idx) {
          var node = tree.getNodeByDataIndex(idx);
          if (!(node && node.children.length && node.isExpand)) {
            model.parentModel = leavesModel;
          }
          return model;
        });
      }
      var treeDepth = 0;
      tree.eachNode("preorder", function(node) {
        if (node.depth > treeDepth) {
          treeDepth = node.depth;
        }
      });
      var expandAndCollapse = option.expandAndCollapse;
      var expandTreeDepth = expandAndCollapse && option.initialTreeDepth >= 0 ? option.initialTreeDepth : treeDepth;
      tree.root.eachNode("preorder", function(node) {
        var item = node.hostTree.data.getRawDataItem(node.dataIndex);
        node.isExpand = item && item.collapsed != null ? !item.collapsed : node.depth <= expandTreeDepth;
      });
      return tree.data;
    };
    TreeSeriesModel2.prototype.getOrient = function() {
      var orient = this.get("orient");
      if (orient === "horizontal") {
        orient = "LR";
      } else if (orient === "vertical") {
        orient = "TB";
      }
      return orient;
    };
    TreeSeriesModel2.prototype.setZoom = function(zoom) {
      this.option.zoom = zoom;
    };
    TreeSeriesModel2.prototype.setCenter = function(center2) {
      this.option.center = center2;
    };
    TreeSeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      var tree = this.getData().tree;
      var realRoot = tree.root.children[0];
      var node = tree.getNodeByDataIndex(dataIndex);
      var value = node.getValue();
      var name = node.name;
      while (node && node !== realRoot) {
        name = node.parentNode.name + "." + name;
        node = node.parentNode;
      }
      return createTooltipMarkup("nameValue", {
        name,
        value,
        noValue: isNaN(value) || value == null
      });
    };
    TreeSeriesModel2.prototype.getDataParams = function(dataIndex) {
      var params = _super.prototype.getDataParams.apply(this, arguments);
      var node = this.getData().tree.getNodeByDataIndex(dataIndex);
      params.treeAncestors = wrapTreePathInfo(node, this);
      params.collapsed = !node.isExpand;
      return params;
    };
    TreeSeriesModel2.type = "series.tree";
    TreeSeriesModel2.layoutMode = "box";
    TreeSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "view",
      // the position of the whole view
      left: "12%",
      top: "12%",
      right: "12%",
      bottom: "12%",
      // the layout of the tree, two value can be selected, 'orthogonal' or 'radial'
      layout: "orthogonal",
      // value can be 'polyline'
      edgeShape: "curve",
      edgeForkPosition: "50%",
      // true | false | 'move' | 'scale', see module:component/helper/RoamController.
      roam: false,
      // Symbol size scale ratio in roam
      nodeScaleRatio: 0.4,
      // Default on center of graph
      center: null,
      zoom: 1,
      orient: "LR",
      symbol: "emptyCircle",
      symbolSize: 7,
      expandAndCollapse: true,
      initialTreeDepth: 2,
      lineStyle: {
        color: "#ccc",
        width: 1.5,
        curveness: 0.5
      },
      itemStyle: {
        color: "lightsteelblue",
        // borderColor: '#c23531',
        borderWidth: 1.5
      },
      label: {
        show: true
      },
      animationEasing: "linear",
      animationDuration: 700,
      animationDurationUpdate: 500
    };
    return TreeSeriesModel2;
  }(Series_default)
);
var TreeSeries_default = TreeSeriesModel;

// node_modules/echarts/lib/chart/tree/traversalHelper.js
function eachAfter(root, callback, separation2) {
  var nodes = [root];
  var next = [];
  var node;
  while (node = nodes.pop()) {
    next.push(node);
    if (node.isExpand) {
      var children = node.children;
      if (children.length) {
        for (var i = 0; i < children.length; i++) {
          nodes.push(children[i]);
        }
      }
    }
  }
  while (node = next.pop()) {
    callback(node, separation2);
  }
}
function eachBefore(root, callback) {
  var nodes = [root];
  var node;
  while (node = nodes.pop()) {
    callback(node);
    if (node.isExpand) {
      var children = node.children;
      if (children.length) {
        for (var i = children.length - 1; i >= 0; i--) {
          nodes.push(children[i]);
        }
      }
    }
  }
}

// node_modules/echarts/lib/chart/tree/treeLayout.js
function treeLayout(ecModel, api) {
  ecModel.eachSeriesByType("tree", function(seriesModel) {
    commonLayout(seriesModel, api);
  });
}
function commonLayout(seriesModel, api) {
  var layoutInfo = getViewRect2(seriesModel, api);
  seriesModel.layoutInfo = layoutInfo;
  var layout2 = seriesModel.get("layout");
  var width = 0;
  var height = 0;
  var separation2 = null;
  if (layout2 === "radial") {
    width = 2 * Math.PI;
    height = Math.min(layoutInfo.height, layoutInfo.width) / 2;
    separation2 = separation(function(node1, node2) {
      return (node1.parentNode === node2.parentNode ? 1 : 2) / node1.depth;
    });
  } else {
    width = layoutInfo.width;
    height = layoutInfo.height;
    separation2 = separation();
  }
  var virtualRoot = seriesModel.getData().tree.root;
  var realRoot = virtualRoot.children[0];
  if (realRoot) {
    init(virtualRoot);
    eachAfter(realRoot, firstWalk, separation2);
    virtualRoot.hierNode.modifier = -realRoot.hierNode.prelim;
    eachBefore(realRoot, secondWalk);
    var left_1 = realRoot;
    var right_1 = realRoot;
    var bottom_1 = realRoot;
    eachBefore(realRoot, function(node) {
      var x = node.getLayout().x;
      if (x < left_1.getLayout().x) {
        left_1 = node;
      }
      if (x > right_1.getLayout().x) {
        right_1 = node;
      }
      if (node.depth > bottom_1.depth) {
        bottom_1 = node;
      }
    });
    var delta = left_1 === right_1 ? 1 : separation2(left_1, right_1) / 2;
    var tx_1 = delta - left_1.getLayout().x;
    var kx_1 = 0;
    var ky_1 = 0;
    var coorX_1 = 0;
    var coorY_1 = 0;
    if (layout2 === "radial") {
      kx_1 = width / (right_1.getLayout().x + delta + tx_1);
      ky_1 = height / (bottom_1.depth - 1 || 1);
      eachBefore(realRoot, function(node) {
        coorX_1 = (node.getLayout().x + tx_1) * kx_1;
        coorY_1 = (node.depth - 1) * ky_1;
        var finalCoor = radialCoordinate(coorX_1, coorY_1);
        node.setLayout({
          x: finalCoor.x,
          y: finalCoor.y,
          rawX: coorX_1,
          rawY: coorY_1
        }, true);
      });
    } else {
      var orient_1 = seriesModel.getOrient();
      if (orient_1 === "RL" || orient_1 === "LR") {
        ky_1 = height / (right_1.getLayout().x + delta + tx_1);
        kx_1 = width / (bottom_1.depth - 1 || 1);
        eachBefore(realRoot, function(node) {
          coorY_1 = (node.getLayout().x + tx_1) * ky_1;
          coorX_1 = orient_1 === "LR" ? (node.depth - 1) * kx_1 : width - (node.depth - 1) * kx_1;
          node.setLayout({
            x: coorX_1,
            y: coorY_1
          }, true);
        });
      } else if (orient_1 === "TB" || orient_1 === "BT") {
        kx_1 = width / (right_1.getLayout().x + delta + tx_1);
        ky_1 = height / (bottom_1.depth - 1 || 1);
        eachBefore(realRoot, function(node) {
          coorX_1 = (node.getLayout().x + tx_1) * kx_1;
          coorY_1 = orient_1 === "TB" ? (node.depth - 1) * ky_1 : height - (node.depth - 1) * ky_1;
          node.setLayout({
            x: coorX_1,
            y: coorY_1
          }, true);
        });
      }
    }
  }
}

// node_modules/echarts/lib/chart/tree/treeVisual.js
function treeVisual(ecModel) {
  ecModel.eachSeriesByType("tree", function(seriesModel) {
    var data = seriesModel.getData();
    var tree = data.tree;
    tree.eachNode(function(node) {
      var model = node.getModel();
      var style = model.getModel("itemStyle").getItemStyle();
      var existsStyle = data.ensureUniqueItemVisual(node.dataIndex, "style");
      extend(existsStyle, style);
    });
  });
}

// node_modules/echarts/lib/chart/tree/treeAction.js
function installTreeAction(registers) {
  registers.registerAction({
    type: "treeExpandAndCollapse",
    event: "treeExpandAndCollapse",
    update: "update"
  }, function(payload, ecModel) {
    ecModel.eachComponent({
      mainType: "series",
      subType: "tree",
      query: payload
    }, function(seriesModel) {
      var dataIndex = payload.dataIndex;
      var tree = seriesModel.getData().tree;
      var node = tree.getNodeByDataIndex(dataIndex);
      node.isExpand = !node.isExpand;
    });
  });
  registers.registerAction({
    type: "treeRoam",
    event: "treeRoam",
    // Here we set 'none' instead of 'update', because roam action
    // just need to update the transform matrix without having to recalculate
    // the layout. So don't need to go through the whole update process, such
    // as 'dataPrcocess', 'coordSystemUpdate', 'layout' and so on.
    update: "none"
  }, function(payload, ecModel, api) {
    ecModel.eachComponent({
      mainType: "series",
      subType: "tree",
      query: payload
    }, function(seriesModel) {
      var coordSys = seriesModel.coordinateSystem;
      var res = updateCenterAndZoom(coordSys, payload, void 0, api);
      seriesModel.setCenter && seriesModel.setCenter(res.center);
      seriesModel.setZoom && seriesModel.setZoom(res.zoom);
    });
  });
}

// node_modules/echarts/lib/chart/tree/install.js
function install11(registers) {
  registers.registerChartView(TreeView_default);
  registers.registerSeriesModel(TreeSeries_default);
  registers.registerLayout(treeLayout);
  registers.registerVisual(treeVisual);
  installTreeAction(registers);
}

// node_modules/echarts/lib/chart/treemap/treemapAction.js
var actionTypes = ["treemapZoomToNode", "treemapRender", "treemapMove"];
function installTreemapAction(registers) {
  for (var i = 0; i < actionTypes.length; i++) {
    registers.registerAction({
      type: actionTypes[i],
      update: "updateView"
    }, noop);
  }
  registers.registerAction({
    type: "treemapRootToNode",
    update: "updateView"
  }, function(payload, ecModel) {
    ecModel.eachComponent({
      mainType: "series",
      subType: "treemap",
      query: payload
    }, handleRootToNode);
    function handleRootToNode(model, index) {
      var types = ["treemapZoomToNode", "treemapRootToNode"];
      var targetInfo = retrieveTargetInfo(payload, types, model);
      if (targetInfo) {
        var originViewRoot = model.getViewRoot();
        if (originViewRoot) {
          payload.direction = aboveViewRoot(originViewRoot, targetInfo.node) ? "rollUp" : "drillDown";
        }
        model.resetViewRoot(targetInfo.node);
      }
    }
  });
}

// node_modules/echarts/lib/chart/helper/enableAriaDecalForTree.js
function enableAriaDecalForTree(seriesModel) {
  var data = seriesModel.getData();
  var tree = data.tree;
  var decalPaletteScope = {};
  tree.eachNode(function(node) {
    var current = node;
    while (current && current.depth > 1) {
      current = current.parentNode;
    }
    var decal = getDecalFromPalette(seriesModel.ecModel, current.name || current.dataIndex + "", decalPaletteScope);
    node.setVisual("decal", decal);
  });
}

// node_modules/echarts/lib/chart/treemap/TreemapSeries.js
var TreemapSeriesModel = (
  /** @class */
  function(_super) {
    __extends(TreemapSeriesModel2, _super);
    function TreemapSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = TreemapSeriesModel2.type;
      _this.preventUsingHoverLayer = true;
      return _this;
    }
    TreemapSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      var root = {
        name: option.name,
        children: option.data
      };
      completeTreeValue(root);
      var levels = option.levels || [];
      var designatedVisualItemStyle = this.designatedVisualItemStyle = {};
      var designatedVisualModel = new Model_default({
        itemStyle: designatedVisualItemStyle
      }, this, ecModel);
      levels = option.levels = setDefault(levels, ecModel);
      var levelModels = map(levels || [], function(levelDefine) {
        return new Model_default(levelDefine, designatedVisualModel, ecModel);
      }, this);
      var tree = Tree_default.createTree(root, this, beforeLink);
      function beforeLink(nodeData) {
        nodeData.wrapMethod("getItemModel", function(model, idx) {
          var node = tree.getNodeByDataIndex(idx);
          var levelModel = node ? levelModels[node.depth] : null;
          model.parentModel = levelModel || designatedVisualModel;
          return model;
        });
      }
      return tree.data;
    };
    TreemapSeriesModel2.prototype.optionUpdated = function() {
      this.resetViewRoot();
    };
    TreemapSeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      var data = this.getData();
      var value = this.getRawValue(dataIndex);
      var name = data.getName(dataIndex);
      return createTooltipMarkup("nameValue", {
        name,
        value
      });
    };
    TreemapSeriesModel2.prototype.getDataParams = function(dataIndex) {
      var params = _super.prototype.getDataParams.apply(this, arguments);
      var node = this.getData().tree.getNodeByDataIndex(dataIndex);
      params.treeAncestors = wrapTreePathInfo(node, this);
      params.treePathInfo = params.treeAncestors;
      return params;
    };
    TreemapSeriesModel2.prototype.setLayoutInfo = function(layoutInfo) {
      this.layoutInfo = this.layoutInfo || {};
      extend(this.layoutInfo, layoutInfo);
    };
    TreemapSeriesModel2.prototype.mapIdToIndex = function(id) {
      var idIndexMap = this._idIndexMap;
      if (!idIndexMap) {
        idIndexMap = this._idIndexMap = createHashMap();
        this._idIndexMapCount = 0;
      }
      var index = idIndexMap.get(id);
      if (index == null) {
        idIndexMap.set(id, index = this._idIndexMapCount++);
      }
      return index;
    };
    TreemapSeriesModel2.prototype.getViewRoot = function() {
      return this._viewRoot;
    };
    TreemapSeriesModel2.prototype.resetViewRoot = function(viewRoot) {
      viewRoot ? this._viewRoot = viewRoot : viewRoot = this._viewRoot;
      var root = this.getRawData().tree.root;
      if (!viewRoot || viewRoot !== root && !root.contains(viewRoot)) {
        this._viewRoot = root;
      }
    };
    TreemapSeriesModel2.prototype.enableAriaDecal = function() {
      enableAriaDecalForTree(this);
    };
    TreemapSeriesModel2.type = "series.treemap";
    TreemapSeriesModel2.layoutMode = "box";
    TreemapSeriesModel2.defaultOption = {
      // Disable progressive rendering
      progressive: 0,
      // size: ['80%', '80%'],            // deprecated, compatible with ec2.
      left: "center",
      top: "middle",
      width: "80%",
      height: "80%",
      sort: true,
      clipWindow: "origin",
      squareRatio: 0.5 * (1 + Math.sqrt(5)),
      leafDepth: null,
      drillDownIcon: "▶",
      // to align specialized icon. ▷▶❒❐▼✚
      zoomToNodeRatio: 0.32 * 0.32,
      scaleLimit: null,
      roam: true,
      nodeClick: "zoomToNode",
      animation: true,
      animationDurationUpdate: 900,
      animationEasing: "quinticInOut",
      breadcrumb: {
        show: true,
        height: 22,
        left: "center",
        top: "bottom",
        // right
        // bottom
        emptyItemWidth: 25,
        itemStyle: {
          color: "rgba(0,0,0,0.7)",
          textStyle: {
            color: "#fff"
          }
        },
        emphasis: {
          itemStyle: {
            color: "rgba(0,0,0,0.9)"
            // '#5793f3',
          }
        }
      },
      label: {
        show: true,
        // Do not use textDistance, for ellipsis rect just the same as treemap node rect.
        distance: 0,
        padding: 5,
        position: "inside",
        // formatter: null,
        color: "#fff",
        overflow: "truncate"
        // align
        // verticalAlign
      },
      upperLabel: {
        show: false,
        position: [0, "50%"],
        height: 20,
        // formatter: null,
        // color: '#fff',
        overflow: "truncate",
        // align: null,
        verticalAlign: "middle"
      },
      itemStyle: {
        color: null,
        colorAlpha: null,
        colorSaturation: null,
        borderWidth: 0,
        gapWidth: 0,
        borderColor: "#fff",
        borderColorSaturation: null
        // If specified, borderColor will be ineffective, and the
        // border color is evaluated by color of current node and
        // borderColorSaturation.
      },
      emphasis: {
        upperLabel: {
          show: true,
          position: [0, "50%"],
          overflow: "truncate",
          verticalAlign: "middle"
        }
      },
      visualDimension: 0,
      visualMin: null,
      visualMax: null,
      color: [],
      // level[n].color (if necessary).
      // + Specify color list of each level. level[0].color would be global
      // color list if not specified. (see method `setDefault`).
      // + But set as a empty array to forbid fetch color from global palette
      // when using nodeModel.get('color'), otherwise nodes on deep level
      // will always has color palette set and are not able to inherit color
      // from parent node.
      // + TreemapSeries.color can not be set as 'none', otherwise effect
      // legend color fetching (see seriesColor.js).
      colorAlpha: null,
      colorSaturation: null,
      colorMappingBy: "index",
      visibleMin: 10,
      // be rendered. Only works when sort is 'asc' or 'desc'.
      childrenVisibleMin: null,
      // grandchildren will not show.
      // Why grandchildren? If not grandchildren but children,
      // some siblings show children and some not,
      // the appearance may be mess and not consistent,
      levels: []
      // Each item: {
      //     visibleMin, itemStyle, visualDimension, label
      // }
    };
    return TreemapSeriesModel2;
  }(Series_default)
);
function completeTreeValue(dataNode) {
  var sum2 = 0;
  each(dataNode.children, function(child) {
    completeTreeValue(child);
    var childValue = child.value;
    isArray(childValue) && (childValue = childValue[0]);
    sum2 += childValue;
  });
  var thisValue = dataNode.value;
  if (isArray(thisValue)) {
    thisValue = thisValue[0];
  }
  if (thisValue == null || isNaN(thisValue)) {
    thisValue = sum2;
  }
  if (thisValue < 0) {
    thisValue = 0;
  }
  isArray(dataNode.value) ? dataNode.value[0] = thisValue : dataNode.value = thisValue;
}
function setDefault(levels, ecModel) {
  var globalColorList = normalizeToArray(ecModel.get("color"));
  var globalDecalList = normalizeToArray(ecModel.get(["aria", "decal", "decals"]));
  if (!globalColorList) {
    return;
  }
  levels = levels || [];
  var hasColorDefine;
  var hasDecalDefine;
  each(levels, function(levelDefine) {
    var model = new Model_default(levelDefine);
    var modelColor = model.get("color");
    var modelDecal = model.get("decal");
    if (model.get(["itemStyle", "color"]) || modelColor && modelColor !== "none") {
      hasColorDefine = true;
    }
    if (model.get(["itemStyle", "decal"]) || modelDecal && modelDecal !== "none") {
      hasDecalDefine = true;
    }
  });
  var level0 = levels[0] || (levels[0] = {});
  if (!hasColorDefine) {
    level0.color = globalColorList.slice();
  }
  if (!hasDecalDefine && globalDecalList) {
    level0.decal = globalDecalList.slice();
  }
  return levels;
}
var TreemapSeries_default = TreemapSeriesModel;

// node_modules/echarts/lib/chart/treemap/Breadcrumb.js
var TEXT_PADDING = 8;
var ITEM_GAP = 8;
var ARRAY_LENGTH = 5;
var Breadcrumb = (
  /** @class */
  function() {
    function Breadcrumb2(containerGroup) {
      this.group = new Group_default();
      containerGroup.add(this.group);
    }
    Breadcrumb2.prototype.render = function(seriesModel, api, targetNode, onSelect) {
      var model = seriesModel.getModel("breadcrumb");
      var thisGroup = this.group;
      thisGroup.removeAll();
      if (!model.get("show") || !targetNode) {
        return;
      }
      var normalStyleModel = model.getModel("itemStyle");
      var emphasisModel = model.getModel("emphasis");
      var textStyleModel = normalStyleModel.getModel("textStyle");
      var emphasisTextStyleModel = emphasisModel.getModel(["itemStyle", "textStyle"]);
      var layoutParam = {
        pos: {
          left: model.get("left"),
          right: model.get("right"),
          top: model.get("top"),
          bottom: model.get("bottom")
        },
        box: {
          width: api.getWidth(),
          height: api.getHeight()
        },
        emptyItemWidth: model.get("emptyItemWidth"),
        totalWidth: 0,
        renderList: []
      };
      this._prepare(targetNode, layoutParam, textStyleModel);
      this._renderContent(seriesModel, layoutParam, normalStyleModel, emphasisModel, textStyleModel, emphasisTextStyleModel, onSelect);
      positionElement(thisGroup, layoutParam.pos, layoutParam.box);
    };
    Breadcrumb2.prototype._prepare = function(targetNode, layoutParam, textStyleModel) {
      for (var node = targetNode; node; node = node.parentNode) {
        var text = convertOptionIdName(node.getModel().get("name"), "");
        var textRect = textStyleModel.getTextRect(text);
        var itemWidth = Math.max(textRect.width + TEXT_PADDING * 2, layoutParam.emptyItemWidth);
        layoutParam.totalWidth += itemWidth + ITEM_GAP;
        layoutParam.renderList.push({
          node,
          text,
          width: itemWidth
        });
      }
    };
    Breadcrumb2.prototype._renderContent = function(seriesModel, layoutParam, normalStyleModel, emphasisModel, textStyleModel, emphasisTextStyleModel, onSelect) {
      var lastX = 0;
      var emptyItemWidth = layoutParam.emptyItemWidth;
      var height = seriesModel.get(["breadcrumb", "height"]);
      var availableSize = getAvailableSize(layoutParam.pos, layoutParam.box);
      var totalWidth = layoutParam.totalWidth;
      var renderList = layoutParam.renderList;
      var emphasisItemStyle = emphasisModel.getModel("itemStyle").getItemStyle();
      for (var i = renderList.length - 1; i >= 0; i--) {
        var item = renderList[i];
        var itemNode = item.node;
        var itemWidth = item.width;
        var text = item.text;
        if (totalWidth > availableSize.width) {
          totalWidth -= itemWidth - emptyItemWidth;
          itemWidth = emptyItemWidth;
          text = null;
        }
        var el = new Polygon_default({
          shape: {
            points: makeItemPoints(lastX, 0, itemWidth, height, i === renderList.length - 1, i === 0)
          },
          style: defaults(normalStyleModel.getItemStyle(), {
            lineJoin: "bevel"
          }),
          textContent: new Text_default({
            style: createTextStyle(textStyleModel, {
              text
            })
          }),
          textConfig: {
            position: "inside"
          },
          z2: Z2_EMPHASIS_LIFT * 1e4,
          onclick: curry(onSelect, itemNode)
        });
        el.disableLabelAnimation = true;
        el.getTextContent().ensureState("emphasis").style = createTextStyle(emphasisTextStyleModel, {
          text
        });
        el.ensureState("emphasis").style = emphasisItemStyle;
        toggleHoverEmphasis(el, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
        this.group.add(el);
        packEventData(el, seriesModel, itemNode);
        lastX += itemWidth + ITEM_GAP;
      }
    };
    Breadcrumb2.prototype.remove = function() {
      this.group.removeAll();
    };
    return Breadcrumb2;
  }()
);
function makeItemPoints(x, y, itemWidth, itemHeight, head, tail) {
  var points = [[head ? x : x - ARRAY_LENGTH, y], [x + itemWidth, y], [x + itemWidth, y + itemHeight], [head ? x : x - ARRAY_LENGTH, y + itemHeight]];
  !tail && points.splice(2, 0, [x + itemWidth + ARRAY_LENGTH, y + itemHeight / 2]);
  !head && points.push([x, y + itemHeight / 2]);
  return points;
}
function packEventData(el, seriesModel, itemNode) {
  getECData(el).eventData = {
    componentType: "series",
    componentSubType: "treemap",
    componentIndex: seriesModel.componentIndex,
    seriesIndex: seriesModel.seriesIndex,
    seriesName: seriesModel.name,
    seriesType: "treemap",
    selfType: "breadcrumb",
    nodeData: {
      dataIndex: itemNode && itemNode.dataIndex,
      name: itemNode && itemNode.name
    },
    treePathInfo: itemNode && wrapTreePathInfo(itemNode, seriesModel)
  };
}
var Breadcrumb_default = Breadcrumb;

// node_modules/echarts/lib/util/animation.js
var AnimationWrap = (
  /** @class */
  function() {
    function AnimationWrap2() {
      this._storage = [];
      this._elExistsMap = {};
    }
    AnimationWrap2.prototype.add = function(el, target, duration, delay, easing) {
      if (this._elExistsMap[el.id]) {
        return false;
      }
      this._elExistsMap[el.id] = true;
      this._storage.push({
        el,
        target,
        duration,
        delay,
        easing
      });
      return true;
    };
    AnimationWrap2.prototype.finished = function(callback) {
      this._finishedCallback = callback;
      return this;
    };
    AnimationWrap2.prototype.start = function() {
      var _this = this;
      var count = this._storage.length;
      var checkTerminate = function() {
        count--;
        if (count <= 0) {
          _this._storage.length = 0;
          _this._elExistsMap = {};
          _this._finishedCallback && _this._finishedCallback();
        }
      };
      for (var i = 0, len2 = this._storage.length; i < len2; i++) {
        var item = this._storage[i];
        item.el.animateTo(item.target, {
          duration: item.duration,
          delay: item.delay,
          easing: item.easing,
          setToFinal: true,
          done: checkTerminate,
          aborted: checkTerminate
        });
      }
      return this;
    };
    return AnimationWrap2;
  }()
);
function createWrap() {
  return new AnimationWrap();
}

// node_modules/echarts/lib/chart/treemap/TreemapView.js
var Group = Group_default;
var Rect = Rect_default;
var DRAG_THRESHOLD = 3;
var PATH_LABEL_NOAMAL = "label";
var PATH_UPPERLABEL_NORMAL = "upperLabel";
var Z2_BASE = Z2_EMPHASIS_LIFT * 10;
var Z2_BG = Z2_EMPHASIS_LIFT * 2;
var Z2_CONTENT = Z2_EMPHASIS_LIFT * 3;
var getStateItemStyle = makeStyleMapper([
  ["fill", "color"],
  // `borderColor` and `borderWidth` has been occupied,
  // so use `stroke` to indicate the stroke of the rect.
  ["stroke", "strokeColor"],
  ["lineWidth", "strokeWidth"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
]);
var getItemStyleNormal = function(model) {
  var itemStyle = getStateItemStyle(model);
  itemStyle.stroke = itemStyle.fill = itemStyle.lineWidth = null;
  return itemStyle;
};
var inner2 = makeInner();
var TreemapView = (
  /** @class */
  function(_super) {
    __extends(TreemapView2, _super);
    function TreemapView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = TreemapView2.type;
      _this._state = "ready";
      _this._storage = createStorage();
      return _this;
    }
    TreemapView2.prototype.render = function(seriesModel, ecModel, api, payload) {
      var models = ecModel.findComponents({
        mainType: "series",
        subType: "treemap",
        query: payload
      });
      if (indexOf(models, seriesModel) < 0) {
        return;
      }
      this.seriesModel = seriesModel;
      this.api = api;
      this.ecModel = ecModel;
      var types = ["treemapZoomToNode", "treemapRootToNode"];
      var targetInfo = retrieveTargetInfo(payload, types, seriesModel);
      var payloadType = payload && payload.type;
      var layoutInfo = seriesModel.layoutInfo;
      var isInit = !this._oldTree;
      var thisStorage = this._storage;
      var reRoot = payloadType === "treemapRootToNode" && targetInfo && thisStorage ? {
        rootNodeGroup: thisStorage.nodeGroup[targetInfo.node.getRawIndex()],
        direction: payload.direction
      } : null;
      var containerGroup = this._giveContainerGroup(layoutInfo);
      var hasAnimation = seriesModel.get("animation");
      var renderResult = this._doRender(containerGroup, seriesModel, reRoot);
      hasAnimation && !isInit && (!payloadType || payloadType === "treemapZoomToNode" || payloadType === "treemapRootToNode") ? this._doAnimation(containerGroup, renderResult, seriesModel, reRoot) : renderResult.renderFinally();
      this._resetController(api);
      this._renderBreadcrumb(seriesModel, api, targetInfo);
    };
    TreemapView2.prototype._giveContainerGroup = function(layoutInfo) {
      var containerGroup = this._containerGroup;
      if (!containerGroup) {
        containerGroup = this._containerGroup = new Group();
        this._initEvents(containerGroup);
        this.group.add(containerGroup);
      }
      containerGroup.x = layoutInfo.x;
      containerGroup.y = layoutInfo.y;
      return containerGroup;
    };
    TreemapView2.prototype._doRender = function(containerGroup, seriesModel, reRoot) {
      var thisTree = seriesModel.getData().tree;
      var oldTree = this._oldTree;
      var lastsForAnimation = createStorage();
      var thisStorage = createStorage();
      var oldStorage = this._storage;
      var willInvisibleEls = [];
      function doRenderNode(thisNode, oldNode, parentGroup, depth) {
        return renderNode(seriesModel, thisStorage, oldStorage, reRoot, lastsForAnimation, willInvisibleEls, thisNode, oldNode, parentGroup, depth);
      }
      dualTravel(thisTree.root ? [thisTree.root] : [], oldTree && oldTree.root ? [oldTree.root] : [], containerGroup, thisTree === oldTree || !oldTree, 0);
      var willDeleteEls = clearStorage(oldStorage);
      this._oldTree = thisTree;
      this._storage = thisStorage;
      if (this._controllerHost) {
        var _oldRootLayout = this.seriesModel.layoutInfo;
        var rootLayout = thisTree.root.getLayout();
        if (rootLayout.width === _oldRootLayout.width && rootLayout.height === _oldRootLayout.height) {
          this._controllerHost.zoom = 1;
        }
      }
      return {
        lastsForAnimation,
        willDeleteEls,
        renderFinally
      };
      function dualTravel(thisViewChildren, oldViewChildren, parentGroup, sameTree, depth) {
        if (sameTree) {
          oldViewChildren = thisViewChildren;
          each(thisViewChildren, function(child, index) {
            !child.isRemoved() && processNode(index, index);
          });
        } else {
          new DataDiffer_default(oldViewChildren, thisViewChildren, getKey2, getKey2).add(processNode).update(processNode).remove(curry(processNode, null)).execute();
        }
        function getKey2(node) {
          return node.getId();
        }
        function processNode(newIndex, oldIndex) {
          var thisNode = newIndex != null ? thisViewChildren[newIndex] : null;
          var oldNode = oldIndex != null ? oldViewChildren[oldIndex] : null;
          var group = doRenderNode(thisNode, oldNode, parentGroup, depth);
          group && dualTravel(thisNode && thisNode.viewChildren || [], oldNode && oldNode.viewChildren || [], group, sameTree, depth + 1);
        }
      }
      function clearStorage(storage) {
        var willDeleteEls2 = createStorage();
        storage && each(storage, function(store, storageName) {
          var delEls = willDeleteEls2[storageName];
          each(store, function(el) {
            el && (delEls.push(el), inner2(el).willDelete = true);
          });
        });
        return willDeleteEls2;
      }
      function renderFinally() {
        each(willDeleteEls, function(els) {
          each(els, function(el) {
            el.parent && el.parent.remove(el);
          });
        });
        each(willInvisibleEls, function(el) {
          el.invisible = true;
          el.dirty();
        });
      }
    };
    TreemapView2.prototype._doAnimation = function(containerGroup, renderResult, seriesModel, reRoot) {
      var durationOption = seriesModel.get("animationDurationUpdate");
      var easingOption = seriesModel.get("animationEasing");
      var duration = (isFunction(durationOption) ? 0 : durationOption) || 0;
      var easing = (isFunction(easingOption) ? null : easingOption) || "cubicOut";
      var animationWrap = createWrap();
      each(renderResult.willDeleteEls, function(store, storageName) {
        each(store, function(el, rawIndex) {
          if (el.invisible) {
            return;
          }
          var parent = el.parent;
          var target;
          var innerStore = inner2(parent);
          if (reRoot && reRoot.direction === "drillDown") {
            target = parent === reRoot.rootNodeGroup ? {
              shape: {
                x: 0,
                y: 0,
                width: innerStore.nodeWidth,
                height: innerStore.nodeHeight
              },
              style: {
                opacity: 0
              }
            } : {
              style: {
                opacity: 0
              }
            };
          } else {
            var targetX = 0;
            var targetY = 0;
            if (!innerStore.willDelete) {
              targetX = innerStore.nodeWidth / 2;
              targetY = innerStore.nodeHeight / 2;
            }
            target = storageName === "nodeGroup" ? {
              x: targetX,
              y: targetY,
              style: {
                opacity: 0
              }
            } : {
              shape: {
                x: targetX,
                y: targetY,
                width: 0,
                height: 0
              },
              style: {
                opacity: 0
              }
            };
          }
          target && animationWrap.add(el, target, duration, 0, easing);
        });
      });
      each(this._storage, function(store, storageName) {
        each(store, function(el, rawIndex) {
          var last = renderResult.lastsForAnimation[storageName][rawIndex];
          var target = {};
          if (!last) {
            return;
          }
          if (el instanceof Group_default) {
            if (last.oldX != null) {
              target.x = el.x;
              target.y = el.y;
              el.x = last.oldX;
              el.y = last.oldY;
            }
          } else {
            if (last.oldShape) {
              target.shape = extend({}, el.shape);
              el.setShape(last.oldShape);
            }
            if (last.fadein) {
              el.setStyle("opacity", 0);
              target.style = {
                opacity: 1
              };
            } else if (el.style.opacity !== 1) {
              target.style = {
                opacity: 1
              };
            }
          }
          animationWrap.add(el, target, duration, 0, easing);
        });
      }, this);
      this._state = "animating";
      animationWrap.finished(bind(function() {
        this._state = "ready";
        renderResult.renderFinally();
      }, this)).start();
    };
    TreemapView2.prototype._resetController = function(api) {
      var controller = this._controller;
      var controllerHost = this._controllerHost;
      if (!controllerHost) {
        this._controllerHost = {
          target: this.group
        };
        controllerHost = this._controllerHost;
      }
      if (!controller) {
        controller = this._controller = new RoamController_default(api.getZr());
        controller.enable(this.seriesModel.get("roam"));
        controllerHost.zoomLimit = this.seriesModel.get("scaleLimit");
        controllerHost.zoom = this.seriesModel.get("zoom");
        controller.on("pan", bind(this._onPan, this));
        controller.on("zoom", bind(this._onZoom, this));
      }
      var rect = new BoundingRect_default(0, 0, api.getWidth(), api.getHeight());
      controller.setPointerChecker(function(e, x, y) {
        return rect.contain(x, y);
      });
    };
    TreemapView2.prototype._clearController = function() {
      var controller = this._controller;
      this._controllerHost = null;
      if (controller) {
        controller.dispose();
        controller = null;
      }
    };
    TreemapView2.prototype._onPan = function(e) {
      if (this._state !== "animating" && (Math.abs(e.dx) > DRAG_THRESHOLD || Math.abs(e.dy) > DRAG_THRESHOLD)) {
        var root = this.seriesModel.getData().tree.root;
        if (!root) {
          return;
        }
        var rootLayout = root.getLayout();
        if (!rootLayout) {
          return;
        }
        this.api.dispatchAction({
          type: "treemapMove",
          from: this.uid,
          seriesId: this.seriesModel.id,
          rootRect: {
            x: rootLayout.x + e.dx,
            y: rootLayout.y + e.dy,
            width: rootLayout.width,
            height: rootLayout.height
          }
        });
      }
    };
    TreemapView2.prototype._onZoom = function(e) {
      var mouseX = e.originX;
      var mouseY = e.originY;
      var zoomDelta = e.scale;
      if (this._state !== "animating") {
        var root = this.seriesModel.getData().tree.root;
        if (!root) {
          return;
        }
        var rootLayout = root.getLayout();
        if (!rootLayout) {
          return;
        }
        var rect = new BoundingRect_default(rootLayout.x, rootLayout.y, rootLayout.width, rootLayout.height);
        var zoomLimit = null;
        var _controllerHost = this._controllerHost;
        zoomLimit = _controllerHost.zoomLimit;
        var newZoom = _controllerHost.zoom = _controllerHost.zoom || 1;
        newZoom *= zoomDelta;
        if (zoomLimit) {
          var zoomMin = zoomLimit.min || 0;
          var zoomMax = zoomLimit.max || Infinity;
          newZoom = Math.max(Math.min(zoomMax, newZoom), zoomMin);
        }
        var zoomScale = newZoom / _controllerHost.zoom;
        _controllerHost.zoom = newZoom;
        var layoutInfo = this.seriesModel.layoutInfo;
        mouseX -= layoutInfo.x;
        mouseY -= layoutInfo.y;
        var m = create2();
        translate(m, m, [-mouseX, -mouseY]);
        scale2(m, m, [zoomScale, zoomScale]);
        translate(m, m, [mouseX, mouseY]);
        rect.applyTransform(m);
        this.api.dispatchAction({
          type: "treemapRender",
          from: this.uid,
          seriesId: this.seriesModel.id,
          rootRect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          }
        });
      }
    };
    TreemapView2.prototype._initEvents = function(containerGroup) {
      var _this = this;
      containerGroup.on("click", function(e) {
        if (_this._state !== "ready") {
          return;
        }
        var nodeClick = _this.seriesModel.get("nodeClick", true);
        if (!nodeClick) {
          return;
        }
        var targetInfo = _this.findTarget(e.offsetX, e.offsetY);
        if (!targetInfo) {
          return;
        }
        var node = targetInfo.node;
        if (node.getLayout().isLeafRoot) {
          _this._rootToNode(targetInfo);
        } else {
          if (nodeClick === "zoomToNode") {
            _this._zoomToNode(targetInfo);
          } else if (nodeClick === "link") {
            var itemModel = node.hostTree.data.getItemModel(node.dataIndex);
            var link = itemModel.get("link", true);
            var linkTarget = itemModel.get("target", true) || "blank";
            link && windowOpen(link, linkTarget);
          }
        }
      }, this);
    };
    TreemapView2.prototype._renderBreadcrumb = function(seriesModel, api, targetInfo) {
      var _this = this;
      if (!targetInfo) {
        targetInfo = seriesModel.get("leafDepth", true) != null ? {
          node: seriesModel.getViewRoot()
        } : this.findTarget(api.getWidth() / 2, api.getHeight() / 2);
        if (!targetInfo) {
          targetInfo = {
            node: seriesModel.getData().tree.root
          };
        }
      }
      (this._breadcrumb || (this._breadcrumb = new Breadcrumb_default(this.group))).render(seriesModel, api, targetInfo.node, function(node) {
        if (_this._state !== "animating") {
          aboveViewRoot(seriesModel.getViewRoot(), node) ? _this._rootToNode({
            node
          }) : _this._zoomToNode({
            node
          });
        }
      });
    };
    TreemapView2.prototype.remove = function() {
      this._clearController();
      this._containerGroup && this._containerGroup.removeAll();
      this._storage = createStorage();
      this._state = "ready";
      this._breadcrumb && this._breadcrumb.remove();
    };
    TreemapView2.prototype.dispose = function() {
      this._clearController();
    };
    TreemapView2.prototype._zoomToNode = function(targetInfo) {
      this.api.dispatchAction({
        type: "treemapZoomToNode",
        from: this.uid,
        seriesId: this.seriesModel.id,
        targetNode: targetInfo.node
      });
    };
    TreemapView2.prototype._rootToNode = function(targetInfo) {
      this.api.dispatchAction({
        type: "treemapRootToNode",
        from: this.uid,
        seriesId: this.seriesModel.id,
        targetNode: targetInfo.node
      });
    };
    TreemapView2.prototype.findTarget = function(x, y) {
      var targetInfo;
      var viewRoot = this.seriesModel.getViewRoot();
      viewRoot.eachNode({
        attr: "viewChildren",
        order: "preorder"
      }, function(node) {
        var bgEl = this._storage.background[node.getRawIndex()];
        if (bgEl) {
          var point = bgEl.transformCoordToLocal(x, y);
          var shape = bgEl.shape;
          if (shape.x <= point[0] && point[0] <= shape.x + shape.width && shape.y <= point[1] && point[1] <= shape.y + shape.height) {
            targetInfo = {
              node,
              offsetX: point[0],
              offsetY: point[1]
            };
          } else {
            return false;
          }
        }
      }, this);
      return targetInfo;
    };
    TreemapView2.type = "treemap";
    return TreemapView2;
  }(Chart_default)
);
function createStorage() {
  return {
    nodeGroup: [],
    background: [],
    content: []
  };
}
function renderNode(seriesModel, thisStorage, oldStorage, reRoot, lastsForAnimation, willInvisibleEls, thisNode, oldNode, parentGroup, depth) {
  if (!thisNode) {
    return;
  }
  var thisLayout = thisNode.getLayout();
  var data = seriesModel.getData();
  var nodeModel = thisNode.getModel();
  data.setItemGraphicEl(thisNode.dataIndex, null);
  if (!thisLayout || !thisLayout.isInView) {
    return;
  }
  var thisWidth = thisLayout.width;
  var thisHeight = thisLayout.height;
  var borderWidth = thisLayout.borderWidth;
  var thisInvisible = thisLayout.invisible;
  var thisRawIndex = thisNode.getRawIndex();
  var oldRawIndex = oldNode && oldNode.getRawIndex();
  var thisViewChildren = thisNode.viewChildren;
  var upperHeight = thisLayout.upperHeight;
  var isParent = thisViewChildren && thisViewChildren.length;
  var itemStyleNormalModel = nodeModel.getModel("itemStyle");
  var itemStyleEmphasisModel = nodeModel.getModel(["emphasis", "itemStyle"]);
  var itemStyleBlurModel = nodeModel.getModel(["blur", "itemStyle"]);
  var itemStyleSelectModel = nodeModel.getModel(["select", "itemStyle"]);
  var borderRadius = itemStyleNormalModel.get("borderRadius") || 0;
  var group = giveGraphic("nodeGroup", Group);
  if (!group) {
    return;
  }
  parentGroup.add(group);
  group.x = thisLayout.x || 0;
  group.y = thisLayout.y || 0;
  group.markRedraw();
  inner2(group).nodeWidth = thisWidth;
  inner2(group).nodeHeight = thisHeight;
  if (thisLayout.isAboveViewRoot) {
    return group;
  }
  var bg = giveGraphic("background", Rect, depth, Z2_BG);
  bg && renderBackground(group, bg, isParent && thisLayout.upperLabelHeight);
  var emphasisModel = nodeModel.getModel("emphasis");
  var focus = emphasisModel.get("focus");
  var blurScope = emphasisModel.get("blurScope");
  var isDisabled = emphasisModel.get("disabled");
  var focusOrIndices = focus === "ancestor" ? thisNode.getAncestorsIndices() : focus === "descendant" ? thisNode.getDescendantIndices() : focus;
  if (isParent) {
    if (isHighDownDispatcher(group)) {
      setAsHighDownDispatcher(group, false);
    }
    if (bg) {
      setAsHighDownDispatcher(bg, !isDisabled);
      data.setItemGraphicEl(thisNode.dataIndex, bg);
      enableHoverFocus(bg, focusOrIndices, blurScope);
    }
  } else {
    var content = giveGraphic("content", Rect, depth, Z2_CONTENT);
    content && renderContent(group, content);
    bg.disableMorphing = true;
    if (bg && isHighDownDispatcher(bg)) {
      setAsHighDownDispatcher(bg, false);
    }
    setAsHighDownDispatcher(group, !isDisabled);
    data.setItemGraphicEl(thisNode.dataIndex, group);
    var cursorStyle = nodeModel.getShallow("cursor");
    cursorStyle && content.attr("cursor", cursorStyle);
    enableHoverFocus(group, focusOrIndices, blurScope);
  }
  return group;
  function renderBackground(group2, bg2, useUpperLabel) {
    var ecData = getECData(bg2);
    ecData.dataIndex = thisNode.dataIndex;
    ecData.seriesIndex = seriesModel.seriesIndex;
    bg2.setShape({
      x: 0,
      y: 0,
      width: thisWidth,
      height: thisHeight,
      r: borderRadius
    });
    if (thisInvisible) {
      processInvisible(bg2);
    } else {
      bg2.invisible = false;
      var style = thisNode.getVisual("style");
      var visualBorderColor = style.stroke;
      var normalStyle = getItemStyleNormal(itemStyleNormalModel);
      normalStyle.fill = visualBorderColor;
      var emphasisStyle = getStateItemStyle(itemStyleEmphasisModel);
      emphasisStyle.fill = itemStyleEmphasisModel.get("borderColor");
      var blurStyle = getStateItemStyle(itemStyleBlurModel);
      blurStyle.fill = itemStyleBlurModel.get("borderColor");
      var selectStyle = getStateItemStyle(itemStyleSelectModel);
      selectStyle.fill = itemStyleSelectModel.get("borderColor");
      if (useUpperLabel) {
        var upperLabelWidth = thisWidth - 2 * borderWidth;
        prepareText(
          // PENDING: convert ZRColor to ColorString for text.
          bg2,
          visualBorderColor,
          style.opacity,
          {
            x: borderWidth,
            y: 0,
            width: upperLabelWidth,
            height: upperHeight
          }
        );
      } else {
        bg2.removeTextContent();
      }
      bg2.setStyle(normalStyle);
      bg2.ensureState("emphasis").style = emphasisStyle;
      bg2.ensureState("blur").style = blurStyle;
      bg2.ensureState("select").style = selectStyle;
      setDefaultStateProxy(bg2);
    }
    group2.add(bg2);
  }
  function renderContent(group2, content2) {
    var ecData = getECData(content2);
    ecData.dataIndex = thisNode.dataIndex;
    ecData.seriesIndex = seriesModel.seriesIndex;
    var contentWidth = Math.max(thisWidth - 2 * borderWidth, 0);
    var contentHeight = Math.max(thisHeight - 2 * borderWidth, 0);
    content2.culling = true;
    content2.setShape({
      x: borderWidth,
      y: borderWidth,
      width: contentWidth,
      height: contentHeight,
      r: borderRadius
    });
    if (thisInvisible) {
      processInvisible(content2);
    } else {
      content2.invisible = false;
      var nodeStyle = thisNode.getVisual("style");
      var visualColor = nodeStyle.fill;
      var normalStyle = getItemStyleNormal(itemStyleNormalModel);
      normalStyle.fill = visualColor;
      normalStyle.decal = nodeStyle.decal;
      var emphasisStyle = getStateItemStyle(itemStyleEmphasisModel);
      var blurStyle = getStateItemStyle(itemStyleBlurModel);
      var selectStyle = getStateItemStyle(itemStyleSelectModel);
      prepareText(content2, visualColor, nodeStyle.opacity, null);
      content2.setStyle(normalStyle);
      content2.ensureState("emphasis").style = emphasisStyle;
      content2.ensureState("blur").style = blurStyle;
      content2.ensureState("select").style = selectStyle;
      setDefaultStateProxy(content2);
    }
    group2.add(content2);
  }
  function processInvisible(element) {
    !element.invisible && willInvisibleEls.push(element);
  }
  function prepareText(rectEl, visualColor, visualOpacity, upperLabelRect) {
    var normalLabelModel = nodeModel.getModel(upperLabelRect ? PATH_UPPERLABEL_NORMAL : PATH_LABEL_NOAMAL);
    var defaultText = convertOptionIdName(nodeModel.get("name"), null);
    var isShow = normalLabelModel.getShallow("show");
    setLabelStyle(rectEl, getLabelStatesModels(nodeModel, upperLabelRect ? PATH_UPPERLABEL_NORMAL : PATH_LABEL_NOAMAL), {
      defaultText: isShow ? defaultText : null,
      inheritColor: visualColor,
      defaultOpacity: visualOpacity,
      labelFetcher: seriesModel,
      labelDataIndex: thisNode.dataIndex
    });
    var textEl = rectEl.getTextContent();
    if (!textEl) {
      return;
    }
    var textStyle = textEl.style;
    var textPadding = normalizeCssArray(textStyle.padding || 0);
    if (upperLabelRect) {
      rectEl.setTextConfig({
        layoutRect: upperLabelRect
      });
      textEl.disableLabelLayout = true;
    }
    textEl.beforeUpdate = function() {
      var width = Math.max((upperLabelRect ? upperLabelRect.width : rectEl.shape.width) - textPadding[1] - textPadding[3], 0);
      var height = Math.max((upperLabelRect ? upperLabelRect.height : rectEl.shape.height) - textPadding[0] - textPadding[2], 0);
      if (textStyle.width !== width || textStyle.height !== height) {
        textEl.setStyle({
          width,
          height
        });
      }
    };
    textStyle.truncateMinChar = 2;
    textStyle.lineOverflow = "truncate";
    addDrillDownIcon(textStyle, upperLabelRect, thisLayout);
    var textEmphasisState = textEl.getState("emphasis");
    addDrillDownIcon(textEmphasisState ? textEmphasisState.style : null, upperLabelRect, thisLayout);
  }
  function addDrillDownIcon(style, upperLabelRect, thisLayout2) {
    var text = style ? style.text : null;
    if (!upperLabelRect && thisLayout2.isLeafRoot && text != null) {
      var iconChar = seriesModel.get("drillDownIcon", true);
      style.text = iconChar ? iconChar + " " + text : text;
    }
  }
  function giveGraphic(storageName, Ctor, depth2, z) {
    var element = oldRawIndex != null && oldStorage[storageName][oldRawIndex];
    var lasts = lastsForAnimation[storageName];
    if (element) {
      oldStorage[storageName][oldRawIndex] = null;
      prepareAnimationWhenHasOld(lasts, element);
    } else if (!thisInvisible) {
      element = new Ctor();
      if (element instanceof Displayable_default) {
        element.z2 = calculateZ2(depth2, z);
      }
      prepareAnimationWhenNoOld(lasts, element);
    }
    return thisStorage[storageName][thisRawIndex] = element;
  }
  function prepareAnimationWhenHasOld(lasts, element) {
    var lastCfg = lasts[thisRawIndex] = {};
    if (element instanceof Group) {
      lastCfg.oldX = element.x;
      lastCfg.oldY = element.y;
    } else {
      lastCfg.oldShape = extend({}, element.shape);
    }
  }
  function prepareAnimationWhenNoOld(lasts, element) {
    var lastCfg = lasts[thisRawIndex] = {};
    var parentNode = thisNode.parentNode;
    var isGroup = element instanceof Group_default;
    if (parentNode && (!reRoot || reRoot.direction === "drillDown")) {
      var parentOldX = 0;
      var parentOldY = 0;
      var parentOldBg = lastsForAnimation.background[parentNode.getRawIndex()];
      if (!reRoot && parentOldBg && parentOldBg.oldShape) {
        parentOldX = parentOldBg.oldShape.width;
        parentOldY = parentOldBg.oldShape.height;
      }
      if (isGroup) {
        lastCfg.oldX = 0;
        lastCfg.oldY = parentOldY;
      } else {
        lastCfg.oldShape = {
          x: parentOldX,
          y: parentOldY,
          width: 0,
          height: 0
        };
      }
    }
    lastCfg.fadein = !isGroup;
  }
}
function calculateZ2(depth, z2InLevel) {
  return depth * Z2_BASE + z2InLevel;
}
var TreemapView_default = TreemapView;

// node_modules/echarts/lib/chart/treemap/treemapVisual.js
var ITEM_STYLE_NORMAL = "itemStyle";
var inner3 = makeInner();
var treemapVisual_default = {
  seriesType: "treemap",
  reset: function(seriesModel) {
    var tree = seriesModel.getData().tree;
    var root = tree.root;
    if (root.isRemoved()) {
      return;
    }
    travelTree(
      root,
      // Visual should calculate from tree root but not view root.
      {},
      seriesModel.getViewRoot().getAncestors(),
      seriesModel
    );
  }
};
function travelTree(node, designatedVisual, viewRootAncestors, seriesModel) {
  var nodeModel = node.getModel();
  var nodeLayout = node.getLayout();
  var data = node.hostTree.data;
  if (!nodeLayout || nodeLayout.invisible || !nodeLayout.isInView) {
    return;
  }
  var nodeItemStyleModel = nodeModel.getModel(ITEM_STYLE_NORMAL);
  var visuals = buildVisuals(nodeItemStyleModel, designatedVisual, seriesModel);
  var existsStyle = data.ensureUniqueItemVisual(node.dataIndex, "style");
  var borderColor = nodeItemStyleModel.get("borderColor");
  var borderColorSaturation = nodeItemStyleModel.get("borderColorSaturation");
  var thisNodeColor;
  if (borderColorSaturation != null) {
    thisNodeColor = calculateColor(visuals);
    borderColor = calculateBorderColor(borderColorSaturation, thisNodeColor);
  }
  existsStyle.stroke = borderColor;
  var viewChildren = node.viewChildren;
  if (!viewChildren || !viewChildren.length) {
    thisNodeColor = calculateColor(visuals);
    existsStyle.fill = thisNodeColor;
  } else {
    var mapping_1 = buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren);
    each(viewChildren, function(child, index) {
      if (child.depth >= viewRootAncestors.length || child === viewRootAncestors[child.depth]) {
        var childVisual = mapVisual(nodeModel, visuals, child, index, mapping_1, seriesModel);
        travelTree(child, childVisual, viewRootAncestors, seriesModel);
      }
    });
  }
}
function buildVisuals(nodeItemStyleModel, designatedVisual, seriesModel) {
  var visuals = extend({}, designatedVisual);
  var designatedVisualItemStyle = seriesModel.designatedVisualItemStyle;
  each(["color", "colorAlpha", "colorSaturation"], function(visualName) {
    designatedVisualItemStyle[visualName] = designatedVisual[visualName];
    var val = nodeItemStyleModel.get(visualName);
    designatedVisualItemStyle[visualName] = null;
    val != null && (visuals[visualName] = val);
  });
  return visuals;
}
function calculateColor(visuals) {
  var color = getValueVisualDefine(visuals, "color");
  if (color) {
    var colorAlpha = getValueVisualDefine(visuals, "colorAlpha");
    var colorSaturation = getValueVisualDefine(visuals, "colorSaturation");
    if (colorSaturation) {
      color = modifyHSL(color, null, null, colorSaturation);
    }
    if (colorAlpha) {
      color = modifyAlpha(color, colorAlpha);
    }
    return color;
  }
}
function calculateBorderColor(borderColorSaturation, thisNodeColor) {
  return thisNodeColor != null ? modifyHSL(thisNodeColor, null, null, borderColorSaturation) : null;
}
function getValueVisualDefine(visuals, name) {
  var value = visuals[name];
  if (value != null && value !== "none") {
    return value;
  }
}
function buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren) {
  if (!viewChildren || !viewChildren.length) {
    return;
  }
  var rangeVisual = getRangeVisual(nodeModel, "color") || visuals.color != null && visuals.color !== "none" && (getRangeVisual(nodeModel, "colorAlpha") || getRangeVisual(nodeModel, "colorSaturation"));
  if (!rangeVisual) {
    return;
  }
  var visualMin = nodeModel.get("visualMin");
  var visualMax = nodeModel.get("visualMax");
  var dataExtent = nodeLayout.dataExtent.slice();
  visualMin != null && visualMin < dataExtent[0] && (dataExtent[0] = visualMin);
  visualMax != null && visualMax > dataExtent[1] && (dataExtent[1] = visualMax);
  var colorMappingBy = nodeModel.get("colorMappingBy");
  var opt = {
    type: rangeVisual.name,
    dataExtent,
    visual: rangeVisual.range
  };
  if (opt.type === "color" && (colorMappingBy === "index" || colorMappingBy === "id")) {
    opt.mappingMethod = "category";
    opt.loop = true;
  } else {
    opt.mappingMethod = "linear";
  }
  var mapping = new VisualMapping_default(opt);
  inner3(mapping).drColorMappingBy = colorMappingBy;
  return mapping;
}
function getRangeVisual(nodeModel, name) {
  var range = nodeModel.get(name);
  return isArray(range) && range.length ? {
    name,
    range
  } : null;
}
function mapVisual(nodeModel, visuals, child, index, mapping, seriesModel) {
  var childVisuals = extend({}, visuals);
  if (mapping) {
    var mappingType = mapping.type;
    var colorMappingBy = mappingType === "color" && inner3(mapping).drColorMappingBy;
    var value = colorMappingBy === "index" ? index : colorMappingBy === "id" ? seriesModel.mapIdToIndex(child.getId()) : child.getValue(nodeModel.get("visualDimension"));
    childVisuals[mappingType] = mapping.mapValueToVisual(value);
  }
  return childVisuals;
}

// node_modules/echarts/lib/chart/treemap/treemapLayout.js
var mathMax3 = Math.max;
var mathMin3 = Math.min;
var retrieveValue = retrieve;
var each2 = each;
var PATH_BORDER_WIDTH = ["itemStyle", "borderWidth"];
var PATH_GAP_WIDTH = ["itemStyle", "gapWidth"];
var PATH_UPPER_LABEL_SHOW = ["upperLabel", "show"];
var PATH_UPPER_LABEL_HEIGHT = ["upperLabel", "height"];
var treemapLayout_default = {
  seriesType: "treemap",
  reset: function(seriesModel, ecModel, api, payload) {
    var ecWidth = api.getWidth();
    var ecHeight = api.getHeight();
    var seriesOption = seriesModel.option;
    var layoutInfo = getLayoutRect(seriesModel.getBoxLayoutParams(), {
      width: api.getWidth(),
      height: api.getHeight()
    });
    var size = seriesOption.size || [];
    var containerWidth = parsePercent2(retrieveValue(layoutInfo.width, size[0]), ecWidth);
    var containerHeight = parsePercent2(retrieveValue(layoutInfo.height, size[1]), ecHeight);
    var payloadType = payload && payload.type;
    var types = ["treemapZoomToNode", "treemapRootToNode"];
    var targetInfo = retrieveTargetInfo(payload, types, seriesModel);
    var rootRect = payloadType === "treemapRender" || payloadType === "treemapMove" ? payload.rootRect : null;
    var viewRoot = seriesModel.getViewRoot();
    var viewAbovePath = getPathToRoot(viewRoot);
    if (payloadType !== "treemapMove") {
      var rootSize = payloadType === "treemapZoomToNode" ? estimateRootSize(seriesModel, targetInfo, viewRoot, containerWidth, containerHeight) : rootRect ? [rootRect.width, rootRect.height] : [containerWidth, containerHeight];
      var sort_1 = seriesOption.sort;
      if (sort_1 && sort_1 !== "asc" && sort_1 !== "desc") {
        sort_1 = "desc";
      }
      var options = {
        squareRatio: seriesOption.squareRatio,
        sort: sort_1,
        leafDepth: seriesOption.leafDepth
      };
      viewRoot.hostTree.clearLayouts();
      var viewRootLayout_1 = {
        x: 0,
        y: 0,
        width: rootSize[0],
        height: rootSize[1],
        area: rootSize[0] * rootSize[1]
      };
      viewRoot.setLayout(viewRootLayout_1);
      squarify(viewRoot, options, false, 0);
      viewRootLayout_1 = viewRoot.getLayout();
      each2(viewAbovePath, function(node, index) {
        var childValue = (viewAbovePath[index + 1] || viewRoot).getValue();
        node.setLayout(extend({
          dataExtent: [childValue, childValue],
          borderWidth: 0,
          upperHeight: 0
        }, viewRootLayout_1));
      });
    }
    var treeRoot = seriesModel.getData().tree.root;
    treeRoot.setLayout(calculateRootPosition(layoutInfo, rootRect, targetInfo), true);
    seriesModel.setLayoutInfo(layoutInfo);
    prunning(
      treeRoot,
      // Transform to base element coordinate system.
      new BoundingRect_default(-layoutInfo.x, -layoutInfo.y, ecWidth, ecHeight),
      viewAbovePath,
      viewRoot,
      0
    );
  }
};
function squarify(node, options, hideChildren, depth) {
  var width;
  var height;
  if (node.isRemoved()) {
    return;
  }
  var thisLayout = node.getLayout();
  width = thisLayout.width;
  height = thisLayout.height;
  var nodeModel = node.getModel();
  var borderWidth = nodeModel.get(PATH_BORDER_WIDTH);
  var halfGapWidth = nodeModel.get(PATH_GAP_WIDTH) / 2;
  var upperLabelHeight = getUpperLabelHeight(nodeModel);
  var upperHeight = Math.max(borderWidth, upperLabelHeight);
  var layoutOffset = borderWidth - halfGapWidth;
  var layoutOffsetUpper = upperHeight - halfGapWidth;
  node.setLayout({
    borderWidth,
    upperHeight,
    upperLabelHeight
  }, true);
  width = mathMax3(width - 2 * layoutOffset, 0);
  height = mathMax3(height - layoutOffset - layoutOffsetUpper, 0);
  var totalArea = width * height;
  var viewChildren = initChildren(node, nodeModel, totalArea, options, hideChildren, depth);
  if (!viewChildren.length) {
    return;
  }
  var rect = {
    x: layoutOffset,
    y: layoutOffsetUpper,
    width,
    height
  };
  var rowFixedLength = mathMin3(width, height);
  var best = Infinity;
  var row = [];
  row.area = 0;
  for (var i = 0, len2 = viewChildren.length; i < len2; ) {
    var child = viewChildren[i];
    row.push(child);
    row.area += child.getLayout().area;
    var score = worst(row, rowFixedLength, options.squareRatio);
    if (score <= best) {
      i++;
      best = score;
    } else {
      row.area -= row.pop().getLayout().area;
      position(row, rowFixedLength, rect, halfGapWidth, false);
      rowFixedLength = mathMin3(rect.width, rect.height);
      row.length = row.area = 0;
      best = Infinity;
    }
  }
  if (row.length) {
    position(row, rowFixedLength, rect, halfGapWidth, true);
  }
  if (!hideChildren) {
    var childrenVisibleMin = nodeModel.get("childrenVisibleMin");
    if (childrenVisibleMin != null && totalArea < childrenVisibleMin) {
      hideChildren = true;
    }
  }
  for (var i = 0, len2 = viewChildren.length; i < len2; i++) {
    squarify(viewChildren[i], options, hideChildren, depth + 1);
  }
}
function initChildren(node, nodeModel, totalArea, options, hideChildren, depth) {
  var viewChildren = node.children || [];
  var orderBy = options.sort;
  orderBy !== "asc" && orderBy !== "desc" && (orderBy = null);
  var overLeafDepth = options.leafDepth != null && options.leafDepth <= depth;
  if (hideChildren && !overLeafDepth) {
    return node.viewChildren = [];
  }
  viewChildren = filter(viewChildren, function(child) {
    return !child.isRemoved();
  });
  sort(viewChildren, orderBy);
  var info = statistic(nodeModel, viewChildren, orderBy);
  if (info.sum === 0) {
    return node.viewChildren = [];
  }
  info.sum = filterByThreshold(nodeModel, totalArea, info.sum, orderBy, viewChildren);
  if (info.sum === 0) {
    return node.viewChildren = [];
  }
  for (var i = 0, len2 = viewChildren.length; i < len2; i++) {
    var area = viewChildren[i].getValue() / info.sum * totalArea;
    viewChildren[i].setLayout({
      area
    });
  }
  if (overLeafDepth) {
    viewChildren.length && node.setLayout({
      isLeafRoot: true
    }, true);
    viewChildren.length = 0;
  }
  node.viewChildren = viewChildren;
  node.setLayout({
    dataExtent: info.dataExtent
  }, true);
  return viewChildren;
}
function filterByThreshold(nodeModel, totalArea, sum2, orderBy, orderedChildren) {
  if (!orderBy) {
    return sum2;
  }
  var visibleMin = nodeModel.get("visibleMin");
  var len2 = orderedChildren.length;
  var deletePoint = len2;
  for (var i = len2 - 1; i >= 0; i--) {
    var value = orderedChildren[orderBy === "asc" ? len2 - i - 1 : i].getValue();
    if (value / sum2 * totalArea < visibleMin) {
      deletePoint = i;
      sum2 -= value;
    }
  }
  orderBy === "asc" ? orderedChildren.splice(0, len2 - deletePoint) : orderedChildren.splice(deletePoint, len2 - deletePoint);
  return sum2;
}
function sort(viewChildren, orderBy) {
  if (orderBy) {
    viewChildren.sort(function(a, b) {
      var diff = orderBy === "asc" ? a.getValue() - b.getValue() : b.getValue() - a.getValue();
      return diff === 0 ? orderBy === "asc" ? a.dataIndex - b.dataIndex : b.dataIndex - a.dataIndex : diff;
    });
  }
  return viewChildren;
}
function statistic(nodeModel, children, orderBy) {
  var sum2 = 0;
  for (var i = 0, len2 = children.length; i < len2; i++) {
    sum2 += children[i].getValue();
  }
  var dimension = nodeModel.get("visualDimension");
  var dataExtent;
  if (!children || !children.length) {
    dataExtent = [NaN, NaN];
  } else if (dimension === "value" && orderBy) {
    dataExtent = [children[children.length - 1].getValue(), children[0].getValue()];
    orderBy === "asc" && dataExtent.reverse();
  } else {
    dataExtent = [Infinity, -Infinity];
    each2(children, function(child) {
      var value = child.getValue(dimension);
      value < dataExtent[0] && (dataExtent[0] = value);
      value > dataExtent[1] && (dataExtent[1] = value);
    });
  }
  return {
    sum: sum2,
    dataExtent
  };
}
function worst(row, rowFixedLength, ratio) {
  var areaMax = 0;
  var areaMin = Infinity;
  for (var i = 0, area = void 0, len2 = row.length; i < len2; i++) {
    area = row[i].getLayout().area;
    if (area) {
      area < areaMin && (areaMin = area);
      area > areaMax && (areaMax = area);
    }
  }
  var squareArea = row.area * row.area;
  var f = rowFixedLength * rowFixedLength * ratio;
  return squareArea ? mathMax3(f * areaMax / squareArea, squareArea / (f * areaMin)) : Infinity;
}
function position(row, rowFixedLength, rect, halfGapWidth, flush) {
  var idx0WhenH = rowFixedLength === rect.width ? 0 : 1;
  var idx1WhenH = 1 - idx0WhenH;
  var xy = ["x", "y"];
  var wh = ["width", "height"];
  var last = rect[xy[idx0WhenH]];
  var rowOtherLength = rowFixedLength ? row.area / rowFixedLength : 0;
  if (flush || rowOtherLength > rect[wh[idx1WhenH]]) {
    rowOtherLength = rect[wh[idx1WhenH]];
  }
  for (var i = 0, rowLen = row.length; i < rowLen; i++) {
    var node = row[i];
    var nodeLayout = {};
    var step = rowOtherLength ? node.getLayout().area / rowOtherLength : 0;
    var wh1 = nodeLayout[wh[idx1WhenH]] = mathMax3(rowOtherLength - 2 * halfGapWidth, 0);
    var remain = rect[xy[idx0WhenH]] + rect[wh[idx0WhenH]] - last;
    var modWH = i === rowLen - 1 || remain < step ? remain : step;
    var wh0 = nodeLayout[wh[idx0WhenH]] = mathMax3(modWH - 2 * halfGapWidth, 0);
    nodeLayout[xy[idx1WhenH]] = rect[xy[idx1WhenH]] + mathMin3(halfGapWidth, wh1 / 2);
    nodeLayout[xy[idx0WhenH]] = last + mathMin3(halfGapWidth, wh0 / 2);
    last += modWH;
    node.setLayout(nodeLayout, true);
  }
  rect[xy[idx1WhenH]] += rowOtherLength;
  rect[wh[idx1WhenH]] -= rowOtherLength;
}
function estimateRootSize(seriesModel, targetInfo, viewRoot, containerWidth, containerHeight) {
  var currNode = (targetInfo || {}).node;
  var defaultSize = [containerWidth, containerHeight];
  if (!currNode || currNode === viewRoot) {
    return defaultSize;
  }
  var parent;
  var viewArea = containerWidth * containerHeight;
  var area = viewArea * seriesModel.option.zoomToNodeRatio;
  while (parent = currNode.parentNode) {
    var sum2 = 0;
    var siblings = parent.children;
    for (var i = 0, len2 = siblings.length; i < len2; i++) {
      sum2 += siblings[i].getValue();
    }
    var currNodeValue = currNode.getValue();
    if (currNodeValue === 0) {
      return defaultSize;
    }
    area *= sum2 / currNodeValue;
    var parentModel = parent.getModel();
    var borderWidth = parentModel.get(PATH_BORDER_WIDTH);
    var upperHeight = Math.max(borderWidth, getUpperLabelHeight(parentModel));
    area += 4 * borderWidth * borderWidth + (3 * borderWidth + upperHeight) * Math.pow(area, 0.5);
    area > MAX_SAFE_INTEGER && (area = MAX_SAFE_INTEGER);
    currNode = parent;
  }
  area < viewArea && (area = viewArea);
  var scale3 = Math.pow(area / viewArea, 0.5);
  return [containerWidth * scale3, containerHeight * scale3];
}
function calculateRootPosition(layoutInfo, rootRect, targetInfo) {
  if (rootRect) {
    return {
      x: rootRect.x,
      y: rootRect.y
    };
  }
  var defaultPosition = {
    x: 0,
    y: 0
  };
  if (!targetInfo) {
    return defaultPosition;
  }
  var targetNode = targetInfo.node;
  var layout2 = targetNode.getLayout();
  if (!layout2) {
    return defaultPosition;
  }
  var targetCenter = [layout2.width / 2, layout2.height / 2];
  var node = targetNode;
  while (node) {
    var nodeLayout = node.getLayout();
    targetCenter[0] += nodeLayout.x;
    targetCenter[1] += nodeLayout.y;
    node = node.parentNode;
  }
  return {
    x: layoutInfo.width / 2 - targetCenter[0],
    y: layoutInfo.height / 2 - targetCenter[1]
  };
}
function prunning(node, clipRect, viewAbovePath, viewRoot, depth) {
  var nodeLayout = node.getLayout();
  var nodeInViewAbovePath = viewAbovePath[depth];
  var isAboveViewRoot = nodeInViewAbovePath && nodeInViewAbovePath === node;
  if (nodeInViewAbovePath && !isAboveViewRoot || depth === viewAbovePath.length && node !== viewRoot) {
    return;
  }
  node.setLayout({
    // isInView means: viewRoot sub tree + viewAbovePath
    isInView: true,
    // invisible only means: outside view clip so that the node can not
    // see but still layout for animation preparation but not render.
    invisible: !isAboveViewRoot && !clipRect.intersect(nodeLayout),
    isAboveViewRoot
  }, true);
  var childClipRect = new BoundingRect_default(clipRect.x - nodeLayout.x, clipRect.y - nodeLayout.y, clipRect.width, clipRect.height);
  each2(node.viewChildren || [], function(child) {
    prunning(child, childClipRect, viewAbovePath, viewRoot, depth + 1);
  });
}
function getUpperLabelHeight(model) {
  return model.get(PATH_UPPER_LABEL_SHOW) ? model.get(PATH_UPPER_LABEL_HEIGHT) : 0;
}

// node_modules/echarts/lib/chart/treemap/install.js
function install12(registers) {
  registers.registerSeriesModel(TreemapSeries_default);
  registers.registerChartView(TreemapView_default);
  registers.registerVisual(treemapVisual_default);
  registers.registerLayout(treemapLayout_default);
  installTreemapAction(registers);
}

// node_modules/echarts/lib/chart/graph/categoryFilter.js
function categoryFilter(ecModel) {
  var legendModels = ecModel.findComponents({
    mainType: "legend"
  });
  if (!legendModels || !legendModels.length) {
    return;
  }
  ecModel.eachSeriesByType("graph", function(graphSeries) {
    var categoriesData = graphSeries.getCategoriesData();
    var graph = graphSeries.getGraph();
    var data = graph.data;
    var categoryNames = categoriesData.mapArray(categoriesData.getName);
    data.filterSelf(function(idx) {
      var model = data.getItemModel(idx);
      var category = model.getShallow("category");
      if (category != null) {
        if (isNumber(category)) {
          category = categoryNames[category];
        }
        for (var i = 0; i < legendModels.length; i++) {
          if (!legendModels[i].isSelected(category)) {
            return false;
          }
        }
      }
      return true;
    });
  });
}

// node_modules/echarts/lib/chart/graph/categoryVisual.js
function categoryVisual(ecModel) {
  var paletteScope = {};
  ecModel.eachSeriesByType("graph", function(seriesModel) {
    var categoriesData = seriesModel.getCategoriesData();
    var data = seriesModel.getData();
    var categoryNameIdxMap = {};
    categoriesData.each(function(idx) {
      var name = categoriesData.getName(idx);
      categoryNameIdxMap["ec-" + name] = idx;
      var itemModel = categoriesData.getItemModel(idx);
      var style = itemModel.getModel("itemStyle").getItemStyle();
      if (!style.fill) {
        style.fill = seriesModel.getColorFromPalette(name, paletteScope);
      }
      categoriesData.setItemVisual(idx, "style", style);
      var symbolVisualList = ["symbol", "symbolSize", "symbolKeepAspect"];
      for (var i = 0; i < symbolVisualList.length; i++) {
        var symbolVisual = itemModel.getShallow(symbolVisualList[i], true);
        if (symbolVisual != null) {
          categoriesData.setItemVisual(idx, symbolVisualList[i], symbolVisual);
        }
      }
    });
    if (categoriesData.count()) {
      data.each(function(idx) {
        var model = data.getItemModel(idx);
        var categoryIdx = model.getShallow("category");
        if (categoryIdx != null) {
          if (isString(categoryIdx)) {
            categoryIdx = categoryNameIdxMap["ec-" + categoryIdx];
          }
          var categoryStyle = categoriesData.getItemVisual(categoryIdx, "style");
          var style = data.ensureUniqueItemVisual(idx, "style");
          extend(style, categoryStyle);
          var visualList = ["symbol", "symbolSize", "symbolKeepAspect"];
          for (var i = 0; i < visualList.length; i++) {
            data.setItemVisual(idx, visualList[i], categoriesData.getItemVisual(categoryIdx, visualList[i]));
          }
        }
      });
    }
  });
}

// node_modules/echarts/lib/chart/graph/edgeVisual.js
function normalize2(a) {
  if (!(a instanceof Array)) {
    a = [a, a];
  }
  return a;
}
function graphEdgeVisual(ecModel) {
  ecModel.eachSeriesByType("graph", function(seriesModel) {
    var graph = seriesModel.getGraph();
    var edgeData = seriesModel.getEdgeData();
    var symbolType = normalize2(seriesModel.get("edgeSymbol"));
    var symbolSize = normalize2(seriesModel.get("edgeSymbolSize"));
    edgeData.setVisual("fromSymbol", symbolType && symbolType[0]);
    edgeData.setVisual("toSymbol", symbolType && symbolType[1]);
    edgeData.setVisual("fromSymbolSize", symbolSize && symbolSize[0]);
    edgeData.setVisual("toSymbolSize", symbolSize && symbolSize[1]);
    edgeData.setVisual("style", seriesModel.getModel("lineStyle").getLineStyle());
    edgeData.each(function(idx) {
      var itemModel = edgeData.getItemModel(idx);
      var edge = graph.getEdgeByIndex(idx);
      var symbolType2 = normalize2(itemModel.getShallow("symbol", true));
      var symbolSize2 = normalize2(itemModel.getShallow("symbolSize", true));
      var style = itemModel.getModel("lineStyle").getLineStyle();
      var existsStyle = edgeData.ensureUniqueItemVisual(idx, "style");
      extend(existsStyle, style);
      switch (existsStyle.stroke) {
        case "source": {
          var nodeStyle = edge.node1.getVisual("style");
          existsStyle.stroke = nodeStyle && nodeStyle.fill;
          break;
        }
        case "target": {
          var nodeStyle = edge.node2.getVisual("style");
          existsStyle.stroke = nodeStyle && nodeStyle.fill;
          break;
        }
      }
      symbolType2[0] && edge.setVisual("fromSymbol", symbolType2[0]);
      symbolType2[1] && edge.setVisual("toSymbol", symbolType2[1]);
      symbolSize2[0] && edge.setVisual("fromSymbolSize", symbolSize2[0]);
      symbolSize2[1] && edge.setVisual("toSymbolSize", symbolSize2[1]);
    });
  });
}

// node_modules/echarts/lib/chart/helper/multipleGraphEdgeHelper.js
var KEY_DELIMITER = "-->";
var getAutoCurvenessParams = function(seriesModel) {
  return seriesModel.get("autoCurveness") || null;
};
var createCurveness = function(seriesModel, appendLength) {
  var autoCurvenessParmas = getAutoCurvenessParams(seriesModel);
  var length = 20;
  var curvenessList = [];
  if (isNumber(autoCurvenessParmas)) {
    length = autoCurvenessParmas;
  } else if (isArray(autoCurvenessParmas)) {
    seriesModel.__curvenessList = autoCurvenessParmas;
    return;
  }
  if (appendLength > length) {
    length = appendLength;
  }
  var len2 = length % 2 ? length + 2 : length + 3;
  curvenessList = [];
  for (var i = 0; i < len2; i++) {
    curvenessList.push((i % 2 ? i + 1 : i) / 10 * (i % 2 ? -1 : 1));
  }
  seriesModel.__curvenessList = curvenessList;
};
var getKeyOfEdges = function(n1, n2, seriesModel) {
  var source = [n1.id, n1.dataIndex].join(".");
  var target = [n2.id, n2.dataIndex].join(".");
  return [seriesModel.uid, source, target].join(KEY_DELIMITER);
};
var getOppositeKey = function(key) {
  var keys2 = key.split(KEY_DELIMITER);
  return [keys2[0], keys2[2], keys2[1]].join(KEY_DELIMITER);
};
var getEdgeFromMap = function(edge, seriesModel) {
  var key = getKeyOfEdges(edge.node1, edge.node2, seriesModel);
  return seriesModel.__edgeMap[key];
};
var getTotalLengthBetweenNodes = function(edge, seriesModel) {
  var len2 = getEdgeMapLengthWithKey(getKeyOfEdges(edge.node1, edge.node2, seriesModel), seriesModel);
  var lenV = getEdgeMapLengthWithKey(getKeyOfEdges(edge.node2, edge.node1, seriesModel), seriesModel);
  return len2 + lenV;
};
var getEdgeMapLengthWithKey = function(key, seriesModel) {
  var edgeMap = seriesModel.__edgeMap;
  return edgeMap[key] ? edgeMap[key].length : 0;
};
function initCurvenessList(seriesModel) {
  if (!getAutoCurvenessParams(seriesModel)) {
    return;
  }
  seriesModel.__curvenessList = [];
  seriesModel.__edgeMap = {};
  createCurveness(seriesModel);
}
function createEdgeMapForCurveness(n1, n2, seriesModel, index) {
  if (!getAutoCurvenessParams(seriesModel)) {
    return;
  }
  var key = getKeyOfEdges(n1, n2, seriesModel);
  var edgeMap = seriesModel.__edgeMap;
  var oppositeEdges = edgeMap[getOppositeKey(key)];
  if (edgeMap[key] && !oppositeEdges) {
    edgeMap[key].isForward = true;
  } else if (oppositeEdges && edgeMap[key]) {
    oppositeEdges.isForward = true;
    edgeMap[key].isForward = false;
  }
  edgeMap[key] = edgeMap[key] || [];
  edgeMap[key].push(index);
}
function getCurvenessForEdge(edge, seriesModel, index, needReverse) {
  var autoCurvenessParams = getAutoCurvenessParams(seriesModel);
  var isArrayParam = isArray(autoCurvenessParams);
  if (!autoCurvenessParams) {
    return null;
  }
  var edgeArray = getEdgeFromMap(edge, seriesModel);
  if (!edgeArray) {
    return null;
  }
  var edgeIndex = -1;
  for (var i = 0; i < edgeArray.length; i++) {
    if (edgeArray[i] === index) {
      edgeIndex = i;
      break;
    }
  }
  var totalLen = getTotalLengthBetweenNodes(edge, seriesModel);
  createCurveness(seriesModel, totalLen);
  edge.lineStyle = edge.lineStyle || {};
  var curKey = getKeyOfEdges(edge.node1, edge.node2, seriesModel);
  var curvenessList = seriesModel.__curvenessList;
  var parityCorrection = isArrayParam ? 0 : totalLen % 2 ? 0 : 1;
  if (!edgeArray.isForward) {
    var oppositeKey = getOppositeKey(curKey);
    var len2 = getEdgeMapLengthWithKey(oppositeKey, seriesModel);
    var resValue = curvenessList[edgeIndex + len2 + parityCorrection];
    if (needReverse) {
      if (isArrayParam) {
        if (autoCurvenessParams && autoCurvenessParams[0] === 0) {
          return (len2 + parityCorrection) % 2 ? resValue : -resValue;
        } else {
          return ((len2 % 2 ? 0 : 1) + parityCorrection) % 2 ? resValue : -resValue;
        }
      } else {
        return (len2 + parityCorrection) % 2 ? resValue : -resValue;
      }
    } else {
      return curvenessList[edgeIndex + len2 + parityCorrection];
    }
  } else {
    return curvenessList[parityCorrection + edgeIndex];
  }
}

// node_modules/echarts/lib/chart/graph/simpleLayoutHelper.js
function simpleLayout(seriesModel) {
  var coordSys = seriesModel.coordinateSystem;
  if (coordSys && coordSys.type !== "view") {
    return;
  }
  var graph = seriesModel.getGraph();
  graph.eachNode(function(node) {
    var model = node.getModel();
    node.setLayout([+model.get("x"), +model.get("y")]);
  });
  simpleLayoutEdge(graph, seriesModel);
}
function simpleLayoutEdge(graph, seriesModel) {
  graph.eachEdge(function(edge, index) {
    var curveness = retrieve3(edge.getModel().get(["lineStyle", "curveness"]), -getCurvenessForEdge(edge, seriesModel, index, true), 0);
    var p1 = clone2(edge.node1.getLayout());
    var p2 = clone2(edge.node2.getLayout());
    var points = [p1, p2];
    if (+curveness) {
      points.push([(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness]);
    }
    edge.setLayout(points);
  });
}

// node_modules/echarts/lib/chart/graph/simpleLayout.js
function graphSimpleLayout(ecModel, api) {
  ecModel.eachSeriesByType("graph", function(seriesModel) {
    var layout2 = seriesModel.get("layout");
    var coordSys = seriesModel.coordinateSystem;
    if (coordSys && coordSys.type !== "view") {
      var data_1 = seriesModel.getData();
      var dimensions_1 = [];
      each(coordSys.dimensions, function(coordDim) {
        dimensions_1 = dimensions_1.concat(data_1.mapDimensionsAll(coordDim));
      });
      for (var dataIndex = 0; dataIndex < data_1.count(); dataIndex++) {
        var value = [];
        var hasValue = false;
        for (var i = 0; i < dimensions_1.length; i++) {
          var val = data_1.get(dimensions_1[i], dataIndex);
          if (!isNaN(val)) {
            hasValue = true;
          }
          value.push(val);
        }
        if (hasValue) {
          data_1.setItemLayout(dataIndex, coordSys.dataToPoint(value));
        } else {
          data_1.setItemLayout(dataIndex, [NaN, NaN]);
        }
      }
      simpleLayoutEdge(data_1.graph, seriesModel);
    } else if (!layout2 || layout2 === "none") {
      simpleLayout(seriesModel);
    }
  });
}

// node_modules/echarts/lib/chart/graph/graphHelper.js
function getNodeGlobalScale(seriesModel) {
  var coordSys = seriesModel.coordinateSystem;
  if (coordSys.type !== "view") {
    return 1;
  }
  var nodeScaleRatio = seriesModel.option.nodeScaleRatio;
  var groupZoom = coordSys.scaleX;
  var roamZoom = coordSys.getZoom();
  var nodeScale = (roamZoom - 1) * nodeScaleRatio + 1;
  return nodeScale / groupZoom;
}
function getSymbolSize(node) {
  var symbolSize = node.getVisual("symbolSize");
  if (symbolSize instanceof Array) {
    symbolSize = (symbolSize[0] + symbolSize[1]) / 2;
  }
  return +symbolSize;
}

// node_modules/echarts/lib/chart/graph/circularLayoutHelper.js
var PI = Math.PI;
var _symbolRadiansHalf = [];
function circularLayout(seriesModel, basedOn, draggingNode, pointer) {
  var coordSys = seriesModel.coordinateSystem;
  if (coordSys && coordSys.type !== "view") {
    return;
  }
  var rect = coordSys.getBoundingRect();
  var nodeData = seriesModel.getData();
  var graph = nodeData.graph;
  var cx = rect.width / 2 + rect.x;
  var cy = rect.height / 2 + rect.y;
  var r = Math.min(rect.width, rect.height) / 2;
  var count = nodeData.count();
  nodeData.setLayout({
    cx,
    cy
  });
  if (!count) {
    return;
  }
  if (draggingNode) {
    var _a = coordSys.pointToData(pointer), tempX = _a[0], tempY = _a[1];
    var v = [tempX - cx, tempY - cy];
    normalize(v, v);
    scale(v, v, r);
    draggingNode.setLayout([cx + v[0], cy + v[1]], true);
    var circularRotateLabel = seriesModel.get(["circular", "rotateLabel"]);
    rotateNodeLabel(draggingNode, circularRotateLabel, cx, cy);
  }
  _layoutNodesBasedOn[basedOn](seriesModel, graph, nodeData, r, cx, cy, count);
  graph.eachEdge(function(edge, index) {
    var curveness = retrieve3(edge.getModel().get(["lineStyle", "curveness"]), getCurvenessForEdge(edge, seriesModel, index), 0);
    var p1 = clone2(edge.node1.getLayout());
    var p2 = clone2(edge.node2.getLayout());
    var cp1;
    var x12 = (p1[0] + p2[0]) / 2;
    var y12 = (p1[1] + p2[1]) / 2;
    if (+curveness) {
      curveness *= 3;
      cp1 = [cx * curveness + x12 * (1 - curveness), cy * curveness + y12 * (1 - curveness)];
    }
    edge.setLayout([p1, p2, cp1]);
  });
}
var _layoutNodesBasedOn = {
  value: function(seriesModel, graph, nodeData, r, cx, cy, count) {
    var angle = 0;
    var sum2 = nodeData.getSum("value");
    var unitAngle = Math.PI * 2 / (sum2 || count);
    graph.eachNode(function(node) {
      var value = node.getValue("value");
      var radianHalf = unitAngle * (sum2 ? value : 1) / 2;
      angle += radianHalf;
      node.setLayout([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy]);
      angle += radianHalf;
    });
  },
  symbolSize: function(seriesModel, graph, nodeData, r, cx, cy, count) {
    var sumRadian = 0;
    _symbolRadiansHalf.length = count;
    var nodeScale = getNodeGlobalScale(seriesModel);
    graph.eachNode(function(node) {
      var symbolSize = getSymbolSize(node);
      isNaN(symbolSize) && (symbolSize = 2);
      symbolSize < 0 && (symbolSize = 0);
      symbolSize *= nodeScale;
      var symbolRadianHalf = Math.asin(symbolSize / 2 / r);
      isNaN(symbolRadianHalf) && (symbolRadianHalf = PI / 2);
      _symbolRadiansHalf[node.dataIndex] = symbolRadianHalf;
      sumRadian += symbolRadianHalf * 2;
    });
    var halfRemainRadian = (2 * PI - sumRadian) / count / 2;
    var angle = 0;
    graph.eachNode(function(node) {
      var radianHalf = halfRemainRadian + _symbolRadiansHalf[node.dataIndex];
      angle += radianHalf;
      (!node.getLayout() || !node.getLayout().fixed) && node.setLayout([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy]);
      angle += radianHalf;
    });
  }
};
function rotateNodeLabel(node, circularRotateLabel, cx, cy) {
  var el = node.getGraphicEl();
  if (!el) {
    return;
  }
  var nodeModel = node.getModel();
  var labelRotate = nodeModel.get(["label", "rotate"]) || 0;
  var symbolPath = el.getSymbolPath();
  if (circularRotateLabel) {
    var pos = node.getLayout();
    var rad = Math.atan2(pos[1] - cy, pos[0] - cx);
    if (rad < 0) {
      rad = Math.PI * 2 + rad;
    }
    var isLeft = pos[0] < cx;
    if (isLeft) {
      rad = rad - Math.PI;
    }
    var textPosition = isLeft ? "left" : "right";
    symbolPath.setTextConfig({
      rotation: -rad,
      position: textPosition,
      origin: "center"
    });
    var emphasisState = symbolPath.ensureState("emphasis");
    extend(emphasisState.textConfig || (emphasisState.textConfig = {}), {
      position: textPosition
    });
  } else {
    symbolPath.setTextConfig({
      rotation: labelRotate *= Math.PI / 180
    });
  }
}

// node_modules/echarts/lib/chart/graph/circularLayout.js
function graphCircularLayout(ecModel) {
  ecModel.eachSeriesByType("graph", function(seriesModel) {
    if (seriesModel.get("layout") === "circular") {
      circularLayout(seriesModel, "symbolSize");
    }
  });
}

// node_modules/echarts/lib/chart/graph/forceHelper.js
var scaleAndAdd2 = scaleAndAdd;
function forceLayout(inNodes, inEdges, opts) {
  var nodes = inNodes;
  var edges = inEdges;
  var rect = opts.rect;
  var width = rect.width;
  var height = rect.height;
  var center2 = [rect.x + width / 2, rect.y + height / 2];
  var gravity = opts.gravity == null ? 0.1 : opts.gravity;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    if (!n.p) {
      n.p = create(width * (Math.random() - 0.5) + center2[0], height * (Math.random() - 0.5) + center2[1]);
    }
    n.pp = clone2(n.p);
    n.edges = null;
  }
  var initialFriction = opts.friction == null ? 0.6 : opts.friction;
  var friction = initialFriction;
  var beforeStepCallback;
  var afterStepCallback;
  return {
    warmUp: function() {
      friction = initialFriction * 0.8;
    },
    setFixed: function(idx) {
      nodes[idx].fixed = true;
    },
    setUnfixed: function(idx) {
      nodes[idx].fixed = false;
    },
    /**
     * Before step hook
     */
    beforeStep: function(cb) {
      beforeStepCallback = cb;
    },
    /**
     * After step hook
     */
    afterStep: function(cb) {
      afterStepCallback = cb;
    },
    /**
     * Some formulas were originally copied from "d3.js"
     * https://github.com/d3/d3/blob/b516d77fb8566b576088e73410437494717ada26/src/layout/force.js
     * with some modifications made for this project.
     * See the license statement at the head of this file.
     */
    step: function(cb) {
      beforeStepCallback && beforeStepCallback(nodes, edges);
      var v12 = [];
      var nLen = nodes.length;
      for (var i2 = 0; i2 < edges.length; i2++) {
        var e = edges[i2];
        if (e.ignoreForceLayout) {
          continue;
        }
        var n1 = e.n1;
        var n2 = e.n2;
        sub(v12, n2.p, n1.p);
        var d = len(v12) - e.d;
        var w = n2.w / (n1.w + n2.w);
        if (isNaN(w)) {
          w = 0;
        }
        normalize(v12, v12);
        !n1.fixed && scaleAndAdd2(n1.p, n1.p, v12, w * d * friction);
        !n2.fixed && scaleAndAdd2(n2.p, n2.p, v12, -(1 - w) * d * friction);
      }
      for (var i2 = 0; i2 < nLen; i2++) {
        var n3 = nodes[i2];
        if (!n3.fixed) {
          sub(v12, center2, n3.p);
          scaleAndAdd2(n3.p, n3.p, v12, gravity * friction);
        }
      }
      for (var i2 = 0; i2 < nLen; i2++) {
        var n1 = nodes[i2];
        for (var j = i2 + 1; j < nLen; j++) {
          var n2 = nodes[j];
          sub(v12, n2.p, n1.p);
          var d = len(v12);
          if (d === 0) {
            set(v12, Math.random() - 0.5, Math.random() - 0.5);
            d = 1;
          }
          var repFact = (n1.rep + n2.rep) / d / d;
          !n1.fixed && scaleAndAdd2(n1.pp, n1.pp, v12, repFact);
          !n2.fixed && scaleAndAdd2(n2.pp, n2.pp, v12, -repFact);
        }
      }
      var v = [];
      for (var i2 = 0; i2 < nLen; i2++) {
        var n3 = nodes[i2];
        if (!n3.fixed) {
          sub(v, n3.p, n3.pp);
          scaleAndAdd2(n3.p, n3.p, v, friction);
          copy(n3.pp, n3.p);
        }
      }
      friction = friction * 0.992;
      var finished = friction < 0.01;
      afterStepCallback && afterStepCallback(nodes, edges, finished);
      cb && cb(finished);
    }
  };
}

// node_modules/echarts/lib/chart/graph/forceLayout.js
function graphForceLayout(ecModel) {
  ecModel.eachSeriesByType("graph", function(graphSeries) {
    var coordSys = graphSeries.coordinateSystem;
    if (coordSys && coordSys.type !== "view") {
      return;
    }
    if (graphSeries.get("layout") === "force") {
      var preservedPoints_1 = graphSeries.preservedPoints || {};
      var graph_1 = graphSeries.getGraph();
      var nodeData_1 = graph_1.data;
      var edgeData = graph_1.edgeData;
      var forceModel = graphSeries.getModel("force");
      var initLayout = forceModel.get("initLayout");
      if (graphSeries.preservedPoints) {
        nodeData_1.each(function(idx) {
          var id = nodeData_1.getId(idx);
          nodeData_1.setItemLayout(idx, preservedPoints_1[id] || [NaN, NaN]);
        });
      } else if (!initLayout || initLayout === "none") {
        simpleLayout(graphSeries);
      } else if (initLayout === "circular") {
        circularLayout(graphSeries, "value");
      }
      var nodeDataExtent_1 = nodeData_1.getDataExtent("value");
      var edgeDataExtent_1 = edgeData.getDataExtent("value");
      var repulsion = forceModel.get("repulsion");
      var edgeLength = forceModel.get("edgeLength");
      var repulsionArr_1 = isArray(repulsion) ? repulsion : [repulsion, repulsion];
      var edgeLengthArr_1 = isArray(edgeLength) ? edgeLength : [edgeLength, edgeLength];
      edgeLengthArr_1 = [edgeLengthArr_1[1], edgeLengthArr_1[0]];
      var nodes_1 = nodeData_1.mapArray("value", function(value, idx) {
        var point = nodeData_1.getItemLayout(idx);
        var rep = linearMap(value, nodeDataExtent_1, repulsionArr_1);
        if (isNaN(rep)) {
          rep = (repulsionArr_1[0] + repulsionArr_1[1]) / 2;
        }
        return {
          w: rep,
          rep,
          fixed: nodeData_1.getItemModel(idx).get("fixed"),
          p: !point || isNaN(point[0]) || isNaN(point[1]) ? null : point
        };
      });
      var edges = edgeData.mapArray("value", function(value, idx) {
        var edge = graph_1.getEdgeByIndex(idx);
        var d = linearMap(value, edgeDataExtent_1, edgeLengthArr_1);
        if (isNaN(d)) {
          d = (edgeLengthArr_1[0] + edgeLengthArr_1[1]) / 2;
        }
        var edgeModel = edge.getModel();
        var curveness = retrieve3(edge.getModel().get(["lineStyle", "curveness"]), -getCurvenessForEdge(edge, graphSeries, idx, true), 0);
        return {
          n1: nodes_1[edge.node1.dataIndex],
          n2: nodes_1[edge.node2.dataIndex],
          d,
          curveness,
          ignoreForceLayout: edgeModel.get("ignoreForceLayout")
        };
      });
      var rect = coordSys.getBoundingRect();
      var forceInstance = forceLayout(nodes_1, edges, {
        rect,
        gravity: forceModel.get("gravity"),
        friction: forceModel.get("friction")
      });
      forceInstance.beforeStep(function(nodes, edges2) {
        for (var i = 0, l = nodes.length; i < l; i++) {
          if (nodes[i].fixed) {
            copy(nodes[i].p, graph_1.getNodeByIndex(i).getLayout());
          }
        }
      });
      forceInstance.afterStep(function(nodes, edges2, stopped) {
        for (var i = 0, l = nodes.length; i < l; i++) {
          if (!nodes[i].fixed) {
            graph_1.getNodeByIndex(i).setLayout(nodes[i].p);
          }
          preservedPoints_1[nodeData_1.getId(i)] = nodes[i].p;
        }
        for (var i = 0, l = edges2.length; i < l; i++) {
          var e = edges2[i];
          var edge = graph_1.getEdgeByIndex(i);
          var p1 = e.n1.p;
          var p2 = e.n2.p;
          var points = edge.getLayout();
          points = points ? points.slice() : [];
          points[0] = points[0] || [];
          points[1] = points[1] || [];
          copy(points[0], p1);
          copy(points[1], p2);
          if (+e.curveness) {
            points[2] = [(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * e.curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * e.curveness];
          }
          edge.setLayout(points);
        }
      });
      graphSeries.forceLayout = forceInstance;
      graphSeries.preservedPoints = preservedPoints_1;
      forceInstance.step();
    } else {
      graphSeries.forceLayout = null;
    }
  });
}

// node_modules/echarts/lib/chart/graph/createView.js
function getViewRect3(seriesModel, api, aspect) {
  var option = extend(seriesModel.getBoxLayoutParams(), {
    aspect
  });
  return getLayoutRect(option, {
    width: api.getWidth(),
    height: api.getHeight()
  });
}
function createViewCoordSys(ecModel, api) {
  var viewList = [];
  ecModel.eachSeriesByType("graph", function(seriesModel) {
    var coordSysType = seriesModel.get("coordinateSystem");
    if (!coordSysType || coordSysType === "view") {
      var data_1 = seriesModel.getData();
      var positions = data_1.mapArray(function(idx) {
        var itemModel = data_1.getItemModel(idx);
        return [+itemModel.get("x"), +itemModel.get("y")];
      });
      var min = [];
      var max = [];
      fromPoints(positions, min, max);
      if (max[0] - min[0] === 0) {
        max[0] += 1;
        min[0] -= 1;
      }
      if (max[1] - min[1] === 0) {
        max[1] += 1;
        min[1] -= 1;
      }
      var aspect = (max[0] - min[0]) / (max[1] - min[1]);
      var viewRect = getViewRect3(seriesModel, api, aspect);
      if (isNaN(aspect)) {
        min = [viewRect.x, viewRect.y];
        max = [viewRect.x + viewRect.width, viewRect.y + viewRect.height];
      }
      var bbWidth = max[0] - min[0];
      var bbHeight = max[1] - min[1];
      var viewWidth = viewRect.width;
      var viewHeight = viewRect.height;
      var viewCoordSys = seriesModel.coordinateSystem = new View_default();
      viewCoordSys.zoomLimit = seriesModel.get("scaleLimit");
      viewCoordSys.setBoundingRect(min[0], min[1], bbWidth, bbHeight);
      viewCoordSys.setViewRect(viewRect.x, viewRect.y, viewWidth, viewHeight);
      viewCoordSys.setCenter(seriesModel.get("center"), api);
      viewCoordSys.setZoom(seriesModel.get("zoom"));
      viewList.push(viewCoordSys);
    }
  });
  return viewList;
}

// node_modules/echarts/lib/chart/graph/adjustEdge.js
var v1 = [];
var v2 = [];
var v3 = [];
var quadraticAt2 = quadraticAt;
var v2DistSquare = distSquare;
var mathAbs = Math.abs;
function intersectCurveCircle(curvePoints, center2, radius) {
  var p0 = curvePoints[0];
  var p1 = curvePoints[1];
  var p2 = curvePoints[2];
  var d = Infinity;
  var t;
  var radiusSquare = radius * radius;
  var interval = 0.1;
  for (var _t = 0.1; _t <= 0.9; _t += 0.1) {
    v1[0] = quadraticAt2(p0[0], p1[0], p2[0], _t);
    v1[1] = quadraticAt2(p0[1], p1[1], p2[1], _t);
    var diff = mathAbs(v2DistSquare(v1, center2) - radiusSquare);
    if (diff < d) {
      d = diff;
      t = _t;
    }
  }
  for (var i = 0; i < 32; i++) {
    var next = t + interval;
    v2[0] = quadraticAt2(p0[0], p1[0], p2[0], t);
    v2[1] = quadraticAt2(p0[1], p1[1], p2[1], t);
    v3[0] = quadraticAt2(p0[0], p1[0], p2[0], next);
    v3[1] = quadraticAt2(p0[1], p1[1], p2[1], next);
    var diff = v2DistSquare(v2, center2) - radiusSquare;
    if (mathAbs(diff) < 0.01) {
      break;
    }
    var nextDiff = v2DistSquare(v3, center2) - radiusSquare;
    interval /= 2;
    if (diff < 0) {
      if (nextDiff >= 0) {
        t = t + interval;
      } else {
        t = t - interval;
      }
    } else {
      if (nextDiff >= 0) {
        t = t - interval;
      } else {
        t = t + interval;
      }
    }
  }
  return t;
}
function adjustEdge(graph, scale3) {
  var tmp0 = [];
  var quadraticSubdivide2 = quadraticSubdivide;
  var pts = [[], [], []];
  var pts2 = [[], []];
  var v = [];
  scale3 /= 2;
  graph.eachEdge(function(edge, idx) {
    var linePoints = edge.getLayout();
    var fromSymbol = edge.getVisual("fromSymbol");
    var toSymbol = edge.getVisual("toSymbol");
    if (!linePoints.__original) {
      linePoints.__original = [clone2(linePoints[0]), clone2(linePoints[1])];
      if (linePoints[2]) {
        linePoints.__original.push(clone2(linePoints[2]));
      }
    }
    var originalPoints = linePoints.__original;
    if (linePoints[2] != null) {
      copy(pts[0], originalPoints[0]);
      copy(pts[1], originalPoints[2]);
      copy(pts[2], originalPoints[1]);
      if (fromSymbol && fromSymbol !== "none") {
        var symbolSize = getSymbolSize(edge.node1);
        var t = intersectCurveCircle(pts, originalPoints[0], symbolSize * scale3);
        quadraticSubdivide2(pts[0][0], pts[1][0], pts[2][0], t, tmp0);
        pts[0][0] = tmp0[3];
        pts[1][0] = tmp0[4];
        quadraticSubdivide2(pts[0][1], pts[1][1], pts[2][1], t, tmp0);
        pts[0][1] = tmp0[3];
        pts[1][1] = tmp0[4];
      }
      if (toSymbol && toSymbol !== "none") {
        var symbolSize = getSymbolSize(edge.node2);
        var t = intersectCurveCircle(pts, originalPoints[1], symbolSize * scale3);
        quadraticSubdivide2(pts[0][0], pts[1][0], pts[2][0], t, tmp0);
        pts[1][0] = tmp0[1];
        pts[2][0] = tmp0[2];
        quadraticSubdivide2(pts[0][1], pts[1][1], pts[2][1], t, tmp0);
        pts[1][1] = tmp0[1];
        pts[2][1] = tmp0[2];
      }
      copy(linePoints[0], pts[0]);
      copy(linePoints[1], pts[2]);
      copy(linePoints[2], pts[1]);
    } else {
      copy(pts2[0], originalPoints[0]);
      copy(pts2[1], originalPoints[1]);
      sub(v, pts2[1], pts2[0]);
      normalize(v, v);
      if (fromSymbol && fromSymbol !== "none") {
        var symbolSize = getSymbolSize(edge.node1);
        scaleAndAdd(pts2[0], pts2[0], v, symbolSize * scale3);
      }
      if (toSymbol && toSymbol !== "none") {
        var symbolSize = getSymbolSize(edge.node2);
        scaleAndAdd(pts2[1], pts2[1], v, -symbolSize * scale3);
      }
      copy(linePoints[0], pts2[0]);
      copy(linePoints[1], pts2[1]);
    }
  });
}

// node_modules/echarts/lib/chart/graph/GraphView.js
function isViewCoordSys(coordSys) {
  return coordSys.type === "view";
}
var GraphView = (
  /** @class */
  function(_super) {
    __extends(GraphView2, _super);
    function GraphView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = GraphView2.type;
      return _this;
    }
    GraphView2.prototype.init = function(ecModel, api) {
      var symbolDraw = new SymbolDraw_default();
      var lineDraw = new LineDraw_default();
      var group = this.group;
      this._controller = new RoamController_default(api.getZr());
      this._controllerHost = {
        target: group
      };
      group.add(symbolDraw.group);
      group.add(lineDraw.group);
      this._symbolDraw = symbolDraw;
      this._lineDraw = lineDraw;
      this._firstRender = true;
    };
    GraphView2.prototype.render = function(seriesModel, ecModel, api) {
      var _this = this;
      var coordSys = seriesModel.coordinateSystem;
      this._model = seriesModel;
      var symbolDraw = this._symbolDraw;
      var lineDraw = this._lineDraw;
      var group = this.group;
      if (isViewCoordSys(coordSys)) {
        var groupNewProp = {
          x: coordSys.x,
          y: coordSys.y,
          scaleX: coordSys.scaleX,
          scaleY: coordSys.scaleY
        };
        if (this._firstRender) {
          group.attr(groupNewProp);
        } else {
          updateProps(group, groupNewProp, seriesModel);
        }
      }
      adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));
      var data = seriesModel.getData();
      symbolDraw.updateData(data);
      var edgeData = seriesModel.getEdgeData();
      lineDraw.updateData(edgeData);
      this._updateNodeAndLinkScale();
      this._updateController(seriesModel, ecModel, api);
      clearTimeout(this._layoutTimeout);
      var forceLayout2 = seriesModel.forceLayout;
      var layoutAnimation = seriesModel.get(["force", "layoutAnimation"]);
      if (forceLayout2) {
        this._startForceLayoutIteration(forceLayout2, layoutAnimation);
      }
      var layout2 = seriesModel.get("layout");
      data.graph.eachNode(function(node) {
        var idx = node.dataIndex;
        var el = node.getGraphicEl();
        var itemModel = node.getModel();
        if (!el) {
          return;
        }
        el.off("drag").off("dragend");
        var draggable = itemModel.get("draggable");
        if (draggable) {
          el.on("drag", function(e) {
            switch (layout2) {
              case "force":
                forceLayout2.warmUp();
                !_this._layouting && _this._startForceLayoutIteration(forceLayout2, layoutAnimation);
                forceLayout2.setFixed(idx);
                data.setItemLayout(idx, [el.x, el.y]);
                break;
              case "circular":
                data.setItemLayout(idx, [el.x, el.y]);
                node.setLayout({
                  fixed: true
                }, true);
                circularLayout(seriesModel, "symbolSize", node, [e.offsetX, e.offsetY]);
                _this.updateLayout(seriesModel);
                break;
              case "none":
              default:
                data.setItemLayout(idx, [el.x, el.y]);
                simpleLayoutEdge(seriesModel.getGraph(), seriesModel);
                _this.updateLayout(seriesModel);
                break;
            }
          }).on("dragend", function() {
            if (forceLayout2) {
              forceLayout2.setUnfixed(idx);
            }
          });
        }
        el.setDraggable(draggable, !!itemModel.get("cursor"));
        var focus = itemModel.get(["emphasis", "focus"]);
        if (focus === "adjacency") {
          getECData(el).focus = node.getAdjacentDataIndices();
        }
      });
      data.graph.eachEdge(function(edge) {
        var el = edge.getGraphicEl();
        var focus = edge.getModel().get(["emphasis", "focus"]);
        if (!el) {
          return;
        }
        if (focus === "adjacency") {
          getECData(el).focus = {
            edge: [edge.dataIndex],
            node: [edge.node1.dataIndex, edge.node2.dataIndex]
          };
        }
      });
      var circularRotateLabel = seriesModel.get("layout") === "circular" && seriesModel.get(["circular", "rotateLabel"]);
      var cx = data.getLayout("cx");
      var cy = data.getLayout("cy");
      data.graph.eachNode(function(node) {
        rotateNodeLabel(node, circularRotateLabel, cx, cy);
      });
      this._firstRender = false;
    };
    GraphView2.prototype.dispose = function() {
      this.remove();
      this._controller && this._controller.dispose();
      this._controllerHost = null;
    };
    GraphView2.prototype._startForceLayoutIteration = function(forceLayout2, layoutAnimation) {
      var self = this;
      (function step() {
        forceLayout2.step(function(stopped) {
          self.updateLayout(self._model);
          (self._layouting = !stopped) && (layoutAnimation ? self._layoutTimeout = setTimeout(step, 16) : step());
        });
      })();
    };
    GraphView2.prototype._updateController = function(seriesModel, ecModel, api) {
      var _this = this;
      var controller = this._controller;
      var controllerHost = this._controllerHost;
      var group = this.group;
      controller.setPointerChecker(function(e, x, y) {
        var rect = group.getBoundingRect();
        rect.applyTransform(group.transform);
        return rect.contain(x, y) && !onIrrelevantElement(e, api, seriesModel);
      });
      if (!isViewCoordSys(seriesModel.coordinateSystem)) {
        controller.disable();
        return;
      }
      controller.enable(seriesModel.get("roam"));
      controllerHost.zoomLimit = seriesModel.get("scaleLimit");
      controllerHost.zoom = seriesModel.coordinateSystem.getZoom();
      controller.off("pan").off("zoom").on("pan", function(e) {
        updateViewOnPan(controllerHost, e.dx, e.dy);
        api.dispatchAction({
          seriesId: seriesModel.id,
          type: "graphRoam",
          dx: e.dx,
          dy: e.dy
        });
      }).on("zoom", function(e) {
        updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
        api.dispatchAction({
          seriesId: seriesModel.id,
          type: "graphRoam",
          zoom: e.scale,
          originX: e.originX,
          originY: e.originY
        });
        _this._updateNodeAndLinkScale();
        adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));
        _this._lineDraw.updateLayout();
        api.updateLabelLayout();
      });
    };
    GraphView2.prototype._updateNodeAndLinkScale = function() {
      var seriesModel = this._model;
      var data = seriesModel.getData();
      var nodeScale = getNodeGlobalScale(seriesModel);
      data.eachItemGraphicEl(function(el, idx) {
        el && el.setSymbolScale(nodeScale);
      });
    };
    GraphView2.prototype.updateLayout = function(seriesModel) {
      adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));
      this._symbolDraw.updateLayout();
      this._lineDraw.updateLayout();
    };
    GraphView2.prototype.remove = function() {
      clearTimeout(this._layoutTimeout);
      this._layouting = false;
      this._layoutTimeout = null;
      this._symbolDraw && this._symbolDraw.remove();
      this._lineDraw && this._lineDraw.remove();
    };
    GraphView2.type = "graph";
    return GraphView2;
  }(Chart_default)
);
var GraphView_default = GraphView;

// node_modules/echarts/lib/data/Graph.js
function generateNodeKey(id) {
  return "_EC_" + id;
}
var Graph = (
  /** @class */
  function() {
    function Graph2(directed) {
      this.type = "graph";
      this.nodes = [];
      this.edges = [];
      this._nodesMap = {};
      this._edgesMap = {};
      this._directed = directed || false;
    }
    Graph2.prototype.isDirected = function() {
      return this._directed;
    };
    ;
    Graph2.prototype.addNode = function(id, dataIndex) {
      id = id == null ? "" + dataIndex : "" + id;
      var nodesMap = this._nodesMap;
      if (nodesMap[generateNodeKey(id)]) {
        if (true) {
          console.error("Graph nodes have duplicate name or id");
        }
        return;
      }
      var node = new GraphNode(id, dataIndex);
      node.hostGraph = this;
      this.nodes.push(node);
      nodesMap[generateNodeKey(id)] = node;
      return node;
    };
    ;
    Graph2.prototype.getNodeByIndex = function(dataIndex) {
      var rawIdx = this.data.getRawIndex(dataIndex);
      return this.nodes[rawIdx];
    };
    ;
    Graph2.prototype.getNodeById = function(id) {
      return this._nodesMap[generateNodeKey(id)];
    };
    ;
    Graph2.prototype.addEdge = function(n1, n2, dataIndex) {
      var nodesMap = this._nodesMap;
      var edgesMap = this._edgesMap;
      if (isNumber(n1)) {
        n1 = this.nodes[n1];
      }
      if (isNumber(n2)) {
        n2 = this.nodes[n2];
      }
      if (!(n1 instanceof GraphNode)) {
        n1 = nodesMap[generateNodeKey(n1)];
      }
      if (!(n2 instanceof GraphNode)) {
        n2 = nodesMap[generateNodeKey(n2)];
      }
      if (!n1 || !n2) {
        return;
      }
      var key = n1.id + "-" + n2.id;
      var edge = new GraphEdge(n1, n2, dataIndex);
      edge.hostGraph = this;
      if (this._directed) {
        n1.outEdges.push(edge);
        n2.inEdges.push(edge);
      }
      n1.edges.push(edge);
      if (n1 !== n2) {
        n2.edges.push(edge);
      }
      this.edges.push(edge);
      edgesMap[key] = edge;
      return edge;
    };
    ;
    Graph2.prototype.getEdgeByIndex = function(dataIndex) {
      var rawIdx = this.edgeData.getRawIndex(dataIndex);
      return this.edges[rawIdx];
    };
    ;
    Graph2.prototype.getEdge = function(n1, n2) {
      if (n1 instanceof GraphNode) {
        n1 = n1.id;
      }
      if (n2 instanceof GraphNode) {
        n2 = n2.id;
      }
      var edgesMap = this._edgesMap;
      if (this._directed) {
        return edgesMap[n1 + "-" + n2];
      } else {
        return edgesMap[n1 + "-" + n2] || edgesMap[n2 + "-" + n1];
      }
    };
    ;
    Graph2.prototype.eachNode = function(cb, context) {
      var nodes = this.nodes;
      var len2 = nodes.length;
      for (var i = 0; i < len2; i++) {
        if (nodes[i].dataIndex >= 0) {
          cb.call(context, nodes[i], i);
        }
      }
    };
    ;
    Graph2.prototype.eachEdge = function(cb, context) {
      var edges = this.edges;
      var len2 = edges.length;
      for (var i = 0; i < len2; i++) {
        if (edges[i].dataIndex >= 0 && edges[i].node1.dataIndex >= 0 && edges[i].node2.dataIndex >= 0) {
          cb.call(context, edges[i], i);
        }
      }
    };
    ;
    Graph2.prototype.breadthFirstTraverse = function(cb, startNode, direction, context) {
      if (!(startNode instanceof GraphNode)) {
        startNode = this._nodesMap[generateNodeKey(startNode)];
      }
      if (!startNode) {
        return;
      }
      var edgeType = direction === "out" ? "outEdges" : direction === "in" ? "inEdges" : "edges";
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].__visited = false;
      }
      if (cb.call(context, startNode, null)) {
        return;
      }
      var queue = [startNode];
      while (queue.length) {
        var currentNode = queue.shift();
        var edges = currentNode[edgeType];
        for (var i = 0; i < edges.length; i++) {
          var e = edges[i];
          var otherNode = e.node1 === currentNode ? e.node2 : e.node1;
          if (!otherNode.__visited) {
            if (cb.call(context, otherNode, currentNode)) {
              return;
            }
            queue.push(otherNode);
            otherNode.__visited = true;
          }
        }
      }
    };
    ;
    Graph2.prototype.update = function() {
      var data = this.data;
      var edgeData = this.edgeData;
      var nodes = this.nodes;
      var edges = this.edges;
      for (var i = 0, len2 = nodes.length; i < len2; i++) {
        nodes[i].dataIndex = -1;
      }
      for (var i = 0, len2 = data.count(); i < len2; i++) {
        nodes[data.getRawIndex(i)].dataIndex = i;
      }
      edgeData.filterSelf(function(idx) {
        var edge = edges[edgeData.getRawIndex(idx)];
        return edge.node1.dataIndex >= 0 && edge.node2.dataIndex >= 0;
      });
      for (var i = 0, len2 = edges.length; i < len2; i++) {
        edges[i].dataIndex = -1;
      }
      for (var i = 0, len2 = edgeData.count(); i < len2; i++) {
        edges[edgeData.getRawIndex(i)].dataIndex = i;
      }
    };
    ;
    Graph2.prototype.clone = function() {
      var graph = new Graph2(this._directed);
      var nodes = this.nodes;
      var edges = this.edges;
      for (var i = 0; i < nodes.length; i++) {
        graph.addNode(nodes[i].id, nodes[i].dataIndex);
      }
      for (var i = 0; i < edges.length; i++) {
        var e = edges[i];
        graph.addEdge(e.node1.id, e.node2.id, e.dataIndex);
      }
      return graph;
    };
    ;
    return Graph2;
  }()
);
var GraphNode = (
  /** @class */
  function() {
    function GraphNode2(id, dataIndex) {
      this.inEdges = [];
      this.outEdges = [];
      this.edges = [];
      this.dataIndex = -1;
      this.id = id == null ? "" : id;
      this.dataIndex = dataIndex == null ? -1 : dataIndex;
    }
    GraphNode2.prototype.degree = function() {
      return this.edges.length;
    };
    GraphNode2.prototype.inDegree = function() {
      return this.inEdges.length;
    };
    GraphNode2.prototype.outDegree = function() {
      return this.outEdges.length;
    };
    GraphNode2.prototype.getModel = function(path) {
      if (this.dataIndex < 0) {
        return;
      }
      var graph = this.hostGraph;
      var itemModel = graph.data.getItemModel(this.dataIndex);
      return itemModel.getModel(path);
    };
    GraphNode2.prototype.getAdjacentDataIndices = function() {
      var dataIndices = {
        edge: [],
        node: []
      };
      for (var i = 0; i < this.edges.length; i++) {
        var adjacentEdge = this.edges[i];
        if (adjacentEdge.dataIndex < 0) {
          continue;
        }
        dataIndices.edge.push(adjacentEdge.dataIndex);
        dataIndices.node.push(adjacentEdge.node1.dataIndex, adjacentEdge.node2.dataIndex);
      }
      return dataIndices;
    };
    GraphNode2.prototype.getTrajectoryDataIndices = function() {
      var connectedEdgesMap = createHashMap();
      var connectedNodesMap = createHashMap();
      for (var i = 0; i < this.edges.length; i++) {
        var adjacentEdge = this.edges[i];
        if (adjacentEdge.dataIndex < 0) {
          continue;
        }
        connectedEdgesMap.set(adjacentEdge.dataIndex, true);
        var sourceNodesQueue = [adjacentEdge.node1];
        var targetNodesQueue = [adjacentEdge.node2];
        var nodeIteratorIndex = 0;
        while (nodeIteratorIndex < sourceNodesQueue.length) {
          var sourceNode = sourceNodesQueue[nodeIteratorIndex];
          nodeIteratorIndex++;
          connectedNodesMap.set(sourceNode.dataIndex, true);
          for (var j = 0; j < sourceNode.inEdges.length; j++) {
            connectedEdgesMap.set(sourceNode.inEdges[j].dataIndex, true);
            sourceNodesQueue.push(sourceNode.inEdges[j].node1);
          }
        }
        nodeIteratorIndex = 0;
        while (nodeIteratorIndex < targetNodesQueue.length) {
          var targetNode = targetNodesQueue[nodeIteratorIndex];
          nodeIteratorIndex++;
          connectedNodesMap.set(targetNode.dataIndex, true);
          for (var j = 0; j < targetNode.outEdges.length; j++) {
            connectedEdgesMap.set(targetNode.outEdges[j].dataIndex, true);
            targetNodesQueue.push(targetNode.outEdges[j].node2);
          }
        }
      }
      return {
        edge: connectedEdgesMap.keys(),
        node: connectedNodesMap.keys()
      };
    };
    return GraphNode2;
  }()
);
var GraphEdge = (
  /** @class */
  function() {
    function GraphEdge2(n1, n2, dataIndex) {
      this.dataIndex = -1;
      this.node1 = n1;
      this.node2 = n2;
      this.dataIndex = dataIndex == null ? -1 : dataIndex;
    }
    GraphEdge2.prototype.getModel = function(path) {
      if (this.dataIndex < 0) {
        return;
      }
      var graph = this.hostGraph;
      var itemModel = graph.edgeData.getItemModel(this.dataIndex);
      return itemModel.getModel(path);
    };
    GraphEdge2.prototype.getAdjacentDataIndices = function() {
      return {
        edge: [this.dataIndex],
        node: [this.node1.dataIndex, this.node2.dataIndex]
      };
    };
    GraphEdge2.prototype.getTrajectoryDataIndices = function() {
      var connectedEdgesMap = createHashMap();
      var connectedNodesMap = createHashMap();
      connectedEdgesMap.set(this.dataIndex, true);
      var sourceNodes = [this.node1];
      var targetNodes = [this.node2];
      var nodeIteratorIndex = 0;
      while (nodeIteratorIndex < sourceNodes.length) {
        var sourceNode = sourceNodes[nodeIteratorIndex];
        nodeIteratorIndex++;
        connectedNodesMap.set(sourceNode.dataIndex, true);
        for (var j = 0; j < sourceNode.inEdges.length; j++) {
          connectedEdgesMap.set(sourceNode.inEdges[j].dataIndex, true);
          sourceNodes.push(sourceNode.inEdges[j].node1);
        }
      }
      nodeIteratorIndex = 0;
      while (nodeIteratorIndex < targetNodes.length) {
        var targetNode = targetNodes[nodeIteratorIndex];
        nodeIteratorIndex++;
        connectedNodesMap.set(targetNode.dataIndex, true);
        for (var j = 0; j < targetNode.outEdges.length; j++) {
          connectedEdgesMap.set(targetNode.outEdges[j].dataIndex, true);
          targetNodes.push(targetNode.outEdges[j].node2);
        }
      }
      return {
        edge: connectedEdgesMap.keys(),
        node: connectedNodesMap.keys()
      };
    };
    return GraphEdge2;
  }()
);
function createGraphDataProxyMixin(hostName, dataName) {
  return {
    /**
     * @param Default 'value'. can be 'a', 'b', 'c', 'd', 'e'.
     */
    getValue: function(dimension) {
      var data = this[hostName][dataName];
      return data.getStore().get(data.getDimensionIndex(dimension || "value"), this.dataIndex);
    },
    // TODO: TYPE stricter type.
    setVisual: function(key, value) {
      this.dataIndex >= 0 && this[hostName][dataName].setItemVisual(this.dataIndex, key, value);
    },
    getVisual: function(key) {
      return this[hostName][dataName].getItemVisual(this.dataIndex, key);
    },
    setLayout: function(layout2, merge2) {
      this.dataIndex >= 0 && this[hostName][dataName].setItemLayout(this.dataIndex, layout2, merge2);
    },
    getLayout: function() {
      return this[hostName][dataName].getItemLayout(this.dataIndex);
    },
    getGraphicEl: function() {
      return this[hostName][dataName].getItemGraphicEl(this.dataIndex);
    },
    getRawIndex: function() {
      return this[hostName][dataName].getRawIndex(this.dataIndex);
    }
  };
}
mixin(GraphNode, createGraphDataProxyMixin("hostGraph", "data"));
mixin(GraphEdge, createGraphDataProxyMixin("hostGraph", "edgeData"));
var Graph_default = Graph;

// node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge.js
function createGraphFromNodeEdge(nodes, edges, seriesModel, directed, beforeLink) {
  var graph = new Graph_default(directed);
  for (var i = 0; i < nodes.length; i++) {
    graph.addNode(retrieve(
      // Id, name, dataIndex
      nodes[i].id,
      nodes[i].name,
      i
    ), i);
  }
  var linkNameList = [];
  var validEdges = [];
  var linkCount = 0;
  for (var i = 0; i < edges.length; i++) {
    var link = edges[i];
    var source = link.source;
    var target = link.target;
    if (graph.addEdge(source, target, linkCount)) {
      validEdges.push(link);
      linkNameList.push(retrieve(convertOptionIdName(link.id, null), source + " > " + target));
      linkCount++;
    }
  }
  var coordSys = seriesModel.get("coordinateSystem");
  var nodeData;
  if (coordSys === "cartesian2d" || coordSys === "polar") {
    nodeData = createSeriesData_default(nodes, seriesModel);
  } else {
    var coordSysCtor = CoordinateSystem_default.get(coordSys);
    var coordDimensions = coordSysCtor ? coordSysCtor.dimensions || [] : [];
    if (indexOf(coordDimensions, "value") < 0) {
      coordDimensions.concat(["value"]);
    }
    var dimensions = prepareSeriesDataSchema(nodes, {
      coordDimensions,
      encodeDefine: seriesModel.getEncode()
    }).dimensions;
    nodeData = new SeriesData_default(dimensions, seriesModel);
    nodeData.initData(nodes);
  }
  var edgeData = new SeriesData_default(["value"], seriesModel);
  edgeData.initData(validEdges, linkNameList);
  beforeLink && beforeLink(nodeData, edgeData);
  linkSeriesData_default({
    mainData: nodeData,
    struct: graph,
    structAttr: "graph",
    datas: {
      node: nodeData,
      edge: edgeData
    },
    datasAttr: {
      node: "data",
      edge: "edgeData"
    }
  });
  graph.update();
  return graph;
}

// node_modules/echarts/lib/chart/graph/GraphSeries.js
var GraphSeriesModel = (
  /** @class */
  function(_super) {
    __extends(GraphSeriesModel2, _super);
    function GraphSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = GraphSeriesModel2.type;
      _this.hasSymbolVisual = true;
      return _this;
    }
    GraphSeriesModel2.prototype.init = function(option) {
      _super.prototype.init.apply(this, arguments);
      var self = this;
      function getCategoriesData() {
        return self._categoriesData;
      }
      this.legendVisualProvider = new LegendVisualProvider_default(getCategoriesData, getCategoriesData);
      this.fillDataTextStyle(option.edges || option.links);
      this._updateCategoriesData();
    };
    GraphSeriesModel2.prototype.mergeOption = function(option) {
      _super.prototype.mergeOption.apply(this, arguments);
      this.fillDataTextStyle(option.edges || option.links);
      this._updateCategoriesData();
    };
    GraphSeriesModel2.prototype.mergeDefaultAndTheme = function(option) {
      _super.prototype.mergeDefaultAndTheme.apply(this, arguments);
      defaultEmphasis(option, "edgeLabel", ["show"]);
    };
    GraphSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      var edges = option.edges || option.links || [];
      var nodes = option.data || option.nodes || [];
      var self = this;
      if (nodes && edges) {
        initCurvenessList(this);
        var graph = createGraphFromNodeEdge(nodes, edges, this, true, beforeLink);
        each(graph.edges, function(edge) {
          createEdgeMapForCurveness(edge.node1, edge.node2, this, edge.dataIndex);
        }, this);
        return graph.data;
      }
      function beforeLink(nodeData, edgeData) {
        nodeData.wrapMethod("getItemModel", function(model) {
          var categoriesModels = self._categoriesModels;
          var categoryIdx = model.getShallow("category");
          var categoryModel = categoriesModels[categoryIdx];
          if (categoryModel) {
            categoryModel.parentModel = model.parentModel;
            model.parentModel = categoryModel;
          }
          return model;
        });
        var oldGetModel = Model_default.prototype.getModel;
        function newGetModel(path, parentModel) {
          var model = oldGetModel.call(this, path, parentModel);
          model.resolveParentPath = resolveParentPath;
          return model;
        }
        edgeData.wrapMethod("getItemModel", function(model) {
          model.resolveParentPath = resolveParentPath;
          model.getModel = newGetModel;
          return model;
        });
        function resolveParentPath(pathArr) {
          if (pathArr && (pathArr[0] === "label" || pathArr[1] === "label")) {
            var newPathArr = pathArr.slice();
            if (pathArr[0] === "label") {
              newPathArr[0] = "edgeLabel";
            } else if (pathArr[1] === "label") {
              newPathArr[1] = "edgeLabel";
            }
            return newPathArr;
          }
          return pathArr;
        }
      }
    };
    GraphSeriesModel2.prototype.getGraph = function() {
      return this.getData().graph;
    };
    GraphSeriesModel2.prototype.getEdgeData = function() {
      return this.getGraph().edgeData;
    };
    GraphSeriesModel2.prototype.getCategoriesData = function() {
      return this._categoriesData;
    };
    GraphSeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      if (dataType === "edge") {
        var nodeData = this.getData();
        var params = this.getDataParams(dataIndex, dataType);
        var edge = nodeData.graph.getEdgeByIndex(dataIndex);
        var sourceName = nodeData.getName(edge.node1.dataIndex);
        var targetName = nodeData.getName(edge.node2.dataIndex);
        var nameArr = [];
        sourceName != null && nameArr.push(sourceName);
        targetName != null && nameArr.push(targetName);
        return createTooltipMarkup("nameValue", {
          name: nameArr.join(" > "),
          value: params.value,
          noValue: params.value == null
        });
      }
      var nodeMarkup = defaultSeriesFormatTooltip({
        series: this,
        dataIndex,
        multipleSeries
      });
      return nodeMarkup;
    };
    GraphSeriesModel2.prototype._updateCategoriesData = function() {
      var categories = map(this.option.categories || [], function(category) {
        return category.value != null ? category : extend({
          value: 0
        }, category);
      });
      var categoriesData = new SeriesData_default(["value"], this);
      categoriesData.initData(categories);
      this._categoriesData = categoriesData;
      this._categoriesModels = categoriesData.mapArray(function(idx) {
        return categoriesData.getItemModel(idx);
      });
    };
    GraphSeriesModel2.prototype.setZoom = function(zoom) {
      this.option.zoom = zoom;
    };
    GraphSeriesModel2.prototype.setCenter = function(center2) {
      this.option.center = center2;
    };
    GraphSeriesModel2.prototype.isAnimationEnabled = function() {
      return _super.prototype.isAnimationEnabled.call(this) && !(this.get("layout") === "force" && this.get(["force", "layoutAnimation"]));
    };
    GraphSeriesModel2.type = "series.graph";
    GraphSeriesModel2.dependencies = ["grid", "polar", "geo", "singleAxis", "calendar"];
    GraphSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "view",
      // Default option for all coordinate systems
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      // polarIndex: 0,
      // geoIndex: 0,
      legendHoverLink: true,
      layout: null,
      // Configuration of circular layout
      circular: {
        rotateLabel: false
      },
      // Configuration of force directed layout
      force: {
        initLayout: null,
        // Node repulsion. Can be an array to represent range.
        repulsion: [0, 50],
        gravity: 0.1,
        // Initial friction
        friction: 0.6,
        // Edge length. Can be an array to represent range.
        edgeLength: 30,
        layoutAnimation: true
      },
      left: "center",
      top: "center",
      // right: null,
      // bottom: null,
      // width: '80%',
      // height: '80%',
      symbol: "circle",
      symbolSize: 10,
      edgeSymbol: ["none", "none"],
      edgeSymbolSize: 10,
      edgeLabel: {
        position: "middle",
        distance: 5
      },
      draggable: false,
      roam: false,
      // Default on center of graph
      center: null,
      zoom: 1,
      // Symbol size scale ratio in roam
      nodeScaleRatio: 0.6,
      // cursor: null,
      // categories: [],
      // data: []
      // Or
      // nodes: []
      //
      // links: []
      // Or
      // edges: []
      label: {
        show: false,
        formatter: "{b}"
      },
      itemStyle: {},
      lineStyle: {
        color: "#aaa",
        width: 1,
        opacity: 0.5
      },
      emphasis: {
        scale: true,
        label: {
          show: true
        }
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      }
    };
    return GraphSeriesModel2;
  }(Series_default)
);
var GraphSeries_default = GraphSeriesModel;

// node_modules/echarts/lib/chart/graph/install.js
var actionInfo = {
  type: "graphRoam",
  event: "graphRoam",
  update: "none"
};
function install13(registers) {
  registers.registerChartView(GraphView_default);
  registers.registerSeriesModel(GraphSeries_default);
  registers.registerProcessor(categoryFilter);
  registers.registerVisual(categoryVisual);
  registers.registerVisual(graphEdgeVisual);
  registers.registerLayout(graphSimpleLayout);
  registers.registerLayout(registers.PRIORITY.VISUAL.POST_CHART_LAYOUT, graphCircularLayout);
  registers.registerLayout(graphForceLayout);
  registers.registerCoordinateSystem("graphView", {
    dimensions: View_default.dimensions,
    create: createViewCoordSys
  });
  registers.registerAction({
    type: "focusNodeAdjacency",
    event: "focusNodeAdjacency",
    update: "series:focusNodeAdjacency"
  }, noop);
  registers.registerAction({
    type: "unfocusNodeAdjacency",
    event: "unfocusNodeAdjacency",
    update: "series:unfocusNodeAdjacency"
  }, noop);
  registers.registerAction(actionInfo, function(payload, ecModel, api) {
    ecModel.eachComponent({
      mainType: "series",
      query: payload
    }, function(seriesModel) {
      var coordSys = seriesModel.coordinateSystem;
      var res = updateCenterAndZoom(coordSys, payload, void 0, api);
      seriesModel.setCenter && seriesModel.setCenter(res.center);
      seriesModel.setZoom && seriesModel.setZoom(res.zoom);
    });
  });
}

// node_modules/echarts/lib/chart/gauge/PointerPath.js
var PointerShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function PointerShape2() {
      this.angle = 0;
      this.width = 10;
      this.r = 10;
      this.x = 0;
      this.y = 0;
    }
    return PointerShape2;
  }()
);
var PointerPath = (
  /** @class */
  function(_super) {
    __extends(PointerPath2, _super);
    function PointerPath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "pointer";
      return _this;
    }
    PointerPath2.prototype.getDefaultShape = function() {
      return new PointerShape();
    };
    PointerPath2.prototype.buildPath = function(ctx, shape) {
      var mathCos = Math.cos;
      var mathSin = Math.sin;
      var r = shape.r;
      var width = shape.width;
      var angle = shape.angle;
      var x = shape.x - mathCos(angle) * width * (width >= r / 3 ? 1 : 2);
      var y = shape.y - mathSin(angle) * width * (width >= r / 3 ? 1 : 2);
      angle = shape.angle - Math.PI / 2;
      ctx.moveTo(x, y);
      ctx.lineTo(shape.x + mathCos(angle) * width, shape.y + mathSin(angle) * width);
      ctx.lineTo(shape.x + mathCos(shape.angle) * r, shape.y + mathSin(shape.angle) * r);
      ctx.lineTo(shape.x - mathCos(angle) * width, shape.y - mathSin(angle) * width);
      ctx.lineTo(x, y);
    };
    return PointerPath2;
  }(Path_default)
);
var PointerPath_default = PointerPath;

// node_modules/echarts/lib/chart/gauge/GaugeView.js
function parsePosition(seriesModel, api) {
  var center2 = seriesModel.get("center");
  var width = api.getWidth();
  var height = api.getHeight();
  var size = Math.min(width, height);
  var cx = parsePercent2(center2[0], api.getWidth());
  var cy = parsePercent2(center2[1], api.getHeight());
  var r = parsePercent2(seriesModel.get("radius"), size / 2);
  return {
    cx,
    cy,
    r
  };
}
function formatLabel(value, labelFormatter) {
  var label = value == null ? "" : value + "";
  if (labelFormatter) {
    if (isString(labelFormatter)) {
      label = labelFormatter.replace("{value}", label);
    } else if (isFunction(labelFormatter)) {
      label = labelFormatter(value);
    }
  }
  return label;
}
var GaugeView = (
  /** @class */
  function(_super) {
    __extends(GaugeView2, _super);
    function GaugeView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = GaugeView2.type;
      return _this;
    }
    GaugeView2.prototype.render = function(seriesModel, ecModel, api) {
      this.group.removeAll();
      var colorList = seriesModel.get(["axisLine", "lineStyle", "color"]);
      var posInfo = parsePosition(seriesModel, api);
      this._renderMain(seriesModel, ecModel, api, colorList, posInfo);
      this._data = seriesModel.getData();
    };
    GaugeView2.prototype.dispose = function() {
    };
    GaugeView2.prototype._renderMain = function(seriesModel, ecModel, api, colorList, posInfo) {
      var group = this.group;
      var clockwise = seriesModel.get("clockwise");
      var startAngle = -seriesModel.get("startAngle") / 180 * Math.PI;
      var endAngle = -seriesModel.get("endAngle") / 180 * Math.PI;
      var axisLineModel = seriesModel.getModel("axisLine");
      var roundCap = axisLineModel.get("roundCap");
      var MainPath = roundCap ? sausage_default : Sector_default;
      var showAxis = axisLineModel.get("show");
      var lineStyleModel = axisLineModel.getModel("lineStyle");
      var axisLineWidth = lineStyleModel.get("width");
      var angles = [startAngle, endAngle];
      normalizeArcAngles(angles, !clockwise);
      startAngle = angles[0];
      endAngle = angles[1];
      var angleRangeSpan = endAngle - startAngle;
      var prevEndAngle = startAngle;
      var sectors = [];
      for (var i = 0; showAxis && i < colorList.length; i++) {
        var percent = Math.min(Math.max(colorList[i][0], 0), 1);
        endAngle = startAngle + angleRangeSpan * percent;
        var sector = new MainPath({
          shape: {
            startAngle: prevEndAngle,
            endAngle,
            cx: posInfo.cx,
            cy: posInfo.cy,
            clockwise,
            r0: posInfo.r - axisLineWidth,
            r: posInfo.r
          },
          silent: true
        });
        sector.setStyle({
          fill: colorList[i][1]
        });
        sector.setStyle(lineStyleModel.getLineStyle(
          // Because we use sector to simulate arc
          // so the properties for stroking are useless
          ["color", "width"]
        ));
        sectors.push(sector);
        prevEndAngle = endAngle;
      }
      sectors.reverse();
      each(sectors, function(sector2) {
        return group.add(sector2);
      });
      var getColor2 = function(percent2) {
        if (percent2 <= 0) {
          return colorList[0][1];
        }
        var i2;
        for (i2 = 0; i2 < colorList.length; i2++) {
          if (colorList[i2][0] >= percent2 && (i2 === 0 ? 0 : colorList[i2 - 1][0]) < percent2) {
            return colorList[i2][1];
          }
        }
        return colorList[i2 - 1][1];
      };
      this._renderTicks(seriesModel, ecModel, api, getColor2, posInfo, startAngle, endAngle, clockwise, axisLineWidth);
      this._renderTitleAndDetail(seriesModel, ecModel, api, getColor2, posInfo);
      this._renderAnchor(seriesModel, posInfo);
      this._renderPointer(seriesModel, ecModel, api, getColor2, posInfo, startAngle, endAngle, clockwise, axisLineWidth);
    };
    GaugeView2.prototype._renderTicks = function(seriesModel, ecModel, api, getColor2, posInfo, startAngle, endAngle, clockwise, axisLineWidth) {
      var group = this.group;
      var cx = posInfo.cx;
      var cy = posInfo.cy;
      var r = posInfo.r;
      var minVal = +seriesModel.get("min");
      var maxVal = +seriesModel.get("max");
      var splitLineModel = seriesModel.getModel("splitLine");
      var tickModel = seriesModel.getModel("axisTick");
      var labelModel = seriesModel.getModel("axisLabel");
      var splitNumber = seriesModel.get("splitNumber");
      var subSplitNumber = tickModel.get("splitNumber");
      var splitLineLen = parsePercent2(splitLineModel.get("length"), r);
      var tickLen = parsePercent2(tickModel.get("length"), r);
      var angle = startAngle;
      var step = (endAngle - startAngle) / splitNumber;
      var subStep = step / subSplitNumber;
      var splitLineStyle = splitLineModel.getModel("lineStyle").getLineStyle();
      var tickLineStyle = tickModel.getModel("lineStyle").getLineStyle();
      var splitLineDistance = splitLineModel.get("distance");
      var unitX;
      var unitY;
      for (var i = 0; i <= splitNumber; i++) {
        unitX = Math.cos(angle);
        unitY = Math.sin(angle);
        if (splitLineModel.get("show")) {
          var distance = splitLineDistance ? splitLineDistance + axisLineWidth : axisLineWidth;
          var splitLine = new Line_default({
            shape: {
              x1: unitX * (r - distance) + cx,
              y1: unitY * (r - distance) + cy,
              x2: unitX * (r - splitLineLen - distance) + cx,
              y2: unitY * (r - splitLineLen - distance) + cy
            },
            style: splitLineStyle,
            silent: true
          });
          if (splitLineStyle.stroke === "auto") {
            splitLine.setStyle({
              stroke: getColor2(i / splitNumber)
            });
          }
          group.add(splitLine);
        }
        if (labelModel.get("show")) {
          var distance = labelModel.get("distance") + splitLineDistance;
          var label = formatLabel(round(i / splitNumber * (maxVal - minVal) + minVal), labelModel.get("formatter"));
          var autoColor = getColor2(i / splitNumber);
          var textStyleX = unitX * (r - splitLineLen - distance) + cx;
          var textStyleY = unitY * (r - splitLineLen - distance) + cy;
          var rotateType = labelModel.get("rotate");
          var rotate = 0;
          if (rotateType === "radial") {
            rotate = -angle + 2 * Math.PI;
            if (rotate > Math.PI / 2) {
              rotate += Math.PI;
            }
          } else if (rotateType === "tangential") {
            rotate = -angle - Math.PI / 2;
          } else if (isNumber(rotateType)) {
            rotate = rotateType * Math.PI / 180;
          }
          if (rotate === 0) {
            group.add(new Text_default({
              style: createTextStyle(labelModel, {
                text: label,
                x: textStyleX,
                y: textStyleY,
                verticalAlign: unitY < -0.8 ? "top" : unitY > 0.8 ? "bottom" : "middle",
                align: unitX < -0.4 ? "left" : unitX > 0.4 ? "right" : "center"
              }, {
                inheritColor: autoColor
              }),
              silent: true
            }));
          } else {
            group.add(new Text_default({
              style: createTextStyle(labelModel, {
                text: label,
                x: textStyleX,
                y: textStyleY,
                verticalAlign: "middle",
                align: "center"
              }, {
                inheritColor: autoColor
              }),
              silent: true,
              originX: textStyleX,
              originY: textStyleY,
              rotation: rotate
            }));
          }
        }
        if (tickModel.get("show") && i !== splitNumber) {
          var distance = tickModel.get("distance");
          distance = distance ? distance + axisLineWidth : axisLineWidth;
          for (var j = 0; j <= subSplitNumber; j++) {
            unitX = Math.cos(angle);
            unitY = Math.sin(angle);
            var tickLine = new Line_default({
              shape: {
                x1: unitX * (r - distance) + cx,
                y1: unitY * (r - distance) + cy,
                x2: unitX * (r - tickLen - distance) + cx,
                y2: unitY * (r - tickLen - distance) + cy
              },
              silent: true,
              style: tickLineStyle
            });
            if (tickLineStyle.stroke === "auto") {
              tickLine.setStyle({
                stroke: getColor2((i + j / subSplitNumber) / splitNumber)
              });
            }
            group.add(tickLine);
            angle += subStep;
          }
          angle -= subStep;
        } else {
          angle += step;
        }
      }
    };
    GaugeView2.prototype._renderPointer = function(seriesModel, ecModel, api, getColor2, posInfo, startAngle, endAngle, clockwise, axisLineWidth) {
      var group = this.group;
      var oldData = this._data;
      var oldProgressData = this._progressEls;
      var progressList = [];
      var showPointer = seriesModel.get(["pointer", "show"]);
      var progressModel = seriesModel.getModel("progress");
      var showProgress = progressModel.get("show");
      var data = seriesModel.getData();
      var valueDim = data.mapDimension("value");
      var minVal = +seriesModel.get("min");
      var maxVal = +seriesModel.get("max");
      var valueExtent = [minVal, maxVal];
      var angleExtent = [startAngle, endAngle];
      function createPointer(idx, angle) {
        var itemModel = data.getItemModel(idx);
        var pointerModel = itemModel.getModel("pointer");
        var pointerWidth = parsePercent2(pointerModel.get("width"), posInfo.r);
        var pointerLength = parsePercent2(pointerModel.get("length"), posInfo.r);
        var pointerStr = seriesModel.get(["pointer", "icon"]);
        var pointerOffset = pointerModel.get("offsetCenter");
        var pointerOffsetX = parsePercent2(pointerOffset[0], posInfo.r);
        var pointerOffsetY = parsePercent2(pointerOffset[1], posInfo.r);
        var pointerKeepAspect = pointerModel.get("keepAspect");
        var pointer;
        if (pointerStr) {
          pointer = createSymbol(pointerStr, pointerOffsetX - pointerWidth / 2, pointerOffsetY - pointerLength, pointerWidth, pointerLength, null, pointerKeepAspect);
        } else {
          pointer = new PointerPath_default({
            shape: {
              angle: -Math.PI / 2,
              width: pointerWidth,
              r: pointerLength,
              x: pointerOffsetX,
              y: pointerOffsetY
            }
          });
        }
        pointer.rotation = -(angle + Math.PI / 2);
        pointer.x = posInfo.cx;
        pointer.y = posInfo.cy;
        return pointer;
      }
      function createProgress(idx, endAngle2) {
        var roundCap = progressModel.get("roundCap");
        var ProgressPath = roundCap ? sausage_default : Sector_default;
        var isOverlap = progressModel.get("overlap");
        var progressWidth = isOverlap ? progressModel.get("width") : axisLineWidth / data.count();
        var r0 = isOverlap ? posInfo.r - progressWidth : posInfo.r - (idx + 1) * progressWidth;
        var r = isOverlap ? posInfo.r : posInfo.r - idx * progressWidth;
        var progress = new ProgressPath({
          shape: {
            startAngle,
            endAngle: endAngle2,
            cx: posInfo.cx,
            cy: posInfo.cy,
            clockwise,
            r0,
            r
          }
        });
        isOverlap && (progress.z2 = linearMap(data.get(valueDim, idx), [minVal, maxVal], [100, 0], true));
        return progress;
      }
      if (showProgress || showPointer) {
        data.diff(oldData).add(function(idx) {
          var val = data.get(valueDim, idx);
          if (showPointer) {
            var pointer = createPointer(idx, startAngle);
            initProps(pointer, {
              rotation: -((isNaN(+val) ? angleExtent[0] : linearMap(val, valueExtent, angleExtent, true)) + Math.PI / 2)
            }, seriesModel);
            group.add(pointer);
            data.setItemGraphicEl(idx, pointer);
          }
          if (showProgress) {
            var progress = createProgress(idx, startAngle);
            var isClip = progressModel.get("clip");
            initProps(progress, {
              shape: {
                endAngle: linearMap(val, valueExtent, angleExtent, isClip)
              }
            }, seriesModel);
            group.add(progress);
            setCommonECData(seriesModel.seriesIndex, data.dataType, idx, progress);
            progressList[idx] = progress;
          }
        }).update(function(newIdx, oldIdx) {
          var val = data.get(valueDim, newIdx);
          if (showPointer) {
            var previousPointer = oldData.getItemGraphicEl(oldIdx);
            var previousRotate = previousPointer ? previousPointer.rotation : startAngle;
            var pointer = createPointer(newIdx, previousRotate);
            pointer.rotation = previousRotate;
            updateProps(pointer, {
              rotation: -((isNaN(+val) ? angleExtent[0] : linearMap(val, valueExtent, angleExtent, true)) + Math.PI / 2)
            }, seriesModel);
            group.add(pointer);
            data.setItemGraphicEl(newIdx, pointer);
          }
          if (showProgress) {
            var previousProgress = oldProgressData[oldIdx];
            var previousEndAngle = previousProgress ? previousProgress.shape.endAngle : startAngle;
            var progress = createProgress(newIdx, previousEndAngle);
            var isClip = progressModel.get("clip");
            updateProps(progress, {
              shape: {
                endAngle: linearMap(val, valueExtent, angleExtent, isClip)
              }
            }, seriesModel);
            group.add(progress);
            setCommonECData(seriesModel.seriesIndex, data.dataType, newIdx, progress);
            progressList[newIdx] = progress;
          }
        }).execute();
        data.each(function(idx) {
          var itemModel = data.getItemModel(idx);
          var emphasisModel = itemModel.getModel("emphasis");
          var focus = emphasisModel.get("focus");
          var blurScope = emphasisModel.get("blurScope");
          var emphasisDisabled = emphasisModel.get("disabled");
          if (showPointer) {
            var pointer = data.getItemGraphicEl(idx);
            var symbolStyle = data.getItemVisual(idx, "style");
            var visualColor = symbolStyle.fill;
            if (pointer instanceof Image_default) {
              var pathStyle = pointer.style;
              pointer.useStyle(extend({
                image: pathStyle.image,
                x: pathStyle.x,
                y: pathStyle.y,
                width: pathStyle.width,
                height: pathStyle.height
              }, symbolStyle));
            } else {
              pointer.useStyle(symbolStyle);
              pointer.type !== "pointer" && pointer.setColor(visualColor);
            }
            pointer.setStyle(itemModel.getModel(["pointer", "itemStyle"]).getItemStyle());
            if (pointer.style.fill === "auto") {
              pointer.setStyle("fill", getColor2(linearMap(data.get(valueDim, idx), valueExtent, [0, 1], true)));
            }
            pointer.z2EmphasisLift = 0;
            setStatesStylesFromModel(pointer, itemModel);
            toggleHoverEmphasis(pointer, focus, blurScope, emphasisDisabled);
          }
          if (showProgress) {
            var progress = progressList[idx];
            progress.useStyle(data.getItemVisual(idx, "style"));
            progress.setStyle(itemModel.getModel(["progress", "itemStyle"]).getItemStyle());
            progress.z2EmphasisLift = 0;
            setStatesStylesFromModel(progress, itemModel);
            toggleHoverEmphasis(progress, focus, blurScope, emphasisDisabled);
          }
        });
        this._progressEls = progressList;
      }
    };
    GaugeView2.prototype._renderAnchor = function(seriesModel, posInfo) {
      var anchorModel = seriesModel.getModel("anchor");
      var showAnchor = anchorModel.get("show");
      if (showAnchor) {
        var anchorSize = anchorModel.get("size");
        var anchorType = anchorModel.get("icon");
        var offsetCenter = anchorModel.get("offsetCenter");
        var anchorKeepAspect = anchorModel.get("keepAspect");
        var anchor = createSymbol(anchorType, posInfo.cx - anchorSize / 2 + parsePercent2(offsetCenter[0], posInfo.r), posInfo.cy - anchorSize / 2 + parsePercent2(offsetCenter[1], posInfo.r), anchorSize, anchorSize, null, anchorKeepAspect);
        anchor.z2 = anchorModel.get("showAbove") ? 1 : 0;
        anchor.setStyle(anchorModel.getModel("itemStyle").getItemStyle());
        this.group.add(anchor);
      }
    };
    GaugeView2.prototype._renderTitleAndDetail = function(seriesModel, ecModel, api, getColor2, posInfo) {
      var _this = this;
      var data = seriesModel.getData();
      var valueDim = data.mapDimension("value");
      var minVal = +seriesModel.get("min");
      var maxVal = +seriesModel.get("max");
      var contentGroup = new Group_default();
      var newTitleEls = [];
      var newDetailEls = [];
      var hasAnimation = seriesModel.isAnimationEnabled();
      var showPointerAbove = seriesModel.get(["pointer", "showAbove"]);
      data.diff(this._data).add(function(idx) {
        newTitleEls[idx] = new Text_default({
          silent: true
        });
        newDetailEls[idx] = new Text_default({
          silent: true
        });
      }).update(function(idx, oldIdx) {
        newTitleEls[idx] = _this._titleEls[oldIdx];
        newDetailEls[idx] = _this._detailEls[oldIdx];
      }).execute();
      data.each(function(idx) {
        var itemModel = data.getItemModel(idx);
        var value = data.get(valueDim, idx);
        var itemGroup = new Group_default();
        var autoColor = getColor2(linearMap(value, [minVal, maxVal], [0, 1], true));
        var itemTitleModel = itemModel.getModel("title");
        if (itemTitleModel.get("show")) {
          var titleOffsetCenter = itemTitleModel.get("offsetCenter");
          var titleX = posInfo.cx + parsePercent2(titleOffsetCenter[0], posInfo.r);
          var titleY = posInfo.cy + parsePercent2(titleOffsetCenter[1], posInfo.r);
          var labelEl = newTitleEls[idx];
          labelEl.attr({
            z2: showPointerAbove ? 0 : 2,
            style: createTextStyle(itemTitleModel, {
              x: titleX,
              y: titleY,
              text: data.getName(idx),
              align: "center",
              verticalAlign: "middle"
            }, {
              inheritColor: autoColor
            })
          });
          itemGroup.add(labelEl);
        }
        var itemDetailModel = itemModel.getModel("detail");
        if (itemDetailModel.get("show")) {
          var detailOffsetCenter = itemDetailModel.get("offsetCenter");
          var detailX = posInfo.cx + parsePercent2(detailOffsetCenter[0], posInfo.r);
          var detailY = posInfo.cy + parsePercent2(detailOffsetCenter[1], posInfo.r);
          var width = parsePercent2(itemDetailModel.get("width"), posInfo.r);
          var height = parsePercent2(itemDetailModel.get("height"), posInfo.r);
          var detailColor = seriesModel.get(["progress", "show"]) ? data.getItemVisual(idx, "style").fill : autoColor;
          var labelEl = newDetailEls[idx];
          var formatter_1 = itemDetailModel.get("formatter");
          labelEl.attr({
            z2: showPointerAbove ? 0 : 2,
            style: createTextStyle(itemDetailModel, {
              x: detailX,
              y: detailY,
              text: formatLabel(value, formatter_1),
              width: isNaN(width) ? null : width,
              height: isNaN(height) ? null : height,
              align: "center",
              verticalAlign: "middle"
            }, {
              inheritColor: detailColor
            })
          });
          setLabelValueAnimation(labelEl, {
            normal: itemDetailModel
          }, value, function(value2) {
            return formatLabel(value2, formatter_1);
          });
          hasAnimation && animateLabelValue(labelEl, idx, data, seriesModel, {
            getFormattedLabel: function(labelDataIndex, status, dataType, labelDimIndex, fmt, extendParams) {
              return formatLabel(extendParams ? extendParams.interpolatedValue : value, formatter_1);
            }
          });
          itemGroup.add(labelEl);
        }
        contentGroup.add(itemGroup);
      });
      this.group.add(contentGroup);
      this._titleEls = newTitleEls;
      this._detailEls = newDetailEls;
    };
    GaugeView2.type = "gauge";
    return GaugeView2;
  }(Chart_default)
);
var GaugeView_default = GaugeView;

// node_modules/echarts/lib/chart/gauge/GaugeSeries.js
var GaugeSeriesModel = (
  /** @class */
  function(_super) {
    __extends(GaugeSeriesModel2, _super);
    function GaugeSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = GaugeSeriesModel2.type;
      _this.visualStyleAccessPath = "itemStyle";
      return _this;
    }
    GaugeSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesDataSimply(this, ["value"]);
    };
    GaugeSeriesModel2.type = "series.gauge";
    GaugeSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      colorBy: "data",
      // 默认全局居中
      center: ["50%", "50%"],
      legendHoverLink: true,
      radius: "75%",
      startAngle: 225,
      endAngle: -45,
      clockwise: true,
      // 最小值
      min: 0,
      // 最大值
      max: 100,
      // 分割段数，默认为10
      splitNumber: 10,
      // 坐标轴线
      axisLine: {
        // 默认显示，属性show控制显示与否
        show: true,
        roundCap: false,
        lineStyle: {
          color: [[1, "#E6EBF8"]],
          width: 10
        }
      },
      // 坐标轴线
      progress: {
        // 默认显示，属性show控制显示与否
        show: false,
        overlap: true,
        width: 10,
        roundCap: false,
        clip: true
      },
      // 分隔线
      splitLine: {
        // 默认显示，属性show控制显示与否
        show: true,
        // 属性length控制线长
        length: 10,
        distance: 10,
        // 属性lineStyle（详见lineStyle）控制线条样式
        lineStyle: {
          color: "#63677A",
          width: 3,
          type: "solid"
        }
      },
      // 坐标轴小标记
      axisTick: {
        // 属性show控制显示与否，默认不显示
        show: true,
        // 每份split细分多少段
        splitNumber: 5,
        // 属性length控制线长
        length: 6,
        distance: 10,
        // 属性lineStyle控制线条样式
        lineStyle: {
          color: "#63677A",
          width: 1,
          type: "solid"
        }
      },
      axisLabel: {
        show: true,
        distance: 15,
        // formatter: null,
        color: "#464646",
        fontSize: 12,
        rotate: 0
      },
      pointer: {
        icon: null,
        offsetCenter: [0, 0],
        show: true,
        showAbove: true,
        length: "60%",
        width: 6,
        keepAspect: false
      },
      anchor: {
        show: false,
        showAbove: false,
        size: 6,
        icon: "circle",
        offsetCenter: [0, 0],
        keepAspect: false,
        itemStyle: {
          color: "#fff",
          borderWidth: 0,
          borderColor: "#5470c6"
        }
      },
      title: {
        show: true,
        // x, y，单位px
        offsetCenter: [0, "20%"],
        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        color: "#464646",
        fontSize: 16,
        valueAnimation: false
      },
      detail: {
        show: true,
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        borderColor: "#ccc",
        width: 100,
        height: null,
        padding: [5, 10],
        // x, y，单位px
        offsetCenter: [0, "40%"],
        // formatter: null,
        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        color: "#464646",
        fontSize: 30,
        fontWeight: "bold",
        lineHeight: 30,
        valueAnimation: false
      }
    };
    return GaugeSeriesModel2;
  }(Series_default)
);
var GaugeSeries_default = GaugeSeriesModel;

// node_modules/echarts/lib/chart/gauge/install.js
function install14(registers) {
  registers.registerChartView(GaugeView_default);
  registers.registerSeriesModel(GaugeSeries_default);
}

// node_modules/echarts/lib/chart/funnel/FunnelView.js
var opacityAccessPath = ["itemStyle", "opacity"];
var FunnelPiece = (
  /** @class */
  function(_super) {
    __extends(FunnelPiece2, _super);
    function FunnelPiece2(data, idx) {
      var _this = _super.call(this) || this;
      var polygon = _this;
      var labelLine = new Polyline_default();
      var text = new Text_default();
      polygon.setTextContent(text);
      _this.setTextGuideLine(labelLine);
      _this.updateData(data, idx, true);
      return _this;
    }
    FunnelPiece2.prototype.updateData = function(data, idx, firstCreate) {
      var polygon = this;
      var seriesModel = data.hostModel;
      var itemModel = data.getItemModel(idx);
      var layout2 = data.getItemLayout(idx);
      var emphasisModel = itemModel.getModel("emphasis");
      var opacity = itemModel.get(opacityAccessPath);
      opacity = opacity == null ? 1 : opacity;
      if (!firstCreate) {
        saveOldStyle(polygon);
      }
      polygon.useStyle(data.getItemVisual(idx, "style"));
      polygon.style.lineJoin = "round";
      if (firstCreate) {
        polygon.setShape({
          points: layout2.points
        });
        polygon.style.opacity = 0;
        initProps(polygon, {
          style: {
            opacity
          }
        }, seriesModel, idx);
      } else {
        updateProps(polygon, {
          style: {
            opacity
          },
          shape: {
            points: layout2.points
          }
        }, seriesModel, idx);
      }
      setStatesStylesFromModel(polygon, itemModel);
      this._updateLabel(data, idx);
      toggleHoverEmphasis(this, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
    };
    FunnelPiece2.prototype._updateLabel = function(data, idx) {
      var polygon = this;
      var labelLine = this.getTextGuideLine();
      var labelText = polygon.getTextContent();
      var seriesModel = data.hostModel;
      var itemModel = data.getItemModel(idx);
      var layout2 = data.getItemLayout(idx);
      var labelLayout2 = layout2.label;
      var style = data.getItemVisual(idx, "style");
      var visualColor = style.fill;
      setLabelStyle(
        // position will not be used in setLabelStyle
        labelText,
        getLabelStatesModels(itemModel),
        {
          labelFetcher: data.hostModel,
          labelDataIndex: idx,
          defaultOpacity: style.opacity,
          defaultText: data.getName(idx)
        },
        {
          normal: {
            align: labelLayout2.textAlign,
            verticalAlign: labelLayout2.verticalAlign
          }
        }
      );
      polygon.setTextConfig({
        local: true,
        inside: !!labelLayout2.inside,
        insideStroke: visualColor,
        // insideFill: 'auto',
        outsideFill: visualColor
      });
      var linePoints = labelLayout2.linePoints;
      labelLine.setShape({
        points: linePoints
      });
      polygon.textGuideLineConfig = {
        anchor: linePoints ? new Point_default(linePoints[0][0], linePoints[0][1]) : null
      };
      updateProps(labelText, {
        style: {
          x: labelLayout2.x,
          y: labelLayout2.y
        }
      }, seriesModel, idx);
      labelText.attr({
        rotation: labelLayout2.rotation,
        originX: labelLayout2.x,
        originY: labelLayout2.y,
        z2: 10
      });
      setLabelLineStyle(polygon, getLabelLineStatesModels(itemModel), {
        // Default use item visual color
        stroke: visualColor
      });
    };
    return FunnelPiece2;
  }(Polygon_default)
);
var FunnelView = (
  /** @class */
  function(_super) {
    __extends(FunnelView2, _super);
    function FunnelView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = FunnelView2.type;
      _this.ignoreLabelLineUpdate = true;
      return _this;
    }
    FunnelView2.prototype.render = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var oldData = this._data;
      var group = this.group;
      data.diff(oldData).add(function(idx) {
        var funnelPiece = new FunnelPiece(data, idx);
        data.setItemGraphicEl(idx, funnelPiece);
        group.add(funnelPiece);
      }).update(function(newIdx, oldIdx) {
        var piece = oldData.getItemGraphicEl(oldIdx);
        piece.updateData(data, newIdx);
        group.add(piece);
        data.setItemGraphicEl(newIdx, piece);
      }).remove(function(idx) {
        var piece = oldData.getItemGraphicEl(idx);
        removeElementWithFadeOut(piece, seriesModel, idx);
      }).execute();
      this._data = data;
    };
    FunnelView2.prototype.remove = function() {
      this.group.removeAll();
      this._data = null;
    };
    FunnelView2.prototype.dispose = function() {
    };
    FunnelView2.type = "funnel";
    return FunnelView2;
  }(Chart_default)
);
var FunnelView_default = FunnelView;

// node_modules/echarts/lib/chart/funnel/FunnelSeries.js
var FunnelSeriesModel = (
  /** @class */
  function(_super) {
    __extends(FunnelSeriesModel2, _super);
    function FunnelSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = FunnelSeriesModel2.type;
      return _this;
    }
    FunnelSeriesModel2.prototype.init = function(option) {
      _super.prototype.init.apply(this, arguments);
      this.legendVisualProvider = new LegendVisualProvider_default(bind(this.getData, this), bind(this.getRawData, this));
      this._defaultLabelLine(option);
    };
    FunnelSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesDataSimply(this, {
        coordDimensions: ["value"],
        encodeDefaulter: curry(makeSeriesEncodeForNameBased, this)
      });
    };
    FunnelSeriesModel2.prototype._defaultLabelLine = function(option) {
      defaultEmphasis(option, "labelLine", ["show"]);
      var labelLineNormalOpt = option.labelLine;
      var labelLineEmphasisOpt = option.emphasis.labelLine;
      labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
      labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
    };
    FunnelSeriesModel2.prototype.getDataParams = function(dataIndex) {
      var data = this.getData();
      var params = _super.prototype.getDataParams.call(this, dataIndex);
      var valueDim = data.mapDimension("value");
      var sum2 = data.getSum(valueDim);
      params.percent = !sum2 ? 0 : +(data.get(valueDim, dataIndex) / sum2 * 100).toFixed(2);
      params.$vars.push("percent");
      return params;
    };
    FunnelSeriesModel2.type = "series.funnel";
    FunnelSeriesModel2.defaultOption = {
      // zlevel: 0,                  // 一级层叠
      z: 2,
      legendHoverLink: true,
      colorBy: "data",
      left: 80,
      top: 60,
      right: 80,
      bottom: 60,
      // width: {totalWidth} - left - right,
      // height: {totalHeight} - top - bottom,
      // 默认取数据最小最大值
      // min: 0,
      // max: 100,
      minSize: "0%",
      maxSize: "100%",
      sort: "descending",
      orient: "vertical",
      gap: 0,
      funnelAlign: "center",
      label: {
        show: true,
        position: "outer"
        // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
      },
      labelLine: {
        show: true,
        length: 20,
        lineStyle: {
          // color: 各异,
          width: 1
        }
      },
      itemStyle: {
        // color: 各异,
        borderColor: "#fff",
        borderWidth: 1
      },
      emphasis: {
        label: {
          show: true
        }
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      }
    };
    return FunnelSeriesModel2;
  }(Series_default)
);
var FunnelSeries_default = FunnelSeriesModel;

// node_modules/echarts/lib/chart/funnel/funnelLayout.js
function getViewRect4(seriesModel, api) {
  return getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}
function getSortedIndices(data, sort3) {
  var valueDim = data.mapDimension("value");
  var valueArr = data.mapArray(valueDim, function(val) {
    return val;
  });
  var indices = [];
  var isAscending = sort3 === "ascending";
  for (var i = 0, len2 = data.count(); i < len2; i++) {
    indices[i] = i;
  }
  if (isFunction(sort3)) {
    indices.sort(sort3);
  } else if (sort3 !== "none") {
    indices.sort(function(a, b) {
      return isAscending ? valueArr[a] - valueArr[b] : valueArr[b] - valueArr[a];
    });
  }
  return indices;
}
function labelLayout(data) {
  var seriesModel = data.hostModel;
  var orient = seriesModel.get("orient");
  data.each(function(idx) {
    var itemModel = data.getItemModel(idx);
    var labelModel = itemModel.getModel("label");
    var labelPosition = labelModel.get("position");
    var labelLineModel = itemModel.getModel("labelLine");
    var layout2 = data.getItemLayout(idx);
    var points = layout2.points;
    var isLabelInside = labelPosition === "inner" || labelPosition === "inside" || labelPosition === "center" || labelPosition === "insideLeft" || labelPosition === "insideRight";
    var textAlign;
    var textX;
    var textY;
    var linePoints;
    if (isLabelInside) {
      if (labelPosition === "insideLeft") {
        textX = (points[0][0] + points[3][0]) / 2 + 5;
        textY = (points[0][1] + points[3][1]) / 2;
        textAlign = "left";
      } else if (labelPosition === "insideRight") {
        textX = (points[1][0] + points[2][0]) / 2 - 5;
        textY = (points[1][1] + points[2][1]) / 2;
        textAlign = "right";
      } else {
        textX = (points[0][0] + points[1][0] + points[2][0] + points[3][0]) / 4;
        textY = (points[0][1] + points[1][1] + points[2][1] + points[3][1]) / 4;
        textAlign = "center";
      }
      linePoints = [[textX, textY], [textX, textY]];
    } else {
      var x1 = void 0;
      var y1 = void 0;
      var x2 = void 0;
      var y2 = void 0;
      var labelLineLen = labelLineModel.get("length");
      if (true) {
        if (orient === "vertical" && ["top", "bottom"].indexOf(labelPosition) > -1) {
          labelPosition = "left";
          console.warn("Position error: Funnel chart on vertical orient dose not support top and bottom.");
        }
        if (orient === "horizontal" && ["left", "right"].indexOf(labelPosition) > -1) {
          labelPosition = "bottom";
          console.warn("Position error: Funnel chart on horizontal orient dose not support left and right.");
        }
      }
      if (labelPosition === "left") {
        x1 = (points[3][0] + points[0][0]) / 2;
        y1 = (points[3][1] + points[0][1]) / 2;
        x2 = x1 - labelLineLen;
        textX = x2 - 5;
        textAlign = "right";
      } else if (labelPosition === "right") {
        x1 = (points[1][0] + points[2][0]) / 2;
        y1 = (points[1][1] + points[2][1]) / 2;
        x2 = x1 + labelLineLen;
        textX = x2 + 5;
        textAlign = "left";
      } else if (labelPosition === "top") {
        x1 = (points[3][0] + points[0][0]) / 2;
        y1 = (points[3][1] + points[0][1]) / 2;
        y2 = y1 - labelLineLen;
        textY = y2 - 5;
        textAlign = "center";
      } else if (labelPosition === "bottom") {
        x1 = (points[1][0] + points[2][0]) / 2;
        y1 = (points[1][1] + points[2][1]) / 2;
        y2 = y1 + labelLineLen;
        textY = y2 + 5;
        textAlign = "center";
      } else if (labelPosition === "rightTop") {
        x1 = orient === "horizontal" ? points[3][0] : points[1][0];
        y1 = orient === "horizontal" ? points[3][1] : points[1][1];
        if (orient === "horizontal") {
          y2 = y1 - labelLineLen;
          textY = y2 - 5;
          textAlign = "center";
        } else {
          x2 = x1 + labelLineLen;
          textX = x2 + 5;
          textAlign = "top";
        }
      } else if (labelPosition === "rightBottom") {
        x1 = points[2][0];
        y1 = points[2][1];
        if (orient === "horizontal") {
          y2 = y1 + labelLineLen;
          textY = y2 + 5;
          textAlign = "center";
        } else {
          x2 = x1 + labelLineLen;
          textX = x2 + 5;
          textAlign = "bottom";
        }
      } else if (labelPosition === "leftTop") {
        x1 = points[0][0];
        y1 = orient === "horizontal" ? points[0][1] : points[1][1];
        if (orient === "horizontal") {
          y2 = y1 - labelLineLen;
          textY = y2 - 5;
          textAlign = "center";
        } else {
          x2 = x1 - labelLineLen;
          textX = x2 - 5;
          textAlign = "right";
        }
      } else if (labelPosition === "leftBottom") {
        x1 = orient === "horizontal" ? points[1][0] : points[3][0];
        y1 = orient === "horizontal" ? points[1][1] : points[2][1];
        if (orient === "horizontal") {
          y2 = y1 + labelLineLen;
          textY = y2 + 5;
          textAlign = "center";
        } else {
          x2 = x1 - labelLineLen;
          textX = x2 - 5;
          textAlign = "right";
        }
      } else {
        x1 = (points[1][0] + points[2][0]) / 2;
        y1 = (points[1][1] + points[2][1]) / 2;
        if (orient === "horizontal") {
          y2 = y1 + labelLineLen;
          textY = y2 + 5;
          textAlign = "center";
        } else {
          x2 = x1 + labelLineLen;
          textX = x2 + 5;
          textAlign = "left";
        }
      }
      if (orient === "horizontal") {
        x2 = x1;
        textX = x2;
      } else {
        y2 = y1;
        textY = y2;
      }
      linePoints = [[x1, y1], [x2, y2]];
    }
    layout2.label = {
      linePoints,
      x: textX,
      y: textY,
      verticalAlign: "middle",
      textAlign,
      inside: isLabelInside
    };
  });
}
function funnelLayout(ecModel, api) {
  ecModel.eachSeriesByType("funnel", function(seriesModel) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension("value");
    var sort3 = seriesModel.get("sort");
    var viewRect = getViewRect4(seriesModel, api);
    var orient = seriesModel.get("orient");
    var viewWidth = viewRect.width;
    var viewHeight = viewRect.height;
    var indices = getSortedIndices(data, sort3);
    var x = viewRect.x;
    var y = viewRect.y;
    var sizeExtent = orient === "horizontal" ? [parsePercent2(seriesModel.get("minSize"), viewHeight), parsePercent2(seriesModel.get("maxSize"), viewHeight)] : [parsePercent2(seriesModel.get("minSize"), viewWidth), parsePercent2(seriesModel.get("maxSize"), viewWidth)];
    var dataExtent = data.getDataExtent(valueDim);
    var min = seriesModel.get("min");
    var max = seriesModel.get("max");
    if (min == null) {
      min = Math.min(dataExtent[0], 0);
    }
    if (max == null) {
      max = dataExtent[1];
    }
    var funnelAlign = seriesModel.get("funnelAlign");
    var gap = seriesModel.get("gap");
    var viewSize = orient === "horizontal" ? viewWidth : viewHeight;
    var itemSize = (viewSize - gap * (data.count() - 1)) / data.count();
    var getLinePoints = function(idx2, offset) {
      if (orient === "horizontal") {
        var val_1 = data.get(valueDim, idx2) || 0;
        var itemHeight = linearMap(val_1, [min, max], sizeExtent, true);
        var y0 = void 0;
        switch (funnelAlign) {
          case "top":
            y0 = y;
            break;
          case "center":
            y0 = y + (viewHeight - itemHeight) / 2;
            break;
          case "bottom":
            y0 = y + (viewHeight - itemHeight);
            break;
        }
        return [[offset, y0], [offset, y0 + itemHeight]];
      }
      var val = data.get(valueDim, idx2) || 0;
      var itemWidth = linearMap(val, [min, max], sizeExtent, true);
      var x0;
      switch (funnelAlign) {
        case "left":
          x0 = x;
          break;
        case "center":
          x0 = x + (viewWidth - itemWidth) / 2;
          break;
        case "right":
          x0 = x + viewWidth - itemWidth;
          break;
      }
      return [[x0, offset], [x0 + itemWidth, offset]];
    };
    if (sort3 === "ascending") {
      itemSize = -itemSize;
      gap = -gap;
      if (orient === "horizontal") {
        x += viewWidth;
      } else {
        y += viewHeight;
      }
      indices = indices.reverse();
    }
    for (var i = 0; i < indices.length; i++) {
      var idx = indices[i];
      var nextIdx = indices[i + 1];
      var itemModel = data.getItemModel(idx);
      if (orient === "horizontal") {
        var width = itemModel.get(["itemStyle", "width"]);
        if (width == null) {
          width = itemSize;
        } else {
          width = parsePercent2(width, viewWidth);
          if (sort3 === "ascending") {
            width = -width;
          }
        }
        var start = getLinePoints(idx, x);
        var end = getLinePoints(nextIdx, x + width);
        x += width + gap;
        data.setItemLayout(idx, {
          points: start.concat(end.slice().reverse())
        });
      } else {
        var height = itemModel.get(["itemStyle", "height"]);
        if (height == null) {
          height = itemSize;
        } else {
          height = parsePercent2(height, viewHeight);
          if (sort3 === "ascending") {
            height = -height;
          }
        }
        var start = getLinePoints(idx, y);
        var end = getLinePoints(nextIdx, y + height);
        y += height + gap;
        data.setItemLayout(idx, {
          points: start.concat(end.slice().reverse())
        });
      }
    }
    labelLayout(data);
  });
}

// node_modules/echarts/lib/chart/funnel/install.js
function install15(registers) {
  registers.registerChartView(FunnelView_default);
  registers.registerSeriesModel(FunnelSeries_default);
  registers.registerLayout(funnelLayout);
  registers.registerProcessor(dataFilter("funnel"));
}

// node_modules/echarts/lib/chart/parallel/ParallelView.js
var DEFAULT_SMOOTH = 0.3;
var ParallelView = (
  /** @class */
  function(_super) {
    __extends(ParallelView2, _super);
    function ParallelView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ParallelView2.type;
      _this._dataGroup = new Group_default();
      _this._initialized = false;
      return _this;
    }
    ParallelView2.prototype.init = function() {
      this.group.add(this._dataGroup);
    };
    ParallelView2.prototype.render = function(seriesModel, ecModel, api, payload) {
      this._progressiveEls = null;
      var dataGroup = this._dataGroup;
      var data = seriesModel.getData();
      var oldData = this._data;
      var coordSys = seriesModel.coordinateSystem;
      var dimensions = coordSys.dimensions;
      var seriesScope = makeSeriesScope(seriesModel);
      data.diff(oldData).add(add).update(update).remove(remove).execute();
      function add(newDataIndex) {
        var line = addEl(data, dataGroup, newDataIndex, dimensions, coordSys);
        updateElCommon(line, data, newDataIndex, seriesScope);
      }
      function update(newDataIndex, oldDataIndex) {
        var line = oldData.getItemGraphicEl(oldDataIndex);
        var points = createLinePoints(data, newDataIndex, dimensions, coordSys);
        data.setItemGraphicEl(newDataIndex, line);
        updateProps(line, {
          shape: {
            points
          }
        }, seriesModel, newDataIndex);
        saveOldStyle(line);
        updateElCommon(line, data, newDataIndex, seriesScope);
      }
      function remove(oldDataIndex) {
        var line = oldData.getItemGraphicEl(oldDataIndex);
        dataGroup.remove(line);
      }
      if (!this._initialized) {
        this._initialized = true;
        var clipPath = createGridClipShape(coordSys, seriesModel, function() {
          setTimeout(function() {
            dataGroup.removeClipPath();
          });
        });
        dataGroup.setClipPath(clipPath);
      }
      this._data = data;
    };
    ParallelView2.prototype.incrementalPrepareRender = function(seriesModel, ecModel, api) {
      this._initialized = true;
      this._data = null;
      this._dataGroup.removeAll();
    };
    ParallelView2.prototype.incrementalRender = function(taskParams, seriesModel, ecModel) {
      var data = seriesModel.getData();
      var coordSys = seriesModel.coordinateSystem;
      var dimensions = coordSys.dimensions;
      var seriesScope = makeSeriesScope(seriesModel);
      var progressiveEls = this._progressiveEls = [];
      for (var dataIndex = taskParams.start; dataIndex < taskParams.end; dataIndex++) {
        var line = addEl(data, this._dataGroup, dataIndex, dimensions, coordSys);
        line.incremental = true;
        updateElCommon(line, data, dataIndex, seriesScope);
        progressiveEls.push(line);
      }
    };
    ParallelView2.prototype.remove = function() {
      this._dataGroup && this._dataGroup.removeAll();
      this._data = null;
    };
    ParallelView2.type = "parallel";
    return ParallelView2;
  }(Chart_default)
);
function createGridClipShape(coordSys, seriesModel, cb) {
  var parallelModel = coordSys.model;
  var rect = coordSys.getRect();
  var rectEl = new Rect_default({
    shape: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    }
  });
  var dim = parallelModel.get("layout") === "horizontal" ? "width" : "height";
  rectEl.setShape(dim, 0);
  initProps(rectEl, {
    shape: {
      width: rect.width,
      height: rect.height
    }
  }, seriesModel, cb);
  return rectEl;
}
function createLinePoints(data, dataIndex, dimensions, coordSys) {
  var points = [];
  for (var i = 0; i < dimensions.length; i++) {
    var dimName = dimensions[i];
    var value = data.get(data.mapDimension(dimName), dataIndex);
    if (!isEmptyValue(value, coordSys.getAxis(dimName).type)) {
      points.push(coordSys.dataToPoint(value, dimName));
    }
  }
  return points;
}
function addEl(data, dataGroup, dataIndex, dimensions, coordSys) {
  var points = createLinePoints(data, dataIndex, dimensions, coordSys);
  var line = new Polyline_default({
    shape: {
      points
    },
    // silent: true,
    z2: 10
  });
  dataGroup.add(line);
  data.setItemGraphicEl(dataIndex, line);
  return line;
}
function makeSeriesScope(seriesModel) {
  var smooth = seriesModel.get("smooth", true);
  smooth === true && (smooth = DEFAULT_SMOOTH);
  smooth = numericToNumber(smooth);
  eqNaN(smooth) && (smooth = 0);
  return {
    smooth
  };
}
function updateElCommon(el, data, dataIndex, seriesScope) {
  el.useStyle(data.getItemVisual(dataIndex, "style"));
  el.style.fill = null;
  el.setShape("smooth", seriesScope.smooth);
  var itemModel = data.getItemModel(dataIndex);
  var emphasisModel = itemModel.getModel("emphasis");
  setStatesStylesFromModel(el, itemModel, "lineStyle");
  toggleHoverEmphasis(el, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
}
function isEmptyValue(val, axisType) {
  return axisType === "category" ? val == null : val == null || isNaN(val);
}
var ParallelView_default = ParallelView;

// node_modules/echarts/lib/chart/parallel/ParallelSeries.js
var ParallelSeriesModel = (
  /** @class */
  function(_super) {
    __extends(ParallelSeriesModel2, _super);
    function ParallelSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ParallelSeriesModel2.type;
      _this.visualStyleAccessPath = "lineStyle";
      _this.visualDrawType = "stroke";
      return _this;
    }
    ParallelSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesData_default(null, this, {
        useEncodeDefaulter: bind(makeDefaultEncode, null, this)
      });
    };
    ParallelSeriesModel2.prototype.getRawIndicesByActiveState = function(activeState) {
      var coordSys = this.coordinateSystem;
      var data = this.getData();
      var indices = [];
      coordSys.eachActiveState(data, function(theActiveState, dataIndex) {
        if (activeState === theActiveState) {
          indices.push(data.getRawIndex(dataIndex));
        }
      });
      return indices;
    };
    ParallelSeriesModel2.type = "series.parallel";
    ParallelSeriesModel2.dependencies = ["parallel"];
    ParallelSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "parallel",
      parallelIndex: 0,
      label: {
        show: false
      },
      inactiveOpacity: 0.05,
      activeOpacity: 1,
      lineStyle: {
        width: 1,
        opacity: 0.45,
        type: "solid"
      },
      emphasis: {
        label: {
          show: false
        }
      },
      progressive: 500,
      smooth: false,
      animationEasing: "linear"
    };
    return ParallelSeriesModel2;
  }(Series_default)
);
function makeDefaultEncode(seriesModel) {
  var parallelModel = seriesModel.ecModel.getComponent("parallel", seriesModel.get("parallelIndex"));
  if (!parallelModel) {
    return;
  }
  var encodeDefine = {};
  each(parallelModel.dimensions, function(axisDim) {
    var dataDimIndex = convertDimNameToNumber(axisDim);
    encodeDefine[axisDim] = dataDimIndex;
  });
  return encodeDefine;
}
function convertDimNameToNumber(dimName) {
  return +dimName.replace("dim", "");
}
var ParallelSeries_default = ParallelSeriesModel;

// node_modules/echarts/lib/chart/parallel/parallelVisual.js
var opacityAccessPath2 = ["lineStyle", "opacity"];
var parallelVisual = {
  seriesType: "parallel",
  reset: function(seriesModel, ecModel) {
    var coordSys = seriesModel.coordinateSystem;
    var opacityMap = {
      normal: seriesModel.get(["lineStyle", "opacity"]),
      active: seriesModel.get("activeOpacity"),
      inactive: seriesModel.get("inactiveOpacity")
    };
    return {
      progress: function(params, data) {
        coordSys.eachActiveState(data, function(activeState, dataIndex) {
          var opacity = opacityMap[activeState];
          if (activeState === "normal" && data.hasItemOption) {
            var itemOpacity = data.getItemModel(dataIndex).get(opacityAccessPath2, true);
            itemOpacity != null && (opacity = itemOpacity);
          }
          var existsStyle = data.ensureUniqueItemVisual(dataIndex, "style");
          existsStyle.opacity = opacity;
        }, params.start, params.end);
      }
    };
  }
};
var parallelVisual_default = parallelVisual;

// node_modules/echarts/lib/chart/parallel/install.js
function install16(registers) {
  use(install4);
  registers.registerChartView(ParallelView_default);
  registers.registerSeriesModel(ParallelSeries_default);
  registers.registerVisual(registers.PRIORITY.VISUAL.BRUSH, parallelVisual_default);
}

// node_modules/echarts/lib/chart/sankey/SankeyView.js
var SankeyPathShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function SankeyPathShape2() {
      this.x1 = 0;
      this.y1 = 0;
      this.x2 = 0;
      this.y2 = 0;
      this.cpx1 = 0;
      this.cpy1 = 0;
      this.cpx2 = 0;
      this.cpy2 = 0;
      this.extent = 0;
    }
    return SankeyPathShape2;
  }()
);
var SankeyPath = (
  /** @class */
  function(_super) {
    __extends(SankeyPath2, _super);
    function SankeyPath2(opts) {
      return _super.call(this, opts) || this;
    }
    SankeyPath2.prototype.getDefaultShape = function() {
      return new SankeyPathShape();
    };
    SankeyPath2.prototype.buildPath = function(ctx, shape) {
      var extent = shape.extent;
      ctx.moveTo(shape.x1, shape.y1);
      ctx.bezierCurveTo(shape.cpx1, shape.cpy1, shape.cpx2, shape.cpy2, shape.x2, shape.y2);
      if (shape.orient === "vertical") {
        ctx.lineTo(shape.x2 + extent, shape.y2);
        ctx.bezierCurveTo(shape.cpx2 + extent, shape.cpy2, shape.cpx1 + extent, shape.cpy1, shape.x1 + extent, shape.y1);
      } else {
        ctx.lineTo(shape.x2, shape.y2 + extent);
        ctx.bezierCurveTo(shape.cpx2, shape.cpy2 + extent, shape.cpx1, shape.cpy1 + extent, shape.x1, shape.y1 + extent);
      }
      ctx.closePath();
    };
    SankeyPath2.prototype.highlight = function() {
      enterEmphasis(this);
    };
    SankeyPath2.prototype.downplay = function() {
      leaveEmphasis(this);
    };
    return SankeyPath2;
  }(Path_default)
);
var SankeyView = (
  /** @class */
  function(_super) {
    __extends(SankeyView2, _super);
    function SankeyView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = SankeyView2.type;
      _this._focusAdjacencyDisabled = false;
      return _this;
    }
    SankeyView2.prototype.render = function(seriesModel, ecModel, api) {
      var sankeyView = this;
      var graph = seriesModel.getGraph();
      var group = this.group;
      var layoutInfo = seriesModel.layoutInfo;
      var width = layoutInfo.width;
      var height = layoutInfo.height;
      var nodeData = seriesModel.getData();
      var edgeData = seriesModel.getData("edge");
      var orient = seriesModel.get("orient");
      this._model = seriesModel;
      group.removeAll();
      group.x = layoutInfo.x;
      group.y = layoutInfo.y;
      graph.eachEdge(function(edge) {
        var curve = new SankeyPath();
        var ecData = getECData(curve);
        ecData.dataIndex = edge.dataIndex;
        ecData.seriesIndex = seriesModel.seriesIndex;
        ecData.dataType = "edge";
        var edgeModel = edge.getModel();
        var lineStyleModel = edgeModel.getModel("lineStyle");
        var curvature = lineStyleModel.get("curveness");
        var n1Layout = edge.node1.getLayout();
        var node1Model = edge.node1.getModel();
        var dragX1 = node1Model.get("localX");
        var dragY1 = node1Model.get("localY");
        var n2Layout = edge.node2.getLayout();
        var node2Model = edge.node2.getModel();
        var dragX2 = node2Model.get("localX");
        var dragY2 = node2Model.get("localY");
        var edgeLayout = edge.getLayout();
        var x1;
        var y1;
        var x2;
        var y2;
        var cpx1;
        var cpy1;
        var cpx2;
        var cpy2;
        curve.shape.extent = Math.max(1, edgeLayout.dy);
        curve.shape.orient = orient;
        if (orient === "vertical") {
          x1 = (dragX1 != null ? dragX1 * width : n1Layout.x) + edgeLayout.sy;
          y1 = (dragY1 != null ? dragY1 * height : n1Layout.y) + n1Layout.dy;
          x2 = (dragX2 != null ? dragX2 * width : n2Layout.x) + edgeLayout.ty;
          y2 = dragY2 != null ? dragY2 * height : n2Layout.y;
          cpx1 = x1;
          cpy1 = y1 * (1 - curvature) + y2 * curvature;
          cpx2 = x2;
          cpy2 = y1 * curvature + y2 * (1 - curvature);
        } else {
          x1 = (dragX1 != null ? dragX1 * width : n1Layout.x) + n1Layout.dx;
          y1 = (dragY1 != null ? dragY1 * height : n1Layout.y) + edgeLayout.sy;
          x2 = dragX2 != null ? dragX2 * width : n2Layout.x;
          y2 = (dragY2 != null ? dragY2 * height : n2Layout.y) + edgeLayout.ty;
          cpx1 = x1 * (1 - curvature) + x2 * curvature;
          cpy1 = y1;
          cpx2 = x1 * curvature + x2 * (1 - curvature);
          cpy2 = y2;
        }
        curve.setShape({
          x1,
          y1,
          x2,
          y2,
          cpx1,
          cpy1,
          cpx2,
          cpy2
        });
        curve.useStyle(lineStyleModel.getItemStyle());
        applyCurveStyle(curve.style, orient, edge);
        var defaultEdgeLabelText = "" + edgeModel.get("value");
        var edgeLabelStateModels = getLabelStatesModels(edgeModel, "edgeLabel");
        setLabelStyle(curve, edgeLabelStateModels, {
          labelFetcher: {
            getFormattedLabel: function(dataIndex, stateName, dataType, labelDimIndex, formatter, extendParams) {
              return seriesModel.getFormattedLabel(
                dataIndex,
                stateName,
                "edge",
                labelDimIndex,
                // ensure edgeLabel formatter is provided
                // to prevent the inheritance from `label.formatter` of the series
                retrieve3(formatter, edgeLabelStateModels.normal && edgeLabelStateModels.normal.get("formatter"), defaultEdgeLabelText),
                extendParams
              );
            }
          },
          labelDataIndex: edge.dataIndex,
          defaultText: defaultEdgeLabelText
        });
        curve.setTextConfig({
          position: "inside"
        });
        var emphasisModel = edgeModel.getModel("emphasis");
        setStatesStylesFromModel(curve, edgeModel, "lineStyle", function(model) {
          var style = model.getItemStyle();
          applyCurveStyle(style, orient, edge);
          return style;
        });
        group.add(curve);
        edgeData.setItemGraphicEl(edge.dataIndex, curve);
        var focus = emphasisModel.get("focus");
        toggleHoverEmphasis(curve, focus === "adjacency" ? edge.getAdjacentDataIndices() : focus === "trajectory" ? edge.getTrajectoryDataIndices() : focus, emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
      });
      graph.eachNode(function(node) {
        var layout2 = node.getLayout();
        var itemModel = node.getModel();
        var dragX = itemModel.get("localX");
        var dragY = itemModel.get("localY");
        var emphasisModel = itemModel.getModel("emphasis");
        var borderRadius = itemModel.get(["itemStyle", "borderRadius"]) || 0;
        var rect = new Rect_default({
          shape: {
            x: dragX != null ? dragX * width : layout2.x,
            y: dragY != null ? dragY * height : layout2.y,
            width: layout2.dx,
            height: layout2.dy,
            r: borderRadius
          },
          style: itemModel.getModel("itemStyle").getItemStyle(),
          z2: 10
        });
        setLabelStyle(rect, getLabelStatesModels(itemModel), {
          labelFetcher: {
            getFormattedLabel: function(dataIndex, stateName) {
              return seriesModel.getFormattedLabel(dataIndex, stateName, "node");
            }
          },
          labelDataIndex: node.dataIndex,
          defaultText: node.id
        });
        rect.disableLabelAnimation = true;
        rect.setStyle("fill", node.getVisual("color"));
        rect.setStyle("decal", node.getVisual("style").decal);
        setStatesStylesFromModel(rect, itemModel);
        group.add(rect);
        nodeData.setItemGraphicEl(node.dataIndex, rect);
        getECData(rect).dataType = "node";
        var focus = emphasisModel.get("focus");
        toggleHoverEmphasis(rect, focus === "adjacency" ? node.getAdjacentDataIndices() : focus === "trajectory" ? node.getTrajectoryDataIndices() : focus, emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
      });
      nodeData.eachItemGraphicEl(function(el, dataIndex) {
        var itemModel = nodeData.getItemModel(dataIndex);
        if (itemModel.get("draggable")) {
          el.drift = function(dx, dy) {
            sankeyView._focusAdjacencyDisabled = true;
            this.shape.x += dx;
            this.shape.y += dy;
            this.dirty();
            api.dispatchAction({
              type: "dragNode",
              seriesId: seriesModel.id,
              dataIndex: nodeData.getRawIndex(dataIndex),
              localX: this.shape.x / width,
              localY: this.shape.y / height
            });
          };
          el.ondragend = function() {
            sankeyView._focusAdjacencyDisabled = false;
          };
          el.draggable = true;
          el.cursor = "move";
        }
      });
      if (!this._data && seriesModel.isAnimationEnabled()) {
        group.setClipPath(createGridClipShape2(group.getBoundingRect(), seriesModel, function() {
          group.removeClipPath();
        }));
      }
      this._data = seriesModel.getData();
    };
    SankeyView2.prototype.dispose = function() {
    };
    SankeyView2.type = "sankey";
    return SankeyView2;
  }(Chart_default)
);
function applyCurveStyle(curveProps, orient, edge) {
  switch (curveProps.fill) {
    case "source":
      curveProps.fill = edge.node1.getVisual("color");
      curveProps.decal = edge.node1.getVisual("style").decal;
      break;
    case "target":
      curveProps.fill = edge.node2.getVisual("color");
      curveProps.decal = edge.node2.getVisual("style").decal;
      break;
    case "gradient":
      var sourceColor = edge.node1.getVisual("color");
      var targetColor = edge.node2.getVisual("color");
      if (isString(sourceColor) && isString(targetColor)) {
        curveProps.fill = new LinearGradient_default(0, 0, +(orient === "horizontal"), +(orient === "vertical"), [{
          color: sourceColor,
          offset: 0
        }, {
          color: targetColor,
          offset: 1
        }]);
      }
  }
}
function createGridClipShape2(rect, seriesModel, cb) {
  var rectEl = new Rect_default({
    shape: {
      x: rect.x - 10,
      y: rect.y - 10,
      width: 0,
      height: rect.height + 20
    }
  });
  initProps(rectEl, {
    shape: {
      width: rect.width + 20
    }
  }, seriesModel, cb);
  return rectEl;
}
var SankeyView_default = SankeyView;

// node_modules/echarts/lib/chart/sankey/SankeySeries.js
var SankeySeriesModel = (
  /** @class */
  function(_super) {
    __extends(SankeySeriesModel2, _super);
    function SankeySeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = SankeySeriesModel2.type;
      return _this;
    }
    SankeySeriesModel2.prototype.getInitialData = function(option, ecModel) {
      var links = option.edges || option.links || [];
      var nodes = option.data || option.nodes || [];
      var levels = option.levels || [];
      this.levelModels = [];
      var levelModels = this.levelModels;
      for (var i = 0; i < levels.length; i++) {
        if (levels[i].depth != null && levels[i].depth >= 0) {
          levelModels[levels[i].depth] = new Model_default(levels[i], this, ecModel);
        } else {
          if (true) {
            throw new Error("levels[i].depth is mandatory and should be natural number");
          }
        }
      }
      var graph = createGraphFromNodeEdge(nodes, links, this, true, beforeLink);
      return graph.data;
      function beforeLink(nodeData, edgeData) {
        nodeData.wrapMethod("getItemModel", function(model, idx) {
          var seriesModel = model.parentModel;
          var layout2 = seriesModel.getData().getItemLayout(idx);
          if (layout2) {
            var nodeDepth = layout2.depth;
            var levelModel = seriesModel.levelModels[nodeDepth];
            if (levelModel) {
              model.parentModel = levelModel;
            }
          }
          return model;
        });
        edgeData.wrapMethod("getItemModel", function(model, idx) {
          var seriesModel = model.parentModel;
          var edge = seriesModel.getGraph().getEdgeByIndex(idx);
          var layout2 = edge.node1.getLayout();
          if (layout2) {
            var depth = layout2.depth;
            var levelModel = seriesModel.levelModels[depth];
            if (levelModel) {
              model.parentModel = levelModel;
            }
          }
          return model;
        });
      }
    };
    SankeySeriesModel2.prototype.setNodePosition = function(dataIndex, localPosition) {
      var nodes = this.option.data || this.option.nodes;
      var dataItem = nodes[dataIndex];
      dataItem.localX = localPosition[0];
      dataItem.localY = localPosition[1];
    };
    SankeySeriesModel2.prototype.getGraph = function() {
      return this.getData().graph;
    };
    SankeySeriesModel2.prototype.getEdgeData = function() {
      return this.getGraph().edgeData;
    };
    SankeySeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      function noValue(val) {
        return isNaN(val) || val == null;
      }
      if (dataType === "edge") {
        var params = this.getDataParams(dataIndex, dataType);
        var rawDataOpt = params.data;
        var edgeValue = params.value;
        var edgeName = rawDataOpt.source + " -- " + rawDataOpt.target;
        return createTooltipMarkup("nameValue", {
          name: edgeName,
          value: edgeValue,
          noValue: noValue(edgeValue)
        });
      } else {
        var node = this.getGraph().getNodeByIndex(dataIndex);
        var value = node.getLayout().value;
        var name_1 = this.getDataParams(dataIndex, dataType).data.name;
        return createTooltipMarkup("nameValue", {
          name: name_1 != null ? name_1 + "" : null,
          value,
          noValue: noValue(value)
        });
      }
    };
    SankeySeriesModel2.prototype.optionUpdated = function() {
    };
    SankeySeriesModel2.prototype.getDataParams = function(dataIndex, dataType) {
      var params = _super.prototype.getDataParams.call(this, dataIndex, dataType);
      if (params.value == null && dataType === "node") {
        var node = this.getGraph().getNodeByIndex(dataIndex);
        var nodeValue = node.getLayout().value;
        params.value = nodeValue;
      }
      return params;
    };
    SankeySeriesModel2.type = "series.sankey";
    SankeySeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "view",
      left: "5%",
      top: "5%",
      right: "20%",
      bottom: "5%",
      orient: "horizontal",
      nodeWidth: 20,
      nodeGap: 8,
      draggable: true,
      layoutIterations: 32,
      label: {
        show: true,
        position: "right",
        fontSize: 12
      },
      edgeLabel: {
        show: false,
        fontSize: 12
      },
      levels: [],
      nodeAlign: "justify",
      lineStyle: {
        color: "#314656",
        opacity: 0.2,
        curveness: 0.5
      },
      emphasis: {
        label: {
          show: true
        },
        lineStyle: {
          opacity: 0.5
        }
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      },
      animationEasing: "linear",
      animationDuration: 1e3
    };
    return SankeySeriesModel2;
  }(Series_default)
);
var SankeySeries_default = SankeySeriesModel;

// node_modules/echarts/lib/chart/sankey/sankeyLayout.js
function sankeyLayout(ecModel, api) {
  ecModel.eachSeriesByType("sankey", function(seriesModel) {
    var nodeWidth = seriesModel.get("nodeWidth");
    var nodeGap = seriesModel.get("nodeGap");
    var layoutInfo = getViewRect5(seriesModel, api);
    seriesModel.layoutInfo = layoutInfo;
    var width = layoutInfo.width;
    var height = layoutInfo.height;
    var graph = seriesModel.getGraph();
    var nodes = graph.nodes;
    var edges = graph.edges;
    computeNodeValues(nodes);
    var filteredNodes = filter(nodes, function(node) {
      return node.getLayout().value === 0;
    });
    var iterations = filteredNodes.length !== 0 ? 0 : seriesModel.get("layoutIterations");
    var orient = seriesModel.get("orient");
    var nodeAlign = seriesModel.get("nodeAlign");
    layoutSankey(nodes, edges, nodeWidth, nodeGap, width, height, iterations, orient, nodeAlign);
  });
}
function getViewRect5(seriesModel, api) {
  return getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}
function layoutSankey(nodes, edges, nodeWidth, nodeGap, width, height, iterations, orient, nodeAlign) {
  computeNodeBreadths(nodes, edges, nodeWidth, width, height, orient, nodeAlign);
  computeNodeDepths(nodes, edges, height, width, nodeGap, iterations, orient);
  computeEdgeDepths(nodes, orient);
}
function computeNodeValues(nodes) {
  each(nodes, function(node) {
    var value1 = sum(node.outEdges, getEdgeValue);
    var value2 = sum(node.inEdges, getEdgeValue);
    var nodeRawValue = node.getValue() || 0;
    var value = Math.max(value1, value2, nodeRawValue);
    node.setLayout({
      value
    }, true);
  });
}
function computeNodeBreadths(nodes, edges, nodeWidth, width, height, orient, nodeAlign) {
  var remainEdges = [];
  var indegreeArr = [];
  var zeroIndegrees = [];
  var nextTargetNode = [];
  var x = 0;
  for (var i = 0; i < edges.length; i++) {
    remainEdges[i] = 1;
  }
  for (var i = 0; i < nodes.length; i++) {
    indegreeArr[i] = nodes[i].inEdges.length;
    if (indegreeArr[i] === 0) {
      zeroIndegrees.push(nodes[i]);
    }
  }
  var maxNodeDepth = -1;
  while (zeroIndegrees.length) {
    for (var idx = 0; idx < zeroIndegrees.length; idx++) {
      var node = zeroIndegrees[idx];
      var item = node.hostGraph.data.getRawDataItem(node.dataIndex);
      var isItemDepth = item.depth != null && item.depth >= 0;
      if (isItemDepth && item.depth > maxNodeDepth) {
        maxNodeDepth = item.depth;
      }
      node.setLayout({
        depth: isItemDepth ? item.depth : x
      }, true);
      orient === "vertical" ? node.setLayout({
        dy: nodeWidth
      }, true) : node.setLayout({
        dx: nodeWidth
      }, true);
      for (var edgeIdx = 0; edgeIdx < node.outEdges.length; edgeIdx++) {
        var edge = node.outEdges[edgeIdx];
        var indexEdge = edges.indexOf(edge);
        remainEdges[indexEdge] = 0;
        var targetNode = edge.node2;
        var nodeIndex = nodes.indexOf(targetNode);
        if (--indegreeArr[nodeIndex] === 0 && nextTargetNode.indexOf(targetNode) < 0) {
          nextTargetNode.push(targetNode);
        }
      }
    }
    ++x;
    zeroIndegrees = nextTargetNode;
    nextTargetNode = [];
  }
  for (var i = 0; i < remainEdges.length; i++) {
    if (remainEdges[i] === 1) {
      throw new Error("Sankey is a DAG, the original data has cycle!");
    }
  }
  var maxDepth = maxNodeDepth > x - 1 ? maxNodeDepth : x - 1;
  if (nodeAlign && nodeAlign !== "left") {
    adjustNodeWithNodeAlign(nodes, nodeAlign, orient, maxDepth);
  }
  var kx = orient === "vertical" ? (height - nodeWidth) / maxDepth : (width - nodeWidth) / maxDepth;
  scaleNodeBreadths(nodes, kx, orient);
}
function isNodeDepth(node) {
  var item = node.hostGraph.data.getRawDataItem(node.dataIndex);
  return item.depth != null && item.depth >= 0;
}
function adjustNodeWithNodeAlign(nodes, nodeAlign, orient, maxDepth) {
  if (nodeAlign === "right") {
    var nextSourceNode = [];
    var remainNodes = nodes;
    var nodeHeight = 0;
    while (remainNodes.length) {
      for (var i = 0; i < remainNodes.length; i++) {
        var node = remainNodes[i];
        node.setLayout({
          skNodeHeight: nodeHeight
        }, true);
        for (var j = 0; j < node.inEdges.length; j++) {
          var edge = node.inEdges[j];
          if (nextSourceNode.indexOf(edge.node1) < 0) {
            nextSourceNode.push(edge.node1);
          }
        }
      }
      remainNodes = nextSourceNode;
      nextSourceNode = [];
      ++nodeHeight;
    }
    each(nodes, function(node2) {
      if (!isNodeDepth(node2)) {
        node2.setLayout({
          depth: Math.max(0, maxDepth - node2.getLayout().skNodeHeight)
        }, true);
      }
    });
  } else if (nodeAlign === "justify") {
    moveSinksRight(nodes, maxDepth);
  }
}
function moveSinksRight(nodes, maxDepth) {
  each(nodes, function(node) {
    if (!isNodeDepth(node) && !node.outEdges.length) {
      node.setLayout({
        depth: maxDepth
      }, true);
    }
  });
}
function scaleNodeBreadths(nodes, kx, orient) {
  each(nodes, function(node) {
    var nodeDepth = node.getLayout().depth * kx;
    orient === "vertical" ? node.setLayout({
      y: nodeDepth
    }, true) : node.setLayout({
      x: nodeDepth
    }, true);
  });
}
function computeNodeDepths(nodes, edges, height, width, nodeGap, iterations, orient) {
  var nodesByBreadth = prepareNodesByBreadth(nodes, orient);
  initializeNodeDepth(nodesByBreadth, edges, height, width, nodeGap, orient);
  resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);
  for (var alpha = 1; iterations > 0; iterations--) {
    alpha *= 0.99;
    relaxRightToLeft(nodesByBreadth, alpha, orient);
    resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);
    relaxLeftToRight(nodesByBreadth, alpha, orient);
    resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);
  }
}
function prepareNodesByBreadth(nodes, orient) {
  var nodesByBreadth = [];
  var keyAttr = orient === "vertical" ? "y" : "x";
  var groupResult = groupData(nodes, function(node) {
    return node.getLayout()[keyAttr];
  });
  groupResult.keys.sort(function(a, b) {
    return a - b;
  });
  each(groupResult.keys, function(key) {
    nodesByBreadth.push(groupResult.buckets.get(key));
  });
  return nodesByBreadth;
}
function initializeNodeDepth(nodesByBreadth, edges, height, width, nodeGap, orient) {
  var minKy = Infinity;
  each(nodesByBreadth, function(nodes) {
    var n = nodes.length;
    var sum2 = 0;
    each(nodes, function(node) {
      sum2 += node.getLayout().value;
    });
    var ky = orient === "vertical" ? (width - (n - 1) * nodeGap) / sum2 : (height - (n - 1) * nodeGap) / sum2;
    if (ky < minKy) {
      minKy = ky;
    }
  });
  each(nodesByBreadth, function(nodes) {
    each(nodes, function(node, i) {
      var nodeDy = node.getLayout().value * minKy;
      if (orient === "vertical") {
        node.setLayout({
          x: i
        }, true);
        node.setLayout({
          dx: nodeDy
        }, true);
      } else {
        node.setLayout({
          y: i
        }, true);
        node.setLayout({
          dy: nodeDy
        }, true);
      }
    });
  });
  each(edges, function(edge) {
    var edgeDy = +edge.getValue() * minKy;
    edge.setLayout({
      dy: edgeDy
    }, true);
  });
}
function resolveCollisions(nodesByBreadth, nodeGap, height, width, orient) {
  var keyAttr = orient === "vertical" ? "x" : "y";
  each(nodesByBreadth, function(nodes) {
    nodes.sort(function(a, b) {
      return a.getLayout()[keyAttr] - b.getLayout()[keyAttr];
    });
    var nodeX;
    var node;
    var dy;
    var y0 = 0;
    var n = nodes.length;
    var nodeDyAttr = orient === "vertical" ? "dx" : "dy";
    for (var i = 0; i < n; i++) {
      node = nodes[i];
      dy = y0 - node.getLayout()[keyAttr];
      if (dy > 0) {
        nodeX = node.getLayout()[keyAttr] + dy;
        orient === "vertical" ? node.setLayout({
          x: nodeX
        }, true) : node.setLayout({
          y: nodeX
        }, true);
      }
      y0 = node.getLayout()[keyAttr] + node.getLayout()[nodeDyAttr] + nodeGap;
    }
    var viewWidth = orient === "vertical" ? width : height;
    dy = y0 - nodeGap - viewWidth;
    if (dy > 0) {
      nodeX = node.getLayout()[keyAttr] - dy;
      orient === "vertical" ? node.setLayout({
        x: nodeX
      }, true) : node.setLayout({
        y: nodeX
      }, true);
      y0 = nodeX;
      for (var i = n - 2; i >= 0; --i) {
        node = nodes[i];
        dy = node.getLayout()[keyAttr] + node.getLayout()[nodeDyAttr] + nodeGap - y0;
        if (dy > 0) {
          nodeX = node.getLayout()[keyAttr] - dy;
          orient === "vertical" ? node.setLayout({
            x: nodeX
          }, true) : node.setLayout({
            y: nodeX
          }, true);
        }
        y0 = node.getLayout()[keyAttr];
      }
    }
  });
}
function relaxRightToLeft(nodesByBreadth, alpha, orient) {
  each(nodesByBreadth.slice().reverse(), function(nodes) {
    each(nodes, function(node) {
      if (node.outEdges.length) {
        var y = sum(node.outEdges, weightedTarget, orient) / sum(node.outEdges, getEdgeValue);
        if (isNaN(y)) {
          var len2 = node.outEdges.length;
          y = len2 ? sum(node.outEdges, centerTarget, orient) / len2 : 0;
        }
        if (orient === "vertical") {
          var nodeX = node.getLayout().x + (y - center(node, orient)) * alpha;
          node.setLayout({
            x: nodeX
          }, true);
        } else {
          var nodeY = node.getLayout().y + (y - center(node, orient)) * alpha;
          node.setLayout({
            y: nodeY
          }, true);
        }
      }
    });
  });
}
function weightedTarget(edge, orient) {
  return center(edge.node2, orient) * edge.getValue();
}
function centerTarget(edge, orient) {
  return center(edge.node2, orient);
}
function weightedSource(edge, orient) {
  return center(edge.node1, orient) * edge.getValue();
}
function centerSource(edge, orient) {
  return center(edge.node1, orient);
}
function center(node, orient) {
  return orient === "vertical" ? node.getLayout().x + node.getLayout().dx / 2 : node.getLayout().y + node.getLayout().dy / 2;
}
function getEdgeValue(edge) {
  return edge.getValue();
}
function sum(array, cb, orient) {
  var sum2 = 0;
  var len2 = array.length;
  var i = -1;
  while (++i < len2) {
    var value = +cb(array[i], orient);
    if (!isNaN(value)) {
      sum2 += value;
    }
  }
  return sum2;
}
function relaxLeftToRight(nodesByBreadth, alpha, orient) {
  each(nodesByBreadth, function(nodes) {
    each(nodes, function(node) {
      if (node.inEdges.length) {
        var y = sum(node.inEdges, weightedSource, orient) / sum(node.inEdges, getEdgeValue);
        if (isNaN(y)) {
          var len2 = node.inEdges.length;
          y = len2 ? sum(node.inEdges, centerSource, orient) / len2 : 0;
        }
        if (orient === "vertical") {
          var nodeX = node.getLayout().x + (y - center(node, orient)) * alpha;
          node.setLayout({
            x: nodeX
          }, true);
        } else {
          var nodeY = node.getLayout().y + (y - center(node, orient)) * alpha;
          node.setLayout({
            y: nodeY
          }, true);
        }
      }
    });
  });
}
function computeEdgeDepths(nodes, orient) {
  var keyAttr = orient === "vertical" ? "x" : "y";
  each(nodes, function(node) {
    node.outEdges.sort(function(a, b) {
      return a.node2.getLayout()[keyAttr] - b.node2.getLayout()[keyAttr];
    });
    node.inEdges.sort(function(a, b) {
      return a.node1.getLayout()[keyAttr] - b.node1.getLayout()[keyAttr];
    });
  });
  each(nodes, function(node) {
    var sy = 0;
    var ty = 0;
    each(node.outEdges, function(edge) {
      edge.setLayout({
        sy
      }, true);
      sy += edge.getLayout().dy;
    });
    each(node.inEdges, function(edge) {
      edge.setLayout({
        ty
      }, true);
      ty += edge.getLayout().dy;
    });
  });
}

// node_modules/echarts/lib/chart/sankey/sankeyVisual.js
function sankeyVisual(ecModel) {
  ecModel.eachSeriesByType("sankey", function(seriesModel) {
    var graph = seriesModel.getGraph();
    var nodes = graph.nodes;
    var edges = graph.edges;
    if (nodes.length) {
      var minValue_1 = Infinity;
      var maxValue_1 = -Infinity;
      each(nodes, function(node) {
        var nodeValue = node.getLayout().value;
        if (nodeValue < minValue_1) {
          minValue_1 = nodeValue;
        }
        if (nodeValue > maxValue_1) {
          maxValue_1 = nodeValue;
        }
      });
      each(nodes, function(node) {
        var mapping = new VisualMapping_default({
          type: "color",
          mappingMethod: "linear",
          dataExtent: [minValue_1, maxValue_1],
          visual: seriesModel.get("color")
        });
        var mapValueToColor = mapping.mapValueToVisual(node.getLayout().value);
        var customColor = node.getModel().get(["itemStyle", "color"]);
        if (customColor != null) {
          node.setVisual("color", customColor);
          node.setVisual("style", {
            fill: customColor
          });
        } else {
          node.setVisual("color", mapValueToColor);
          node.setVisual("style", {
            fill: mapValueToColor
          });
        }
      });
    }
    if (edges.length) {
      each(edges, function(edge) {
        var edgeStyle = edge.getModel().get("lineStyle");
        edge.setVisual("style", edgeStyle);
      });
    }
  });
}

// node_modules/echarts/lib/chart/sankey/install.js
function install17(registers) {
  registers.registerChartView(SankeyView_default);
  registers.registerSeriesModel(SankeySeries_default);
  registers.registerLayout(sankeyLayout);
  registers.registerVisual(sankeyVisual);
  registers.registerAction({
    type: "dragNode",
    event: "dragnode",
    // here can only use 'update' now, other value is not support in echarts.
    update: "update"
  }, function(payload, ecModel) {
    ecModel.eachComponent({
      mainType: "series",
      subType: "sankey",
      query: payload
    }, function(seriesModel) {
      seriesModel.setNodePosition(payload.dataIndex, [payload.localX, payload.localY]);
    });
  });
}

// node_modules/echarts/lib/chart/helper/whiskerBoxCommon.js
var WhiskerBoxCommonMixin = (
  /** @class */
  function() {
    function WhiskerBoxCommonMixin2() {
    }
    WhiskerBoxCommonMixin2.prototype._hasEncodeRule = function(key) {
      var encodeRules = this.getEncode();
      return encodeRules && encodeRules.get(key) != null;
    };
    WhiskerBoxCommonMixin2.prototype.getInitialData = function(option, ecModel) {
      var ordinalMeta;
      var xAxisModel = ecModel.getComponent("xAxis", this.get("xAxisIndex"));
      var yAxisModel = ecModel.getComponent("yAxis", this.get("yAxisIndex"));
      var xAxisType = xAxisModel.get("type");
      var yAxisType = yAxisModel.get("type");
      var addOrdinal;
      if (xAxisType === "category") {
        option.layout = "horizontal";
        ordinalMeta = xAxisModel.getOrdinalMeta();
        addOrdinal = !this._hasEncodeRule("x");
      } else if (yAxisType === "category") {
        option.layout = "vertical";
        ordinalMeta = yAxisModel.getOrdinalMeta();
        addOrdinal = !this._hasEncodeRule("y");
      } else {
        option.layout = option.layout || "horizontal";
      }
      var coordDims = ["x", "y"];
      var baseAxisDimIndex = option.layout === "horizontal" ? 0 : 1;
      var baseAxisDim = this._baseAxisDim = coordDims[baseAxisDimIndex];
      var otherAxisDim = coordDims[1 - baseAxisDimIndex];
      var axisModels = [xAxisModel, yAxisModel];
      var baseAxisType = axisModels[baseAxisDimIndex].get("type");
      var otherAxisType = axisModels[1 - baseAxisDimIndex].get("type");
      var data = option.data;
      if (data && addOrdinal) {
        var newOptionData_1 = [];
        each(data, function(item, index) {
          var newItem;
          if (isArray(item)) {
            newItem = item.slice();
            item.unshift(index);
          } else if (isArray(item.value)) {
            newItem = extend({}, item);
            newItem.value = newItem.value.slice();
            item.value.unshift(index);
          } else {
            newItem = item;
          }
          newOptionData_1.push(newItem);
        });
        option.data = newOptionData_1;
      }
      var defaultValueDimensions = this.defaultValueDimensions;
      var coordDimensions = [{
        name: baseAxisDim,
        type: getDimensionTypeByAxis(baseAxisType),
        ordinalMeta,
        otherDims: {
          tooltip: false,
          itemName: 0
        },
        dimsDef: ["base"]
      }, {
        name: otherAxisDim,
        type: getDimensionTypeByAxis(otherAxisType),
        dimsDef: defaultValueDimensions.slice()
      }];
      return createSeriesDataSimply(this, {
        coordDimensions,
        dimensionsCount: defaultValueDimensions.length + 1,
        encodeDefaulter: curry(makeSeriesEncodeForAxisCoordSys, coordDimensions, this)
      });
    };
    WhiskerBoxCommonMixin2.prototype.getBaseAxis = function() {
      var dim = this._baseAxisDim;
      return this.ecModel.getComponent(dim + "Axis", this.get(dim + "AxisIndex")).axis;
    };
    return WhiskerBoxCommonMixin2;
  }()
);

// node_modules/echarts/lib/chart/boxplot/BoxplotSeries.js
var BoxplotSeriesModel = (
  /** @class */
  function(_super) {
    __extends(BoxplotSeriesModel2, _super);
    function BoxplotSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = BoxplotSeriesModel2.type;
      _this.defaultValueDimensions = [{
        name: "min",
        defaultTooltip: true
      }, {
        name: "Q1",
        defaultTooltip: true
      }, {
        name: "median",
        defaultTooltip: true
      }, {
        name: "Q3",
        defaultTooltip: true
      }, {
        name: "max",
        defaultTooltip: true
      }];
      _this.visualDrawType = "stroke";
      return _this;
    }
    BoxplotSeriesModel2.type = "series.boxplot";
    BoxplotSeriesModel2.dependencies = ["xAxis", "yAxis", "grid"];
    BoxplotSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: true,
      layout: null,
      boxWidth: [7, 50],
      itemStyle: {
        color: "#fff",
        borderWidth: 1
      },
      emphasis: {
        scale: true,
        itemStyle: {
          borderWidth: 2,
          shadowBlur: 5,
          shadowOffsetX: 1,
          shadowOffsetY: 1,
          shadowColor: "rgba(0,0,0,0.2)"
        }
      },
      animationDuration: 800
    };
    return BoxplotSeriesModel2;
  }(Series_default)
);
mixin(BoxplotSeriesModel, WhiskerBoxCommonMixin, true);
var BoxplotSeries_default = BoxplotSeriesModel;

// node_modules/echarts/lib/chart/boxplot/BoxplotView.js
var BoxplotView = (
  /** @class */
  function(_super) {
    __extends(BoxplotView2, _super);
    function BoxplotView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = BoxplotView2.type;
      return _this;
    }
    BoxplotView2.prototype.render = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var group = this.group;
      var oldData = this._data;
      if (!this._data) {
        group.removeAll();
      }
      var constDim = seriesModel.get("layout") === "horizontal" ? 1 : 0;
      data.diff(oldData).add(function(newIdx) {
        if (data.hasValue(newIdx)) {
          var itemLayout = data.getItemLayout(newIdx);
          var symbolEl = createNormalBox(itemLayout, data, newIdx, constDim, true);
          data.setItemGraphicEl(newIdx, symbolEl);
          group.add(symbolEl);
        }
      }).update(function(newIdx, oldIdx) {
        var symbolEl = oldData.getItemGraphicEl(oldIdx);
        if (!data.hasValue(newIdx)) {
          group.remove(symbolEl);
          return;
        }
        var itemLayout = data.getItemLayout(newIdx);
        if (!symbolEl) {
          symbolEl = createNormalBox(itemLayout, data, newIdx, constDim);
        } else {
          saveOldStyle(symbolEl);
          updateNormalBoxData(itemLayout, symbolEl, data, newIdx);
        }
        group.add(symbolEl);
        data.setItemGraphicEl(newIdx, symbolEl);
      }).remove(function(oldIdx) {
        var el = oldData.getItemGraphicEl(oldIdx);
        el && group.remove(el);
      }).execute();
      this._data = data;
    };
    BoxplotView2.prototype.remove = function(ecModel) {
      var group = this.group;
      var data = this._data;
      this._data = null;
      data && data.eachItemGraphicEl(function(el) {
        el && group.remove(el);
      });
    };
    BoxplotView2.type = "boxplot";
    return BoxplotView2;
  }(Chart_default)
);
var BoxPathShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function BoxPathShape2() {
    }
    return BoxPathShape2;
  }()
);
var BoxPath = (
  /** @class */
  function(_super) {
    __extends(BoxPath2, _super);
    function BoxPath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "boxplotBoxPath";
      return _this;
    }
    BoxPath2.prototype.getDefaultShape = function() {
      return new BoxPathShape();
    };
    BoxPath2.prototype.buildPath = function(ctx, shape) {
      var ends = shape.points;
      var i = 0;
      ctx.moveTo(ends[i][0], ends[i][1]);
      i++;
      for (; i < 4; i++) {
        ctx.lineTo(ends[i][0], ends[i][1]);
      }
      ctx.closePath();
      for (; i < ends.length; i++) {
        ctx.moveTo(ends[i][0], ends[i][1]);
        i++;
        ctx.lineTo(ends[i][0], ends[i][1]);
      }
    };
    return BoxPath2;
  }(Path_default)
);
function createNormalBox(itemLayout, data, dataIndex, constDim, isInit) {
  var ends = itemLayout.ends;
  var el = new BoxPath({
    shape: {
      points: isInit ? transInit(ends, constDim, itemLayout) : ends
    }
  });
  updateNormalBoxData(itemLayout, el, data, dataIndex, isInit);
  return el;
}
function updateNormalBoxData(itemLayout, el, data, dataIndex, isInit) {
  var seriesModel = data.hostModel;
  var updateMethod = graphic_exports[isInit ? "initProps" : "updateProps"];
  updateMethod(el, {
    shape: {
      points: itemLayout.ends
    }
  }, seriesModel, dataIndex);
  el.useStyle(data.getItemVisual(dataIndex, "style"));
  el.style.strokeNoScale = true;
  el.z2 = 100;
  var itemModel = data.getItemModel(dataIndex);
  var emphasisModel = itemModel.getModel("emphasis");
  setStatesStylesFromModel(el, itemModel);
  toggleHoverEmphasis(el, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
}
function transInit(points, dim, itemLayout) {
  return map(points, function(point) {
    point = point.slice();
    point[dim] = itemLayout.initBaseline;
    return point;
  });
}
var BoxplotView_default = BoxplotView;

// node_modules/echarts/lib/chart/boxplot/boxplotLayout.js
var each3 = each;
function boxplotLayout(ecModel) {
  var groupResult = groupSeriesByAxis(ecModel);
  each3(groupResult, function(groupItem) {
    var seriesModels = groupItem.seriesModels;
    if (!seriesModels.length) {
      return;
    }
    calculateBase(groupItem);
    each3(seriesModels, function(seriesModel, idx) {
      layoutSingleSeries(seriesModel, groupItem.boxOffsetList[idx], groupItem.boxWidthList[idx]);
    });
  });
}
function groupSeriesByAxis(ecModel) {
  var result = [];
  var axisList = [];
  ecModel.eachSeriesByType("boxplot", function(seriesModel) {
    var baseAxis = seriesModel.getBaseAxis();
    var idx = indexOf(axisList, baseAxis);
    if (idx < 0) {
      idx = axisList.length;
      axisList[idx] = baseAxis;
      result[idx] = {
        axis: baseAxis,
        seriesModels: []
      };
    }
    result[idx].seriesModels.push(seriesModel);
  });
  return result;
}
function calculateBase(groupItem) {
  var baseAxis = groupItem.axis;
  var seriesModels = groupItem.seriesModels;
  var seriesCount = seriesModels.length;
  var boxWidthList = groupItem.boxWidthList = [];
  var boxOffsetList = groupItem.boxOffsetList = [];
  var boundList = [];
  var bandWidth;
  if (baseAxis.type === "category") {
    bandWidth = baseAxis.getBandWidth();
  } else {
    var maxDataCount_1 = 0;
    each3(seriesModels, function(seriesModel) {
      maxDataCount_1 = Math.max(maxDataCount_1, seriesModel.getData().count());
    });
    var extent = baseAxis.getExtent();
    bandWidth = Math.abs(extent[1] - extent[0]) / maxDataCount_1;
  }
  each3(seriesModels, function(seriesModel) {
    var boxWidthBound = seriesModel.get("boxWidth");
    if (!isArray(boxWidthBound)) {
      boxWidthBound = [boxWidthBound, boxWidthBound];
    }
    boundList.push([parsePercent2(boxWidthBound[0], bandWidth) || 0, parsePercent2(boxWidthBound[1], bandWidth) || 0]);
  });
  var availableWidth = bandWidth * 0.8 - 2;
  var boxGap = availableWidth / seriesCount * 0.3;
  var boxWidth = (availableWidth - boxGap * (seriesCount - 1)) / seriesCount;
  var base = boxWidth / 2 - availableWidth / 2;
  each3(seriesModels, function(seriesModel, idx) {
    boxOffsetList.push(base);
    base += boxGap + boxWidth;
    boxWidthList.push(Math.min(Math.max(boxWidth, boundList[idx][0]), boundList[idx][1]));
  });
}
function layoutSingleSeries(seriesModel, offset, boxWidth) {
  var coordSys = seriesModel.coordinateSystem;
  var data = seriesModel.getData();
  var halfWidth = boxWidth / 2;
  var cDimIdx = seriesModel.get("layout") === "horizontal" ? 0 : 1;
  var vDimIdx = 1 - cDimIdx;
  var coordDims = ["x", "y"];
  var cDim = data.mapDimension(coordDims[cDimIdx]);
  var vDims = data.mapDimensionsAll(coordDims[vDimIdx]);
  if (cDim == null || vDims.length < 5) {
    return;
  }
  for (var dataIndex = 0; dataIndex < data.count(); dataIndex++) {
    var axisDimVal = data.get(cDim, dataIndex);
    var median = getPoint(axisDimVal, vDims[2], dataIndex);
    var end1 = getPoint(axisDimVal, vDims[0], dataIndex);
    var end2 = getPoint(axisDimVal, vDims[1], dataIndex);
    var end4 = getPoint(axisDimVal, vDims[3], dataIndex);
    var end5 = getPoint(axisDimVal, vDims[4], dataIndex);
    var ends = [];
    addBodyEnd(ends, end2, false);
    addBodyEnd(ends, end4, true);
    ends.push(end1, end2, end5, end4);
    layEndLine(ends, end1);
    layEndLine(ends, end5);
    layEndLine(ends, median);
    data.setItemLayout(dataIndex, {
      initBaseline: median[vDimIdx],
      ends
    });
  }
  function getPoint(axisDimVal2, dim, dataIndex2) {
    var val = data.get(dim, dataIndex2);
    var p = [];
    p[cDimIdx] = axisDimVal2;
    p[vDimIdx] = val;
    var point;
    if (isNaN(axisDimVal2) || isNaN(val)) {
      point = [NaN, NaN];
    } else {
      point = coordSys.dataToPoint(p);
      point[cDimIdx] += offset;
    }
    return point;
  }
  function addBodyEnd(ends2, point, start) {
    var point1 = point.slice();
    var point2 = point.slice();
    point1[cDimIdx] += halfWidth;
    point2[cDimIdx] -= halfWidth;
    start ? ends2.push(point1, point2) : ends2.push(point2, point1);
  }
  function layEndLine(ends2, endCenter) {
    var from = endCenter.slice();
    var to = endCenter.slice();
    from[cDimIdx] -= halfWidth;
    to[cDimIdx] += halfWidth;
    ends2.push(from, to);
  }
}

// node_modules/echarts/lib/chart/boxplot/prepareBoxplotData.js
function prepareBoxplotData(rawData, opt) {
  opt = opt || {};
  var boxData = [];
  var outliers = [];
  var boundIQR = opt.boundIQR;
  var useExtreme = boundIQR === "none" || boundIQR === 0;
  for (var i = 0; i < rawData.length; i++) {
    var ascList = asc(rawData[i].slice());
    var Q1 = quantile(ascList, 0.25);
    var Q2 = quantile(ascList, 0.5);
    var Q3 = quantile(ascList, 0.75);
    var min = ascList[0];
    var max = ascList[ascList.length - 1];
    var bound = (boundIQR == null ? 1.5 : boundIQR) * (Q3 - Q1);
    var low = useExtreme ? min : Math.max(min, Q1 - bound);
    var high = useExtreme ? max : Math.min(max, Q3 + bound);
    var itemNameFormatter = opt.itemNameFormatter;
    var itemName = isFunction(itemNameFormatter) ? itemNameFormatter({
      value: i
    }) : isString(itemNameFormatter) ? itemNameFormatter.replace("{value}", i + "") : i + "";
    boxData.push([itemName, low, Q1, Q2, Q3, high]);
    for (var j = 0; j < ascList.length; j++) {
      var dataItem = ascList[j];
      if (dataItem < low || dataItem > high) {
        var outlier = [itemName, dataItem];
        outliers.push(outlier);
      }
    }
  }
  return {
    boxData,
    outliers
  };
}

// node_modules/echarts/lib/chart/boxplot/boxplotTransform.js
var boxplotTransform = {
  type: "echarts:boxplot",
  transform: function transform(params) {
    var upstream = params.upstream;
    if (upstream.sourceFormat !== SOURCE_FORMAT_ARRAY_ROWS) {
      var errMsg = "";
      if (true) {
        errMsg = makePrintable("source data is not applicable for this boxplot transform. Expect number[][].");
      }
      throwError(errMsg);
    }
    var result = prepareBoxplotData(upstream.getRawData(), params.config);
    return [{
      dimensions: ["ItemName", "Low", "Q1", "Q2", "Q3", "High"],
      data: result.boxData
    }, {
      data: result.outliers
    }];
  }
};

// node_modules/echarts/lib/chart/boxplot/install.js
function install18(registers) {
  registers.registerSeriesModel(BoxplotSeries_default);
  registers.registerChartView(BoxplotView_default);
  registers.registerLayout(boxplotLayout);
  registers.registerTransform(boxplotTransform);
}

// node_modules/echarts/lib/chart/candlestick/candlestickVisual.js
var positiveBorderColorQuery = ["itemStyle", "borderColor"];
var negativeBorderColorQuery = ["itemStyle", "borderColor0"];
var dojiBorderColorQuery = ["itemStyle", "borderColorDoji"];
var positiveColorQuery = ["itemStyle", "color"];
var negativeColorQuery = ["itemStyle", "color0"];
function getColor(sign, model) {
  return model.get(sign > 0 ? positiveColorQuery : negativeColorQuery);
}
function getBorderColor(sign, model) {
  return model.get(sign === 0 ? dojiBorderColorQuery : sign > 0 ? positiveBorderColorQuery : negativeBorderColorQuery);
}
var candlestickVisual = {
  seriesType: "candlestick",
  plan: createRenderPlanner(),
  // For legend.
  performRawSeries: true,
  reset: function(seriesModel, ecModel) {
    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }
    var isLargeRender = seriesModel.pipelineContext.large;
    return !isLargeRender && {
      progress: function(params, data) {
        var dataIndex;
        while ((dataIndex = params.next()) != null) {
          var itemModel = data.getItemModel(dataIndex);
          var sign = data.getItemLayout(dataIndex).sign;
          var style = itemModel.getItemStyle();
          style.fill = getColor(sign, itemModel);
          style.stroke = getBorderColor(sign, itemModel) || style.fill;
          var existsStyle = data.ensureUniqueItemVisual(dataIndex, "style");
          extend(existsStyle, style);
        }
      }
    };
  }
};
var candlestickVisual_default = candlestickVisual;

// node_modules/echarts/lib/chart/candlestick/CandlestickView.js
var SKIP_PROPS = ["color", "borderColor"];
var CandlestickView = (
  /** @class */
  function(_super) {
    __extends(CandlestickView2, _super);
    function CandlestickView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = CandlestickView2.type;
      return _this;
    }
    CandlestickView2.prototype.render = function(seriesModel, ecModel, api) {
      this.group.removeClipPath();
      this._progressiveEls = null;
      this._updateDrawMode(seriesModel);
      this._isLargeDraw ? this._renderLarge(seriesModel) : this._renderNormal(seriesModel);
    };
    CandlestickView2.prototype.incrementalPrepareRender = function(seriesModel, ecModel, api) {
      this._clear();
      this._updateDrawMode(seriesModel);
    };
    CandlestickView2.prototype.incrementalRender = function(params, seriesModel, ecModel, api) {
      this._progressiveEls = [];
      this._isLargeDraw ? this._incrementalRenderLarge(params, seriesModel) : this._incrementalRenderNormal(params, seriesModel);
    };
    CandlestickView2.prototype.eachRendered = function(cb) {
      traverseElements(this._progressiveEls || this.group, cb);
    };
    CandlestickView2.prototype._updateDrawMode = function(seriesModel) {
      var isLargeDraw = seriesModel.pipelineContext.large;
      if (this._isLargeDraw == null || isLargeDraw !== this._isLargeDraw) {
        this._isLargeDraw = isLargeDraw;
        this._clear();
      }
    };
    CandlestickView2.prototype._renderNormal = function(seriesModel) {
      var data = seriesModel.getData();
      var oldData = this._data;
      var group = this.group;
      var isSimpleBox = data.getLayout("isSimpleBox");
      var needsClip = seriesModel.get("clip", true);
      var coord = seriesModel.coordinateSystem;
      var clipArea = coord.getArea && coord.getArea();
      if (!this._data) {
        group.removeAll();
      }
      data.diff(oldData).add(function(newIdx) {
        if (data.hasValue(newIdx)) {
          var itemLayout = data.getItemLayout(newIdx);
          if (needsClip && isNormalBoxClipped(clipArea, itemLayout)) {
            return;
          }
          var el = createNormalBox2(itemLayout, newIdx, true);
          initProps(el, {
            shape: {
              points: itemLayout.ends
            }
          }, seriesModel, newIdx);
          setBoxCommon(el, data, newIdx, isSimpleBox);
          group.add(el);
          data.setItemGraphicEl(newIdx, el);
        }
      }).update(function(newIdx, oldIdx) {
        var el = oldData.getItemGraphicEl(oldIdx);
        if (!data.hasValue(newIdx)) {
          group.remove(el);
          return;
        }
        var itemLayout = data.getItemLayout(newIdx);
        if (needsClip && isNormalBoxClipped(clipArea, itemLayout)) {
          group.remove(el);
          return;
        }
        if (!el) {
          el = createNormalBox2(itemLayout, newIdx);
        } else {
          updateProps(el, {
            shape: {
              points: itemLayout.ends
            }
          }, seriesModel, newIdx);
          saveOldStyle(el);
        }
        setBoxCommon(el, data, newIdx, isSimpleBox);
        group.add(el);
        data.setItemGraphicEl(newIdx, el);
      }).remove(function(oldIdx) {
        var el = oldData.getItemGraphicEl(oldIdx);
        el && group.remove(el);
      }).execute();
      this._data = data;
    };
    CandlestickView2.prototype._renderLarge = function(seriesModel) {
      this._clear();
      createLarge2(seriesModel, this.group);
      var clipPath = seriesModel.get("clip", true) ? createClipPath(seriesModel.coordinateSystem, false, seriesModel) : null;
      if (clipPath) {
        this.group.setClipPath(clipPath);
      } else {
        this.group.removeClipPath();
      }
    };
    CandlestickView2.prototype._incrementalRenderNormal = function(params, seriesModel) {
      var data = seriesModel.getData();
      var isSimpleBox = data.getLayout("isSimpleBox");
      var dataIndex;
      while ((dataIndex = params.next()) != null) {
        var itemLayout = data.getItemLayout(dataIndex);
        var el = createNormalBox2(itemLayout, dataIndex);
        setBoxCommon(el, data, dataIndex, isSimpleBox);
        el.incremental = true;
        this.group.add(el);
        this._progressiveEls.push(el);
      }
    };
    CandlestickView2.prototype._incrementalRenderLarge = function(params, seriesModel) {
      createLarge2(seriesModel, this.group, this._progressiveEls, true);
    };
    CandlestickView2.prototype.remove = function(ecModel) {
      this._clear();
    };
    CandlestickView2.prototype._clear = function() {
      this.group.removeAll();
      this._data = null;
    };
    CandlestickView2.type = "candlestick";
    return CandlestickView2;
  }(Chart_default)
);
var NormalBoxPathShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function NormalBoxPathShape2() {
    }
    return NormalBoxPathShape2;
  }()
);
var NormalBoxPath = (
  /** @class */
  function(_super) {
    __extends(NormalBoxPath2, _super);
    function NormalBoxPath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "normalCandlestickBox";
      return _this;
    }
    NormalBoxPath2.prototype.getDefaultShape = function() {
      return new NormalBoxPathShape();
    };
    NormalBoxPath2.prototype.buildPath = function(ctx, shape) {
      var ends = shape.points;
      if (this.__simpleBox) {
        ctx.moveTo(ends[4][0], ends[4][1]);
        ctx.lineTo(ends[6][0], ends[6][1]);
      } else {
        ctx.moveTo(ends[0][0], ends[0][1]);
        ctx.lineTo(ends[1][0], ends[1][1]);
        ctx.lineTo(ends[2][0], ends[2][1]);
        ctx.lineTo(ends[3][0], ends[3][1]);
        ctx.closePath();
        ctx.moveTo(ends[4][0], ends[4][1]);
        ctx.lineTo(ends[5][0], ends[5][1]);
        ctx.moveTo(ends[6][0], ends[6][1]);
        ctx.lineTo(ends[7][0], ends[7][1]);
      }
    };
    return NormalBoxPath2;
  }(Path_default)
);
function createNormalBox2(itemLayout, dataIndex, isInit) {
  var ends = itemLayout.ends;
  return new NormalBoxPath({
    shape: {
      points: isInit ? transInit2(ends, itemLayout) : ends
    },
    z2: 100
  });
}
function isNormalBoxClipped(clipArea, itemLayout) {
  var clipped = true;
  for (var i = 0; i < itemLayout.ends.length; i++) {
    if (clipArea.contain(itemLayout.ends[i][0], itemLayout.ends[i][1])) {
      clipped = false;
      break;
    }
  }
  return clipped;
}
function setBoxCommon(el, data, dataIndex, isSimpleBox) {
  var itemModel = data.getItemModel(dataIndex);
  el.useStyle(data.getItemVisual(dataIndex, "style"));
  el.style.strokeNoScale = true;
  el.__simpleBox = isSimpleBox;
  setStatesStylesFromModel(el, itemModel);
  var sign = data.getItemLayout(dataIndex).sign;
  each(el.states, function(state, stateName) {
    var stateModel = itemModel.getModel(stateName);
    var color = getColor(sign, stateModel);
    var borderColor = getBorderColor(sign, stateModel) || color;
    var stateStyle = state.style || (state.style = {});
    color && (stateStyle.fill = color);
    borderColor && (stateStyle.stroke = borderColor);
  });
  var emphasisModel = itemModel.getModel("emphasis");
  toggleHoverEmphasis(el, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
}
function transInit2(points, itemLayout) {
  return map(points, function(point) {
    point = point.slice();
    point[1] = itemLayout.initBaseline;
    return point;
  });
}
var LargeBoxPathShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function LargeBoxPathShape2() {
    }
    return LargeBoxPathShape2;
  }()
);
var LargeBoxPath = (
  /** @class */
  function(_super) {
    __extends(LargeBoxPath2, _super);
    function LargeBoxPath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "largeCandlestickBox";
      return _this;
    }
    LargeBoxPath2.prototype.getDefaultShape = function() {
      return new LargeBoxPathShape();
    };
    LargeBoxPath2.prototype.buildPath = function(ctx, shape) {
      var points = shape.points;
      for (var i = 0; i < points.length; ) {
        if (this.__sign === points[i++]) {
          var x = points[i++];
          ctx.moveTo(x, points[i++]);
          ctx.lineTo(x, points[i++]);
        } else {
          i += 3;
        }
      }
    };
    return LargeBoxPath2;
  }(Path_default)
);
function createLarge2(seriesModel, group, progressiveEls, incremental) {
  var data = seriesModel.getData();
  var largePoints = data.getLayout("largePoints");
  var elP = new LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: 1,
    ignoreCoarsePointer: true
  });
  group.add(elP);
  var elN = new LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: -1,
    ignoreCoarsePointer: true
  });
  group.add(elN);
  var elDoji = new LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: 0,
    ignoreCoarsePointer: true
  });
  group.add(elDoji);
  setLargeStyle(1, elP, seriesModel, data);
  setLargeStyle(-1, elN, seriesModel, data);
  setLargeStyle(0, elDoji, seriesModel, data);
  if (incremental) {
    elP.incremental = true;
    elN.incremental = true;
  }
  if (progressiveEls) {
    progressiveEls.push(elP, elN);
  }
}
function setLargeStyle(sign, el, seriesModel, data) {
  var borderColor = getBorderColor(sign, seriesModel) || getColor(sign, seriesModel);
  var itemStyle = seriesModel.getModel("itemStyle").getItemStyle(SKIP_PROPS);
  el.useStyle(itemStyle);
  el.style.fill = null;
  el.style.stroke = borderColor;
}
var CandlestickView_default = CandlestickView;

// node_modules/echarts/lib/chart/candlestick/CandlestickSeries.js
var CandlestickSeriesModel = (
  /** @class */
  function(_super) {
    __extends(CandlestickSeriesModel2, _super);
    function CandlestickSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = CandlestickSeriesModel2.type;
      _this.defaultValueDimensions = [{
        name: "open",
        defaultTooltip: true
      }, {
        name: "close",
        defaultTooltip: true
      }, {
        name: "lowest",
        defaultTooltip: true
      }, {
        name: "highest",
        defaultTooltip: true
      }];
      return _this;
    }
    CandlestickSeriesModel2.prototype.getShadowDim = function() {
      return "open";
    };
    CandlestickSeriesModel2.prototype.brushSelector = function(dataIndex, data, selectors) {
      var itemLayout = data.getItemLayout(dataIndex);
      return itemLayout && selectors.rect(itemLayout.brushRect);
    };
    CandlestickSeriesModel2.type = "series.candlestick";
    CandlestickSeriesModel2.dependencies = ["xAxis", "yAxis", "grid"];
    CandlestickSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: true,
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      layout: null,
      clip: true,
      itemStyle: {
        color: "#eb5454",
        color0: "#47b262",
        borderColor: "#eb5454",
        borderColor0: "#47b262",
        borderColorDoji: null,
        // borderColor: '#d24040',
        // borderColor0: '#398f4f',
        borderWidth: 1
      },
      emphasis: {
        itemStyle: {
          borderWidth: 2
        }
      },
      barMaxWidth: null,
      barMinWidth: null,
      barWidth: null,
      large: true,
      largeThreshold: 600,
      progressive: 3e3,
      progressiveThreshold: 1e4,
      progressiveChunkMode: "mod",
      animationEasing: "linear",
      animationDuration: 300
    };
    return CandlestickSeriesModel2;
  }(Series_default)
);
mixin(CandlestickSeriesModel, WhiskerBoxCommonMixin, true);
var CandlestickSeries_default = CandlestickSeriesModel;

// node_modules/echarts/lib/chart/candlestick/preprocessor.js
function candlestickPreprocessor(option) {
  if (!option || !isArray(option.series)) {
    return;
  }
  each(option.series, function(seriesItem) {
    if (isObject(seriesItem) && seriesItem.type === "k") {
      seriesItem.type = "candlestick";
    }
  });
}

// node_modules/echarts/lib/chart/candlestick/candlestickLayout.js
var candlestickLayout = {
  seriesType: "candlestick",
  plan: createRenderPlanner(),
  reset: function(seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var data = seriesModel.getData();
    var candleWidth = calculateCandleWidth(seriesModel, data);
    var cDimIdx = 0;
    var vDimIdx = 1;
    var coordDims = ["x", "y"];
    var cDimI = data.getDimensionIndex(data.mapDimension(coordDims[cDimIdx]));
    var vDimsI = map(data.mapDimensionsAll(coordDims[vDimIdx]), data.getDimensionIndex, data);
    var openDimI = vDimsI[0];
    var closeDimI = vDimsI[1];
    var lowestDimI = vDimsI[2];
    var highestDimI = vDimsI[3];
    data.setLayout({
      candleWidth,
      // The value is experimented visually.
      isSimpleBox: candleWidth <= 1.3
    });
    if (cDimI < 0 || vDimsI.length < 4) {
      return;
    }
    return {
      progress: seriesModel.pipelineContext.large ? largeProgress : normalProgress
    };
    function normalProgress(params, data2) {
      var dataIndex;
      var store = data2.getStore();
      while ((dataIndex = params.next()) != null) {
        var axisDimVal = store.get(cDimI, dataIndex);
        var openVal = store.get(openDimI, dataIndex);
        var closeVal = store.get(closeDimI, dataIndex);
        var lowestVal = store.get(lowestDimI, dataIndex);
        var highestVal = store.get(highestDimI, dataIndex);
        var ocLow = Math.min(openVal, closeVal);
        var ocHigh = Math.max(openVal, closeVal);
        var ocLowPoint = getPoint(ocLow, axisDimVal);
        var ocHighPoint = getPoint(ocHigh, axisDimVal);
        var lowestPoint = getPoint(lowestVal, axisDimVal);
        var highestPoint = getPoint(highestVal, axisDimVal);
        var ends = [];
        addBodyEnd(ends, ocHighPoint, 0);
        addBodyEnd(ends, ocLowPoint, 1);
        ends.push(subPixelOptimizePoint(highestPoint), subPixelOptimizePoint(ocHighPoint), subPixelOptimizePoint(lowestPoint), subPixelOptimizePoint(ocLowPoint));
        var itemModel = data2.getItemModel(dataIndex);
        var hasDojiColor = !!itemModel.get(["itemStyle", "borderColorDoji"]);
        data2.setItemLayout(dataIndex, {
          sign: getSign(store, dataIndex, openVal, closeVal, closeDimI, hasDojiColor),
          initBaseline: openVal > closeVal ? ocHighPoint[vDimIdx] : ocLowPoint[vDimIdx],
          ends,
          brushRect: makeBrushRect(lowestVal, highestVal, axisDimVal)
        });
      }
      function getPoint(val, axisDimVal2) {
        var p = [];
        p[cDimIdx] = axisDimVal2;
        p[vDimIdx] = val;
        return isNaN(axisDimVal2) || isNaN(val) ? [NaN, NaN] : coordSys.dataToPoint(p);
      }
      function addBodyEnd(ends2, point, start) {
        var point1 = point.slice();
        var point2 = point.slice();
        point1[cDimIdx] = subPixelOptimize(point1[cDimIdx] + candleWidth / 2, 1, false);
        point2[cDimIdx] = subPixelOptimize(point2[cDimIdx] - candleWidth / 2, 1, true);
        start ? ends2.push(point1, point2) : ends2.push(point2, point1);
      }
      function makeBrushRect(lowestVal2, highestVal2, axisDimVal2) {
        var pmin = getPoint(lowestVal2, axisDimVal2);
        var pmax = getPoint(highestVal2, axisDimVal2);
        pmin[cDimIdx] -= candleWidth / 2;
        pmax[cDimIdx] -= candleWidth / 2;
        return {
          x: pmin[0],
          y: pmin[1],
          width: vDimIdx ? candleWidth : pmax[0] - pmin[0],
          height: vDimIdx ? pmax[1] - pmin[1] : candleWidth
        };
      }
      function subPixelOptimizePoint(point) {
        point[cDimIdx] = subPixelOptimize(point[cDimIdx], 1);
        return point;
      }
    }
    function largeProgress(params, data2) {
      var points = createFloat32Array(params.count * 4);
      var offset = 0;
      var point;
      var tmpIn = [];
      var tmpOut = [];
      var dataIndex;
      var store = data2.getStore();
      var hasDojiColor = !!seriesModel.get(["itemStyle", "borderColorDoji"]);
      while ((dataIndex = params.next()) != null) {
        var axisDimVal = store.get(cDimI, dataIndex);
        var openVal = store.get(openDimI, dataIndex);
        var closeVal = store.get(closeDimI, dataIndex);
        var lowestVal = store.get(lowestDimI, dataIndex);
        var highestVal = store.get(highestDimI, dataIndex);
        if (isNaN(axisDimVal) || isNaN(lowestVal) || isNaN(highestVal)) {
          points[offset++] = NaN;
          offset += 3;
          continue;
        }
        points[offset++] = getSign(store, dataIndex, openVal, closeVal, closeDimI, hasDojiColor);
        tmpIn[cDimIdx] = axisDimVal;
        tmpIn[vDimIdx] = lowestVal;
        point = coordSys.dataToPoint(tmpIn, null, tmpOut);
        points[offset++] = point ? point[0] : NaN;
        points[offset++] = point ? point[1] : NaN;
        tmpIn[vDimIdx] = highestVal;
        point = coordSys.dataToPoint(tmpIn, null, tmpOut);
        points[offset++] = point ? point[1] : NaN;
      }
      data2.setLayout("largePoints", points);
    }
  }
};
function getSign(store, dataIndex, openVal, closeVal, closeDimI, hasDojiColor) {
  var sign;
  if (openVal > closeVal) {
    sign = -1;
  } else if (openVal < closeVal) {
    sign = 1;
  } else {
    sign = hasDojiColor ? 0 : dataIndex > 0 ? store.get(closeDimI, dataIndex - 1) <= closeVal ? 1 : -1 : 1;
  }
  return sign;
}
function calculateCandleWidth(seriesModel, data) {
  var baseAxis = seriesModel.getBaseAxis();
  var extent;
  var bandWidth = baseAxis.type === "category" ? baseAxis.getBandWidth() : (extent = baseAxis.getExtent(), Math.abs(extent[1] - extent[0]) / data.count());
  var barMaxWidth = parsePercent2(retrieve2(seriesModel.get("barMaxWidth"), bandWidth), bandWidth);
  var barMinWidth = parsePercent2(retrieve2(seriesModel.get("barMinWidth"), 1), bandWidth);
  var barWidth = seriesModel.get("barWidth");
  return barWidth != null ? parsePercent2(barWidth, bandWidth) : Math.max(Math.min(bandWidth / 2, barMaxWidth), barMinWidth);
}
var candlestickLayout_default = candlestickLayout;

// node_modules/echarts/lib/chart/candlestick/install.js
function install19(registers) {
  registers.registerChartView(CandlestickView_default);
  registers.registerSeriesModel(CandlestickSeries_default);
  registers.registerPreprocessor(candlestickPreprocessor);
  registers.registerVisual(candlestickVisual_default);
  registers.registerLayout(candlestickLayout_default);
}

// node_modules/echarts/lib/chart/helper/EffectSymbol.js
function updateRipplePath(rippleGroup, effectCfg) {
  var color = effectCfg.rippleEffectColor || effectCfg.color;
  rippleGroup.eachChild(function(ripplePath) {
    ripplePath.attr({
      z: effectCfg.z,
      zlevel: effectCfg.zlevel,
      style: {
        stroke: effectCfg.brushType === "stroke" ? color : null,
        fill: effectCfg.brushType === "fill" ? color : null
      }
    });
  });
}
var EffectSymbol = (
  /** @class */
  function(_super) {
    __extends(EffectSymbol2, _super);
    function EffectSymbol2(data, idx) {
      var _this = _super.call(this) || this;
      var symbol = new Symbol_default(data, idx);
      var rippleGroup = new Group_default();
      _this.add(symbol);
      _this.add(rippleGroup);
      _this.updateData(data, idx);
      return _this;
    }
    EffectSymbol2.prototype.stopEffectAnimation = function() {
      this.childAt(1).removeAll();
    };
    EffectSymbol2.prototype.startEffectAnimation = function(effectCfg) {
      var symbolType = effectCfg.symbolType;
      var color = effectCfg.color;
      var rippleNumber = effectCfg.rippleNumber;
      var rippleGroup = this.childAt(1);
      for (var i = 0; i < rippleNumber; i++) {
        var ripplePath = createSymbol(symbolType, -1, -1, 2, 2, color);
        ripplePath.attr({
          style: {
            strokeNoScale: true
          },
          z2: 99,
          silent: true,
          scaleX: 0.5,
          scaleY: 0.5
        });
        var delay = -i / rippleNumber * effectCfg.period + effectCfg.effectOffset;
        ripplePath.animate("", true).when(effectCfg.period, {
          scaleX: effectCfg.rippleScale / 2,
          scaleY: effectCfg.rippleScale / 2
        }).delay(delay).start();
        ripplePath.animateStyle(true).when(effectCfg.period, {
          opacity: 0
        }).delay(delay).start();
        rippleGroup.add(ripplePath);
      }
      updateRipplePath(rippleGroup, effectCfg);
    };
    EffectSymbol2.prototype.updateEffectAnimation = function(effectCfg) {
      var oldEffectCfg = this._effectCfg;
      var rippleGroup = this.childAt(1);
      var DIFFICULT_PROPS = ["symbolType", "period", "rippleScale", "rippleNumber"];
      for (var i = 0; i < DIFFICULT_PROPS.length; i++) {
        var propName = DIFFICULT_PROPS[i];
        if (oldEffectCfg[propName] !== effectCfg[propName]) {
          this.stopEffectAnimation();
          this.startEffectAnimation(effectCfg);
          return;
        }
      }
      updateRipplePath(rippleGroup, effectCfg);
    };
    EffectSymbol2.prototype.highlight = function() {
      enterEmphasis(this);
    };
    EffectSymbol2.prototype.downplay = function() {
      leaveEmphasis(this);
    };
    EffectSymbol2.prototype.getSymbolType = function() {
      var symbol = this.childAt(0);
      return symbol && symbol.getSymbolType();
    };
    EffectSymbol2.prototype.updateData = function(data, idx) {
      var _this = this;
      var seriesModel = data.hostModel;
      this.childAt(0).updateData(data, idx);
      var rippleGroup = this.childAt(1);
      var itemModel = data.getItemModel(idx);
      var symbolType = data.getItemVisual(idx, "symbol");
      var symbolSize = normalizeSymbolSize(data.getItemVisual(idx, "symbolSize"));
      var symbolStyle = data.getItemVisual(idx, "style");
      var color = symbolStyle && symbolStyle.fill;
      var emphasisModel = itemModel.getModel("emphasis");
      rippleGroup.setScale(symbolSize);
      rippleGroup.traverse(function(ripplePath) {
        ripplePath.setStyle("fill", color);
      });
      var symbolOffset = normalizeSymbolOffset(data.getItemVisual(idx, "symbolOffset"), symbolSize);
      if (symbolOffset) {
        rippleGroup.x = symbolOffset[0];
        rippleGroup.y = symbolOffset[1];
      }
      var symbolRotate = data.getItemVisual(idx, "symbolRotate");
      rippleGroup.rotation = (symbolRotate || 0) * Math.PI / 180 || 0;
      var effectCfg = {};
      effectCfg.showEffectOn = seriesModel.get("showEffectOn");
      effectCfg.rippleScale = itemModel.get(["rippleEffect", "scale"]);
      effectCfg.brushType = itemModel.get(["rippleEffect", "brushType"]);
      effectCfg.period = itemModel.get(["rippleEffect", "period"]) * 1e3;
      effectCfg.effectOffset = idx / data.count();
      effectCfg.z = seriesModel.getShallow("z") || 0;
      effectCfg.zlevel = seriesModel.getShallow("zlevel") || 0;
      effectCfg.symbolType = symbolType;
      effectCfg.color = color;
      effectCfg.rippleEffectColor = itemModel.get(["rippleEffect", "color"]);
      effectCfg.rippleNumber = itemModel.get(["rippleEffect", "number"]);
      if (effectCfg.showEffectOn === "render") {
        this._effectCfg ? this.updateEffectAnimation(effectCfg) : this.startEffectAnimation(effectCfg);
        this._effectCfg = effectCfg;
      } else {
        this._effectCfg = null;
        this.stopEffectAnimation();
        this.onHoverStateChange = function(toState) {
          if (toState === "emphasis") {
            if (effectCfg.showEffectOn !== "render") {
              _this.startEffectAnimation(effectCfg);
            }
          } else if (toState === "normal") {
            if (effectCfg.showEffectOn !== "render") {
              _this.stopEffectAnimation();
            }
          }
        };
      }
      this._effectCfg = effectCfg;
      toggleHoverEmphasis(this, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
    };
    ;
    EffectSymbol2.prototype.fadeOut = function(cb) {
      cb && cb();
    };
    ;
    return EffectSymbol2;
  }(Group_default)
);
var EffectSymbol_default = EffectSymbol;

// node_modules/echarts/lib/chart/effectScatter/EffectScatterView.js
var EffectScatterView = (
  /** @class */
  function(_super) {
    __extends(EffectScatterView2, _super);
    function EffectScatterView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = EffectScatterView2.type;
      return _this;
    }
    EffectScatterView2.prototype.init = function() {
      this._symbolDraw = new SymbolDraw_default(EffectSymbol_default);
    };
    EffectScatterView2.prototype.render = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var effectSymbolDraw = this._symbolDraw;
      effectSymbolDraw.updateData(data, {
        clipShape: this._getClipShape(seriesModel)
      });
      this.group.add(effectSymbolDraw.group);
    };
    EffectScatterView2.prototype._getClipShape = function(seriesModel) {
      var coordSys = seriesModel.coordinateSystem;
      var clipArea = coordSys && coordSys.getArea && coordSys.getArea();
      return seriesModel.get("clip", true) ? clipArea : null;
    };
    EffectScatterView2.prototype.updateTransform = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      this.group.dirty();
      var res = pointsLayout("").reset(seriesModel, ecModel, api);
      if (res.progress) {
        res.progress({
          start: 0,
          end: data.count(),
          count: data.count()
        }, data);
      }
      this._symbolDraw.updateLayout();
    };
    EffectScatterView2.prototype._updateGroupTransform = function(seriesModel) {
      var coordSys = seriesModel.coordinateSystem;
      if (coordSys && coordSys.getRoamTransform) {
        this.group.transform = clone3(coordSys.getRoamTransform());
        this.group.decomposeTransform();
      }
    };
    EffectScatterView2.prototype.remove = function(ecModel, api) {
      this._symbolDraw && this._symbolDraw.remove(true);
    };
    EffectScatterView2.type = "effectScatter";
    return EffectScatterView2;
  }(Chart_default)
);
var EffectScatterView_default = EffectScatterView;

// node_modules/echarts/lib/chart/effectScatter/EffectScatterSeries.js
var EffectScatterSeriesModel = (
  /** @class */
  function(_super) {
    __extends(EffectScatterSeriesModel2, _super);
    function EffectScatterSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = EffectScatterSeriesModel2.type;
      _this.hasSymbolVisual = true;
      return _this;
    }
    EffectScatterSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesData_default(null, this, {
        useEncodeDefaulter: true
      });
    };
    EffectScatterSeriesModel2.prototype.brushSelector = function(dataIndex, data, selectors) {
      return selectors.point(data.getItemLayout(dataIndex));
    };
    EffectScatterSeriesModel2.type = "series.effectScatter";
    EffectScatterSeriesModel2.dependencies = ["grid", "polar"];
    EffectScatterSeriesModel2.defaultOption = {
      coordinateSystem: "cartesian2d",
      // zlevel: 0,
      z: 2,
      legendHoverLink: true,
      effectType: "ripple",
      progressive: 0,
      // When to show the effect, option: 'render'|'emphasis'
      showEffectOn: "render",
      clip: true,
      // Ripple effect config
      rippleEffect: {
        period: 4,
        // Scale of ripple
        scale: 2.5,
        // Brush type can be fill or stroke
        brushType: "fill",
        // Ripple number
        number: 3
      },
      universalTransition: {
        divideShape: "clone"
      },
      // Cartesian coordinate system
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      // Polar coordinate system
      // polarIndex: 0,
      // Geo coordinate system
      // geoIndex: 0,
      // symbol: null,        // 图形类型
      symbolSize: 10
      // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
      // symbolRotate: null,  // 图形旋转控制
      // itemStyle: {
      //     opacity: 1
      // }
    };
    return EffectScatterSeriesModel2;
  }(Series_default)
);
var EffectScatterSeries_default = EffectScatterSeriesModel;

// node_modules/echarts/lib/chart/effectScatter/install.js
function install20(registers) {
  registers.registerChartView(EffectScatterView_default);
  registers.registerSeriesModel(EffectScatterSeries_default);
  registers.registerLayout(pointsLayout("effectScatter"));
}

// node_modules/echarts/lib/chart/helper/EffectLine.js
var EffectLine = (
  /** @class */
  function(_super) {
    __extends(EffectLine2, _super);
    function EffectLine2(lineData, idx, seriesScope) {
      var _this = _super.call(this) || this;
      _this.add(_this.createLine(lineData, idx, seriesScope));
      _this._updateEffectSymbol(lineData, idx);
      return _this;
    }
    EffectLine2.prototype.createLine = function(lineData, idx, seriesScope) {
      return new Line_default2(lineData, idx, seriesScope);
    };
    EffectLine2.prototype._updateEffectSymbol = function(lineData, idx) {
      var itemModel = lineData.getItemModel(idx);
      var effectModel = itemModel.getModel("effect");
      var size = effectModel.get("symbolSize");
      var symbolType = effectModel.get("symbol");
      if (!isArray(size)) {
        size = [size, size];
      }
      var lineStyle = lineData.getItemVisual(idx, "style");
      var color = effectModel.get("color") || lineStyle && lineStyle.stroke;
      var symbol = this.childAt(1);
      if (this._symbolType !== symbolType) {
        this.remove(symbol);
        symbol = createSymbol(symbolType, -0.5, -0.5, 1, 1, color);
        symbol.z2 = 100;
        symbol.culling = true;
        this.add(symbol);
      }
      if (!symbol) {
        return;
      }
      symbol.setStyle("shadowColor", color);
      symbol.setStyle(effectModel.getItemStyle(["color"]));
      symbol.scaleX = size[0];
      symbol.scaleY = size[1];
      symbol.setColor(color);
      this._symbolType = symbolType;
      this._symbolScale = size;
      this._updateEffectAnimation(lineData, effectModel, idx);
    };
    EffectLine2.prototype._updateEffectAnimation = function(lineData, effectModel, idx) {
      var symbol = this.childAt(1);
      if (!symbol) {
        return;
      }
      var points = lineData.getItemLayout(idx);
      var period = effectModel.get("period") * 1e3;
      var loop = effectModel.get("loop");
      var roundTrip = effectModel.get("roundTrip");
      var constantSpeed = effectModel.get("constantSpeed");
      var delayExpr = retrieve(effectModel.get("delay"), function(idx2) {
        return idx2 / lineData.count() * period / 3;
      });
      symbol.ignore = true;
      this._updateAnimationPoints(symbol, points);
      if (constantSpeed > 0) {
        period = this._getLineLength(symbol) / constantSpeed * 1e3;
      }
      if (period !== this._period || loop !== this._loop || roundTrip !== this._roundTrip) {
        symbol.stopAnimation();
        var delayNum = void 0;
        if (isFunction(delayExpr)) {
          delayNum = delayExpr(idx);
        } else {
          delayNum = delayExpr;
        }
        if (symbol.__t > 0) {
          delayNum = -period * symbol.__t;
        }
        this._animateSymbol(symbol, period, delayNum, loop, roundTrip);
      }
      this._period = period;
      this._loop = loop;
      this._roundTrip = roundTrip;
    };
    EffectLine2.prototype._animateSymbol = function(symbol, period, delayNum, loop, roundTrip) {
      if (period > 0) {
        symbol.__t = 0;
        var self_1 = this;
        var animator = symbol.animate("", loop).when(roundTrip ? period * 2 : period, {
          __t: roundTrip ? 2 : 1
        }).delay(delayNum).during(function() {
          self_1._updateSymbolPosition(symbol);
        });
        if (!loop) {
          animator.done(function() {
            self_1.remove(symbol);
          });
        }
        animator.start();
      }
    };
    EffectLine2.prototype._getLineLength = function(symbol) {
      return dist(symbol.__p1, symbol.__cp1) + dist(symbol.__cp1, symbol.__p2);
    };
    EffectLine2.prototype._updateAnimationPoints = function(symbol, points) {
      symbol.__p1 = points[0];
      symbol.__p2 = points[1];
      symbol.__cp1 = points[2] || [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2];
    };
    EffectLine2.prototype.updateData = function(lineData, idx, seriesScope) {
      this.childAt(0).updateData(lineData, idx, seriesScope);
      this._updateEffectSymbol(lineData, idx);
    };
    EffectLine2.prototype._updateSymbolPosition = function(symbol) {
      var p1 = symbol.__p1;
      var p2 = symbol.__p2;
      var cp1 = symbol.__cp1;
      var t = symbol.__t < 1 ? symbol.__t : 2 - symbol.__t;
      var pos = [symbol.x, symbol.y];
      var lastPos = pos.slice();
      var quadraticAt3 = quadraticAt;
      var quadraticDerivativeAt2 = quadraticDerivativeAt;
      pos[0] = quadraticAt3(p1[0], cp1[0], p2[0], t);
      pos[1] = quadraticAt3(p1[1], cp1[1], p2[1], t);
      var tx = symbol.__t < 1 ? quadraticDerivativeAt2(p1[0], cp1[0], p2[0], t) : quadraticDerivativeAt2(p2[0], cp1[0], p1[0], 1 - t);
      var ty = symbol.__t < 1 ? quadraticDerivativeAt2(p1[1], cp1[1], p2[1], t) : quadraticDerivativeAt2(p2[1], cp1[1], p1[1], 1 - t);
      symbol.rotation = -Math.atan2(ty, tx) - Math.PI / 2;
      if (this._symbolType === "line" || this._symbolType === "rect" || this._symbolType === "roundRect") {
        if (symbol.__lastT !== void 0 && symbol.__lastT < symbol.__t) {
          symbol.scaleY = dist(lastPos, pos) * 1.05;
          if (t === 1) {
            pos[0] = lastPos[0] + (pos[0] - lastPos[0]) / 2;
            pos[1] = lastPos[1] + (pos[1] - lastPos[1]) / 2;
          }
        } else if (symbol.__lastT === 1) {
          symbol.scaleY = 2 * dist(p1, pos);
        } else {
          symbol.scaleY = this._symbolScale[1];
        }
      }
      symbol.__lastT = symbol.__t;
      symbol.ignore = false;
      symbol.x = pos[0];
      symbol.y = pos[1];
    };
    EffectLine2.prototype.updateLayout = function(lineData, idx) {
      this.childAt(0).updateLayout(lineData, idx);
      var effectModel = lineData.getItemModel(idx).getModel("effect");
      this._updateEffectAnimation(lineData, effectModel, idx);
    };
    return EffectLine2;
  }(Group_default)
);
var EffectLine_default = EffectLine;

// node_modules/echarts/lib/chart/helper/Polyline.js
var Polyline = (
  /** @class */
  function(_super) {
    __extends(Polyline2, _super);
    function Polyline2(lineData, idx, seriesScope) {
      var _this = _super.call(this) || this;
      _this._createPolyline(lineData, idx, seriesScope);
      return _this;
    }
    Polyline2.prototype._createPolyline = function(lineData, idx, seriesScope) {
      var points = lineData.getItemLayout(idx);
      var line = new Polyline_default({
        shape: {
          points
        }
      });
      this.add(line);
      this._updateCommonStl(lineData, idx, seriesScope);
    };
    ;
    Polyline2.prototype.updateData = function(lineData, idx, seriesScope) {
      var seriesModel = lineData.hostModel;
      var line = this.childAt(0);
      var target = {
        shape: {
          points: lineData.getItemLayout(idx)
        }
      };
      updateProps(line, target, seriesModel, idx);
      this._updateCommonStl(lineData, idx, seriesScope);
    };
    ;
    Polyline2.prototype._updateCommonStl = function(lineData, idx, seriesScope) {
      var line = this.childAt(0);
      var itemModel = lineData.getItemModel(idx);
      var emphasisLineStyle = seriesScope && seriesScope.emphasisLineStyle;
      var focus = seriesScope && seriesScope.focus;
      var blurScope = seriesScope && seriesScope.blurScope;
      var emphasisDisabled = seriesScope && seriesScope.emphasisDisabled;
      if (!seriesScope || lineData.hasItemOption) {
        var emphasisModel = itemModel.getModel("emphasis");
        emphasisLineStyle = emphasisModel.getModel("lineStyle").getLineStyle();
        emphasisDisabled = emphasisModel.get("disabled");
        focus = emphasisModel.get("focus");
        blurScope = emphasisModel.get("blurScope");
      }
      line.useStyle(lineData.getItemVisual(idx, "style"));
      line.style.fill = null;
      line.style.strokeNoScale = true;
      var lineEmphasisState = line.ensureState("emphasis");
      lineEmphasisState.style = emphasisLineStyle;
      toggleHoverEmphasis(this, focus, blurScope, emphasisDisabled);
    };
    ;
    Polyline2.prototype.updateLayout = function(lineData, idx) {
      var polyline = this.childAt(0);
      polyline.setShape("points", lineData.getItemLayout(idx));
    };
    ;
    return Polyline2;
  }(Group_default)
);
var Polyline_default2 = Polyline;

// node_modules/echarts/lib/chart/helper/EffectPolyline.js
var EffectPolyline = (
  /** @class */
  function(_super) {
    __extends(EffectPolyline2, _super);
    function EffectPolyline2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._lastFrame = 0;
      _this._lastFramePercent = 0;
      return _this;
    }
    EffectPolyline2.prototype.createLine = function(lineData, idx, seriesScope) {
      return new Polyline_default2(lineData, idx, seriesScope);
    };
    ;
    EffectPolyline2.prototype._updateAnimationPoints = function(symbol, points) {
      this._points = points;
      var accLenArr = [0];
      var len2 = 0;
      for (var i = 1; i < points.length; i++) {
        var p1 = points[i - 1];
        var p2 = points[i];
        len2 += dist(p1, p2);
        accLenArr.push(len2);
      }
      if (len2 === 0) {
        this._length = 0;
        return;
      }
      for (var i = 0; i < accLenArr.length; i++) {
        accLenArr[i] /= len2;
      }
      this._offsets = accLenArr;
      this._length = len2;
    };
    ;
    EffectPolyline2.prototype._getLineLength = function() {
      return this._length;
    };
    ;
    EffectPolyline2.prototype._updateSymbolPosition = function(symbol) {
      var t = symbol.__t < 1 ? symbol.__t : 2 - symbol.__t;
      var points = this._points;
      var offsets = this._offsets;
      var len2 = points.length;
      if (!offsets) {
        return;
      }
      var lastFrame = this._lastFrame;
      var frame;
      if (t < this._lastFramePercent) {
        var start = Math.min(lastFrame + 1, len2 - 1);
        for (frame = start; frame >= 0; frame--) {
          if (offsets[frame] <= t) {
            break;
          }
        }
        frame = Math.min(frame, len2 - 2);
      } else {
        for (frame = lastFrame; frame < len2; frame++) {
          if (offsets[frame] > t) {
            break;
          }
        }
        frame = Math.min(frame - 1, len2 - 2);
      }
      var p = (t - offsets[frame]) / (offsets[frame + 1] - offsets[frame]);
      var p0 = points[frame];
      var p1 = points[frame + 1];
      symbol.x = p0[0] * (1 - p) + p * p1[0];
      symbol.y = p0[1] * (1 - p) + p * p1[1];
      var tx = symbol.__t < 1 ? p1[0] - p0[0] : p0[0] - p1[0];
      var ty = symbol.__t < 1 ? p1[1] - p0[1] : p0[1] - p1[1];
      symbol.rotation = -Math.atan2(ty, tx) - Math.PI / 2;
      this._lastFrame = frame;
      this._lastFramePercent = t;
      symbol.ignore = false;
    };
    ;
    return EffectPolyline2;
  }(EffectLine_default)
);
var EffectPolyline_default = EffectPolyline;

// node_modules/echarts/lib/chart/helper/LargeLineDraw.js
var LargeLinesPathShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function LargeLinesPathShape2() {
      this.polyline = false;
      this.curveness = 0;
      this.segs = [];
    }
    return LargeLinesPathShape2;
  }()
);
var LargeLinesPath = (
  /** @class */
  function(_super) {
    __extends(LargeLinesPath2, _super);
    function LargeLinesPath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this._off = 0;
      _this.hoverDataIdx = -1;
      return _this;
    }
    LargeLinesPath2.prototype.reset = function() {
      this.notClear = false;
      this._off = 0;
    };
    LargeLinesPath2.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    };
    LargeLinesPath2.prototype.getDefaultShape = function() {
      return new LargeLinesPathShape();
    };
    LargeLinesPath2.prototype.buildPath = function(ctx, shape) {
      var segs = shape.segs;
      var curveness = shape.curveness;
      var i;
      if (shape.polyline) {
        for (i = this._off; i < segs.length; ) {
          var count = segs[i++];
          if (count > 0) {
            ctx.moveTo(segs[i++], segs[i++]);
            for (var k = 1; k < count; k++) {
              ctx.lineTo(segs[i++], segs[i++]);
            }
          }
        }
      } else {
        for (i = this._off; i < segs.length; ) {
          var x0 = segs[i++];
          var y0 = segs[i++];
          var x1 = segs[i++];
          var y1 = segs[i++];
          ctx.moveTo(x0, y0);
          if (curveness > 0) {
            var x2 = (x0 + x1) / 2 - (y0 - y1) * curveness;
            var y2 = (y0 + y1) / 2 - (x1 - x0) * curveness;
            ctx.quadraticCurveTo(x2, y2, x1, y1);
          } else {
            ctx.lineTo(x1, y1);
          }
        }
      }
      if (this.incremental) {
        this._off = i;
        this.notClear = true;
      }
    };
    LargeLinesPath2.prototype.findDataIndex = function(x, y) {
      var shape = this.shape;
      var segs = shape.segs;
      var curveness = shape.curveness;
      var lineWidth = this.style.lineWidth;
      if (shape.polyline) {
        var dataIndex = 0;
        for (var i = 0; i < segs.length; ) {
          var count = segs[i++];
          if (count > 0) {
            var x0 = segs[i++];
            var y0 = segs[i++];
            for (var k = 1; k < count; k++) {
              var x1 = segs[i++];
              var y1 = segs[i++];
              if (containStroke(x0, y0, x1, y1, lineWidth, x, y)) {
                return dataIndex;
              }
            }
          }
          dataIndex++;
        }
      } else {
        var dataIndex = 0;
        for (var i = 0; i < segs.length; ) {
          var x0 = segs[i++];
          var y0 = segs[i++];
          var x1 = segs[i++];
          var y1 = segs[i++];
          if (curveness > 0) {
            var x2 = (x0 + x1) / 2 - (y0 - y1) * curveness;
            var y2 = (y0 + y1) / 2 - (x1 - x0) * curveness;
            if (containStroke2(x0, y0, x2, y2, x1, y1, lineWidth, x, y)) {
              return dataIndex;
            }
          } else {
            if (containStroke(x0, y0, x1, y1, lineWidth, x, y)) {
              return dataIndex;
            }
          }
          dataIndex++;
        }
      }
      return -1;
    };
    LargeLinesPath2.prototype.contain = function(x, y) {
      var localPos = this.transformCoordToLocal(x, y);
      var rect = this.getBoundingRect();
      x = localPos[0];
      y = localPos[1];
      if (rect.contain(x, y)) {
        var dataIdx = this.hoverDataIdx = this.findDataIndex(x, y);
        return dataIdx >= 0;
      }
      this.hoverDataIdx = -1;
      return false;
    };
    LargeLinesPath2.prototype.getBoundingRect = function() {
      var rect = this._rect;
      if (!rect) {
        var shape = this.shape;
        var points = shape.segs;
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i = 0; i < points.length; ) {
          var x = points[i++];
          var y = points[i++];
          minX = Math.min(x, minX);
          maxX = Math.max(x, maxX);
          minY = Math.min(y, minY);
          maxY = Math.max(y, maxY);
        }
        rect = this._rect = new BoundingRect_default(minX, minY, maxX, maxY);
      }
      return rect;
    };
    return LargeLinesPath2;
  }(Path_default)
);
var LargeLineDraw = (
  /** @class */
  function() {
    function LargeLineDraw2() {
      this.group = new Group_default();
    }
    LargeLineDraw2.prototype.updateData = function(data) {
      this._clear();
      var lineEl = this._create();
      lineEl.setShape({
        segs: data.getLayout("linesPoints")
      });
      this._setCommon(lineEl, data);
    };
    ;
    LargeLineDraw2.prototype.incrementalPrepareUpdate = function(data) {
      this.group.removeAll();
      this._clear();
    };
    ;
    LargeLineDraw2.prototype.incrementalUpdate = function(taskParams, data) {
      var lastAdded = this._newAdded[0];
      var linePoints = data.getLayout("linesPoints");
      var oldSegs = lastAdded && lastAdded.shape.segs;
      if (oldSegs && oldSegs.length < 2e4) {
        var oldLen = oldSegs.length;
        var newSegs = new Float32Array(oldLen + linePoints.length);
        newSegs.set(oldSegs);
        newSegs.set(linePoints, oldLen);
        lastAdded.setShape({
          segs: newSegs
        });
      } else {
        this._newAdded = [];
        var lineEl = this._create();
        lineEl.incremental = true;
        lineEl.setShape({
          segs: linePoints
        });
        this._setCommon(lineEl, data);
        lineEl.__startIndex = taskParams.start;
      }
    };
    LargeLineDraw2.prototype.remove = function() {
      this._clear();
    };
    LargeLineDraw2.prototype.eachRendered = function(cb) {
      this._newAdded[0] && cb(this._newAdded[0]);
    };
    LargeLineDraw2.prototype._create = function() {
      var lineEl = new LargeLinesPath({
        cursor: "default",
        ignoreCoarsePointer: true
      });
      this._newAdded.push(lineEl);
      this.group.add(lineEl);
      return lineEl;
    };
    LargeLineDraw2.prototype._setCommon = function(lineEl, data, isIncremental) {
      var hostModel = data.hostModel;
      lineEl.setShape({
        polyline: hostModel.get("polyline"),
        curveness: hostModel.get(["lineStyle", "curveness"])
      });
      lineEl.useStyle(hostModel.getModel("lineStyle").getLineStyle());
      lineEl.style.strokeNoScale = true;
      var style = data.getVisual("style");
      if (style && style.stroke) {
        lineEl.setStyle("stroke", style.stroke);
      }
      lineEl.setStyle("fill", null);
      var ecData = getECData(lineEl);
      ecData.seriesIndex = hostModel.seriesIndex;
      lineEl.on("mousemove", function(e) {
        ecData.dataIndex = null;
        var dataIndex = lineEl.hoverDataIdx;
        if (dataIndex > 0) {
          ecData.dataIndex = dataIndex + lineEl.__startIndex;
        }
      });
    };
    ;
    LargeLineDraw2.prototype._clear = function() {
      this._newAdded = [];
      this.group.removeAll();
    };
    ;
    return LargeLineDraw2;
  }()
);
var LargeLineDraw_default = LargeLineDraw;

// node_modules/echarts/lib/chart/lines/linesLayout.js
var linesLayout = {
  seriesType: "lines",
  plan: createRenderPlanner(),
  reset: function(seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    if (!coordSys) {
      if (true) {
        error("The lines series must have a coordinate system.");
      }
      return;
    }
    var isPolyline = seriesModel.get("polyline");
    var isLarge = seriesModel.pipelineContext.large;
    return {
      progress: function(params, lineData) {
        var lineCoords = [];
        if (isLarge) {
          var points = void 0;
          var segCount = params.end - params.start;
          if (isPolyline) {
            var totalCoordsCount = 0;
            for (var i = params.start; i < params.end; i++) {
              totalCoordsCount += seriesModel.getLineCoordsCount(i);
            }
            points = new Float32Array(segCount + totalCoordsCount * 2);
          } else {
            points = new Float32Array(segCount * 4);
          }
          var offset = 0;
          var pt = [];
          for (var i = params.start; i < params.end; i++) {
            var len2 = seriesModel.getLineCoords(i, lineCoords);
            if (isPolyline) {
              points[offset++] = len2;
            }
            for (var k = 0; k < len2; k++) {
              pt = coordSys.dataToPoint(lineCoords[k], false, pt);
              points[offset++] = pt[0];
              points[offset++] = pt[1];
            }
          }
          lineData.setLayout("linesPoints", points);
        } else {
          for (var i = params.start; i < params.end; i++) {
            var itemModel = lineData.getItemModel(i);
            var len2 = seriesModel.getLineCoords(i, lineCoords);
            var pts = [];
            if (isPolyline) {
              for (var j = 0; j < len2; j++) {
                pts.push(coordSys.dataToPoint(lineCoords[j]));
              }
            } else {
              pts[0] = coordSys.dataToPoint(lineCoords[0]);
              pts[1] = coordSys.dataToPoint(lineCoords[1]);
              var curveness = itemModel.get(["lineStyle", "curveness"]);
              if (+curveness) {
                pts[2] = [(pts[0][0] + pts[1][0]) / 2 - (pts[0][1] - pts[1][1]) * curveness, (pts[0][1] + pts[1][1]) / 2 - (pts[1][0] - pts[0][0]) * curveness];
              }
            }
            lineData.setItemLayout(i, pts);
          }
        }
      }
    };
  }
};
var linesLayout_default = linesLayout;

// node_modules/echarts/lib/chart/lines/LinesView.js
var LinesView = (
  /** @class */
  function(_super) {
    __extends(LinesView2, _super);
    function LinesView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = LinesView2.type;
      return _this;
    }
    LinesView2.prototype.render = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var lineDraw = this._updateLineDraw(data, seriesModel);
      var zlevel = seriesModel.get("zlevel");
      var trailLength = seriesModel.get(["effect", "trailLength"]);
      var zr = api.getZr();
      var isSvg = zr.painter.getType() === "svg";
      if (!isSvg) {
        zr.painter.getLayer(zlevel).clear(true);
      }
      if (this._lastZlevel != null && !isSvg) {
        zr.configLayer(this._lastZlevel, {
          motionBlur: false
        });
      }
      if (this._showEffect(seriesModel) && trailLength > 0) {
        if (!isSvg) {
          zr.configLayer(zlevel, {
            motionBlur: true,
            lastFrameAlpha: Math.max(Math.min(trailLength / 10 + 0.9, 1), 0)
          });
        } else if (true) {
          console.warn("SVG render mode doesn't support lines with trail effect");
        }
      }
      lineDraw.updateData(data);
      var clipPath = seriesModel.get("clip", true) && createClipPath(seriesModel.coordinateSystem, false, seriesModel);
      if (clipPath) {
        this.group.setClipPath(clipPath);
      } else {
        this.group.removeClipPath();
      }
      this._lastZlevel = zlevel;
      this._finished = true;
    };
    LinesView2.prototype.incrementalPrepareRender = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var lineDraw = this._updateLineDraw(data, seriesModel);
      lineDraw.incrementalPrepareUpdate(data);
      this._clearLayer(api);
      this._finished = false;
    };
    LinesView2.prototype.incrementalRender = function(taskParams, seriesModel, ecModel) {
      this._lineDraw.incrementalUpdate(taskParams, seriesModel.getData());
      this._finished = taskParams.end === seriesModel.getData().count();
    };
    LinesView2.prototype.eachRendered = function(cb) {
      this._lineDraw && this._lineDraw.eachRendered(cb);
    };
    LinesView2.prototype.updateTransform = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var pipelineContext = seriesModel.pipelineContext;
      if (!this._finished || pipelineContext.large || pipelineContext.progressiveRender) {
        return {
          update: true
        };
      } else {
        var res = linesLayout_default.reset(seriesModel, ecModel, api);
        if (res.progress) {
          res.progress({
            start: 0,
            end: data.count(),
            count: data.count()
          }, data);
        }
        this._lineDraw.updateLayout();
        this._clearLayer(api);
      }
    };
    LinesView2.prototype._updateLineDraw = function(data, seriesModel) {
      var lineDraw = this._lineDraw;
      var hasEffect = this._showEffect(seriesModel);
      var isPolyline = !!seriesModel.get("polyline");
      var pipelineContext = seriesModel.pipelineContext;
      var isLargeDraw = pipelineContext.large;
      if (true) {
        if (hasEffect && isLargeDraw) {
          console.warn("Large lines not support effect");
        }
      }
      if (!lineDraw || hasEffect !== this._hasEffet || isPolyline !== this._isPolyline || isLargeDraw !== this._isLargeDraw) {
        if (lineDraw) {
          lineDraw.remove();
        }
        lineDraw = this._lineDraw = isLargeDraw ? new LargeLineDraw_default() : new LineDraw_default(isPolyline ? hasEffect ? EffectPolyline_default : Polyline_default2 : hasEffect ? EffectLine_default : Line_default2);
        this._hasEffet = hasEffect;
        this._isPolyline = isPolyline;
        this._isLargeDraw = isLargeDraw;
      }
      this.group.add(lineDraw.group);
      return lineDraw;
    };
    LinesView2.prototype._showEffect = function(seriesModel) {
      return !!seriesModel.get(["effect", "show"]);
    };
    LinesView2.prototype._clearLayer = function(api) {
      var zr = api.getZr();
      var isSvg = zr.painter.getType() === "svg";
      if (!isSvg && this._lastZlevel != null) {
        zr.painter.getLayer(this._lastZlevel).clear(true);
      }
    };
    LinesView2.prototype.remove = function(ecModel, api) {
      this._lineDraw && this._lineDraw.remove();
      this._lineDraw = null;
      this._clearLayer(api);
    };
    LinesView2.prototype.dispose = function(ecModel, api) {
      this.remove(ecModel, api);
    };
    LinesView2.type = "lines";
    return LinesView2;
  }(Chart_default)
);
var LinesView_default = LinesView;

// node_modules/echarts/lib/chart/lines/LinesSeries.js
var Uint32Arr = typeof Uint32Array === "undefined" ? Array : Uint32Array;
var Float64Arr = typeof Float64Array === "undefined" ? Array : Float64Array;
function compatEc2(seriesOpt) {
  var data = seriesOpt.data;
  if (data && data[0] && data[0][0] && data[0][0].coord) {
    if (true) {
      console.warn("Lines data configuration has been changed to { coords:[[1,2],[2,3]] }");
    }
    seriesOpt.data = map(data, function(itemOpt) {
      var coords = [itemOpt[0].coord, itemOpt[1].coord];
      var target = {
        coords
      };
      if (itemOpt[0].name) {
        target.fromName = itemOpt[0].name;
      }
      if (itemOpt[1].name) {
        target.toName = itemOpt[1].name;
      }
      return mergeAll([target, itemOpt[0], itemOpt[1]]);
    });
  }
}
var LinesSeriesModel = (
  /** @class */
  function(_super) {
    __extends(LinesSeriesModel2, _super);
    function LinesSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = LinesSeriesModel2.type;
      _this.visualStyleAccessPath = "lineStyle";
      _this.visualDrawType = "stroke";
      return _this;
    }
    LinesSeriesModel2.prototype.init = function(option) {
      option.data = option.data || [];
      compatEc2(option);
      var result = this._processFlatCoordsArray(option.data);
      this._flatCoords = result.flatCoords;
      this._flatCoordsOffset = result.flatCoordsOffset;
      if (result.flatCoords) {
        option.data = new Float32Array(result.count);
      }
      _super.prototype.init.apply(this, arguments);
    };
    LinesSeriesModel2.prototype.mergeOption = function(option) {
      compatEc2(option);
      if (option.data) {
        var result = this._processFlatCoordsArray(option.data);
        this._flatCoords = result.flatCoords;
        this._flatCoordsOffset = result.flatCoordsOffset;
        if (result.flatCoords) {
          option.data = new Float32Array(result.count);
        }
      }
      _super.prototype.mergeOption.apply(this, arguments);
    };
    LinesSeriesModel2.prototype.appendData = function(params) {
      var result = this._processFlatCoordsArray(params.data);
      if (result.flatCoords) {
        if (!this._flatCoords) {
          this._flatCoords = result.flatCoords;
          this._flatCoordsOffset = result.flatCoordsOffset;
        } else {
          this._flatCoords = concatArray(this._flatCoords, result.flatCoords);
          this._flatCoordsOffset = concatArray(this._flatCoordsOffset, result.flatCoordsOffset);
        }
        params.data = new Float32Array(result.count);
      }
      this.getRawData().appendData(params.data);
    };
    LinesSeriesModel2.prototype._getCoordsFromItemModel = function(idx) {
      var itemModel = this.getData().getItemModel(idx);
      var coords = itemModel.option instanceof Array ? itemModel.option : itemModel.getShallow("coords");
      if (true) {
        if (!(coords instanceof Array && coords.length > 0 && coords[0] instanceof Array)) {
          throw new Error("Invalid coords " + JSON.stringify(coords) + ". Lines must have 2d coords array in data item.");
        }
      }
      return coords;
    };
    LinesSeriesModel2.prototype.getLineCoordsCount = function(idx) {
      if (this._flatCoordsOffset) {
        return this._flatCoordsOffset[idx * 2 + 1];
      } else {
        return this._getCoordsFromItemModel(idx).length;
      }
    };
    LinesSeriesModel2.prototype.getLineCoords = function(idx, out) {
      if (this._flatCoordsOffset) {
        var offset = this._flatCoordsOffset[idx * 2];
        var len2 = this._flatCoordsOffset[idx * 2 + 1];
        for (var i = 0; i < len2; i++) {
          out[i] = out[i] || [];
          out[i][0] = this._flatCoords[offset + i * 2];
          out[i][1] = this._flatCoords[offset + i * 2 + 1];
        }
        return len2;
      } else {
        var coords = this._getCoordsFromItemModel(idx);
        for (var i = 0; i < coords.length; i++) {
          out[i] = out[i] || [];
          out[i][0] = coords[i][0];
          out[i][1] = coords[i][1];
        }
        return coords.length;
      }
    };
    LinesSeriesModel2.prototype._processFlatCoordsArray = function(data) {
      var startOffset = 0;
      if (this._flatCoords) {
        startOffset = this._flatCoords.length;
      }
      if (isNumber(data[0])) {
        var len2 = data.length;
        var coordsOffsetAndLenStorage = new Uint32Arr(len2);
        var coordsStorage = new Float64Arr(len2);
        var coordsCursor = 0;
        var offsetCursor = 0;
        var dataCount = 0;
        for (var i = 0; i < len2; ) {
          dataCount++;
          var count = data[i++];
          coordsOffsetAndLenStorage[offsetCursor++] = coordsCursor + startOffset;
          coordsOffsetAndLenStorage[offsetCursor++] = count;
          for (var k = 0; k < count; k++) {
            var x = data[i++];
            var y = data[i++];
            coordsStorage[coordsCursor++] = x;
            coordsStorage[coordsCursor++] = y;
            if (i > len2) {
              if (true) {
                throw new Error("Invalid data format.");
              }
            }
          }
        }
        return {
          flatCoordsOffset: new Uint32Array(coordsOffsetAndLenStorage.buffer, 0, offsetCursor),
          flatCoords: coordsStorage,
          count: dataCount
        };
      }
      return {
        flatCoordsOffset: null,
        flatCoords: null,
        count: data.length
      };
    };
    LinesSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      if (true) {
        var CoordSys = CoordinateSystem_default.get(option.coordinateSystem);
        if (!CoordSys) {
          throw new Error("Unknown coordinate system " + option.coordinateSystem);
        }
      }
      var lineData = new SeriesData_default(["value"], this);
      lineData.hasItemOption = false;
      lineData.initData(option.data, [], function(dataItem, dimName, dataIndex, dimIndex) {
        if (dataItem instanceof Array) {
          return NaN;
        } else {
          lineData.hasItemOption = true;
          var value = dataItem.value;
          if (value != null) {
            return value instanceof Array ? value[dimIndex] : value;
          }
        }
      });
      return lineData;
    };
    LinesSeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      var data = this.getData();
      var itemModel = data.getItemModel(dataIndex);
      var name = itemModel.get("name");
      if (name) {
        return name;
      }
      var fromName = itemModel.get("fromName");
      var toName = itemModel.get("toName");
      var nameArr = [];
      fromName != null && nameArr.push(fromName);
      toName != null && nameArr.push(toName);
      return createTooltipMarkup("nameValue", {
        name: nameArr.join(" > ")
      });
    };
    LinesSeriesModel2.prototype.preventIncremental = function() {
      return !!this.get(["effect", "show"]);
    };
    LinesSeriesModel2.prototype.getProgressive = function() {
      var progressive = this.option.progressive;
      if (progressive == null) {
        return this.option.large ? 1e4 : this.get("progressive");
      }
      return progressive;
    };
    LinesSeriesModel2.prototype.getProgressiveThreshold = function() {
      var progressiveThreshold = this.option.progressiveThreshold;
      if (progressiveThreshold == null) {
        return this.option.large ? 2e4 : this.get("progressiveThreshold");
      }
      return progressiveThreshold;
    };
    LinesSeriesModel2.prototype.getZLevelKey = function() {
      var effectModel = this.getModel("effect");
      var trailLength = effectModel.get("trailLength");
      return this.getData().count() > this.getProgressiveThreshold() ? this.id : effectModel.get("show") && trailLength > 0 ? trailLength + "" : "";
    };
    LinesSeriesModel2.type = "series.lines";
    LinesSeriesModel2.dependencies = ["grid", "polar", "geo", "calendar"];
    LinesSeriesModel2.defaultOption = {
      coordinateSystem: "geo",
      // zlevel: 0,
      z: 2,
      legendHoverLink: true,
      // Cartesian coordinate system
      xAxisIndex: 0,
      yAxisIndex: 0,
      symbol: ["none", "none"],
      symbolSize: [10, 10],
      // Geo coordinate system
      geoIndex: 0,
      effect: {
        show: false,
        period: 4,
        constantSpeed: 0,
        symbol: "circle",
        symbolSize: 3,
        loop: true,
        trailLength: 0.2
      },
      large: false,
      // Available when large is true
      largeThreshold: 2e3,
      polyline: false,
      clip: true,
      label: {
        show: false,
        position: "end"
        // distance: 5,
        // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
      },
      lineStyle: {
        opacity: 0.5
      }
    };
    return LinesSeriesModel2;
  }(Series_default)
);
var LinesSeries_default = LinesSeriesModel;

// node_modules/echarts/lib/chart/lines/linesVisual.js
function normalize3(a) {
  if (!(a instanceof Array)) {
    a = [a, a];
  }
  return a;
}
var linesVisual = {
  seriesType: "lines",
  reset: function(seriesModel) {
    var symbolType = normalize3(seriesModel.get("symbol"));
    var symbolSize = normalize3(seriesModel.get("symbolSize"));
    var data = seriesModel.getData();
    data.setVisual("fromSymbol", symbolType && symbolType[0]);
    data.setVisual("toSymbol", symbolType && symbolType[1]);
    data.setVisual("fromSymbolSize", symbolSize && symbolSize[0]);
    data.setVisual("toSymbolSize", symbolSize && symbolSize[1]);
    function dataEach(data2, idx) {
      var itemModel = data2.getItemModel(idx);
      var symbolType2 = normalize3(itemModel.getShallow("symbol", true));
      var symbolSize2 = normalize3(itemModel.getShallow("symbolSize", true));
      symbolType2[0] && data2.setItemVisual(idx, "fromSymbol", symbolType2[0]);
      symbolType2[1] && data2.setItemVisual(idx, "toSymbol", symbolType2[1]);
      symbolSize2[0] && data2.setItemVisual(idx, "fromSymbolSize", symbolSize2[0]);
      symbolSize2[1] && data2.setItemVisual(idx, "toSymbolSize", symbolSize2[1]);
    }
    return {
      dataEach: data.hasItemOption ? dataEach : null
    };
  }
};
var linesVisual_default = linesVisual;

// node_modules/echarts/lib/chart/lines/install.js
function install21(registers) {
  registers.registerChartView(LinesView_default);
  registers.registerSeriesModel(LinesSeries_default);
  registers.registerLayout(linesLayout_default);
  registers.registerVisual(linesVisual_default);
}

// node_modules/echarts/lib/chart/heatmap/HeatmapLayer.js
var GRADIENT_LEVELS = 256;
var HeatmapLayer = (
  /** @class */
  function() {
    function HeatmapLayer2() {
      this.blurSize = 30;
      this.pointSize = 20;
      this.maxOpacity = 1;
      this.minOpacity = 0;
      this._gradientPixels = {
        inRange: null,
        outOfRange: null
      };
      var canvas = platformApi.createCanvas();
      this.canvas = canvas;
    }
    HeatmapLayer2.prototype.update = function(data, width, height, normalize4, colorFunc, isInRange) {
      var brush = this._getBrush();
      var gradientInRange = this._getGradient(colorFunc, "inRange");
      var gradientOutOfRange = this._getGradient(colorFunc, "outOfRange");
      var r = this.pointSize + this.blurSize;
      var canvas = this.canvas;
      var ctx = canvas.getContext("2d");
      var len2 = data.length;
      canvas.width = width;
      canvas.height = height;
      for (var i = 0; i < len2; ++i) {
        var p = data[i];
        var x = p[0];
        var y = p[1];
        var value = p[2];
        var alpha = normalize4(value);
        ctx.globalAlpha = alpha;
        ctx.drawImage(brush, x - r, y - r);
      }
      if (!canvas.width || !canvas.height) {
        return canvas;
      }
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var pixels = imageData.data;
      var offset = 0;
      var pixelLen = pixels.length;
      var minOpacity = this.minOpacity;
      var maxOpacity = this.maxOpacity;
      var diffOpacity = maxOpacity - minOpacity;
      while (offset < pixelLen) {
        var alpha = pixels[offset + 3] / 256;
        var gradientOffset = Math.floor(alpha * (GRADIENT_LEVELS - 1)) * 4;
        if (alpha > 0) {
          var gradient = isInRange(alpha) ? gradientInRange : gradientOutOfRange;
          alpha > 0 && (alpha = alpha * diffOpacity + minOpacity);
          pixels[offset++] = gradient[gradientOffset];
          pixels[offset++] = gradient[gradientOffset + 1];
          pixels[offset++] = gradient[gradientOffset + 2];
          pixels[offset++] = gradient[gradientOffset + 3] * alpha * 256;
        } else {
          offset += 4;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      return canvas;
    };
    HeatmapLayer2.prototype._getBrush = function() {
      var brushCanvas = this._brushCanvas || (this._brushCanvas = platformApi.createCanvas());
      var r = this.pointSize + this.blurSize;
      var d = r * 2;
      brushCanvas.width = d;
      brushCanvas.height = d;
      var ctx = brushCanvas.getContext("2d");
      ctx.clearRect(0, 0, d, d);
      ctx.shadowOffsetX = d;
      ctx.shadowBlur = this.blurSize;
      ctx.shadowColor = "#000";
      ctx.beginPath();
      ctx.arc(-r, r, this.pointSize, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      return brushCanvas;
    };
    HeatmapLayer2.prototype._getGradient = function(colorFunc, state) {
      var gradientPixels = this._gradientPixels;
      var pixelsSingleState = gradientPixels[state] || (gradientPixels[state] = new Uint8ClampedArray(256 * 4));
      var color = [0, 0, 0, 0];
      var off = 0;
      for (var i = 0; i < 256; i++) {
        colorFunc[state](i / 255, true, color);
        pixelsSingleState[off++] = color[0];
        pixelsSingleState[off++] = color[1];
        pixelsSingleState[off++] = color[2];
        pixelsSingleState[off++] = color[3];
      }
      return pixelsSingleState;
    };
    return HeatmapLayer2;
  }()
);
var HeatmapLayer_default = HeatmapLayer;

// node_modules/echarts/lib/chart/heatmap/HeatmapView.js
function getIsInPiecewiseRange(dataExtent, pieceList, selected) {
  var dataSpan = dataExtent[1] - dataExtent[0];
  pieceList = map(pieceList, function(piece) {
    return {
      interval: [(piece.interval[0] - dataExtent[0]) / dataSpan, (piece.interval[1] - dataExtent[0]) / dataSpan]
    };
  });
  var len2 = pieceList.length;
  var lastIndex = 0;
  return function(val) {
    var i;
    for (i = lastIndex; i < len2; i++) {
      var interval = pieceList[i].interval;
      if (interval[0] <= val && val <= interval[1]) {
        lastIndex = i;
        break;
      }
    }
    if (i === len2) {
      for (i = lastIndex - 1; i >= 0; i--) {
        var interval = pieceList[i].interval;
        if (interval[0] <= val && val <= interval[1]) {
          lastIndex = i;
          break;
        }
      }
    }
    return i >= 0 && i < len2 && selected[i];
  };
}
function getIsInContinuousRange(dataExtent, range) {
  var dataSpan = dataExtent[1] - dataExtent[0];
  range = [(range[0] - dataExtent[0]) / dataSpan, (range[1] - dataExtent[0]) / dataSpan];
  return function(val) {
    return val >= range[0] && val <= range[1];
  };
}
function isGeoCoordSys(coordSys) {
  var dimensions = coordSys.dimensions;
  return dimensions[0] === "lng" && dimensions[1] === "lat";
}
var HeatmapView = (
  /** @class */
  function(_super) {
    __extends(HeatmapView2, _super);
    function HeatmapView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = HeatmapView2.type;
      return _this;
    }
    HeatmapView2.prototype.render = function(seriesModel, ecModel, api) {
      var visualMapOfThisSeries;
      ecModel.eachComponent("visualMap", function(visualMap) {
        visualMap.eachTargetSeries(function(targetSeries) {
          if (targetSeries === seriesModel) {
            visualMapOfThisSeries = visualMap;
          }
        });
      });
      if (true) {
        if (!visualMapOfThisSeries) {
          throw new Error("Heatmap must use with visualMap");
        }
      }
      this._progressiveEls = null;
      this.group.removeAll();
      var coordSys = seriesModel.coordinateSystem;
      if (coordSys.type === "cartesian2d" || coordSys.type === "calendar") {
        this._renderOnCartesianAndCalendar(seriesModel, api, 0, seriesModel.getData().count());
      } else if (isGeoCoordSys(coordSys)) {
        this._renderOnGeo(coordSys, seriesModel, visualMapOfThisSeries, api);
      }
    };
    HeatmapView2.prototype.incrementalPrepareRender = function(seriesModel, ecModel, api) {
      this.group.removeAll();
    };
    HeatmapView2.prototype.incrementalRender = function(params, seriesModel, ecModel, api) {
      var coordSys = seriesModel.coordinateSystem;
      if (coordSys) {
        if (isGeoCoordSys(coordSys)) {
          this.render(seriesModel, ecModel, api);
        } else {
          this._progressiveEls = [];
          this._renderOnCartesianAndCalendar(seriesModel, api, params.start, params.end, true);
        }
      }
    };
    HeatmapView2.prototype.eachRendered = function(cb) {
      traverseElements(this._progressiveEls || this.group, cb);
    };
    HeatmapView2.prototype._renderOnCartesianAndCalendar = function(seriesModel, api, start, end, incremental) {
      var coordSys = seriesModel.coordinateSystem;
      var isCartesian2d = isCoordinateSystemType(coordSys, "cartesian2d");
      var width;
      var height;
      var xAxisExtent;
      var yAxisExtent;
      if (isCartesian2d) {
        var xAxis = coordSys.getAxis("x");
        var yAxis = coordSys.getAxis("y");
        if (true) {
          if (!(xAxis.type === "category" && yAxis.type === "category")) {
            throw new Error("Heatmap on cartesian must have two category axes");
          }
          if (!(xAxis.onBand && yAxis.onBand)) {
            throw new Error("Heatmap on cartesian must have two axes with boundaryGap true");
          }
        }
        width = xAxis.getBandWidth() + 0.5;
        height = yAxis.getBandWidth() + 0.5;
        xAxisExtent = xAxis.scale.getExtent();
        yAxisExtent = yAxis.scale.getExtent();
      }
      var group = this.group;
      var data = seriesModel.getData();
      var emphasisStyle = seriesModel.getModel(["emphasis", "itemStyle"]).getItemStyle();
      var blurStyle = seriesModel.getModel(["blur", "itemStyle"]).getItemStyle();
      var selectStyle = seriesModel.getModel(["select", "itemStyle"]).getItemStyle();
      var borderRadius = seriesModel.get(["itemStyle", "borderRadius"]);
      var labelStatesModels = getLabelStatesModels(seriesModel);
      var emphasisModel = seriesModel.getModel("emphasis");
      var focus = emphasisModel.get("focus");
      var blurScope = emphasisModel.get("blurScope");
      var emphasisDisabled = emphasisModel.get("disabled");
      var dataDims = isCartesian2d ? [data.mapDimension("x"), data.mapDimension("y"), data.mapDimension("value")] : [data.mapDimension("time"), data.mapDimension("value")];
      for (var idx = start; idx < end; idx++) {
        var rect = void 0;
        var style = data.getItemVisual(idx, "style");
        if (isCartesian2d) {
          var dataDimX = data.get(dataDims[0], idx);
          var dataDimY = data.get(dataDims[1], idx);
          if (isNaN(data.get(dataDims[2], idx)) || isNaN(dataDimX) || isNaN(dataDimY) || dataDimX < xAxisExtent[0] || dataDimX > xAxisExtent[1] || dataDimY < yAxisExtent[0] || dataDimY > yAxisExtent[1]) {
            continue;
          }
          var point = coordSys.dataToPoint([dataDimX, dataDimY]);
          rect = new Rect_default({
            shape: {
              x: point[0] - width / 2,
              y: point[1] - height / 2,
              width,
              height
            },
            style
          });
        } else {
          if (isNaN(data.get(dataDims[1], idx))) {
            continue;
          }
          rect = new Rect_default({
            z2: 1,
            shape: coordSys.dataToRect([data.get(dataDims[0], idx)]).contentShape,
            style
          });
        }
        if (data.hasItemOption) {
          var itemModel = data.getItemModel(idx);
          var emphasisModel_1 = itemModel.getModel("emphasis");
          emphasisStyle = emphasisModel_1.getModel("itemStyle").getItemStyle();
          blurStyle = itemModel.getModel(["blur", "itemStyle"]).getItemStyle();
          selectStyle = itemModel.getModel(["select", "itemStyle"]).getItemStyle();
          borderRadius = itemModel.get(["itemStyle", "borderRadius"]);
          focus = emphasisModel_1.get("focus");
          blurScope = emphasisModel_1.get("blurScope");
          emphasisDisabled = emphasisModel_1.get("disabled");
          labelStatesModels = getLabelStatesModels(itemModel);
        }
        rect.shape.r = borderRadius;
        var rawValue = seriesModel.getRawValue(idx);
        var defaultText = "-";
        if (rawValue && rawValue[2] != null) {
          defaultText = rawValue[2] + "";
        }
        setLabelStyle(rect, labelStatesModels, {
          labelFetcher: seriesModel,
          labelDataIndex: idx,
          defaultOpacity: style.opacity,
          defaultText
        });
        rect.ensureState("emphasis").style = emphasisStyle;
        rect.ensureState("blur").style = blurStyle;
        rect.ensureState("select").style = selectStyle;
        toggleHoverEmphasis(rect, focus, blurScope, emphasisDisabled);
        rect.incremental = incremental;
        if (incremental) {
          rect.states.emphasis.hoverLayer = true;
        }
        group.add(rect);
        data.setItemGraphicEl(idx, rect);
        if (this._progressiveEls) {
          this._progressiveEls.push(rect);
        }
      }
    };
    HeatmapView2.prototype._renderOnGeo = function(geo, seriesModel, visualMapModel, api) {
      var inRangeVisuals = visualMapModel.targetVisuals.inRange;
      var outOfRangeVisuals = visualMapModel.targetVisuals.outOfRange;
      var data = seriesModel.getData();
      var hmLayer = this._hmLayer || this._hmLayer || new HeatmapLayer_default();
      hmLayer.blurSize = seriesModel.get("blurSize");
      hmLayer.pointSize = seriesModel.get("pointSize");
      hmLayer.minOpacity = seriesModel.get("minOpacity");
      hmLayer.maxOpacity = seriesModel.get("maxOpacity");
      var rect = geo.getViewRect().clone();
      var roamTransform = geo.getRoamTransform();
      rect.applyTransform(roamTransform);
      var x = Math.max(rect.x, 0);
      var y = Math.max(rect.y, 0);
      var x2 = Math.min(rect.width + rect.x, api.getWidth());
      var y2 = Math.min(rect.height + rect.y, api.getHeight());
      var width = x2 - x;
      var height = y2 - y;
      var dims = [data.mapDimension("lng"), data.mapDimension("lat"), data.mapDimension("value")];
      var points = data.mapArray(dims, function(lng, lat, value) {
        var pt = geo.dataToPoint([lng, lat]);
        pt[0] -= x;
        pt[1] -= y;
        pt.push(value);
        return pt;
      });
      var dataExtent = visualMapModel.getExtent();
      var isInRange = visualMapModel.type === "visualMap.continuous" ? getIsInContinuousRange(dataExtent, visualMapModel.option.range) : getIsInPiecewiseRange(dataExtent, visualMapModel.getPieceList(), visualMapModel.option.selected);
      hmLayer.update(points, width, height, inRangeVisuals.color.getNormalizer(), {
        inRange: inRangeVisuals.color.getColorMapper(),
        outOfRange: outOfRangeVisuals.color.getColorMapper()
      }, isInRange);
      var img = new Image_default({
        style: {
          width,
          height,
          x,
          y,
          image: hmLayer.canvas
        },
        silent: true
      });
      this.group.add(img);
    };
    HeatmapView2.type = "heatmap";
    return HeatmapView2;
  }(Chart_default)
);
var HeatmapView_default = HeatmapView;

// node_modules/echarts/lib/chart/heatmap/HeatmapSeries.js
var HeatmapSeriesModel = (
  /** @class */
  function(_super) {
    __extends(HeatmapSeriesModel2, _super);
    function HeatmapSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = HeatmapSeriesModel2.type;
      return _this;
    }
    HeatmapSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesData_default(null, this, {
        generateCoord: "value"
      });
    };
    HeatmapSeriesModel2.prototype.preventIncremental = function() {
      var coordSysCreator = CoordinateSystem_default.get(this.get("coordinateSystem"));
      if (coordSysCreator && coordSysCreator.dimensions) {
        return coordSysCreator.dimensions[0] === "lng" && coordSysCreator.dimensions[1] === "lat";
      }
    };
    HeatmapSeriesModel2.type = "series.heatmap";
    HeatmapSeriesModel2.dependencies = ["grid", "geo", "calendar"];
    HeatmapSeriesModel2.defaultOption = {
      coordinateSystem: "cartesian2d",
      // zlevel: 0,
      z: 2,
      // Cartesian coordinate system
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      // Geo coordinate system
      geoIndex: 0,
      blurSize: 30,
      pointSize: 20,
      maxOpacity: 1,
      minOpacity: 0,
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      }
    };
    return HeatmapSeriesModel2;
  }(Series_default)
);
var HeatmapSeries_default = HeatmapSeriesModel;

// node_modules/echarts/lib/chart/heatmap/install.js
function install22(registers) {
  registers.registerChartView(HeatmapView_default);
  registers.registerSeriesModel(HeatmapSeries_default);
}

// node_modules/echarts/lib/chart/bar/PictorialBarView.js
var BAR_BORDER_WIDTH_QUERY = ["itemStyle", "borderWidth"];
var LAYOUT_ATTRS = [{
  xy: "x",
  wh: "width",
  index: 0,
  posDesc: ["left", "right"]
}, {
  xy: "y",
  wh: "height",
  index: 1,
  posDesc: ["top", "bottom"]
}];
var pathForLineWidth = new Circle_default();
var PictorialBarView = (
  /** @class */
  function(_super) {
    __extends(PictorialBarView2, _super);
    function PictorialBarView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = PictorialBarView2.type;
      return _this;
    }
    PictorialBarView2.prototype.render = function(seriesModel, ecModel, api) {
      var group = this.group;
      var data = seriesModel.getData();
      var oldData = this._data;
      var cartesian = seriesModel.coordinateSystem;
      var baseAxis = cartesian.getBaseAxis();
      var isHorizontal = baseAxis.isHorizontal();
      var coordSysRect = cartesian.master.getRect();
      var opt = {
        ecSize: {
          width: api.getWidth(),
          height: api.getHeight()
        },
        seriesModel,
        coordSys: cartesian,
        coordSysExtent: [[coordSysRect.x, coordSysRect.x + coordSysRect.width], [coordSysRect.y, coordSysRect.y + coordSysRect.height]],
        isHorizontal,
        valueDim: LAYOUT_ATTRS[+isHorizontal],
        categoryDim: LAYOUT_ATTRS[1 - +isHorizontal]
      };
      data.diff(oldData).add(function(dataIndex) {
        if (!data.hasValue(dataIndex)) {
          return;
        }
        var itemModel = getItemModel(data, dataIndex);
        var symbolMeta = getSymbolMeta(data, dataIndex, itemModel, opt);
        var bar = createBar(data, opt, symbolMeta);
        data.setItemGraphicEl(dataIndex, bar);
        group.add(bar);
        updateCommon(bar, opt, symbolMeta);
      }).update(function(newIndex, oldIndex) {
        var bar = oldData.getItemGraphicEl(oldIndex);
        if (!data.hasValue(newIndex)) {
          group.remove(bar);
          return;
        }
        var itemModel = getItemModel(data, newIndex);
        var symbolMeta = getSymbolMeta(data, newIndex, itemModel, opt);
        var pictorialShapeStr = getShapeStr(data, symbolMeta);
        if (bar && pictorialShapeStr !== bar.__pictorialShapeStr) {
          group.remove(bar);
          data.setItemGraphicEl(newIndex, null);
          bar = null;
        }
        if (bar) {
          updateBar(bar, opt, symbolMeta);
        } else {
          bar = createBar(data, opt, symbolMeta, true);
        }
        data.setItemGraphicEl(newIndex, bar);
        bar.__pictorialSymbolMeta = symbolMeta;
        group.add(bar);
        updateCommon(bar, opt, symbolMeta);
      }).remove(function(dataIndex) {
        var bar = oldData.getItemGraphicEl(dataIndex);
        bar && removeBar(oldData, dataIndex, bar.__pictorialSymbolMeta.animationModel, bar);
      }).execute();
      var clipPath = seriesModel.get("clip", true) ? createClipPath(seriesModel.coordinateSystem, false, seriesModel) : null;
      if (clipPath) {
        group.setClipPath(clipPath);
      } else {
        group.removeClipPath();
      }
      this._data = data;
      return this.group;
    };
    PictorialBarView2.prototype.remove = function(ecModel, api) {
      var group = this.group;
      var data = this._data;
      if (ecModel.get("animation")) {
        if (data) {
          data.eachItemGraphicEl(function(bar) {
            removeBar(data, getECData(bar).dataIndex, ecModel, bar);
          });
        }
      } else {
        group.removeAll();
      }
    };
    PictorialBarView2.type = "pictorialBar";
    return PictorialBarView2;
  }(Chart_default)
);
function getSymbolMeta(data, dataIndex, itemModel, opt) {
  var layout2 = data.getItemLayout(dataIndex);
  var symbolRepeat = itemModel.get("symbolRepeat");
  var symbolClip = itemModel.get("symbolClip");
  var symbolPosition = itemModel.get("symbolPosition") || "start";
  var symbolRotate = itemModel.get("symbolRotate");
  var rotation = (symbolRotate || 0) * Math.PI / 180 || 0;
  var symbolPatternSize = itemModel.get("symbolPatternSize") || 2;
  var isAnimationEnabled2 = itemModel.isAnimationEnabled();
  var symbolMeta = {
    dataIndex,
    layout: layout2,
    itemModel,
    symbolType: data.getItemVisual(dataIndex, "symbol") || "circle",
    style: data.getItemVisual(dataIndex, "style"),
    symbolClip,
    symbolRepeat,
    symbolRepeatDirection: itemModel.get("symbolRepeatDirection"),
    symbolPatternSize,
    rotation,
    animationModel: isAnimationEnabled2 ? itemModel : null,
    hoverScale: isAnimationEnabled2 && itemModel.get(["emphasis", "scale"]),
    z2: itemModel.getShallow("z", true) || 0
  };
  prepareBarLength(itemModel, symbolRepeat, layout2, opt, symbolMeta);
  prepareSymbolSize(data, dataIndex, layout2, symbolRepeat, symbolClip, symbolMeta.boundingLength, symbolMeta.pxSign, symbolPatternSize, opt, symbolMeta);
  prepareLineWidth(itemModel, symbolMeta.symbolScale, rotation, opt, symbolMeta);
  var symbolSize = symbolMeta.symbolSize;
  var symbolOffset = normalizeSymbolOffset(itemModel.get("symbolOffset"), symbolSize);
  prepareLayoutInfo(itemModel, symbolSize, layout2, symbolRepeat, symbolClip, symbolOffset, symbolPosition, symbolMeta.valueLineWidth, symbolMeta.boundingLength, symbolMeta.repeatCutLength, opt, symbolMeta);
  return symbolMeta;
}
function prepareBarLength(itemModel, symbolRepeat, layout2, opt, outputSymbolMeta) {
  var valueDim = opt.valueDim;
  var symbolBoundingData = itemModel.get("symbolBoundingData");
  var valueAxis = opt.coordSys.getOtherAxis(opt.coordSys.getBaseAxis());
  var zeroPx = valueAxis.toGlobalCoord(valueAxis.dataToCoord(0));
  var pxSignIdx = 1 - +(layout2[valueDim.wh] <= 0);
  var boundingLength;
  if (isArray(symbolBoundingData)) {
    var symbolBoundingExtent = [convertToCoordOnAxis(valueAxis, symbolBoundingData[0]) - zeroPx, convertToCoordOnAxis(valueAxis, symbolBoundingData[1]) - zeroPx];
    symbolBoundingExtent[1] < symbolBoundingExtent[0] && symbolBoundingExtent.reverse();
    boundingLength = symbolBoundingExtent[pxSignIdx];
  } else if (symbolBoundingData != null) {
    boundingLength = convertToCoordOnAxis(valueAxis, symbolBoundingData) - zeroPx;
  } else if (symbolRepeat) {
    boundingLength = opt.coordSysExtent[valueDim.index][pxSignIdx] - zeroPx;
  } else {
    boundingLength = layout2[valueDim.wh];
  }
  outputSymbolMeta.boundingLength = boundingLength;
  if (symbolRepeat) {
    outputSymbolMeta.repeatCutLength = layout2[valueDim.wh];
  }
  var isXAxis = valueDim.xy === "x";
  var isInverse = valueAxis.inverse;
  outputSymbolMeta.pxSign = isXAxis && !isInverse || !isXAxis && isInverse ? boundingLength >= 0 ? 1 : -1 : boundingLength > 0 ? 1 : -1;
}
function convertToCoordOnAxis(axis, value) {
  return axis.toGlobalCoord(axis.dataToCoord(axis.scale.parse(value)));
}
function prepareSymbolSize(data, dataIndex, layout2, symbolRepeat, symbolClip, boundingLength, pxSign, symbolPatternSize, opt, outputSymbolMeta) {
  var valueDim = opt.valueDim;
  var categoryDim = opt.categoryDim;
  var categorySize = Math.abs(layout2[categoryDim.wh]);
  var symbolSize = data.getItemVisual(dataIndex, "symbolSize");
  var parsedSymbolSize;
  if (isArray(symbolSize)) {
    parsedSymbolSize = symbolSize.slice();
  } else {
    if (symbolSize == null) {
      parsedSymbolSize = ["100%", "100%"];
    } else {
      parsedSymbolSize = [symbolSize, symbolSize];
    }
  }
  parsedSymbolSize[categoryDim.index] = parsePercent2(parsedSymbolSize[categoryDim.index], categorySize);
  parsedSymbolSize[valueDim.index] = parsePercent2(parsedSymbolSize[valueDim.index], symbolRepeat ? categorySize : Math.abs(boundingLength));
  outputSymbolMeta.symbolSize = parsedSymbolSize;
  var symbolScale = outputSymbolMeta.symbolScale = [parsedSymbolSize[0] / symbolPatternSize, parsedSymbolSize[1] / symbolPatternSize];
  symbolScale[valueDim.index] *= (opt.isHorizontal ? -1 : 1) * pxSign;
}
function prepareLineWidth(itemModel, symbolScale, rotation, opt, outputSymbolMeta) {
  var valueLineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;
  if (valueLineWidth) {
    pathForLineWidth.attr({
      scaleX: symbolScale[0],
      scaleY: symbolScale[1],
      rotation
    });
    pathForLineWidth.updateTransform();
    valueLineWidth /= pathForLineWidth.getLineScale();
    valueLineWidth *= symbolScale[opt.valueDim.index];
  }
  outputSymbolMeta.valueLineWidth = valueLineWidth || 0;
}
function prepareLayoutInfo(itemModel, symbolSize, layout2, symbolRepeat, symbolClip, symbolOffset, symbolPosition, valueLineWidth, boundingLength, repeatCutLength, opt, outputSymbolMeta) {
  var categoryDim = opt.categoryDim;
  var valueDim = opt.valueDim;
  var pxSign = outputSymbolMeta.pxSign;
  var unitLength = Math.max(symbolSize[valueDim.index] + valueLineWidth, 0);
  var pathLen = unitLength;
  if (symbolRepeat) {
    var absBoundingLength = Math.abs(boundingLength);
    var symbolMargin = retrieve(itemModel.get("symbolMargin"), "15%") + "";
    var hasEndGap = false;
    if (symbolMargin.lastIndexOf("!") === symbolMargin.length - 1) {
      hasEndGap = true;
      symbolMargin = symbolMargin.slice(0, symbolMargin.length - 1);
    }
    var symbolMarginNumeric = parsePercent2(symbolMargin, symbolSize[valueDim.index]);
    var uLenWithMargin = Math.max(unitLength + symbolMarginNumeric * 2, 0);
    var endFix = hasEndGap ? 0 : symbolMarginNumeric * 2;
    var repeatSpecified = isNumeric(symbolRepeat);
    var repeatTimes = repeatSpecified ? symbolRepeat : toIntTimes((absBoundingLength + endFix) / uLenWithMargin);
    var mDiff = absBoundingLength - repeatTimes * unitLength;
    symbolMarginNumeric = mDiff / 2 / (hasEndGap ? repeatTimes : Math.max(repeatTimes - 1, 1));
    uLenWithMargin = unitLength + symbolMarginNumeric * 2;
    endFix = hasEndGap ? 0 : symbolMarginNumeric * 2;
    if (!repeatSpecified && symbolRepeat !== "fixed") {
      repeatTimes = repeatCutLength ? toIntTimes((Math.abs(repeatCutLength) + endFix) / uLenWithMargin) : 0;
    }
    pathLen = repeatTimes * uLenWithMargin - endFix;
    outputSymbolMeta.repeatTimes = repeatTimes;
    outputSymbolMeta.symbolMargin = symbolMarginNumeric;
  }
  var sizeFix = pxSign * (pathLen / 2);
  var pathPosition = outputSymbolMeta.pathPosition = [];
  pathPosition[categoryDim.index] = layout2[categoryDim.wh] / 2;
  pathPosition[valueDim.index] = symbolPosition === "start" ? sizeFix : symbolPosition === "end" ? boundingLength - sizeFix : boundingLength / 2;
  if (symbolOffset) {
    pathPosition[0] += symbolOffset[0];
    pathPosition[1] += symbolOffset[1];
  }
  var bundlePosition = outputSymbolMeta.bundlePosition = [];
  bundlePosition[categoryDim.index] = layout2[categoryDim.xy];
  bundlePosition[valueDim.index] = layout2[valueDim.xy];
  var barRectShape = outputSymbolMeta.barRectShape = extend({}, layout2);
  barRectShape[valueDim.wh] = pxSign * Math.max(Math.abs(layout2[valueDim.wh]), Math.abs(pathPosition[valueDim.index] + sizeFix));
  barRectShape[categoryDim.wh] = layout2[categoryDim.wh];
  var clipShape = outputSymbolMeta.clipShape = {};
  clipShape[categoryDim.xy] = -layout2[categoryDim.xy];
  clipShape[categoryDim.wh] = opt.ecSize[categoryDim.wh];
  clipShape[valueDim.xy] = 0;
  clipShape[valueDim.wh] = layout2[valueDim.wh];
}
function createPath(symbolMeta) {
  var symbolPatternSize = symbolMeta.symbolPatternSize;
  var path = createSymbol(
    // Consider texture img, make a big size.
    symbolMeta.symbolType,
    -symbolPatternSize / 2,
    -symbolPatternSize / 2,
    symbolPatternSize,
    symbolPatternSize
  );
  path.attr({
    culling: true
  });
  path.type !== "image" && path.setStyle({
    strokeNoScale: true
  });
  return path;
}
function createOrUpdateRepeatSymbols(bar, opt, symbolMeta, isUpdate) {
  var bundle = bar.__pictorialBundle;
  var symbolSize = symbolMeta.symbolSize;
  var valueLineWidth = symbolMeta.valueLineWidth;
  var pathPosition = symbolMeta.pathPosition;
  var valueDim = opt.valueDim;
  var repeatTimes = symbolMeta.repeatTimes || 0;
  var index = 0;
  var unit = symbolSize[opt.valueDim.index] + valueLineWidth + symbolMeta.symbolMargin * 2;
  eachPath(bar, function(path2) {
    path2.__pictorialAnimationIndex = index;
    path2.__pictorialRepeatTimes = repeatTimes;
    if (index < repeatTimes) {
      updateAttr(path2, null, makeTarget(index), symbolMeta, isUpdate);
    } else {
      updateAttr(path2, null, {
        scaleX: 0,
        scaleY: 0
      }, symbolMeta, isUpdate, function() {
        bundle.remove(path2);
      });
    }
    index++;
  });
  for (; index < repeatTimes; index++) {
    var path = createPath(symbolMeta);
    path.__pictorialAnimationIndex = index;
    path.__pictorialRepeatTimes = repeatTimes;
    bundle.add(path);
    var target = makeTarget(index);
    updateAttr(path, {
      x: target.x,
      y: target.y,
      scaleX: 0,
      scaleY: 0
    }, {
      scaleX: target.scaleX,
      scaleY: target.scaleY,
      rotation: target.rotation
    }, symbolMeta, isUpdate);
  }
  function makeTarget(index2) {
    var position2 = pathPosition.slice();
    var pxSign = symbolMeta.pxSign;
    var i = index2;
    if (symbolMeta.symbolRepeatDirection === "start" ? pxSign > 0 : pxSign < 0) {
      i = repeatTimes - 1 - index2;
    }
    position2[valueDim.index] = unit * (i - repeatTimes / 2 + 0.5) + pathPosition[valueDim.index];
    return {
      x: position2[0],
      y: position2[1],
      scaleX: symbolMeta.symbolScale[0],
      scaleY: symbolMeta.symbolScale[1],
      rotation: symbolMeta.rotation
    };
  }
}
function createOrUpdateSingleSymbol(bar, opt, symbolMeta, isUpdate) {
  var bundle = bar.__pictorialBundle;
  var mainPath = bar.__pictorialMainPath;
  if (!mainPath) {
    mainPath = bar.__pictorialMainPath = createPath(symbolMeta);
    bundle.add(mainPath);
    updateAttr(mainPath, {
      x: symbolMeta.pathPosition[0],
      y: symbolMeta.pathPosition[1],
      scaleX: 0,
      scaleY: 0,
      rotation: symbolMeta.rotation
    }, {
      scaleX: symbolMeta.symbolScale[0],
      scaleY: symbolMeta.symbolScale[1]
    }, symbolMeta, isUpdate);
  } else {
    updateAttr(mainPath, null, {
      x: symbolMeta.pathPosition[0],
      y: symbolMeta.pathPosition[1],
      scaleX: symbolMeta.symbolScale[0],
      scaleY: symbolMeta.symbolScale[1],
      rotation: symbolMeta.rotation
    }, symbolMeta, isUpdate);
  }
}
function createOrUpdateBarRect(bar, symbolMeta, isUpdate) {
  var rectShape = extend({}, symbolMeta.barRectShape);
  var barRect = bar.__pictorialBarRect;
  if (!barRect) {
    barRect = bar.__pictorialBarRect = new Rect_default({
      z2: 2,
      shape: rectShape,
      silent: true,
      style: {
        stroke: "transparent",
        fill: "transparent",
        lineWidth: 0
      }
    });
    barRect.disableMorphing = true;
    bar.add(barRect);
  } else {
    updateAttr(barRect, null, {
      shape: rectShape
    }, symbolMeta, isUpdate);
  }
}
function createOrUpdateClip(bar, opt, symbolMeta, isUpdate) {
  if (symbolMeta.symbolClip) {
    var clipPath = bar.__pictorialClipPath;
    var clipShape = extend({}, symbolMeta.clipShape);
    var valueDim = opt.valueDim;
    var animationModel = symbolMeta.animationModel;
    var dataIndex = symbolMeta.dataIndex;
    if (clipPath) {
      updateProps(clipPath, {
        shape: clipShape
      }, animationModel, dataIndex);
    } else {
      clipShape[valueDim.wh] = 0;
      clipPath = new Rect_default({
        shape: clipShape
      });
      bar.__pictorialBundle.setClipPath(clipPath);
      bar.__pictorialClipPath = clipPath;
      var target = {};
      target[valueDim.wh] = symbolMeta.clipShape[valueDim.wh];
      graphic_exports[isUpdate ? "updateProps" : "initProps"](clipPath, {
        shape: target
      }, animationModel, dataIndex);
    }
  }
}
function getItemModel(data, dataIndex) {
  var itemModel = data.getItemModel(dataIndex);
  itemModel.getAnimationDelayParams = getAnimationDelayParams;
  itemModel.isAnimationEnabled = isAnimationEnabled;
  return itemModel;
}
function getAnimationDelayParams(path) {
  return {
    index: path.__pictorialAnimationIndex,
    count: path.__pictorialRepeatTimes
  };
}
function isAnimationEnabled() {
  return this.parentModel.isAnimationEnabled() && !!this.getShallow("animation");
}
function createBar(data, opt, symbolMeta, isUpdate) {
  var bar = new Group_default();
  var bundle = new Group_default();
  bar.add(bundle);
  bar.__pictorialBundle = bundle;
  bundle.x = symbolMeta.bundlePosition[0];
  bundle.y = symbolMeta.bundlePosition[1];
  if (symbolMeta.symbolRepeat) {
    createOrUpdateRepeatSymbols(bar, opt, symbolMeta);
  } else {
    createOrUpdateSingleSymbol(bar, opt, symbolMeta);
  }
  createOrUpdateBarRect(bar, symbolMeta, isUpdate);
  createOrUpdateClip(bar, opt, symbolMeta, isUpdate);
  bar.__pictorialShapeStr = getShapeStr(data, symbolMeta);
  bar.__pictorialSymbolMeta = symbolMeta;
  return bar;
}
function updateBar(bar, opt, symbolMeta) {
  var animationModel = symbolMeta.animationModel;
  var dataIndex = symbolMeta.dataIndex;
  var bundle = bar.__pictorialBundle;
  updateProps(bundle, {
    x: symbolMeta.bundlePosition[0],
    y: symbolMeta.bundlePosition[1]
  }, animationModel, dataIndex);
  if (symbolMeta.symbolRepeat) {
    createOrUpdateRepeatSymbols(bar, opt, symbolMeta, true);
  } else {
    createOrUpdateSingleSymbol(bar, opt, symbolMeta, true);
  }
  createOrUpdateBarRect(bar, symbolMeta, true);
  createOrUpdateClip(bar, opt, symbolMeta, true);
}
function removeBar(data, dataIndex, animationModel, bar) {
  var labelRect = bar.__pictorialBarRect;
  labelRect && labelRect.removeTextContent();
  var paths = [];
  eachPath(bar, function(path) {
    paths.push(path);
  });
  bar.__pictorialMainPath && paths.push(bar.__pictorialMainPath);
  bar.__pictorialClipPath && (animationModel = null);
  each(paths, function(path) {
    removeElement(path, {
      scaleX: 0,
      scaleY: 0
    }, animationModel, dataIndex, function() {
      bar.parent && bar.parent.remove(bar);
    });
  });
  data.setItemGraphicEl(dataIndex, null);
}
function getShapeStr(data, symbolMeta) {
  return [data.getItemVisual(symbolMeta.dataIndex, "symbol") || "none", !!symbolMeta.symbolRepeat, !!symbolMeta.symbolClip].join(":");
}
function eachPath(bar, cb, context) {
  each(bar.__pictorialBundle.children(), function(el) {
    el !== bar.__pictorialBarRect && cb.call(context, el);
  });
}
function updateAttr(el, immediateAttrs, animationAttrs, symbolMeta, isUpdate, cb) {
  immediateAttrs && el.attr(immediateAttrs);
  if (symbolMeta.symbolClip && !isUpdate) {
    animationAttrs && el.attr(animationAttrs);
  } else {
    animationAttrs && graphic_exports[isUpdate ? "updateProps" : "initProps"](el, animationAttrs, symbolMeta.animationModel, symbolMeta.dataIndex, cb);
  }
}
function updateCommon(bar, opt, symbolMeta) {
  var dataIndex = symbolMeta.dataIndex;
  var itemModel = symbolMeta.itemModel;
  var emphasisModel = itemModel.getModel("emphasis");
  var emphasisStyle = emphasisModel.getModel("itemStyle").getItemStyle();
  var blurStyle = itemModel.getModel(["blur", "itemStyle"]).getItemStyle();
  var selectStyle = itemModel.getModel(["select", "itemStyle"]).getItemStyle();
  var cursorStyle = itemModel.getShallow("cursor");
  var focus = emphasisModel.get("focus");
  var blurScope = emphasisModel.get("blurScope");
  var hoverScale = emphasisModel.get("scale");
  eachPath(bar, function(path) {
    if (path instanceof Image_default) {
      var pathStyle = path.style;
      path.useStyle(extend({
        // TODO other properties like dx, dy ?
        image: pathStyle.image,
        x: pathStyle.x,
        y: pathStyle.y,
        width: pathStyle.width,
        height: pathStyle.height
      }, symbolMeta.style));
    } else {
      path.useStyle(symbolMeta.style);
    }
    var emphasisState = path.ensureState("emphasis");
    emphasisState.style = emphasisStyle;
    if (hoverScale) {
      emphasisState.scaleX = path.scaleX * 1.1;
      emphasisState.scaleY = path.scaleY * 1.1;
    }
    path.ensureState("blur").style = blurStyle;
    path.ensureState("select").style = selectStyle;
    cursorStyle && (path.cursor = cursorStyle);
    path.z2 = symbolMeta.z2;
  });
  var barPositionOutside = opt.valueDim.posDesc[+(symbolMeta.boundingLength > 0)];
  var barRect = bar.__pictorialBarRect;
  barRect.ignoreClip = true;
  setLabelStyle(barRect, getLabelStatesModels(itemModel), {
    labelFetcher: opt.seriesModel,
    labelDataIndex: dataIndex,
    defaultText: getDefaultLabel(opt.seriesModel.getData(), dataIndex),
    inheritColor: symbolMeta.style.fill,
    defaultOpacity: symbolMeta.style.opacity,
    defaultOutsidePosition: barPositionOutside
  });
  toggleHoverEmphasis(bar, focus, blurScope, emphasisModel.get("disabled"));
}
function toIntTimes(times) {
  var roundedTimes = Math.round(times);
  return Math.abs(times - roundedTimes) < 1e-4 ? roundedTimes : Math.ceil(times);
}
var PictorialBarView_default = PictorialBarView;

// node_modules/echarts/lib/chart/bar/PictorialBarSeries.js
var PictorialBarSeriesModel = (
  /** @class */
  function(_super) {
    __extends(PictorialBarSeriesModel2, _super);
    function PictorialBarSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = PictorialBarSeriesModel2.type;
      _this.hasSymbolVisual = true;
      _this.defaultSymbol = "roundRect";
      return _this;
    }
    PictorialBarSeriesModel2.prototype.getInitialData = function(option) {
      option.stack = null;
      return _super.prototype.getInitialData.apply(this, arguments);
    };
    PictorialBarSeriesModel2.type = "series.pictorialBar";
    PictorialBarSeriesModel2.dependencies = ["grid"];
    PictorialBarSeriesModel2.defaultOption = inheritDefaultOption(BaseBarSeries_default.defaultOption, {
      symbol: "circle",
      symbolSize: null,
      symbolRotate: null,
      symbolPosition: null,
      symbolOffset: null,
      symbolMargin: null,
      symbolRepeat: false,
      symbolRepeatDirection: "end",
      symbolClip: false,
      symbolBoundingData: null,
      symbolPatternSize: 400,
      barGap: "-100%",
      // Pictorial bar do not clip by default because in many cases
      // xAxis and yAxis are not displayed and it's expected not to clip
      clip: false,
      // z can be set in data item, which is z2 actually.
      // Disable progressive
      progressive: 0,
      emphasis: {
        // By default pictorialBar do not hover scale. Hover scale is not suitable
        // for the case that both has foreground and background.
        scale: false
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      }
    });
    return PictorialBarSeriesModel2;
  }(BaseBarSeries_default)
);
var PictorialBarSeries_default = PictorialBarSeriesModel;

// node_modules/echarts/lib/chart/bar/installPictorialBar.js
function install23(registers) {
  registers.registerChartView(PictorialBarView_default);
  registers.registerSeriesModel(PictorialBarSeries_default);
  registers.registerLayout(registers.PRIORITY.VISUAL.LAYOUT, curry(layout, "pictorialBar"));
  registers.registerLayout(registers.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, createProgressiveLayout("pictorialBar"));
}

// node_modules/echarts/lib/chart/themeRiver/ThemeRiverView.js
var ThemeRiverView = (
  /** @class */
  function(_super) {
    __extends(ThemeRiverView2, _super);
    function ThemeRiverView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ThemeRiverView2.type;
      _this._layers = [];
      return _this;
    }
    ThemeRiverView2.prototype.render = function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var self = this;
      var group = this.group;
      var layersSeries = seriesModel.getLayerSeries();
      var layoutInfo = data.getLayout("layoutInfo");
      var rect = layoutInfo.rect;
      var boundaryGap = layoutInfo.boundaryGap;
      group.x = 0;
      group.y = rect.y + boundaryGap[0];
      function keyGetter(item) {
        return item.name;
      }
      var dataDiffer = new DataDiffer_default(this._layersSeries || [], layersSeries, keyGetter, keyGetter);
      var newLayersGroups = [];
      dataDiffer.add(bind(process2, this, "add")).update(bind(process2, this, "update")).remove(bind(process2, this, "remove")).execute();
      function process2(status, idx, oldIdx) {
        var oldLayersGroups = self._layers;
        if (status === "remove") {
          group.remove(oldLayersGroups[idx]);
          return;
        }
        var points0 = [];
        var points1 = [];
        var style;
        var indices = layersSeries[idx].indices;
        var j = 0;
        for (; j < indices.length; j++) {
          var layout2 = data.getItemLayout(indices[j]);
          var x = layout2.x;
          var y0 = layout2.y0;
          var y = layout2.y;
          points0.push(x, y0);
          points1.push(x, y0 + y);
          style = data.getItemVisual(indices[j], "style");
        }
        var polygon;
        var textLayout = data.getItemLayout(indices[0]);
        var labelModel = seriesModel.getModel("label");
        var margin = labelModel.get("margin");
        var emphasisModel = seriesModel.getModel("emphasis");
        if (status === "add") {
          var layerGroup = newLayersGroups[idx] = new Group_default();
          polygon = new ECPolygon({
            shape: {
              points: points0,
              stackedOnPoints: points1,
              smooth: 0.4,
              stackedOnSmooth: 0.4,
              smoothConstraint: false
            },
            z2: 0
          });
          layerGroup.add(polygon);
          group.add(layerGroup);
          if (seriesModel.isAnimationEnabled()) {
            polygon.setClipPath(createGridClipShape3(polygon.getBoundingRect(), seriesModel, function() {
              polygon.removeClipPath();
            }));
          }
        } else {
          var layerGroup = oldLayersGroups[oldIdx];
          polygon = layerGroup.childAt(0);
          group.add(layerGroup);
          newLayersGroups[idx] = layerGroup;
          updateProps(polygon, {
            shape: {
              points: points0,
              stackedOnPoints: points1
            }
          }, seriesModel);
          saveOldStyle(polygon);
        }
        setLabelStyle(polygon, getLabelStatesModels(seriesModel), {
          labelDataIndex: indices[j - 1],
          defaultText: data.getName(indices[j - 1]),
          inheritColor: style.fill
        }, {
          normal: {
            verticalAlign: "middle"
            // align: 'right'
          }
        });
        polygon.setTextConfig({
          position: null,
          local: true
        });
        var labelEl = polygon.getTextContent();
        if (labelEl) {
          labelEl.x = textLayout.x - margin;
          labelEl.y = textLayout.y0 + textLayout.y / 2;
        }
        polygon.useStyle(style);
        data.setItemGraphicEl(idx, polygon);
        setStatesStylesFromModel(polygon, seriesModel);
        toggleHoverEmphasis(polygon, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
      }
      this._layersSeries = layersSeries;
      this._layers = newLayersGroups;
    };
    ThemeRiverView2.type = "themeRiver";
    return ThemeRiverView2;
  }(Chart_default)
);
function createGridClipShape3(rect, seriesModel, cb) {
  var rectEl = new Rect_default({
    shape: {
      x: rect.x - 10,
      y: rect.y - 10,
      width: 0,
      height: rect.height + 20
    }
  });
  initProps(rectEl, {
    shape: {
      x: rect.x - 50,
      width: rect.width + 100,
      height: rect.height + 20
    }
  }, seriesModel, cb);
  return rectEl;
}
var ThemeRiverView_default = ThemeRiverView;

// node_modules/echarts/lib/chart/themeRiver/ThemeRiverSeries.js
var DATA_NAME_INDEX = 2;
var ThemeRiverSeriesModel = (
  /** @class */
  function(_super) {
    __extends(ThemeRiverSeriesModel2, _super);
    function ThemeRiverSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ThemeRiverSeriesModel2.type;
      return _this;
    }
    ThemeRiverSeriesModel2.prototype.init = function(option) {
      _super.prototype.init.apply(this, arguments);
      this.legendVisualProvider = new LegendVisualProvider_default(bind(this.getData, this), bind(this.getRawData, this));
    };
    ThemeRiverSeriesModel2.prototype.fixData = function(data) {
      var rawDataLength = data.length;
      var timeValueKeys = {};
      var groupResult = groupData(data, function(item) {
        if (!timeValueKeys.hasOwnProperty(item[0] + "")) {
          timeValueKeys[item[0] + ""] = -1;
        }
        return item[2];
      });
      var layerData = [];
      groupResult.buckets.each(function(items, key) {
        layerData.push({
          name: key,
          dataList: items
        });
      });
      var layerNum = layerData.length;
      for (var k = 0; k < layerNum; ++k) {
        var name_1 = layerData[k].name;
        for (var j = 0; j < layerData[k].dataList.length; ++j) {
          var timeValue = layerData[k].dataList[j][0] + "";
          timeValueKeys[timeValue] = k;
        }
        for (var timeValue in timeValueKeys) {
          if (timeValueKeys.hasOwnProperty(timeValue) && timeValueKeys[timeValue] !== k) {
            timeValueKeys[timeValue] = k;
            data[rawDataLength] = [timeValue, 0, name_1];
            rawDataLength++;
          }
        }
      }
      return data;
    };
    ThemeRiverSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      var singleAxisModel = this.getReferringComponents("singleAxis", SINGLE_REFERRING).models[0];
      var axisType = singleAxisModel.get("type");
      var filterData = filter(option.data, function(dataItem) {
        return dataItem[2] !== void 0;
      });
      var data = this.fixData(filterData || []);
      var nameList = [];
      var nameMap = this.nameMap = createHashMap();
      var count = 0;
      for (var i = 0; i < data.length; ++i) {
        nameList.push(data[i][DATA_NAME_INDEX]);
        if (!nameMap.get(data[i][DATA_NAME_INDEX])) {
          nameMap.set(data[i][DATA_NAME_INDEX], count);
          count++;
        }
      }
      var dimensions = prepareSeriesDataSchema(data, {
        coordDimensions: ["single"],
        dimensionsDefine: [{
          name: "time",
          type: getDimensionTypeByAxis(axisType)
        }, {
          name: "value",
          type: "float"
        }, {
          name: "name",
          type: "ordinal"
        }],
        encodeDefine: {
          single: 0,
          value: 1,
          itemName: 2
        }
      }).dimensions;
      var list = new SeriesData_default(dimensions, this);
      list.initData(data);
      return list;
    };
    ThemeRiverSeriesModel2.prototype.getLayerSeries = function() {
      var data = this.getData();
      var lenCount = data.count();
      var indexArr = [];
      for (var i = 0; i < lenCount; ++i) {
        indexArr[i] = i;
      }
      var timeDim = data.mapDimension("single");
      var groupResult = groupData(indexArr, function(index) {
        return data.get("name", index);
      });
      var layerSeries = [];
      groupResult.buckets.each(function(items, key) {
        items.sort(function(index1, index2) {
          return data.get(timeDim, index1) - data.get(timeDim, index2);
        });
        layerSeries.push({
          name: key,
          indices: items
        });
      });
      return layerSeries;
    };
    ThemeRiverSeriesModel2.prototype.getAxisTooltipData = function(dim, value, baseAxis) {
      if (!isArray(dim)) {
        dim = dim ? [dim] : [];
      }
      var data = this.getData();
      var layerSeries = this.getLayerSeries();
      var indices = [];
      var layerNum = layerSeries.length;
      var nestestValue;
      for (var i = 0; i < layerNum; ++i) {
        var minDist = Number.MAX_VALUE;
        var nearestIdx = -1;
        var pointNum = layerSeries[i].indices.length;
        for (var j = 0; j < pointNum; ++j) {
          var theValue = data.get(dim[0], layerSeries[i].indices[j]);
          var dist2 = Math.abs(theValue - value);
          if (dist2 <= minDist) {
            nestestValue = theValue;
            minDist = dist2;
            nearestIdx = layerSeries[i].indices[j];
          }
        }
        indices.push(nearestIdx);
      }
      return {
        dataIndices: indices,
        nestestValue
      };
    };
    ThemeRiverSeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      var data = this.getData();
      var name = data.getName(dataIndex);
      var value = data.get(data.mapDimension("value"), dataIndex);
      return createTooltipMarkup("nameValue", {
        name,
        value
      });
    };
    ThemeRiverSeriesModel2.type = "series.themeRiver";
    ThemeRiverSeriesModel2.dependencies = ["singleAxis"];
    ThemeRiverSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      colorBy: "data",
      coordinateSystem: "singleAxis",
      // gap in axis's orthogonal orientation
      boundaryGap: ["10%", "10%"],
      // legendHoverLink: true,
      singleAxisIndex: 0,
      animationEasing: "linear",
      label: {
        margin: 4,
        show: true,
        position: "left",
        fontSize: 11
      },
      emphasis: {
        label: {
          show: true
        }
      }
    };
    return ThemeRiverSeriesModel2;
  }(Series_default)
);
var ThemeRiverSeries_default = ThemeRiverSeriesModel;

// node_modules/echarts/lib/chart/themeRiver/themeRiverLayout.js
function themeRiverLayout(ecModel, api) {
  ecModel.eachSeriesByType("themeRiver", function(seriesModel) {
    var data = seriesModel.getData();
    var single = seriesModel.coordinateSystem;
    var layoutInfo = {};
    var rect = single.getRect();
    layoutInfo.rect = rect;
    var boundaryGap = seriesModel.get("boundaryGap");
    var axis = single.getAxis();
    layoutInfo.boundaryGap = boundaryGap;
    if (axis.orient === "horizontal") {
      boundaryGap[0] = parsePercent2(boundaryGap[0], rect.height);
      boundaryGap[1] = parsePercent2(boundaryGap[1], rect.height);
      var height = rect.height - boundaryGap[0] - boundaryGap[1];
      doThemeRiverLayout(data, seriesModel, height);
    } else {
      boundaryGap[0] = parsePercent2(boundaryGap[0], rect.width);
      boundaryGap[1] = parsePercent2(boundaryGap[1], rect.width);
      var width = rect.width - boundaryGap[0] - boundaryGap[1];
      doThemeRiverLayout(data, seriesModel, width);
    }
    data.setLayout("layoutInfo", layoutInfo);
  });
}
function doThemeRiverLayout(data, seriesModel, height) {
  if (!data.count()) {
    return;
  }
  var coordSys = seriesModel.coordinateSystem;
  var layerSeries = seriesModel.getLayerSeries();
  var timeDim = data.mapDimension("single");
  var valueDim = data.mapDimension("value");
  var layerPoints = map(layerSeries, function(singleLayer) {
    return map(singleLayer.indices, function(idx) {
      var pt = coordSys.dataToPoint(data.get(timeDim, idx));
      pt[1] = data.get(valueDim, idx);
      return pt;
    });
  });
  var base = computeBaseline(layerPoints);
  var baseLine = base.y0;
  var ky = height / base.max;
  var n = layerSeries.length;
  var m = layerSeries[0].indices.length;
  var baseY0;
  for (var j = 0; j < m; ++j) {
    baseY0 = baseLine[j] * ky;
    data.setItemLayout(layerSeries[0].indices[j], {
      layerIndex: 0,
      x: layerPoints[0][j][0],
      y0: baseY0,
      y: layerPoints[0][j][1] * ky
    });
    for (var i = 1; i < n; ++i) {
      baseY0 += layerPoints[i - 1][j][1] * ky;
      data.setItemLayout(layerSeries[i].indices[j], {
        layerIndex: i,
        x: layerPoints[i][j][0],
        y0: baseY0,
        y: layerPoints[i][j][1] * ky
      });
    }
  }
}
function computeBaseline(data) {
  var layerNum = data.length;
  var pointNum = data[0].length;
  var sums = [];
  var y0 = [];
  var max = 0;
  for (var i = 0; i < pointNum; ++i) {
    var temp = 0;
    for (var j = 0; j < layerNum; ++j) {
      temp += data[j][i][1];
    }
    if (temp > max) {
      max = temp;
    }
    sums.push(temp);
  }
  for (var k = 0; k < pointNum; ++k) {
    y0[k] = (max - sums[k]) / 2;
  }
  max = 0;
  for (var l = 0; l < pointNum; ++l) {
    var sum2 = sums[l] + y0[l];
    if (sum2 > max) {
      max = sum2;
    }
  }
  return {
    y0,
    max
  };
}

// node_modules/echarts/lib/chart/themeRiver/install.js
function install24(registers) {
  registers.registerChartView(ThemeRiverView_default);
  registers.registerSeriesModel(ThemeRiverSeries_default);
  registers.registerLayout(themeRiverLayout);
  registers.registerProcessor(dataFilter("themeRiver"));
}

// node_modules/echarts/lib/chart/sunburst/SunburstPiece.js
var DEFAULT_SECTOR_Z = 2;
var DEFAULT_TEXT_Z = 4;
var SunburstPiece = (
  /** @class */
  function(_super) {
    __extends(SunburstPiece2, _super);
    function SunburstPiece2(node, seriesModel, ecModel, api) {
      var _this = _super.call(this) || this;
      _this.z2 = DEFAULT_SECTOR_Z;
      _this.textConfig = {
        inside: true
      };
      getECData(_this).seriesIndex = seriesModel.seriesIndex;
      var text = new Text_default({
        z2: DEFAULT_TEXT_Z,
        silent: node.getModel().get(["label", "silent"])
      });
      _this.setTextContent(text);
      _this.updateData(true, node, seriesModel, ecModel, api);
      return _this;
    }
    SunburstPiece2.prototype.updateData = function(firstCreate, node, seriesModel, ecModel, api) {
      this.node = node;
      node.piece = this;
      seriesModel = seriesModel || this._seriesModel;
      ecModel = ecModel || this._ecModel;
      var sector = this;
      getECData(sector).dataIndex = node.dataIndex;
      var itemModel = node.getModel();
      var emphasisModel = itemModel.getModel("emphasis");
      var layout2 = node.getLayout();
      var sectorShape = extend({}, layout2);
      sectorShape.label = null;
      var normalStyle = node.getVisual("style");
      normalStyle.lineJoin = "bevel";
      var decal = node.getVisual("decal");
      if (decal) {
        normalStyle.decal = createOrUpdatePatternFromDecal(decal, api);
      }
      var cornerRadius = getSectorCornerRadius(itemModel.getModel("itemStyle"), sectorShape, true);
      extend(sectorShape, cornerRadius);
      each(SPECIAL_STATES, function(stateName) {
        var state = sector.ensureState(stateName);
        var itemStyleModel = itemModel.getModel([stateName, "itemStyle"]);
        state.style = itemStyleModel.getItemStyle();
        var cornerRadius2 = getSectorCornerRadius(itemStyleModel, sectorShape);
        if (cornerRadius2) {
          state.shape = cornerRadius2;
        }
      });
      if (firstCreate) {
        sector.setShape(sectorShape);
        sector.shape.r = layout2.r0;
        initProps(sector, {
          shape: {
            r: layout2.r
          }
        }, seriesModel, node.dataIndex);
      } else {
        updateProps(sector, {
          shape: sectorShape
        }, seriesModel);
        saveOldStyle(sector);
      }
      sector.useStyle(normalStyle);
      this._updateLabel(seriesModel);
      var cursorStyle = itemModel.getShallow("cursor");
      cursorStyle && sector.attr("cursor", cursorStyle);
      this._seriesModel = seriesModel || this._seriesModel;
      this._ecModel = ecModel || this._ecModel;
      var focus = emphasisModel.get("focus");
      var focusOrIndices = focus === "relative" ? concatArray(node.getAncestorsIndices(), node.getDescendantIndices()) : focus === "ancestor" ? node.getAncestorsIndices() : focus === "descendant" ? node.getDescendantIndices() : focus;
      toggleHoverEmphasis(this, focusOrIndices, emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
    };
    SunburstPiece2.prototype._updateLabel = function(seriesModel) {
      var _this = this;
      var itemModel = this.node.getModel();
      var normalLabelModel = itemModel.getModel("label");
      var layout2 = this.node.getLayout();
      var angle = layout2.endAngle - layout2.startAngle;
      var midAngle = (layout2.startAngle + layout2.endAngle) / 2;
      var dx = Math.cos(midAngle);
      var dy = Math.sin(midAngle);
      var sector = this;
      var label = sector.getTextContent();
      var dataIndex = this.node.dataIndex;
      var labelMinAngle = normalLabelModel.get("minAngle") / 180 * Math.PI;
      var isNormalShown = normalLabelModel.get("show") && !(labelMinAngle != null && Math.abs(angle) < labelMinAngle);
      label.ignore = !isNormalShown;
      each(DISPLAY_STATES, function(stateName) {
        var labelStateModel = stateName === "normal" ? itemModel.getModel("label") : itemModel.getModel([stateName, "label"]);
        var isNormal = stateName === "normal";
        var state = isNormal ? label : label.ensureState(stateName);
        var text = seriesModel.getFormattedLabel(dataIndex, stateName);
        if (isNormal) {
          text = text || _this.node.name;
        }
        state.style = createTextStyle(labelStateModel, {}, null, stateName !== "normal", true);
        if (text) {
          state.style.text = text;
        }
        var isShown = labelStateModel.get("show");
        if (isShown != null && !isNormal) {
          state.ignore = !isShown;
        }
        var labelPosition = getLabelAttr(labelStateModel, "position");
        var sectorState = isNormal ? sector : sector.states[stateName];
        var labelColor = sectorState.style.fill;
        sectorState.textConfig = {
          outsideFill: labelStateModel.get("color") === "inherit" ? labelColor : null,
          inside: labelPosition !== "outside"
        };
        var r;
        var labelPadding = getLabelAttr(labelStateModel, "distance") || 0;
        var textAlign = getLabelAttr(labelStateModel, "align");
        var rotateType = getLabelAttr(labelStateModel, "rotate");
        var flipStartAngle = Math.PI * 0.5;
        var flipEndAngle = Math.PI * 1.5;
        var midAngleNormal = normalizeRadian(rotateType === "tangential" ? Math.PI / 2 - midAngle : midAngle);
        var needsFlip = midAngleNormal > flipStartAngle && !isRadianAroundZero(midAngleNormal - flipStartAngle) && midAngleNormal < flipEndAngle;
        if (labelPosition === "outside") {
          r = layout2.r + labelPadding;
          textAlign = needsFlip ? "right" : "left";
        } else {
          if (!textAlign || textAlign === "center") {
            if (angle === 2 * Math.PI && layout2.r0 === 0) {
              r = 0;
            } else {
              r = (layout2.r + layout2.r0) / 2;
            }
            textAlign = "center";
          } else if (textAlign === "left") {
            r = layout2.r0 + labelPadding;
            textAlign = needsFlip ? "right" : "left";
          } else if (textAlign === "right") {
            r = layout2.r - labelPadding;
            textAlign = needsFlip ? "left" : "right";
          }
        }
        state.style.align = textAlign;
        state.style.verticalAlign = getLabelAttr(labelStateModel, "verticalAlign") || "middle";
        state.x = r * dx + layout2.cx;
        state.y = r * dy + layout2.cy;
        var rotate = 0;
        if (rotateType === "radial") {
          rotate = normalizeRadian(-midAngle) + (needsFlip ? Math.PI : 0);
        } else if (rotateType === "tangential") {
          rotate = normalizeRadian(Math.PI / 2 - midAngle) + (needsFlip ? Math.PI : 0);
        } else if (isNumber(rotateType)) {
          rotate = rotateType * Math.PI / 180;
        }
        state.rotation = normalizeRadian(rotate);
      });
      function getLabelAttr(model, name) {
        var stateAttr = model.get(name);
        if (stateAttr == null) {
          return normalLabelModel.get(name);
        }
        return stateAttr;
      }
      label.dirtyStyle();
    };
    return SunburstPiece2;
  }(Sector_default)
);
var SunburstPiece_default = SunburstPiece;

// node_modules/echarts/lib/chart/sunburst/sunburstAction.js
var ROOT_TO_NODE_ACTION = "sunburstRootToNode";
var HIGHLIGHT_ACTION = "sunburstHighlight";
var UNHIGHLIGHT_ACTION = "sunburstUnhighlight";
function installSunburstAction(registers) {
  registers.registerAction({
    type: ROOT_TO_NODE_ACTION,
    update: "updateView"
  }, function(payload, ecModel) {
    ecModel.eachComponent({
      mainType: "series",
      subType: "sunburst",
      query: payload
    }, handleRootToNode);
    function handleRootToNode(model, index) {
      var targetInfo = retrieveTargetInfo(payload, [ROOT_TO_NODE_ACTION], model);
      if (targetInfo) {
        var originViewRoot = model.getViewRoot();
        if (originViewRoot) {
          payload.direction = aboveViewRoot(originViewRoot, targetInfo.node) ? "rollUp" : "drillDown";
        }
        model.resetViewRoot(targetInfo.node);
      }
    }
  });
  registers.registerAction({
    type: HIGHLIGHT_ACTION,
    update: "none"
  }, function(payload, ecModel, api) {
    payload = extend({}, payload);
    ecModel.eachComponent({
      mainType: "series",
      subType: "sunburst",
      query: payload
    }, handleHighlight);
    function handleHighlight(model) {
      var targetInfo = retrieveTargetInfo(payload, [HIGHLIGHT_ACTION], model);
      if (targetInfo) {
        payload.dataIndex = targetInfo.node.dataIndex;
      }
    }
    if (true) {
      deprecateReplaceLog("sunburstHighlight", "highlight");
    }
    api.dispatchAction(extend(payload, {
      type: "highlight"
    }));
  });
  registers.registerAction({
    type: UNHIGHLIGHT_ACTION,
    update: "updateView"
  }, function(payload, ecModel, api) {
    payload = extend({}, payload);
    if (true) {
      deprecateReplaceLog("sunburstUnhighlight", "downplay");
    }
    api.dispatchAction(extend(payload, {
      type: "downplay"
    }));
  });
}

// node_modules/echarts/lib/chart/sunburst/SunburstView.js
var SunburstView = (
  /** @class */
  function(_super) {
    __extends(SunburstView2, _super);
    function SunburstView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = SunburstView2.type;
      return _this;
    }
    SunburstView2.prototype.render = function(seriesModel, ecModel, api, payload) {
      var self = this;
      this.seriesModel = seriesModel;
      this.api = api;
      this.ecModel = ecModel;
      var data = seriesModel.getData();
      var virtualRoot = data.tree.root;
      var newRoot = seriesModel.getViewRoot();
      var group = this.group;
      var renderLabelForZeroData = seriesModel.get("renderLabelForZeroData");
      var newChildren = [];
      newRoot.eachNode(function(node) {
        newChildren.push(node);
      });
      var oldChildren = this._oldChildren || [];
      dualTravel(newChildren, oldChildren);
      renderRollUp(virtualRoot, newRoot);
      this._initEvents();
      this._oldChildren = newChildren;
      function dualTravel(newChildren2, oldChildren2) {
        if (newChildren2.length === 0 && oldChildren2.length === 0) {
          return;
        }
        new DataDiffer_default(oldChildren2, newChildren2, getKey2, getKey2).add(processNode).update(processNode).remove(curry(processNode, null)).execute();
        function getKey2(node) {
          return node.getId();
        }
        function processNode(newIdx, oldIdx) {
          var newNode = newIdx == null ? null : newChildren2[newIdx];
          var oldNode = oldIdx == null ? null : oldChildren2[oldIdx];
          doRenderNode(newNode, oldNode);
        }
      }
      function doRenderNode(newNode, oldNode) {
        if (!renderLabelForZeroData && newNode && !newNode.getValue()) {
          newNode = null;
        }
        if (newNode !== virtualRoot && oldNode !== virtualRoot) {
          if (oldNode && oldNode.piece) {
            if (newNode) {
              oldNode.piece.updateData(false, newNode, seriesModel, ecModel, api);
              data.setItemGraphicEl(newNode.dataIndex, oldNode.piece);
            } else {
              removeNode2(oldNode);
            }
          } else if (newNode) {
            var piece = new SunburstPiece_default(newNode, seriesModel, ecModel, api);
            group.add(piece);
            data.setItemGraphicEl(newNode.dataIndex, piece);
          }
        }
      }
      function removeNode2(node) {
        if (!node) {
          return;
        }
        if (node.piece) {
          group.remove(node.piece);
          node.piece = null;
        }
      }
      function renderRollUp(virtualRoot2, viewRoot) {
        if (viewRoot.depth > 0) {
          if (self.virtualPiece) {
            self.virtualPiece.updateData(false, virtualRoot2, seriesModel, ecModel, api);
          } else {
            self.virtualPiece = new SunburstPiece_default(virtualRoot2, seriesModel, ecModel, api);
            group.add(self.virtualPiece);
          }
          viewRoot.piece.off("click");
          self.virtualPiece.on("click", function(e) {
            self._rootToNode(viewRoot.parentNode);
          });
        } else if (self.virtualPiece) {
          group.remove(self.virtualPiece);
          self.virtualPiece = null;
        }
      }
    };
    SunburstView2.prototype._initEvents = function() {
      var _this = this;
      this.group.off("click");
      this.group.on("click", function(e) {
        var targetFound = false;
        var viewRoot = _this.seriesModel.getViewRoot();
        viewRoot.eachNode(function(node) {
          if (!targetFound && node.piece && node.piece === e.target) {
            var nodeClick = node.getModel().get("nodeClick");
            if (nodeClick === "rootToNode") {
              _this._rootToNode(node);
            } else if (nodeClick === "link") {
              var itemModel = node.getModel();
              var link = itemModel.get("link");
              if (link) {
                var linkTarget = itemModel.get("target", true) || "_blank";
                windowOpen(link, linkTarget);
              }
            }
            targetFound = true;
          }
        });
      });
    };
    SunburstView2.prototype._rootToNode = function(node) {
      if (node !== this.seriesModel.getViewRoot()) {
        this.api.dispatchAction({
          type: ROOT_TO_NODE_ACTION,
          from: this.uid,
          seriesId: this.seriesModel.id,
          targetNode: node
        });
      }
    };
    SunburstView2.prototype.containPoint = function(point, seriesModel) {
      var treeRoot = seriesModel.getData();
      var itemLayout = treeRoot.getItemLayout(0);
      if (itemLayout) {
        var dx = point[0] - itemLayout.cx;
        var dy = point[1] - itemLayout.cy;
        var radius = Math.sqrt(dx * dx + dy * dy);
        return radius <= itemLayout.r && radius >= itemLayout.r0;
      }
    };
    SunburstView2.type = "sunburst";
    return SunburstView2;
  }(Chart_default)
);
var SunburstView_default = SunburstView;

// node_modules/echarts/lib/chart/sunburst/SunburstSeries.js
var SunburstSeriesModel = (
  /** @class */
  function(_super) {
    __extends(SunburstSeriesModel2, _super);
    function SunburstSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = SunburstSeriesModel2.type;
      _this.ignoreStyleOnData = true;
      return _this;
    }
    SunburstSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      var root = {
        name: option.name,
        children: option.data
      };
      completeTreeValue2(root);
      var levelModels = this._levelModels = map(option.levels || [], function(levelDefine) {
        return new Model_default(levelDefine, this, ecModel);
      }, this);
      var tree = Tree_default.createTree(root, this, beforeLink);
      function beforeLink(nodeData) {
        nodeData.wrapMethod("getItemModel", function(model, idx) {
          var node = tree.getNodeByDataIndex(idx);
          var levelModel = levelModels[node.depth];
          levelModel && (model.parentModel = levelModel);
          return model;
        });
      }
      return tree.data;
    };
    SunburstSeriesModel2.prototype.optionUpdated = function() {
      this.resetViewRoot();
    };
    SunburstSeriesModel2.prototype.getDataParams = function(dataIndex) {
      var params = _super.prototype.getDataParams.apply(this, arguments);
      var node = this.getData().tree.getNodeByDataIndex(dataIndex);
      params.treePathInfo = wrapTreePathInfo(node, this);
      return params;
    };
    SunburstSeriesModel2.prototype.getLevelModel = function(node) {
      return this._levelModels && this._levelModels[node.depth];
    };
    SunburstSeriesModel2.prototype.getViewRoot = function() {
      return this._viewRoot;
    };
    SunburstSeriesModel2.prototype.resetViewRoot = function(viewRoot) {
      viewRoot ? this._viewRoot = viewRoot : viewRoot = this._viewRoot;
      var root = this.getRawData().tree.root;
      if (!viewRoot || viewRoot !== root && !root.contains(viewRoot)) {
        this._viewRoot = root;
      }
    };
    SunburstSeriesModel2.prototype.enableAriaDecal = function() {
      enableAriaDecalForTree(this);
    };
    SunburstSeriesModel2.type = "series.sunburst";
    SunburstSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 2,
      // 默认全局居中
      center: ["50%", "50%"],
      radius: [0, "75%"],
      // 默认顺时针
      clockwise: true,
      startAngle: 90,
      // 最小角度改为0
      minAngle: 0,
      // If still show when all data zero.
      stillShowZeroSum: true,
      // 'rootToNode', 'link', or false
      nodeClick: "rootToNode",
      renderLabelForZeroData: false,
      label: {
        // could be: 'radial', 'tangential', or 'none'
        rotate: "radial",
        show: true,
        opacity: 1,
        // 'left' is for inner side of inside, and 'right' is for outer
        // side for inside
        align: "center",
        position: "inside",
        distance: 5,
        silent: true
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: "white",
        borderType: "solid",
        shadowBlur: 0,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1
      },
      emphasis: {
        focus: "descendant"
      },
      blur: {
        itemStyle: {
          opacity: 0.2
        },
        label: {
          opacity: 0.1
        }
      },
      // Animation type can be expansion, scale.
      animationType: "expansion",
      animationDuration: 1e3,
      animationDurationUpdate: 500,
      data: [],
      /**
       * Sort order.
       *
       * Valid values: 'desc', 'asc', null, or callback function.
       * 'desc' and 'asc' for descend and ascendant order;
       * null for not sorting;
       * example of callback function:
       * function(nodeA, nodeB) {
       *     return nodeA.getValue() - nodeB.getValue();
       * }
       */
      sort: "desc"
    };
    return SunburstSeriesModel2;
  }(Series_default)
);
function completeTreeValue2(dataNode) {
  var sum2 = 0;
  each(dataNode.children, function(child) {
    completeTreeValue2(child);
    var childValue = child.value;
    isArray(childValue) && (childValue = childValue[0]);
    sum2 += childValue;
  });
  var thisValue = dataNode.value;
  if (isArray(thisValue)) {
    thisValue = thisValue[0];
  }
  if (thisValue == null || isNaN(thisValue)) {
    thisValue = sum2;
  }
  if (thisValue < 0) {
    thisValue = 0;
  }
  isArray(dataNode.value) ? dataNode.value[0] = thisValue : dataNode.value = thisValue;
}
var SunburstSeries_default = SunburstSeriesModel;

// node_modules/echarts/lib/chart/sunburst/sunburstLayout.js
var RADIAN3 = Math.PI / 180;
function sunburstLayout(seriesType, ecModel, api) {
  ecModel.eachSeriesByType(seriesType, function(seriesModel) {
    var center2 = seriesModel.get("center");
    var radius = seriesModel.get("radius");
    if (!isArray(radius)) {
      radius = [0, radius];
    }
    if (!isArray(center2)) {
      center2 = [center2, center2];
    }
    var width = api.getWidth();
    var height = api.getHeight();
    var size = Math.min(width, height);
    var cx = parsePercent2(center2[0], width);
    var cy = parsePercent2(center2[1], height);
    var r0 = parsePercent2(radius[0], size / 2);
    var r = parsePercent2(radius[1], size / 2);
    var startAngle = -seriesModel.get("startAngle") * RADIAN3;
    var minAngle = seriesModel.get("minAngle") * RADIAN3;
    var virtualRoot = seriesModel.getData().tree.root;
    var treeRoot = seriesModel.getViewRoot();
    var rootDepth = treeRoot.depth;
    var sort3 = seriesModel.get("sort");
    if (sort3 != null) {
      initChildren2(treeRoot, sort3);
    }
    var validDataCount = 0;
    each(treeRoot.children, function(child) {
      !isNaN(child.getValue()) && validDataCount++;
    });
    var sum2 = treeRoot.getValue();
    var unitRadian = Math.PI / (sum2 || validDataCount) * 2;
    var renderRollupNode = treeRoot.depth > 0;
    var levels = treeRoot.height - (renderRollupNode ? -1 : 1);
    var rPerLevel = (r - r0) / (levels || 1);
    var clockwise = seriesModel.get("clockwise");
    var stillShowZeroSum = seriesModel.get("stillShowZeroSum");
    var dir = clockwise ? 1 : -1;
    var renderNode2 = function(node, startAngle2) {
      if (!node) {
        return;
      }
      var endAngle = startAngle2;
      if (node !== virtualRoot) {
        var value = node.getValue();
        var angle2 = sum2 === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;
        if (angle2 < minAngle) {
          angle2 = minAngle;
        }
        endAngle = startAngle2 + dir * angle2;
        var depth = node.depth - rootDepth - (renderRollupNode ? -1 : 1);
        var rStart2 = r0 + rPerLevel * depth;
        var rEnd2 = r0 + rPerLevel * (depth + 1);
        var levelModel = seriesModel.getLevelModel(node);
        if (levelModel) {
          var r0_1 = levelModel.get("r0", true);
          var r_1 = levelModel.get("r", true);
          var radius_1 = levelModel.get("radius", true);
          if (radius_1 != null) {
            r0_1 = radius_1[0];
            r_1 = radius_1[1];
          }
          r0_1 != null && (rStart2 = parsePercent2(r0_1, size / 2));
          r_1 != null && (rEnd2 = parsePercent2(r_1, size / 2));
        }
        node.setLayout({
          angle: angle2,
          startAngle: startAngle2,
          endAngle,
          clockwise,
          cx,
          cy,
          r0: rStart2,
          r: rEnd2
        });
      }
      if (node.children && node.children.length) {
        var siblingAngle_1 = 0;
        each(node.children, function(node2) {
          siblingAngle_1 += renderNode2(node2, startAngle2 + siblingAngle_1);
        });
      }
      return endAngle - startAngle2;
    };
    if (renderRollupNode) {
      var rStart = r0;
      var rEnd = r0 + rPerLevel;
      var angle = Math.PI * 2;
      virtualRoot.setLayout({
        angle,
        startAngle,
        endAngle: startAngle + angle,
        clockwise,
        cx,
        cy,
        r0: rStart,
        r: rEnd
      });
    }
    renderNode2(treeRoot, startAngle);
  });
}
function initChildren2(node, sortOrder) {
  var children = node.children || [];
  node.children = sort2(children, sortOrder);
  if (children.length) {
    each(node.children, function(child) {
      initChildren2(child, sortOrder);
    });
  }
}
function sort2(children, sortOrder) {
  if (isFunction(sortOrder)) {
    var sortTargets = map(children, function(child, idx) {
      var value = child.getValue();
      return {
        params: {
          depth: child.depth,
          height: child.height,
          dataIndex: child.dataIndex,
          getValue: function() {
            return value;
          }
        },
        index: idx
      };
    });
    sortTargets.sort(function(a, b) {
      return sortOrder(a.params, b.params);
    });
    return map(sortTargets, function(target) {
      return children[target.index];
    });
  } else {
    var isAsc_1 = sortOrder === "asc";
    return children.sort(function(a, b) {
      var diff = (a.getValue() - b.getValue()) * (isAsc_1 ? 1 : -1);
      return diff === 0 ? (a.dataIndex - b.dataIndex) * (isAsc_1 ? -1 : 1) : diff;
    });
  }
}

// node_modules/echarts/lib/chart/sunburst/sunburstVisual.js
function sunburstVisual(ecModel) {
  var paletteScope = {};
  function pickColor(node, seriesModel, treeHeight) {
    var current = node;
    while (current && current.depth > 1) {
      current = current.parentNode;
    }
    var color = seriesModel.getColorFromPalette(current.name || current.dataIndex + "", paletteScope);
    if (node.depth > 1 && isString(color)) {
      color = lift(color, (node.depth - 1) / (treeHeight - 1) * 0.5);
    }
    return color;
  }
  ecModel.eachSeriesByType("sunburst", function(seriesModel) {
    var data = seriesModel.getData();
    var tree = data.tree;
    tree.eachNode(function(node) {
      var model = node.getModel();
      var style = model.getModel("itemStyle").getItemStyle();
      if (!style.fill) {
        style.fill = pickColor(node, seriesModel, tree.root.height);
      }
      var existsStyle = data.ensureUniqueItemVisual(node.dataIndex, "style");
      extend(existsStyle, style);
    });
  });
}

// node_modules/echarts/lib/chart/sunburst/install.js
function install25(registers) {
  registers.registerChartView(SunburstView_default);
  registers.registerSeriesModel(SunburstSeries_default);
  registers.registerLayout(curry(sunburstLayout, "sunburst"));
  registers.registerProcessor(curry(dataFilter, "sunburst"));
  registers.registerVisual(sunburstVisual);
  installSunburstAction(registers);
}

// node_modules/echarts/lib/chart/custom/CustomSeries.js
var STYLE_VISUAL_TYPE = {
  color: "fill",
  borderColor: "stroke"
};
var NON_STYLE_VISUAL_PROPS = {
  symbol: 1,
  symbolSize: 1,
  symbolKeepAspect: 1,
  legendIcon: 1,
  visualMeta: 1,
  liftZ: 1,
  decal: 1
};
var customInnerStore = makeInner();
var CustomSeriesModel = (
  /** @class */
  function(_super) {
    __extends(CustomSeriesModel2, _super);
    function CustomSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = CustomSeriesModel2.type;
      return _this;
    }
    CustomSeriesModel2.prototype.optionUpdated = function() {
      this.currentZLevel = this.get("zlevel", true);
      this.currentZ = this.get("z", true);
    };
    CustomSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return createSeriesData_default(null, this);
    };
    CustomSeriesModel2.prototype.getDataParams = function(dataIndex, dataType, el) {
      var params = _super.prototype.getDataParams.call(this, dataIndex, dataType);
      el && (params.info = customInnerStore(el).info);
      return params;
    };
    CustomSeriesModel2.type = "series.custom";
    CustomSeriesModel2.dependencies = ["grid", "polar", "geo", "singleAxis", "calendar"];
    CustomSeriesModel2.defaultOption = {
      coordinateSystem: "cartesian2d",
      // zlevel: 0,
      z: 2,
      legendHoverLink: true,
      // Custom series will not clip by default.
      // Some case will use custom series to draw label
      // For example https://echarts.apache.org/examples/en/editor.html?c=custom-gantt-flight
      clip: false
      // Cartesian coordinate system
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      // Polar coordinate system
      // polarIndex: 0,
      // Geo coordinate system
      // geoIndex: 0,
    };
    return CustomSeriesModel2;
  }(Series_default)
);
var CustomSeries_default = CustomSeriesModel;

// node_modules/echarts/lib/coord/cartesian/prepareCustom.js
function dataToCoordSize(dataSize, dataItem) {
  dataItem = dataItem || [0, 0];
  return map(["x", "y"], function(dim, dimIdx) {
    var axis = this.getAxis(dim);
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    return axis.type === "category" ? axis.getBandWidth() : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
  }, this);
}
function cartesianPrepareCustom(coordSys) {
  var rect = coordSys.master.getRect();
  return {
    coordSys: {
      // The name exposed to user is always 'cartesian2d' but not 'grid'.
      type: "cartesian2d",
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: function(data) {
        return coordSys.dataToPoint(data);
      },
      size: bind(dataToCoordSize, coordSys)
    }
  };
}

// node_modules/echarts/lib/coord/geo/prepareCustom.js
function dataToCoordSize2(dataSize, dataItem) {
  dataItem = dataItem || [0, 0];
  return map([0, 1], function(dimIdx) {
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    var p1 = [];
    var p2 = [];
    p1[dimIdx] = val - halfSize;
    p2[dimIdx] = val + halfSize;
    p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
    return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
  }, this);
}
function geoPrepareCustom(coordSys) {
  var rect = coordSys.getBoundingRect();
  return {
    coordSys: {
      type: "geo",
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      zoom: coordSys.getZoom()
    },
    api: {
      coord: function(data) {
        return coordSys.dataToPoint(data);
      },
      size: bind(dataToCoordSize2, coordSys)
    }
  };
}

// node_modules/echarts/lib/coord/single/prepareCustom.js
function dataToCoordSize3(dataSize, dataItem) {
  var axis = this.getAxis();
  var val = dataItem instanceof Array ? dataItem[0] : dataItem;
  var halfSize = (dataSize instanceof Array ? dataSize[0] : dataSize) / 2;
  return axis.type === "category" ? axis.getBandWidth() : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
}
function singlePrepareCustom(coordSys) {
  var rect = coordSys.getRect();
  return {
    coordSys: {
      type: "singleAxis",
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: function(val) {
        return coordSys.dataToPoint(val);
      },
      size: bind(dataToCoordSize3, coordSys)
    }
  };
}

// node_modules/echarts/lib/coord/polar/prepareCustom.js
function dataToCoordSize4(dataSize, dataItem) {
  dataItem = dataItem || [0, 0];
  return map(["Radius", "Angle"], function(dim, dimIdx) {
    var getterName = "get" + dim + "Axis";
    var axis = this[getterName]();
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    var result = axis.type === "category" ? axis.getBandWidth() : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
    if (dim === "Angle") {
      result = result * Math.PI / 180;
    }
    return result;
  }, this);
}
function polarPrepareCustom(coordSys) {
  var radiusAxis = coordSys.getRadiusAxis();
  var angleAxis = coordSys.getAngleAxis();
  var radius = radiusAxis.getExtent();
  radius[0] > radius[1] && radius.reverse();
  return {
    coordSys: {
      type: "polar",
      cx: coordSys.cx,
      cy: coordSys.cy,
      r: radius[1],
      r0: radius[0]
    },
    api: {
      coord: function(data) {
        var radius2 = radiusAxis.dataToRadius(data[0]);
        var angle = angleAxis.dataToAngle(data[1]);
        var coord = coordSys.coordToPoint([radius2, angle]);
        coord.push(radius2, angle * Math.PI / 180);
        return coord;
      },
      size: bind(dataToCoordSize4, coordSys)
    }
  };
}

// node_modules/echarts/lib/coord/calendar/prepareCustom.js
function calendarPrepareCustom(coordSys) {
  var rect = coordSys.getRect();
  var rangeInfo = coordSys.getRangeInfo();
  return {
    coordSys: {
      type: "calendar",
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      cellWidth: coordSys.getCellWidth(),
      cellHeight: coordSys.getCellHeight(),
      rangeInfo: {
        start: rangeInfo.start,
        end: rangeInfo.end,
        weeks: rangeInfo.weeks,
        dayCount: rangeInfo.allDay
      }
    },
    api: {
      coord: function(data, clamp) {
        return coordSys.dataToPoint(data, clamp);
      }
    }
  };
}

// node_modules/echarts/lib/chart/custom/CustomView.js
var EMPHASIS = "emphasis";
var NORMAL = "normal";
var BLUR = "blur";
var SELECT = "select";
var STATES = [NORMAL, EMPHASIS, BLUR, SELECT];
var PATH_ITEM_STYLE = {
  normal: ["itemStyle"],
  emphasis: [EMPHASIS, "itemStyle"],
  blur: [BLUR, "itemStyle"],
  select: [SELECT, "itemStyle"]
};
var PATH_LABEL = {
  normal: ["label"],
  emphasis: [EMPHASIS, "label"],
  blur: [BLUR, "label"],
  select: [SELECT, "label"]
};
var DEFAULT_TRANSITION = ["x", "y"];
var GROUP_DIFF_PREFIX = "e\0\0";
var attachedTxInfoTmp = {
  normal: {},
  emphasis: {},
  blur: {},
  select: {}
};
var prepareCustoms = {
  cartesian2d: cartesianPrepareCustom,
  geo: geoPrepareCustom,
  single: singlePrepareCustom,
  polar: polarPrepareCustom,
  calendar: calendarPrepareCustom
};
function isPath(el) {
  return el instanceof Path_default;
}
function isDisplayable(el) {
  return el instanceof Displayable_default;
}
function copyElement(sourceEl, targetEl) {
  targetEl.copyTransform(sourceEl);
  if (isDisplayable(targetEl) && isDisplayable(sourceEl)) {
    targetEl.setStyle(sourceEl.style);
    targetEl.z = sourceEl.z;
    targetEl.z2 = sourceEl.z2;
    targetEl.zlevel = sourceEl.zlevel;
    targetEl.invisible = sourceEl.invisible;
    targetEl.ignore = sourceEl.ignore;
    if (isPath(targetEl) && isPath(sourceEl)) {
      targetEl.setShape(sourceEl.shape);
    }
  }
}
var CustomChartView = (
  /** @class */
  function(_super) {
    __extends(CustomChartView2, _super);
    function CustomChartView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = CustomChartView2.type;
      return _this;
    }
    CustomChartView2.prototype.render = function(customSeries, ecModel, api, payload) {
      this._progressiveEls = null;
      var oldData = this._data;
      var data = customSeries.getData();
      var group = this.group;
      var renderItem = makeRenderItem(customSeries, data, ecModel, api);
      if (!oldData) {
        group.removeAll();
      }
      data.diff(oldData).add(function(newIdx) {
        createOrUpdateItem(api, null, newIdx, renderItem(newIdx, payload), customSeries, group, data);
      }).remove(function(oldIdx) {
        var el = oldData.getItemGraphicEl(oldIdx);
        el && applyLeaveTransition(el, customInnerStore(el).option, customSeries);
      }).update(function(newIdx, oldIdx) {
        var oldEl = oldData.getItemGraphicEl(oldIdx);
        createOrUpdateItem(api, oldEl, newIdx, renderItem(newIdx, payload), customSeries, group, data);
      }).execute();
      var clipPath = customSeries.get("clip", true) ? createClipPath(customSeries.coordinateSystem, false, customSeries) : null;
      if (clipPath) {
        group.setClipPath(clipPath);
      } else {
        group.removeClipPath();
      }
      this._data = data;
    };
    CustomChartView2.prototype.incrementalPrepareRender = function(customSeries, ecModel, api) {
      this.group.removeAll();
      this._data = null;
    };
    CustomChartView2.prototype.incrementalRender = function(params, customSeries, ecModel, api, payload) {
      var data = customSeries.getData();
      var renderItem = makeRenderItem(customSeries, data, ecModel, api);
      var progressiveEls = this._progressiveEls = [];
      function setIncrementalAndHoverLayer(el2) {
        if (!el2.isGroup) {
          el2.incremental = true;
          el2.ensureState("emphasis").hoverLayer = true;
        }
      }
      for (var idx = params.start; idx < params.end; idx++) {
        var el = createOrUpdateItem(null, null, idx, renderItem(idx, payload), customSeries, this.group, data);
        if (el) {
          el.traverse(setIncrementalAndHoverLayer);
          progressiveEls.push(el);
        }
      }
    };
    CustomChartView2.prototype.eachRendered = function(cb) {
      traverseElements(this._progressiveEls || this.group, cb);
    };
    CustomChartView2.prototype.filterForExposedEvent = function(eventType, query, targetEl, packedEvent) {
      var elementName = query.element;
      if (elementName == null || targetEl.name === elementName) {
        return true;
      }
      while ((targetEl = targetEl.__hostTarget || targetEl.parent) && targetEl !== this.group) {
        if (targetEl.name === elementName) {
          return true;
        }
      }
      return false;
    };
    CustomChartView2.type = "custom";
    return CustomChartView2;
  }(Chart_default)
);
var CustomView_default = CustomChartView;
function createEl(elOption) {
  var graphicType = elOption.type;
  var el;
  if (graphicType === "path") {
    var shape = elOption.shape;
    var pathRect = shape.width != null && shape.height != null ? {
      x: shape.x || 0,
      y: shape.y || 0,
      width: shape.width,
      height: shape.height
    } : null;
    var pathData = getPathData(shape);
    el = makePath(pathData, null, pathRect, shape.layout || "center");
    customInnerStore(el).customPathData = pathData;
  } else if (graphicType === "image") {
    el = new Image_default({});
    customInnerStore(el).customImagePath = elOption.style.image;
  } else if (graphicType === "text") {
    el = new Text_default({});
  } else if (graphicType === "group") {
    el = new Group_default();
  } else if (graphicType === "compoundPath") {
    throw new Error('"compoundPath" is not supported yet.');
  } else {
    var Clz = getShapeClass(graphicType);
    if (!Clz) {
      var errMsg = "";
      if (true) {
        errMsg = 'graphic type "' + graphicType + '" can not be found.';
      }
      throwError(errMsg);
    }
    el = new Clz();
  }
  customInnerStore(el).customGraphicType = graphicType;
  el.name = elOption.name;
  el.z2EmphasisLift = 1;
  el.z2SelectLift = 1;
  return el;
}
function updateElNormal(api, el, dataIndex, elOption, attachedTxInfo, seriesModel, isInit) {
  stopPreviousKeyframeAnimationAndRestore(el);
  var txCfgOpt = attachedTxInfo && attachedTxInfo.normal.cfg;
  if (txCfgOpt) {
    el.setTextConfig(txCfgOpt);
  }
  if (elOption && elOption.transition == null) {
    elOption.transition = DEFAULT_TRANSITION;
  }
  var styleOpt = elOption && elOption.style;
  if (styleOpt) {
    if (el.type === "text") {
      var textOptionStyle = styleOpt;
      hasOwn(textOptionStyle, "textFill") && (textOptionStyle.fill = textOptionStyle.textFill);
      hasOwn(textOptionStyle, "textStroke") && (textOptionStyle.stroke = textOptionStyle.textStroke);
    }
    var decalPattern = void 0;
    var decalObj = isPath(el) ? styleOpt.decal : null;
    if (api && decalObj) {
      decalObj.dirty = true;
      decalPattern = createOrUpdatePatternFromDecal(decalObj, api);
    }
    styleOpt.__decalPattern = decalPattern;
  }
  if (isDisplayable(el)) {
    if (styleOpt) {
      var decalPattern = styleOpt.__decalPattern;
      if (decalPattern) {
        styleOpt.decal = decalPattern;
      }
    }
  }
  applyUpdateTransition(el, elOption, seriesModel, {
    dataIndex,
    isInit,
    clearStyle: true
  });
  applyKeyframeAnimation(el, elOption.keyframeAnimation, seriesModel);
}
function updateElOnState(state, el, elStateOpt, styleOpt, attachedTxInfo) {
  var elDisplayable = el.isGroup ? null : el;
  var txCfgOpt = attachedTxInfo && attachedTxInfo[state].cfg;
  if (elDisplayable) {
    var stateObj = elDisplayable.ensureState(state);
    if (styleOpt === false) {
      var existingEmphasisState = elDisplayable.getState(state);
      if (existingEmphasisState) {
        existingEmphasisState.style = null;
      }
    } else {
      stateObj.style = styleOpt || null;
    }
    if (txCfgOpt) {
      stateObj.textConfig = txCfgOpt;
    }
    setDefaultStateProxy(elDisplayable);
  }
}
function updateZ(el, elOption, seriesModel) {
  if (el.isGroup) {
    return;
  }
  var elDisplayable = el;
  var currentZ = seriesModel.currentZ;
  var currentZLevel = seriesModel.currentZLevel;
  elDisplayable.z = currentZ;
  elDisplayable.zlevel = currentZLevel;
  var optZ2 = elOption.z2;
  optZ2 != null && (elDisplayable.z2 = optZ2 || 0);
  for (var i = 0; i < STATES.length; i++) {
    updateZForEachState(elDisplayable, elOption, STATES[i]);
  }
}
function updateZForEachState(elDisplayable, elOption, state) {
  var isNormal = state === NORMAL;
  var elStateOpt = isNormal ? elOption : retrieveStateOption(elOption, state);
  var optZ2 = elStateOpt ? elStateOpt.z2 : null;
  var stateObj;
  if (optZ2 != null) {
    stateObj = isNormal ? elDisplayable : elDisplayable.ensureState(state);
    stateObj.z2 = optZ2 || 0;
  }
}
function makeRenderItem(customSeries, data, ecModel, api) {
  var renderItem = customSeries.get("renderItem");
  var coordSys = customSeries.coordinateSystem;
  var prepareResult = {};
  if (coordSys) {
    if (true) {
      assert(renderItem, "series.render is required.");
      assert(coordSys.prepareCustoms || prepareCustoms[coordSys.type], "This coordSys does not support custom series.");
    }
    prepareResult = coordSys.prepareCustoms ? coordSys.prepareCustoms(coordSys) : prepareCustoms[coordSys.type](coordSys);
  }
  var userAPI = defaults({
    getWidth: api.getWidth,
    getHeight: api.getHeight,
    getZr: api.getZr,
    getDevicePixelRatio: api.getDevicePixelRatio,
    value,
    style,
    ordinalRawValue,
    styleEmphasis,
    visual,
    barLayout,
    currentSeriesIndices,
    font
  }, prepareResult.api || {});
  var userParams = {
    // The life cycle of context: current round of rendering.
    // The global life cycle is probably not necessary, because
    // user can store global status by themselves.
    context: {},
    seriesId: customSeries.id,
    seriesName: customSeries.name,
    seriesIndex: customSeries.seriesIndex,
    coordSys: prepareResult.coordSys,
    dataInsideLength: data.count(),
    encode: wrapEncodeDef(customSeries.getData())
  };
  var currDataIndexInside;
  var currItemModel;
  var currItemStyleModels = {};
  var currLabelModels = {};
  var seriesItemStyleModels = {};
  var seriesLabelModels = {};
  for (var i = 0; i < STATES.length; i++) {
    var stateName = STATES[i];
    seriesItemStyleModels[stateName] = customSeries.getModel(PATH_ITEM_STYLE[stateName]);
    seriesLabelModels[stateName] = customSeries.getModel(PATH_LABEL[stateName]);
  }
  function getItemModel2(dataIndexInside) {
    return dataIndexInside === currDataIndexInside ? currItemModel || (currItemModel = data.getItemModel(dataIndexInside)) : data.getItemModel(dataIndexInside);
  }
  function getItemStyleModel(dataIndexInside, state) {
    return !data.hasItemOption ? seriesItemStyleModels[state] : dataIndexInside === currDataIndexInside ? currItemStyleModels[state] || (currItemStyleModels[state] = getItemModel2(dataIndexInside).getModel(PATH_ITEM_STYLE[state])) : getItemModel2(dataIndexInside).getModel(PATH_ITEM_STYLE[state]);
  }
  function getLabelModel(dataIndexInside, state) {
    return !data.hasItemOption ? seriesLabelModels[state] : dataIndexInside === currDataIndexInside ? currLabelModels[state] || (currLabelModels[state] = getItemModel2(dataIndexInside).getModel(PATH_LABEL[state])) : getItemModel2(dataIndexInside).getModel(PATH_LABEL[state]);
  }
  return function(dataIndexInside, payload) {
    currDataIndexInside = dataIndexInside;
    currItemModel = null;
    currItemStyleModels = {};
    currLabelModels = {};
    return renderItem && renderItem(defaults({
      dataIndexInside,
      dataIndex: data.getRawIndex(dataIndexInside),
      // Can be used for optimization when zoom or roam.
      actionType: payload ? payload.type : null
    }, userParams), userAPI);
  };
  function value(dim, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    return data.getStore().get(data.getDimensionIndex(dim || 0), dataIndexInside);
  }
  function ordinalRawValue(dim, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    dim = dim || 0;
    var dimInfo = data.getDimensionInfo(dim);
    if (!dimInfo) {
      var dimIndex = data.getDimensionIndex(dim);
      return dimIndex >= 0 ? data.getStore().get(dimIndex, dataIndexInside) : void 0;
    }
    var val = data.get(dimInfo.name, dataIndexInside);
    var ordinalMeta = dimInfo && dimInfo.ordinalMeta;
    return ordinalMeta ? ordinalMeta.categories[val] : val;
  }
  function style(userProps, dataIndexInside) {
    if (true) {
      warnDeprecated("api.style", "Please write literal style directly instead.");
    }
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    var style2 = data.getItemVisual(dataIndexInside, "style");
    var visualColor = style2 && style2.fill;
    var opacity = style2 && style2.opacity;
    var itemStyle = getItemStyleModel(dataIndexInside, NORMAL).getItemStyle();
    visualColor != null && (itemStyle.fill = visualColor);
    opacity != null && (itemStyle.opacity = opacity);
    var opt = {
      inheritColor: isString(visualColor) ? visualColor : "#000"
    };
    var labelModel = getLabelModel(dataIndexInside, NORMAL);
    var textStyle = createTextStyle(labelModel, null, opt, false, true);
    textStyle.text = labelModel.getShallow("show") ? retrieve2(customSeries.getFormattedLabel(dataIndexInside, NORMAL), getDefaultLabel(data, dataIndexInside)) : null;
    var textConfig = createTextConfig(labelModel, opt, false);
    preFetchFromExtra(userProps, itemStyle);
    itemStyle = convertToEC4StyleForCustomSerise(itemStyle, textStyle, textConfig);
    userProps && applyUserPropsAfter(itemStyle, userProps);
    itemStyle.legacy = true;
    return itemStyle;
  }
  function styleEmphasis(userProps, dataIndexInside) {
    if (true) {
      warnDeprecated("api.styleEmphasis", "Please write literal style directly instead.");
    }
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    var itemStyle = getItemStyleModel(dataIndexInside, EMPHASIS).getItemStyle();
    var labelModel = getLabelModel(dataIndexInside, EMPHASIS);
    var textStyle = createTextStyle(labelModel, null, null, true, true);
    textStyle.text = labelModel.getShallow("show") ? retrieve3(customSeries.getFormattedLabel(dataIndexInside, EMPHASIS), customSeries.getFormattedLabel(dataIndexInside, NORMAL), getDefaultLabel(data, dataIndexInside)) : null;
    var textConfig = createTextConfig(labelModel, null, true);
    preFetchFromExtra(userProps, itemStyle);
    itemStyle = convertToEC4StyleForCustomSerise(itemStyle, textStyle, textConfig);
    userProps && applyUserPropsAfter(itemStyle, userProps);
    itemStyle.legacy = true;
    return itemStyle;
  }
  function applyUserPropsAfter(itemStyle, extra) {
    for (var key in extra) {
      if (hasOwn(extra, key)) {
        itemStyle[key] = extra[key];
      }
    }
  }
  function preFetchFromExtra(extra, itemStyle) {
    if (extra) {
      extra.textFill && (itemStyle.textFill = extra.textFill);
      extra.textPosition && (itemStyle.textPosition = extra.textPosition);
    }
  }
  function visual(visualType, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    if (hasOwn(STYLE_VISUAL_TYPE, visualType)) {
      var style_1 = data.getItemVisual(dataIndexInside, "style");
      return style_1 ? style_1[STYLE_VISUAL_TYPE[visualType]] : null;
    }
    if (hasOwn(NON_STYLE_VISUAL_PROPS, visualType)) {
      return data.getItemVisual(dataIndexInside, visualType);
    }
  }
  function barLayout(opt) {
    if (coordSys.type === "cartesian2d") {
      var baseAxis = coordSys.getBaseAxis();
      return getLayoutOnAxis(defaults({
        axis: baseAxis
      }, opt));
    }
  }
  function currentSeriesIndices() {
    return ecModel.getCurrentSeriesIndices();
  }
  function font(opt) {
    return getFont(opt, ecModel);
  }
}
function wrapEncodeDef(data) {
  var encodeDef = {};
  each(data.dimensions, function(dimName) {
    var dimInfo = data.getDimensionInfo(dimName);
    if (!dimInfo.isExtraCoord) {
      var coordDim = dimInfo.coordDim;
      var dataDims = encodeDef[coordDim] = encodeDef[coordDim] || [];
      dataDims[dimInfo.coordDimIndex] = data.getDimensionIndex(dimName);
    }
  });
  return encodeDef;
}
function createOrUpdateItem(api, existsEl, dataIndex, elOption, seriesModel, group, data) {
  if (!elOption) {
    group.remove(existsEl);
    return;
  }
  var el = doCreateOrUpdateEl(api, existsEl, dataIndex, elOption, seriesModel, group);
  el && data.setItemGraphicEl(dataIndex, el);
  el && toggleHoverEmphasis(el, elOption.focus, elOption.blurScope, elOption.emphasisDisabled);
  return el;
}
function doCreateOrUpdateEl(api, existsEl, dataIndex, elOption, seriesModel, group) {
  if (true) {
    assert(elOption, "should not have an null/undefined element setting");
  }
  var toBeReplacedIdx = -1;
  var oldEl = existsEl;
  if (existsEl && doesElNeedRecreate(existsEl, elOption, seriesModel)) {
    toBeReplacedIdx = indexOf(group.childrenRef(), existsEl);
    existsEl = null;
  }
  var isInit = !existsEl;
  var el = existsEl;
  if (!el) {
    el = createEl(elOption);
    if (oldEl) {
      copyElement(oldEl, el);
    }
  } else {
    el.clearStates();
  }
  if (elOption.morph === false) {
    el.disableMorphing = true;
  } else if (el.disableMorphing) {
    el.disableMorphing = false;
  }
  attachedTxInfoTmp.normal.cfg = attachedTxInfoTmp.normal.conOpt = attachedTxInfoTmp.emphasis.cfg = attachedTxInfoTmp.emphasis.conOpt = attachedTxInfoTmp.blur.cfg = attachedTxInfoTmp.blur.conOpt = attachedTxInfoTmp.select.cfg = attachedTxInfoTmp.select.conOpt = null;
  attachedTxInfoTmp.isLegacy = false;
  doCreateOrUpdateAttachedTx(el, dataIndex, elOption, seriesModel, isInit, attachedTxInfoTmp);
  doCreateOrUpdateClipPath(el, dataIndex, elOption, seriesModel, isInit);
  updateElNormal(api, el, dataIndex, elOption, attachedTxInfoTmp, seriesModel, isInit);
  hasOwn(elOption, "info") && (customInnerStore(el).info = elOption.info);
  for (var i = 0; i < STATES.length; i++) {
    var stateName = STATES[i];
    if (stateName !== NORMAL) {
      var otherStateOpt = retrieveStateOption(elOption, stateName);
      var otherStyleOpt = retrieveStyleOptionOnState(elOption, otherStateOpt, stateName);
      updateElOnState(stateName, el, otherStateOpt, otherStyleOpt, attachedTxInfoTmp);
    }
  }
  updateZ(el, elOption, seriesModel);
  if (elOption.type === "group") {
    mergeChildren(api, el, dataIndex, elOption, seriesModel);
  }
  if (toBeReplacedIdx >= 0) {
    group.replaceAt(el, toBeReplacedIdx);
  } else {
    group.add(el);
  }
  return el;
}
function doesElNeedRecreate(el, elOption, seriesModel) {
  var elInner = customInnerStore(el);
  var elOptionType = elOption.type;
  var elOptionShape = elOption.shape;
  var elOptionStyle = elOption.style;
  return (
    // Always create new if universal transition is enabled.
    // Because we do transition after render. It needs to know what old element is. Replacement will loose it.
    seriesModel.isUniversalTransitionEnabled() || elOptionType != null && elOptionType !== elInner.customGraphicType || elOptionType === "path" && hasOwnPathData(elOptionShape) && getPathData(elOptionShape) !== elInner.customPathData || elOptionType === "image" && hasOwn(elOptionStyle, "image") && elOptionStyle.image !== elInner.customImagePath
  );
}
function doCreateOrUpdateClipPath(el, dataIndex, elOption, seriesModel, isInit) {
  var clipPathOpt = elOption.clipPath;
  if (clipPathOpt === false) {
    if (el && el.getClipPath()) {
      el.removeClipPath();
    }
  } else if (clipPathOpt) {
    var clipPath = el.getClipPath();
    if (clipPath && doesElNeedRecreate(clipPath, clipPathOpt, seriesModel)) {
      clipPath = null;
    }
    if (!clipPath) {
      clipPath = createEl(clipPathOpt);
      if (true) {
        assert(isPath(clipPath), "Only any type of `path` can be used in `clipPath`, rather than " + clipPath.type + ".");
      }
      el.setClipPath(clipPath);
    }
    updateElNormal(null, clipPath, dataIndex, clipPathOpt, null, seriesModel, isInit);
  }
}
function doCreateOrUpdateAttachedTx(el, dataIndex, elOption, seriesModel, isInit, attachedTxInfo) {
  if (el.isGroup) {
    return;
  }
  processTxInfo(elOption, null, attachedTxInfo);
  processTxInfo(elOption, EMPHASIS, attachedTxInfo);
  var txConOptNormal = attachedTxInfo.normal.conOpt;
  var txConOptEmphasis = attachedTxInfo.emphasis.conOpt;
  var txConOptBlur = attachedTxInfo.blur.conOpt;
  var txConOptSelect = attachedTxInfo.select.conOpt;
  if (txConOptNormal != null || txConOptEmphasis != null || txConOptSelect != null || txConOptBlur != null) {
    var textContent = el.getTextContent();
    if (txConOptNormal === false) {
      textContent && el.removeTextContent();
    } else {
      txConOptNormal = attachedTxInfo.normal.conOpt = txConOptNormal || {
        type: "text"
      };
      if (!textContent) {
        textContent = createEl(txConOptNormal);
        el.setTextContent(textContent);
      } else {
        textContent.clearStates();
      }
      updateElNormal(null, textContent, dataIndex, txConOptNormal, null, seriesModel, isInit);
      var txConStlOptNormal = txConOptNormal && txConOptNormal.style;
      for (var i = 0; i < STATES.length; i++) {
        var stateName = STATES[i];
        if (stateName !== NORMAL) {
          var txConOptOtherState = attachedTxInfo[stateName].conOpt;
          updateElOnState(stateName, textContent, txConOptOtherState, retrieveStyleOptionOnState(txConOptNormal, txConOptOtherState, stateName), null);
        }
      }
      txConStlOptNormal ? textContent.dirty() : textContent.markRedraw();
    }
  }
}
function processTxInfo(elOption, state, attachedTxInfo) {
  var stateOpt = !state ? elOption : retrieveStateOption(elOption, state);
  var styleOpt = !state ? elOption.style : retrieveStyleOptionOnState(elOption, stateOpt, EMPHASIS);
  var elType = elOption.type;
  var txCfg = stateOpt ? stateOpt.textConfig : null;
  var txConOptNormal = elOption.textContent;
  var txConOpt = !txConOptNormal ? null : !state ? txConOptNormal : retrieveStateOption(txConOptNormal, state);
  if (styleOpt && // Because emphasis style has little info to detect legacy,
  // if normal is legacy, emphasis is trade as legacy.
  (attachedTxInfo.isLegacy || isEC4CompatibleStyle(styleOpt, elType, !!txCfg, !!txConOpt))) {
    attachedTxInfo.isLegacy = true;
    var convertResult = convertFromEC4CompatibleStyle(styleOpt, elType, !state);
    if (!txCfg && convertResult.textConfig) {
      txCfg = convertResult.textConfig;
    }
    if (!txConOpt && convertResult.textContent) {
      txConOpt = convertResult.textContent;
    }
  }
  if (!state && txConOpt) {
    var txConOptNormal_1 = txConOpt;
    !txConOptNormal_1.type && (txConOptNormal_1.type = "text");
    if (true) {
      assert(txConOptNormal_1.type === "text", 'textContent.type must be "text"');
    }
  }
  var info = !state ? attachedTxInfo.normal : attachedTxInfo[state];
  info.cfg = txCfg;
  info.conOpt = txConOpt;
}
function retrieveStateOption(elOption, state) {
  return !state ? elOption : elOption ? elOption[state] : null;
}
function retrieveStyleOptionOnState(stateOptionNormal, stateOption, state) {
  var style = stateOption && stateOption.style;
  if (style == null && state === EMPHASIS && stateOptionNormal) {
    style = stateOptionNormal.styleEmphasis;
  }
  return style;
}
function mergeChildren(api, el, dataIndex, elOption, seriesModel) {
  var newChildren = elOption.children;
  var newLen = newChildren ? newChildren.length : 0;
  var mergeChildren2 = elOption.$mergeChildren;
  var byName = mergeChildren2 === "byName" || elOption.diffChildrenByName;
  var notMerge = mergeChildren2 === false;
  if (!newLen && !byName && !notMerge) {
    return;
  }
  if (byName) {
    diffGroupChildren({
      api,
      oldChildren: el.children() || [],
      newChildren: newChildren || [],
      dataIndex,
      seriesModel,
      group: el
    });
    return;
  }
  notMerge && el.removeAll();
  var index = 0;
  for (; index < newLen; index++) {
    var newChild = newChildren[index];
    var oldChild = el.childAt(index);
    if (newChild) {
      if (newChild.ignore == null) {
        newChild.ignore = false;
      }
      doCreateOrUpdateEl(api, oldChild, dataIndex, newChild, seriesModel, el);
    } else {
      if (true) {
        assert(oldChild, "renderItem should not return a group containing elements as null/undefined/{} if they do not exist before.");
      }
      oldChild.ignore = true;
    }
  }
  for (var i = el.childCount() - 1; i >= index; i--) {
    var child = el.childAt(i);
    removeChildFromGroup(el, child, seriesModel);
  }
}
function removeChildFromGroup(group, child, seriesModel) {
  child && applyLeaveTransition(child, customInnerStore(group).option, seriesModel);
}
function diffGroupChildren(context) {
  new DataDiffer_default(context.oldChildren, context.newChildren, getKey, getKey, context).add(processAddUpdate).update(processAddUpdate).remove(processRemove).execute();
}
function getKey(item, idx) {
  var name = item && item.name;
  return name != null ? name : GROUP_DIFF_PREFIX + idx;
}
function processAddUpdate(newIndex, oldIndex) {
  var context = this.context;
  var childOption = newIndex != null ? context.newChildren[newIndex] : null;
  var child = oldIndex != null ? context.oldChildren[oldIndex] : null;
  doCreateOrUpdateEl(context.api, child, context.dataIndex, childOption, context.seriesModel, context.group);
}
function processRemove(oldIndex) {
  var context = this.context;
  var child = context.oldChildren[oldIndex];
  child && applyLeaveTransition(child, customInnerStore(child).option, context.seriesModel);
}
function getPathData(shape) {
  return shape && (shape.pathData || shape.d);
}
function hasOwnPathData(shape) {
  return shape && (hasOwn(shape, "pathData") || hasOwn(shape, "d"));
}

// node_modules/echarts/lib/chart/custom/install.js
function install26(registers) {
  registers.registerChartView(CustomView_default);
  registers.registerSeriesModel(CustomSeries_default);
}
export {
  install6 as BarChart,
  install18 as BoxplotChart,
  install19 as CandlestickChart,
  install26 as CustomChart,
  install20 as EffectScatterChart,
  install15 as FunnelChart,
  install14 as GaugeChart,
  install13 as GraphChart,
  install22 as HeatmapChart,
  install5 as LineChart,
  install21 as LinesChart,
  install10 as MapChart,
  install16 as ParallelChart,
  install23 as PictorialBarChart,
  install7 as PieChart,
  install9 as RadarChart,
  install17 as SankeyChart,
  install8 as ScatterChart,
  install25 as SunburstChart,
  install24 as ThemeRiverChart,
  install11 as TreeChart,
  install12 as TreemapChart
};
//# sourceMappingURL=echarts_charts.js.map
