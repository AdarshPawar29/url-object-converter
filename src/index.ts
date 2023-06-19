export const convertObjectToUrl = (obj: any, prefix = ''): string => {
  const params: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const item = value[i];

          if (typeof item === 'object' && item !== null) {
            params.push(convertObjectToUrl(item, `${newKey}[${i}]`));
          } else if (item !== undefined && item !== null && item !== '') {
            params.push(`${encodeURIComponent(`${newKey}[${i}]`)}=${encodeURIComponent(item)}`);
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        params.push(convertObjectToUrl(value, newKey));
      } else if (value !== undefined && value !== null && value !== '') {
        params.push(`${encodeURIComponent(newKey)}=${encodeURIComponent(value)}`);
      }
    }
  }

  return params.join('&');
};

export function rearrangeObject(originalObj: any) {
  const newObj = { ...originalObj };

  for (const key in newObj) {
    if (key.includes('[') && key.includes(']')) {
      const [propName, index] = key.split('[');
      const arrayIndex = parseInt(index.replace(']', ''), 10);

      if (!newObj[propName]) {
        newObj[propName] = [];
      }

      newObj[propName][arrayIndex] = newObj[key];
      delete newObj[key];
    }
  }

  return newObj;
}

export const convertUrlToObject = (urlQueryString: string): any => {
  const params = new URLSearchParams(urlQueryString);
  const obj: any = {};

  for (const [key, value] of params.entries()) {
    const keys = key.split('.');
    let nestedObj = obj;

    for (let i = 0; i < keys.length; i++) {
      const currentKey = decodeURIComponent(keys[i]);
      const decodedValue = decodeURIComponent(value);

      if (i === keys.length - 1) {
        const isArrayItem = currentKey.endsWith(']');

        if (isArrayItem) {
          const arrayKey = currentKey.substring(0, currentKey.indexOf('['));
          const index = currentKey.substring(currentKey.indexOf('[') + 1, currentKey.indexOf(']'));
          if (!nestedObj[arrayKey]) {
            nestedObj[arrayKey] = [];
          }
          nestedObj[arrayKey][index] = decodedValue;
        } else {
          nestedObj[currentKey] = decodedValue;
        }
      } else {
        if (!nestedObj[currentKey]) {
          nestedObj[currentKey] = {};
        }
        nestedObj = nestedObj[currentKey];
      }
    }
  }

  return rearrangeObject(obj);
};
