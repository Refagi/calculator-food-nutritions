const pick = <T extends Record<string, any>>(object: T, keys: (keyof T)[]): Partial<T> => {
  return keys.reduce((obj, key) => {
    if (object && key in object) {
      (obj as T)[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
};

export default pick;
