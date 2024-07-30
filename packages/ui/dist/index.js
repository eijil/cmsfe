"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Loading: () => Loading
});
module.exports = __toCommonJS(src_exports);

// src/utils/index.ts
var import_tailwind_merge = require("tailwind-merge");
var import_classnames = __toESM(require("classnames"));
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_classnames.default)(inputs));
}

// src/Button/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({
  children,
  className,
  onClick,
  type,
  size,
  disabled
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      className: cn("btn", `cms-btn-${type}`, `cms-btn-${size}`, className),
      disabled,
      onClick,
      children
    }
  );
};

// src/Toast/index.tsx
var Toast_exports = {};
__reExport(Toast_exports, require("react-hot-toast"));

// src/index.tsx
__reExport(src_exports, Toast_exports, module.exports);

// src/Loading/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Loading = (props) => {
  const { className, color = "#000", fixed, size, style } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: cn("flex", fixed && "cmsfe-loading-fixed"),
      style: {
        zIndex: (fixed == null ? void 0 : fixed.zIndex) || 100
      },
      children: [
        fixed && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: cn("cmsfe-loading-mask"),
            style: {
              opacity: (fixed == null ? void 0 : fixed.opacity) || 0.5
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: cn("loading loading-spinner", `loading-${size}`, className),
            style
          }
        )
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Loading
});
