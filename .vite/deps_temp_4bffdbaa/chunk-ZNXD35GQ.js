import {
  AxisModelCommonMixin,
  Axis_default,
  BezierCurve_default,
  Circle_default,
  Component_default,
  Component_default2,
  DataDiffer_default,
  Ellipse_default,
  GeoJSONRegion,
  GeoSVGRegion,
  Interval_default,
  Line_default,
  LinearGradient_default,
  Model_default,
  OrdinalMeta_default,
  Polygon_default,
  Polyline_default,
  RadialGradient_default,
  Ring_default,
  SINGLE_REFERRING,
  SPECIAL_STATES,
  __extends,
  applyTransform as applyTransform2,
  asc,
  clear,
  clipPointsByRect,
  createFromString,
  createOrUpdate,
  createOrUpdatePatternFromDecal,
  createScaleByModel,
  createSymbol,
  createTextStyle,
  defaultEmphasis,
  enableComponentHighDownFeatures,
  enterEmphasis,
  estimateLabelUnionRect,
  fetchLayoutMode,
  findEventDispatcher,
  getAnimationConfig,
  getDataDimensionsOnAxis,
  getECData,
  getLabelStatesModels,
  getLayoutParams,
  getLayoutRect,
  getPrecisionSafe,
  getScaleExtent,
  getTransform,
  getUID,
  groupTransition,
  hideOverlap,
  ifAxisCrossZero,
  increaseInterval,
  initProps,
  isIntervalOrLogScale,
  isRadianAroundZero,
  isValueNice,
  leaveEmphasis,
  linearMap,
  makeInner,
  makeStyleMapper,
  mergeLayoutParam,
  mergePath,
  niceScaleExtent,
  normalizeSymbolOffset,
  normalizeSymbolSize,
  normalizeToArray,
  parseGeoJSON,
  parsePercent,
  prepareLayoutList,
  registerAction,
  remRadian,
  removeElement,
  retrieveRawValue,
  round,
  saveOldStyle,
  setDefaultStateProxy,
  setLabelStyle,
  setTooltipConfig,
  shouldShowAllLabels,
  subPixelOptimizeLine,
  toggleHoverEmphasis,
  transformDirection,
  traverseElements,
  updateProps,
  warn
} from "./chunk-GZAGD2NU.js";
import {
  BoundingRect_default,
  CompoundPath_default,
  Displayable_default,
  Eventful_default,
  Group_default,
  Image_default,
  Path_default,
  Rect_default,
  TRANSFORMABLE_PROPS,
  TSpan_default,
  Text_default,
  Transformable_default,
  applyTransform,
  assert,
  bind,
  clone,
  cloneValue,
  copy,
  copy2,
  create2 as create,
  createHashMap,
  curry,
  defaults,
  each,
  eqNaN,
  extend,
  fastLerp,
  filter,
  hasOwn,
  identity,
  indexOf,
  invert,
  isArray,
  isArrayLike,
  isFunction,
  isMiddleOrRightButtonOnMouseUpDown,
  isNumber,
  isObject,
  isString,
  keys,
  map,
  max,
  merge,
  mergeAll,
  min,
  mixin,
  modifyAlpha,
  modifyHSL,
  mul,
  noop,
  normalize,
  parse,
  reduce,
  retrieve,
  retrieve2,
  retrieve3,
  rotate,
  scale2 as scale,
  stop,
  stringify,
  sub,
  translate,
  trim
} from "./chunk-6GXF4SXL.js";

// node_modules/echarts/lib/coord/cartesian/GridModel.js
var GridModel = (
  /** @class */
  function(_super) {
    __extends(GridModel2, _super);
    function GridModel2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    GridModel2.type = "grid";
    GridModel2.dependencies = ["xAxis", "yAxis"];
    GridModel2.layoutMode = "box";
    GridModel2.defaultOption = {
      show: false,
      // zlevel: 0,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 70,
      // If grid size contain label
      containLabel: false,
      // width: {totalWidth} - left - right,
      // height: {totalHeight} - top - bottom,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    };
    return GridModel2;
  }(Component_default)
);
var GridModel_default = GridModel;

// node_modules/echarts/lib/coord/cartesian/AxisModel.js
var CartesianAxisModel = (
  /** @class */
  function(_super) {
    __extends(CartesianAxisModel2, _super);
    function CartesianAxisModel2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    CartesianAxisModel2.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", SINGLE_REFERRING).models[0];
    };
    CartesianAxisModel2.type = "cartesian2dAxis";
    return CartesianAxisModel2;
  }(Component_default)
);
mixin(CartesianAxisModel, AxisModelCommonMixin);

// node_modules/echarts/lib/coord/axisDefault.js
var defaultOption = {
  show: true,
  // zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: false,
  // Axis name displayed.
  name: "",
  // 'start' | 'middle' | 'end'
  nameLocation: "end",
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: "...",
    placeholder: "."
  },
  // Use global text style by default.
  nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: false,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: false,
  tooltip: {
    show: false
  },
  axisPointer: {},
  axisLine: {
    show: true,
    onZero: true,
    onZeroAxisIndex: null,
    lineStyle: {
      color: "#6E7079",
      width: 1,
      type: "solid"
    },
    // The arrow at both ends the the axis.
    symbol: ["none", "none"],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: true,
    // Whether axisTick is inside the grid or outside the grid.
    inside: false,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: false,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  },
  splitLine: {
    show: true,
    showMinLine: true,
    showMaxLine: true,
    lineStyle: {
      color: ["#E0E6F1"],
      width: 1,
      type: "solid"
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
    }
  }
};
var categoryAxis = merge({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: true,
  // Set false to faster category collection.
  deduplication: null,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: false
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: false,
    interval: "auto"
  },
  axisLabel: {
    interval: "auto"
  }
}, defaultOption);
var valueAxis = merge({
  boundaryGap: [0, 0],
  axisLine: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  axisTick: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  splitNumber: 5,
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: false,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Length of minor tick
    length: 3,
    // Line style
    lineStyle: {
      // Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: false,
    lineStyle: {
      color: "#F4F7FD",
      width: 1
    }
  }
}, defaultOption);
var timeAxis = merge({
  splitNumber: 6,
  axisLabel: {
    // To eliminate labels that are not nice
    showMinLabel: false,
    showMaxLabel: false,
    rich: {
      primary: {
        fontWeight: "bold"
      }
    }
  },
  splitLine: {
    show: false
  }
}, valueAxis);
var logAxis = defaults({
  logBase: 10
}, valueAxis);
var axisDefault_default = {
  category: categoryAxis,
  value: valueAxis,
  time: timeAxis,
  log: logAxis
};

// node_modules/echarts/lib/coord/axisCommonTypes.js
var AXIS_TYPES = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};

// node_modules/echarts/lib/coord/axisModelCreator.js
function axisModelCreator(registers, axisName, BaseAxisModelClass, extraDefaultOption) {
  each(AXIS_TYPES, function(v, axisType) {
    var defaultOption2 = merge(merge({}, axisDefault_default[axisType], true), extraDefaultOption, true);
    var AxisModel = (
      /** @class */
      function(_super) {
        __extends(AxisModel2, _super);
        function AxisModel2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = axisName + "Axis." + axisType;
          return _this;
        }
        AxisModel2.prototype.mergeDefaultAndTheme = function(option, ecModel) {
          var layoutMode = fetchLayoutMode(this);
          var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
          var themeModel = ecModel.getTheme();
          merge(option, themeModel.get(axisType + "Axis"));
          merge(option, this.getDefaultOption());
          option.type = getAxisType(option);
          if (layoutMode) {
            mergeLayoutParam(option, inputPositionParams, layoutMode);
          }
        };
        AxisModel2.prototype.optionUpdated = function() {
          var thisOption = this.option;
          if (thisOption.type === "category") {
            this.__ordinalMeta = OrdinalMeta_default.createByAxisModel(this);
          }
        };
        AxisModel2.prototype.getCategories = function(rawData) {
          var option = this.option;
          if (option.type === "category") {
            if (rawData) {
              return option.data;
            }
            return this.__ordinalMeta.categories;
          }
        };
        AxisModel2.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        };
        AxisModel2.type = axisName + "Axis." + axisType;
        AxisModel2.defaultOption = defaultOption2;
        return AxisModel2;
      }(BaseAxisModelClass)
    );
    registers.registerComponentModel(AxisModel);
  });
  registers.registerSubTypeDefaulter(axisName + "Axis", getAxisType);
}
function getAxisType(option) {
  return option.type || (option.data ? "category" : "value");
}

// node_modules/echarts/lib/coord/cartesian/Cartesian.js
var Cartesian = (
  /** @class */
  function() {
    function Cartesian2(name) {
      this.type = "cartesian";
      this._dimList = [];
      this._axes = {};
      this.name = name || "";
    }
    Cartesian2.prototype.getAxis = function(dim) {
      return this._axes[dim];
    };
    Cartesian2.prototype.getAxes = function() {
      return map(this._dimList, function(dim) {
        return this._axes[dim];
      }, this);
    };
    Cartesian2.prototype.getAxesByScale = function(scaleType) {
      scaleType = scaleType.toLowerCase();
      return filter(this.getAxes(), function(axis) {
        return axis.scale.type === scaleType;
      });
    };
    Cartesian2.prototype.addAxis = function(axis) {
      var dim = axis.dim;
      this._axes[dim] = axis;
      this._dimList.push(dim);
    };
    return Cartesian2;
  }()
);
var Cartesian_default = Cartesian;

// node_modules/echarts/lib/coord/cartesian/Cartesian2D.js
var cartesian2DDimensions = ["x", "y"];
function canCalculateAffineTransform(scale2) {
  return scale2.type === "interval" || scale2.type === "time";
}
var Cartesian2D = (
  /** @class */
  function(_super) {
    __extends(Cartesian2D2, _super);
    function Cartesian2D2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "cartesian2d";
      _this.dimensions = cartesian2DDimensions;
      return _this;
    }
    Cartesian2D2.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var xAxisScale = this.getAxis("x").scale;
      var yAxisScale = this.getAxis("y").scale;
      if (!canCalculateAffineTransform(xAxisScale) || !canCalculateAffineTransform(yAxisScale)) {
        return;
      }
      var xScaleExtent = xAxisScale.getExtent();
      var yScaleExtent = yAxisScale.getExtent();
      var start = this.dataToPoint([xScaleExtent[0], yScaleExtent[0]]);
      var end = this.dataToPoint([xScaleExtent[1], yScaleExtent[1]]);
      var xScaleSpan = xScaleExtent[1] - xScaleExtent[0];
      var yScaleSpan = yScaleExtent[1] - yScaleExtent[0];
      if (!xScaleSpan || !yScaleSpan) {
        return;
      }
      var scaleX = (end[0] - start[0]) / xScaleSpan;
      var scaleY = (end[1] - start[1]) / yScaleSpan;
      var translateX = start[0] - xScaleExtent[0] * scaleX;
      var translateY = start[1] - yScaleExtent[0] * scaleY;
      var m = this._transform = [scaleX, 0, 0, scaleY, translateX, translateY];
      this._invTransform = invert([], m);
    };
    Cartesian2D2.prototype.getBaseAxis = function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    };
    Cartesian2D2.prototype.containPoint = function(point) {
      var axisX = this.getAxis("x");
      var axisY = this.getAxis("y");
      return axisX.contain(axisX.toLocalCoord(point[0])) && axisY.contain(axisY.toLocalCoord(point[1]));
    };
    Cartesian2D2.prototype.containData = function(data) {
      return this.getAxis("x").containData(data[0]) && this.getAxis("y").containData(data[1]);
    };
    Cartesian2D2.prototype.containZone = function(data1, data2) {
      var zoneDiag1 = this.dataToPoint(data1);
      var zoneDiag2 = this.dataToPoint(data2);
      var area = this.getArea();
      var zone = new BoundingRect_default(zoneDiag1[0], zoneDiag1[1], zoneDiag2[0] - zoneDiag1[0], zoneDiag2[1] - zoneDiag1[1]);
      return area.intersect(zone);
    };
    Cartesian2D2.prototype.dataToPoint = function(data, clamp, out) {
      out = out || [];
      var xVal = data[0];
      var yVal = data[1];
      if (this._transform && xVal != null && isFinite(xVal) && yVal != null && isFinite(yVal)) {
        return applyTransform(out, data, this._transform);
      }
      var xAxis = this.getAxis("x");
      var yAxis = this.getAxis("y");
      out[0] = xAxis.toGlobalCoord(xAxis.dataToCoord(xVal, clamp));
      out[1] = yAxis.toGlobalCoord(yAxis.dataToCoord(yVal, clamp));
      return out;
    };
    Cartesian2D2.prototype.clampData = function(data, out) {
      var xScale = this.getAxis("x").scale;
      var yScale = this.getAxis("y").scale;
      var xAxisExtent = xScale.getExtent();
      var yAxisExtent = yScale.getExtent();
      var x = xScale.parse(data[0]);
      var y = yScale.parse(data[1]);
      out = out || [];
      out[0] = Math.min(Math.max(Math.min(xAxisExtent[0], xAxisExtent[1]), x), Math.max(xAxisExtent[0], xAxisExtent[1]));
      out[1] = Math.min(Math.max(Math.min(yAxisExtent[0], yAxisExtent[1]), y), Math.max(yAxisExtent[0], yAxisExtent[1]));
      return out;
    };
    Cartesian2D2.prototype.pointToData = function(point, clamp) {
      var out = [];
      if (this._invTransform) {
        return applyTransform(out, point, this._invTransform);
      }
      var xAxis = this.getAxis("x");
      var yAxis = this.getAxis("y");
      out[0] = xAxis.coordToData(xAxis.toLocalCoord(point[0]), clamp);
      out[1] = yAxis.coordToData(yAxis.toLocalCoord(point[1]), clamp);
      return out;
    };
    Cartesian2D2.prototype.getOtherAxis = function(axis) {
      return this.getAxis(axis.dim === "x" ? "y" : "x");
    };
    Cartesian2D2.prototype.getArea = function(tolerance) {
      tolerance = tolerance || 0;
      var xExtent = this.getAxis("x").getGlobalExtent();
      var yExtent = this.getAxis("y").getGlobalExtent();
      var x = Math.min(xExtent[0], xExtent[1]) - tolerance;
      var y = Math.min(yExtent[0], yExtent[1]) - tolerance;
      var width = Math.max(xExtent[0], xExtent[1]) - x + tolerance;
      var height = Math.max(yExtent[0], yExtent[1]) - y + tolerance;
      return new BoundingRect_default(x, y, width, height);
    };
    return Cartesian2D2;
  }(Cartesian_default)
);
var Cartesian2D_default = Cartesian2D;

// node_modules/echarts/lib/coord/cartesian/Axis2D.js
var Axis2D = (
  /** @class */
  function(_super) {
    __extends(Axis2D2, _super);
    function Axis2D2(dim, scale2, coordExtent, axisType, position) {
      var _this = _super.call(this, dim, scale2, coordExtent) || this;
      _this.index = 0;
      _this.type = axisType || "value";
      _this.position = position || "bottom";
      return _this;
    }
    Axis2D2.prototype.isHorizontal = function() {
      var position = this.position;
      return position === "top" || position === "bottom";
    };
    Axis2D2.prototype.getGlobalExtent = function(asc2) {
      var ret = this.getExtent();
      ret[0] = this.toGlobalCoord(ret[0]);
      ret[1] = this.toGlobalCoord(ret[1]);
      asc2 && ret[0] > ret[1] && ret.reverse();
      return ret;
    };
    Axis2D2.prototype.pointToData = function(point, clamp) {
      return this.coordToData(this.toLocalCoord(point[this.dim === "x" ? 0 : 1]), clamp);
    };
    Axis2D2.prototype.setCategorySortInfo = function(info) {
      if (this.type !== "category") {
        return false;
      }
      this.model.option.categorySortInfo = info;
      this.scale.setSortInfo(info);
    };
    return Axis2D2;
  }(Axis_default)
);
var Axis2D_default = Axis2D;

// node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper.js
function layout(gridModel, axisModel, opt) {
  opt = opt || {};
  var grid = gridModel.coordinateSystem;
  var axis = axisModel.axis;
  var layout2 = {};
  var otherAxisOnZeroOf = axis.getAxesOnZeroOf()[0];
  var rawAxisPosition = axis.position;
  var axisPosition = otherAxisOnZeroOf ? "onZero" : rawAxisPosition;
  var axisDim = axis.dim;
  var rect = grid.getRect();
  var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
  var idx = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  };
  var axisOffset = axisModel.get("offset") || 0;
  var posBound = axisDim === "x" ? [rectBound[2] - axisOffset, rectBound[3] + axisOffset] : [rectBound[0] - axisOffset, rectBound[1] + axisOffset];
  if (otherAxisOnZeroOf) {
    var onZeroCoord = otherAxisOnZeroOf.toGlobalCoord(otherAxisOnZeroOf.dataToCoord(0));
    posBound[idx.onZero] = Math.max(Math.min(onZeroCoord, posBound[1]), posBound[0]);
  }
  layout2.position = [axisDim === "y" ? posBound[idx[axisPosition]] : rectBound[0], axisDim === "x" ? posBound[idx[axisPosition]] : rectBound[3]];
  layout2.rotation = Math.PI / 2 * (axisDim === "x" ? 0 : 1);
  var dirMap = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  layout2.labelDirection = layout2.tickDirection = layout2.nameDirection = dirMap[rawAxisPosition];
  layout2.labelOffset = otherAxisOnZeroOf ? posBound[idx[rawAxisPosition]] - posBound[idx.onZero] : 0;
  if (axisModel.get(["axisTick", "inside"])) {
    layout2.tickDirection = -layout2.tickDirection;
  }
  if (retrieve(opt.labelInside, axisModel.get(["axisLabel", "inside"]))) {
    layout2.labelDirection = -layout2.labelDirection;
  }
  var labelRotate = axisModel.get(["axisLabel", "rotate"]);
  layout2.labelRotate = axisPosition === "top" ? -labelRotate : labelRotate;
  layout2.z2 = 1;
  return layout2;
}
function isCartesian2DSeries(seriesModel) {
  return seriesModel.get("coordinateSystem") === "cartesian2d";
}
function findAxisModels(seriesModel) {
  var axisModelMap = {
    xAxisModel: null,
    yAxisModel: null
  };
  each(axisModelMap, function(v, key) {
    var axisType = key.replace(/Model$/, "");
    var axisModel = seriesModel.getReferringComponents(axisType, SINGLE_REFERRING).models[0];
    if (true) {
      if (!axisModel) {
        throw new Error(axisType + ' "' + retrieve3(seriesModel.get(axisType + "Index"), seriesModel.get(axisType + "Id"), 0) + '" not found');
      }
    }
    axisModelMap[key] = axisModel;
  });
  return axisModelMap;
}

// node_modules/echarts/lib/coord/axisAlignTicks.js
var mathLog = Math.log;
function alignScaleTicks(scale2, axisModel, alignToScale) {
  var intervalScaleProto = Interval_default.prototype;
  var alignToTicks = intervalScaleProto.getTicks.call(alignToScale);
  var alignToNicedTicks = intervalScaleProto.getTicks.call(alignToScale, true);
  var alignToSplitNumber = alignToTicks.length - 1;
  var alignToInterval = intervalScaleProto.getInterval.call(alignToScale);
  var scaleExtent = getScaleExtent(scale2, axisModel);
  var rawExtent = scaleExtent.extent;
  var isMinFixed = scaleExtent.fixMin;
  var isMaxFixed = scaleExtent.fixMax;
  if (scale2.type === "log") {
    var logBase = mathLog(scale2.base);
    rawExtent = [mathLog(rawExtent[0]) / logBase, mathLog(rawExtent[1]) / logBase];
  }
  scale2.setExtent(rawExtent[0], rawExtent[1]);
  scale2.calcNiceExtent({
    splitNumber: alignToSplitNumber,
    fixMin: isMinFixed,
    fixMax: isMaxFixed
  });
  var extent = intervalScaleProto.getExtent.call(scale2);
  if (isMinFixed) {
    rawExtent[0] = extent[0];
  }
  if (isMaxFixed) {
    rawExtent[1] = extent[1];
  }
  var interval = intervalScaleProto.getInterval.call(scale2);
  var min2 = rawExtent[0];
  var max2 = rawExtent[1];
  if (isMinFixed && isMaxFixed) {
    interval = (max2 - min2) / alignToSplitNumber;
  } else if (isMinFixed) {
    max2 = rawExtent[0] + interval * alignToSplitNumber;
    while (max2 < rawExtent[1] && isFinite(max2) && isFinite(rawExtent[1])) {
      interval = increaseInterval(interval);
      max2 = rawExtent[0] + interval * alignToSplitNumber;
    }
  } else if (isMaxFixed) {
    min2 = rawExtent[1] - interval * alignToSplitNumber;
    while (min2 > rawExtent[0] && isFinite(min2) && isFinite(rawExtent[0])) {
      interval = increaseInterval(interval);
      min2 = rawExtent[1] - interval * alignToSplitNumber;
    }
  } else {
    var nicedSplitNumber = scale2.getTicks().length - 1;
    if (nicedSplitNumber > alignToSplitNumber) {
      interval = increaseInterval(interval);
    }
    var range = interval * alignToSplitNumber;
    max2 = Math.ceil(rawExtent[1] / interval) * interval;
    min2 = round(max2 - range);
    if (min2 < 0 && rawExtent[0] >= 0) {
      min2 = 0;
      max2 = round(range);
    } else if (max2 > 0 && rawExtent[1] <= 0) {
      max2 = 0;
      min2 = -round(range);
    }
  }
  var t0 = (alignToTicks[0].value - alignToNicedTicks[0].value) / alignToInterval;
  var t1 = (alignToTicks[alignToSplitNumber].value - alignToNicedTicks[alignToSplitNumber].value) / alignToInterval;
  intervalScaleProto.setExtent.call(scale2, min2 + interval * t0, max2 + interval * t1);
  intervalScaleProto.setInterval.call(scale2, interval);
  if (t0 || t1) {
    intervalScaleProto.setNiceExtent.call(scale2, min2 + interval, max2 - interval);
  }
  if (true) {
    var ticks = intervalScaleProto.getTicks.call(scale2);
    if (ticks[1] && (!isValueNice(interval) || getPrecisionSafe(ticks[1].value) > getPrecisionSafe(interval))) {
      warn(
        // eslint-disable-next-line
        "The ticks may be not readable when set min: " + axisModel.get("min") + ", max: " + axisModel.get("max") + " and alignTicks: true"
      );
    }
  }
}

// node_modules/echarts/lib/coord/cartesian/Grid.js
var Grid = (
  /** @class */
  function() {
    function Grid2(gridModel, ecModel, api) {
      this.type = "grid";
      this._coordsMap = {};
      this._coordsList = [];
      this._axesMap = {};
      this._axesList = [];
      this.axisPointerEnabled = true;
      this.dimensions = cartesian2DDimensions;
      this._initCartesian(gridModel, ecModel, api);
      this.model = gridModel;
    }
    Grid2.prototype.getRect = function() {
      return this._rect;
    };
    Grid2.prototype.update = function(ecModel, api) {
      var axesMap = this._axesMap;
      this._updateScale(ecModel, this.model);
      function updateAxisTicks(axes) {
        var alignTo;
        var axesIndices = keys(axes);
        var len = axesIndices.length;
        if (!len) {
          return;
        }
        var axisNeedsAlign = [];
        for (var i = len - 1; i >= 0; i--) {
          var idx = +axesIndices[i];
          var axis = axes[idx];
          var model = axis.model;
          var scale2 = axis.scale;
          if (
            // Only value and log axis without interval support alignTicks.
            isIntervalOrLogScale(scale2) && model.get("alignTicks") && model.get("interval") == null
          ) {
            axisNeedsAlign.push(axis);
          } else {
            niceScaleExtent(scale2, model);
            if (isIntervalOrLogScale(scale2)) {
              alignTo = axis;
            }
          }
        }
        ;
        if (axisNeedsAlign.length) {
          if (!alignTo) {
            alignTo = axisNeedsAlign.pop();
            niceScaleExtent(alignTo.scale, alignTo.model);
          }
          each(axisNeedsAlign, function(axis2) {
            alignScaleTicks(axis2.scale, axis2.model, alignTo.scale);
          });
        }
      }
      updateAxisTicks(axesMap.x);
      updateAxisTicks(axesMap.y);
      var onZeroRecords = {};
      each(axesMap.x, function(xAxis) {
        fixAxisOnZero(axesMap, "y", xAxis, onZeroRecords);
      });
      each(axesMap.y, function(yAxis) {
        fixAxisOnZero(axesMap, "x", yAxis, onZeroRecords);
      });
      this.resize(this.model, api);
    };
    Grid2.prototype.resize = function(gridModel, api, ignoreContainLabel) {
      var boxLayoutParams = gridModel.getBoxLayoutParams();
      var isContainLabel = !ignoreContainLabel && gridModel.get("containLabel");
      var gridRect = getLayoutRect(boxLayoutParams, {
        width: api.getWidth(),
        height: api.getHeight()
      });
      this._rect = gridRect;
      var axesList = this._axesList;
      adjustAxes();
      if (isContainLabel) {
        each(axesList, function(axis) {
          if (!axis.model.get(["axisLabel", "inside"])) {
            var labelUnionRect = estimateLabelUnionRect(axis);
            if (labelUnionRect) {
              var dim = axis.isHorizontal() ? "height" : "width";
              var margin = axis.model.get(["axisLabel", "margin"]);
              gridRect[dim] -= labelUnionRect[dim] + margin;
              if (axis.position === "top") {
                gridRect.y += labelUnionRect.height + margin;
              } else if (axis.position === "left") {
                gridRect.x += labelUnionRect.width + margin;
              }
            }
          }
        });
        adjustAxes();
      }
      each(this._coordsList, function(coord) {
        coord.calcAffineTransform();
      });
      function adjustAxes() {
        each(axesList, function(axis) {
          var isHorizontal = axis.isHorizontal();
          var extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height];
          var idx = axis.inverse ? 1 : 0;
          axis.setExtent(extent[idx], extent[1 - idx]);
          updateAxisTransform(axis, isHorizontal ? gridRect.x : gridRect.y);
        });
      }
    };
    Grid2.prototype.getAxis = function(dim, axisIndex) {
      var axesMapOnDim = this._axesMap[dim];
      if (axesMapOnDim != null) {
        return axesMapOnDim[axisIndex || 0];
      }
    };
    Grid2.prototype.getAxes = function() {
      return this._axesList.slice();
    };
    Grid2.prototype.getCartesian = function(xAxisIndex, yAxisIndex) {
      if (xAxisIndex != null && yAxisIndex != null) {
        var key = "x" + xAxisIndex + "y" + yAxisIndex;
        return this._coordsMap[key];
      }
      if (isObject(xAxisIndex)) {
        yAxisIndex = xAxisIndex.yAxisIndex;
        xAxisIndex = xAxisIndex.xAxisIndex;
      }
      for (var i = 0, coordList = this._coordsList; i < coordList.length; i++) {
        if (coordList[i].getAxis("x").index === xAxisIndex || coordList[i].getAxis("y").index === yAxisIndex) {
          return coordList[i];
        }
      }
    };
    Grid2.prototype.getCartesians = function() {
      return this._coordsList.slice();
    };
    Grid2.prototype.convertToPixel = function(ecModel, finder, value) {
      var target = this._findConvertTarget(finder);
      return target.cartesian ? target.cartesian.dataToPoint(value) : target.axis ? target.axis.toGlobalCoord(target.axis.dataToCoord(value)) : null;
    };
    Grid2.prototype.convertFromPixel = function(ecModel, finder, value) {
      var target = this._findConvertTarget(finder);
      return target.cartesian ? target.cartesian.pointToData(value) : target.axis ? target.axis.coordToData(target.axis.toLocalCoord(value)) : null;
    };
    Grid2.prototype._findConvertTarget = function(finder) {
      var seriesModel = finder.seriesModel;
      var xAxisModel = finder.xAxisModel || seriesModel && seriesModel.getReferringComponents("xAxis", SINGLE_REFERRING).models[0];
      var yAxisModel = finder.yAxisModel || seriesModel && seriesModel.getReferringComponents("yAxis", SINGLE_REFERRING).models[0];
      var gridModel = finder.gridModel;
      var coordsList = this._coordsList;
      var cartesian;
      var axis;
      if (seriesModel) {
        cartesian = seriesModel.coordinateSystem;
        indexOf(coordsList, cartesian) < 0 && (cartesian = null);
      } else if (xAxisModel && yAxisModel) {
        cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
      } else if (xAxisModel) {
        axis = this.getAxis("x", xAxisModel.componentIndex);
      } else if (yAxisModel) {
        axis = this.getAxis("y", yAxisModel.componentIndex);
      } else if (gridModel) {
        var grid = gridModel.coordinateSystem;
        if (grid === this) {
          cartesian = this._coordsList[0];
        }
      }
      return {
        cartesian,
        axis
      };
    };
    Grid2.prototype.containPoint = function(point) {
      var coord = this._coordsList[0];
      if (coord) {
        return coord.containPoint(point);
      }
    };
    Grid2.prototype._initCartesian = function(gridModel, ecModel, api) {
      var _this = this;
      var grid = this;
      var axisPositionUsed = {
        left: false,
        right: false,
        top: false,
        bottom: false
      };
      var axesMap = {
        x: {},
        y: {}
      };
      var axesCount = {
        x: 0,
        y: 0
      };
      ecModel.eachComponent("xAxis", createAxisCreator("x"), this);
      ecModel.eachComponent("yAxis", createAxisCreator("y"), this);
      if (!axesCount.x || !axesCount.y) {
        this._axesMap = {};
        this._axesList = [];
        return;
      }
      this._axesMap = axesMap;
      each(axesMap.x, function(xAxis, xAxisIndex) {
        each(axesMap.y, function(yAxis, yAxisIndex) {
          var key = "x" + xAxisIndex + "y" + yAxisIndex;
          var cartesian = new Cartesian2D_default(key);
          cartesian.master = _this;
          cartesian.model = gridModel;
          _this._coordsMap[key] = cartesian;
          _this._coordsList.push(cartesian);
          cartesian.addAxis(xAxis);
          cartesian.addAxis(yAxis);
        });
      });
      function createAxisCreator(dimName) {
        return function(axisModel, idx) {
          if (!isAxisUsedInTheGrid(axisModel, gridModel)) {
            return;
          }
          var axisPosition = axisModel.get("position");
          if (dimName === "x") {
            if (axisPosition !== "top" && axisPosition !== "bottom") {
              axisPosition = axisPositionUsed.bottom ? "top" : "bottom";
            }
          } else {
            if (axisPosition !== "left" && axisPosition !== "right") {
              axisPosition = axisPositionUsed.left ? "right" : "left";
            }
          }
          axisPositionUsed[axisPosition] = true;
          var axis = new Axis2D_default(dimName, createScaleByModel(axisModel), [0, 0], axisModel.get("type"), axisPosition);
          var isCategory = axis.type === "category";
          axis.onBand = isCategory && axisModel.get("boundaryGap");
          axis.inverse = axisModel.get("inverse");
          axisModel.axis = axis;
          axis.model = axisModel;
          axis.grid = grid;
          axis.index = idx;
          grid._axesList.push(axis);
          axesMap[dimName][idx] = axis;
          axesCount[dimName]++;
        };
      }
    };
    Grid2.prototype._updateScale = function(ecModel, gridModel) {
      each(this._axesList, function(axis) {
        axis.scale.setExtent(Infinity, -Infinity);
        if (axis.type === "category") {
          var categorySortInfo = axis.model.get("categorySortInfo");
          axis.scale.setSortInfo(categorySortInfo);
        }
      });
      ecModel.eachSeries(function(seriesModel) {
        if (isCartesian2DSeries(seriesModel)) {
          var axesModelMap = findAxisModels(seriesModel);
          var xAxisModel = axesModelMap.xAxisModel;
          var yAxisModel = axesModelMap.yAxisModel;
          if (!isAxisUsedInTheGrid(xAxisModel, gridModel) || !isAxisUsedInTheGrid(yAxisModel, gridModel)) {
            return;
          }
          var cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
          var data = seriesModel.getData();
          var xAxis = cartesian.getAxis("x");
          var yAxis = cartesian.getAxis("y");
          unionExtent(data, xAxis);
          unionExtent(data, yAxis);
        }
      }, this);
      function unionExtent(data, axis) {
        each(getDataDimensionsOnAxis(data, axis.dim), function(dim) {
          axis.scale.unionExtentFromData(data, dim);
        });
      }
    };
    Grid2.prototype.getTooltipAxes = function(dim) {
      var baseAxes = [];
      var otherAxes = [];
      each(this.getCartesians(), function(cartesian) {
        var baseAxis = dim != null && dim !== "auto" ? cartesian.getAxis(dim) : cartesian.getBaseAxis();
        var otherAxis = cartesian.getOtherAxis(baseAxis);
        indexOf(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis);
        indexOf(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis);
      });
      return {
        baseAxes,
        otherAxes
      };
    };
    Grid2.create = function(ecModel, api) {
      var grids = [];
      ecModel.eachComponent("grid", function(gridModel, idx) {
        var grid = new Grid2(gridModel, ecModel, api);
        grid.name = "grid_" + idx;
        grid.resize(gridModel, api, true);
        gridModel.coordinateSystem = grid;
        grids.push(grid);
      });
      ecModel.eachSeries(function(seriesModel) {
        if (!isCartesian2DSeries(seriesModel)) {
          return;
        }
        var axesModelMap = findAxisModels(seriesModel);
        var xAxisModel = axesModelMap.xAxisModel;
        var yAxisModel = axesModelMap.yAxisModel;
        var gridModel = xAxisModel.getCoordSysModel();
        if (true) {
          if (!gridModel) {
            throw new Error('Grid "' + retrieve3(xAxisModel.get("gridIndex"), xAxisModel.get("gridId"), 0) + '" not found');
          }
          if (xAxisModel.getCoordSysModel() !== yAxisModel.getCoordSysModel()) {
            throw new Error("xAxis and yAxis must use the same grid");
          }
        }
        var grid = gridModel.coordinateSystem;
        seriesModel.coordinateSystem = grid.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
      });
      return grids;
    };
    Grid2.dimensions = cartesian2DDimensions;
    return Grid2;
  }()
);
function isAxisUsedInTheGrid(axisModel, gridModel) {
  return axisModel.getCoordSysModel() === gridModel;
}
function fixAxisOnZero(axesMap, otherAxisDim, axis, onZeroRecords) {
  axis.getAxesOnZeroOf = function() {
    return otherAxisOnZeroOf ? [otherAxisOnZeroOf] : [];
  };
  var otherAxes = axesMap[otherAxisDim];
  var otherAxisOnZeroOf;
  var axisModel = axis.model;
  var onZero = axisModel.get(["axisLine", "onZero"]);
  var onZeroAxisIndex = axisModel.get(["axisLine", "onZeroAxisIndex"]);
  if (!onZero) {
    return;
  }
  if (onZeroAxisIndex != null) {
    if (canOnZeroToAxis(otherAxes[onZeroAxisIndex])) {
      otherAxisOnZeroOf = otherAxes[onZeroAxisIndex];
    }
  } else {
    for (var idx in otherAxes) {
      if (otherAxes.hasOwnProperty(idx) && canOnZeroToAxis(otherAxes[idx]) && !onZeroRecords[getOnZeroRecordKey(otherAxes[idx])]) {
        otherAxisOnZeroOf = otherAxes[idx];
        break;
      }
    }
  }
  if (otherAxisOnZeroOf) {
    onZeroRecords[getOnZeroRecordKey(otherAxisOnZeroOf)] = true;
  }
  function getOnZeroRecordKey(axis2) {
    return axis2.dim + "_" + axis2.index;
  }
}
function canOnZeroToAxis(axis) {
  return axis && axis.type !== "category" && axis.type !== "time" && ifAxisCrossZero(axis);
}
function updateAxisTransform(axis, coordBase) {
  var axisExtent = axis.getExtent();
  var axisExtentSum = axisExtent[0] + axisExtent[1];
  axis.toGlobalCoord = axis.dim === "x" ? function(coord) {
    return coord + coordBase;
  } : function(coord) {
    return axisExtentSum - coord + coordBase;
  };
  axis.toLocalCoord = axis.dim === "x" ? function(coord) {
    return coord - coordBase;
  } : function(coord) {
    return axisExtentSum - coord + coordBase;
  };
}
var Grid_default = Grid;

