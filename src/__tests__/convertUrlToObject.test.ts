import { convertUrlToObject } from '../index';

describe('convertUrlToObject', () => {
  test('converts a URL-encoded string to a simple object', () => {
    const url = 'name=John&age=30';
    const obj = convertUrlToObject(url);
    expect(obj).toEqual({
      name: 'John',
      age: 30,
    });
  });

  test('converts a URL-encoded string with nested objects', () => {
    const url = 'user.name=Alice&user.details.age=25&user.details.isAdmin=false';
    const obj = convertUrlToObject(url);
    expect(obj).toEqual({
      user: {
        name: 'Alice',
        details: {
          age: 25,
          isAdmin: false,
        },
      },
    });
  });

  test('converts a URL-encoded string with arrays', () => {
    const url =
      'hobbies%5B0%5D=reading&hobbies%5B1%5D=painting&hobbies%5B2%5D=coding&scores%5B0%5D=95&scores%5B1%5D=82&scores%5B2%5D=88';
    const obj = convertUrlToObject(url);
    expect(obj).toEqual({
      hobbies: ['reading', 'painting', 'coding'],
      scores: [95, 82, 88],
    });
  });

  test('converts a URL-encoded string with sparse arrays', () => {
    const url = 'sparseArray%5B0%5D=1&sparseArray%5B2%5D=3';
    const obj = convertUrlToObject(url);
    expect(obj).toEqual({
      sparseArray: [1, undefined, 3],
    });
  });

  test('converts a URL-encoded string with mixed data types', () => {
    const url = 'name=John&age=30&isStudent=false&metadata.created=2023-10-01&metadata.updated=null';
    const obj = convertUrlToObject(url);
    expect(obj).toEqual({
      name: 'John',
      age: 30,
      isStudent: false,
      metadata: {
        created: '2023-10-01',
        updated: null,
      },
    });
  });
});
