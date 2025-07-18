/**
 * Parses a CSS style string into a React.CSSProperties object.
 *
 * @param styleString - The CSS style string to parse.
 * @returns A React.CSSProperties object.
 */
export const parseStyle = (
  styleString: string | undefined
): React.CSSProperties => {
  if (!styleString) {
    return {};
  }
  const style: React.CSSProperties = {};
  styleString
    .split(";")
    .filter((declaration) => declaration.trim() !== "")
    .forEach((declaration) => {
      const firstColonIndex = declaration.indexOf(":");
      if (firstColonIndex === -1) {
        return;
      }

      const property = declaration.substring(0, firstColonIndex).trim();
      const value = declaration.substring(firstColonIndex + 1).trim();

      if (property && value) {
        const camelCasedProperty = property.replace(/-(\w)/g, (_, letter) =>
          letter.toUpperCase()
        );
        (style as any)[camelCasedProperty] = value;
      }
    });
  return style;
};