// node_modules/echarts/lib/component/axis/AxisBuilder.js
var PI = Math.PI;
var AxisBuilder = (
  /** @class */
  function() {
    function AxisBuilder2(axisModel, opt) {
      this.group = new Group_default();
      this.opt = opt;
      this.axisModel = axisModel;
      defaults(opt, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: true,
        handleAutoShown: function() {
          return true;
        }
      });
      var transformGroup = new Group_default({
        x: opt.position[0],
        y: opt.position[1],
        rotation: opt.rotation
      });
      transformGroup.updateTransform();
      this._transformGroup = transformGroup;
    }
    AxisBuilder2.prototype.hasBuilder = function(name) {
      return !!builders[name];
    };
    AxisBuilder2.prototype.add = function(name) {
      builders[name](this.opt, this.axisModel, this.group, this._transformGroup);
    };
    AxisBuilder2.prototype.getGroup = function() {
      return this.group;
    };
    AxisBuilder2.innerTextLayout = function(axisRotation, textRotation, direction) {
      var rotationDiff = remRadian(textRotation - axisRotation);
      var textAlign;
      var textVerticalAlign;
      if (isRadianAroundZero(rotationDiff)) {
        textVerticalAlign = direction > 0 ? "top" : "bottom";
        textAlign = "center";
      } else if (isRadianAroundZero(rotationDiff - PI)) {
        textVerticalAlign = direction > 0 ? "bottom" : "top";
        textAlign = "center";
      } else {
        textVerticalAlign = "middle";
        if (rotationDiff > 0 && rotationDiff < PI) {
          textAlign = direction > 0 ? "right" : "left";
        } else {
          textAlign = direction > 0 ? "left" : "right";
        }
      }
      return {
        rotation: rotationDiff,
        textAlign,
        textVerticalAlign
      };
    };
    AxisBuilder2.makeAxisEventDataBase = function(axisModel) {
      var eventData = {
        componentType: axisModel.mainType,
        componentIndex: axisModel.componentIndex
      };
      eventData[axisModel.mainType + "Index"] = axisModel.componentIndex;
      return eventData;
    };
    AxisBuilder2.isLabelSilent = function(axisModel) {
      var tooltipOpt = axisModel.get("tooltip");
      return axisModel.get("silent") || !(axisModel.get("triggerEvent") || tooltipOpt && tooltipOpt.show);
    };
    return AxisBuilder2;
  }()
);
var builders = {
  axisLine: function(opt, axisModel, group, transformGroup) {
    var shown = axisModel.get(["axisLine", "show"]);
    if (shown === "auto" && opt.handleAutoShown) {
      shown = opt.handleAutoShown("axisLine");
    }
    if (!shown) {
      return;
    }
    var extent = axisModel.axis.getExtent();
    var matrix = transformGroup.transform;
    var pt1 = [extent[0], 0];
    var pt2 = [extent[1], 0];
    var inverse = pt1[0] > pt2[0];
    if (matrix) {
      applyTransform(pt1, pt1, matrix);
      applyTransform(pt2, pt2, matrix);
    }
    var lineStyle = extend({
      lineCap: "round"
    }, axisModel.getModel(["axisLine", "lineStyle"]).getLineStyle());
    var line = new Line_default({
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: lineStyle,
      strokeContainThreshold: opt.strokeContainThreshold || 5,
      silent: true,
      z2: 1
    });
    subPixelOptimizeLine(line.shape, line.style.lineWidth);
    line.anid = "line";
    group.add(line);
    var arrows = axisModel.get(["axisLine", "symbol"]);
    if (arrows != null) {
      var arrowSize = axisModel.get(["axisLine", "symbolSize"]);
      if (isString(arrows)) {
        arrows = [arrows, arrows];
      }
      if (isString(arrowSize) || isNumber(arrowSize)) {
        arrowSize = [arrowSize, arrowSize];
      }
      var arrowOffset = normalizeSymbolOffset(axisModel.get(["axisLine", "symbolOffset"]) || 0, arrowSize);
      var symbolWidth_1 = arrowSize[0];
      var symbolHeight_1 = arrowSize[1];
      each([{
        rotate: opt.rotation + Math.PI / 2,
        offset: arrowOffset[0],
        r: 0
      }, {
        rotate: opt.rotation - Math.PI / 2,
        offset: arrowOffset[1],
        r: Math.sqrt((pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) + (pt1[1] - pt2[1]) * (pt1[1] - pt2[1]))
      }], function(point, index) {
        if (arrows[index] !== "none" && arrows[index] != null) {
          var symbol = createSymbol(arrows[index], -symbolWidth_1 / 2, -symbolHeight_1 / 2, symbolWidth_1, symbolHeight_1, lineStyle.stroke, true);
          var r = point.r + point.offset;
          var pt = inverse ? pt2 : pt1;
          symbol.attr({
            rotation: point.rotate,
            x: pt[0] + r * Math.cos(opt.rotation),
            y: pt[1] - r * Math.sin(opt.rotation),
            silent: true,
            z2: 11
          });
          group.add(symbol);
        }
      });
    }
  },
  axisTickLabel: function(opt, axisModel, group, transformGroup) {
    var ticksEls = buildAxisMajorTicks(group, transformGroup, axisModel, opt);
    var labelEls = buildAxisLabel(group, transformGroup, axisModel, opt);
    fixMinMaxLabelShow(axisModel, labelEls, ticksEls);
    buildAxisMinorTicks(group, transformGroup, axisModel, opt.tickDirection);
    if (axisModel.get(["axisLabel", "hideOverlap"])) {
      var labelList = prepareLayoutList(map(labelEls, function(label) {
        return {
          label,
          priority: label.z2,
          defaultAttr: {
            ignore: label.ignore
          }
        };
      }));
      hideOverlap(labelList);
    }
  },
  axisName: function(opt, axisModel, group, transformGroup) {
    var name = retrieve(opt.axisName, axisModel.get("name"));
    if (!name) {
      return;
    }
    var nameLocation = axisModel.get("nameLocation");
    var nameDirection = opt.nameDirection;
    var textStyleModel = axisModel.getModel("nameTextStyle");
    var gap = axisModel.get("nameGap") || 0;
    var extent = axisModel.axis.getExtent();
    var gapSignal = extent[0] > extent[1] ? -1 : 1;
    var pos = [
      nameLocation === "start" ? extent[0] - gapSignal * gap : nameLocation === "end" ? extent[1] + gapSignal * gap : (extent[0] + extent[1]) / 2,
      // Reuse labelOffset.
      isNameLocationCenter(nameLocation) ? opt.labelOffset + nameDirection * gap : 0
    ];
    var labelLayout;
    var nameRotation = axisModel.get("nameRotate");
    if (nameRotation != null) {
      nameRotation = nameRotation * PI / 180;
    }
    var axisNameAvailableWidth;
    if (isNameLocationCenter(nameLocation)) {
      labelLayout = AxisBuilder.innerTextLayout(
        opt.rotation,
        nameRotation != null ? nameRotation : opt.rotation,
        // Adapt to axis.
        nameDirection
      );
    } else {
      labelLayout = endTextLayout(opt.rotation, nameLocation, nameRotation || 0, extent);
      axisNameAvailableWidth = opt.axisNameAvailableWidth;
      if (axisNameAvailableWidth != null) {
        axisNameAvailableWidth = Math.abs(axisNameAvailableWidth / Math.sin(labelLayout.rotation));
        !isFinite(axisNameAvailableWidth) && (axisNameAvailableWidth = null);
      }
    }
    var textFont = textStyleModel.getFont();
    var truncateOpt = axisModel.get("nameTruncate", true) || {};
    var ellipsis = truncateOpt.ellipsis;
    var maxWidth = retrieve(opt.nameTruncateMaxWidth, truncateOpt.maxWidth, axisNameAvailableWidth);
    var textEl = new Text_default({
      x: pos[0],
      y: pos[1],
      rotation: labelLayout.rotation,
      silent: AxisBuilder.isLabelSilent(axisModel),
      style: createTextStyle(textStyleModel, {
        text: name,
        font: textFont,
        overflow: "truncate",
        width: maxWidth,
        ellipsis,
        fill: textStyleModel.getTextColor() || axisModel.get(["axisLine", "lineStyle", "color"]),
        align: textStyleModel.get("align") || labelLayout.textAlign,
        verticalAlign: textStyleModel.get("verticalAlign") || labelLayout.textVerticalAlign
      }),
      z2: 1
    });
    setTooltipConfig({
      el: textEl,
      componentModel: axisModel,
      itemName: name
    });
    textEl.__fullText = name;
    textEl.anid = "name";
    if (axisModel.get("triggerEvent")) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = "axisName";
      eventData.name = name;
      getECData(textEl).eventData = eventData;
    }
    transformGroup.add(textEl);
    textEl.updateTransform();
    group.add(textEl);
    textEl.decomposeTransform();
  }
};
function endTextLayout(rotation, textPosition, textRotate, extent) {
  var rotationDiff = remRadian(textRotate - rotation);
  var textAlign;
  var textVerticalAlign;
  var inverse = extent[0] > extent[1];
  var onLeft = textPosition === "start" && !inverse || textPosition !== "start" && inverse;
  if (isRadianAroundZero(rotationDiff - PI / 2)) {
    textVerticalAlign = onLeft ? "bottom" : "top";
    textAlign = "center";
  } else if (isRadianAroundZero(rotationDiff - PI * 1.5)) {
    textVerticalAlign = onLeft ? "top" : "bottom";
    textAlign = "center";
  } else {
    textVerticalAlign = "middle";
    if (rotationDiff < PI * 1.5 && rotationDiff > PI / 2) {
      textAlign = onLeft ? "left" : "right";
    } else {
      textAlign = onLeft ? "right" : "left";
    }
  }
  return {
    rotation: rotationDiff,
    textAlign,
    textVerticalAlign
  };
}
function fixMinMaxLabelShow(axisModel, labelEls, tickEls) {
  if (shouldShowAllLabels(axisModel.axis)) {
    return;
  }
  var showMinLabel = axisModel.get(["axisLabel", "showMinLabel"]);
  var showMaxLabel = axisModel.get(["axisLabel", "showMaxLabel"]);
  labelEls = labelEls || [];
  tickEls = tickEls || [];
  var firstLabel = labelEls[0];
  var nextLabel = labelEls[1];
  var lastLabel = labelEls[labelEls.length - 1];
  var prevLabel = labelEls[labelEls.length - 2];
  var firstTick = tickEls[0];
  var nextTick = tickEls[1];
  var lastTick = tickEls[tickEls.length - 1];
  var prevTick = tickEls[tickEls.length - 2];
  if (showMinLabel === false) {
    ignoreEl(firstLabel);
    ignoreEl(firstTick);
  } else if (isTwoLabelOverlapped(firstLabel, nextLabel)) {
    if (showMinLabel) {
      ignoreEl(nextLabel);
      ignoreEl(nextTick);
    } else {
      ignoreEl(firstLabel);
      ignoreEl(firstTick);
    }
  }
  if (showMaxLabel === false) {
    ignoreEl(lastLabel);
    ignoreEl(lastTick);
  } else if (isTwoLabelOverlapped(prevLabel, lastLabel)) {
    if (showMaxLabel) {
      ignoreEl(prevLabel);
      ignoreEl(prevTick);
    } else {
      ignoreEl(lastLabel);
      ignoreEl(lastTick);
    }
  }
}
function ignoreEl(el) {
  el && (el.ignore = true);
}
function isTwoLabelOverlapped(current, next) {
  var firstRect = current && current.getBoundingRect().clone();
  var nextRect = next && next.getBoundingRect().clone();
  if (!firstRect || !nextRect) {
    return;
  }
  var mRotationBack = identity([]);
  rotate(mRotationBack, mRotationBack, -current.rotation);
  firstRect.applyTransform(mul([], mRotationBack, current.getLocalTransform()));
  nextRect.applyTransform(mul([], mRotationBack, next.getLocalTransform()));
  return firstRect.intersect(nextRect);
}
function isNameLocationCenter(nameLocation) {
  return nameLocation === "middle" || nameLocation === "center";
}
function createTicks(ticksCoords, tickTransform, tickEndCoord, tickLineStyle, anidPrefix) {
  var tickEls = [];
  var pt1 = [];
  var pt2 = [];
  for (var i = 0; i < ticksCoords.length; i++) {
    var tickCoord = ticksCoords[i].coord;
    pt1[0] = tickCoord;
    pt1[1] = 0;
    pt2[0] = tickCoord;
    pt2[1] = tickEndCoord;
    if (tickTransform) {
      applyTransform(pt1, pt1, tickTransform);
      applyTransform(pt2, pt2, tickTransform);
    }
    var tickEl = new Line_default({
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: tickLineStyle,
      z2: 2,
      autoBatch: true,
      silent: true
    });
    subPixelOptimizeLine(tickEl.shape, tickEl.style.lineWidth);
    tickEl.anid = anidPrefix + "_" + ticksCoords[i].tickValue;
    tickEls.push(tickEl);
  }
  return tickEls;
}
function buildAxisMajorTicks(group, transformGroup, axisModel, opt) {
  var axis = axisModel.axis;
  var tickModel = axisModel.getModel("axisTick");
  var shown = tickModel.get("show");
  if (shown === "auto" && opt.handleAutoShown) {
    shown = opt.handleAutoShown("axisTick");
  }
  if (!shown || axis.scale.isBlank()) {
    return;
  }
  var lineStyleModel = tickModel.getModel("lineStyle");
  var tickEndCoord = opt.tickDirection * tickModel.get("length");
  var ticksCoords = axis.getTicksCoords();
  var ticksEls = createTicks(ticksCoords, transformGroup.transform, tickEndCoord, defaults(lineStyleModel.getLineStyle(), {
    stroke: axisModel.get(["axisLine", "lineStyle", "color"])
  }), "ticks");
  for (var i = 0; i < ticksEls.length; i++) {
    group.add(ticksEls[i]);
  }
  return ticksEls;
}
function buildAxisMinorTicks(group, transformGroup, axisModel, tickDirection) {
  var axis = axisModel.axis;
  var minorTickModel = axisModel.getModel("minorTick");
  if (!minorTickModel.get("show") || axis.scale.isBlank()) {
    return;
  }
  var minorTicksCoords = axis.getMinorTicksCoords();
  if (!minorTicksCoords.length) {
    return;
  }
  var lineStyleModel = minorTickModel.getModel("lineStyle");
  var tickEndCoord = tickDirection * minorTickModel.get("length");
  var minorTickLineStyle = defaults(lineStyleModel.getLineStyle(), defaults(axisModel.getModel("axisTick").getLineStyle(), {
    stroke: axisModel.get(["axisLine", "lineStyle", "color"])
  }));
  for (var i = 0; i < minorTicksCoords.length; i++) {
    var minorTicksEls = createTicks(minorTicksCoords[i], transformGroup.transform, tickEndCoord, minorTickLineStyle, "minorticks_" + i);
    for (var k = 0; k < minorTicksEls.length; k++) {
      group.add(minorTicksEls[k]);
    }
  }
}
function buildAxisLabel(group, transformGroup, axisModel, opt) {
  var axis = axisModel.axis;
  var show = retrieve(opt.axisLabelShow, axisModel.get(["axisLabel", "show"]));
  if (!show || axis.scale.isBlank()) {
    return;
  }
  var labelModel = axisModel.getModel("axisLabel");
  var labelMargin = labelModel.get("margin");
  var labels = axis.getViewLabels();
  var labelRotation = (retrieve(opt.labelRotate, labelModel.get("rotate")) || 0) * PI / 180;
  var labelLayout = AxisBuilder.innerTextLayout(opt.rotation, labelRotation, opt.labelDirection);
  var rawCategoryData = axisModel.getCategories && axisModel.getCategories(true);
  var labelEls = [];
  var silent = AxisBuilder.isLabelSilent(axisModel);
  var triggerEvent = axisModel.get("triggerEvent");
  each(labels, function(labelItem, index) {
    var tickValue = axis.scale.type === "ordinal" ? axis.scale.getRawOrdinalNumber(labelItem.tickValue) : labelItem.tickValue;
    var formattedLabel = labelItem.formattedLabel;
    var rawLabel = labelItem.rawLabel;
    var itemLabelModel = labelModel;
    if (rawCategoryData && rawCategoryData[tickValue]) {
      var rawCategoryItem = rawCategoryData[tickValue];
      if (isObject(rawCategoryItem) && rawCategoryItem.textStyle) {
        itemLabelModel = new Model_default(rawCategoryItem.textStyle, labelModel, axisModel.ecModel);
      }
    }
    var textColor = itemLabelModel.getTextColor() || axisModel.get(["axisLine", "lineStyle", "color"]);
    var tickCoord = axis.dataToCoord(tickValue);
    var align = itemLabelModel.getShallow("align", true) || labelLayout.textAlign;
    var alignMin = retrieve2(itemLabelModel.getShallow("alignMinLabel", true), align);
    var alignMax = retrieve2(itemLabelModel.getShallow("alignMaxLabel", true), align);
    var verticalAlign = itemLabelModel.getShallow("verticalAlign", true) || itemLabelModel.getShallow("baseline", true) || labelLayout.textVerticalAlign;
    var verticalAlignMin = retrieve2(itemLabelModel.getShallow("verticalAlignMinLabel", true), verticalAlign);
    var verticalAlignMax = retrieve2(itemLabelModel.getShallow("verticalAlignMaxLabel", true), verticalAlign);
    var textEl = new Text_default({
      x: tickCoord,
      y: opt.labelOffset + opt.labelDirection * labelMargin,
      rotation: labelLayout.rotation,
      silent,
      z2: 10 + (labelItem.level || 0),
      style: createTextStyle(itemLabelModel, {
        text: formattedLabel,
        align: index === 0 ? alignMin : index === labels.length - 1 ? alignMax : align,
        verticalAlign: index === 0 ? verticalAlignMin : index === labels.length - 1 ? verticalAlignMax : verticalAlign,
        fill: isFunction(textColor) ? textColor(
          // (1) In category axis with data zoom, tick is not the original
          // index of axis.data. So tick should not be exposed to user
          // in category axis.
          // (2) Compatible with previous version, which always use formatted label as
          // input. But in interval scale the formatted label is like '223,445', which
          // maked user replace ','. So we modify it to return original val but remain
          // it as 'string' to avoid error in replacing.
          axis.type === "category" ? rawLabel : axis.type === "value" ? tickValue + "" : tickValue,
          index
        ) : textColor
      })
    });
    textEl.anid = "label_" + tickValue;
    setTooltipConfig({
      el: textEl,
      componentModel: axisModel,
      itemName: formattedLabel,
      formatterParamsExtra: {
        isTruncated: function() {
          return textEl.isTruncated;
        },
        value: rawLabel,
        tickIndex: index
      }
    });
    if (triggerEvent) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = "axisLabel";
      eventData.value = rawLabel;
      eventData.tickIndex = index;
      if (axis.type === "category") {
        eventData.dataIndex = tickValue;
      }
      getECData(textEl).eventData = eventData;
    }
    transformGroup.add(textEl);
    textEl.updateTransform();
    labelEls.push(textEl);
    group.add(textEl);
    textEl.decomposeTransform();
  });
  return labelEls;
}
var AxisBuilder_default = AxisBuilder;

// node_modules/echarts/lib/component/axisPointer/modelHelper.js
function collect(ecModel, api) {
  var result = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      triggerEmphasis,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: false,
    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  collectAxesInfo(result, ecModel, api);
  result.seriesInvolved && collectSeriesInfo(result, ecModel);
  return result;
}
function collectAxesInfo(result, ecModel, api) {
  var globalTooltipModel = ecModel.getComponent("tooltip");
  var globalAxisPointerModel = ecModel.getComponent("axisPointer");
  var linksOption = globalAxisPointerModel.get("link", true) || [];
  var linkGroups = [];
  each(api.getCoordinateSystems(), function(coordSys) {
    if (!coordSys.axisPointerEnabled) {
      return;
    }
    var coordSysKey = makeKey(coordSys.model);
    var axesInfoInCoordSys = result.coordSysAxesInfo[coordSysKey] = {};
    result.coordSysMap[coordSysKey] = coordSys;
    var coordSysModel = coordSys.model;
    var baseTooltipModel = coordSysModel.getModel("tooltip", globalTooltipModel);
    each(coordSys.getAxes(), curry(saveTooltipAxisInfo, false, null));
    if (coordSys.getTooltipAxes && globalTooltipModel && baseTooltipModel.get("show")) {
      var triggerAxis = baseTooltipModel.get("trigger") === "axis";
      var cross = baseTooltipModel.get(["axisPointer", "type"]) === "cross";
      var tooltipAxes = coordSys.getTooltipAxes(baseTooltipModel.get(["axisPointer", "axis"]));
      if (triggerAxis || cross) {
        each(tooltipAxes.baseAxes, curry(saveTooltipAxisInfo, cross ? "cross" : true, triggerAxis));
      }
      if (cross) {
        each(tooltipAxes.otherAxes, curry(saveTooltipAxisInfo, "cross", false));
      }
    }
    function saveTooltipAxisInfo(fromTooltip, triggerTooltip, axis) {
      var axisPointerModel = axis.model.getModel("axisPointer", globalAxisPointerModel);
      var axisPointerShow = axisPointerModel.get("show");
      if (!axisPointerShow || axisPointerShow === "auto" && !fromTooltip && !isHandleTrigger(axisPointerModel)) {
        return;
      }
      if (triggerTooltip == null) {
        triggerTooltip = axisPointerModel.get("triggerTooltip");
      }
      axisPointerModel = fromTooltip ? makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) : axisPointerModel;
      var snap = axisPointerModel.get("snap");
      var triggerEmphasis = axisPointerModel.get("triggerEmphasis");
      var axisKey = makeKey(axis.model);
      var involveSeries = triggerTooltip || snap || axis.type === "category";
      var axisInfo = result.axesInfo[axisKey] = {
        key: axisKey,
        axis,
        coordSys,
        axisPointerModel,
        triggerTooltip,
        triggerEmphasis,
        involveSeries,
        snap,
        useHandle: isHandleTrigger(axisPointerModel),
        seriesModels: [],
        linkGroup: null
      };
      axesInfoInCoordSys[axisKey] = axisInfo;
      result.seriesInvolved = result.seriesInvolved || involveSeries;
      var groupIndex = getLinkGroupIndex(linksOption, axis);
      if (groupIndex != null) {
        var linkGroup = linkGroups[groupIndex] || (linkGroups[groupIndex] = {
          axesInfo: {}
        });
        linkGroup.axesInfo[axisKey] = axisInfo;
        linkGroup.mapper = linksOption[groupIndex].mapper;
        axisInfo.linkGroup = linkGroup;
      }
    }
  });
}
function makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) {
  var tooltipAxisPointerModel = baseTooltipModel.getModel("axisPointer");
  var fields = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"];
  var volatileOption = {};
  each(fields, function(field) {
    volatileOption[field] = clone(tooltipAxisPointerModel.get(field));
  });
  volatileOption.snap = axis.type !== "category" && !!triggerTooltip;
  if (tooltipAxisPointerModel.get("type") === "cross") {
    volatileOption.type = "line";
  }
  var labelOption = volatileOption.label || (volatileOption.label = {});
  labelOption.show == null && (labelOption.show = false);
  if (fromTooltip === "cross") {
    var tooltipAxisPointerLabelShow = tooltipAxisPointerModel.get(["label", "show"]);
    labelOption.show = tooltipAxisPointerLabelShow != null ? tooltipAxisPointerLabelShow : true;
    if (!triggerTooltip) {
      var crossStyle = volatileOption.lineStyle = tooltipAxisPointerModel.get("crossStyle");
      crossStyle && defaults(labelOption, crossStyle.textStyle);
    }
  }
  return axis.model.getModel("axisPointer", new Model_default(volatileOption, globalAxisPointerModel, ecModel));
}
function collectSeriesInfo(result, ecModel) {
  ecModel.eachSeries(function(seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var seriesTooltipTrigger = seriesModel.get(["tooltip", "trigger"], true);
    var seriesTooltipShow = seriesModel.get(["tooltip", "show"], true);
    if (!coordSys || seriesTooltipTrigger === "none" || seriesTooltipTrigger === false || seriesTooltipTrigger === "item" || seriesTooltipShow === false || seriesModel.get(["axisPointer", "show"], true) === false) {
      return;
    }
    each(result.coordSysAxesInfo[makeKey(coordSys.model)], function(axisInfo) {
      var axis = axisInfo.axis;
      if (coordSys.getAxis(axis.dim) === axis) {
        axisInfo.seriesModels.push(seriesModel);
        axisInfo.seriesDataCount == null && (axisInfo.seriesDataCount = 0);
        axisInfo.seriesDataCount += seriesModel.getData().count();
      }
    });
  });
}
function getLinkGroupIndex(linksOption, axis) {
  var axisModel = axis.model;
  var dim = axis.dim;
  for (var i = 0; i < linksOption.length; i++) {
    var linkOption = linksOption[i] || {};
    if (checkPropInLink(linkOption[dim + "AxisId"], axisModel.id) || checkPropInLink(linkOption[dim + "AxisIndex"], axisModel.componentIndex) || checkPropInLink(linkOption[dim + "AxisName"], axisModel.name)) {
      return i;
    }
  }
}
function checkPropInLink(linkPropValue, axisPropValue) {
  return linkPropValue === "all" || isArray(linkPropValue) && indexOf(linkPropValue, axisPropValue) >= 0 || linkPropValue === axisPropValue;
}
function fixValue(axisModel) {
  var axisInfo = getAxisInfo(axisModel);
  if (!axisInfo) {
    return;
  }
  var axisPointerModel = axisInfo.axisPointerModel;
  var scale2 = axisInfo.axis.scale;
  var option = axisPointerModel.option;
  var status = axisPointerModel.get("status");
  var value = axisPointerModel.get("value");
  if (value != null) {
    value = scale2.parse(value);
  }
  var useHandle = isHandleTrigger(axisPointerModel);
  if (status == null) {
    option.status = useHandle ? "show" : "hide";
  }
  var extent = scale2.getExtent().slice();
  extent[0] > extent[1] && extent.reverse();
  if (
    // Pick a value on axis when initializing.
    value == null || value > extent[1]
  ) {
    value = extent[1];
  }
  if (value < extent[0]) {
    value = extent[0];
  }
  option.value = value;
  if (useHandle) {
    option.status = axisInfo.axis.scale.isBlank() ? "hide" : "show";
  }
}
function getAxisInfo(axisModel) {
  var coordSysAxesInfo = (axisModel.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return coordSysAxesInfo && coordSysAxesInfo.axesInfo[makeKey(axisModel)];
}
function getAxisPointerModel(axisModel) {
  var axisInfo = getAxisInfo(axisModel);
  return axisInfo && axisInfo.axisPointerModel;
}
function isHandleTrigger(axisPointerModel) {
  return !!axisPointerModel.get(["handle", "show"]);
}
function makeKey(model) {
  return model.type + "||" + model.id;
}

// node_modules/echarts/lib/component/axis/AxisView.js
var axisPointerClazz = {};
var AxisView = (
  /** @class */
  function(_super) {
    __extends(AxisView2, _super);
    function AxisView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = AxisView2.type;
      return _this;
    }
    AxisView2.prototype.render = function(axisModel, ecModel, api, payload) {
      this.axisPointerClass && fixValue(axisModel);
      _super.prototype.render.apply(this, arguments);
      this._doUpdateAxisPointerClass(axisModel, api, true);
    };
    AxisView2.prototype.updateAxisPointer = function(axisModel, ecModel, api, payload) {
      this._doUpdateAxisPointerClass(axisModel, api, false);
    };
    AxisView2.prototype.remove = function(ecModel, api) {
      var axisPointer = this._axisPointer;
      axisPointer && axisPointer.remove(api);
    };
    AxisView2.prototype.dispose = function(ecModel, api) {
      this._disposeAxisPointer(api);
      _super.prototype.dispose.apply(this, arguments);
    };
    AxisView2.prototype._doUpdateAxisPointerClass = function(axisModel, api, forceRender) {
      var Clazz = AxisView2.getAxisPointerClass(this.axisPointerClass);
      if (!Clazz) {
        return;
      }
      var axisPointerModel = getAxisPointerModel(axisModel);
      axisPointerModel ? (this._axisPointer || (this._axisPointer = new Clazz())).render(axisModel, axisPointerModel, api, forceRender) : this._disposeAxisPointer(api);
    };
    AxisView2.prototype._disposeAxisPointer = function(api) {
      this._axisPointer && this._axisPointer.dispose(api);
      this._axisPointer = null;
    };
    AxisView2.registerAxisPointerClass = function(type, clazz) {
      if (true) {
        if (axisPointerClazz[type]) {
          throw new Error("axisPointer " + type + " exists");
        }
      }
      axisPointerClazz[type] = clazz;
    };
    ;
    AxisView2.getAxisPointerClass = function(type) {
      return type && axisPointerClazz[type];
    };
    ;
    AxisView2.type = "axis";
    return AxisView2;
  }(Component_default2)
);
var AxisView_default = AxisView;

// node_modules/echarts/lib/component/axis/axisSplitHelper.js
var inner = makeInner();
function rectCoordAxisBuildSplitArea(axisView, axisGroup, axisModel, gridModel) {
  var axis = axisModel.axis;
  if (axis.scale.isBlank()) {
    return;
  }
  var splitAreaModel = axisModel.getModel("splitArea");
  var areaStyleModel = splitAreaModel.getModel("areaStyle");
  var areaColors = areaStyleModel.get("color");
  var gridRect = gridModel.coordinateSystem.getRect();
  var ticksCoords = axis.getTicksCoords({
    tickModel: splitAreaModel,
    clamp: true
  });
  if (!ticksCoords.length) {
    return;
  }
  var areaColorsLen = areaColors.length;
  var lastSplitAreaColors = inner(axisView).splitAreaColors;
  var newSplitAreaColors = createHashMap();
  var colorIndex = 0;
  if (lastSplitAreaColors) {
    for (var i = 0; i < ticksCoords.length; i++) {
      var cIndex = lastSplitAreaColors.get(ticksCoords[i].tickValue);
      if (cIndex != null) {
        colorIndex = (cIndex + (areaColorsLen - 1) * i) % areaColorsLen;
        break;
      }
    }
  }
  var prev = axis.toGlobalCoord(ticksCoords[0].coord);
  var areaStyle = areaStyleModel.getAreaStyle();
  areaColors = isArray(areaColors) ? areaColors : [areaColors];
  for (var i = 1; i < ticksCoords.length; i++) {
    var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);
    var x = void 0;
    var y = void 0;
    var width = void 0;
    var height = void 0;
    if (axis.isHorizontal()) {
      x = prev;
      y = gridRect.y;
      width = tickCoord - x;
      height = gridRect.height;
      prev = x + width;
    } else {
      x = gridRect.x;
      y = prev;
      width = gridRect.width;
      height = tickCoord - y;
      prev = y + height;
    }
    var tickValue = ticksCoords[i - 1].tickValue;
    tickValue != null && newSplitAreaColors.set(tickValue, colorIndex);
    axisGroup.add(new Rect_default({
      anid: tickValue != null ? "area_" + tickValue : null,
      shape: {
        x,
        y,
        width,
        height
      },
      style: defaults({
        fill: areaColors[colorIndex]
      }, areaStyle),
      autoBatch: true,
      silent: true
    }));
    colorIndex = (colorIndex + 1) % areaColorsLen;
  }
  inner(axisView).splitAreaColors = newSplitAreaColors;
}
function rectCoordAxisHandleRemove(axisView) {
  inner(axisView).splitAreaColors = null;
}

// node_modules/echarts/lib/component/axis/CartesianAxisView.js
var axisBuilderAttrs = ["axisLine", "axisTickLabel", "axisName"];
var selfBuilderAttrs = ["splitArea", "splitLine", "minorSplitLine"];
var CartesianAxisView = (
  /** @class */
  function(_super) {
    __extends(CartesianAxisView2, _super);
    function CartesianAxisView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = CartesianAxisView2.type;
      _this.axisPointerClass = "CartesianAxisPointer";
      return _this;
    }
    CartesianAxisView2.prototype.render = function(axisModel, ecModel, api, payload) {
      this.group.removeAll();
      var oldAxisGroup = this._axisGroup;
      this._axisGroup = new Group_default();
      this.group.add(this._axisGroup);
      if (!axisModel.get("show")) {
        return;
      }
      var gridModel = axisModel.getCoordSysModel();
      var layout2 = layout(gridModel, axisModel);
      var axisBuilder = new AxisBuilder_default(axisModel, extend({
        handleAutoShown: function(elementType) {
          var cartesians = gridModel.coordinateSystem.getCartesians();
          for (var i = 0; i < cartesians.length; i++) {
            if (isIntervalOrLogScale(cartesians[i].getOtherAxis(axisModel.axis).scale)) {
              return true;
            }
          }
          return false;
        }
      }, layout2));
      each(axisBuilderAttrs, axisBuilder.add, axisBuilder);
      this._axisGroup.add(axisBuilder.getGroup());
      each(selfBuilderAttrs, function(name) {
        if (axisModel.get([name, "show"])) {
          axisElementBuilders[name](this, this._axisGroup, axisModel, gridModel);
        }
      }, this);
      var isInitialSortFromBarRacing = payload && payload.type === "changeAxisOrder" && payload.isInitSort;
      if (!isInitialSortFromBarRacing) {
        groupTransition(oldAxisGroup, this._axisGroup, axisModel);
      }
      _super.prototype.render.call(this, axisModel, ecModel, api, payload);
    };
    CartesianAxisView2.prototype.remove = function() {
      rectCoordAxisHandleRemove(this);
    };
    CartesianAxisView2.type = "cartesianAxis";
    return CartesianAxisView2;
  }(AxisView_default)
);
var axisElementBuilders = {
  splitLine: function(axisView, axisGroup, axisModel, gridModel) {
    var axis = axisModel.axis;
    if (axis.scale.isBlank()) {
      return;
    }
    var splitLineModel = axisModel.getModel("splitLine");
    var lineStyleModel = splitLineModel.getModel("lineStyle");
    var lineColors = lineStyleModel.get("color");
    var showMinLine = splitLineModel.get("showMinLine") !== false;
    var showMaxLine = splitLineModel.get("showMaxLine") !== false;
    lineColors = isArray(lineColors) ? lineColors : [lineColors];
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var lineCount = 0;
    var ticksCoords = axis.getTicksCoords({
      tickModel: splitLineModel
    });
    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();
    for (var i = 0; i < ticksCoords.length; i++) {
      var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);
      if (i === 0 && !showMinLine || i === ticksCoords.length - 1 && !showMaxLine) {
        continue;
      }
      var tickValue = ticksCoords[i].tickValue;
      if (isHorizontal) {
        p1[0] = tickCoord;
        p1[1] = gridRect.y;
        p2[0] = tickCoord;
        p2[1] = gridRect.y + gridRect.height;
      } else {
        p1[0] = gridRect.x;
        p1[1] = tickCoord;
        p2[0] = gridRect.x + gridRect.width;
        p2[1] = tickCoord;
      }
      var colorIndex = lineCount++ % lineColors.length;
      var line = new Line_default({
        anid: tickValue != null ? "line_" + tickValue : null,
        autoBatch: true,
        shape: {
          x1: p1[0],
          y1: p1[1],
          x2: p2[0],
          y2: p2[1]
        },
        style: defaults({
          stroke: lineColors[colorIndex]
        }, lineStyle),
        silent: true
      });
      subPixelOptimizeLine(line.shape, lineStyle.lineWidth);
      axisGroup.add(line);
    }
  },
  minorSplitLine: function(axisView, axisGroup, axisModel, gridModel) {
    var axis = axisModel.axis;
    var minorSplitLineModel = axisModel.getModel("minorSplitLine");
    var lineStyleModel = minorSplitLineModel.getModel("lineStyle");
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var minorTicksCoords = axis.getMinorTicksCoords();
    if (!minorTicksCoords.length) {
      return;
    }
    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();
    for (var i = 0; i < minorTicksCoords.length; i++) {
      for (var k = 0; k < minorTicksCoords[i].length; k++) {
        var tickCoord = axis.toGlobalCoord(minorTicksCoords[i][k].coord);
        if (isHorizontal) {
          p1[0] = tickCoord;
          p1[1] = gridRect.y;
          p2[0] = tickCoord;
          p2[1] = gridRect.y + gridRect.height;
        } else {
          p1[0] = gridRect.x;
          p1[1] = tickCoord;
          p2[0] = gridRect.x + gridRect.width;
          p2[1] = tickCoord;
        }
        var line = new Line_default({
          anid: "minor_line_" + minorTicksCoords[i][k].tickValue,
          autoBatch: true,
          shape: {
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1]
          },
          style: lineStyle,
          silent: true
        });
        subPixelOptimizeLine(line.shape, lineStyle.lineWidth);
        axisGroup.add(line);
      }
    }
  },
  splitArea: function(axisView, axisGroup, axisModel, gridModel) {
    rectCoordAxisBuildSplitArea(axisView, axisGroup, axisModel, gridModel);
  }
};
var CartesianXAxisView = (
  /** @class */
  function(_super) {
    __extends(CartesianXAxisView2, _super);
    function CartesianXAxisView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = CartesianXAxisView2.type;
      return _this;
    }
    CartesianXAxisView2.type = "xAxis";
    return CartesianXAxisView2;
  }(CartesianAxisView)
);
var CartesianYAxisView = (
  /** @class */
  function(_super) {
    __extends(CartesianYAxisView2, _super);
    function CartesianYAxisView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = CartesianXAxisView.type;
      return _this;
    }
    CartesianYAxisView2.type = "yAxis";
    return CartesianYAxisView2;
  }(CartesianAxisView)
);

// node_modules/echarts/lib/component/grid/installSimple.js
var GridView = (
  /** @class */
  function(_super) {
    __extends(GridView2, _super);
    function GridView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "grid";
      return _this;
    }
    GridView2.prototype.render = function(gridModel, ecModel) {
      this.group.removeAll();
      if (gridModel.get("show")) {
        this.group.add(new Rect_default({
          shape: gridModel.coordinateSystem.getRect(),
          style: defaults({
            fill: gridModel.get("backgroundColor")
          }, gridModel.getItemStyle()),
          silent: true,
          z2: -1
        }));
      }
    };
    GridView2.type = "grid";
    return GridView2;
  }(Component_default2)
);
var extraOption = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function install(registers) {
  registers.registerComponentView(GridView);
  registers.registerComponentModel(GridModel_default);
  registers.registerCoordinateSystem("cartesian2d", Grid_default);
  axisModelCreator(registers, "x", CartesianAxisModel, extraOption);
  axisModelCreator(registers, "y", CartesianAxisModel, extraOption);
  registers.registerComponentView(CartesianXAxisView);
  registers.registerComponentView(CartesianYAxisView);
  registers.registerPreprocessor(function(option) {
    if (option.xAxis && option.yAxis && !option.grid) {
      option.grid = {};
    }
  });
}

// node_modules/echarts/lib/coord/radar/RadarModel.js
var valueAxisDefault = axisDefault_default.value;
function defaultsShow(opt, show) {
  return defaults({
    show
  }, opt);
}
var RadarModel = (
  /** @class */
  function(_super) {
    __extends(RadarModel2, _super);
    function RadarModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = RadarModel2.type;
      return _this;
    }
    RadarModel2.prototype.optionUpdated = function() {
      var boundaryGap = this.get("boundaryGap");
      var splitNumber = this.get("splitNumber");
      var scale2 = this.get("scale");
      var axisLine = this.get("axisLine");
      var axisTick = this.get("axisTick");
      var axisLabel = this.get("axisLabel");
      var nameTextStyle = this.get("axisName");
      var showName = this.get(["axisName", "show"]);
      var nameFormatter = this.get(["axisName", "formatter"]);
      var nameGap = this.get("axisNameGap");
      var triggerEvent = this.get("triggerEvent");
      var indicatorModels = map(this.get("indicator") || [], function(indicatorOpt) {
        if (indicatorOpt.max != null && indicatorOpt.max > 0 && !indicatorOpt.min) {
          indicatorOpt.min = 0;
        } else if (indicatorOpt.min != null && indicatorOpt.min < 0 && !indicatorOpt.max) {
          indicatorOpt.max = 0;
        }
        var iNameTextStyle = nameTextStyle;
        if (indicatorOpt.color != null) {
          iNameTextStyle = defaults({
            color: indicatorOpt.color
          }, nameTextStyle);
        }
        var innerIndicatorOpt = merge(clone(indicatorOpt), {
          boundaryGap,
          splitNumber,
          scale: scale2,
          axisLine,
          axisTick,
          // axisType: axisType,
          axisLabel,
          // Compatible with 2 and use text
          name: indicatorOpt.text,
          showName,
          nameLocation: "end",
          nameGap,
          // min: 0,
          nameTextStyle: iNameTextStyle,
          triggerEvent
        }, false);
        if (isString(nameFormatter)) {
          var indName = innerIndicatorOpt.name;
          innerIndicatorOpt.name = nameFormatter.replace("{value}", indName != null ? indName : "");
        } else if (isFunction(nameFormatter)) {
          innerIndicatorOpt.name = nameFormatter(innerIndicatorOpt.name, innerIndicatorOpt);
        }
        var model = new Model_default(innerIndicatorOpt, null, this.ecModel);
        mixin(model, AxisModelCommonMixin.prototype);
        model.mainType = "radar";
        model.componentIndex = this.componentIndex;
        return model;
      }, this);
      this._indicatorModels = indicatorModels;
    };
    RadarModel2.prototype.getIndicatorModels = function() {
      return this._indicatorModels;
    };
    RadarModel2.type = "radar";
    RadarModel2.defaultOption = {
      // zlevel: 0,
      z: 0,
      center: ["50%", "50%"],
      radius: "75%",
      startAngle: 90,
      axisName: {
        show: true
        // formatter: null
        // textStyle: {}
      },
      boundaryGap: [0, 0],
      splitNumber: 5,
      axisNameGap: 15,
      scale: false,
      // Polygon or circle
      shape: "polygon",
      axisLine: merge({
        lineStyle: {
          color: "#bbb"
        }
      }, valueAxisDefault.axisLine),
      axisLabel: defaultsShow(valueAxisDefault.axisLabel, false),
      axisTick: defaultsShow(valueAxisDefault.axisTick, false),
      // axisType: 'value',
      splitLine: defaultsShow(valueAxisDefault.splitLine, true),
      splitArea: defaultsShow(valueAxisDefault.splitArea, true),
      // {text, min, max}
      indicator: []
    };
    return RadarModel2;
  }(Component_default)
);
var RadarModel_default = RadarModel;

