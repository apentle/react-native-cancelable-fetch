# react-native-cancelable-fetch
[![Build Status](https://travis-ci.org/apentle/react-native-cancelable-fetch.svg?branch=master)](https://travis-ci.org/apentle/react-native-cancelable-fetch) [![Coverage Status](https://coveralls.io/repos/github/apentle/react-native-cancelable-fetch/badge.svg?branch=master)](https://coveralls.io/github/apentle/react-native-cancelable-fetch?branch=master) [![npm version](https://badge.fury.io/js/react-native-cancelable-fetch.svg)](https://badge.fury.io/js/react-native-cancelable-fetch)

Cancelable fetch within a react native app

## Installation
```bash
npm i --save react-native-cancelable-fetch
```

## Usage
```javascript
const fetch = require('react-native-cancelable-fetch');

// Make fetch request
fetch('http://localhost/', null, 1)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

// Cancel request
fetch.abort(1);

```

## API
**fetch(input, init, tag)** make a request with a tag (`tag` can be number, string or object)
**fetch.abort(tag)** cancel request by tag
