require('es6-promise').polyfill();
const request = require('superagent');
const moment = require('moment');
const HTTP_VERB = require('../constants').HTTP_VERB;
const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = 'http://localhost:3000/services/';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

 
const BaseRequest = function (baseUrl = '', log = true) {
  this.baseUrl = baseUrl;
  this.headers = defaultHeaders;
 
  this.getTimestamp = function () {
    return new Date().toUTCString();
  }
 
  this.makeRequest = function (type, endpoint) {
    const _url = `${this.baseUrl}${endpoint}`;
 
    const timeStart = moment();
    log && console.log(`[REQUEST START] ${_url}: ${this.getTimestamp()}`);
 
    return request(type, _url)
      .timeout(30000)
      .set(this.headers)
      .on('end', () => {
        log && console.log(`[REQUEST END] ${_url}: ${this.getTimestamp()} -- ${moment().diff(timeStart, 'milliseconds')} ms`)
      });
  }
 
  this.set = (key, value) => {
    if (typeof key === 'string') {
      this.headers[key] = value;
    } else {
      for (const k in key) {
        this.headers[k] = key[k];
      }
    }
  }
  this.get = endpoint => this.makeRequest(HTTP_VERB.GET, endpoint);
  this.post = endpoint => this.makeRequest(HTTP_VERB.POST, endpoint);
  this.put = endpoint => this.makeRequest(HTTP_VERB.PUT, endpoint);
  this.delete = endpoint => this.makeRequest(HTTP_VERB.DELETE, endpoint);
}
 
exports.apiRequest = new BaseRequest(apiUrl, !isProduction);