// node_modules/echarts/lib/component/radar/RadarView.js
var axisBuilderAttrs2 = ["axisLine", "axisTickLabel", "axisName"];
var RadarView = (
  /** @class */
  function(_super) {
    __extends(RadarView2, _super);
    function RadarView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = RadarView2.type;
      return _this;
    }
    RadarView2.prototype.render = function(radarModel, ecModel, api) {
      var group = this.group;
      group.removeAll();
      this._buildAxes(radarModel);
      this._buildSplitLineAndArea(radarModel);
    };
    RadarView2.prototype._buildAxes = function(radarModel) {
      var radar = radarModel.coordinateSystem;
      var indicatorAxes = radar.getIndicatorAxes();
      var axisBuilders = map(indicatorAxes, function(indicatorAxis) {
        var axisName = indicatorAxis.model.get("showName") ? indicatorAxis.name : "";
        var axisBuilder = new AxisBuilder_default(indicatorAxis.model, {
          axisName,
          position: [radar.cx, radar.cy],
          rotation: indicatorAxis.angle,
          labelDirection: -1,
          tickDirection: -1,
          nameDirection: 1
        });
        return axisBuilder;
      });
      each(axisBuilders, function(axisBuilder) {
        each(axisBuilderAttrs2, axisBuilder.add, axisBuilder);
        this.group.add(axisBuilder.getGroup());
      }, this);
    };
    RadarView2.prototype._buildSplitLineAndArea = function(radarModel) {
      var radar = radarModel.coordinateSystem;
      var indicatorAxes = radar.getIndicatorAxes();
      if (!indicatorAxes.length) {
        return;
      }
      var shape = radarModel.get("shape");
      var splitLineModel = radarModel.getModel("splitLine");
      var splitAreaModel = radarModel.getModel("splitArea");
      var lineStyleModel = splitLineModel.getModel("lineStyle");
      var areaStyleModel = splitAreaModel.getModel("areaStyle");
      var showSplitLine = splitLineModel.get("show");
      var showSplitArea = splitAreaModel.get("show");
      var splitLineColors = lineStyleModel.get("color");
      var splitAreaColors = areaStyleModel.get("color");
      var splitLineColorsArr = isArray(splitLineColors) ? splitLineColors : [splitLineColors];
      var splitAreaColorsArr = isArray(splitAreaColors) ? splitAreaColors : [splitAreaColors];
      var splitLines = [];
      var splitAreas = [];
      function getColorIndex(areaOrLine, areaOrLineColorList, idx) {
        var colorIndex2 = idx % areaOrLineColorList.length;
        areaOrLine[colorIndex2] = areaOrLine[colorIndex2] || [];
        return colorIndex2;
      }
      if (shape === "circle") {
        var ticksRadius = indicatorAxes[0].getTicksCoords();
        var cx = radar.cx;
        var cy = radar.cy;
        for (var i = 0; i < ticksRadius.length; i++) {
          if (showSplitLine) {
            var colorIndex = getColorIndex(splitLines, splitLineColorsArr, i);
            splitLines[colorIndex].push(new Circle_default({
              shape: {
                cx,
                cy,
                r: ticksRadius[i].coord
              }
            }));
          }
          if (showSplitArea && i < ticksRadius.length - 1) {
            var colorIndex = getColorIndex(splitAreas, splitAreaColorsArr, i);
            splitAreas[colorIndex].push(new Ring_default({
              shape: {
                cx,
                cy,
                r0: ticksRadius[i].coord,
                r: ticksRadius[i + 1].coord
              }
            }));
          }
        }
      } else {
        var realSplitNumber_1;
        var axesTicksPoints = map(indicatorAxes, function(indicatorAxis, idx) {
          var ticksCoords = indicatorAxis.getTicksCoords();
          realSplitNumber_1 = realSplitNumber_1 == null ? ticksCoords.length - 1 : Math.min(ticksCoords.length - 1, realSplitNumber_1);
          return map(ticksCoords, function(tickCoord) {
            return radar.coordToPoint(tickCoord.coord, idx);
          });
        });
        var prevPoints = [];
        for (var i = 0; i <= realSplitNumber_1; i++) {
          var points3 = [];
          for (var j = 0; j < indicatorAxes.length; j++) {
            points3.push(axesTicksPoints[j][i]);
          }
          if (points3[0]) {
            points3.push(points3[0].slice());
          } else {
            if (true) {
              console.error("Can't draw value axis " + i);
            }
          }
          if (showSplitLine) {
            var colorIndex = getColorIndex(splitLines, splitLineColorsArr, i);
            splitLines[colorIndex].push(new Polyline_default({
              shape: {
                points: points3
              }
            }));
          }
          if (showSplitArea && prevPoints) {
            var colorIndex = getColorIndex(splitAreas, splitAreaColorsArr, i - 1);
            splitAreas[colorIndex].push(new Polygon_default({
              shape: {
                points: points3.concat(prevPoints)
              }
            }));
          }
          prevPoints = points3.slice().reverse();
        }
      }
      var lineStyle = lineStyleModel.getLineStyle();
      var areaStyle = areaStyleModel.getAreaStyle();
      each(splitAreas, function(splitAreas2, idx) {
        this.group.add(mergePath(splitAreas2, {
          style: defaults({
            stroke: "none",
            fill: splitAreaColorsArr[idx % splitAreaColorsArr.length]
          }, areaStyle),
          silent: true
        }));
      }, this);
      each(splitLines, function(splitLines2, idx) {
        this.group.add(mergePath(splitLines2, {
          style: defaults({
            fill: "none",
            stroke: splitLineColorsArr[idx % splitLineColorsArr.length]
          }, lineStyle),
          silent: true
        }));
      }, this);
    };
    RadarView2.type = "radar";
    return RadarView2;
  }(Component_default2)
);
var RadarView_default = RadarView;

// node_modules/echarts/lib/coord/radar/IndicatorAxis.js
var IndicatorAxis = (
  /** @class */
  function(_super) {
    __extends(IndicatorAxis2, _super);
    function IndicatorAxis2(dim, scale2, radiusExtent) {
      var _this = _super.call(this, dim, scale2, radiusExtent) || this;
      _this.type = "value";
      _this.angle = 0;
      _this.name = "";
      return _this;
    }
    return IndicatorAxis2;
  }(Axis_default)
);
var IndicatorAxis_default = IndicatorAxis;

// node_modules/echarts/lib/coord/radar/Radar.js
var Radar = (
  /** @class */
  function() {
    function Radar2(radarModel, ecModel, api) {
      this.dimensions = [];
      this._model = radarModel;
      this._indicatorAxes = map(radarModel.getIndicatorModels(), function(indicatorModel, idx) {
        var dim = "indicator_" + idx;
        var indicatorAxis = new IndicatorAxis_default(
          dim,
          new Interval_default()
          // (indicatorModel.get('axisType') === 'log') ? new LogScale() : new IntervalScale()
        );
        indicatorAxis.name = indicatorModel.get("name");
        indicatorAxis.model = indicatorModel;
        indicatorModel.axis = indicatorAxis;
        this.dimensions.push(dim);
        return indicatorAxis;
      }, this);
      this.resize(radarModel, api);
    }
    Radar2.prototype.getIndicatorAxes = function() {
      return this._indicatorAxes;
    };
    Radar2.prototype.dataToPoint = function(value, indicatorIndex) {
      var indicatorAxis = this._indicatorAxes[indicatorIndex];
      return this.coordToPoint(indicatorAxis.dataToCoord(value), indicatorIndex);
    };
    Radar2.prototype.coordToPoint = function(coord, indicatorIndex) {
      var indicatorAxis = this._indicatorAxes[indicatorIndex];
      var angle = indicatorAxis.angle;
      var x = this.cx + coord * Math.cos(angle);
      var y = this.cy - coord * Math.sin(angle);
      return [x, y];
    };
    Radar2.prototype.pointToData = function(pt) {
      var dx = pt[0] - this.cx;
      var dy = pt[1] - this.cy;
      var radius = Math.sqrt(dx * dx + dy * dy);
      dx /= radius;
      dy /= radius;
      var radian = Math.atan2(-dy, dx);
      var minRadianDiff = Infinity;
      var closestAxis;
      var closestAxisIdx = -1;
      for (var i = 0; i < this._indicatorAxes.length; i++) {
        var indicatorAxis = this._indicatorAxes[i];
        var diff = Math.abs(radian - indicatorAxis.angle);
        if (diff < minRadianDiff) {
          closestAxis = indicatorAxis;
          closestAxisIdx = i;
          minRadianDiff = diff;
        }
      }
      return [closestAxisIdx, +(closestAxis && closestAxis.coordToData(radius))];
    };
    Radar2.prototype.resize = function(radarModel, api) {
      var center = radarModel.get("center");
      var viewWidth = api.getWidth();
      var viewHeight = api.getHeight();
      var viewSize = Math.min(viewWidth, viewHeight) / 2;
      this.cx = parsePercent(center[0], viewWidth);
      this.cy = parsePercent(center[1], viewHeight);
      this.startAngle = radarModel.get("startAngle") * Math.PI / 180;
      var radius = radarModel.get("radius");
      if (isString(radius) || isNumber(radius)) {
        radius = [0, radius];
      }
      this.r0 = parsePercent(radius[0], viewSize);
      this.r = parsePercent(radius[1], viewSize);
      each(this._indicatorAxes, function(indicatorAxis, idx) {
        indicatorAxis.setExtent(this.r0, this.r);
        var angle = this.startAngle + idx * Math.PI * 2 / this._indicatorAxes.length;
        angle = Math.atan2(Math.sin(angle), Math.cos(angle));
        indicatorAxis.angle = angle;
      }, this);
    };
    Radar2.prototype.update = function(ecModel, api) {
      var indicatorAxes = this._indicatorAxes;
      var radarModel = this._model;
      each(indicatorAxes, function(indicatorAxis) {
        indicatorAxis.scale.setExtent(Infinity, -Infinity);
      });
      ecModel.eachSeriesByType("radar", function(radarSeries, idx) {
        if (radarSeries.get("coordinateSystem") !== "radar" || ecModel.getComponent("radar", radarSeries.get("radarIndex")) !== radarModel) {
          return;
        }
        var data = radarSeries.getData();
        each(indicatorAxes, function(indicatorAxis) {
          indicatorAxis.scale.unionExtentFromData(data, data.mapDimension(indicatorAxis.dim));
        });
      }, this);
      var splitNumber = radarModel.get("splitNumber");
      var dummyScale = new Interval_default();
      dummyScale.setExtent(0, splitNumber);
      dummyScale.setInterval(1);
      each(indicatorAxes, function(indicatorAxis, idx) {
        alignScaleTicks(indicatorAxis.scale, indicatorAxis.model, dummyScale);
      });
    };
    Radar2.prototype.convertToPixel = function(ecModel, finder, value) {
      console.warn("Not implemented.");
      return null;
    };
    Radar2.prototype.convertFromPixel = function(ecModel, finder, pixel) {
      console.warn("Not implemented.");
      return null;
    };
    Radar2.prototype.containPoint = function(point) {
      console.warn("Not implemented.");
      return false;
    };
    Radar2.create = function(ecModel, api) {
      var radarList = [];
      ecModel.eachComponent("radar", function(radarModel) {
        var radar = new Radar2(radarModel, ecModel, api);
        radarList.push(radar);
        radarModel.coordinateSystem = radar;
      });
      ecModel.eachSeriesByType("radar", function(radarSeries) {
        if (radarSeries.get("coordinateSystem") === "radar") {
          radarSeries.coordinateSystem = radarList[radarSeries.get("radarIndex") || 0];
        }
      });
      return radarList;
    };
    Radar2.dimensions = [];
    return Radar2;
  }()
);
var Radar_default = Radar;

// node_modules/echarts/lib/component/radar/install.js
function install2(registers) {
  registers.registerCoordinateSystem("radar", Radar_default);
  registers.registerComponentModel(RadarModel_default);
  registers.registerComponentView(RadarView_default);
  registers.registerVisual({
    seriesType: "radar",
    reset: function(seriesModel) {
      var data = seriesModel.getData();
      data.each(function(idx) {
        data.setItemVisual(idx, "legendIcon", "roundRect");
      });
      data.setVisual("legendIcon", "roundRect");
    }
  });
}

// node_modules/echarts/lib/coord/View.js
var v2ApplyTransform = applyTransform;
var View = (
  /** @class */
  function(_super) {
    __extends(View2, _super);
    function View2(name) {
      var _this = _super.call(this) || this;
      _this.type = "view";
      _this.dimensions = ["x", "y"];
      _this._roamTransformable = new Transformable_default();
      _this._rawTransformable = new Transformable_default();
      _this.name = name;
      return _this;
    }
    View2.prototype.setBoundingRect = function(x, y, width, height) {
      this._rect = new BoundingRect_default(x, y, width, height);
      return this._rect;
    };
    View2.prototype.getBoundingRect = function() {
      return this._rect;
    };
    View2.prototype.setViewRect = function(x, y, width, height) {
      this._transformTo(x, y, width, height);
      this._viewRect = new BoundingRect_default(x, y, width, height);
    };
    View2.prototype._transformTo = function(x, y, width, height) {
      var rect = this.getBoundingRect();
      var rawTransform = this._rawTransformable;
      rawTransform.transform = rect.calculateTransform(new BoundingRect_default(x, y, width, height));
      var rawParent = rawTransform.parent;
      rawTransform.parent = null;
      rawTransform.decomposeTransform();
      rawTransform.parent = rawParent;
      this._updateTransform();
    };
    View2.prototype.setCenter = function(centerCoord, api) {
      if (!centerCoord) {
        return;
      }
      this._center = [parsePercent(centerCoord[0], api.getWidth()), parsePercent(centerCoord[1], api.getHeight())];
      this._updateCenterAndZoom();
    };
    View2.prototype.setZoom = function(zoom) {
      zoom = zoom || 1;
      var zoomLimit = this.zoomLimit;
      if (zoomLimit) {
        if (zoomLimit.max != null) {
          zoom = Math.min(zoomLimit.max, zoom);
        }
        if (zoomLimit.min != null) {
          zoom = Math.max(zoomLimit.min, zoom);
        }
      }
      this._zoom = zoom;
      this._updateCenterAndZoom();
    };
    View2.prototype.getDefaultCenter = function() {
      var rawRect = this.getBoundingRect();
      var cx = rawRect.x + rawRect.width / 2;
      var cy = rawRect.y + rawRect.height / 2;
      return [cx, cy];
    };
    View2.prototype.getCenter = function() {
      return this._center || this.getDefaultCenter();
    };
    View2.prototype.getZoom = function() {
      return this._zoom || 1;
    };
    View2.prototype.getRoamTransform = function() {
      return this._roamTransformable.getLocalTransform();
    };
    View2.prototype._updateCenterAndZoom = function() {
      var rawTransformMatrix = this._rawTransformable.getLocalTransform();
      var roamTransform = this._roamTransformable;
      var defaultCenter = this.getDefaultCenter();
      var center = this.getCenter();
      var zoom = this.getZoom();
      center = applyTransform([], center, rawTransformMatrix);
      defaultCenter = applyTransform([], defaultCenter, rawTransformMatrix);
      roamTransform.originX = center[0];
      roamTransform.originY = center[1];
      roamTransform.x = defaultCenter[0] - center[0];
      roamTransform.y = defaultCenter[1] - center[1];
      roamTransform.scaleX = roamTransform.scaleY = zoom;
      this._updateTransform();
    };
    View2.prototype._updateTransform = function() {
      var roamTransformable = this._roamTransformable;
      var rawTransformable = this._rawTransformable;
      rawTransformable.parent = roamTransformable;
      roamTransformable.updateTransform();
      rawTransformable.updateTransform();
      copy2(this.transform || (this.transform = []), rawTransformable.transform || create());
      this._rawTransform = rawTransformable.getLocalTransform();
      this.invTransform = this.invTransform || [];
      invert(this.invTransform, this.transform);
      this.decomposeTransform();
    };
    View2.prototype.getTransformInfo = function() {
      var rawTransformable = this._rawTransformable;
      var roamTransformable = this._roamTransformable;
      var dummyTransformable = new Transformable_default();
      dummyTransformable.transform = roamTransformable.transform;
      dummyTransformable.decomposeTransform();
      return {
        roam: {
          x: dummyTransformable.x,
          y: dummyTransformable.y,
          scaleX: dummyTransformable.scaleX,
          scaleY: dummyTransformable.scaleY
        },
        raw: {
          x: rawTransformable.x,
          y: rawTransformable.y,
          scaleX: rawTransformable.scaleX,
          scaleY: rawTransformable.scaleY
        }
      };
    };
    View2.prototype.getViewRect = function() {
      return this._viewRect;
    };
    View2.prototype.getViewRectAfterRoam = function() {
      var rect = this.getBoundingRect().clone();
      rect.applyTransform(this.transform);
      return rect;
    };
    View2.prototype.dataToPoint = function(data, noRoam, out) {
      var transform = noRoam ? this._rawTransform : this.transform;
      out = out || [];
      return transform ? v2ApplyTransform(out, data, transform) : copy(out, data);
    };
    View2.prototype.pointToData = function(point) {
      var invTransform = this.invTransform;
      return invTransform ? v2ApplyTransform([], point, invTransform) : [point[0], point[1]];
    };
    View2.prototype.convertToPixel = function(ecModel, finder, value) {
      var coordSys = getCoordSys(finder);
      return coordSys === this ? coordSys.dataToPoint(value) : null;
    };
    View2.prototype.convertFromPixel = function(ecModel, finder, pixel) {
      var coordSys = getCoordSys(finder);
      return coordSys === this ? coordSys.pointToData(pixel) : null;
    };
    View2.prototype.containPoint = function(point) {
      return this.getViewRectAfterRoam().contain(point[0], point[1]);
    };
    View2.dimensions = ["x", "y"];
    return View2;
  }(Transformable_default)
);
function getCoordSys(finder) {
  var seriesModel = finder.seriesModel;
  return seriesModel ? seriesModel.coordinateSystem : null;
}
var View_default = View;

// node_modules/zrender/lib/tool/parseXML.js
function parseXML(svg) {
  if (isString(svg)) {
    var parser = new DOMParser();
    svg = parser.parseFromString(svg, "text/xml");
  }
  var svgNode = svg;
  if (svgNode.nodeType === 9) {
    svgNode = svgNode.firstChild;
  }
  while (svgNode.nodeName.toLowerCase() !== "svg" || svgNode.nodeType !== 1) {
    svgNode = svgNode.nextSibling;
  }
  return svgNode;
}

// node_modules/zrender/lib/tool/parseSVG.js
var nodeParsers;
var INHERITABLE_STYLE_ATTRIBUTES_MAP = {
  "fill": "fill",
  "stroke": "stroke",
  "stroke-width": "lineWidth",
  "opacity": "opacity",
  "fill-opacity": "fillOpacity",
  "stroke-opacity": "strokeOpacity",
  "stroke-dasharray": "lineDash",
  "stroke-dashoffset": "lineDashOffset",
  "stroke-linecap": "lineCap",
  "stroke-linejoin": "lineJoin",
  "stroke-miterlimit": "miterLimit",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-style": "fontStyle",
  "font-weight": "fontWeight",
  "text-anchor": "textAlign",
  "visibility": "visibility",
  "display": "display"
};
var INHERITABLE_STYLE_ATTRIBUTES_MAP_KEYS = keys(INHERITABLE_STYLE_ATTRIBUTES_MAP);
var SELF_STYLE_ATTRIBUTES_MAP = {
  "alignment-baseline": "textBaseline",
  "stop-color": "stopColor"
};
var SELF_STYLE_ATTRIBUTES_MAP_KEYS = keys(SELF_STYLE_ATTRIBUTES_MAP);
var SVGParser = function() {
  function SVGParser2() {
    this._defs = {};
    this._root = null;
  }
  SVGParser2.prototype.parse = function(xml, opt) {
    opt = opt || {};
    var svg = parseXML(xml);
    if (true) {
      if (!svg) {
        throw new Error("Illegal svg");
      }
    }
    this._defsUsePending = [];
    var root = new Group_default();
    this._root = root;
    var named = [];
    var viewBox = svg.getAttribute("viewBox") || "";
    var width = parseFloat(svg.getAttribute("width") || opt.width);
    var height = parseFloat(svg.getAttribute("height") || opt.height);
    isNaN(width) && (width = null);
    isNaN(height) && (height = null);
    parseAttributes(svg, root, null, true, false);
    var child = svg.firstChild;
    while (child) {
      this._parseNode(child, root, named, null, false, false);
      child = child.nextSibling;
    }
    applyDefs(this._defs, this._defsUsePending);
    this._defsUsePending = [];
    var viewBoxRect;
    var viewBoxTransform;
    if (viewBox) {
      var viewBoxArr = splitNumberSequence(viewBox);
      if (viewBoxArr.length >= 4) {
        viewBoxRect = {
          x: parseFloat(viewBoxArr[0] || 0),
          y: parseFloat(viewBoxArr[1] || 0),
          width: parseFloat(viewBoxArr[2]),
          height: parseFloat(viewBoxArr[3])
        };
      }
    }
    if (viewBoxRect && width != null && height != null) {
      viewBoxTransform = makeViewBoxTransform(viewBoxRect, { x: 0, y: 0, width, height });
      if (!opt.ignoreViewBox) {
        var elRoot = root;
        root = new Group_default();
        root.add(elRoot);
        elRoot.scaleX = elRoot.scaleY = viewBoxTransform.scale;
        elRoot.x = viewBoxTransform.x;
        elRoot.y = viewBoxTransform.y;
      }
    }
    if (!opt.ignoreRootClip && width != null && height != null) {
      root.setClipPath(new Rect_default({
        shape: { x: 0, y: 0, width, height }
      }));
    }
    return {
      root,
      width,
      height,
      viewBoxRect,
      viewBoxTransform,
      named
    };
  };
  SVGParser2.prototype._parseNode = function(xmlNode, parentGroup, named, namedFrom, isInDefs, isInText) {
    var nodeName = xmlNode.nodeName.toLowerCase();
    var el;
    var namedFromForSub = namedFrom;
    if (nodeName === "defs") {
      isInDefs = true;
    }
    if (nodeName === "text") {
      isInText = true;
    }
    if (nodeName === "defs" || nodeName === "switch") {
      el = parentGroup;
    } else {
      if (!isInDefs) {
        var parser_1 = nodeParsers[nodeName];
        if (parser_1 && hasOwn(nodeParsers, nodeName)) {
          el = parser_1.call(this, xmlNode, parentGroup);
          var nameAttr = xmlNode.getAttribute("name");
          if (nameAttr) {
            var newNamed = {
              name: nameAttr,
              namedFrom: null,
              svgNodeTagLower: nodeName,
              el
            };
            named.push(newNamed);
            if (nodeName === "g") {
              namedFromForSub = newNamed;
            }
          } else if (namedFrom) {
            named.push({
              name: namedFrom.name,
              namedFrom,
              svgNodeTagLower: nodeName,
              el
            });
          }
          parentGroup.add(el);
        }
      }
      var parser = paintServerParsers[nodeName];
      if (parser && hasOwn(paintServerParsers, nodeName)) {
        var def = parser.call(this, xmlNode);
        var id = xmlNode.getAttribute("id");
        if (id) {
          this._defs[id] = def;
        }
      }
    }
    if (el && el.isGroup) {
      var child = xmlNode.firstChild;
      while (child) {
        if (child.nodeType === 1) {
          this._parseNode(child, el, named, namedFromForSub, isInDefs, isInText);
        } else if (child.nodeType === 3 && isInText) {
          this._parseText(child, el);
        }
        child = child.nextSibling;
      }
    }
  };
  SVGParser2.prototype._parseText = function(xmlNode, parentGroup) {
    var text = new TSpan_default({
      style: {
        text: xmlNode.textContent
      },
      silent: true,
      x: this._textX || 0,
      y: this._textY || 0
    });
    inheritStyle(parentGroup, text);
    parseAttributes(xmlNode, text, this._defsUsePending, false, false);
    applyTextAlignment(text, parentGroup);
    var textStyle = text.style;
    var fontSize = textStyle.fontSize;
    if (fontSize && fontSize < 9) {
      textStyle.fontSize = 9;
      text.scaleX *= fontSize / 9;
      text.scaleY *= fontSize / 9;
    }
    var font = (textStyle.fontSize || textStyle.fontFamily) && [
      textStyle.fontStyle,
      textStyle.fontWeight,
      (textStyle.fontSize || 12) + "px",
      textStyle.fontFamily || "sans-serif"
    ].join(" ");
    textStyle.font = font;
    var rect = text.getBoundingRect();
    this._textX += rect.width;
    parentGroup.add(text);
    return text;
  };
  SVGParser2.internalField = function() {
    nodeParsers = {
      "g": function(xmlNode, parentGroup) {
        var g = new Group_default();
        inheritStyle(parentGroup, g);
        parseAttributes(xmlNode, g, this._defsUsePending, false, false);
        return g;
      },
      "rect": function(xmlNode, parentGroup) {
        var rect = new Rect_default();
        inheritStyle(parentGroup, rect);
        parseAttributes(xmlNode, rect, this._defsUsePending, false, false);
        rect.setShape({
          x: parseFloat(xmlNode.getAttribute("x") || "0"),
          y: parseFloat(xmlNode.getAttribute("y") || "0"),
          width: parseFloat(xmlNode.getAttribute("width") || "0"),
          height: parseFloat(xmlNode.getAttribute("height") || "0")
        });
        rect.silent = true;
        return rect;
      },
      "circle": function(xmlNode, parentGroup) {
        var circle = new Circle_default();
        inheritStyle(parentGroup, circle);
        parseAttributes(xmlNode, circle, this._defsUsePending, false, false);
        circle.setShape({
          cx: parseFloat(xmlNode.getAttribute("cx") || "0"),
          cy: parseFloat(xmlNode.getAttribute("cy") || "0"),
          r: parseFloat(xmlNode.getAttribute("r") || "0")
        });
        circle.silent = true;
        return circle;
      },
      "line": function(xmlNode, parentGroup) {
        var line = new Line_default();
        inheritStyle(parentGroup, line);
        parseAttributes(xmlNode, line, this._defsUsePending, false, false);
        line.setShape({
          x1: parseFloat(xmlNode.getAttribute("x1") || "0"),
          y1: parseFloat(xmlNode.getAttribute("y1") || "0"),
          x2: parseFloat(xmlNode.getAttribute("x2") || "0"),
          y2: parseFloat(xmlNode.getAttribute("y2") || "0")
        });
        line.silent = true;
        return line;
      },
      "ellipse": function(xmlNode, parentGroup) {
        var ellipse = new Ellipse_default();
        inheritStyle(parentGroup, ellipse);
        parseAttributes(xmlNode, ellipse, this._defsUsePending, false, false);
        ellipse.setShape({
          cx: parseFloat(xmlNode.getAttribute("cx") || "0"),
          cy: parseFloat(xmlNode.getAttribute("cy") || "0"),
          rx: parseFloat(xmlNode.getAttribute("rx") || "0"),
          ry: parseFloat(xmlNode.getAttribute("ry") || "0")
        });
        ellipse.silent = true;
        return ellipse;
      },
      "polygon": function(xmlNode, parentGroup) {
        var pointsStr = xmlNode.getAttribute("points");
        var pointsArr;
        if (pointsStr) {
          pointsArr = parsePoints(pointsStr);
        }
        var polygon = new Polygon_default({
          shape: {
            points: pointsArr || []
          },
          silent: true
        });
        inheritStyle(parentGroup, polygon);
        parseAttributes(xmlNode, polygon, this._defsUsePending, false, false);
        return polygon;
      },
      "polyline": function(xmlNode, parentGroup) {
        var pointsStr = xmlNode.getAttribute("points");
        var pointsArr;
        if (pointsStr) {
          pointsArr = parsePoints(pointsStr);
        }
        var polyline = new Polyline_default({
          shape: {
            points: pointsArr || []
          },
          silent: true
        });
        inheritStyle(parentGroup, polyline);
        parseAttributes(xmlNode, polyline, this._defsUsePending, false, false);
        return polyline;
      },
      "image": function(xmlNode, parentGroup) {
        var img = new Image_default();
        inheritStyle(parentGroup, img);
        parseAttributes(xmlNode, img, this._defsUsePending, false, false);
        img.setStyle({
          image: xmlNode.getAttribute("xlink:href") || xmlNode.getAttribute("href"),
          x: +xmlNode.getAttribute("x"),
          y: +xmlNode.getAttribute("y"),
          width: +xmlNode.getAttribute("width"),
          height: +xmlNode.getAttribute("height")
        });
        img.silent = true;
        return img;
      },
      "text": function(xmlNode, parentGroup) {
        var x = xmlNode.getAttribute("x") || "0";
        var y = xmlNode.getAttribute("y") || "0";
        var dx = xmlNode.getAttribute("dx") || "0";
        var dy = xmlNode.getAttribute("dy") || "0";
        this._textX = parseFloat(x) + parseFloat(dx);
        this._textY = parseFloat(y) + parseFloat(dy);
        var g = new Group_default();
        inheritStyle(parentGroup, g);
        parseAttributes(xmlNode, g, this._defsUsePending, false, true);
        return g;
      },
      "tspan": function(xmlNode, parentGroup) {
        var x = xmlNode.getAttribute("x");
        var y = xmlNode.getAttribute("y");
        if (x != null) {
          this._textX = parseFloat(x);
        }
        if (y != null) {
          this._textY = parseFloat(y);
        }
        var dx = xmlNode.getAttribute("dx") || "0";
        var dy = xmlNode.getAttribute("dy") || "0";
        var g = new Group_default();
        inheritStyle(parentGroup, g);
        parseAttributes(xmlNode, g, this._defsUsePending, false, true);
        this._textX += parseFloat(dx);
        this._textY += parseFloat(dy);
        return g;
      },
      "path": function(xmlNode, parentGroup) {
        var d = xmlNode.getAttribute("d") || "";
        var path = createFromString(d);
        inheritStyle(parentGroup, path);
        parseAttributes(xmlNode, path, this._defsUsePending, false, false);
        path.silent = true;
        return path;
      }
    };
  }();
  return SVGParser2;
}();
var paintServerParsers = {
  "lineargradient": function(xmlNode) {
    var x1 = parseInt(xmlNode.getAttribute("x1") || "0", 10);
    var y1 = parseInt(xmlNode.getAttribute("y1") || "0", 10);
    var x2 = parseInt(xmlNode.getAttribute("x2") || "10", 10);
    var y2 = parseInt(xmlNode.getAttribute("y2") || "0", 10);
    var gradient = new LinearGradient_default(x1, y1, x2, y2);
    parsePaintServerUnit(xmlNode, gradient);
    parseGradientColorStops(xmlNode, gradient);
    return gradient;
  },
  "radialgradient": function(xmlNode) {
    var cx = parseInt(xmlNode.getAttribute("cx") || "0", 10);
    var cy = parseInt(xmlNode.getAttribute("cy") || "0", 10);
    var r = parseInt(xmlNode.getAttribute("r") || "0", 10);
    var gradient = new RadialGradient_default(cx, cy, r);
    parsePaintServerUnit(xmlNode, gradient);
    parseGradientColorStops(xmlNode, gradient);
    return gradient;
  }
};
function parsePaintServerUnit(xmlNode, gradient) {
  var gradientUnits = xmlNode.getAttribute("gradientUnits");
  if (gradientUnits === "userSpaceOnUse") {
    gradient.global = true;
  }
}
function parseGradientColorStops(xmlNode, gradient) {
  var stop2 = xmlNode.firstChild;
  while (stop2) {
    if (stop2.nodeType === 1 && stop2.nodeName.toLocaleLowerCase() === "stop") {
      var offsetStr = stop2.getAttribute("offset");
      var offset = void 0;
      if (offsetStr && offsetStr.indexOf("%") > 0) {
        offset = parseInt(offsetStr, 10) / 100;
      } else if (offsetStr) {
        offset = parseFloat(offsetStr);
      } else {
        offset = 0;
      }
      var styleVals = {};
      parseInlineStyle(stop2, styleVals, styleVals);
      var stopColor = styleVals.stopColor || stop2.getAttribute("stop-color") || "#000000";
      gradient.colorStops.push({
        offset,
        color: stopColor
      });
    }
    stop2 = stop2.nextSibling;
  }
}
function inheritStyle(parent, child) {
  if (parent && parent.__inheritedStyle) {
    if (!child.__inheritedStyle) {
      child.__inheritedStyle = {};
    }
    defaults(child.__inheritedStyle, parent.__inheritedStyle);
  }
}
function parsePoints(pointsString) {
  var list = splitNumberSequence(pointsString);
  var points3 = [];
  for (var i = 0; i < list.length; i += 2) {
    var x = parseFloat(list[i]);
    var y = parseFloat(list[i + 1]);
    points3.push([x, y]);
  }
  return points3;
}
function parseAttributes(xmlNode, el, defsUsePending, onlyInlineStyle, isTextGroup) {
  var disp = el;
  var inheritedStyle = disp.__inheritedStyle = disp.__inheritedStyle || {};
  var selfStyle = {};
  if (xmlNode.nodeType === 1) {
    parseTransformAttribute(xmlNode, el);
    parseInlineStyle(xmlNode, inheritedStyle, selfStyle);
    if (!onlyInlineStyle) {
      parseAttributeStyle(xmlNode, inheritedStyle, selfStyle);
    }
  }
  disp.style = disp.style || {};
  if (inheritedStyle.fill != null) {
    disp.style.fill = getFillStrokeStyle(disp, "fill", inheritedStyle.fill, defsUsePending);
  }
  if (inheritedStyle.stroke != null) {
    disp.style.stroke = getFillStrokeStyle(disp, "stroke", inheritedStyle.stroke, defsUsePending);
  }
  each([
    "lineWidth",
    "opacity",
    "fillOpacity",
    "strokeOpacity",
    "miterLimit",
    "fontSize"
  ], function(propName) {
    if (inheritedStyle[propName] != null) {
      disp.style[propName] = parseFloat(inheritedStyle[propName]);
    }
  });
  each([
    "lineDashOffset",
    "lineCap",
    "lineJoin",
    "fontWeight",
    "fontFamily",
    "fontStyle",
    "textAlign"
  ], function(propName) {
    if (inheritedStyle[propName] != null) {
      disp.style[propName] = inheritedStyle[propName];
    }
  });
  if (isTextGroup) {
    disp.__selfStyle = selfStyle;
  }
  if (inheritedStyle.lineDash) {
    disp.style.lineDash = map(splitNumberSequence(inheritedStyle.lineDash), function(str) {
      return parseFloat(str);
    });
  }
  if (inheritedStyle.visibility === "hidden" || inheritedStyle.visibility === "collapse") {
    disp.invisible = true;
  }
  if (inheritedStyle.display === "none") {
    disp.ignore = true;
  }
}
function applyTextAlignment(text, parentGroup) {
  var parentSelfStyle = parentGroup.__selfStyle;
  if (parentSelfStyle) {
    var textBaseline = parentSelfStyle.textBaseline;
    var zrTextBaseline = textBaseline;
    if (!textBaseline || textBaseline === "auto") {
      zrTextBaseline = "alphabetic";
    } else if (textBaseline === "baseline") {
      zrTextBaseline = "alphabetic";
    } else if (textBaseline === "before-edge" || textBaseline === "text-before-edge") {
      zrTextBaseline = "top";
    } else if (textBaseline === "after-edge" || textBaseline === "text-after-edge") {
      zrTextBaseline = "bottom";
    } else if (textBaseline === "central" || textBaseline === "mathematical") {
      zrTextBaseline = "middle";
    }
    text.style.textBaseline = zrTextBaseline;
  }
  var parentInheritedStyle = parentGroup.__inheritedStyle;
  if (parentInheritedStyle) {
    var textAlign = parentInheritedStyle.textAlign;
    var zrTextAlign = textAlign;
    if (textAlign) {
      if (textAlign === "middle") {
        zrTextAlign = "center";
      }
      text.style.textAlign = zrTextAlign;
    }
  }
}
var urlRegex = /^url\(\s*#(.*?)\)/;
function getFillStrokeStyle(el, method, str, defsUsePending) {
  var urlMatch = str && str.match(urlRegex);
  if (urlMatch) {
    var url = trim(urlMatch[1]);
    defsUsePending.push([el, method, url]);
    return;
  }
  if (str === "none") {
    str = null;
  }
  return str;
}
function applyDefs(defs, defsUsePending) {
  for (var i = 0; i < defsUsePending.length; i++) {
    var item = defsUsePending[i];
    item[0].style[item[1]] = defs[item[2]];
  }
}
var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function splitNumberSequence(rawStr) {
  return rawStr.match(numberReg) || [];
}
var transformRegex = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.eE,]*)\)/g;
var DEGREE_TO_ANGLE = Math.PI / 180;
function parseTransformAttribute(xmlNode, node) {
  var transform = xmlNode.getAttribute("transform");
  if (transform) {
    transform = transform.replace(/,/g, " ");
    var transformOps_1 = [];
    var mt = null;
    transform.replace(transformRegex, function(str, type2, value2) {
      transformOps_1.push(type2, value2);
      return "";
    });
    for (var i = transformOps_1.length - 1; i > 0; i -= 2) {
      var value = transformOps_1[i];
      var type = transformOps_1[i - 1];
      var valueArr = splitNumberSequence(value);
      mt = mt || create();
      switch (type) {
        case "translate":
          translate(mt, mt, [parseFloat(valueArr[0]), parseFloat(valueArr[1] || "0")]);
          break;
        case "scale":
          scale(mt, mt, [parseFloat(valueArr[0]), parseFloat(valueArr[1] || valueArr[0])]);
          break;
        case "rotate":
          rotate(mt, mt, -parseFloat(valueArr[0]) * DEGREE_TO_ANGLE, [
            parseFloat(valueArr[1] || "0"),
            parseFloat(valueArr[2] || "0")
          ]);
          break;
        case "skewX":
          var sx = Math.tan(parseFloat(valueArr[0]) * DEGREE_TO_ANGLE);
          mul(mt, [1, 0, sx, 1, 0, 0], mt);
          break;
        case "skewY":
          var sy = Math.tan(parseFloat(valueArr[0]) * DEGREE_TO_ANGLE);
          mul(mt, [1, sy, 0, 1, 0, 0], mt);
          break;
        case "matrix":
          mt[0] = parseFloat(valueArr[0]);
          mt[1] = parseFloat(valueArr[1]);
          mt[2] = parseFloat(valueArr[2]);
          mt[3] = parseFloat(valueArr[3]);
          mt[4] = parseFloat(valueArr[4]);
          mt[5] = parseFloat(valueArr[5]);
          break;
      }
    }
    node.setLocalTransform(mt);
  }
}
var styleRegex = /([^\s:;]+)\s*:\s*([^:;]+)/g;
function parseInlineStyle(xmlNode, inheritableStyleResult, selfStyleResult) {
  var style = xmlNode.getAttribute("style");
  if (!style) {
    return;
  }
  styleRegex.lastIndex = 0;
  var styleRegResult;
  while ((styleRegResult = styleRegex.exec(style)) != null) {
    var svgStlAttr = styleRegResult[1];
    var zrInheritableStlAttr = hasOwn(INHERITABLE_STYLE_ATTRIBUTES_MAP, svgStlAttr) ? INHERITABLE_STYLE_ATTRIBUTES_MAP[svgStlAttr] : null;
    if (zrInheritableStlAttr) {
      inheritableStyleResult[zrInheritableStlAttr] = styleRegResult[2];
    }
    var zrSelfStlAttr = hasOwn(SELF_STYLE_ATTRIBUTES_MAP, svgStlAttr) ? SELF_STYLE_ATTRIBUTES_MAP[svgStlAttr] : null;
    if (zrSelfStlAttr) {
      selfStyleResult[zrSelfStlAttr] = styleRegResult[2];
    }
  }
}
function parseAttributeStyle(xmlNode, inheritableStyleResult, selfStyleResult) {
  for (var i = 0; i < INHERITABLE_STYLE_ATTRIBUTES_MAP_KEYS.length; i++) {
    var svgAttrName = INHERITABLE_STYLE_ATTRIBUTES_MAP_KEYS[i];
    var attrValue = xmlNode.getAttribute(svgAttrName);
    if (attrValue != null) {
      inheritableStyleResult[INHERITABLE_STYLE_ATTRIBUTES_MAP[svgAttrName]] = attrValue;
    }
  }
  for (var i = 0; i < SELF_STYLE_ATTRIBUTES_MAP_KEYS.length; i++) {
    var svgAttrName = SELF_STYLE_ATTRIBUTES_MAP_KEYS[i];
    var attrValue = xmlNode.getAttribute(svgAttrName);
    if (attrValue != null) {
      selfStyleResult[SELF_STYLE_ATTRIBUTES_MAP[svgAttrName]] = attrValue;
    }
  }
}
function makeViewBoxTransform(viewBoxRect, boundingRect) {
  var scaleX = boundingRect.width / viewBoxRect.width;
  var scaleY = boundingRect.height / viewBoxRect.height;
  var scale2 = Math.min(scaleX, scaleY);
  return {
    scale: scale2,
    x: -(viewBoxRect.x + viewBoxRect.width / 2) * scale2 + (boundingRect.x + boundingRect.width / 2),
    y: -(viewBoxRect.y + viewBoxRect.height / 2) * scale2 + (boundingRect.y + boundingRect.height / 2)
  };
}
function parseSVG(xml, opt) {
  var parser = new SVGParser();
  return parser.parse(xml, opt);
}

