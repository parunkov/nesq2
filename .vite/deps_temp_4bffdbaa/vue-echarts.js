import "./chunk-PDSYB3W3.js";
import "./chunk-LVBDWL3K.js";
import {
  init,
  throttle
} from "./chunk-GZAGD2NU.js";
import "./chunk-6GXF4SXL.js";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  isRef,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  toRefs,
  unref,
  watch,
  watchEffect
} from "./chunk-GY7FY3NU.js";
import "./chunk-PZ5AY32C.js";

// node_modules/vue-demi/lib/index.mjs
var Vue2 = void 0;

// node_modules/vue-echarts/dist/index.js
var METHOD_NAMES = [
  "getWidth",
  "getHeight",
  "getDom",
  "getOption",
  "resize",
  "dispatchAction",
  "convertToPixel",
  "convertFromPixel",
  "containPixel",
  "getDataURL",
  "getConnectedDataURL",
  "appendData",
  "clear",
  "isDisposed",
  "dispose"
];
function usePublicAPI(chart) {
  function makePublicMethod(name) {
    return (...args) => {
      if (!chart.value) {
        throw new Error("ECharts is not initialized yet.");
      }
      return chart.value[name].apply(chart.value, args);
    };
  }
  function makePublicMethods() {
    const methods = /* @__PURE__ */ Object.create(null);
    METHOD_NAMES.forEach((name) => {
      methods[name] = makePublicMethod(name);
    });
    return methods;
  }
  return makePublicMethods();
}
function useAutoresize(chart, autoresize, root) {
  watch(
    [root, chart, autoresize],
    ([root2, chart2, autoresize2], _, onCleanup) => {
      let ro = null;
      if (root2 && chart2 && autoresize2) {
        const { offsetWidth, offsetHeight } = root2;
        const autoresizeOptions = autoresize2 === true ? {} : autoresize2;
        const { throttle: wait = 100, onResize } = autoresizeOptions;
        let initialResizeTriggered = false;
        const callback = () => {
          chart2.resize();
          onResize == null ? void 0 : onResize();
        };
        const resizeCallback = wait ? throttle(callback, wait) : callback;
        ro = new ResizeObserver(() => {
          if (!initialResizeTriggered) {
            initialResizeTriggered = true;
            if (root2.offsetWidth === offsetWidth && root2.offsetHeight === offsetHeight) {
              return;
            }
          }
          resizeCallback();
        });
        ro.observe(root2);
      }
      onCleanup(() => {
        if (ro) {
          ro.disconnect();
          ro = null;
        }
      });
    }
  );
}
var autoresizeProps = {
  autoresize: [Boolean, Object]
};
var onRE = /^on[^a-z]/;
var isOn = (key) => onRE.test(key);
function omitOn(attrs) {
  const result = {};
  for (const key in attrs) {
    if (!isOn(key)) {
      result[key] = attrs[key];
    }
  }
  return result;
}
function unwrapInjected(injection, defaultValue) {
  const value = isRef(injection) ? unref(injection) : injection;
  if (value && typeof value === "object" && "value" in value) {
    return value.value || defaultValue;
  }
  return value || defaultValue;
}
var LOADING_OPTIONS_KEY = "ecLoadingOptions";
function useLoading(chart, loading, loadingOptions) {
  const defaultLoadingOptions = inject(LOADING_OPTIONS_KEY, {});
  const realLoadingOptions = computed(() => ({
    ...unwrapInjected(defaultLoadingOptions, {}),
    ...loadingOptions == null ? void 0 : loadingOptions.value
  }));
  watchEffect(() => {
    const instance = chart.value;
    if (!instance) {
      return;
    }
    if (loading.value) {
      instance.showLoading(realLoadingOptions.value);
    } else {
      instance.hideLoading();
    }
  });
}
var loadingProps = {
  loading: Boolean,
  loadingOptions: Object
};
var registered = null;
var TAG_NAME = "x-vue-echarts";
function register() {
  if (registered != null) {
    return registered;
  }
  if (typeof HTMLElement === "undefined" || typeof customElements === "undefined") {
    return registered = false;
  }
  try {
    const reg = new Function(
      "tag",
      // Use esbuild repl to keep build process simple
      // https://esbuild.github.io/try/#dAAwLjIzLjAALS1taW5pZnkAY2xhc3MgRUNoYXJ0c0VsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7CiAgX19kaXNwb3NlID0gbnVsbDsKCiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7CiAgICBpZiAodGhpcy5fX2Rpc3Bvc2UpIHsKICAgICAgdGhpcy5fX2Rpc3Bvc2UoKTsKICAgICAgdGhpcy5fX2Rpc3Bvc2UgPSBudWxsOwogICAgfQogIH0KfQoKaWYgKGN1c3RvbUVsZW1lbnRzLmdldCh0YWcpID09IG51bGwpIHsKICBjdXN0b21FbGVtZW50cy5kZWZpbmUodGFnLCBFQ2hhcnRzRWxlbWVudCk7Cn0K
      "class EChartsElement extends HTMLElement{__dispose=null;disconnectedCallback(){this.__dispose&&(this.__dispose(),this.__dispose=null)}}customElements.get(tag)==null&&customElements.define(tag,EChartsElement);"
    );
    reg(TAG_NAME);
  } catch (e) {
    return registered = false;
  }
  return registered = true;
}
document.head.appendChild(document.createElement("style")).textContent = "x-vue-echarts{display:block;width:100%;height:100%;min-width:0}\n";
var wcRegistered = register();
if (Vue2) {
  Vue2.config.ignoredElements.push(TAG_NAME);
}
var THEME_KEY = "ecTheme";
var INIT_OPTIONS_KEY = "ecInitOptions";
var UPDATE_OPTIONS_KEY = "ecUpdateOptions";
var NATIVE_EVENT_RE = /(^&?~?!?)native:/;
var ECharts = defineComponent({
  name: "echarts",
  props: {
    option: Object,
    theme: {
      type: [Object, String]
    },
    initOptions: Object,
    updateOptions: Object,
    group: String,
    manualUpdate: Boolean,
    ...autoresizeProps,
    ...loadingProps
  },
  emits: {},
  inheritAttrs: false,
  setup(props, { attrs }) {
    const root = shallowRef();
    const chart = shallowRef();
    const manualOption = shallowRef();
    const defaultTheme = inject(THEME_KEY, null);
    const defaultInitOptions = inject(INIT_OPTIONS_KEY, null);
    const defaultUpdateOptions = inject(UPDATE_OPTIONS_KEY, null);
    const { autoresize, manualUpdate, loading, loadingOptions } = toRefs(props);
    const realOption = computed(
      () => manualOption.value || props.option || null
    );
    const realTheme = computed(
      () => props.theme || unwrapInjected(defaultTheme, {})
    );
    const realInitOptions = computed(
      () => props.initOptions || unwrapInjected(defaultInitOptions, {})
    );
    const realUpdateOptions = computed(
      () => props.updateOptions || unwrapInjected(defaultUpdateOptions, {})
    );
    const nonEventAttrs = computed(() => omitOn(attrs));
    const nativeListeners = {};
    const listeners = getCurrentInstance().proxy.$listeners;
    const realListeners = {};
    if (!listeners) {
      Object.keys(attrs).filter((key) => isOn(key)).forEach((key) => {
        let event = key.charAt(2).toLowerCase() + key.slice(3);
        if (event.indexOf("native:") === 0) {
          const nativeKey = `on${event.charAt(7).toUpperCase()}${event.slice(
            8
          )}`;
          nativeListeners[nativeKey] = attrs[key];
          return;
        }
        if (event.substring(event.length - 4) === "Once") {
          event = `~${event.substring(0, event.length - 4)}`;
        }
        realListeners[event] = attrs[key];
      });
    } else {
      Object.keys(listeners).forEach((key) => {
        if (NATIVE_EVENT_RE.test(key)) {
          nativeListeners[key.replace(NATIVE_EVENT_RE, "$1")] = listeners[key];
        } else {
          realListeners[key] = listeners[key];
        }
      });
    }
    function init$1(option) {
      if (!root.value) {
        return;
      }
      const instance = chart.value = init(
        root.value,
        realTheme.value,
        realInitOptions.value
      );
      if (props.group) {
        instance.group = props.group;
      }
      Object.keys(realListeners).forEach((key) => {
        let handler = realListeners[key];
        if (!handler) {
          return;
        }
        let event = key.toLowerCase();
        if (event.charAt(0) === "~") {
          event = event.substring(1);
          handler.__once__ = true;
        }
        let target = instance;
        if (event.indexOf("zr:") === 0) {
          target = instance.getZr();
          event = event.substring(3);
        }
        if (handler.__once__) {
          delete handler.__once__;
          const raw = handler;
          handler = (...args) => {
            raw(...args);
            target.off(event, handler);
          };
        }
        target.on(event, handler);
      });
      function resize() {
        if (instance && !instance.isDisposed()) {
          instance.resize();
        }
      }
      function commit() {
        const opt = option || realOption.value;
        if (opt) {
          instance.setOption(opt, realUpdateOptions.value);
        }
      }
      if (autoresize.value) {
        nextTick(() => {
          resize();
          commit();
        });
      } else {
        commit();
      }
    }
    function setOption(option, updateOptions) {
      if (props.manualUpdate) {
        manualOption.value = option;
      }
      if (!chart.value) {
        init$1(option);
      } else {
        chart.value.setOption(option, updateOptions || {});
      }
    }
    function cleanup() {
      if (chart.value) {
        chart.value.dispose();
        chart.value = void 0;
      }
    }
    let unwatchOption = null;
    watch(
      manualUpdate,
      (manualUpdate2) => {
        if (typeof unwatchOption === "function") {
          unwatchOption();
          unwatchOption = null;
        }
        if (!manualUpdate2) {
          unwatchOption = watch(
            () => props.option,
            (option, oldOption) => {
              if (!option) {
                return;
              }
              if (!chart.value) {
                init$1();
              } else {
                chart.value.setOption(option, {
                  // mutating `option` will lead to `notMerge: false` and
                  // replacing it with new reference will lead to `notMerge: true`
                  notMerge: option !== oldOption,
                  ...realUpdateOptions.value
                });
              }
            },
            { deep: true }
          );
        }
      },
      {
        immediate: true
      }
    );
    watch(
      [realTheme, realInitOptions],
      () => {
        cleanup();
        init$1();
      },
      {
        deep: true
      }
    );
    watchEffect(() => {
      if (props.group && chart.value) {
        chart.value.group = props.group;
      }
    });
    const publicApi = usePublicAPI(chart);
    useLoading(chart, loading, loadingOptions);
    useAutoresize(chart, autoresize, root);
    onMounted(() => {
      init$1();
    });
    onBeforeUnmount(() => {
      if (wcRegistered && root.value) {
        root.value.__dispose = cleanup;
      } else {
        cleanup();
      }
    });
    return {
      chart,
      root,
      setOption,
      nonEventAttrs,
      nativeListeners,
      ...publicApi
    };
  },
  render() {
    const attrs = Vue2 ? { attrs: this.nonEventAttrs, on: this.nativeListeners } : { ...this.nonEventAttrs, ...this.nativeListeners };
    attrs.ref = "root";
    attrs.class = attrs.class ? ["echarts"].concat(attrs.class) : "echarts";
    return h(TAG_NAME, attrs);
  }
});
export {
  INIT_OPTIONS_KEY,
  LOADING_OPTIONS_KEY,
  THEME_KEY,
  UPDATE_OPTIONS_KEY,
  ECharts as default
};
//# sourceMappingURL=vue-echarts.js.map
