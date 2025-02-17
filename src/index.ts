export const convertObjectToUrl = (obj: any, prefix = ''): string => {
  const params: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const itemPrefix = `${newKey}[${i}]`;

          if (typeof item === 'object' && item !== null) {
            params.push(convertObjectToUrl(item, itemPrefix));
          } else if (item !== undefined && item !== '') {
            const encodedKey = encodeURIComponent(itemPrefix);
            const encodedValue = encodeURIComponent(item === null ? 'null' : item);
            params.push(`${encodedKey}=${encodedValue}`);
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        params.push(convertObjectToUrl(value, newKey));
      } else if (value !== undefined && value !== '') {
        const encodedKey = encodeURIComponent(newKey);
        const encodedValue = encodeURIComponent(value === null ? 'null' : value);
        params.push(`${encodedKey}=${encodedValue}`);
      }
    }
  }

  return params.join('&');
};

const parseValue = (value: string): any => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (/^-?\d+$/.test(value)) return parseInt(value, 10);
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);
  return value;
};

export const convertUrlToObject = (urlQueryString: string): any => {
  const params = new URLSearchParams(urlQueryString);
  const obj: any = {};

  for (const [key, value] of params.entries()) {
    const keys = key.split('.');
    let currentObj = obj;

    for (let i = 0; i < keys.length; i++) {
      const currentKeyPart = decodeURIComponent(keys[i]);
      const isLastPart = i === keys.length - 1;
      const arrayMatch = currentKeyPart.match(/^([^\[]+)\[(\d+)\]$/);

      if (arrayMatch) {
        const arrayKey = arrayMatch[1];
        const arrayIndex = parseInt(arrayMatch[2], 10);

        if (!Array.isArray(currentObj[arrayKey])) {
          currentObj[arrayKey] = [];
        }

        while (currentObj[arrayKey].length <= arrayIndex) {
          currentObj[arrayKey].push(undefined);
        }

        let element = currentObj[arrayKey][arrayIndex];
        if (element === undefined && !isLastPart) {
          element = {};
          currentObj[arrayKey][arrayIndex] = element;
        }

        if (isLastPart) {
          currentObj[arrayKey][arrayIndex] = parseValue(decodeURIComponent(value));
        } else {
          currentObj = element;
        }
      } else {
        if (isLastPart) {
          currentObj[currentKeyPart] = parseValue(decodeURIComponent(value));
        } else {
          if (typeof currentObj[currentKeyPart] !== 'object' || currentObj[currentKeyPart] === null) {
            currentObj[currentKeyPart] = {};
          }
          currentObj = currentObj[currentKeyPart];
        }
      }
    }
  }

  // Recursively convert objects with numeric keys to arrays
  const convertNumericKeyObjectsToArrays = (inputObj: any): any => {
    if (Array.isArray(inputObj)) {
      return inputObj.map((item) => convertNumericKeyObjectsToArrays(item));
    } else if (typeof inputObj === 'object' && inputObj !== null) {
      const keys = Object.keys(inputObj);
      if (keys.every((k) => /^\d+$/.test(k))) {
        return keys.map((k) => convertNumericKeyObjectsToArrays(inputObj[k]));
      } else {
        const newObj: any = {};
        for (const key of keys) {
          newObj[key] = convertNumericKeyObjectsToArrays(inputObj[key]);
        }
        return newObj;
      }
    }
    return inputObj;
  };

  return convertNumericKeyObjectsToArrays(obj);
};