// node_modules/echarts/lib/coord/geo/GeoSVGResource.js
var REGION_AVAILABLE_SVG_TAG_MAP = createHashMap([
  "rect",
  "circle",
  "line",
  "ellipse",
  "polygon",
  "polyline",
  "path",
  // <text> <tspan> are also enabled because some SVG might paint text itself,
  // but still need to trigger events or tooltip.
  "text",
  "tspan",
  // <g> is also enabled because this case: if multiple tags share one name
  // and need label displayed, every tags will display the name, which is not
  // expected. So we can put them into a <g name="xxx">. Thereby only one label
  // displayed and located based on the bounding rect of the <g>.
  "g"
]);
var GeoSVGResource = (
  /** @class */
  function() {
    function GeoSVGResource2(mapName, svg) {
      this.type = "geoSVG";
      this._usedGraphicMap = createHashMap();
      this._freedGraphics = [];
      this._mapName = mapName;
      this._parsedXML = parseXML(svg);
    }
    GeoSVGResource2.prototype.load = function() {
      var firstGraphic = this._firstGraphic;
      if (!firstGraphic) {
        firstGraphic = this._firstGraphic = this._buildGraphic(this._parsedXML);
        this._freedGraphics.push(firstGraphic);
        this._boundingRect = this._firstGraphic.boundingRect.clone();
        var _a = createRegions(firstGraphic.named), regions = _a.regions, regionsMap = _a.regionsMap;
        this._regions = regions;
        this._regionsMap = regionsMap;
      }
      return {
        boundingRect: this._boundingRect,
        regions: this._regions,
        regionsMap: this._regionsMap
      };
    };
    GeoSVGResource2.prototype._buildGraphic = function(svgXML) {
      var result;
      var rootFromParse;
      try {
        result = svgXML && parseSVG(svgXML, {
          ignoreViewBox: true,
          ignoreRootClip: true
        }) || {};
        rootFromParse = result.root;
        assert(rootFromParse != null);
      } catch (e) {
        throw new Error("Invalid svg format\n" + e.message);
      }
      var root = new Group_default();
      root.add(rootFromParse);
      root.isGeoSVGGraphicRoot = true;
      var svgWidth = result.width;
      var svgHeight = result.height;
      var viewBoxRect = result.viewBoxRect;
      var boundingRect = this._boundingRect;
      if (!boundingRect) {
        var bRectX = void 0;
        var bRectY = void 0;
        var bRectWidth = void 0;
        var bRectHeight = void 0;
        if (svgWidth != null) {
          bRectX = 0;
          bRectWidth = svgWidth;
        } else if (viewBoxRect) {
          bRectX = viewBoxRect.x;
          bRectWidth = viewBoxRect.width;
        }
        if (svgHeight != null) {
          bRectY = 0;
          bRectHeight = svgHeight;
        } else if (viewBoxRect) {
          bRectY = viewBoxRect.y;
          bRectHeight = viewBoxRect.height;
        }
        if (bRectX == null || bRectY == null) {
          var calculatedBoundingRect = rootFromParse.getBoundingRect();
          if (bRectX == null) {
            bRectX = calculatedBoundingRect.x;
            bRectWidth = calculatedBoundingRect.width;
          }
          if (bRectY == null) {
            bRectY = calculatedBoundingRect.y;
            bRectHeight = calculatedBoundingRect.height;
          }
        }
        boundingRect = this._boundingRect = new BoundingRect_default(bRectX, bRectY, bRectWidth, bRectHeight);
      }
      if (viewBoxRect) {
        var viewBoxTransform = makeViewBoxTransform(viewBoxRect, boundingRect);
        rootFromParse.scaleX = rootFromParse.scaleY = viewBoxTransform.scale;
        rootFromParse.x = viewBoxTransform.x;
        rootFromParse.y = viewBoxTransform.y;
      }
      root.setClipPath(new Rect_default({
        shape: boundingRect.plain()
      }));
      var named = [];
      each(result.named, function(namedItem) {
        if (REGION_AVAILABLE_SVG_TAG_MAP.get(namedItem.svgNodeTagLower) != null) {
          named.push(namedItem);
          setSilent(namedItem.el);
        }
      });
      return {
        root,
        boundingRect,
        named
      };
    };
    GeoSVGResource2.prototype.useGraphic = function(hostKey) {
      var usedRootMap = this._usedGraphicMap;
      var svgGraphic = usedRootMap.get(hostKey);
      if (svgGraphic) {
        return svgGraphic;
      }
      svgGraphic = this._freedGraphics.pop() || this._buildGraphic(this._parsedXML);
      usedRootMap.set(hostKey, svgGraphic);
      return svgGraphic;
    };
    GeoSVGResource2.prototype.freeGraphic = function(hostKey) {
      var usedRootMap = this._usedGraphicMap;
      var svgGraphic = usedRootMap.get(hostKey);
      if (svgGraphic) {
        usedRootMap.removeKey(hostKey);
        this._freedGraphics.push(svgGraphic);
      }
    };
    return GeoSVGResource2;
  }()
);
function setSilent(el) {
  el.silent = false;
  if (el.isGroup) {
    el.traverse(function(child) {
      child.silent = false;
    });
  }
}
function createRegions(named) {
  var regions = [];
  var regionsMap = createHashMap();
  each(named, function(namedItem) {
    if (namedItem.namedFrom != null) {
      return;
    }
    var region = new GeoSVGRegion(namedItem.name, namedItem.el);
    regions.push(region);
    regionsMap.set(namedItem.name, region);
  });
  return {
    regions,
    regionsMap
  };
}

// node_modules/echarts/lib/coord/geo/fix/nanhai.js
var geoCoord = [126, 25];
var nanhaiName = "南海诸岛";
var points = [[[0, 3.5], [7, 11.2], [15, 11.9], [30, 7], [42, 0.7], [52, 0.7], [56, 7.7], [59, 0.7], [64, 0.7], [64, 0], [5, 0], [0, 3.5]], [[13, 16.1], [19, 14.7], [16, 21.7], [11, 23.1], [13, 16.1]], [[12, 32.2], [14, 38.5], [15, 38.5], [13, 32.2], [12, 32.2]], [[16, 47.6], [12, 53.2], [13, 53.2], [18, 47.6], [16, 47.6]], [[6, 64.4], [8, 70], [9, 70], [8, 64.4], [6, 64.4]], [[23, 82.6], [29, 79.8], [30, 79.8], [25, 82.6], [23, 82.6]], [[37, 70.7], [43, 62.3], [44, 62.3], [39, 70.7], [37, 70.7]], [[48, 51.1], [51, 45.5], [53, 45.5], [50, 51.1], [48, 51.1]], [[51, 35], [51, 28.7], [53, 28.7], [53, 35], [51, 35]], [[52, 22.4], [55, 17.5], [56, 17.5], [53, 22.4], [52, 22.4]], [[58, 12.6], [62, 7], [63, 7], [60, 12.6], [58, 12.6]], [[0, 3.5], [0, 93.1], [64, 93.1], [64, 0], [63, 0], [63, 92.4], [1, 92.4], [1, 3.5], [0, 3.5]]];
for (i = 0; i < points.length; i++) {
  for (k = 0; k < points[i].length; k++) {
    points[i][k][0] /= 10.5;
    points[i][k][1] /= -10.5 / 0.75;
    points[i][k][0] += geoCoord[0];
    points[i][k][1] += geoCoord[1];
  }
}
var k;
var i;
function fixNanhai(mapType, regions) {
  if (mapType === "china") {
    for (var i = 0; i < regions.length; i++) {
      if (regions[i].name === nanhaiName) {
        return;
      }
    }
    regions.push(new GeoJSONRegion(nanhaiName, map(points, function(exterior) {
      return {
        type: "polygon",
        exterior
      };
    }), geoCoord));
  }
}

// node_modules/echarts/lib/coord/geo/fix/textCoord.js
var coordsOffsetMap = {
  "南海诸岛": [32, 80],
  // 全国
  "广东": [0, -10],
  "香港": [10, 5],
  "澳门": [-10, 10],
  // '北京': [-10, 0],
  "天津": [5, 5]
};
function fixTextCoords(mapType, region) {
  if (mapType === "china") {
    var coordFix = coordsOffsetMap[region.name];
    if (coordFix) {
      var cp = region.getCenter();
      cp[0] += coordFix[0] / 10.5;
      cp[1] += -coordFix[1] / (10.5 / 0.75);
      region.setCenter(cp);
    }
  }
}

// node_modules/echarts/lib/coord/geo/fix/diaoyuIsland.js
var points2 = [[[123.45165252685547, 25.73527164402261], [123.49731445312499, 25.73527164402261], [123.49731445312499, 25.750734064600884], [123.45165252685547, 25.750734064600884], [123.45165252685547, 25.73527164402261]]];
function fixDiaoyuIsland(mapType, region) {
  if (mapType === "china" && region.name === "台湾") {
    region.geometries.push({
      type: "polygon",
      exterior: points2[0]
    });
  }
}

// node_modules/echarts/lib/coord/geo/GeoJSONResource.js
var DEFAULT_NAME_PROPERTY = "name";
var GeoJSONResource = (
  /** @class */
  function() {
    function GeoJSONResource2(mapName, geoJSON, specialAreas) {
      this.type = "geoJSON";
      this._parsedMap = createHashMap();
      this._mapName = mapName;
      this._specialAreas = specialAreas;
      this._geoJSON = parseInput(geoJSON);
    }
    GeoJSONResource2.prototype.load = function(nameMap, nameProperty) {
      nameProperty = nameProperty || DEFAULT_NAME_PROPERTY;
      var parsed = this._parsedMap.get(nameProperty);
      if (!parsed) {
        var rawRegions = this._parseToRegions(nameProperty);
        parsed = this._parsedMap.set(nameProperty, {
          regions: rawRegions,
          boundingRect: calculateBoundingRect(rawRegions)
        });
      }
      var regionsMap = createHashMap();
      var finalRegions = [];
      each(parsed.regions, function(region) {
        var regionName = region.name;
        if (nameMap && hasOwn(nameMap, regionName)) {
          region = region.cloneShallow(regionName = nameMap[regionName]);
        }
        finalRegions.push(region);
        regionsMap.set(regionName, region);
      });
      return {
        regions: finalRegions,
        boundingRect: parsed.boundingRect || new BoundingRect_default(0, 0, 0, 0),
        regionsMap
      };
    };
    GeoJSONResource2.prototype._parseToRegions = function(nameProperty) {
      var mapName = this._mapName;
      var geoJSON = this._geoJSON;
      var rawRegions;
      try {
        rawRegions = geoJSON ? parseGeoJSON(geoJSON, nameProperty) : [];
      } catch (e) {
        throw new Error("Invalid geoJson format\n" + e.message);
      }
      fixNanhai(mapName, rawRegions);
      each(rawRegions, function(region) {
        var regionName = region.name;
        fixTextCoords(mapName, region);
        fixDiaoyuIsland(mapName, region);
        var specialArea = this._specialAreas && this._specialAreas[regionName];
        if (specialArea) {
          region.transformTo(specialArea.left, specialArea.top, specialArea.width, specialArea.height);
        }
      }, this);
      return rawRegions;
    };
    GeoJSONResource2.prototype.getMapForUser = function() {
      return {
        // For backward compatibility, use geoJson
        // PENDING: it has been returning them without clone.
        // do we need to avoid outsite modification?
        geoJson: this._geoJSON,
        geoJSON: this._geoJSON,
        specialAreas: this._specialAreas
      };
    };
    return GeoJSONResource2;
  }()
);
function calculateBoundingRect(regions) {
  var rect;
  for (var i = 0; i < regions.length; i++) {
    var regionRect = regions[i].getBoundingRect();
    rect = rect || regionRect.clone();
    rect.union(regionRect);
  }
  return rect;
}
function parseInput(source) {
  return !isString(source) ? source : typeof JSON !== "undefined" && JSON.parse ? JSON.parse(source) : new Function("return (" + source + ");")();
}

// node_modules/echarts/lib/coord/geo/geoSourceManager.js
var storage = createHashMap();
var geoSourceManager_default = {
  /**
   * Compatible with previous `echarts.registerMap`.
   *
   * @usage
   * ```js
   *
   * echarts.registerMap('USA', geoJson, specialAreas);
   *
   * echarts.registerMap('USA', {
   *     geoJson: geoJson,
   *     specialAreas: {...}
   * });
   * echarts.registerMap('USA', {
   *     geoJSON: geoJson,
   *     specialAreas: {...}
   * });
   *
   * echarts.registerMap('airport', {
   *     svg: svg
   * }
   * ```
   *
   * Note:
   * Do not support that register multiple geoJSON or SVG
   * one map name. Because different geoJSON and SVG have
   * different unit. It's not easy to make sure how those
   * units are mapping/normalize.
   * If intending to use multiple geoJSON or SVG, we can
   * use multiple geo coordinate system.
   */
  registerMap: function(mapName, rawDef, rawSpecialAreas) {
    if (rawDef.svg) {
      var resource = new GeoSVGResource(mapName, rawDef.svg);
      storage.set(mapName, resource);
    } else {
      var geoJSON = rawDef.geoJson || rawDef.geoJSON;
      if (geoJSON && !rawDef.features) {
        rawSpecialAreas = rawDef.specialAreas;
      } else {
        geoJSON = rawDef;
      }
      var resource = new GeoJSONResource(mapName, geoJSON, rawSpecialAreas);
      storage.set(mapName, resource);
    }
  },
  getGeoResource: function(mapName) {
    return storage.get(mapName);
  },
  /**
   * Only for exporting to users.
   * **MUST NOT** used internally.
   */
  getMapForUser: function(mapName) {
    var resource = storage.get(mapName);
    return resource && resource.type === "geoJSON" && resource.getMapForUser();
  },
  load: function(mapName, nameMap, nameProperty) {
    var resource = storage.get(mapName);
    if (!resource) {
      if (true) {
        console.error("Map " + mapName + " not exists. The GeoJSON of the map must be provided.");
      }
      return;
    }
    return resource.load(nameMap, nameProperty);
  }
};

// node_modules/echarts/lib/coord/geo/Geo.js
var GEO_DEFAULT_PARAMS = {
  "geoJSON": {
    aspectScale: 0.75,
    invertLongitute: true
  },
  "geoSVG": {
    aspectScale: 1,
    invertLongitute: false
  }
};
var geo2DDimensions = ["lng", "lat"];
var Geo = (
  /** @class */
  function(_super) {
    __extends(Geo2, _super);
    function Geo2(name, map2, opt) {
      var _this = _super.call(this, name) || this;
      _this.dimensions = geo2DDimensions;
      _this.type = "geo";
      _this._nameCoordMap = createHashMap();
      _this.map = map2;
      var projection = opt.projection;
      var source = geoSourceManager_default.load(map2, opt.nameMap, opt.nameProperty);
      var resource = geoSourceManager_default.getGeoResource(map2);
      var resourceType = _this.resourceType = resource ? resource.type : null;
      var regions = _this.regions = source.regions;
      var defaultParams = GEO_DEFAULT_PARAMS[resource.type];
      _this._regionsMap = source.regionsMap;
      _this.regions = source.regions;
      if (projection) {
        if (resourceType === "geoSVG") {
          if (true) {
            warn("Map " + map2 + " with SVG source can't use projection. Only GeoJSON source supports projection.");
          }
          projection = null;
        }
        if (!(projection.project && projection.unproject)) {
          if (true) {
            warn("project and unproject must be both provided in the projeciton.");
          }
          projection = null;
        }
      }
      _this.projection = projection;
      var boundingRect;
      if (projection) {
        for (var i = 0; i < regions.length; i++) {
          var regionRect = regions[i].getBoundingRect(projection);
          boundingRect = boundingRect || regionRect.clone();
          boundingRect.union(regionRect);
        }
      } else {
        boundingRect = source.boundingRect;
      }
      _this.setBoundingRect(boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height);
      _this.aspectScale = projection ? 1 : retrieve2(opt.aspectScale, defaultParams.aspectScale);
      _this._invertLongitute = projection ? false : defaultParams.invertLongitute;
      return _this;
    }
    Geo2.prototype._transformTo = function(x, y, width, height) {
      var rect = this.getBoundingRect();
      var invertLongitute = this._invertLongitute;
      rect = rect.clone();
      if (invertLongitute) {
        rect.y = -rect.y - rect.height;
      }
      var rawTransformable = this._rawTransformable;
      rawTransformable.transform = rect.calculateTransform(new BoundingRect_default(x, y, width, height));
      var rawParent = rawTransformable.parent;
      rawTransformable.parent = null;
      rawTransformable.decomposeTransform();
      rawTransformable.parent = rawParent;
      if (invertLongitute) {
        rawTransformable.scaleY = -rawTransformable.scaleY;
      }
      this._updateTransform();
    };
    Geo2.prototype.getRegion = function(name) {
      return this._regionsMap.get(name);
    };
    Geo2.prototype.getRegionByCoord = function(coord) {
      var regions = this.regions;
      for (var i = 0; i < regions.length; i++) {
        var region = regions[i];
        if (region.type === "geoJSON" && region.contain(coord)) {
          return regions[i];
        }
      }
    };
    Geo2.prototype.addGeoCoord = function(name, geoCoord2) {
      this._nameCoordMap.set(name, geoCoord2);
    };
    Geo2.prototype.getGeoCoord = function(name) {
      var region = this._regionsMap.get(name);
      return this._nameCoordMap.get(name) || region && region.getCenter();
    };
    Geo2.prototype.dataToPoint = function(data, noRoam, out) {
      if (isString(data)) {
        data = this.getGeoCoord(data);
      }
      if (data) {
        var projection = this.projection;
        if (projection) {
          data = projection.project(data);
        }
        return data && this.projectedToPoint(data, noRoam, out);
      }
    };
    Geo2.prototype.pointToData = function(point) {
      var projection = this.projection;
      if (projection) {
        point = projection.unproject(point);
      }
      return point && this.pointToProjected(point);
    };
    Geo2.prototype.pointToProjected = function(point) {
      return _super.prototype.pointToData.call(this, point);
    };
    Geo2.prototype.projectedToPoint = function(projected, noRoam, out) {
      return _super.prototype.dataToPoint.call(this, projected, noRoam, out);
    };
    Geo2.prototype.convertToPixel = function(ecModel, finder, value) {
      var coordSys = getCoordSys2(finder);
      return coordSys === this ? coordSys.dataToPoint(value) : null;
    };
    Geo2.prototype.convertFromPixel = function(ecModel, finder, pixel) {
      var coordSys = getCoordSys2(finder);
      return coordSys === this ? coordSys.pointToData(pixel) : null;
    };
    return Geo2;
  }(View_default)
);
mixin(Geo, View_default);
function getCoordSys2(finder) {
  var geoModel = finder.geoModel;
  var seriesModel = finder.seriesModel;
  return geoModel ? geoModel.coordinateSystem : seriesModel ? seriesModel.coordinateSystem || (seriesModel.getReferringComponents("geo", SINGLE_REFERRING).models[0] || {}).coordinateSystem : null;
}
var Geo_default = Geo;

// node_modules/echarts/lib/coord/geo/geoCreator.js
function resizeGeo(geoModel, api) {
  var boundingCoords = geoModel.get("boundingCoords");
  if (boundingCoords != null) {
    var leftTop_1 = boundingCoords[0];
    var rightBottom_1 = boundingCoords[1];
    if (!(isFinite(leftTop_1[0]) && isFinite(leftTop_1[1]) && isFinite(rightBottom_1[0]) && isFinite(rightBottom_1[1]))) {
      if (true) {
        console.error("Invalid boundingCoords");
      }
    } else {
      var projection_1 = this.projection;
      if (projection_1) {
        var xMin = leftTop_1[0];
        var yMin = leftTop_1[1];
        var xMax = rightBottom_1[0];
        var yMax = rightBottom_1[1];
        leftTop_1 = [Infinity, Infinity];
        rightBottom_1 = [-Infinity, -Infinity];
        var sampleLine = function(x0, y0, x1, y1) {
          var dx = x1 - x0;
          var dy = y1 - y0;
          for (var i = 0; i <= 100; i++) {
            var p = i / 100;
            var pt = projection_1.project([x0 + dx * p, y0 + dy * p]);
            min(leftTop_1, leftTop_1, pt);
            max(rightBottom_1, rightBottom_1, pt);
          }
        };
        sampleLine(xMin, yMin, xMax, yMin);
        sampleLine(xMax, yMin, xMax, yMax);
        sampleLine(xMax, yMax, xMin, yMax);
        sampleLine(xMin, yMax, xMax, yMin);
      }
      this.setBoundingRect(leftTop_1[0], leftTop_1[1], rightBottom_1[0] - leftTop_1[0], rightBottom_1[1] - leftTop_1[1]);
    }
  }
  var rect = this.getBoundingRect();
  var centerOption = geoModel.get("layoutCenter");
  var sizeOption = geoModel.get("layoutSize");
  var viewWidth = api.getWidth();
  var viewHeight = api.getHeight();
  var aspect = rect.width / rect.height * this.aspectScale;
  var useCenterAndSize = false;
  var center;
  var size;
  if (centerOption && sizeOption) {
    center = [parsePercent(centerOption[0], viewWidth), parsePercent(centerOption[1], viewHeight)];
    size = parsePercent(sizeOption, Math.min(viewWidth, viewHeight));
    if (!isNaN(center[0]) && !isNaN(center[1]) && !isNaN(size)) {
      useCenterAndSize = true;
    } else {
      if (true) {
        console.warn("Given layoutCenter or layoutSize data are invalid. Use left/top/width/height instead.");
      }
    }
  }
  var viewRect;
  if (useCenterAndSize) {
    viewRect = {};
    if (aspect > 1) {
      viewRect.width = size;
      viewRect.height = size / aspect;
    } else {
      viewRect.height = size;
      viewRect.width = size * aspect;
    }
    viewRect.y = center[1] - viewRect.height / 2;
    viewRect.x = center[0] - viewRect.width / 2;
  } else {
    var boxLayoutOption = geoModel.getBoxLayoutParams();
    boxLayoutOption.aspect = aspect;
    viewRect = getLayoutRect(boxLayoutOption, {
      width: viewWidth,
      height: viewHeight
    });
  }
  this.setViewRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
  this.setCenter(geoModel.get("center"), api);
  this.setZoom(geoModel.get("zoom"));
}
function setGeoCoords(geo, model) {
  each(model.get("geoCoord"), function(geoCoord2, name) {
    geo.addGeoCoord(name, geoCoord2);
  });
}
var GeoCreator = (
  /** @class */
  function() {
    function GeoCreator2() {
      this.dimensions = geo2DDimensions;
    }
    GeoCreator2.prototype.create = function(ecModel, api) {
      var geoList = [];
      function getCommonGeoProperties(model) {
        return {
          nameProperty: model.get("nameProperty"),
          aspectScale: model.get("aspectScale"),
          projection: model.get("projection")
        };
      }
      ecModel.eachComponent("geo", function(geoModel, idx) {
        var mapName = geoModel.get("map");
        var geo = new Geo_default(mapName + idx, mapName, extend({
          nameMap: geoModel.get("nameMap")
        }, getCommonGeoProperties(geoModel)));
        geo.zoomLimit = geoModel.get("scaleLimit");
        geoList.push(geo);
        geoModel.coordinateSystem = geo;
        geo.model = geoModel;
        geo.resize = resizeGeo;
        geo.resize(geoModel, api);
      });
      ecModel.eachSeries(function(seriesModel) {
        var coordSys = seriesModel.get("coordinateSystem");
        if (coordSys === "geo") {
          var geoIndex = seriesModel.get("geoIndex") || 0;
          seriesModel.coordinateSystem = geoList[geoIndex];
        }
      });
      var mapModelGroupBySeries = {};
      ecModel.eachSeriesByType("map", function(seriesModel) {
        if (!seriesModel.getHostGeoModel()) {
          var mapType = seriesModel.getMapType();
          mapModelGroupBySeries[mapType] = mapModelGroupBySeries[mapType] || [];
          mapModelGroupBySeries[mapType].push(seriesModel);
        }
      });
      each(mapModelGroupBySeries, function(mapSeries, mapType) {
        var nameMapList = map(mapSeries, function(singleMapSeries) {
          return singleMapSeries.get("nameMap");
        });
        var geo = new Geo_default(mapType, mapType, extend({
          nameMap: mergeAll(nameMapList)
        }, getCommonGeoProperties(mapSeries[0])));
        geo.zoomLimit = retrieve.apply(null, map(mapSeries, function(singleMapSeries) {
          return singleMapSeries.get("scaleLimit");
        }));
        geoList.push(geo);
        geo.resize = resizeGeo;
        geo.resize(mapSeries[0], api);
        each(mapSeries, function(singleMapSeries) {
          singleMapSeries.coordinateSystem = geo;
          setGeoCoords(geo, singleMapSeries);
        });
      });
      return geoList;
    };
    GeoCreator2.prototype.getFilledRegions = function(originRegionArr, mapName, nameMap, nameProperty) {
      var regionsArr = (originRegionArr || []).slice();
      var dataNameMap = createHashMap();
      for (var i = 0; i < regionsArr.length; i++) {
        dataNameMap.set(regionsArr[i].name, regionsArr[i]);
      }
      var source = geoSourceManager_default.load(mapName, nameMap, nameProperty);
      each(source.regions, function(region) {
        var name = region.name;
        var regionOption = dataNameMap.get(name);
        var specifiedGeoJSONRegionStyle = region.properties && region.properties.echartsStyle;
        if (!regionOption) {
          regionOption = {
            name
          };
          regionsArr.push(regionOption);
        }
        specifiedGeoJSONRegionStyle && merge(regionOption, specifiedGeoJSONRegionStyle);
      });
      return regionsArr;
    };
    return GeoCreator2;
  }()
);
var geoCreator = new GeoCreator();
var geoCreator_default = geoCreator;

// node_modules/echarts/lib/coord/geo/GeoModel.js
var GeoModel = (
  /** @class */
  function(_super) {
    __extends(GeoModel2, _super);
    function GeoModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = GeoModel2.type;
      return _this;
    }
    GeoModel2.prototype.init = function(option, parentModel, ecModel) {
      var source = geoSourceManager_default.getGeoResource(option.map);
      if (source && source.type === "geoJSON") {
        var itemStyle = option.itemStyle = option.itemStyle || {};
        if (!("color" in itemStyle)) {
          itemStyle.color = "#eee";
        }
      }
      this.mergeDefaultAndTheme(option, ecModel);
      defaultEmphasis(option, "label", ["show"]);
    };
    GeoModel2.prototype.optionUpdated = function() {
      var _this = this;
      var option = this.option;
      option.regions = geoCreator_default.getFilledRegions(option.regions, option.map, option.nameMap, option.nameProperty);
      var selectedMap = {};
      this._optionModelMap = reduce(option.regions || [], function(optionModelMap, regionOpt) {
        var regionName = regionOpt.name;
        if (regionName) {
          optionModelMap.set(regionName, new Model_default(regionOpt, _this, _this.ecModel));
          if (regionOpt.selected) {
            selectedMap[regionName] = true;
          }
        }
        return optionModelMap;
      }, createHashMap());
      if (!option.selectedMap) {
        option.selectedMap = selectedMap;
      }
    };
    GeoModel2.prototype.getRegionModel = function(name) {
      return this._optionModelMap.get(name) || new Model_default(null, this, this.ecModel);
    };
    GeoModel2.prototype.getFormattedLabel = function(name, status) {
      var regionModel = this.getRegionModel(name);
      var formatter = status === "normal" ? regionModel.get(["label", "formatter"]) : regionModel.get(["emphasis", "label", "formatter"]);
      var params = {
        name
      };
      if (isFunction(formatter)) {
        params.status = status;
        return formatter(params);
      } else if (isString(formatter)) {
        return formatter.replace("{a}", name != null ? name : "");
      }
    };
    GeoModel2.prototype.setZoom = function(zoom) {
      this.option.zoom = zoom;
    };
    GeoModel2.prototype.setCenter = function(center) {
      this.option.center = center;
    };
    GeoModel2.prototype.select = function(name) {
      var option = this.option;
      var selectedMode = option.selectedMode;
      if (!selectedMode) {
        return;
      }
      if (selectedMode !== "multiple") {
        option.selectedMap = null;
      }
      var selectedMap = option.selectedMap || (option.selectedMap = {});
      selectedMap[name] = true;
    };
    GeoModel2.prototype.unSelect = function(name) {
      var selectedMap = this.option.selectedMap;
      if (selectedMap) {
        selectedMap[name] = false;
      }
    };
    GeoModel2.prototype.toggleSelected = function(name) {
      this[this.isSelected(name) ? "unSelect" : "select"](name);
    };
    GeoModel2.prototype.isSelected = function(name) {
      var selectedMap = this.option.selectedMap;
      return !!(selectedMap && selectedMap[name]);
    };
    GeoModel2.type = "geo";
    GeoModel2.layoutMode = "box";
    GeoModel2.defaultOption = {
      // zlevel: 0,
      z: 0,
      show: true,
      left: "center",
      top: "center",
      // Default value:
      // for geoSVG source: 1,
      // for geoJSON source: 0.75.
      aspectScale: null,
      // /// Layout with center and size
      // If you want to put map in a fixed size box with right aspect ratio
      // This two properties may be more convenient
      // layoutCenter: [50%, 50%]
      // layoutSize: 100
      silent: false,
      // Map type
      map: "",
      // Define left-top, right-bottom coords to control view
      // For example, [ [180, 90], [-180, -90] ]
      boundingCoords: null,
      // Default on center of map
      center: null,
      zoom: 1,
      scaleLimit: null,
      // selectedMode: false
      label: {
        show: false,
        color: "#000"
      },
      itemStyle: {
        borderWidth: 0.5,
        borderColor: "#444"
        // Default color:
        // + geoJSON: #eee
        // + geoSVG: null (use SVG original `fill`)
        // color: '#eee'
      },
      emphasis: {
        label: {
          show: true,
          color: "rgb(100,0,0)"
        },
        itemStyle: {
          color: "rgba(255,215,0,0.8)"
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
      regions: []
      // tooltip: {
      //     show: false
      // }
    };
    return GeoModel2;
  }(Component_default)
);
var GeoModel_default = GeoModel;

// node_modules/echarts/lib/action/roamHelper.js
function getCenterCoord(view, point) {
  return view.pointToProjected ? view.pointToProjected(point) : view.pointToData(point);
}
function updateCenterAndZoom(view, payload, zoomLimit, api) {
  var previousZoom = view.getZoom();
  var center = view.getCenter();
  var zoom = payload.zoom;
  var point = view.projectedToPoint ? view.projectedToPoint(center) : view.dataToPoint(center);
  if (payload.dx != null && payload.dy != null) {
    point[0] -= payload.dx;
    point[1] -= payload.dy;
    view.setCenter(getCenterCoord(view, point), api);
  }
  if (zoom != null) {
    if (zoomLimit) {
      var zoomMin = zoomLimit.min || 0;
      var zoomMax = zoomLimit.max || Infinity;
      zoom = Math.max(Math.min(previousZoom * zoom, zoomMax), zoomMin) / previousZoom;
    }
    view.scaleX *= zoom;
    view.scaleY *= zoom;
    var fixX = (payload.originX - view.x) * (zoom - 1);
    var fixY = (payload.originY - view.y) * (zoom - 1);
    view.x -= fixX;
    view.y -= fixY;
    view.updateTransform();
    view.setCenter(getCenterCoord(view, point), api);
    view.setZoom(zoom * previousZoom);
  }
  return {
    center: view.getCenter(),
    zoom: view.getZoom()
  };
}

// node_modules/echarts/lib/component/helper/interactionMutex.js
var ATTR = "\0_ec_interaction_mutex";
function take(zr, resourceKey, userKey) {
  var store = getStore(zr);
  store[resourceKey] = userKey;
}
function release(zr, resourceKey, userKey) {
  var store = getStore(zr);
  var uKey = store[resourceKey];
  if (uKey === userKey) {
    store[resourceKey] = null;
  }
}
function isTaken(zr, resourceKey) {
  return !!getStore(zr)[resourceKey];
}
function getStore(zr) {
  return zr[ATTR] || (zr[ATTR] = {});
}
registerAction({
  type: "takeGlobalCursor",
  event: "globalCursorTaken",
  update: "update"
}, noop);

// node_modules/echarts/lib/component/helper/RoamController.js
var RoamController = (
  /** @class */
  function(_super) {
    __extends(RoamController2, _super);
    function RoamController2(zr) {
      var _this = _super.call(this) || this;
      _this._zr = zr;
      var mousedownHandler = bind(_this._mousedownHandler, _this);
      var mousemoveHandler = bind(_this._mousemoveHandler, _this);
      var mouseupHandler = bind(_this._mouseupHandler, _this);
      var mousewheelHandler = bind(_this._mousewheelHandler, _this);
      var pinchHandler = bind(_this._pinchHandler, _this);
      _this.enable = function(controlType, opt) {
        this.disable();
        this._opt = defaults(clone(opt) || {}, {
          zoomOnMouseWheel: true,
          moveOnMouseMove: true,
          // By default, wheel do not trigger move.
          moveOnMouseWheel: false,
          preventDefaultMouseMove: true
        });
        if (controlType == null) {
          controlType = true;
        }
        if (controlType === true || controlType === "move" || controlType === "pan") {
          zr.on("mousedown", mousedownHandler);
          zr.on("mousemove", mousemoveHandler);
          zr.on("mouseup", mouseupHandler);
        }
        if (controlType === true || controlType === "scale" || controlType === "zoom") {
          zr.on("mousewheel", mousewheelHandler);
          zr.on("pinch", pinchHandler);
        }
      };
      _this.disable = function() {
        zr.off("mousedown", mousedownHandler);
        zr.off("mousemove", mousemoveHandler);
        zr.off("mouseup", mouseupHandler);
        zr.off("mousewheel", mousewheelHandler);
        zr.off("pinch", pinchHandler);
      };
      return _this;
    }
    RoamController2.prototype.isDragging = function() {
      return this._dragging;
    };
    RoamController2.prototype.isPinching = function() {
      return this._pinching;
    };
    RoamController2.prototype.setPointerChecker = function(pointerChecker) {
      this.pointerChecker = pointerChecker;
    };
    RoamController2.prototype.dispose = function() {
      this.disable();
    };
    RoamController2.prototype._mousedownHandler = function(e) {
      if (isMiddleOrRightButtonOnMouseUpDown(e)) {
        return;
      }
      var el = e.target;
      while (el) {
        if (el.draggable) {
          return;
        }
        el = el.__hostTarget || el.parent;
      }
      var x = e.offsetX;
      var y = e.offsetY;
      if (this.pointerChecker && this.pointerChecker(e, x, y)) {
        this._x = x;
        this._y = y;
        this._dragging = true;
      }
    };
    RoamController2.prototype._mousemoveHandler = function(e) {
      if (!this._dragging || !isAvailableBehavior("moveOnMouseMove", e, this._opt) || e.gestureEvent === "pinch" || isTaken(this._zr, "globalPan")) {
        return;
      }
      var x = e.offsetX;
      var y = e.offsetY;
      var oldX = this._x;
      var oldY = this._y;
      var dx = x - oldX;
      var dy = y - oldY;
      this._x = x;
      this._y = y;
      this._opt.preventDefaultMouseMove && stop(e.event);
      trigger(this, "pan", "moveOnMouseMove", e, {
        dx,
        dy,
        oldX,
        oldY,
        newX: x,
        newY: y,
        isAvailableBehavior: null
      });
    };
    RoamController2.prototype._mouseupHandler = function(e) {
      if (!isMiddleOrRightButtonOnMouseUpDown(e)) {
        this._dragging = false;
      }
    };
    RoamController2.prototype._mousewheelHandler = function(e) {
      var shouldZoom = isAvailableBehavior("zoomOnMouseWheel", e, this._opt);
      var shouldMove = isAvailableBehavior("moveOnMouseWheel", e, this._opt);
      var wheelDelta = e.wheelDelta;
      var absWheelDeltaDelta = Math.abs(wheelDelta);
      var originX = e.offsetX;
      var originY = e.offsetY;
      if (wheelDelta === 0 || !shouldZoom && !shouldMove) {
        return;
      }
      if (shouldZoom) {
        var factor = absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1;
        var scale2 = wheelDelta > 0 ? factor : 1 / factor;
        checkPointerAndTrigger(this, "zoom", "zoomOnMouseWheel", e, {
          scale: scale2,
          originX,
          originY,
          isAvailableBehavior: null
        });
      }
      if (shouldMove) {
        var absDelta = Math.abs(wheelDelta);
        var scrollDelta = (wheelDelta > 0 ? 1 : -1) * (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05);
        checkPointerAndTrigger(this, "scrollMove", "moveOnMouseWheel", e, {
          scrollDelta,
          originX,
          originY,
          isAvailableBehavior: null
        });
      }
    };
    RoamController2.prototype._pinchHandler = function(e) {
      if (isTaken(this._zr, "globalPan")) {
        return;
      }
      var scale2 = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
      checkPointerAndTrigger(this, "zoom", null, e, {
        scale: scale2,
        originX: e.pinchX,
        originY: e.pinchY,
        isAvailableBehavior: null
      });
    };
    return RoamController2;
  }(Eventful_default)
);
function checkPointerAndTrigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  if (controller.pointerChecker && controller.pointerChecker(e, contollerEvent.originX, contollerEvent.originY)) {
    stop(e.event);
    trigger(controller, eventName, behaviorToCheck, e, contollerEvent);
  }
}
function trigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  contollerEvent.isAvailableBehavior = bind(isAvailableBehavior, null, behaviorToCheck, e);
  controller.trigger(eventName, contollerEvent);
}
function isAvailableBehavior(behaviorToCheck, e, settings) {
  var setting = settings[behaviorToCheck];
  return !behaviorToCheck || setting && (!isString(setting) || e.event[setting + "Key"]);
}
var RoamController_default = RoamController;

