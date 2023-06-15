import { convertObjectToUrl } from '../index';

describe('convertObjectToUrl', () => {
  test('should convert a simple object to a URL query string', () => {
    const obj = {
      name: 'John',
      age: 30,
      occupation: 'Engineer',
    };

    const result = convertObjectToUrl(obj);

    const expectedQueryString = 'name=John&age=30&occupation=Engineer';
    expect(result).toBe(expectedQueryString);
  });

  test('should handle nested objects in the input object', () => {
    const obj = {
      person: {
        name: 'John',
        age: 30,
      },
      address: {
        city: 'New York',
        country: 'USA',
      },
    };

    const result = convertObjectToUrl(obj);

    const expectedQueryString = 'person.name=John&person.age=30&address.city=New%20York&address.country=USA';
    expect(result).toBe(expectedQueryString);
  });

  test('should handle array values in the input object', () => {
    const obj = {
      fruits: ['apple', 'banana', 'orange'],
      numbers: [1, 2, 3],
    };

    const result = convertObjectToUrl(obj);

    const expectedQueryString =
      'fruits%5B0%5D=apple&fruits%5B1%5D=banana&fruits%5B2%5D=orange&numbers%5B0%5D=1&numbers%5B1%5D=2&numbers%5B2%5D=3';
    expect(result).toBe(expectedQueryString);
  });

  test('should ignore undefined, null, and empty string values', () => {
    const obj = {
      name: 'John',
      age: undefined,
      occupation: null,
      city: '',
    };

    const result = convertObjectToUrl(obj);

    const expectedQueryString = 'name=John';
    expect(result).toBe(expectedQueryString);
  });

  test('should convert the object to a URL query string', () => {
    const testObject = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA',
      },
      hobbies: ['reading', 'painting', 'coding'],
      isStudent: true,
      vehicles: [
        { make: 'Toyota', model: 'Camry' },
        { make: 'Honda', model: 'Accord' },
      ],
    };

    const result = convertObjectToUrl(testObject);

    const expectedQueryString =
      'name=John&age=30&address.city=New%20York&address.country=USA&hobbies%5B0%5D=reading&hobbies%5B1%5D=painting&hobbies%5B2%5D=coding&isStudent=true&vehicles%5B0%5D.make=Toyota&vehicles%5B0%5D.model=Camry&vehicles%5B1%5D.make=Honda&vehicles%5B1%5D.model=Accord';

    expect(result).toBe(expectedQueryString);
  });
});
