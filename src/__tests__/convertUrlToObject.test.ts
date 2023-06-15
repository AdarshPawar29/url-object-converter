import { convertUrlToObject, rearrangeObject } from '../index';

describe('convertUrlToObject', () => {
  test('should handle URL query string with duplicate keys', () => {
    const urlQueryString = 'name%5B0%5D=John&name%5B1%5D=Jane&age%5B0%5D=30&age%5B1%5D=25';
    const result = rearrangeObject(convertUrlToObject(urlQueryString));

    const expectedObject = {
      name: ['John', 'Jane'],
      age: ['30', '25'],
    };

    expect(result).toEqual(expectedObject);
  });

  test('should handle URL query string with empty values', () => {
    const urlQueryString = 'age=30&address.country=USA';
    const result = convertUrlToObject(urlQueryString);
    const expectedObject = {
      age: '30',
      address: {
        country: 'USA',
      },
    };
    expect(result).toEqual(expectedObject);
  });
});

describe('rearrangeObject', () => {
  test('should handle empty object', () => {
    const originalObj = {};
    const result = rearrangeObject(originalObj);
    const expectedObject = {};
    expect(result).toEqual(expectedObject);
  });

  test('should handle object with no properties containing array index notation', () => {
    const originalObj = {
      name: 'John',
      age: '30',
      address: {
        city: 'New York',
        country: 'USA',
      },
    };
    const result = rearrangeObject(originalObj);
    const expectedObject = {
      name: 'John',
      age: '30',
      address: {
        city: 'New York',
        country: 'USA',
      },
    };
    expect(result).toEqual(expectedObject);
  });
  //TODO: Need to work on this, use this object as a reference
  //   const testObject = {
  //     data: {
  //       items: [
  //         {
  //           id: 1,
  //           name: 'Item 1',
  //         },
  //         {
  //           id: 2,
  //           name: 'Item 2',
  //         },
  //       ],
  //     },
  //   };
  //   test('should handle object with nested properties containing array index notation', () => {
  //     const originalObj = {
  //       data: {
  //         'items[0].id': '1',
  //         'items[0].name': 'Item 1',
  //         'items[1].id': '2',
  //         'items[1].name': 'Item 2',
  //       },
  //     };

  //     const result = rearrangeObject(originalObj);

  //     const expectedObject = {
  //       data: {
  //         items: [
  //           {
  //             id: 1,
  //             name: 'Item 1',
  //           },
  //           {
  //             id: 2,
  //             name: 'Item 2',
  //           },
  //         ],
  //       },
  //     };

  //     expect(result).toEqual(expectedObject);
  //   });
});