// node_modules/echarts/lib/component/helper/roamHelper.js
function updateViewOnPan(controllerHost, dx, dy) {
  var target = controllerHost.target;
  target.x += dx;
  target.y += dy;
  target.dirty();
}
function updateViewOnZoom(controllerHost, zoomDelta, zoomX, zoomY) {
  var target = controllerHost.target;
  var zoomLimit = controllerHost.zoomLimit;
  var newZoom = controllerHost.zoom = controllerHost.zoom || 1;
  newZoom *= zoomDelta;
  if (zoomLimit) {
    var zoomMin = zoomLimit.min || 0;
    var zoomMax = zoomLimit.max || Infinity;
    newZoom = Math.max(Math.min(zoomMax, newZoom), zoomMin);
  }
  var zoomScale = newZoom / controllerHost.zoom;
  controllerHost.zoom = newZoom;
  target.x -= (zoomX - target.x) * (zoomScale - 1);
  target.y -= (zoomY - target.y) * (zoomScale - 1);
  target.scaleX *= zoomScale;
  target.scaleY *= zoomScale;
  target.dirty();
}

// node_modules/echarts/lib/component/helper/cursorHelper.js
var IRRELEVANT_EXCLUDES = {
  "axisPointer": 1,
  "tooltip": 1,
  "brush": 1
};
function onIrrelevantElement(e, api, targetCoordSysModel) {
  var model = api.getComponentByElement(e.topTarget);
  var coordSys = model && model.coordinateSystem;
  return model && model !== targetCoordSysModel && !IRRELEVANT_EXCLUDES.hasOwnProperty(model.mainType) && coordSys && coordSys.model !== targetCoordSysModel;
}

// node_modules/echarts/lib/component/helper/MapDraw.js
var OPTION_STYLE_ENABLED_TAGS = ["rect", "circle", "line", "ellipse", "polygon", "polyline", "path"];
var OPTION_STYLE_ENABLED_TAG_MAP = createHashMap(OPTION_STYLE_ENABLED_TAGS);
var STATE_TRIGGER_TAG_MAP = createHashMap(OPTION_STYLE_ENABLED_TAGS.concat(["g"]));
var LABEL_HOST_MAP = createHashMap(OPTION_STYLE_ENABLED_TAGS.concat(["g"]));
var mapLabelRaw = makeInner();
function getFixedItemStyle(model) {
  var itemStyle = model.getItemStyle();
  var areaColor = model.get("areaColor");
  if (areaColor != null) {
    itemStyle.fill = areaColor;
  }
  return itemStyle;
}
function fixLineStyle(styleHost) {
  var style = styleHost.style;
  if (style) {
    style.stroke = style.stroke || style.fill;
    style.fill = null;
  }
}
var MapDraw = (
  /** @class */
  function() {
    function MapDraw2(api) {
      var group = new Group_default();
      this.uid = getUID("ec_map_draw");
      this._controller = new RoamController_default(api.getZr());
      this._controllerHost = {
        target: group
      };
      this.group = group;
      group.add(this._regionsGroup = new Group_default());
      group.add(this._svgGroup = new Group_default());
    }
    MapDraw2.prototype.draw = function(mapOrGeoModel, ecModel, api, fromView, payload) {
      var isGeo = mapOrGeoModel.mainType === "geo";
      var data = mapOrGeoModel.getData && mapOrGeoModel.getData();
      isGeo && ecModel.eachComponent({
        mainType: "series",
        subType: "map"
      }, function(mapSeries) {
        if (!data && mapSeries.getHostGeoModel() === mapOrGeoModel) {
          data = mapSeries.getData();
        }
      });
      var geo = mapOrGeoModel.coordinateSystem;
      var regionsGroup = this._regionsGroup;
      var group = this.group;
      var transformInfo = geo.getTransformInfo();
      var transformInfoRaw = transformInfo.raw;
      var transformInfoRoam = transformInfo.roam;
      var isFirstDraw = !regionsGroup.childAt(0) || payload;
      if (isFirstDraw) {
        group.x = transformInfoRoam.x;
        group.y = transformInfoRoam.y;
        group.scaleX = transformInfoRoam.scaleX;
        group.scaleY = transformInfoRoam.scaleY;
        group.dirty();
      } else {
        updateProps(group, transformInfoRoam, mapOrGeoModel);
      }
      var isVisualEncodedByVisualMap = data && data.getVisual("visualMeta") && data.getVisual("visualMeta").length > 0;
      var viewBuildCtx = {
        api,
        geo,
        mapOrGeoModel,
        data,
        isVisualEncodedByVisualMap,
        isGeo,
        transformInfoRaw
      };
      if (geo.resourceType === "geoJSON") {
        this._buildGeoJSON(viewBuildCtx);
      } else if (geo.resourceType === "geoSVG") {
        this._buildSVG(viewBuildCtx);
      }
      this._updateController(mapOrGeoModel, ecModel, api);
      this._updateMapSelectHandler(mapOrGeoModel, regionsGroup, api, fromView);
    };
    MapDraw2.prototype._buildGeoJSON = function(viewBuildCtx) {
      var regionsGroupByName = this._regionsGroupByName = createHashMap();
      var regionsInfoByName = createHashMap();
      var regionsGroup = this._regionsGroup;
      var transformInfoRaw = viewBuildCtx.transformInfoRaw;
      var mapOrGeoModel = viewBuildCtx.mapOrGeoModel;
      var data = viewBuildCtx.data;
      var projection = viewBuildCtx.geo.projection;
      var projectionStream = projection && projection.stream;
      function transformPoint(point, project) {
        if (project) {
          point = project(point);
        }
        return point && [point[0] * transformInfoRaw.scaleX + transformInfoRaw.x, point[1] * transformInfoRaw.scaleY + transformInfoRaw.y];
      }
      ;
      function transformPolygonPoints(inPoints) {
        var outPoints = [];
        var project = !projectionStream && projection && projection.project;
        for (var i = 0; i < inPoints.length; ++i) {
          var newPt = transformPoint(inPoints[i], project);
          newPt && outPoints.push(newPt);
        }
        return outPoints;
      }
      function getPolyShape(points3) {
        return {
          shape: {
            points: transformPolygonPoints(points3)
          }
        };
      }
      regionsGroup.removeAll();
      each(viewBuildCtx.geo.regions, function(region) {
        var regionName = region.name;
        var regionGroup = regionsGroupByName.get(regionName);
        var _a = regionsInfoByName.get(regionName) || {}, dataIdx = _a.dataIdx, regionModel = _a.regionModel;
        if (!regionGroup) {
          regionGroup = regionsGroupByName.set(regionName, new Group_default());
          regionsGroup.add(regionGroup);
          dataIdx = data ? data.indexOfName(regionName) : null;
          regionModel = viewBuildCtx.isGeo ? mapOrGeoModel.getRegionModel(regionName) : data ? data.getItemModel(dataIdx) : null;
          var silent = regionModel.get("silent", true);
          silent != null && (regionGroup.silent = silent);
          regionsInfoByName.set(regionName, {
            dataIdx,
            regionModel
          });
        }
        var polygonSubpaths = [];
        var polylineSubpaths = [];
        each(region.geometries, function(geometry) {
          if (geometry.type === "polygon") {
            var polys = [geometry.exterior].concat(geometry.interiors || []);
            if (projectionStream) {
              polys = projectPolys(polys, projectionStream);
            }
            each(polys, function(poly) {
              polygonSubpaths.push(new Polygon_default(getPolyShape(poly)));
            });
          } else {
            var points3 = geometry.points;
            if (projectionStream) {
              points3 = projectPolys(points3, projectionStream, true);
            }
            each(points3, function(points4) {
              polylineSubpaths.push(new Polyline_default(getPolyShape(points4)));
            });
          }
        });
        var centerPt = transformPoint(region.getCenter(), projection && projection.project);
        function createCompoundPath(subpaths, isLine) {
          if (!subpaths.length) {
            return;
          }
          var compoundPath = new CompoundPath_default({
            culling: true,
            segmentIgnoreThreshold: 1,
            shape: {
              paths: subpaths
            }
          });
          regionGroup.add(compoundPath);
          applyOptionStyleForRegion(viewBuildCtx, compoundPath, dataIdx, regionModel);
          resetLabelForRegion(viewBuildCtx, compoundPath, regionName, regionModel, mapOrGeoModel, dataIdx, centerPt);
          if (isLine) {
            fixLineStyle(compoundPath);
            each(compoundPath.states, fixLineStyle);
          }
        }
        createCompoundPath(polygonSubpaths);
        createCompoundPath(polylineSubpaths, true);
      });
      regionsGroupByName.each(function(regionGroup, regionName) {
        var _a = regionsInfoByName.get(regionName), dataIdx = _a.dataIdx, regionModel = _a.regionModel;
        resetEventTriggerForRegion(viewBuildCtx, regionGroup, regionName, regionModel, mapOrGeoModel, dataIdx);
        resetTooltipForRegion(viewBuildCtx, regionGroup, regionName, regionModel, mapOrGeoModel);
        resetStateTriggerForRegion(viewBuildCtx, regionGroup, regionName, regionModel, mapOrGeoModel);
      }, this);
    };
    MapDraw2.prototype._buildSVG = function(viewBuildCtx) {
      var mapName = viewBuildCtx.geo.map;
      var transformInfoRaw = viewBuildCtx.transformInfoRaw;
      this._svgGroup.x = transformInfoRaw.x;
      this._svgGroup.y = transformInfoRaw.y;
      this._svgGroup.scaleX = transformInfoRaw.scaleX;
      this._svgGroup.scaleY = transformInfoRaw.scaleY;
      if (this._svgResourceChanged(mapName)) {
        this._freeSVG();
        this._useSVG(mapName);
      }
      var svgDispatcherMap = this._svgDispatcherMap = createHashMap();
      var focusSelf = false;
      each(this._svgGraphicRecord.named, function(namedItem) {
        var regionName = namedItem.name;
        var mapOrGeoModel = viewBuildCtx.mapOrGeoModel;
        var data = viewBuildCtx.data;
        var svgNodeTagLower = namedItem.svgNodeTagLower;
        var el = namedItem.el;
        var dataIdx = data ? data.indexOfName(regionName) : null;
        var regionModel = mapOrGeoModel.getRegionModel(regionName);
        if (OPTION_STYLE_ENABLED_TAG_MAP.get(svgNodeTagLower) != null && el instanceof Displayable_default) {
          applyOptionStyleForRegion(viewBuildCtx, el, dataIdx, regionModel);
        }
        if (el instanceof Displayable_default) {
          el.culling = true;
        }
        var silent = regionModel.get("silent", true);
        silent != null && (el.silent = silent);
        el.z2EmphasisLift = 0;
        if (!namedItem.namedFrom) {
          if (LABEL_HOST_MAP.get(svgNodeTagLower) != null) {
            resetLabelForRegion(viewBuildCtx, el, regionName, regionModel, mapOrGeoModel, dataIdx, null);
          }
          resetEventTriggerForRegion(viewBuildCtx, el, regionName, regionModel, mapOrGeoModel, dataIdx);
          resetTooltipForRegion(viewBuildCtx, el, regionName, regionModel, mapOrGeoModel);
          if (STATE_TRIGGER_TAG_MAP.get(svgNodeTagLower) != null) {
            var focus_1 = resetStateTriggerForRegion(viewBuildCtx, el, regionName, regionModel, mapOrGeoModel);
            if (focus_1 === "self") {
              focusSelf = true;
            }
            var els = svgDispatcherMap.get(regionName) || svgDispatcherMap.set(regionName, []);
            els.push(el);
          }
        }
      }, this);
      this._enableBlurEntireSVG(focusSelf, viewBuildCtx);
    };
    MapDraw2.prototype._enableBlurEntireSVG = function(focusSelf, viewBuildCtx) {
      if (focusSelf && viewBuildCtx.isGeo) {
        var blurStyle = viewBuildCtx.mapOrGeoModel.getModel(["blur", "itemStyle"]).getItemStyle();
        var opacity_1 = blurStyle.opacity;
        this._svgGraphicRecord.root.traverse(function(el) {
          if (!el.isGroup) {
            setDefaultStateProxy(el);
            var style = el.ensureState("blur").style || {};
            if (style.opacity == null && opacity_1 != null) {
              style.opacity = opacity_1;
            }
            el.ensureState("emphasis");
          }
        });
      }
    };
    MapDraw2.prototype.remove = function() {
      this._regionsGroup.removeAll();
      this._regionsGroupByName = null;
      this._svgGroup.removeAll();
      this._freeSVG();
      this._controller.dispose();
      this._controllerHost = null;
    };
    MapDraw2.prototype.findHighDownDispatchers = function(name, geoModel) {
      if (name == null) {
        return [];
      }
      var geo = geoModel.coordinateSystem;
      if (geo.resourceType === "geoJSON") {
        var regionsGroupByName = this._regionsGroupByName;
        if (regionsGroupByName) {
          var regionGroup = regionsGroupByName.get(name);
          return regionGroup ? [regionGroup] : [];
        }
      } else if (geo.resourceType === "geoSVG") {
        return this._svgDispatcherMap && this._svgDispatcherMap.get(name) || [];
      }
    };
    MapDraw2.prototype._svgResourceChanged = function(mapName) {
      return this._svgMapName !== mapName;
    };
    MapDraw2.prototype._useSVG = function(mapName) {
      var resource = geoSourceManager_default.getGeoResource(mapName);
      if (resource && resource.type === "geoSVG") {
        var svgGraphic = resource.useGraphic(this.uid);
        this._svgGroup.add(svgGraphic.root);
        this._svgGraphicRecord = svgGraphic;
        this._svgMapName = mapName;
      }
    };
    MapDraw2.prototype._freeSVG = function() {
      var mapName = this._svgMapName;
      if (mapName == null) {
        return;
      }
      var resource = geoSourceManager_default.getGeoResource(mapName);
      if (resource && resource.type === "geoSVG") {
        resource.freeGraphic(this.uid);
      }
      this._svgGraphicRecord = null;
      this._svgDispatcherMap = null;
      this._svgGroup.removeAll();
      this._svgMapName = null;
    };
    MapDraw2.prototype._updateController = function(mapOrGeoModel, ecModel, api) {
      var geo = mapOrGeoModel.coordinateSystem;
      var controller = this._controller;
      var controllerHost = this._controllerHost;
      controllerHost.zoomLimit = mapOrGeoModel.get("scaleLimit");
      controllerHost.zoom = geo.getZoom();
      controller.enable(mapOrGeoModel.get("roam") || false);
      var mainType = mapOrGeoModel.mainType;
      function makeActionBase() {
        var action = {
          type: "geoRoam",
          componentType: mainType
        };
        action[mainType + "Id"] = mapOrGeoModel.id;
        return action;
      }
      controller.off("pan").on("pan", function(e) {
        this._mouseDownFlag = false;
        updateViewOnPan(controllerHost, e.dx, e.dy);
        api.dispatchAction(extend(makeActionBase(), {
          dx: e.dx,
          dy: e.dy,
          animation: {
            duration: 0
          }
        }));
      }, this);
      controller.off("zoom").on("zoom", function(e) {
        this._mouseDownFlag = false;
        updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
        api.dispatchAction(extend(makeActionBase(), {
          totalZoom: controllerHost.zoom,
          zoom: e.scale,
          originX: e.originX,
          originY: e.originY,
          animation: {
            duration: 0
          }
        }));
      }, this);
      controller.setPointerChecker(function(e, x, y) {
        return geo.containPoint([x, y]) && !onIrrelevantElement(e, api, mapOrGeoModel);
      });
    };
    MapDraw2.prototype.resetForLabelLayout = function() {
      this.group.traverse(function(el) {
        var label = el.getTextContent();
        if (label) {
          label.ignore = mapLabelRaw(label).ignore;
        }
      });
    };
    MapDraw2.prototype._updateMapSelectHandler = function(mapOrGeoModel, regionsGroup, api, fromView) {
      var mapDraw = this;
      regionsGroup.off("mousedown");
      regionsGroup.off("click");
      if (mapOrGeoModel.get("selectedMode")) {
        regionsGroup.on("mousedown", function() {
          mapDraw._mouseDownFlag = true;
        });
        regionsGroup.on("click", function(e) {
          if (!mapDraw._mouseDownFlag) {
            return;
          }
          mapDraw._mouseDownFlag = false;
        });
      }
    };
    return MapDraw2;
  }()
);
function applyOptionStyleForRegion(viewBuildCtx, el, dataIndex, regionModel) {
  var normalStyleModel = regionModel.getModel("itemStyle");
  var emphasisStyleModel = regionModel.getModel(["emphasis", "itemStyle"]);
  var blurStyleModel = regionModel.getModel(["blur", "itemStyle"]);
  var selectStyleModel = regionModel.getModel(["select", "itemStyle"]);
  var normalStyle = getFixedItemStyle(normalStyleModel);
  var emphasisStyle = getFixedItemStyle(emphasisStyleModel);
  var selectStyle = getFixedItemStyle(selectStyleModel);
  var blurStyle = getFixedItemStyle(blurStyleModel);
  var data = viewBuildCtx.data;
  if (data) {
    var style = data.getItemVisual(dataIndex, "style");
    var decal = data.getItemVisual(dataIndex, "decal");
    if (viewBuildCtx.isVisualEncodedByVisualMap && style.fill) {
      normalStyle.fill = style.fill;
    }
    if (decal) {
      normalStyle.decal = createOrUpdatePatternFromDecal(decal, viewBuildCtx.api);
    }
  }
  el.setStyle(normalStyle);
  el.style.strokeNoScale = true;
  el.ensureState("emphasis").style = emphasisStyle;
  el.ensureState("select").style = selectStyle;
  el.ensureState("blur").style = blurStyle;
  setDefaultStateProxy(el);
}
function resetLabelForRegion(viewBuildCtx, el, regionName, regionModel, mapOrGeoModel, dataIdx, labelXY) {
  var data = viewBuildCtx.data;
  var isGeo = viewBuildCtx.isGeo;
  var isDataNaN = data && isNaN(data.get(data.mapDimension("value"), dataIdx));
  var itemLayout = data && data.getItemLayout(dataIdx);
  if (isGeo || isDataNaN || itemLayout && itemLayout.showLabel) {
    var query = !isGeo ? dataIdx : regionName;
    var labelFetcher = void 0;
    if (!data || dataIdx >= 0) {
      labelFetcher = mapOrGeoModel;
    }
    var specifiedTextOpt = labelXY ? {
      normal: {
        align: "center",
        verticalAlign: "middle"
      }
    } : null;
    setLabelStyle(el, getLabelStatesModels(regionModel), {
      labelFetcher,
      labelDataIndex: query,
      defaultText: regionName
    }, specifiedTextOpt);
    var textEl = el.getTextContent();
    if (textEl) {
      mapLabelRaw(textEl).ignore = textEl.ignore;
      if (el.textConfig && labelXY) {
        var rect = el.getBoundingRect().clone();
        el.textConfig.layoutRect = rect;
        el.textConfig.position = [(labelXY[0] - rect.x) / rect.width * 100 + "%", (labelXY[1] - rect.y) / rect.height * 100 + "%"];
      }
    }
    el.disableLabelAnimation = true;
  } else {
    el.removeTextContent();
    el.removeTextConfig();
    el.disableLabelAnimation = null;
  }
}
function resetEventTriggerForRegion(viewBuildCtx, eventTrigger, regionName, regionModel, mapOrGeoModel, dataIdx) {
  if (viewBuildCtx.data) {
    viewBuildCtx.data.setItemGraphicEl(dataIdx, eventTrigger);
  } else {
    getECData(eventTrigger).eventData = {
      componentType: "geo",
      componentIndex: mapOrGeoModel.componentIndex,
      geoIndex: mapOrGeoModel.componentIndex,
      name: regionName,
      region: regionModel && regionModel.option || {}
    };
  }
}
function resetTooltipForRegion(viewBuildCtx, el, regionName, regionModel, mapOrGeoModel) {
  if (!viewBuildCtx.data) {
    setTooltipConfig({
      el,
      componentModel: mapOrGeoModel,
      itemName: regionName,
      // @ts-ignore FIXME:TS fix the "compatible with each other"?
      itemTooltipOption: regionModel.get("tooltip")
    });
  }
}
function resetStateTriggerForRegion(viewBuildCtx, el, regionName, regionModel, mapOrGeoModel) {
  el.highDownSilentOnTouch = !!mapOrGeoModel.get("selectedMode");
  var emphasisModel = regionModel.getModel("emphasis");
  var focus = emphasisModel.get("focus");
  toggleHoverEmphasis(el, focus, emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
  if (viewBuildCtx.isGeo) {
    enableComponentHighDownFeatures(el, mapOrGeoModel, regionName);
  }
  return focus;
}
function projectPolys(rings, createStream, isLine) {
  var polygons = [];
  var curPoly;
  function startPolygon() {
    curPoly = [];
  }
  function endPolygon() {
    if (curPoly.length) {
      polygons.push(curPoly);
      curPoly = [];
    }
  }
  var stream = createStream({
    polygonStart: startPolygon,
    polygonEnd: endPolygon,
    lineStart: startPolygon,
    lineEnd: endPolygon,
    point: function(x, y) {
      if (isFinite(x) && isFinite(y)) {
        curPoly.push([x, y]);
      }
    },
    sphere: function() {
    }
  });
  !isLine && stream.polygonStart();
  each(rings, function(ring) {
    stream.lineStart();
    for (var i = 0; i < ring.length; i++) {
      stream.point(ring[i][0], ring[i][1]);
    }
    stream.lineEnd();
  });
  !isLine && stream.polygonEnd();
  return polygons;
}
var MapDraw_default = MapDraw;

// node_modules/echarts/lib/component/geo/GeoView.js
var GeoView = (
  /** @class */
  function(_super) {
    __extends(GeoView2, _super);
    function GeoView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = GeoView2.type;
      _this.focusBlurEnabled = true;
      return _this;
    }
    GeoView2.prototype.init = function(ecModel, api) {
      this._api = api;
    };
    GeoView2.prototype.render = function(geoModel, ecModel, api, payload) {
      this._model = geoModel;
      if (!geoModel.get("show")) {
        this._mapDraw && this._mapDraw.remove();
        this._mapDraw = null;
        return;
      }
      if (!this._mapDraw) {
        this._mapDraw = new MapDraw_default(api);
      }
      var mapDraw = this._mapDraw;
      mapDraw.draw(geoModel, ecModel, api, this, payload);
      mapDraw.group.on("click", this._handleRegionClick, this);
      mapDraw.group.silent = geoModel.get("silent");
      this.group.add(mapDraw.group);
      this.updateSelectStatus(geoModel, ecModel, api);
    };
    GeoView2.prototype._handleRegionClick = function(e) {
      var eventData;
      findEventDispatcher(e.target, function(current) {
        return (eventData = getECData(current).eventData) != null;
      }, true);
      if (eventData) {
        this._api.dispatchAction({
          type: "geoToggleSelect",
          geoId: this._model.id,
          name: eventData.name
        });
      }
    };
    GeoView2.prototype.updateSelectStatus = function(model, ecModel, api) {
      var _this = this;
      this._mapDraw.group.traverse(function(node) {
        var eventData = getECData(node).eventData;
        if (eventData) {
          _this._model.isSelected(eventData.name) ? api.enterSelect(node) : api.leaveSelect(node);
          return true;
        }
      });
    };
    GeoView2.prototype.findHighDownDispatchers = function(name) {
      return this._mapDraw && this._mapDraw.findHighDownDispatchers(name, this._model);
    };
    GeoView2.prototype.dispose = function() {
      this._mapDraw && this._mapDraw.remove();
    };
    GeoView2.type = "geo";
    return GeoView2;
  }(Component_default2)
);
var GeoView_default = GeoView;

// node_modules/echarts/lib/component/geo/install.js
function registerMap(mapName, geoJson, specialAreas) {
  geoSourceManager_default.registerMap(mapName, geoJson, specialAreas);
}
function install3(registers) {
  registers.registerCoordinateSystem("geo", geoCreator_default);
  registers.registerComponentModel(GeoModel_default);
  registers.registerComponentView(GeoView_default);
  registers.registerImpl("registerMap", registerMap);
  registers.registerImpl("getMap", function(mapName) {
    return geoSourceManager_default.getMapForUser(mapName);
  });
  function makeAction(method, actionInfo2) {
    actionInfo2.update = "geo:updateSelectStatus";
    registers.registerAction(actionInfo2, function(payload, ecModel) {
      var selected = {};
      var allSelected = [];
      ecModel.eachComponent({
        mainType: "geo",
        query: payload
      }, function(geoModel) {
        geoModel[method](payload.name);
        var geo = geoModel.coordinateSystem;
        each(geo.regions, function(region) {
          selected[region.name] = geoModel.isSelected(region.name) || false;
        });
        var names = [];
        each(selected, function(v, name) {
          selected[name] && names.push(name);
        });
        allSelected.push({
          geoIndex: geoModel.componentIndex,
          // Use singular, the same naming convention as the event `selectchanged`.
          name: names
        });
      });
      return {
        selected,
        allSelected,
        name: payload.name
      };
    });
  }
  makeAction("toggleSelected", {
    type: "geoToggleSelect",
    event: "geoselectchanged"
  });
  makeAction("select", {
    type: "geoSelect",
    event: "geoselected"
  });
  makeAction("unSelect", {
    type: "geoUnSelect",
    event: "geounselected"
  });
  registers.registerAction({
    type: "geoRoam",
    event: "geoRoam",
    update: "updateTransform"
  }, function(payload, ecModel, api) {
    var componentType = payload.componentType || "series";
    ecModel.eachComponent({
      mainType: componentType,
      query: payload
    }, function(componentModel) {
      var geo = componentModel.coordinateSystem;
      if (geo.type !== "geo") {
        return;
      }
      var res = updateCenterAndZoom(geo, payload, componentModel.get("scaleLimit"), api);
      componentModel.setCenter && componentModel.setCenter(res.center);
      componentModel.setZoom && componentModel.setZoom(res.zoom);
      if (componentType === "series") {
        each(componentModel.seriesGroup, function(seriesModel) {
          seriesModel.setCenter(res.center);
          seriesModel.setZoom(res.zoom);
        });
      }
    });
  });
}

// node_modules/echarts/lib/coord/parallel/parallelPreprocessor.js
function parallelPreprocessor(option) {
  createParallelIfNeeded(option);
  mergeAxisOptionFromParallel(option);
}
function createParallelIfNeeded(option) {
  if (option.parallel) {
    return;
  }
  var hasParallelSeries = false;
  each(option.series, function(seriesOpt) {
    if (seriesOpt && seriesOpt.type === "parallel") {
      hasParallelSeries = true;
    }
  });
  if (hasParallelSeries) {
    option.parallel = [{}];
  }
}
function mergeAxisOptionFromParallel(option) {
  var axes = normalizeToArray(option.parallelAxis);
  each(axes, function(axisOption) {
    if (!isObject(axisOption)) {
      return;
    }
    var parallelIndex = axisOption.parallelIndex || 0;
    var parallelOption = normalizeToArray(option.parallel)[parallelIndex];
    if (parallelOption && parallelOption.parallelAxisDefault) {
      merge(axisOption, parallelOption.parallelAxisDefault, false);
    }
  });
}

// node_modules/echarts/lib/component/parallel/ParallelView.js
var CLICK_THRESHOLD = 5;
var ParallelView = (
  /** @class */
  function(_super) {
    __extends(ParallelView2, _super);
    function ParallelView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ParallelView2.type;
      return _this;
    }
    ParallelView2.prototype.render = function(parallelModel, ecModel, api) {
      this._model = parallelModel;
      this._api = api;
      if (!this._handlers) {
        this._handlers = {};
        each(handlers, function(handler, eventName) {
          api.getZr().on(eventName, this._handlers[eventName] = bind(handler, this));
        }, this);
      }
      createOrUpdate(this, "_throttledDispatchExpand", parallelModel.get("axisExpandRate"), "fixRate");
    };
    ParallelView2.prototype.dispose = function(ecModel, api) {
      clear(this, "_throttledDispatchExpand");
      each(this._handlers, function(handler, eventName) {
        api.getZr().off(eventName, handler);
      });
      this._handlers = null;
    };
    ParallelView2.prototype._throttledDispatchExpand = function(opt) {
      this._dispatchExpand(opt);
    };
    ParallelView2.prototype._dispatchExpand = function(opt) {
      opt && this._api.dispatchAction(extend({
        type: "parallelAxisExpand"
      }, opt));
    };
    ParallelView2.type = "parallel";
    return ParallelView2;
  }(Component_default2)
);
var handlers = {
  mousedown: function(e) {
    if (checkTrigger(this, "click")) {
      this._mouseDownPoint = [e.offsetX, e.offsetY];
    }
  },
  mouseup: function(e) {
    var mouseDownPoint = this._mouseDownPoint;
    if (checkTrigger(this, "click") && mouseDownPoint) {
      var point = [e.offsetX, e.offsetY];
      var dist = Math.pow(mouseDownPoint[0] - point[0], 2) + Math.pow(mouseDownPoint[1] - point[1], 2);
      if (dist > CLICK_THRESHOLD) {
        return;
      }
      var result = this._model.coordinateSystem.getSlidedAxisExpandWindow([e.offsetX, e.offsetY]);
      result.behavior !== "none" && this._dispatchExpand({
        axisExpandWindow: result.axisExpandWindow
      });
    }
    this._mouseDownPoint = null;
  },
  mousemove: function(e) {
    if (this._mouseDownPoint || !checkTrigger(this, "mousemove")) {
      return;
    }
    var model = this._model;
    var result = model.coordinateSystem.getSlidedAxisExpandWindow([e.offsetX, e.offsetY]);
    var behavior = result.behavior;
    behavior === "jump" && this._throttledDispatchExpand.debounceNextCall(model.get("axisExpandDebounce"));
    this._throttledDispatchExpand(behavior === "none" ? null : {
      axisExpandWindow: result.axisExpandWindow,
      // Jumping uses animation, and sliding suppresses animation.
      animation: behavior === "jump" ? null : {
        duration: 0
        // Disable animation.
      }
    });
  }
};
function checkTrigger(view, triggerOn) {
  var model = view._model;
  return model.get("axisExpandable") && model.get("axisExpandTriggerOn") === triggerOn;
}
var ParallelView_default = ParallelView;

// node_modules/echarts/lib/coord/parallel/ParallelModel.js
var ParallelModel = (
  /** @class */
  function(_super) {
    __extends(ParallelModel2, _super);
    function ParallelModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ParallelModel2.type;
      return _this;
    }
    ParallelModel2.prototype.init = function() {
      _super.prototype.init.apply(this, arguments);
      this.mergeOption({});
    };
    ParallelModel2.prototype.mergeOption = function(newOption) {
      var thisOption = this.option;
      newOption && merge(thisOption, newOption, true);
      this._initDimensions();
    };
    ParallelModel2.prototype.contains = function(model, ecModel) {
      var parallelIndex = model.get("parallelIndex");
      return parallelIndex != null && ecModel.getComponent("parallel", parallelIndex) === this;
    };
    ParallelModel2.prototype.setAxisExpand = function(opt) {
      each(["axisExpandable", "axisExpandCenter", "axisExpandCount", "axisExpandWidth", "axisExpandWindow"], function(name) {
        if (opt.hasOwnProperty(name)) {
          this.option[name] = opt[name];
        }
      }, this);
    };
    ParallelModel2.prototype._initDimensions = function() {
      var dimensions = this.dimensions = [];
      var parallelAxisIndex = this.parallelAxisIndex = [];
      var axisModels = filter(this.ecModel.queryComponents({
        mainType: "parallelAxis"
      }), function(axisModel) {
        return (axisModel.get("parallelIndex") || 0) === this.componentIndex;
      }, this);
      each(axisModels, function(axisModel) {
        dimensions.push("dim" + axisModel.get("dim"));
        parallelAxisIndex.push(axisModel.componentIndex);
      });
    };
    ParallelModel2.type = "parallel";
    ParallelModel2.dependencies = ["parallelAxis"];
    ParallelModel2.layoutMode = "box";
    ParallelModel2.defaultOption = {
      // zlevel: 0,
      z: 0,
      left: 80,
      top: 60,
      right: 80,
      bottom: 60,
      // width: {totalWidth} - left - right,
      // height: {totalHeight} - top - bottom,
      layout: "horizontal",
      // FIXME
      // naming?
      axisExpandable: false,
      axisExpandCenter: null,
      axisExpandCount: 0,
      axisExpandWidth: 50,
      axisExpandRate: 17,
      axisExpandDebounce: 50,
      // [out, in, jumpTarget]. In percentage. If use [null, 0.05], null means full.
      // Do not doc to user until necessary.
      axisExpandSlideTriggerArea: [-0.15, 0.05, 0.4],
      axisExpandTriggerOn: "click",
      parallelAxisDefault: null
    };
    return ParallelModel2;
  }(Component_default)
);
var ParallelModel_default = ParallelModel;

// node_modules/echarts/lib/coord/parallel/ParallelAxis.js
var ParallelAxis = (
  /** @class */
  function(_super) {
    __extends(ParallelAxis2, _super);
    function ParallelAxis2(dim, scale2, coordExtent, axisType, axisIndex) {
      var _this = _super.call(this, dim, scale2, coordExtent) || this;
      _this.type = axisType || "value";
      _this.axisIndex = axisIndex;
      return _this;
    }
    ParallelAxis2.prototype.isHorizontal = function() {
      return this.coordinateSystem.getModel().get("layout") !== "horizontal";
    };
    return ParallelAxis2;
  }(Axis_default)
);
var ParallelAxis_default = ParallelAxis;

// node_modules/echarts/lib/component/helper/sliderMove.js
function sliderMove(delta, handleEnds, extent, handleIndex, minSpan, maxSpan) {
  delta = delta || 0;
  var extentSpan = extent[1] - extent[0];
  if (minSpan != null) {
    minSpan = restrict(minSpan, [0, extentSpan]);
  }
  if (maxSpan != null) {
    maxSpan = Math.max(maxSpan, minSpan != null ? minSpan : 0);
  }
  if (handleIndex === "all") {
    var handleSpan = Math.abs(handleEnds[1] - handleEnds[0]);
    handleSpan = restrict(handleSpan, [0, extentSpan]);
    minSpan = maxSpan = restrict(handleSpan, [minSpan, maxSpan]);
    handleIndex = 0;
  }
  handleEnds[0] = restrict(handleEnds[0], extent);
  handleEnds[1] = restrict(handleEnds[1], extent);
  var originalDistSign = getSpanSign(handleEnds, handleIndex);
  handleEnds[handleIndex] += delta;
  var extentMinSpan = minSpan || 0;
  var realExtent = extent.slice();
  originalDistSign.sign < 0 ? realExtent[0] += extentMinSpan : realExtent[1] -= extentMinSpan;
  handleEnds[handleIndex] = restrict(handleEnds[handleIndex], realExtent);
  var currDistSign;
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (minSpan != null && (currDistSign.sign !== originalDistSign.sign || currDistSign.span < minSpan)) {
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + originalDistSign.sign * minSpan;
  }
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (maxSpan != null && currDistSign.span > maxSpan) {
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + currDistSign.sign * maxSpan;
  }
  return handleEnds;
}
function getSpanSign(handleEnds, handleIndex) {
  var dist = handleEnds[handleIndex] - handleEnds[1 - handleIndex];
  return {
    span: Math.abs(dist),
    sign: dist > 0 ? -1 : dist < 0 ? 1 : handleIndex ? -1 : 1
  };
}
function restrict(value, extend2) {
  return Math.min(extend2[1] != null ? extend2[1] : Infinity, Math.max(extend2[0] != null ? extend2[0] : -Infinity, value));
}

