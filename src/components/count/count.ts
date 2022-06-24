import type { Data, Properties, Methods } from "./interface";

Component<Data, Properties, Methods>({
  properties: {
    counter: {
      type: Function,
      value: () => {},
    },
  },
  methods: {
    show() {},
  },
});
