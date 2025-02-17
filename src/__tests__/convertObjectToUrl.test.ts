import { convertObjectToUrl } from '../index';

describe('convertObjectToUrl', () => {
  test('converts a simple object to a URL-encoded string', () => {
    const obj = {
      name: 'John',
      age: 30,
    };
    const url = convertObjectToUrl(obj);
    expect(url).toBe('name=John&age=30');
  });

  test('converts a nested object to a URL-encoded string', () => {
    const obj = {
      user: {
        name: 'Alice',
        details: {
          age: 25,
          isAdmin: false,
        },
      },
    };
    const url = convertObjectToUrl(obj);
    expect(url).toBe('user.name=Alice&user.details.age=25&user.details.isAdmin=false');
  });

  test('converts an object with arrays to a URL-encoded string', () => {
    const obj = {
      hobbies: ['reading', 'painting', 'coding'],
      scores: [95, 82, 88],
    };
    const url = convertObjectToUrl(obj);
    expect(url).toBe(
      'hobbies%5B0%5D=reading&hobbies%5B1%5D=painting&hobbies%5B2%5D=coding&scores%5B0%5D=95&scores%5B1%5D=82&scores%5B2%5D=88',
    );
  });

  test('converts an object with sparse arrays to a URL-encoded string', () => {
    const obj = {
      sparseArray: [1, , 3],
    };
    const url = convertObjectToUrl(obj);
    expect(url).toBe('sparseArray%5B0%5D=1&sparseArray%5B2%5D=3');
  });

  test('converts an object with mixed data types to a URL-encoded string', () => {
    const obj = {
      name: 'John',
      age: 30,
      isStudent: false,
      metadata: {
        created: '2023-10-01',
        updated: null,
      },
    };
    const url = convertObjectToUrl(obj);
    expect(url).toBe('name=John&age=30&isStudent=false&metadata.created=2023-10-01&metadata.updated=null');
  });
});
