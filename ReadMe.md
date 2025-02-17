Here’s the updated and SEO-friendly README for your `url-object-converter` package. It highlights the improvements, edge cases, and features in a way that makes it easy for users to find and understand the package's capabilities.

---

# URL-Object-Converter

**URL-Object-Converter** is a powerful and lightweight npm package designed to seamlessly convert JavaScript objects into URL-encoded strings and vice versa. Whether you're working with simple key-value pairs or deeply nested objects and arrays, this package ensures accurate and efficient transformations, making it ideal for APIs, query parameters, and data transmission.

---

## Features

### 1. **Convert Objects to URL Strings**
   - **`convertObjectToUrl`**: Transform JavaScript objects of any complexity into URL-encoded strings.
   - Supports nested objects, arrays, and various data types (strings, numbers, booleans, `null`).
   - Handles sparse arrays and deeply nested structures effortlessly.

### 2. **Convert URL Strings to Objects**
   - **`convertUrlToObject`**: Parse URL-encoded strings back into their original object structures.
   - Accurately reconstructs nested objects, arrays, and sparse arrays.
   - Converts URL-encoded values back to their original data types (e.g., `"true"` → `true`, `"null"` → `null`).

### 3. **Handles Edge Cases**
   - **Nested Objects and Arrays**: Perfectly handles deeply nested structures.
   - **Sparse Arrays**: Preserves sparse arrays (e.g., `[1, , 3]`) during conversion.
   - **Data Types**: Supports strings, numbers, booleans, `null`, and omits `undefined` values.
   - **Complex Structures**: Works with arrays of objects, nested arrays, and mixed data types.

### 4. **Lightweight and Efficient**
   - Optimized for performance, ensuring fast conversions even for large and complex objects.
   - Minimal dependencies, making it easy to integrate into any project.

---

## Installation

Install the package via npm:

```bash
npm install url-object-converter
```

---

## Usage

### Convert Object to URL

```javascript
const { convertObjectToUrl } = require('url-object-converter');

const obj = {
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

const url = convertObjectToUrl(obj);
console.log(url);
// Output: name=John&age=30&address.city=New%20York&address.country=USA&hobbies%5B0%5D=reading&hobbies%5B1%5D=painting&hobbies%5B2%5D=coding&isStudent=true&vehicles%5B0%5D.make=Toyota&vehicles%5B0%5D.model=Camry&vehicles%5B1%5D.make=Honda&vehicles%5B1%5D.model=Accord
```

### Convert URL to Object

```javascript
const { convertUrlToObject } = require('url-object-converter');

const url = 'name=John&age=30&address.city=New%20York&address.country=USA&hobbies%5B0%5D=reading&hobbies%5B1%5D=painting&hobbies%5B2%5D=coding&isStudent=true&vehicles%5B0%5D.make=Toyota&vehicles%5B0%5D.model=Camry&vehicles%5B1%5D.make=Honda&vehicles%5B1%5D.model=Accord';

const decodedObj = convertUrlToObject(url);
console.log(decodedObj);
// Output: { name: 'John', age: 30, address: { city: 'New York', country: 'USA' }, hobbies: ['reading', 'painting', 'coding'], isStudent: true, vehicles: [ { make: 'Toyota', model: 'Camry' }, { make: 'Honda', model: 'Accord' } ] }
```

---

## Edge Cases Handled

### 1. **Nested Objects**
   ```javascript
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
   // Output: user.name=Alice&user.details.age=25&user.details.isAdmin=false
   ```

### 2. **Arrays and Nested Arrays**
   ```javascript
   const obj = {
     numbers: [1, 2, 3],
     matrix: [
       [1, 2],
       [3, 4],
     ],
   };
   const url = convertObjectToUrl(obj);
   // Output: numbers%5B0%5D=1&numbers%5B1%5D=2&numbers%5B2%5D=3&matrix%5B0%5D%5B0%5D=1&matrix%5B0%5D%5B1%5D=2&matrix%5B1%5D%5B0%5D=3&matrix%5B1%5D%5B1%5D=4
   ```

### 3. **Sparse Arrays**
   ```javascript
   const obj = {
     sparseArray: [1, , 3],
   };
   const url = convertObjectToUrl(obj);
   // Output: sparseArray%5B0%5D=1&sparseArray%5B2%5D=3
   ```

### 4. **Mixed Data Types**
   ```javascript
   const obj = {
     name: 'John',
     age: 30,
     isStudent: false,
     scores: [95, 82, 88],
     metadata: {
       created: '2023-10-01',
       updated: null,
     },
   };
   const url = convertObjectToUrl(obj);
   // Output: name=John&age=30&isStudent=false&scores%5B0%5D=95&scores%5B1%5D=82&scores%5B2%5D=88&metadata.created=2023-10-01&metadata.updated=null
   ```

---

## Why Use URL-Object-Converter?

- **Accurate Conversions**: Handles all edge cases, including nested objects, arrays, and sparse arrays.
- **Data Type Preservation**: Converts values back to their original types (e.g., `"true"` → `true`, `"null"` → `null`).
- **Lightweight**: Minimal dependencies and optimized for performance.
- **Easy to Use**: Simple API with zero configuration required.

---


## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
