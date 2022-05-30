import postcssJitProps from "postcss-jit-props";

export default {
  plugins: [
    postcssJitProps({
      files: ["node_modules/open-props/open-props.min.css"],
    }),
  ],
};
