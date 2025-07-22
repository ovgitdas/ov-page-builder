export interface Field {
  name: string;
  type: "text" | "image";
  value: string;
}

export type ChildrenTypes = Div[] | Field;

export interface Div {
  width: number;
  height: number;
  style: string;
  children: ChildrenTypes;
}

export interface ItemLayout {
  link: string;
  divs: Div[];
}
