/**
 * Performs a deep equality check on two objects.
 * This function recursively compares properties of nested objects and arrays.
 * It correctly handles primitives, objects, arrays, and null/undefined values.
 *
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @returns {boolean} True if the objects are deeply equal, false otherwise.
 */
export function deepEqual<T extends object>(
  obj1: T | null | undefined,
  obj2: T | null | undefined
): boolean {
  // 1. Strict equality check for primitives and same object references
  if (obj1 === obj2) {
    return true;
  }

  // 2. Check for null or undefined objects
  if (
    obj1 === null ||
    obj2 === null ||
    obj1 === undefined ||
    obj2 === undefined
  ) {
    return false;
  }

  // 3. Check if both are objects (and not null)
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }

  // 4. Handle Array comparison
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // Arrays must have the same length
    if (obj1.length !== obj2.length) {
      return false;
    }
    // Recursively check each element of the arrays
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  // 5. Get and compare the keys of the objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // 6. Recursively compare the values for each key
  for (const key of keys1) {
    // The key must exist in both objects
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false;
    }
    // Recursively check the values for the current key
    const value1 = (obj1 as any)[key];
    const value2 = (obj2 as any)[key];
    if (!deepEqual(value1, value2)) {
      return false;
    }
  }

  return true;
}