// node_modules/echarts/lib/coord/parallel/Parallel.js
var each2 = each;
var mathMin = Math.min;
var mathMax = Math.max;
var mathFloor = Math.floor;
var mathCeil = Math.ceil;
var round2 = round;
var PI2 = Math.PI;
var Parallel = (
  /** @class */
  function() {
    function Parallel2(parallelModel, ecModel, api) {
      this.type = "parallel";
      this._axesMap = createHashMap();
      this._axesLayout = {};
      this.dimensions = parallelModel.dimensions;
      this._model = parallelModel;
      this._init(parallelModel, ecModel, api);
    }
    Parallel2.prototype._init = function(parallelModel, ecModel, api) {
      var dimensions = parallelModel.dimensions;
      var parallelAxisIndex = parallelModel.parallelAxisIndex;
      each2(dimensions, function(dim, idx) {
        var axisIndex = parallelAxisIndex[idx];
        var axisModel = ecModel.getComponent("parallelAxis", axisIndex);
        var axis = this._axesMap.set(dim, new ParallelAxis_default(dim, createScaleByModel(axisModel), [0, 0], axisModel.get("type"), axisIndex));
        var isCategory = axis.type === "category";
        axis.onBand = isCategory && axisModel.get("boundaryGap");
        axis.inverse = axisModel.get("inverse");
        axisModel.axis = axis;
        axis.model = axisModel;
        axis.coordinateSystem = axisModel.coordinateSystem = this;
      }, this);
    };
    Parallel2.prototype.update = function(ecModel, api) {
      this._updateAxesFromSeries(this._model, ecModel);
    };
    Parallel2.prototype.containPoint = function(point) {
      var layoutInfo = this._makeLayoutInfo();
      var axisBase = layoutInfo.axisBase;
      var layoutBase = layoutInfo.layoutBase;
      var pixelDimIndex = layoutInfo.pixelDimIndex;
      var pAxis = point[1 - pixelDimIndex];
      var pLayout = point[pixelDimIndex];
      return pAxis >= axisBase && pAxis <= axisBase + layoutInfo.axisLength && pLayout >= layoutBase && pLayout <= layoutBase + layoutInfo.layoutLength;
    };
    Parallel2.prototype.getModel = function() {
      return this._model;
    };
    Parallel2.prototype._updateAxesFromSeries = function(parallelModel, ecModel) {
      ecModel.eachSeries(function(seriesModel) {
        if (!parallelModel.contains(seriesModel, ecModel)) {
          return;
        }
        var data = seriesModel.getData();
        each2(this.dimensions, function(dim) {
          var axis = this._axesMap.get(dim);
          axis.scale.unionExtentFromData(data, data.mapDimension(dim));
          niceScaleExtent(axis.scale, axis.model);
        }, this);
      }, this);
    };
    Parallel2.prototype.resize = function(parallelModel, api) {
      this._rect = getLayoutRect(parallelModel.getBoxLayoutParams(), {
        width: api.getWidth(),
        height: api.getHeight()
      });
      this._layoutAxes();
    };
    Parallel2.prototype.getRect = function() {
      return this._rect;
    };
    Parallel2.prototype._makeLayoutInfo = function() {
      var parallelModel = this._model;
      var rect = this._rect;
      var xy = ["x", "y"];
      var wh = ["width", "height"];
      var layout2 = parallelModel.get("layout");
      var pixelDimIndex = layout2 === "horizontal" ? 0 : 1;
      var layoutLength = rect[wh[pixelDimIndex]];
      var layoutExtent = [0, layoutLength];
      var axisCount = this.dimensions.length;
      var axisExpandWidth = restrict2(parallelModel.get("axisExpandWidth"), layoutExtent);
      var axisExpandCount = restrict2(parallelModel.get("axisExpandCount") || 0, [0, axisCount]);
      var axisExpandable = parallelModel.get("axisExpandable") && axisCount > 3 && axisCount > axisExpandCount && axisExpandCount > 1 && axisExpandWidth > 0 && layoutLength > 0;
      var axisExpandWindow = parallelModel.get("axisExpandWindow");
      var winSize;
      if (!axisExpandWindow) {
        winSize = restrict2(axisExpandWidth * (axisExpandCount - 1), layoutExtent);
        var axisExpandCenter = parallelModel.get("axisExpandCenter") || mathFloor(axisCount / 2);
        axisExpandWindow = [axisExpandWidth * axisExpandCenter - winSize / 2];
        axisExpandWindow[1] = axisExpandWindow[0] + winSize;
      } else {
        winSize = restrict2(axisExpandWindow[1] - axisExpandWindow[0], layoutExtent);
        axisExpandWindow[1] = axisExpandWindow[0] + winSize;
      }
      var axisCollapseWidth = (layoutLength - winSize) / (axisCount - axisExpandCount);
      axisCollapseWidth < 3 && (axisCollapseWidth = 0);
      var winInnerIndices = [mathFloor(round2(axisExpandWindow[0] / axisExpandWidth, 1)) + 1, mathCeil(round2(axisExpandWindow[1] / axisExpandWidth, 1)) - 1];
      var axisExpandWindow0Pos = axisCollapseWidth / axisExpandWidth * axisExpandWindow[0];
      return {
        layout: layout2,
        pixelDimIndex,
        layoutBase: rect[xy[pixelDimIndex]],
        layoutLength,
        axisBase: rect[xy[1 - pixelDimIndex]],
        axisLength: rect[wh[1 - pixelDimIndex]],
        axisExpandable,
        axisExpandWidth,
        axisCollapseWidth,
        axisExpandWindow,
        axisCount,
        winInnerIndices,
        axisExpandWindow0Pos
      };
    };
    Parallel2.prototype._layoutAxes = function() {
      var rect = this._rect;
      var axes = this._axesMap;
      var dimensions = this.dimensions;
      var layoutInfo = this._makeLayoutInfo();
      var layout2 = layoutInfo.layout;
      axes.each(function(axis) {
        var axisExtent = [0, layoutInfo.axisLength];
        var idx = axis.inverse ? 1 : 0;
        axis.setExtent(axisExtent[idx], axisExtent[1 - idx]);
      });
      each2(dimensions, function(dim, idx) {
        var posInfo = (layoutInfo.axisExpandable ? layoutAxisWithExpand : layoutAxisWithoutExpand)(idx, layoutInfo);
        var positionTable = {
          horizontal: {
            x: posInfo.position,
            y: layoutInfo.axisLength
          },
          vertical: {
            x: 0,
            y: posInfo.position
          }
        };
        var rotationTable = {
          horizontal: PI2 / 2,
          vertical: 0
        };
        var position = [positionTable[layout2].x + rect.x, positionTable[layout2].y + rect.y];
        var rotation = rotationTable[layout2];
        var transform = create();
        rotate(transform, transform, rotation);
        translate(transform, transform, position);
        this._axesLayout[dim] = {
          position,
          rotation,
          transform,
          axisNameAvailableWidth: posInfo.axisNameAvailableWidth,
          axisLabelShow: posInfo.axisLabelShow,
          nameTruncateMaxWidth: posInfo.nameTruncateMaxWidth,
          tickDirection: 1,
          labelDirection: 1
        };
      }, this);
    };
    Parallel2.prototype.getAxis = function(dim) {
      return this._axesMap.get(dim);
    };
    Parallel2.prototype.dataToPoint = function(value, dim) {
      return this.axisCoordToPoint(this._axesMap.get(dim).dataToCoord(value), dim);
    };
    Parallel2.prototype.eachActiveState = function(data, callback, start, end) {
      start == null && (start = 0);
      end == null && (end = data.count());
      var axesMap = this._axesMap;
      var dimensions = this.dimensions;
      var dataDimensions = [];
      var axisModels = [];
      each(dimensions, function(axisDim) {
        dataDimensions.push(data.mapDimension(axisDim));
        axisModels.push(axesMap.get(axisDim).model);
      });
      var hasActiveSet = this.hasAxisBrushed();
      for (var dataIndex = start; dataIndex < end; dataIndex++) {
        var activeState = void 0;
        if (!hasActiveSet) {
          activeState = "normal";
        } else {
          activeState = "active";
          var values = data.getValues(dataDimensions, dataIndex);
          for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
            var state = axisModels[j].getActiveState(values[j]);
            if (state === "inactive") {
              activeState = "inactive";
              break;
            }
          }
        }
        callback(activeState, dataIndex);
      }
    };
    Parallel2.prototype.hasAxisBrushed = function() {
      var dimensions = this.dimensions;
      var axesMap = this._axesMap;
      var hasActiveSet = false;
      for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
        if (axesMap.get(dimensions[j]).model.getActiveState() !== "normal") {
          hasActiveSet = true;
        }
      }
      return hasActiveSet;
    };
    Parallel2.prototype.axisCoordToPoint = function(coord, dim) {
      var axisLayout = this._axesLayout[dim];
      return applyTransform2([coord, 0], axisLayout.transform);
    };
    Parallel2.prototype.getAxisLayout = function(dim) {
      return clone(this._axesLayout[dim]);
    };
    Parallel2.prototype.getSlidedAxisExpandWindow = function(point) {
      var layoutInfo = this._makeLayoutInfo();
      var pixelDimIndex = layoutInfo.pixelDimIndex;
      var axisExpandWindow = layoutInfo.axisExpandWindow.slice();
      var winSize = axisExpandWindow[1] - axisExpandWindow[0];
      var extent = [0, layoutInfo.axisExpandWidth * (layoutInfo.axisCount - 1)];
      if (!this.containPoint(point)) {
        return {
          behavior: "none",
          axisExpandWindow
        };
      }
      var pointCoord = point[pixelDimIndex] - layoutInfo.layoutBase - layoutInfo.axisExpandWindow0Pos;
      var delta;
      var behavior = "slide";
      var axisCollapseWidth = layoutInfo.axisCollapseWidth;
      var triggerArea = this._model.get("axisExpandSlideTriggerArea");
      var useJump = triggerArea[0] != null;
      if (axisCollapseWidth) {
        if (useJump && axisCollapseWidth && pointCoord < winSize * triggerArea[0]) {
          behavior = "jump";
          delta = pointCoord - winSize * triggerArea[2];
        } else if (useJump && axisCollapseWidth && pointCoord > winSize * (1 - triggerArea[0])) {
          behavior = "jump";
          delta = pointCoord - winSize * (1 - triggerArea[2]);
        } else {
          (delta = pointCoord - winSize * triggerArea[1]) >= 0 && (delta = pointCoord - winSize * (1 - triggerArea[1])) <= 0 && (delta = 0);
        }
        delta *= layoutInfo.axisExpandWidth / axisCollapseWidth;
        delta ? sliderMove(delta, axisExpandWindow, extent, "all") : behavior = "none";
      } else {
        var winSize2 = axisExpandWindow[1] - axisExpandWindow[0];
        var pos = extent[1] * pointCoord / winSize2;
        axisExpandWindow = [mathMax(0, pos - winSize2 / 2)];
        axisExpandWindow[1] = mathMin(extent[1], axisExpandWindow[0] + winSize2);
        axisExpandWindow[0] = axisExpandWindow[1] - winSize2;
      }
      return {
        axisExpandWindow,
        behavior
      };
    };
    return Parallel2;
  }()
);
function restrict2(len, extent) {
  return mathMin(mathMax(len, extent[0]), extent[1]);
}
function layoutAxisWithoutExpand(axisIndex, layoutInfo) {
  var step = layoutInfo.layoutLength / (layoutInfo.axisCount - 1);
  return {
    position: step * axisIndex,
    axisNameAvailableWidth: step,
    axisLabelShow: true
  };
}
function layoutAxisWithExpand(axisIndex, layoutInfo) {
  var layoutLength = layoutInfo.layoutLength;
  var axisExpandWidth = layoutInfo.axisExpandWidth;
  var axisCount = layoutInfo.axisCount;
  var axisCollapseWidth = layoutInfo.axisCollapseWidth;
  var winInnerIndices = layoutInfo.winInnerIndices;
  var position;
  var axisNameAvailableWidth = axisCollapseWidth;
  var axisLabelShow = false;
  var nameTruncateMaxWidth;
  if (axisIndex < winInnerIndices[0]) {
    position = axisIndex * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  } else if (axisIndex <= winInnerIndices[1]) {
    position = layoutInfo.axisExpandWindow0Pos + axisIndex * axisExpandWidth - layoutInfo.axisExpandWindow[0];
    axisNameAvailableWidth = axisExpandWidth;
    axisLabelShow = true;
  } else {
    position = layoutLength - (axisCount - 1 - axisIndex) * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  }
  return {
    position,
    axisNameAvailableWidth,
    axisLabelShow,
    nameTruncateMaxWidth
  };
}
var Parallel_default = Parallel;

// node_modules/echarts/lib/coord/parallel/parallelCreator.js
function createParallelCoordSys(ecModel, api) {
  var coordSysList = [];
  ecModel.eachComponent("parallel", function(parallelModel, idx) {
    var coordSys = new Parallel_default(parallelModel, ecModel, api);
    coordSys.name = "parallel_" + idx;
    coordSys.resize(parallelModel, api);
    parallelModel.coordinateSystem = coordSys;
    coordSys.model = parallelModel;
    coordSysList.push(coordSys);
  });
  ecModel.eachSeries(function(seriesModel) {
    if (seriesModel.get("coordinateSystem") === "parallel") {
      var parallelModel = seriesModel.getReferringComponents("parallel", SINGLE_REFERRING).models[0];
      seriesModel.coordinateSystem = parallelModel.coordinateSystem;
    }
  });
  return coordSysList;
}
var parallelCoordSysCreator = {
  create: createParallelCoordSys
};
var parallelCreator_default = parallelCoordSysCreator;

// node_modules/echarts/lib/coord/parallel/AxisModel.js
var ParallelAxisModel = (
  /** @class */
  function(_super) {
    __extends(ParallelAxisModel2, _super);
    function ParallelAxisModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ParallelAxisModel2.type;
      _this.activeIntervals = [];
      return _this;
    }
    ParallelAxisModel2.prototype.getAreaSelectStyle = function() {
      return makeStyleMapper([
        ["fill", "color"],
        ["lineWidth", "borderWidth"],
        ["stroke", "borderColor"],
        ["width", "width"],
        ["opacity", "opacity"]
        // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
        // So do not transfer decal directly.
      ])(this.getModel("areaSelectStyle"));
    };
    ParallelAxisModel2.prototype.setActiveIntervals = function(intervals) {
      var activeIntervals = this.activeIntervals = clone(intervals);
      if (activeIntervals) {
        for (var i = activeIntervals.length - 1; i >= 0; i--) {
          asc(activeIntervals[i]);
        }
      }
    };
    ParallelAxisModel2.prototype.getActiveState = function(value) {
      var activeIntervals = this.activeIntervals;
      if (!activeIntervals.length) {
        return "normal";
      }
      if (value == null || isNaN(+value)) {
        return "inactive";
      }
      if (activeIntervals.length === 1) {
        var interval = activeIntervals[0];
        if (interval[0] <= value && value <= interval[1]) {
          return "active";
        }
      } else {
        for (var i = 0, len = activeIntervals.length; i < len; i++) {
          if (activeIntervals[i][0] <= value && value <= activeIntervals[i][1]) {
            return "active";
          }
        }
      }
      return "inactive";
    };
    return ParallelAxisModel2;
  }(Component_default)
);
mixin(ParallelAxisModel, AxisModelCommonMixin);
var AxisModel_default = ParallelAxisModel;

// node_modules/echarts/lib/component/helper/BrushController.js
var BRUSH_PANEL_GLOBAL = true;
var mathMin2 = Math.min;
var mathMax2 = Math.max;
var mathPow = Math.pow;
var COVER_Z = 1e4;
var UNSELECT_THRESHOLD = 6;
var MIN_RESIZE_LINE_WIDTH = 6;
var MUTEX_RESOURCE_KEY = "globalPan";
var DIRECTION_MAP = {
  w: [0, 0],
  e: [0, 1],
  n: [1, 0],
  s: [1, 1]
};
var CURSOR_MAP = {
  w: "ew",
  e: "ew",
  n: "ns",
  s: "ns",
  ne: "nesw",
  sw: "nesw",
  nw: "nwse",
  se: "nwse"
};
var DEFAULT_BRUSH_OPT = {
  brushStyle: {
    lineWidth: 2,
    stroke: "rgba(210,219,238,0.3)",
    fill: "#D2DBEE"
  },
  transformable: true,
  brushMode: "single",
  removeOnClick: false
};
var baseUID = 0;
var BrushController = (
  /** @class */
  function(_super) {
    __extends(BrushController2, _super);
    function BrushController2(zr) {
      var _this = _super.call(this) || this;
      _this._track = [];
      _this._covers = [];
      _this._handlers = {};
      if (true) {
        assert(zr);
      }
      _this._zr = zr;
      _this.group = new Group_default();
      _this._uid = "brushController_" + baseUID++;
      each(pointerHandlers, function(handler, eventName) {
        this._handlers[eventName] = bind(handler, this);
      }, _this);
      return _this;
    }
    BrushController2.prototype.enableBrush = function(brushOption) {
      if (true) {
        assert(this._mounted);
      }
      this._brushType && this._doDisableBrush();
      brushOption.brushType && this._doEnableBrush(brushOption);
      return this;
    };
    BrushController2.prototype._doEnableBrush = function(brushOption) {
      var zr = this._zr;
      if (!this._enableGlobalPan) {
        take(zr, MUTEX_RESOURCE_KEY, this._uid);
      }
      each(this._handlers, function(handler, eventName) {
        zr.on(eventName, handler);
      });
      this._brushType = brushOption.brushType;
      this._brushOption = merge(clone(DEFAULT_BRUSH_OPT), brushOption, true);
    };
    BrushController2.prototype._doDisableBrush = function() {
      var zr = this._zr;
      release(zr, MUTEX_RESOURCE_KEY, this._uid);
      each(this._handlers, function(handler, eventName) {
        zr.off(eventName, handler);
      });
      this._brushType = this._brushOption = null;
    };
    BrushController2.prototype.setPanels = function(panelOpts) {
      if (panelOpts && panelOpts.length) {
        var panels_1 = this._panels = {};
        each(panelOpts, function(panelOpts2) {
          panels_1[panelOpts2.panelId] = clone(panelOpts2);
        });
      } else {
        this._panels = null;
      }
      return this;
    };
    BrushController2.prototype.mount = function(opt) {
      opt = opt || {};
      if (true) {
        this._mounted = true;
      }
      this._enableGlobalPan = opt.enableGlobalPan;
      var thisGroup = this.group;
      this._zr.add(thisGroup);
      thisGroup.attr({
        x: opt.x || 0,
        y: opt.y || 0,
        rotation: opt.rotation || 0,
        scaleX: opt.scaleX || 1,
        scaleY: opt.scaleY || 1
      });
      this._transform = thisGroup.getLocalTransform();
      return this;
    };
    BrushController2.prototype.updateCovers = function(coverConfigList) {
      if (true) {
        assert(this._mounted);
      }
      coverConfigList = map(coverConfigList, function(coverConfig) {
        return merge(clone(DEFAULT_BRUSH_OPT), coverConfig, true);
      });
      var tmpIdPrefix = "\0-brush-index-";
      var oldCovers = this._covers;
      var newCovers = this._covers = [];
      var controller = this;
      var creatingCover = this._creatingCover;
      new DataDiffer_default(oldCovers, coverConfigList, oldGetKey, getKey).add(addOrUpdate).update(addOrUpdate).remove(remove).execute();
      return this;
      function getKey(brushOption, index) {
        return (brushOption.id != null ? brushOption.id : tmpIdPrefix + index) + "-" + brushOption.brushType;
      }
      function oldGetKey(cover, index) {
        return getKey(cover.__brushOption, index);
      }
      function addOrUpdate(newIndex, oldIndex) {
        var newBrushInternal = coverConfigList[newIndex];
        if (oldIndex != null && oldCovers[oldIndex] === creatingCover) {
          newCovers[newIndex] = oldCovers[oldIndex];
        } else {
          var cover = newCovers[newIndex] = oldIndex != null ? (oldCovers[oldIndex].__brushOption = newBrushInternal, oldCovers[oldIndex]) : endCreating(controller, createCover(controller, newBrushInternal));
          updateCoverAfterCreation(controller, cover);
        }
      }
      function remove(oldIndex) {
        if (oldCovers[oldIndex] !== creatingCover) {
          controller.group.remove(oldCovers[oldIndex]);
        }
      }
    };
    BrushController2.prototype.unmount = function() {
      if (true) {
        if (!this._mounted) {
          return;
        }
      }
      this.enableBrush(false);
      clearCovers(this);
      this._zr.remove(this.group);
      if (true) {
        this._mounted = false;
      }
      return this;
    };
    BrushController2.prototype.dispose = function() {
      this.unmount();
      this.off();
    };
    return BrushController2;
  }(Eventful_default)
);
function createCover(controller, brushOption) {
  var cover = coverRenderers[brushOption.brushType].createCover(controller, brushOption);
  cover.__brushOption = brushOption;
  updateZ(cover, brushOption);
  controller.group.add(cover);
  return cover;
}
function endCreating(controller, creatingCover) {
  var coverRenderer = getCoverRenderer(creatingCover);
  if (coverRenderer.endCreating) {
    coverRenderer.endCreating(controller, creatingCover);
    updateZ(creatingCover, creatingCover.__brushOption);
  }
  return creatingCover;
}
function updateCoverShape(controller, cover) {
  var brushOption = cover.__brushOption;
  getCoverRenderer(cover).updateCoverShape(controller, cover, brushOption.range, brushOption);
}
function updateZ(cover, brushOption) {
  var z = brushOption.z;
  z == null && (z = COVER_Z);
  cover.traverse(function(el) {
    el.z = z;
    el.z2 = z;
  });
}
function updateCoverAfterCreation(controller, cover) {
  getCoverRenderer(cover).updateCommon(controller, cover);
  updateCoverShape(controller, cover);
}
function getCoverRenderer(cover) {
  return coverRenderers[cover.__brushOption.brushType];
}
function getPanelByPoint(controller, e, localCursorPoint) {
  var panels = controller._panels;
  if (!panels) {
    return BRUSH_PANEL_GLOBAL;
  }
  var panel;
  var transform = controller._transform;
  each(panels, function(pn) {
    pn.isTargetByCursor(e, localCursorPoint, transform) && (panel = pn);
  });
  return panel;
}
function getPanelByCover(controller, cover) {
  var panels = controller._panels;
  if (!panels) {
    return BRUSH_PANEL_GLOBAL;
  }
  var panelId = cover.__brushOption.panelId;
  return panelId != null ? panels[panelId] : BRUSH_PANEL_GLOBAL;
}
function clearCovers(controller) {
  var covers = controller._covers;
  var originalLength = covers.length;
  each(covers, function(cover) {
    controller.group.remove(cover);
  }, controller);
  covers.length = 0;
  return !!originalLength;
}
function trigger2(controller, opt) {
  var areas = map(controller._covers, function(cover) {
    var brushOption = cover.__brushOption;
    var range = clone(brushOption.range);
    return {
      brushType: brushOption.brushType,
      panelId: brushOption.panelId,
      range
    };
  });
  controller.trigger("brush", {
    areas,
    isEnd: !!opt.isEnd,
    removeOnClick: !!opt.removeOnClick
  });
}
function shouldShowCover(controller) {
  var track = controller._track;
  if (!track.length) {
    return false;
  }
  var p2 = track[track.length - 1];
  var p1 = track[0];
  var dx = p2[0] - p1[0];
  var dy = p2[1] - p1[1];
  var dist = mathPow(dx * dx + dy * dy, 0.5);
  return dist > UNSELECT_THRESHOLD;
}
function getTrackEnds(track) {
  var tail = track.length - 1;
  tail < 0 && (tail = 0);
  return [track[0], track[tail]];
}
function createBaseRectCover(rectRangeConverter, controller, brushOption, edgeNameSequences) {
  var cover = new Group_default();
  cover.add(new Rect_default({
    name: "main",
    style: makeStyle(brushOption),
    silent: true,
    draggable: true,
    cursor: "move",
    drift: curry(driftRect, rectRangeConverter, controller, cover, ["n", "s", "w", "e"]),
    ondragend: curry(trigger2, controller, {
      isEnd: true
    })
  }));
  each(edgeNameSequences, function(nameSequence) {
    cover.add(new Rect_default({
      name: nameSequence.join(""),
      style: {
        opacity: 0
      },
      draggable: true,
      silent: true,
      invisible: true,
      drift: curry(driftRect, rectRangeConverter, controller, cover, nameSequence),
      ondragend: curry(trigger2, controller, {
        isEnd: true
      })
    }));
  });
  return cover;
}
function updateBaseRect(controller, cover, localRange, brushOption) {
  var lineWidth = brushOption.brushStyle.lineWidth || 0;
  var handleSize = mathMax2(lineWidth, MIN_RESIZE_LINE_WIDTH);
  var x = localRange[0][0];
  var y = localRange[1][0];
  var xa = x - lineWidth / 2;
  var ya = y - lineWidth / 2;
  var x2 = localRange[0][1];
  var y2 = localRange[1][1];
  var x2a = x2 - handleSize + lineWidth / 2;
  var y2a = y2 - handleSize + lineWidth / 2;
  var width = x2 - x;
  var height = y2 - y;
  var widtha = width + lineWidth;
  var heighta = height + lineWidth;
  updateRectShape(controller, cover, "main", x, y, width, height);
  if (brushOption.transformable) {
    updateRectShape(controller, cover, "w", xa, ya, handleSize, heighta);
    updateRectShape(controller, cover, "e", x2a, ya, handleSize, heighta);
    updateRectShape(controller, cover, "n", xa, ya, widtha, handleSize);
    updateRectShape(controller, cover, "s", xa, y2a, widtha, handleSize);
    updateRectShape(controller, cover, "nw", xa, ya, handleSize, handleSize);
    updateRectShape(controller, cover, "ne", x2a, ya, handleSize, handleSize);
    updateRectShape(controller, cover, "sw", xa, y2a, handleSize, handleSize);
    updateRectShape(controller, cover, "se", x2a, y2a, handleSize, handleSize);
  }
}
function updateCommon(controller, cover) {
  var brushOption = cover.__brushOption;
  var transformable = brushOption.transformable;
  var mainEl = cover.childAt(0);
  mainEl.useStyle(makeStyle(brushOption));
  mainEl.attr({
    silent: !transformable,
    cursor: transformable ? "move" : "default"
  });
  each([["w"], ["e"], ["n"], ["s"], ["s", "e"], ["s", "w"], ["n", "e"], ["n", "w"]], function(nameSequence) {
    var el = cover.childOfName(nameSequence.join(""));
    var globalDir = nameSequence.length === 1 ? getGlobalDirection1(controller, nameSequence[0]) : getGlobalDirection2(controller, nameSequence);
    el && el.attr({
      silent: !transformable,
      invisible: !transformable,
      cursor: transformable ? CURSOR_MAP[globalDir] + "-resize" : null
    });
  });
}
function updateRectShape(controller, cover, name, x, y, w, h) {
  var el = cover.childOfName(name);
  el && el.setShape(pointsToRect(clipByPanel(controller, cover, [[x, y], [x + w, y + h]])));
}
function makeStyle(brushOption) {
  return defaults({
    strokeNoScale: true
  }, brushOption.brushStyle);
}
function formatRectRange(x, y, x2, y2) {
  var min2 = [mathMin2(x, x2), mathMin2(y, y2)];
  var max2 = [mathMax2(x, x2), mathMax2(y, y2)];
  return [
    [min2[0], max2[0]],
    [min2[1], max2[1]]
    // y range
  ];
}
function getTransform2(controller) {
  return getTransform(controller.group);
}
function getGlobalDirection1(controller, localDirName) {
  var map2 = {
    w: "left",
    e: "right",
    n: "top",
    s: "bottom"
  };
  var inverseMap = {
    left: "w",
    right: "e",
    top: "n",
    bottom: "s"
  };
  var dir = transformDirection(map2[localDirName], getTransform2(controller));
  return inverseMap[dir];
}
function getGlobalDirection2(controller, localDirNameSeq) {
  var globalDir = [getGlobalDirection1(controller, localDirNameSeq[0]), getGlobalDirection1(controller, localDirNameSeq[1])];
  (globalDir[0] === "e" || globalDir[0] === "w") && globalDir.reverse();
  return globalDir.join("");
}
function driftRect(rectRangeConverter, controller, cover, dirNameSequence, dx, dy) {
  var brushOption = cover.__brushOption;
  var rectRange = rectRangeConverter.toRectRange(brushOption.range);
  var localDelta = toLocalDelta(controller, dx, dy);
  each(dirNameSequence, function(dirName) {
    var ind = DIRECTION_MAP[dirName];
    rectRange[ind[0]][ind[1]] += localDelta[ind[0]];
  });
  brushOption.range = rectRangeConverter.fromRectRange(formatRectRange(rectRange[0][0], rectRange[1][0], rectRange[0][1], rectRange[1][1]));
  updateCoverAfterCreation(controller, cover);
  trigger2(controller, {
    isEnd: false
  });
}
function driftPolygon(controller, cover, dx, dy) {
  var range = cover.__brushOption.range;
  var localDelta = toLocalDelta(controller, dx, dy);
  each(range, function(point) {
    point[0] += localDelta[0];
    point[1] += localDelta[1];
  });
  updateCoverAfterCreation(controller, cover);
  trigger2(controller, {
    isEnd: false
  });
}
function toLocalDelta(controller, dx, dy) {
  var thisGroup = controller.group;
  var localD = thisGroup.transformCoordToLocal(dx, dy);
  var localZero = thisGroup.transformCoordToLocal(0, 0);
  return [localD[0] - localZero[0], localD[1] - localZero[1]];
}
function clipByPanel(controller, cover, data) {
  var panel = getPanelByCover(controller, cover);
  return panel && panel !== BRUSH_PANEL_GLOBAL ? panel.clipPath(data, controller._transform) : clone(data);
}
function pointsToRect(points3) {
  var xmin = mathMin2(points3[0][0], points3[1][0]);
  var ymin = mathMin2(points3[0][1], points3[1][1]);
  var xmax = mathMax2(points3[0][0], points3[1][0]);
  var ymax = mathMax2(points3[0][1], points3[1][1]);
  return {
    x: xmin,
    y: ymin,
    width: xmax - xmin,
    height: ymax - ymin
  };
}
function resetCursor(controller, e, localCursorPoint) {
  if (
    // Check active
    !controller._brushType || isOutsideZrArea(controller, e.offsetX, e.offsetY)
  ) {
    return;
  }
  var zr = controller._zr;
  var covers = controller._covers;
  var currPanel = getPanelByPoint(controller, e, localCursorPoint);
  if (!controller._dragging) {
    for (var i = 0; i < covers.length; i++) {
      var brushOption = covers[i].__brushOption;
      if (currPanel && (currPanel === BRUSH_PANEL_GLOBAL || brushOption.panelId === currPanel.panelId) && coverRenderers[brushOption.brushType].contain(covers[i], localCursorPoint[0], localCursorPoint[1])) {
        return;
      }
    }
  }
  currPanel && zr.setCursorStyle("crosshair");
}
function preventDefault(e) {
  var rawE = e.event;
  rawE.preventDefault && rawE.preventDefault();
}
function mainShapeContain(cover, x, y) {
  return cover.childOfName("main").contain(x, y);
}
function updateCoverByMouse(controller, e, localCursorPoint, isEnd) {
  var creatingCover = controller._creatingCover;
  var panel = controller._creatingPanel;
  var thisBrushOption = controller._brushOption;
  var eventParams;
  controller._track.push(localCursorPoint.slice());
  if (shouldShowCover(controller) || creatingCover) {
    if (panel && !creatingCover) {
      thisBrushOption.brushMode === "single" && clearCovers(controller);
      var brushOption = clone(thisBrushOption);
      brushOption.brushType = determineBrushType(brushOption.brushType, panel);
      brushOption.panelId = panel === BRUSH_PANEL_GLOBAL ? null : panel.panelId;
      creatingCover = controller._creatingCover = createCover(controller, brushOption);
      controller._covers.push(creatingCover);
    }
    if (creatingCover) {
      var coverRenderer = coverRenderers[determineBrushType(controller._brushType, panel)];
      var coverBrushOption = creatingCover.__brushOption;
      coverBrushOption.range = coverRenderer.getCreatingRange(clipByPanel(controller, creatingCover, controller._track));
      if (isEnd) {
        endCreating(controller, creatingCover);
        coverRenderer.updateCommon(controller, creatingCover);
      }
      updateCoverShape(controller, creatingCover);
      eventParams = {
        isEnd
      };
    }
  } else if (isEnd && thisBrushOption.brushMode === "single" && thisBrushOption.removeOnClick) {
    if (getPanelByPoint(controller, e, localCursorPoint) && clearCovers(controller)) {
      eventParams = {
        isEnd,
        removeOnClick: true
      };
    }
  }
  return eventParams;
}
function determineBrushType(brushType, panel) {
  if (brushType === "auto") {
    if (true) {
      assert(panel && panel.defaultBrushType, 'MUST have defaultBrushType when brushType is "atuo"');
    }
    return panel.defaultBrushType;
  }
  return brushType;
}
var pointerHandlers = {
  mousedown: function(e) {
    if (this._dragging) {
      handleDragEnd(this, e);
    } else if (!e.target || !e.target.draggable) {
      preventDefault(e);
      var localCursorPoint = this.group.transformCoordToLocal(e.offsetX, e.offsetY);
      this._creatingCover = null;
      var panel = this._creatingPanel = getPanelByPoint(this, e, localCursorPoint);
      if (panel) {
        this._dragging = true;
        this._track = [localCursorPoint.slice()];
      }
    }
  },
  mousemove: function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = this.group.transformCoordToLocal(x, y);
    resetCursor(this, e, localCursorPoint);
    if (this._dragging) {
      preventDefault(e);
      var eventParams = updateCoverByMouse(this, e, localCursorPoint, false);
      eventParams && trigger2(this, eventParams);
    }
  },
  mouseup: function(e) {
    handleDragEnd(this, e);
  }
};
function handleDragEnd(controller, e) {
  if (controller._dragging) {
    preventDefault(e);
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = controller.group.transformCoordToLocal(x, y);
    var eventParams = updateCoverByMouse(controller, e, localCursorPoint, true);
    controller._dragging = false;
    controller._track = [];
    controller._creatingCover = null;
    eventParams && trigger2(controller, eventParams);
  }
}
function isOutsideZrArea(controller, x, y) {
  var zr = controller._zr;
  return x < 0 || x > zr.getWidth() || y < 0 || y > zr.getHeight();
}
var coverRenderers = {
  lineX: getLineRenderer(0),
  lineY: getLineRenderer(1),
  rect: {
    createCover: function(controller, brushOption) {
      function returnInput(range) {
        return range;
      }
      return createBaseRectCover({
        toRectRange: returnInput,
        fromRectRange: returnInput
      }, controller, brushOption, [["w"], ["e"], ["n"], ["s"], ["s", "e"], ["s", "w"], ["n", "e"], ["n", "w"]]);
    },
    getCreatingRange: function(localTrack) {
      var ends = getTrackEnds(localTrack);
      return formatRectRange(ends[1][0], ends[1][1], ends[0][0], ends[0][1]);
    },
    updateCoverShape: function(controller, cover, localRange, brushOption) {
      updateBaseRect(controller, cover, localRange, brushOption);
    },
    updateCommon,
    contain: mainShapeContain
  },
  polygon: {
    createCover: function(controller, brushOption) {
      var cover = new Group_default();
      cover.add(new Polyline_default({
        name: "main",
        style: makeStyle(brushOption),
        silent: true
      }));
      return cover;
    },
    getCreatingRange: function(localTrack) {
      return localTrack;
    },
    endCreating: function(controller, cover) {
      cover.remove(cover.childAt(0));
      cover.add(new Polygon_default({
        name: "main",
        draggable: true,
        drift: curry(driftPolygon, controller, cover),
        ondragend: curry(trigger2, controller, {
          isEnd: true
        })
      }));
    },
    updateCoverShape: function(controller, cover, localRange, brushOption) {
      cover.childAt(0).setShape({
        points: clipByPanel(controller, cover, localRange)
      });
    },
    updateCommon,
    contain: mainShapeContain
  }
};
function getLineRenderer(xyIndex) {
  return {
    createCover: function(controller, brushOption) {
      return createBaseRectCover({
        toRectRange: function(range) {
          var rectRange = [range, [0, 100]];
          xyIndex && rectRange.reverse();
          return rectRange;
        },
        fromRectRange: function(rectRange) {
          return rectRange[xyIndex];
        }
      }, controller, brushOption, [[["w"], ["e"]], [["n"], ["s"]]][xyIndex]);
    },
    getCreatingRange: function(localTrack) {
      var ends = getTrackEnds(localTrack);
      var min2 = mathMin2(ends[0][xyIndex], ends[1][xyIndex]);
      var max2 = mathMax2(ends[0][xyIndex], ends[1][xyIndex]);
      return [min2, max2];
    },
    updateCoverShape: function(controller, cover, localRange, brushOption) {
      var otherExtent;
      var panel = getPanelByCover(controller, cover);
      if (panel !== BRUSH_PANEL_GLOBAL && panel.getLinearBrushOtherExtent) {
        otherExtent = panel.getLinearBrushOtherExtent(xyIndex);
      } else {
        var zr = controller._zr;
        otherExtent = [0, [zr.getWidth(), zr.getHeight()][1 - xyIndex]];
      }
      var rectRange = [localRange, otherExtent];
      xyIndex && rectRange.reverse();
      updateBaseRect(controller, cover, rectRange, brushOption);
    },
    updateCommon,
    contain: mainShapeContain
  };
}
var BrushController_default = BrushController;

// node_modules/echarts/lib/component/helper/brushHelper.js
function makeRectPanelClipPath(rect) {
  rect = normalizeRect(rect);
  return function(localPoints) {
    return clipPointsByRect(localPoints, rect);
  };
}
function makeLinearBrushOtherExtent(rect, specifiedXYIndex) {
  rect = normalizeRect(rect);
  return function(xyIndex) {
    var idx = specifiedXYIndex != null ? specifiedXYIndex : xyIndex;
    var brushWidth = idx ? rect.width : rect.height;
    var base = idx ? rect.x : rect.y;
    return [base, base + (brushWidth || 0)];
  };
}
function makeRectIsTargetByCursor(rect, api, targetModel) {
  var boundingRect = normalizeRect(rect);
  return function(e, localCursorPoint) {
    return boundingRect.contain(localCursorPoint[0], localCursorPoint[1]) && !onIrrelevantElement(e, api, targetModel);
  };
}
function normalizeRect(rect) {
  return BoundingRect_default.create(rect);
}

