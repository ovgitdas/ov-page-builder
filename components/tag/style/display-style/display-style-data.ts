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

export const gridTemplateColumnsValues = [
  // Single-column tracks
  "1fr",
  "auto",
  "min-content",
  "max-content",

  // Multi-column templates
  "1fr 1fr",
  "1fr 1fr 1fr",
  "1fr 2fr 1fr",
  "repeat(2, 1fr)",
  "repeat(3, 1fr)",
  "1fr auto 1fr",
  "minmax(200px, 1fr)",

  // Fixed and mixed templates
  "100px 1fr",
  "auto 1fr 200px",
  "20% 1fr 20%",

  // Subgrid and global keywords
  "subgrid",
  "initial",
  "inherit",
  "unset",
] as const;

// Suggestions for the `grid-template-rows` property, which defines the rows of a grid layout.
export const gridTemplateRowsValues = [
  "auto",
  "1fr",
  "1fr 1fr",
  "1fr 1fr 1fr",
  "repeat(2, 1fr)",
  "repeat(3, 1fr)",
  "minmax(100px, auto)",
  "100px 1fr",
  "auto 1fr auto",
  "initial",
  "inherit",
  "unset",
] as const;

// Suggestions for the `grid-template-areas` property, which defines the layout by referencing named grid areas.
export const gridTemplateAreasValues = [
  `"header" "main" "footer"`,
  `"nav main" "nav aside"`,
  `"header header header" "nav main aside" "footer footer footer"`,
  `"sidebar main main" "sidebar main main"`,
  `"." "header" "footer"`, // Unnamed areas can be created with a single period.
  "initial",
  "inherit",
  "unset",
] as const;

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
// Suggestions for the `flex-grow` property, which determines how much an item will grow relative to the rest of the flex items.
export const flexGrowValues = [
  "0", // Prevents the item from growing.
  "1", // Allows the item to grow proportionally to other items with the same value.
  "2",
  "3",
  "initial",
  "inherit",
  "unset",
] as const;

// Suggestions for the `flex-shrink` property, which determines how much an item will shrink relative to the rest of the flex items.
export const flexShrinkValues = [
  "0", // Prevents the item from shrinking.
  "1", // Allows the item to shrink proportionally to other items with the same value.
  "2",
  "3",
  "initial",
  "inherit",
  "unset",
] as const;

// Suggestions for the `flex-basis` property, which sets the initial size of a flex item before any growing or shrinking.
export const flexBasisValues = [
  "auto", // The default, uses the item's content size.
  "0",
  "content",
  "200px",
  "300px",
  "50%",
  "25%",
  "100%",
  "initial",
  "inherit",
  "unset",
] as const;

// Suggestions for the `order` property, which controls the order in which flex items appear.
export const flexOrderValues = [
  "0", // The default value.
  "-1", // Places the item before all others.
  "1",
  "2",
  "99", // Can be used to place an item at the end.
  "initial",
  "inherit",
  "unset",
] as const;

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

// Suggestions for the `grid-column` property, which sets a grid item's size and location in the grid's columns.
export const gridColumnValues = [
  "auto", // The default, automatically sizes and places the item.
  "1 / 3", // Starts at column line 1 and ends at column line 3.
  "span 2", // Spans across 2 columns.
  "1 / span 3", // Starts at column line 1 and spans 3 columns.
  "column-start-name / 3", // Starts at a named line.
  "initial",
  "inherit",
  "unset",
] as const;

// Suggestions for the `grid-row` property, which sets a grid item's size and location in the grid's rows.
export const gridRowValues = [
  "auto", // The default, automatically sizes and places the item.
  "1 / 3", // Starts at row line 1 and ends at row line 3.
  "span 2", // Spans across 2 rows.
  "1 / span 3", // Starts at row line 1 and spans 3 rows.
  "row-start-name / 3", // Starts at a named line.
  "initial",
  "inherit",
  "unset",
] as const;

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
