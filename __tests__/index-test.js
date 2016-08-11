'use strict';

require('jasmine-ajax');
require('whatwg-fetch');

jest.unmock('../index');
const fetch = require('../index');

describe('CancelableFetch', () => {
  beforeEach(() => {
    jasmine.Ajax.install();

    jasmine.Ajax.stubRequest('/return').andReturn({
      response: '{"movies":[]}',
      responseHeaders: {'X-Request-URL': '/xurl'}
    });
    jasmine.Ajax.stubRequest('/error').andError();
    jasmine.Ajax.stubRequest('/1223').andReturn({status: 1223});
    jasmine.Ajax.stubRequest('/10').andReturn({status: 10});
    jasmine.Ajax.stubRequest('/600').andReturn({status: 600});
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('Cancel request', () => {
    fetch('/abort', null, 1);
    fetch('/abort', null, 2);
    fetch.abort(2);
    expect(jasmine.Ajax.requests.at(0).statusText).not.toBe('abort');
    expect(jasmine.Ajax.requests.mostRecent().statusText).toBe('abort');
    fetch.abort(1);
    expect(jasmine.Ajax.requests.at(0).statusText).toBe('abort');
  });

  it('Request normal url', () => {
    return fetch('/return', null, 3).then(res => res.json())
      .then(res => expect(res).toEqual({movies: []}));
  });

  it('Request with credentials', () => {
    return fetch(new Request('/return', {
      credentials: 'include',
      headers: {user: 'user', password: 'password'},
      body: ''
    })).then(res => {
      expect(res.url).toBe('/xurl');
      return res.json();
    }).then(res => expect(res).toEqual({movies: []}));
  });

  it('Request with responseURL', () => {
    var request = fetch('/responseURL');
    jasmine.Ajax.requests.mostRecent().responseURL = '/res';
    jasmine.Ajax.requests.mostRecent().respondWith({response: 'url'});
    return request.then(res => expect(res.url).toBe('/res'));
  });

  it('Request error', () => {
    return fetch('/error').catch(err => expect(err.message).toBe('Network request failed'));
  });

  it('Request 204', () => {
    return fetch('/1223').then(res => expect(res.status).toBe(204));
  });

  it('Request error 10', () => {
    return fetch('/10').catch(err => expect(err.message).toBe('Network request failed'));
  });

  it('Request error 600', () => {
    return fetch('/600').catch(err => expect(err.message).toBe('Network request failed'));
  });
});
