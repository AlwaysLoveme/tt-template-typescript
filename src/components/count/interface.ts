import { PropertyOption, FullProperty, MethodOption } from "tt-api-typings/types/app/component";

export interface Data {}
export interface Properties extends PropertyOption {
  counter: FullProperty<FunctionConstructor>;
}
export interface Methods extends MethodOption {
  show: (type: string) => void;
}
