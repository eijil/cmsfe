"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Loading: () => Loading
});

// src/utils/index.ts
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
function cn(...inputs) {
  return twMerge(classNames(inputs));
}

// src/Button/index.tsx
import { jsx } from "react/jsx-runtime";
var Button = ({
  children,
  className,
  onClick,
  type,
  size,
  disabled
}) => {
  return /* @__PURE__ */ jsx(
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
__reExport(Toast_exports, react_hot_toast_star);
import * as react_hot_toast_star from "react-hot-toast";

// src/index.tsx
__reExport(src_exports, Toast_exports);

// src/Loading/index.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Loading = (props) => {
  const { className, color = "#000", fixed, size, style } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("flex", fixed && "cmsfe-loading-fixed"),
      style: {
        zIndex: (fixed == null ? void 0 : fixed.zIndex) || 100
      },
      children: [
        fixed && /* @__PURE__ */ jsx2(
          "div",
          {
            className: cn("cmsfe-loading-mask"),
            style: {
              opacity: (fixed == null ? void 0 : fixed.opacity) || 0.5
            }
          }
        ),
        /* @__PURE__ */ jsx2(
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
export {
  Button,
  Loading
};
