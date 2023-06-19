# url-object-converter

url-object-converter is a powerful npm package that enables seamless conversion between JavaScript objects and URLs. It allows you to effortlessly transform complex objects into URL-friendly representations and parse URL-encoded strings back into their original object forms.

## Features

- **convertObjectToUrl:** Convert JavaScript objects of any complexity into URL-encoded representations, ensuring compatibility and easy transmission.
- **convertUrlToObject:** Parse URL-encoded strings and transform them back into their original object structures, simplifying data retrieval and manipulation.
- **Handling Complex Objects:** Effortlessly handle nested objects, arrays, and various data types, ensuring accurate conversion between objects and URLs.
- **Customization Options:** Tailor the conversion process with customizable options such as URL encoding schemes, parameter delimiters, and key-value formats.
- **Lightweight and Efficient:** The package is designed for optimal performance, ensuring fast and efficient object-to-URL and URL-to-object transformations.

```javascript
const { convertObjectToUrl, convertUrlToObject } = require('url-object-converter');

// Convert object to URL-encoded string
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

// Parse URL-encoded string to object
const decodedObj = convertUrlToObject(url);
console.log(decodedObj);
// Output: { name: 'John', age: 30, address: { city: 'New York', country: 'USA', }, hobbies: ['reading', 'painting', 'coding'], isStudent: true, "vehicles": [ { make: 'Toyota', model: 'Camry' }, { make: 'Honda', model: 'Accord' }, ], }
```

```javascript
import React from 'react';
import { convertObjectToUrl, convertUrlToObject } from 'url-object-converter';

const MyComponent = () => {
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

  // Convert object to URL-encoded string
  const url = convertObjectToUrl(obj);

  // Parse URL-encoded string to object
  const decodedObj = convertUrlToObject(url);

  return (
    <div>
      <h1>URLObjectConverter Example</h1>
      <p>URL: {url}</p>
      <p>Decoded Object: {JSON.stringify(decodedObj)}</p>
    </div>
  );
};

export default MyComponent;
```