// node_modules/echarts/lib/component/axis/ParallelAxisView.js
var elementList = ["axisLine", "axisTickLabel", "axisName"];
var ParallelAxisView = (
  /** @class */
  function(_super) {
    __extends(ParallelAxisView2, _super);
    function ParallelAxisView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = ParallelAxisView2.type;
      return _this;
    }
    ParallelAxisView2.prototype.init = function(ecModel, api) {
      _super.prototype.init.apply(this, arguments);
      (this._brushController = new BrushController_default(api.getZr())).on("brush", bind(this._onBrush, this));
    };
    ParallelAxisView2.prototype.render = function(axisModel, ecModel, api, payload) {
      if (fromAxisAreaSelect(axisModel, ecModel, payload)) {
        return;
      }
      this.axisModel = axisModel;
      this.api = api;
      this.group.removeAll();
      var oldAxisGroup = this._axisGroup;
      this._axisGroup = new Group_default();
      this.group.add(this._axisGroup);
      if (!axisModel.get("show")) {
        return;
      }
      var coordSysModel = getCoordSysModel(axisModel, ecModel);
      var coordSys = coordSysModel.coordinateSystem;
      var areaSelectStyle = axisModel.getAreaSelectStyle();
      var areaWidth = areaSelectStyle.width;
      var dim = axisModel.axis.dim;
      var axisLayout = coordSys.getAxisLayout(dim);
      var builderOpt = extend({
        strokeContainThreshold: areaWidth
      }, axisLayout);
      var axisBuilder = new AxisBuilder_default(axisModel, builderOpt);
      each(elementList, axisBuilder.add, axisBuilder);
      this._axisGroup.add(axisBuilder.getGroup());
      this._refreshBrushController(builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api);
      groupTransition(oldAxisGroup, this._axisGroup, axisModel);
    };
    ParallelAxisView2.prototype._refreshBrushController = function(builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api) {
      var extent = axisModel.axis.getExtent();
      var extentLen = extent[1] - extent[0];
      var extra = Math.min(30, Math.abs(extentLen) * 0.1);
      var rect = BoundingRect_default.create({
        x: extent[0],
        y: -areaWidth / 2,
        width: extentLen,
        height: areaWidth
      });
      rect.x -= extra;
      rect.width += 2 * extra;
      this._brushController.mount({
        enableGlobalPan: true,
        rotation: builderOpt.rotation,
        x: builderOpt.position[0],
        y: builderOpt.position[1]
      }).setPanels([{
        panelId: "pl",
        clipPath: makeRectPanelClipPath(rect),
        isTargetByCursor: makeRectIsTargetByCursor(rect, api, coordSysModel),
        getLinearBrushOtherExtent: makeLinearBrushOtherExtent(rect, 0)
      }]).enableBrush({
        brushType: "lineX",
        brushStyle: areaSelectStyle,
        removeOnClick: true
      }).updateCovers(getCoverInfoList(axisModel));
    };
    ParallelAxisView2.prototype._onBrush = function(eventParam) {
      var coverInfoList = eventParam.areas;
      var axisModel = this.axisModel;
      var axis = axisModel.axis;
      var intervals = map(coverInfoList, function(coverInfo) {
        return [axis.coordToData(coverInfo.range[0], true), axis.coordToData(coverInfo.range[1], true)];
      });
      if (!axisModel.option.realtime === eventParam.isEnd || eventParam.removeOnClick) {
        this.api.dispatchAction({
          type: "axisAreaSelect",
          parallelAxisId: axisModel.id,
          intervals
        });
      }
    };
    ParallelAxisView2.prototype.dispose = function() {
      this._brushController.dispose();
    };
    ParallelAxisView2.type = "parallelAxis";
    return ParallelAxisView2;
  }(Component_default2)
);
function fromAxisAreaSelect(axisModel, ecModel, payload) {
  return payload && payload.type === "axisAreaSelect" && ecModel.findComponents({
    mainType: "parallelAxis",
    query: payload
  })[0] === axisModel;
}
function getCoverInfoList(axisModel) {
  var axis = axisModel.axis;
  return map(axisModel.activeIntervals, function(interval) {
    return {
      brushType: "lineX",
      panelId: "pl",
      range: [axis.dataToCoord(interval[0], true), axis.dataToCoord(interval[1], true)]
    };
  });
}
function getCoordSysModel(axisModel, ecModel) {
  return ecModel.getComponent("parallel", axisModel.get("parallelIndex"));
}
var ParallelAxisView_default = ParallelAxisView;

// node_modules/echarts/lib/component/axis/parallelAxisAction.js
var actionInfo = {
  type: "axisAreaSelect",
  event: "axisAreaSelected"
  // update: 'updateVisual'
};
function installParallelActions(registers) {
  registers.registerAction(actionInfo, function(payload, ecModel) {
    ecModel.eachComponent({
      mainType: "parallelAxis",
      query: payload
    }, function(parallelAxisModel) {
      parallelAxisModel.axis.model.setActiveIntervals(payload.intervals);
    });
  });
  registers.registerAction("parallelAxisExpand", function(payload, ecModel) {
    ecModel.eachComponent({
      mainType: "parallel",
      query: payload
    }, function(parallelModel) {
      parallelModel.setAxisExpand(payload);
    });
  });
}

// node_modules/echarts/lib/component/parallel/install.js
var defaultAxisOption = {
  type: "value",
  areaSelectStyle: {
    width: 20,
    borderWidth: 1,
    borderColor: "rgba(160,197,232)",
    color: "rgba(160,197,232)",
    opacity: 0.3
  },
  realtime: true,
  z: 10
};
function install4(registers) {
  registers.registerComponentView(ParallelView_default);
  registers.registerComponentModel(ParallelModel_default);
  registers.registerCoordinateSystem("parallel", parallelCreator_default);
  registers.registerPreprocessor(parallelPreprocessor);
  registers.registerComponentModel(AxisModel_default);
  registers.registerComponentView(ParallelAxisView_default);
  axisModelCreator(registers, "parallel", AxisModel_default, defaultAxisOption);
  installParallelActions(registers);
}

// node_modules/echarts/lib/chart/helper/labelHelper.js
function getDefaultLabel(data, dataIndex) {
  var labelDims = data.mapDimensionsAll("defaultedLabel");
  var len = labelDims.length;
  if (len === 1) {
    var rawVal = retrieveRawValue(data, dataIndex, labelDims[0]);
    return rawVal != null ? rawVal + "" : null;
  } else if (len) {
    var vals = [];
    for (var i = 0; i < labelDims.length; i++) {
      vals.push(retrieveRawValue(data, dataIndex, labelDims[i]));
    }
    return vals.join(" ");
  }
}
function getDefaultInterpolatedLabel(data, interpolatedValue) {
  var labelDims = data.mapDimensionsAll("defaultedLabel");
  if (!isArray(interpolatedValue)) {
    return interpolatedValue + "";
  }
  var vals = [];
  for (var i = 0; i < labelDims.length; i++) {
    var dimIndex = data.getDimensionIndex(labelDims[i]);
    if (dimIndex >= 0) {
      vals.push(interpolatedValue[dimIndex]);
    }
  }
  return vals.join(" ");
}

// node_modules/echarts/lib/chart/helper/Symbol.js
var Symbol = (
  /** @class */
  function(_super) {
    __extends(Symbol2, _super);
    function Symbol2(data, idx, seriesScope, opts) {
      var _this = _super.call(this) || this;
      _this.updateData(data, idx, seriesScope, opts);
      return _this;
    }
    Symbol2.prototype._createSymbol = function(symbolType, data, idx, symbolSize, keepAspect) {
      this.removeAll();
      var symbolPath = createSymbol(symbolType, -1, -1, 2, 2, null, keepAspect);
      symbolPath.attr({
        z2: 100,
        culling: true,
        scaleX: symbolSize[0] / 2,
        scaleY: symbolSize[1] / 2
      });
      symbolPath.drift = driftSymbol;
      this._symbolType = symbolType;
      this.add(symbolPath);
    };
    Symbol2.prototype.stopSymbolAnimation = function(toLastFrame) {
      this.childAt(0).stopAnimation(null, toLastFrame);
    };
    Symbol2.prototype.getSymbolType = function() {
      return this._symbolType;
    };
    Symbol2.prototype.getSymbolPath = function() {
      return this.childAt(0);
    };
    Symbol2.prototype.highlight = function() {
      enterEmphasis(this.childAt(0));
    };
    Symbol2.prototype.downplay = function() {
      leaveEmphasis(this.childAt(0));
    };
    Symbol2.prototype.setZ = function(zlevel, z) {
      var symbolPath = this.childAt(0);
      symbolPath.zlevel = zlevel;
      symbolPath.z = z;
    };
    Symbol2.prototype.setDraggable = function(draggable, hasCursorOption) {
      var symbolPath = this.childAt(0);
      symbolPath.draggable = draggable;
      symbolPath.cursor = !hasCursorOption && draggable ? "move" : symbolPath.cursor;
    };
    Symbol2.prototype.updateData = function(data, idx, seriesScope, opts) {
      this.silent = false;
      var symbolType = data.getItemVisual(idx, "symbol") || "circle";
      var seriesModel = data.hostModel;
      var symbolSize = Symbol2.getSymbolSize(data, idx);
      var isInit = symbolType !== this._symbolType;
      var disableAnimation = opts && opts.disableAnimation;
      if (isInit) {
        var keepAspect = data.getItemVisual(idx, "symbolKeepAspect");
        this._createSymbol(symbolType, data, idx, symbolSize, keepAspect);
      } else {
        var symbolPath = this.childAt(0);
        symbolPath.silent = false;
        var target = {
          scaleX: symbolSize[0] / 2,
          scaleY: symbolSize[1] / 2
        };
        disableAnimation ? symbolPath.attr(target) : updateProps(symbolPath, target, seriesModel, idx);
        saveOldStyle(symbolPath);
      }
      this._updateCommon(data, idx, symbolSize, seriesScope, opts);
      if (isInit) {
        var symbolPath = this.childAt(0);
        if (!disableAnimation) {
          var target = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: symbolPath.style.opacity
            }
          };
          symbolPath.scaleX = symbolPath.scaleY = 0;
          symbolPath.style.opacity = 0;
          initProps(symbolPath, target, seriesModel, idx);
        }
      }
      if (disableAnimation) {
        this.childAt(0).stopAnimation("leave");
      }
    };
    Symbol2.prototype._updateCommon = function(data, idx, symbolSize, seriesScope, opts) {
      var symbolPath = this.childAt(0);
      var seriesModel = data.hostModel;
      var emphasisItemStyle;
      var blurItemStyle;
      var selectItemStyle;
      var focus;
      var blurScope;
      var emphasisDisabled;
      var labelStatesModels;
      var hoverScale;
      var cursorStyle;
      if (seriesScope) {
        emphasisItemStyle = seriesScope.emphasisItemStyle;
        blurItemStyle = seriesScope.blurItemStyle;
        selectItemStyle = seriesScope.selectItemStyle;
        focus = seriesScope.focus;
        blurScope = seriesScope.blurScope;
        labelStatesModels = seriesScope.labelStatesModels;
        hoverScale = seriesScope.hoverScale;
        cursorStyle = seriesScope.cursorStyle;
        emphasisDisabled = seriesScope.emphasisDisabled;
      }
      if (!seriesScope || data.hasItemOption) {
        var itemModel = seriesScope && seriesScope.itemModel ? seriesScope.itemModel : data.getItemModel(idx);
        var emphasisModel = itemModel.getModel("emphasis");
        emphasisItemStyle = emphasisModel.getModel("itemStyle").getItemStyle();
        selectItemStyle = itemModel.getModel(["select", "itemStyle"]).getItemStyle();
        blurItemStyle = itemModel.getModel(["blur", "itemStyle"]).getItemStyle();
        focus = emphasisModel.get("focus");
        blurScope = emphasisModel.get("blurScope");
        emphasisDisabled = emphasisModel.get("disabled");
        labelStatesModels = getLabelStatesModels(itemModel);
        hoverScale = emphasisModel.getShallow("scale");
        cursorStyle = itemModel.getShallow("cursor");
      }
      var symbolRotate = data.getItemVisual(idx, "symbolRotate");
      symbolPath.attr("rotation", (symbolRotate || 0) * Math.PI / 180 || 0);
      var symbolOffset = normalizeSymbolOffset(data.getItemVisual(idx, "symbolOffset"), symbolSize);
      if (symbolOffset) {
        symbolPath.x = symbolOffset[0];
        symbolPath.y = symbolOffset[1];
      }
      cursorStyle && symbolPath.attr("cursor", cursorStyle);
      var symbolStyle = data.getItemVisual(idx, "style");
      var visualColor = symbolStyle.fill;
      if (symbolPath instanceof Image_default) {
        var pathStyle = symbolPath.style;
        symbolPath.useStyle(extend({
          // TODO other properties like x, y ?
          image: pathStyle.image,
          x: pathStyle.x,
          y: pathStyle.y,
          width: pathStyle.width,
          height: pathStyle.height
        }, symbolStyle));
      } else {
        if (symbolPath.__isEmptyBrush) {
          symbolPath.useStyle(extend({}, symbolStyle));
        } else {
          symbolPath.useStyle(symbolStyle);
        }
        symbolPath.style.decal = null;
        symbolPath.setColor(visualColor, opts && opts.symbolInnerColor);
        symbolPath.style.strokeNoScale = true;
      }
      var liftZ = data.getItemVisual(idx, "liftZ");
      var z2Origin = this._z2;
      if (liftZ != null) {
        if (z2Origin == null) {
          this._z2 = symbolPath.z2;
          symbolPath.z2 += liftZ;
        }
      } else if (z2Origin != null) {
        symbolPath.z2 = z2Origin;
        this._z2 = null;
      }
      var useNameLabel = opts && opts.useNameLabel;
      setLabelStyle(symbolPath, labelStatesModels, {
        labelFetcher: seriesModel,
        labelDataIndex: idx,
        defaultText: getLabelDefaultText,
        inheritColor: visualColor,
        defaultOpacity: symbolStyle.opacity
      });
      function getLabelDefaultText(idx2) {
        return useNameLabel ? data.getName(idx2) : getDefaultLabel(data, idx2);
      }
      this._sizeX = symbolSize[0] / 2;
      this._sizeY = symbolSize[1] / 2;
      var emphasisState = symbolPath.ensureState("emphasis");
      emphasisState.style = emphasisItemStyle;
      symbolPath.ensureState("select").style = selectItemStyle;
      symbolPath.ensureState("blur").style = blurItemStyle;
      var scaleRatio = hoverScale == null || hoverScale === true ? Math.max(1.1, 3 / this._sizeY) : isFinite(hoverScale) && hoverScale > 0 ? +hoverScale : 1;
      emphasisState.scaleX = this._sizeX * scaleRatio;
      emphasisState.scaleY = this._sizeY * scaleRatio;
      this.setSymbolScale(1);
      toggleHoverEmphasis(this, focus, blurScope, emphasisDisabled);
    };
    Symbol2.prototype.setSymbolScale = function(scale2) {
      this.scaleX = this.scaleY = scale2;
    };
    Symbol2.prototype.fadeOut = function(cb, seriesModel, opt) {
      var symbolPath = this.childAt(0);
      var dataIndex = getECData(this).dataIndex;
      var animationOpt = opt && opt.animation;
      this.silent = symbolPath.silent = true;
      if (opt && opt.fadeLabel) {
        var textContent = symbolPath.getTextContent();
        if (textContent) {
          removeElement(textContent, {
            style: {
              opacity: 0
            }
          }, seriesModel, {
            dataIndex,
            removeOpt: animationOpt,
            cb: function() {
              symbolPath.removeTextContent();
            }
          });
        }
      } else {
        symbolPath.removeTextContent();
      }
      removeElement(symbolPath, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, seriesModel, {
        dataIndex,
        cb,
        removeOpt: animationOpt
      });
    };
    Symbol2.getSymbolSize = function(data, idx) {
      return normalizeSymbolSize(data.getItemVisual(idx, "symbolSize"));
    };
    return Symbol2;
  }(Group_default)
);
function driftSymbol(dx, dy) {
  this.parent.drift(dx, dy);
}
var Symbol_default = Symbol;

// node_modules/echarts/lib/chart/helper/SymbolDraw.js
function symbolNeedsDraw(data, point, idx, opt) {
  return point && !isNaN(point[0]) && !isNaN(point[1]) && !(opt.isIgnore && opt.isIgnore(idx)) && !(opt.clipShape && !opt.clipShape.contain(point[0], point[1])) && data.getItemVisual(idx, "symbol") !== "none";
}
function normalizeUpdateOpt(opt) {
  if (opt != null && !isObject(opt)) {
    opt = {
      isIgnore: opt
    };
  }
  return opt || {};
}
function makeSeriesScope(data) {
  var seriesModel = data.hostModel;
  var emphasisModel = seriesModel.getModel("emphasis");
  return {
    emphasisItemStyle: emphasisModel.getModel("itemStyle").getItemStyle(),
    blurItemStyle: seriesModel.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: seriesModel.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: emphasisModel.get("focus"),
    blurScope: emphasisModel.get("blurScope"),
    emphasisDisabled: emphasisModel.get("disabled"),
    hoverScale: emphasisModel.get("scale"),
    labelStatesModels: getLabelStatesModels(seriesModel),
    cursorStyle: seriesModel.get("cursor")
  };
}
var SymbolDraw = (
  /** @class */
  function() {
    function SymbolDraw2(SymbolCtor) {
      this.group = new Group_default();
      this._SymbolCtor = SymbolCtor || Symbol_default;
    }
    SymbolDraw2.prototype.updateData = function(data, opt) {
      this._progressiveEls = null;
      opt = normalizeUpdateOpt(opt);
      var group = this.group;
      var seriesModel = data.hostModel;
      var oldData = this._data;
      var SymbolCtor = this._SymbolCtor;
      var disableAnimation = opt.disableAnimation;
      var seriesScope = makeSeriesScope(data);
      var symbolUpdateOpt = {
        disableAnimation
      };
      var getSymbolPoint = opt.getSymbolPoint || function(idx) {
        return data.getItemLayout(idx);
      };
      if (!oldData) {
        group.removeAll();
      }
      data.diff(oldData).add(function(newIdx) {
        var point = getSymbolPoint(newIdx);
        if (symbolNeedsDraw(data, point, newIdx, opt)) {
          var symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
          symbolEl.setPosition(point);
          data.setItemGraphicEl(newIdx, symbolEl);
          group.add(symbolEl);
        }
      }).update(function(newIdx, oldIdx) {
        var symbolEl = oldData.getItemGraphicEl(oldIdx);
        var point = getSymbolPoint(newIdx);
        if (!symbolNeedsDraw(data, point, newIdx, opt)) {
          group.remove(symbolEl);
          return;
        }
        var newSymbolType = data.getItemVisual(newIdx, "symbol") || "circle";
        var oldSymbolType = symbolEl && symbolEl.getSymbolType && symbolEl.getSymbolType();
        if (!symbolEl || oldSymbolType && oldSymbolType !== newSymbolType) {
          group.remove(symbolEl);
          symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
          symbolEl.setPosition(point);
        } else {
          symbolEl.updateData(data, newIdx, seriesScope, symbolUpdateOpt);
          var target = {
            x: point[0],
            y: point[1]
          };
          disableAnimation ? symbolEl.attr(target) : updateProps(symbolEl, target, seriesModel);
        }
        group.add(symbolEl);
        data.setItemGraphicEl(newIdx, symbolEl);
      }).remove(function(oldIdx) {
        var el = oldData.getItemGraphicEl(oldIdx);
        el && el.fadeOut(function() {
          group.remove(el);
        }, seriesModel);
      }).execute();
      this._getSymbolPoint = getSymbolPoint;
      this._data = data;
    };
    ;
    SymbolDraw2.prototype.updateLayout = function() {
      var _this = this;
      var data = this._data;
      if (data) {
        data.eachItemGraphicEl(function(el, idx) {
          var point = _this._getSymbolPoint(idx);
          el.setPosition(point);
          el.markRedraw();
        });
      }
    };
    ;
    SymbolDraw2.prototype.incrementalPrepareUpdate = function(data) {
      this._seriesScope = makeSeriesScope(data);
      this._data = null;
      this.group.removeAll();
    };
    ;
    SymbolDraw2.prototype.incrementalUpdate = function(taskParams, data, opt) {
      this._progressiveEls = [];
      opt = normalizeUpdateOpt(opt);
      function updateIncrementalAndHover(el2) {
        if (!el2.isGroup) {
          el2.incremental = true;
          el2.ensureState("emphasis").hoverLayer = true;
        }
      }
      for (var idx = taskParams.start; idx < taskParams.end; idx++) {
        var point = data.getItemLayout(idx);
        if (symbolNeedsDraw(data, point, idx, opt)) {
          var el = new this._SymbolCtor(data, idx, this._seriesScope);
          el.traverse(updateIncrementalAndHover);
          el.setPosition(point);
          this.group.add(el);
          data.setItemGraphicEl(idx, el);
          this._progressiveEls.push(el);
        }
      }
    };
    ;
    SymbolDraw2.prototype.eachRendered = function(cb) {
      traverseElements(this._progressiveEls || this.group, cb);
    };
    SymbolDraw2.prototype.remove = function(enableAnimation) {
      var group = this.group;
      var data = this._data;
      if (data && enableAnimation) {
        data.eachItemGraphicEl(function(el) {
          el.fadeOut(function() {
            group.remove(el);
          }, data.hostModel);
        });
      } else {
        group.removeAll();
      }
    };
    ;
    return SymbolDraw2;
  }()
);
var SymbolDraw_default = SymbolDraw;

// node_modules/echarts/lib/coord/CoordinateSystem.js
function isCoordinateSystemType(coordSys, type) {
  return coordSys.type === type;
}

// node_modules/echarts/lib/visual/VisualMapping.js
var each3 = each;
var isObject2 = isObject;
var CATEGORY_DEFAULT_VISUAL_INDEX = -1;
var VisualMapping = (
  /** @class */
  function() {
    function VisualMapping2(option) {
      var mappingMethod = option.mappingMethod;
      var visualType = option.type;
      var thisOption = this.option = clone(option);
      this.type = visualType;
      this.mappingMethod = mappingMethod;
      this._normalizeData = normalizers[mappingMethod];
      var visualHandler = VisualMapping2.visualHandlers[visualType];
      this.applyVisual = visualHandler.applyVisual;
      this.getColorMapper = visualHandler.getColorMapper;
      this._normalizedToVisual = visualHandler._normalizedToVisual[mappingMethod];
      if (mappingMethod === "piecewise") {
        normalizeVisualRange(thisOption);
        preprocessForPiecewise(thisOption);
      } else if (mappingMethod === "category") {
        thisOption.categories ? preprocessForSpecifiedCategory(thisOption) : normalizeVisualRange(thisOption, true);
      } else {
        assert(mappingMethod !== "linear" || thisOption.dataExtent);
        normalizeVisualRange(thisOption);
      }
    }
    VisualMapping2.prototype.mapValueToVisual = function(value) {
      var normalized = this._normalizeData(value);
      return this._normalizedToVisual(normalized, value);
    };
    VisualMapping2.prototype.getNormalizer = function() {
      return bind(this._normalizeData, this);
    };
    VisualMapping2.listVisualTypes = function() {
      return keys(VisualMapping2.visualHandlers);
    };
    VisualMapping2.isValidType = function(visualType) {
      return VisualMapping2.visualHandlers.hasOwnProperty(visualType);
    };
    VisualMapping2.eachVisual = function(visual, callback, context) {
      if (isObject(visual)) {
        each(visual, callback, context);
      } else {
        callback.call(context, visual);
      }
    };
    VisualMapping2.mapVisual = function(visual, callback, context) {
      var isPrimary;
      var newVisual = isArray(visual) ? [] : isObject(visual) ? {} : (isPrimary = true, null);
      VisualMapping2.eachVisual(visual, function(v, key) {
        var newVal = callback.call(context, v, key);
        isPrimary ? newVisual = newVal : newVisual[key] = newVal;
      });
      return newVisual;
    };
    VisualMapping2.retrieveVisuals = function(obj) {
      var ret = {};
      var hasVisual;
      obj && each3(VisualMapping2.visualHandlers, function(h, visualType) {
        if (obj.hasOwnProperty(visualType)) {
          ret[visualType] = obj[visualType];
          hasVisual = true;
        }
      });
      return hasVisual ? ret : null;
    };
    VisualMapping2.prepareVisualTypes = function(visualTypes) {
      if (isArray(visualTypes)) {
        visualTypes = visualTypes.slice();
      } else if (isObject2(visualTypes)) {
        var types_1 = [];
        each3(visualTypes, function(item, type) {
          types_1.push(type);
        });
        visualTypes = types_1;
      } else {
        return [];
      }
      visualTypes.sort(function(type1, type2) {
        return type2 === "color" && type1 !== "color" && type1.indexOf("color") === 0 ? 1 : -1;
      });
      return visualTypes;
    };
    VisualMapping2.dependsOn = function(visualType1, visualType2) {
      return visualType2 === "color" ? !!(visualType1 && visualType1.indexOf(visualType2) === 0) : visualType1 === visualType2;
    };
    VisualMapping2.findPieceIndex = function(value, pieceList, findClosestWhenOutside) {
      var possibleI;
      var abs = Infinity;
      for (var i = 0, len = pieceList.length; i < len; i++) {
        var pieceValue = pieceList[i].value;
        if (pieceValue != null) {
          if (pieceValue === value || isString(pieceValue) && pieceValue === value + "") {
            return i;
          }
          findClosestWhenOutside && updatePossible(pieceValue, i);
        }
      }
      for (var i = 0, len = pieceList.length; i < len; i++) {
        var piece = pieceList[i];
        var interval = piece.interval;
        var close_1 = piece.close;
        if (interval) {
          if (interval[0] === -Infinity) {
            if (littleThan(close_1[1], value, interval[1])) {
              return i;
            }
          } else if (interval[1] === Infinity) {
            if (littleThan(close_1[0], interval[0], value)) {
              return i;
            }
          } else if (littleThan(close_1[0], interval[0], value) && littleThan(close_1[1], value, interval[1])) {
            return i;
          }
          findClosestWhenOutside && updatePossible(interval[0], i);
          findClosestWhenOutside && updatePossible(interval[1], i);
        }
      }
      if (findClosestWhenOutside) {
        return value === Infinity ? pieceList.length - 1 : value === -Infinity ? 0 : possibleI;
      }
      function updatePossible(val, index) {
        var newAbs = Math.abs(val - value);
        if (newAbs < abs) {
          abs = newAbs;
          possibleI = index;
        }
      }
    };
    VisualMapping2.visualHandlers = {
      color: {
        applyVisual: makeApplyVisual("color"),
        getColorMapper: function() {
          var thisOption = this.option;
          return bind(thisOption.mappingMethod === "category" ? function(value, isNormalized) {
            !isNormalized && (value = this._normalizeData(value));
            return doMapCategory.call(this, value);
          } : function(value, isNormalized, out) {
            var returnRGBArray = !!out;
            !isNormalized && (value = this._normalizeData(value));
            out = fastLerp(value, thisOption.parsedVisual, out);
            return returnRGBArray ? out : stringify(out, "rgba");
          }, this);
        },
        _normalizedToVisual: {
          linear: function(normalized) {
            return stringify(fastLerp(normalized, this.option.parsedVisual), "rgba");
          },
          category: doMapCategory,
          piecewise: function(normalized, value) {
            var result = getSpecifiedVisual.call(this, value);
            if (result == null) {
              result = stringify(fastLerp(normalized, this.option.parsedVisual), "rgba");
            }
            return result;
          },
          fixed: doMapFixed
        }
      },
      colorHue: makePartialColorVisualHandler(function(color, value) {
        return modifyHSL(color, value);
      }),
      colorSaturation: makePartialColorVisualHandler(function(color, value) {
        return modifyHSL(color, null, value);
      }),
      colorLightness: makePartialColorVisualHandler(function(color, value) {
        return modifyHSL(color, null, null, value);
      }),
      colorAlpha: makePartialColorVisualHandler(function(color, value) {
        return modifyAlpha(color, value);
      }),
      decal: {
        applyVisual: makeApplyVisual("decal"),
        _normalizedToVisual: {
          linear: null,
          category: doMapCategory,
          piecewise: null,
          fixed: null
        }
      },
      opacity: {
        applyVisual: makeApplyVisual("opacity"),
        _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
      },
      liftZ: {
        applyVisual: makeApplyVisual("liftZ"),
        _normalizedToVisual: {
          linear: doMapFixed,
          category: doMapFixed,
          piecewise: doMapFixed,
          fixed: doMapFixed
        }
      },
      symbol: {
        applyVisual: function(value, getter, setter) {
          var symbolCfg = this.mapValueToVisual(value);
          setter("symbol", symbolCfg);
        },
        _normalizedToVisual: {
          linear: doMapToArray,
          category: doMapCategory,
          piecewise: function(normalized, value) {
            var result = getSpecifiedVisual.call(this, value);
            if (result == null) {
              result = doMapToArray.call(this, normalized);
            }
            return result;
          },
          fixed: doMapFixed
        }
      },
      symbolSize: {
        applyVisual: makeApplyVisual("symbolSize"),
        _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
      }
    };
    return VisualMapping2;
  }()
);
function preprocessForPiecewise(thisOption) {
  var pieceList = thisOption.pieceList;
  thisOption.hasSpecialVisual = false;
  each(pieceList, function(piece, index) {
    piece.originIndex = index;
    if (piece.visual != null) {
      thisOption.hasSpecialVisual = true;
    }
  });
}
function preprocessForSpecifiedCategory(thisOption) {
  var categories = thisOption.categories;
  var categoryMap = thisOption.categoryMap = {};
  var visual = thisOption.visual;
  each3(categories, function(cate, index) {
    categoryMap[cate] = index;
  });
  if (!isArray(visual)) {
    var visualArr_1 = [];
    if (isObject(visual)) {
      each3(visual, function(v, cate) {
        var index = categoryMap[cate];
        visualArr_1[index != null ? index : CATEGORY_DEFAULT_VISUAL_INDEX] = v;
      });
    } else {
      visualArr_1[CATEGORY_DEFAULT_VISUAL_INDEX] = visual;
    }
    visual = setVisualToOption(thisOption, visualArr_1);
  }
  for (var i = categories.length - 1; i >= 0; i--) {
    if (visual[i] == null) {
      delete categoryMap[categories[i]];
      categories.pop();
    }
  }
}
function normalizeVisualRange(thisOption, isCategory) {
  var visual = thisOption.visual;
  var visualArr = [];
  if (isObject(visual)) {
    each3(visual, function(v) {
      visualArr.push(v);
    });
  } else if (visual != null) {
    visualArr.push(visual);
  }
  var doNotNeedPair = {
    color: 1,
    symbol: 1
  };
  if (!isCategory && visualArr.length === 1 && !doNotNeedPair.hasOwnProperty(thisOption.type)) {
    visualArr[1] = visualArr[0];
  }
  setVisualToOption(thisOption, visualArr);
}
function makePartialColorVisualHandler(applyValue) {
  return {
    applyVisual: function(value, getter, setter) {
      var colorChannel = this.mapValueToVisual(value);
      setter("color", applyValue(getter("color"), colorChannel));
    },
    _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
  };
}
function doMapToArray(normalized) {
  var visual = this.option.visual;
  return visual[Math.round(linearMap(normalized, [0, 1], [0, visual.length - 1], true))] || {};
}
function makeApplyVisual(visualType) {
  return function(value, getter, setter) {
    setter(visualType, this.mapValueToVisual(value));
  };
}
function doMapCategory(normalized) {
  var visual = this.option.visual;
  return visual[this.option.loop && normalized !== CATEGORY_DEFAULT_VISUAL_INDEX ? normalized % visual.length : normalized];
}
function doMapFixed() {
  return this.option.visual[0];
}
function createNormalizedToNumericVisual(sourceExtent) {
  return {
    linear: function(normalized) {
      return linearMap(normalized, sourceExtent, this.option.visual, true);
    },
    category: doMapCategory,
    piecewise: function(normalized, value) {
      var result = getSpecifiedVisual.call(this, value);
      if (result == null) {
        result = linearMap(normalized, sourceExtent, this.option.visual, true);
      }
      return result;
    },
    fixed: doMapFixed
  };
}
function getSpecifiedVisual(value) {
  var thisOption = this.option;
  var pieceList = thisOption.pieceList;
  if (thisOption.hasSpecialVisual) {
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList);
    var piece = pieceList[pieceIndex];
    if (piece && piece.visual) {
      return piece.visual[this.type];
    }
  }
}
function setVisualToOption(thisOption, visualArr) {
  thisOption.visual = visualArr;
  if (thisOption.type === "color") {
    thisOption.parsedVisual = map(visualArr, function(item) {
      var color = parse(item);
      if (!color && true) {
        warn("'" + item + "' is an illegal color, fallback to '#000000'", true);
      }
      return color || [0, 0, 0, 1];
    });
  }
  return visualArr;
}
var normalizers = {
  linear: function(value) {
    return linearMap(value, this.option.dataExtent, [0, 1], true);
  },
  piecewise: function(value) {
    var pieceList = this.option.pieceList;
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList, true);
    if (pieceIndex != null) {
      return linearMap(pieceIndex, [0, pieceList.length - 1], [0, 1], true);
    }
  },
  category: function(value) {
    var index = this.option.categories ? this.option.categoryMap[value] : value;
    return index == null ? CATEGORY_DEFAULT_VISUAL_INDEX : index;
  },
  fixed: noop
};
function littleThan(close, a, b) {
  return close ? a <= b : a < b;
}
var VisualMapping_default = VisualMapping;

// node_modules/echarts/lib/chart/helper/LinePath.js
var straightLineProto = Line_default.prototype;
var bezierCurveProto = BezierCurve_default.prototype;
var StraightLineShape = (
  /** @class */
  /* @__PURE__ */ function() {
    function StraightLineShape2() {
      this.x1 = 0;
      this.y1 = 0;
      this.x2 = 0;
      this.y2 = 0;
      this.percent = 1;
    }
    return StraightLineShape2;
  }()
);
var CurveShape = (
  /** @class */
  function(_super) {
    __extends(CurveShape2, _super);
    function CurveShape2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return CurveShape2;
  }(StraightLineShape)
);
function isStraightLine(shape) {
  return isNaN(+shape.cpx1) || isNaN(+shape.cpy1);
}
var ECLinePath = (
  /** @class */
  function(_super) {
    __extends(ECLinePath2, _super);
    function ECLinePath2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "ec-line";
      return _this;
    }
    ECLinePath2.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    };
    ECLinePath2.prototype.getDefaultShape = function() {
      return new StraightLineShape();
    };
    ECLinePath2.prototype.buildPath = function(ctx, shape) {
      if (isStraightLine(shape)) {
        straightLineProto.buildPath.call(this, ctx, shape);
      } else {
        bezierCurveProto.buildPath.call(this, ctx, shape);
      }
    };
    ECLinePath2.prototype.pointAt = function(t) {
      if (isStraightLine(this.shape)) {
        return straightLineProto.pointAt.call(this, t);
      } else {
        return bezierCurveProto.pointAt.call(this, t);
      }
    };
    ECLinePath2.prototype.tangentAt = function(t) {
      var shape = this.shape;
      var p = isStraightLine(shape) ? [shape.x2 - shape.x1, shape.y2 - shape.y1] : bezierCurveProto.tangentAt.call(this, t);
      return normalize(p, p);
    };
    return ECLinePath2;
  }(Path_default)
);
var LinePath_default = ECLinePath;

