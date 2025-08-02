export const flex = {
  flexDirection: ["row", "row-reverse", "column", "column-reverse"],
  flexWrap: ["wrap", "nowrap", "wrap-reverse"],
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ],
  alignItems: ["flex-start", "flex-end", "center", "stretch"],
  alignContent: ["flex-start", "flex-end", "center", "space-between"],
} as const;

export interface FlexStyle {
  flexDirection?: (typeof flex.flexDirection)[number];
  flexWrap?: (typeof flex.flexWrap)[number];
  justifyContent?: (typeof flex.justifyContent)[number];
  alignItems?: (typeof flex.alignItems)[number];
  alignContent?: (typeof flex.alignContent)[number];
  gap?: string;
  flexGrow?: string;
  flexShrink?: string;
}

export const flexStyle = (flex: FlexStyle) => `
    flex-direction: ${flex.flexDirection};
    ${flex.flexWrap ? `flex-wrap: ${flex.flexWrap};` : ""}
    ${flex.justifyContent ? `justify-content: ${flex.justifyContent};` : ""}
    ${flex.alignItems ? `align-items: ${flex.alignItems};` : ""}
    ${flex.alignContent ? `align-content: ${flex.alignContent};` : ""}
    ${flex.gap ? `gap: ${flex.gap};` : ""}
    ${flex.flexGrow ? `flex-grow: ${flex.flexGrow};` : ""}
    ${flex.flexShrink ? `flex-shrink: ${flex.flexShrink};` : ""}
  `;

export const grid = {
  justifyItems: ["start", "end", "center", "stretch"],
  alignItems: ["start", "end", "center", "stretch"],
  justifyContent: [
    "start",
    "end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ],
  alignContent: [
    "start",
    "end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ],
} as const;

export interface GridStyle {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridGap?: string;
  rowGap?: string;
  columnGap?: string;
  justifyItems?: (typeof grid.justifyItems)[number];
  alignItems?: (typeof grid.alignItems)[number];
  justifyContent?: (typeof grid.justifyContent)[number];
  alignContent?: (typeof grid.alignContent)[number];
}

export const gridStyle = (grid: GridStyle) => `
${
  grid.gridTemplateColumns
    ? `grid-template-columns: ${grid.gridTemplateColumns};`
    : ""
}
    ${
      grid.gridTemplateRows
        ? `grid-template-rows: ${grid.gridTemplateRows};`
        : ""
    }
      ${
        grid.gridTemplateAreas
          ? `grid-template-areas: ${grid.gridTemplateAreas};`
          : ""
      }
    ${grid.gridGap ? `grid-gap: ${grid.gridGap};` : ""}
    ${grid.rowGap ? `row-gap: ${grid.rowGap};` : ""}
    ${grid.columnGap ? `column-gap: ${grid.columnGap};` : ""}
    ${grid.justifyItems ? `justify-items: ${grid.justifyItems};` : ""}
    ${grid.alignItems ? `align-items: ${grid.alignItems};` : ""}
    ${grid.justifyContent ? `justify-content: ${grid.justifyContent};` : ""}
    ${grid.alignContent ? `align-content: ${grid.alignContent};` : ""}
    `;

export const display = [
  "block",
  "inline",
  "inline-block",
  "flex",
  "grid",
  "none",
] as const;

export interface DisplayStyle {
  display?: (typeof display)[number];
  flex?: FlexStyle;
  grid?: GridStyle;
}

export const displayStyle = (display: DisplayStyle) => `
display: ${display.display}; 
${display.flex ? flexStyle(display.flex) : ""}
${display.grid ? gridStyle(display.grid) : ""}
`;

export const flexItem = {
  alignSelf: [
    "auto",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
    "stretch",
  ],
} as const;

export interface FlexItemStyle {
  flexGrow?: string;
  flexShrink?: string;
  flexBasis?: string;
  order?: string;
  alignSelf?: (typeof flexItem.alignSelf)[number];
}

export const flexItemStyle = (flexItem: FlexItemStyle) => `
    ${flexItem.flexGrow ? `flex-grow: ${flexItem.flexGrow};` : ""}
    ${flexItem.flexShrink ? `flex-shrink: ${flexItem.flexShrink};` : ""}
    ${flexItem.flexBasis ? `flex-basis: ${flexItem.flexBasis};` : ""}
    ${flexItem.order ? `order: ${flexItem.order};` : ""}
    ${flexItem.alignSelf ? `align-self: ${flexItem.alignSelf};` : ""}
    `;

export const gridItem = {
  justifySelf: ["start", "end", "center", "stretch"],
  alignSelf: ["start", "end", "center", "stretch"],
} as const;

export interface GridItemStyle {
  gridColumn?: string;
  gridRow?: string;
  justifySelf?: (typeof gridItem.justifySelf)[number];
  alignSelf?: (typeof gridItem.alignSelf)[number];
}

export const gridItemStyle = (gridItem: GridItemStyle) => `
    ${gridItem.gridColumn ? `grid-column: ${gridItem.gridColumn};` : ""}
    ${gridItem.gridRow ? `grid-row: ${gridItem.gridRow};` : ""}
    ${gridItem.justifySelf ? `justify-self: ${gridItem.justifySelf};` : ""}
    ${gridItem.alignSelf ? `align-self: ${gridItem.alignSelf};` : ""}
    `;