// node_modules/echarts/lib/chart/helper/Line.js
var SYMBOL_CATEGORIES = ["fromSymbol", "toSymbol"];
function makeSymbolTypeKey(symbolCategory) {
  return "_" + symbolCategory + "Type";
}
function makeSymbolTypeValue(name, lineData, idx) {
  var symbolType = lineData.getItemVisual(idx, name);
  if (!symbolType || symbolType === "none") {
    return symbolType;
  }
  var symbolSize = lineData.getItemVisual(idx, name + "Size");
  var symbolRotate = lineData.getItemVisual(idx, name + "Rotate");
  var symbolOffset = lineData.getItemVisual(idx, name + "Offset");
  var symbolKeepAspect = lineData.getItemVisual(idx, name + "KeepAspect");
  var symbolSizeArr = normalizeSymbolSize(symbolSize);
  var symbolOffsetArr = normalizeSymbolOffset(symbolOffset || 0, symbolSizeArr);
  return symbolType + symbolSizeArr + symbolOffsetArr + (symbolRotate || "") + (symbolKeepAspect || "");
}
function createSymbol2(name, lineData, idx) {
  var symbolType = lineData.getItemVisual(idx, name);
  if (!symbolType || symbolType === "none") {
    return;
  }
  var symbolSize = lineData.getItemVisual(idx, name + "Size");
  var symbolRotate = lineData.getItemVisual(idx, name + "Rotate");
  var symbolOffset = lineData.getItemVisual(idx, name + "Offset");
  var symbolKeepAspect = lineData.getItemVisual(idx, name + "KeepAspect");
  var symbolSizeArr = normalizeSymbolSize(symbolSize);
  var symbolOffsetArr = normalizeSymbolOffset(symbolOffset || 0, symbolSizeArr);
  var symbolPath = createSymbol(symbolType, -symbolSizeArr[0] / 2 + symbolOffsetArr[0], -symbolSizeArr[1] / 2 + symbolOffsetArr[1], symbolSizeArr[0], symbolSizeArr[1], null, symbolKeepAspect);
  symbolPath.__specifiedRotation = symbolRotate == null || isNaN(symbolRotate) ? void 0 : +symbolRotate * Math.PI / 180 || 0;
  symbolPath.name = name;
  return symbolPath;
}
function createLine(points3) {
  var line = new LinePath_default({
    name: "line",
    subPixelOptimize: true
  });
  setLinePoints(line.shape, points3);
  return line;
}
function setLinePoints(targetShape, points3) {
  targetShape.x1 = points3[0][0];
  targetShape.y1 = points3[0][1];
  targetShape.x2 = points3[1][0];
  targetShape.y2 = points3[1][1];
  targetShape.percent = 1;
  var cp1 = points3[2];
  if (cp1) {
    targetShape.cpx1 = cp1[0];
    targetShape.cpy1 = cp1[1];
  } else {
    targetShape.cpx1 = NaN;
    targetShape.cpy1 = NaN;
  }
}
var Line = (
  /** @class */
  function(_super) {
    __extends(Line2, _super);
    function Line2(lineData, idx, seriesScope) {
      var _this = _super.call(this) || this;
      _this._createLine(lineData, idx, seriesScope);
      return _this;
    }
    Line2.prototype._createLine = function(lineData, idx, seriesScope) {
      var seriesModel = lineData.hostModel;
      var linePoints = lineData.getItemLayout(idx);
      var line = createLine(linePoints);
      line.shape.percent = 0;
      initProps(line, {
        shape: {
          percent: 1
        }
      }, seriesModel, idx);
      this.add(line);
      each(SYMBOL_CATEGORIES, function(symbolCategory) {
        var symbol = createSymbol2(symbolCategory, lineData, idx);
        this.add(symbol);
        this[makeSymbolTypeKey(symbolCategory)] = makeSymbolTypeValue(symbolCategory, lineData, idx);
      }, this);
      this._updateCommonStl(lineData, idx, seriesScope);
    };
    Line2.prototype.updateData = function(lineData, idx, seriesScope) {
      var seriesModel = lineData.hostModel;
      var line = this.childOfName("line");
      var linePoints = lineData.getItemLayout(idx);
      var target = {
        shape: {}
      };
      setLinePoints(target.shape, linePoints);
      updateProps(line, target, seriesModel, idx);
      each(SYMBOL_CATEGORIES, function(symbolCategory) {
        var symbolType = makeSymbolTypeValue(symbolCategory, lineData, idx);
        var key = makeSymbolTypeKey(symbolCategory);
        if (this[key] !== symbolType) {
          this.remove(this.childOfName(symbolCategory));
          var symbol = createSymbol2(symbolCategory, lineData, idx);
          this.add(symbol);
        }
        this[key] = symbolType;
      }, this);
      this._updateCommonStl(lineData, idx, seriesScope);
    };
    ;
    Line2.prototype.getLinePath = function() {
      return this.childAt(0);
    };
    Line2.prototype._updateCommonStl = function(lineData, idx, seriesScope) {
      var seriesModel = lineData.hostModel;
      var line = this.childOfName("line");
      var emphasisLineStyle = seriesScope && seriesScope.emphasisLineStyle;
      var blurLineStyle = seriesScope && seriesScope.blurLineStyle;
      var selectLineStyle = seriesScope && seriesScope.selectLineStyle;
      var labelStatesModels = seriesScope && seriesScope.labelStatesModels;
      var emphasisDisabled = seriesScope && seriesScope.emphasisDisabled;
      var focus = seriesScope && seriesScope.focus;
      var blurScope = seriesScope && seriesScope.blurScope;
      if (!seriesScope || lineData.hasItemOption) {
        var itemModel = lineData.getItemModel(idx);
        var emphasisModel = itemModel.getModel("emphasis");
        emphasisLineStyle = emphasisModel.getModel("lineStyle").getLineStyle();
        blurLineStyle = itemModel.getModel(["blur", "lineStyle"]).getLineStyle();
        selectLineStyle = itemModel.getModel(["select", "lineStyle"]).getLineStyle();
        emphasisDisabled = emphasisModel.get("disabled");
        focus = emphasisModel.get("focus");
        blurScope = emphasisModel.get("blurScope");
        labelStatesModels = getLabelStatesModels(itemModel);
      }
      var lineStyle = lineData.getItemVisual(idx, "style");
      var visualColor = lineStyle.stroke;
      line.useStyle(lineStyle);
      line.style.fill = null;
      line.style.strokeNoScale = true;
      line.ensureState("emphasis").style = emphasisLineStyle;
      line.ensureState("blur").style = blurLineStyle;
      line.ensureState("select").style = selectLineStyle;
      each(SYMBOL_CATEGORIES, function(symbolCategory) {
        var symbol = this.childOfName(symbolCategory);
        if (symbol) {
          symbol.setColor(visualColor);
          symbol.style.opacity = lineStyle.opacity;
          for (var i = 0; i < SPECIAL_STATES.length; i++) {
            var stateName = SPECIAL_STATES[i];
            var lineState = line.getState(stateName);
            if (lineState) {
              var lineStateStyle = lineState.style || {};
              var state = symbol.ensureState(stateName);
              var stateStyle = state.style || (state.style = {});
              if (lineStateStyle.stroke != null) {
                stateStyle[symbol.__isEmptyBrush ? "stroke" : "fill"] = lineStateStyle.stroke;
              }
              if (lineStateStyle.opacity != null) {
                stateStyle.opacity = lineStateStyle.opacity;
              }
            }
          }
          symbol.markRedraw();
        }
      }, this);
      var rawVal = seriesModel.getRawValue(idx);
      setLabelStyle(this, labelStatesModels, {
        labelDataIndex: idx,
        labelFetcher: {
          getFormattedLabel: function(dataIndex, stateName) {
            return seriesModel.getFormattedLabel(dataIndex, stateName, lineData.dataType);
          }
        },
        inheritColor: visualColor || "#000",
        defaultOpacity: lineStyle.opacity,
        defaultText: (rawVal == null ? lineData.getName(idx) : isFinite(rawVal) ? round(rawVal) : rawVal) + ""
      });
      var label = this.getTextContent();
      if (label) {
        var labelNormalModel = labelStatesModels.normal;
        label.__align = label.style.align;
        label.__verticalAlign = label.style.verticalAlign;
        label.__position = labelNormalModel.get("position") || "middle";
        var distance = labelNormalModel.get("distance");
        if (!isArray(distance)) {
          distance = [distance, distance];
        }
        label.__labelDistance = distance;
      }
      this.setTextConfig({
        position: null,
        local: true,
        inside: false
        // Can't be inside for stroke element.
      });
      toggleHoverEmphasis(this, focus, blurScope, emphasisDisabled);
    };
    Line2.prototype.highlight = function() {
      enterEmphasis(this);
    };
    Line2.prototype.downplay = function() {
      leaveEmphasis(this);
    };
    Line2.prototype.updateLayout = function(lineData, idx) {
      this.setLinePoints(lineData.getItemLayout(idx));
    };
    Line2.prototype.setLinePoints = function(points3) {
      var linePath = this.childOfName("line");
      setLinePoints(linePath.shape, points3);
      linePath.dirty();
    };
    Line2.prototype.beforeUpdate = function() {
      var lineGroup = this;
      var symbolFrom = lineGroup.childOfName("fromSymbol");
      var symbolTo = lineGroup.childOfName("toSymbol");
      var label = lineGroup.getTextContent();
      if (!symbolFrom && !symbolTo && (!label || label.ignore)) {
        return;
      }
      var invScale = 1;
      var parentNode = this.parent;
      while (parentNode) {
        if (parentNode.scaleX) {
          invScale /= parentNode.scaleX;
        }
        parentNode = parentNode.parent;
      }
      var line = lineGroup.childOfName("line");
      if (!this.__dirty && !line.__dirty) {
        return;
      }
      var percent = line.shape.percent;
      var fromPos = line.pointAt(0);
      var toPos = line.pointAt(percent);
      var d = sub([], toPos, fromPos);
      normalize(d, d);
      function setSymbolRotation(symbol, percent2) {
        var specifiedRotation = symbol.__specifiedRotation;
        if (specifiedRotation == null) {
          var tangent2 = line.tangentAt(percent2);
          symbol.attr("rotation", (percent2 === 1 ? -1 : 1) * Math.PI / 2 - Math.atan2(tangent2[1], tangent2[0]));
        } else {
          symbol.attr("rotation", specifiedRotation);
        }
      }
      if (symbolFrom) {
        symbolFrom.setPosition(fromPos);
        setSymbolRotation(symbolFrom, 0);
        symbolFrom.scaleX = symbolFrom.scaleY = invScale * percent;
        symbolFrom.markRedraw();
      }
      if (symbolTo) {
        symbolTo.setPosition(toPos);
        setSymbolRotation(symbolTo, 1);
        symbolTo.scaleX = symbolTo.scaleY = invScale * percent;
        symbolTo.markRedraw();
      }
      if (label && !label.ignore) {
        label.x = label.y = 0;
        label.originX = label.originY = 0;
        var textAlign = void 0;
        var textVerticalAlign = void 0;
        var distance = label.__labelDistance;
        var distanceX = distance[0] * invScale;
        var distanceY = distance[1] * invScale;
        var halfPercent = percent / 2;
        var tangent = line.tangentAt(halfPercent);
        var n = [tangent[1], -tangent[0]];
        var cp = line.pointAt(halfPercent);
        if (n[1] > 0) {
          n[0] = -n[0];
          n[1] = -n[1];
        }
        var dir = tangent[0] < 0 ? -1 : 1;
        if (label.__position !== "start" && label.__position !== "end") {
          var rotation = -Math.atan2(tangent[1], tangent[0]);
          if (toPos[0] < fromPos[0]) {
            rotation = Math.PI + rotation;
          }
          label.rotation = rotation;
        }
        var dy = void 0;
        switch (label.__position) {
          case "insideStartTop":
          case "insideMiddleTop":
          case "insideEndTop":
          case "middle":
            dy = -distanceY;
            textVerticalAlign = "bottom";
            break;
          case "insideStartBottom":
          case "insideMiddleBottom":
          case "insideEndBottom":
            dy = distanceY;
            textVerticalAlign = "top";
            break;
          default:
            dy = 0;
            textVerticalAlign = "middle";
        }
        switch (label.__position) {
          case "end":
            label.x = d[0] * distanceX + toPos[0];
            label.y = d[1] * distanceY + toPos[1];
            textAlign = d[0] > 0.8 ? "left" : d[0] < -0.8 ? "right" : "center";
            textVerticalAlign = d[1] > 0.8 ? "top" : d[1] < -0.8 ? "bottom" : "middle";
            break;
          case "start":
            label.x = -d[0] * distanceX + fromPos[0];
            label.y = -d[1] * distanceY + fromPos[1];
            textAlign = d[0] > 0.8 ? "right" : d[0] < -0.8 ? "left" : "center";
            textVerticalAlign = d[1] > 0.8 ? "bottom" : d[1] < -0.8 ? "top" : "middle";
            break;
          case "insideStartTop":
          case "insideStart":
          case "insideStartBottom":
            label.x = distanceX * dir + fromPos[0];
            label.y = fromPos[1] + dy;
            textAlign = tangent[0] < 0 ? "right" : "left";
            label.originX = -distanceX * dir;
            label.originY = -dy;
            break;
          case "insideMiddleTop":
          case "insideMiddle":
          case "insideMiddleBottom":
          case "middle":
            label.x = cp[0];
            label.y = cp[1] + dy;
            textAlign = "center";
            label.originY = -dy;
            break;
          case "insideEndTop":
          case "insideEnd":
          case "insideEndBottom":
            label.x = -distanceX * dir + toPos[0];
            label.y = toPos[1] + dy;
            textAlign = tangent[0] >= 0 ? "right" : "left";
            label.originX = distanceX * dir;
            label.originY = -dy;
            break;
        }
        label.scaleX = label.scaleY = invScale;
        label.setStyle({
          // Use the user specified text align and baseline first
          verticalAlign: label.__verticalAlign || textVerticalAlign,
          align: label.__align || textAlign
        });
      }
    };
    return Line2;
  }(Group_default)
);
var Line_default2 = Line;

// node_modules/echarts/lib/chart/helper/LineDraw.js
var LineDraw = (
  /** @class */
  function() {
    function LineDraw2(LineCtor) {
      this.group = new Group_default();
      this._LineCtor = LineCtor || Line_default2;
    }
    LineDraw2.prototype.updateData = function(lineData) {
      var _this = this;
      this._progressiveEls = null;
      var lineDraw = this;
      var group = lineDraw.group;
      var oldLineData = lineDraw._lineData;
      lineDraw._lineData = lineData;
      if (!oldLineData) {
        group.removeAll();
      }
      var seriesScope = makeSeriesScope2(lineData);
      lineData.diff(oldLineData).add(function(idx) {
        _this._doAdd(lineData, idx, seriesScope);
      }).update(function(newIdx, oldIdx) {
        _this._doUpdate(oldLineData, lineData, oldIdx, newIdx, seriesScope);
      }).remove(function(idx) {
        group.remove(oldLineData.getItemGraphicEl(idx));
      }).execute();
    };
    ;
    LineDraw2.prototype.updateLayout = function() {
      var lineData = this._lineData;
      if (!lineData) {
        return;
      }
      lineData.eachItemGraphicEl(function(el, idx) {
        el.updateLayout(lineData, idx);
      }, this);
    };
    ;
    LineDraw2.prototype.incrementalPrepareUpdate = function(lineData) {
      this._seriesScope = makeSeriesScope2(lineData);
      this._lineData = null;
      this.group.removeAll();
    };
    ;
    LineDraw2.prototype.incrementalUpdate = function(taskParams, lineData) {
      this._progressiveEls = [];
      function updateIncrementalAndHover(el2) {
        if (!el2.isGroup && !isEffectObject(el2)) {
          el2.incremental = true;
          el2.ensureState("emphasis").hoverLayer = true;
        }
      }
      for (var idx = taskParams.start; idx < taskParams.end; idx++) {
        var itemLayout = lineData.getItemLayout(idx);
        if (lineNeedsDraw(itemLayout)) {
          var el = new this._LineCtor(lineData, idx, this._seriesScope);
          el.traverse(updateIncrementalAndHover);
          this.group.add(el);
          lineData.setItemGraphicEl(idx, el);
          this._progressiveEls.push(el);
        }
      }
    };
    ;
    LineDraw2.prototype.remove = function() {
      this.group.removeAll();
    };
    ;
    LineDraw2.prototype.eachRendered = function(cb) {
      traverseElements(this._progressiveEls || this.group, cb);
    };
    LineDraw2.prototype._doAdd = function(lineData, idx, seriesScope) {
      var itemLayout = lineData.getItemLayout(idx);
      if (!lineNeedsDraw(itemLayout)) {
        return;
      }
      var el = new this._LineCtor(lineData, idx, seriesScope);
      lineData.setItemGraphicEl(idx, el);
      this.group.add(el);
    };
    LineDraw2.prototype._doUpdate = function(oldLineData, newLineData, oldIdx, newIdx, seriesScope) {
      var itemEl = oldLineData.getItemGraphicEl(oldIdx);
      if (!lineNeedsDraw(newLineData.getItemLayout(newIdx))) {
        this.group.remove(itemEl);
        return;
      }
      if (!itemEl) {
        itemEl = new this._LineCtor(newLineData, newIdx, seriesScope);
      } else {
        itemEl.updateData(newLineData, newIdx, seriesScope);
      }
      newLineData.setItemGraphicEl(newIdx, itemEl);
      this.group.add(itemEl);
    };
    return LineDraw2;
  }()
);
function isEffectObject(el) {
  return el.animators && el.animators.length > 0;
}
function makeSeriesScope2(lineData) {
  var hostModel = lineData.hostModel;
  var emphasisModel = hostModel.getModel("emphasis");
  return {
    lineStyle: hostModel.getModel("lineStyle").getLineStyle(),
    emphasisLineStyle: emphasisModel.getModel(["lineStyle"]).getLineStyle(),
    blurLineStyle: hostModel.getModel(["blur", "lineStyle"]).getLineStyle(),
    selectLineStyle: hostModel.getModel(["select", "lineStyle"]).getLineStyle(),
    emphasisDisabled: emphasisModel.get("disabled"),
    blurScope: emphasisModel.get("blurScope"),
    focus: emphasisModel.get("focus"),
    labelStatesModels: getLabelStatesModels(hostModel)
  };
}
function isPointNaN(pt) {
  return isNaN(pt[0]) || isNaN(pt[1]);
}
function lineNeedsDraw(pts) {
  return pts && !isPointNaN(pts[0]) && !isPointNaN(pts[1]);
}
var LineDraw_default = LineDraw;

// node_modules/echarts/lib/util/styleCompat.js
var deprecatedLogs = {};
function isEC4CompatibleStyle(style, elType, hasOwnTextContentOption, hasOwnTextConfig) {
  return style && (style.legacy || style.legacy !== false && !hasOwnTextContentOption && !hasOwnTextConfig && elType !== "tspan" && (elType === "text" || hasOwn(style, "text")));
}
function convertFromEC4CompatibleStyle(hostStyle, elType, isNormal) {
  var srcStyle = hostStyle;
  var textConfig;
  var textContent;
  var textContentStyle;
  if (elType === "text") {
    textContentStyle = srcStyle;
  } else {
    textContentStyle = {};
    hasOwn(srcStyle, "text") && (textContentStyle.text = srcStyle.text);
    hasOwn(srcStyle, "rich") && (textContentStyle.rich = srcStyle.rich);
    hasOwn(srcStyle, "textFill") && (textContentStyle.fill = srcStyle.textFill);
    hasOwn(srcStyle, "textStroke") && (textContentStyle.stroke = srcStyle.textStroke);
    hasOwn(srcStyle, "fontFamily") && (textContentStyle.fontFamily = srcStyle.fontFamily);
    hasOwn(srcStyle, "fontSize") && (textContentStyle.fontSize = srcStyle.fontSize);
    hasOwn(srcStyle, "fontStyle") && (textContentStyle.fontStyle = srcStyle.fontStyle);
    hasOwn(srcStyle, "fontWeight") && (textContentStyle.fontWeight = srcStyle.fontWeight);
    textContent = {
      type: "text",
      style: textContentStyle,
      // ec4 does not support rectText trigger.
      // And when text position is different in normal and emphasis
      // => hover text trigger emphasis;
      // => text position changed, leave mouse pointer immediately;
      // That might cause incorrect state.
      silent: true
    };
    textConfig = {};
    var hasOwnPos = hasOwn(srcStyle, "textPosition");
    if (isNormal) {
      textConfig.position = hasOwnPos ? srcStyle.textPosition : "inside";
    } else {
      hasOwnPos && (textConfig.position = srcStyle.textPosition);
    }
    hasOwn(srcStyle, "textPosition") && (textConfig.position = srcStyle.textPosition);
    hasOwn(srcStyle, "textOffset") && (textConfig.offset = srcStyle.textOffset);
    hasOwn(srcStyle, "textRotation") && (textConfig.rotation = srcStyle.textRotation);
    hasOwn(srcStyle, "textDistance") && (textConfig.distance = srcStyle.textDistance);
  }
  convertEC4CompatibleRichItem(textContentStyle, hostStyle);
  each(textContentStyle.rich, function(richItem) {
    convertEC4CompatibleRichItem(richItem, richItem);
  });
  return {
    textConfig,
    textContent
  };
}
function convertEC4CompatibleRichItem(out, richItem) {
  if (!richItem) {
    return;
  }
  richItem.font = richItem.textFont || richItem.font;
  hasOwn(richItem, "textStrokeWidth") && (out.lineWidth = richItem.textStrokeWidth);
  hasOwn(richItem, "textAlign") && (out.align = richItem.textAlign);
  hasOwn(richItem, "textVerticalAlign") && (out.verticalAlign = richItem.textVerticalAlign);
  hasOwn(richItem, "textLineHeight") && (out.lineHeight = richItem.textLineHeight);
  hasOwn(richItem, "textWidth") && (out.width = richItem.textWidth);
  hasOwn(richItem, "textHeight") && (out.height = richItem.textHeight);
  hasOwn(richItem, "textBackgroundColor") && (out.backgroundColor = richItem.textBackgroundColor);
  hasOwn(richItem, "textPadding") && (out.padding = richItem.textPadding);
  hasOwn(richItem, "textBorderColor") && (out.borderColor = richItem.textBorderColor);
  hasOwn(richItem, "textBorderWidth") && (out.borderWidth = richItem.textBorderWidth);
  hasOwn(richItem, "textBorderRadius") && (out.borderRadius = richItem.textBorderRadius);
  hasOwn(richItem, "textBoxShadowColor") && (out.shadowColor = richItem.textBoxShadowColor);
  hasOwn(richItem, "textBoxShadowBlur") && (out.shadowBlur = richItem.textBoxShadowBlur);
  hasOwn(richItem, "textBoxShadowOffsetX") && (out.shadowOffsetX = richItem.textBoxShadowOffsetX);
  hasOwn(richItem, "textBoxShadowOffsetY") && (out.shadowOffsetY = richItem.textBoxShadowOffsetY);
}
function convertToEC4StyleForCustomSerise(itemStl, txStl, txCfg) {
  var out = itemStl;
  out.textPosition = out.textPosition || txCfg.position || "inside";
  txCfg.offset != null && (out.textOffset = txCfg.offset);
  txCfg.rotation != null && (out.textRotation = txCfg.rotation);
  txCfg.distance != null && (out.textDistance = txCfg.distance);
  var isInside = out.textPosition.indexOf("inside") >= 0;
  var hostFill = itemStl.fill || "#000";
  convertToEC4RichItem(out, txStl);
  var textFillNotSet = out.textFill == null;
  if (isInside) {
    if (textFillNotSet) {
      out.textFill = txCfg.insideFill || "#fff";
      !out.textStroke && txCfg.insideStroke && (out.textStroke = txCfg.insideStroke);
      !out.textStroke && (out.textStroke = hostFill);
      out.textStrokeWidth == null && (out.textStrokeWidth = 2);
    }
  } else {
    if (textFillNotSet) {
      out.textFill = itemStl.fill || txCfg.outsideFill || "#000";
    }
    !out.textStroke && txCfg.outsideStroke && (out.textStroke = txCfg.outsideStroke);
  }
  out.text = txStl.text;
  out.rich = txStl.rich;
  each(txStl.rich, function(richItem) {
    convertToEC4RichItem(richItem, richItem);
  });
  return out;
}
function convertToEC4RichItem(out, richItem) {
  if (!richItem) {
    return;
  }
  hasOwn(richItem, "fill") && (out.textFill = richItem.fill);
  hasOwn(richItem, "stroke") && (out.textStroke = richItem.fill);
  hasOwn(richItem, "lineWidth") && (out.textStrokeWidth = richItem.lineWidth);
  hasOwn(richItem, "font") && (out.font = richItem.font);
  hasOwn(richItem, "fontStyle") && (out.fontStyle = richItem.fontStyle);
  hasOwn(richItem, "fontWeight") && (out.fontWeight = richItem.fontWeight);
  hasOwn(richItem, "fontSize") && (out.fontSize = richItem.fontSize);
  hasOwn(richItem, "fontFamily") && (out.fontFamily = richItem.fontFamily);
  hasOwn(richItem, "align") && (out.textAlign = richItem.align);
  hasOwn(richItem, "verticalAlign") && (out.textVerticalAlign = richItem.verticalAlign);
  hasOwn(richItem, "lineHeight") && (out.textLineHeight = richItem.lineHeight);
  hasOwn(richItem, "width") && (out.textWidth = richItem.width);
  hasOwn(richItem, "height") && (out.textHeight = richItem.height);
  hasOwn(richItem, "backgroundColor") && (out.textBackgroundColor = richItem.backgroundColor);
  hasOwn(richItem, "padding") && (out.textPadding = richItem.padding);
  hasOwn(richItem, "borderColor") && (out.textBorderColor = richItem.borderColor);
  hasOwn(richItem, "borderWidth") && (out.textBorderWidth = richItem.borderWidth);
  hasOwn(richItem, "borderRadius") && (out.textBorderRadius = richItem.borderRadius);
  hasOwn(richItem, "shadowColor") && (out.textBoxShadowColor = richItem.shadowColor);
  hasOwn(richItem, "shadowBlur") && (out.textBoxShadowBlur = richItem.shadowBlur);
  hasOwn(richItem, "shadowOffsetX") && (out.textBoxShadowOffsetX = richItem.shadowOffsetX);
  hasOwn(richItem, "shadowOffsetY") && (out.textBoxShadowOffsetY = richItem.shadowOffsetY);
  hasOwn(richItem, "textShadowColor") && (out.textShadowColor = richItem.textShadowColor);
  hasOwn(richItem, "textShadowBlur") && (out.textShadowBlur = richItem.textShadowBlur);
  hasOwn(richItem, "textShadowOffsetX") && (out.textShadowOffsetX = richItem.textShadowOffsetX);
  hasOwn(richItem, "textShadowOffsetY") && (out.textShadowOffsetY = richItem.textShadowOffsetY);
}
function warnDeprecated(deprecated, insteadApproach) {
  if (true) {
    var key = deprecated + "^_^" + insteadApproach;
    if (!deprecatedLogs[key]) {
      console.warn('[ECharts] DEPRECATED: "' + deprecated + '" has been deprecated. ' + insteadApproach);
      deprecatedLogs[key] = true;
    }
  }
}

// node_modules/echarts/lib/animation/customGraphicTransition.js
var LEGACY_TRANSFORM_PROPS_MAP = {
  position: ["x", "y"],
  scale: ["scaleX", "scaleY"],
  origin: ["originX", "originY"]
};
var LEGACY_TRANSFORM_PROPS = keys(LEGACY_TRANSFORM_PROPS_MAP);
var TRANSFORM_PROPS_MAP = reduce(TRANSFORMABLE_PROPS, function(obj, key) {
  obj[key] = 1;
  return obj;
}, {});
var transformPropNamesStr = TRANSFORMABLE_PROPS.join(", ");
var ELEMENT_ANIMATABLE_PROPS = ["", "style", "shape", "extra"];
var transitionInnerStore = makeInner();
function getElementAnimationConfig(animationType, el, elOption, parentModel, dataIndex) {
  var animationProp = animationType + "Animation";
  var config = getAnimationConfig(animationType, parentModel, dataIndex) || {};
  var userDuring = transitionInnerStore(el).userDuring;
  if (config.duration > 0) {
    config.during = userDuring ? bind(duringCall, {
      el,
      userDuring
    }) : null;
    config.setToFinal = true;
    config.scope = animationType;
  }
  extend(config, elOption[animationProp]);
  return config;
}
function applyUpdateTransition(el, elOption, animatableModel, opts) {
  opts = opts || {};
  var dataIndex = opts.dataIndex, isInit = opts.isInit, clearStyle = opts.clearStyle;
  var hasAnimation = animatableModel.isAnimationEnabled();
  var store = transitionInnerStore(el);
  var styleOpt = elOption.style;
  store.userDuring = elOption.during;
  var transFromProps = {};
  var propsToSet = {};
  prepareTransformAllPropsFinal(el, elOption, propsToSet);
  prepareShapeOrExtraAllPropsFinal("shape", elOption, propsToSet);
  prepareShapeOrExtraAllPropsFinal("extra", elOption, propsToSet);
  if (!isInit && hasAnimation) {
    prepareTransformTransitionFrom(el, elOption, transFromProps);
    prepareShapeOrExtraTransitionFrom("shape", el, elOption, transFromProps);
    prepareShapeOrExtraTransitionFrom("extra", el, elOption, transFromProps);
    prepareStyleTransitionFrom(el, elOption, styleOpt, transFromProps);
  }
  propsToSet.style = styleOpt;
  applyPropsDirectly(el, propsToSet, clearStyle);
  applyMiscProps(el, elOption);
  if (hasAnimation) {
    if (isInit) {
      var enterFromProps_1 = {};
      each(ELEMENT_ANIMATABLE_PROPS, function(propName) {
        var prop = propName ? elOption[propName] : elOption;
        if (prop && prop.enterFrom) {
          if (propName) {
            enterFromProps_1[propName] = enterFromProps_1[propName] || {};
          }
          extend(propName ? enterFromProps_1[propName] : enterFromProps_1, prop.enterFrom);
        }
      });
      var config = getElementAnimationConfig("enter", el, elOption, animatableModel, dataIndex);
      if (config.duration > 0) {
        el.animateFrom(enterFromProps_1, config);
      }
    } else {
      applyPropsTransition(el, elOption, dataIndex || 0, animatableModel, transFromProps);
    }
  }
  updateLeaveTo(el, elOption);
  styleOpt ? el.dirty() : el.markRedraw();
}
function updateLeaveTo(el, elOption) {
  var leaveToProps = transitionInnerStore(el).leaveToProps;
  for (var i = 0; i < ELEMENT_ANIMATABLE_PROPS.length; i++) {
    var propName = ELEMENT_ANIMATABLE_PROPS[i];
    var prop = propName ? elOption[propName] : elOption;
    if (prop && prop.leaveTo) {
      if (!leaveToProps) {
        leaveToProps = transitionInnerStore(el).leaveToProps = {};
      }
      if (propName) {
        leaveToProps[propName] = leaveToProps[propName] || {};
      }
      extend(propName ? leaveToProps[propName] : leaveToProps, prop.leaveTo);
    }
  }
}
function applyLeaveTransition(el, elOption, animatableModel, onRemove) {
  if (el) {
    var parent_1 = el.parent;
    var leaveToProps = transitionInnerStore(el).leaveToProps;
    if (leaveToProps) {
      var config = getElementAnimationConfig("update", el, elOption, animatableModel, 0);
      config.done = function() {
        parent_1.remove(el);
        onRemove && onRemove();
      };
      el.animateTo(leaveToProps, config);
    } else {
      parent_1.remove(el);
      onRemove && onRemove();
    }
  }
}
function isTransitionAll(transition) {
  return transition === "all";
}
function applyPropsDirectly(el, allPropsFinal, clearStyle) {
  var styleOpt = allPropsFinal.style;
  if (!el.isGroup && styleOpt) {
    if (clearStyle) {
      el.useStyle({});
      var animators = el.animators;
      for (var i = 0; i < animators.length; i++) {
        var animator = animators[i];
        if (animator.targetName === "style") {
          animator.changeTarget(el.style);
        }
      }
    }
    el.setStyle(styleOpt);
  }
  if (allPropsFinal) {
    allPropsFinal.style = null;
    allPropsFinal && el.attr(allPropsFinal);
    allPropsFinal.style = styleOpt;
  }
}
function applyPropsTransition(el, elOption, dataIndex, model, transFromProps) {
  if (transFromProps) {
    var config = getElementAnimationConfig("update", el, elOption, model, dataIndex);
    if (config.duration > 0) {
      el.animateFrom(transFromProps, config);
    }
  }
}
function applyMiscProps(el, elOption) {
  hasOwn(elOption, "silent") && (el.silent = elOption.silent);
  hasOwn(elOption, "ignore") && (el.ignore = elOption.ignore);
  if (el instanceof Displayable_default) {
    hasOwn(elOption, "invisible") && (el.invisible = elOption.invisible);
  }
  if (el instanceof Path_default) {
    hasOwn(elOption, "autoBatch") && (el.autoBatch = elOption.autoBatch);
  }
}
var tmpDuringScope = {};
var transitionDuringAPI = {
  // Usually other props do not need to be changed in animation during.
  setTransform: function(key, val) {
    if (true) {
      assert(hasOwn(TRANSFORM_PROPS_MAP, key), "Only " + transformPropNamesStr + " available in `setTransform`.");
    }
    tmpDuringScope.el[key] = val;
    return this;
  },
  getTransform: function(key) {
    if (true) {
      assert(hasOwn(TRANSFORM_PROPS_MAP, key), "Only " + transformPropNamesStr + " available in `getTransform`.");
    }
    return tmpDuringScope.el[key];
  },
  setShape: function(key, val) {
    if (true) {
      assertNotReserved(key);
    }
    var el = tmpDuringScope.el;
    var shape = el.shape || (el.shape = {});
    shape[key] = val;
    el.dirtyShape && el.dirtyShape();
    return this;
  },
  getShape: function(key) {
    if (true) {
      assertNotReserved(key);
    }
    var shape = tmpDuringScope.el.shape;
    if (shape) {
      return shape[key];
    }
  },
  setStyle: function(key, val) {
    if (true) {
      assertNotReserved(key);
    }
    var el = tmpDuringScope.el;
    var style = el.style;
    if (style) {
      if (true) {
        if (eqNaN(val)) {
          warn("style." + key + " must not be assigned with NaN.");
        }
      }
      style[key] = val;
      el.dirtyStyle && el.dirtyStyle();
    }
    return this;
  },
  getStyle: function(key) {
    if (true) {
      assertNotReserved(key);
    }
    var style = tmpDuringScope.el.style;
    if (style) {
      return style[key];
    }
  },
  setExtra: function(key, val) {
    if (true) {
      assertNotReserved(key);
    }
    var extra = tmpDuringScope.el.extra || (tmpDuringScope.el.extra = {});
    extra[key] = val;
    return this;
  },
  getExtra: function(key) {
    if (true) {
      assertNotReserved(key);
    }
    var extra = tmpDuringScope.el.extra;
    if (extra) {
      return extra[key];
    }
  }
};
function assertNotReserved(key) {
  if (true) {
    if (key === "transition" || key === "enterFrom" || key === "leaveTo") {
      throw new Error('key must not be "' + key + '"');
    }
  }
}
function duringCall() {
  var scope = this;
  var el = scope.el;
  if (!el) {
    return;
  }
  var latestUserDuring = transitionInnerStore(el).userDuring;
  var scopeUserDuring = scope.userDuring;
  if (latestUserDuring !== scopeUserDuring) {
    scope.el = scope.userDuring = null;
    return;
  }
  tmpDuringScope.el = el;
  scopeUserDuring(transitionDuringAPI);
}
function prepareShapeOrExtraTransitionFrom(mainAttr, fromEl, elOption, transFromProps) {
  var attrOpt = elOption[mainAttr];
  if (!attrOpt) {
    return;
  }
  var elPropsInAttr = fromEl[mainAttr];
  var transFromPropsInAttr;
  if (elPropsInAttr) {
    var transition = elOption.transition;
    var attrTransition = attrOpt.transition;
    if (attrTransition) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      if (isTransitionAll(attrTransition)) {
        extend(transFromPropsInAttr, elPropsInAttr);
      } else {
        var transitionKeys = normalizeToArray(attrTransition);
        for (var i = 0; i < transitionKeys.length; i++) {
          var key = transitionKeys[i];
          var elVal = elPropsInAttr[key];
          transFromPropsInAttr[key] = elVal;
        }
      }
    } else if (isTransitionAll(transition) || indexOf(transition, mainAttr) >= 0) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      var elPropsInAttrKeys = keys(elPropsInAttr);
      for (var i = 0; i < elPropsInAttrKeys.length; i++) {
        var key = elPropsInAttrKeys[i];
        var elVal = elPropsInAttr[key];
        if (isNonStyleTransitionEnabled(attrOpt[key], elVal)) {
          transFromPropsInAttr[key] = elVal;
        }
      }
    }
  }
}
function prepareShapeOrExtraAllPropsFinal(mainAttr, elOption, allProps) {
  var attrOpt = elOption[mainAttr];
  if (!attrOpt) {
    return;
  }
  var allPropsInAttr = allProps[mainAttr] = {};
  var keysInAttr = keys(attrOpt);
  for (var i = 0; i < keysInAttr.length; i++) {
    var key = keysInAttr[i];
    allPropsInAttr[key] = cloneValue(attrOpt[key]);
  }
}
function prepareTransformTransitionFrom(el, elOption, transFromProps) {
  var transition = elOption.transition;
  var transitionKeys = isTransitionAll(transition) ? TRANSFORMABLE_PROPS : normalizeToArray(transition || []);
  for (var i = 0; i < transitionKeys.length; i++) {
    var key = transitionKeys[i];
    if (key === "style" || key === "shape" || key === "extra") {
      continue;
    }
    var elVal = el[key];
    if (true) {
      checkTransformPropRefer(key, "el.transition");
    }
    transFromProps[key] = elVal;
  }
}
function prepareTransformAllPropsFinal(el, elOption, allProps) {
  for (var i = 0; i < LEGACY_TRANSFORM_PROPS.length; i++) {
    var legacyName = LEGACY_TRANSFORM_PROPS[i];
    var xyName = LEGACY_TRANSFORM_PROPS_MAP[legacyName];
    var legacyArr = elOption[legacyName];
    if (legacyArr) {
      allProps[xyName[0]] = legacyArr[0];
      allProps[xyName[1]] = legacyArr[1];
    }
  }
  for (var i = 0; i < TRANSFORMABLE_PROPS.length; i++) {
    var key = TRANSFORMABLE_PROPS[i];
    if (elOption[key] != null) {
      allProps[key] = elOption[key];
    }
  }
}
function prepareStyleTransitionFrom(fromEl, elOption, styleOpt, transFromProps) {
  if (!styleOpt) {
    return;
  }
  var fromElStyle = fromEl.style;
  var transFromStyleProps;
  if (fromElStyle) {
    var styleTransition = styleOpt.transition;
    var elTransition = elOption.transition;
    if (styleTransition && !isTransitionAll(styleTransition)) {
      var transitionKeys = normalizeToArray(styleTransition);
      !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});
      for (var i = 0; i < transitionKeys.length; i++) {
        var key = transitionKeys[i];
        var elVal = fromElStyle[key];
        transFromStyleProps[key] = elVal;
      }
    } else if (fromEl.getAnimationStyleProps && (isTransitionAll(elTransition) || isTransitionAll(styleTransition) || indexOf(elTransition, "style") >= 0)) {
      var animationProps = fromEl.getAnimationStyleProps();
      var animationStyleProps = animationProps ? animationProps.style : null;
      if (animationStyleProps) {
        !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});
        var styleKeys = keys(styleOpt);
        for (var i = 0; i < styleKeys.length; i++) {
          var key = styleKeys[i];
          if (animationStyleProps[key]) {
            var elVal = fromElStyle[key];
            transFromStyleProps[key] = elVal;
          }
        }
      }
    }
  }
}
function isNonStyleTransitionEnabled(optVal, elVal) {
  return !isArrayLike(optVal) ? optVal != null && isFinite(optVal) : optVal !== elVal;
}
var checkTransformPropRefer;
if (true) {
  checkTransformPropRefer = function(key, usedIn) {
    if (!hasOwn(TRANSFORM_PROPS_MAP, key)) {
      warn("Prop `" + key + "` is not a permitted in `" + usedIn + "`. Only `" + keys(TRANSFORM_PROPS_MAP).join("`, `") + "` are permitted.");
    }
  };
}

// node_modules/echarts/lib/animation/customGraphicKeyframeAnimation.js
var getStateToRestore = makeInner();
var KEYFRAME_EXCLUDE_KEYS = ["percent", "easing", "shape", "style", "extra"];
function stopPreviousKeyframeAnimationAndRestore(el) {
  el.stopAnimation("keyframe");
  el.attr(getStateToRestore(el));
}
function applyKeyframeAnimation(el, animationOpts, animatableModel) {
  if (!animatableModel.isAnimationEnabled() || !animationOpts) {
    return;
  }
  if (isArray(animationOpts)) {
    each(animationOpts, function(singleAnimationOpts) {
      applyKeyframeAnimation(el, singleAnimationOpts, animatableModel);
    });
    return;
  }
  var keyframes = animationOpts.keyframes;
  var duration = animationOpts.duration;
  if (animatableModel && duration == null) {
    var config = getAnimationConfig("enter", animatableModel, 0);
    duration = config && config.duration;
  }
  if (!keyframes || !duration) {
    return;
  }
  var stateToRestore = getStateToRestore(el);
  each(ELEMENT_ANIMATABLE_PROPS, function(targetPropName) {
    if (targetPropName && !el[targetPropName]) {
      return;
    }
    var animator;
    var endFrameIsSet = false;
    keyframes.sort(function(a, b) {
      return a.percent - b.percent;
    });
    each(keyframes, function(kf) {
      var animators = el.animators;
      var kfValues = targetPropName ? kf[targetPropName] : kf;
      if (true) {
        if (kf.percent >= 1) {
          endFrameIsSet = true;
        }
      }
      if (!kfValues) {
        return;
      }
      var propKeys = keys(kfValues);
      if (!targetPropName) {
        propKeys = filter(propKeys, function(key) {
          return indexOf(KEYFRAME_EXCLUDE_KEYS, key) < 0;
        });
      }
      if (!propKeys.length) {
        return;
      }
      if (!animator) {
        animator = el.animate(targetPropName, animationOpts.loop, true);
        animator.scope = "keyframe";
      }
      for (var i = 0; i < animators.length; i++) {
        if (animators[i] !== animator && animators[i].targetName === animator.targetName) {
          animators[i].stopTracks(propKeys);
        }
      }
      targetPropName && (stateToRestore[targetPropName] = stateToRestore[targetPropName] || {});
      var savedTarget = targetPropName ? stateToRestore[targetPropName] : stateToRestore;
      each(propKeys, function(key) {
        savedTarget[key] = ((targetPropName ? el[targetPropName] : el) || {})[key];
      });
      animator.whenWithKeys(duration * kf.percent, kfValues, propKeys, kf.easing);
    });
    if (!animator) {
      return;
    }
    if (true) {
      if (!endFrameIsSet) {
        warn("End frame with percent: 1 is missing in the keyframeAnimation.", true);
      }
    }
    animator.delay(animationOpts.delay || 0).duration(duration).start(animationOpts.easing);
  });
}

export {
  getDefaultLabel,
  getDefaultInterpolatedLabel,
  Symbol_default,
  SymbolDraw_default,
  isCoordinateSystemType,
  axisModelCreator,
  layout,
  AxisBuilder_default,
  collect,
  getAxisInfo,
  makeKey,
  AxisView_default,
  rectCoordAxisBuildSplitArea,
  rectCoordAxisHandleRemove,
  install,
  install2,
  RoamController_default,
  updateViewOnPan,
  updateViewOnZoom,
  onIrrelevantElement,
  geoSourceManager_default,
  MapDraw_default,
  View_default,
  updateCenterAndZoom,
  install3,
  VisualMapping_default,
  Line_default2 as Line_default,
  LineDraw_default,
  sliderMove,
  BrushController_default,
  makeRectPanelClipPath,
  makeLinearBrushOtherExtent,
  makeRectIsTargetByCursor,
  install4,
  isEC4CompatibleStyle,
  convertFromEC4CompatibleStyle,
  convertToEC4StyleForCustomSerise,
  warnDeprecated,
  applyUpdateTransition,
  updateLeaveTo,
  applyLeaveTransition,
  isTransitionAll,
  stopPreviousKeyframeAnimationAndRestore,
  applyKeyframeAnimation
};
//# sourceMappingURL=chunk-ZNXD35GQ.js.map
