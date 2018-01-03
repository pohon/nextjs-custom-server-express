
const rest = require('restler');
const moment = require('moment');
const HTTP_VERB = require('../constants');
const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = 'https://ruhmsieg.now.sh/';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

 
const APIRequest = function (baseUrl = '', log = true) {
  this.baseUrl = baseUrl;
  this.headers = defaultHeaders;
 
  this.getTimestamp = function () {
    return new Date().toUTCString();
  }
 
  this.makeRequest = function (type, endpoint, data, callback) {
    const _url = `${this.baseUrl}${endpoint}`;
 
    const timeStart = moment();
    log && console.log(`[REQUEST START] ${_url}: ${this.getTimestamp()}`);
 
    rest.request(_url, { method: type, headers: this.headers, timeout: 30000, data: JSON.stringify(data) })
      .on('timeout', () => {
        console.log('Timeout call Ruhmsieg-API : ' + _url);
        callback(true, { status: 'failed', message: 'Timeout call Ruhmsieg-API : ' + _url });
      })
      .on('complete', (result, response) => {
        log && console.log(`[REQUEST END] ${_url}: ${this.getTimestamp()} -- ${moment().diff(timeStart, 'milliseconds')} ms`);

        if (result instanceof Error)
        {
          console.log('Error Call Ruhmsieg-API:', result.message);
          callback(true, null);
        }
        else
        {
          result = JSON.parse(result);
          if(typeof result.status !== 'undefined')
          {
            callback(null, result);
          }
          else
          {
            console.log('Error Ruhmsieg-API, tidak ada object "status"', _url, result);
            callback(true, { status: 'failed', message: result });
          }
        }
      })
      .on('error', (err, response) => {
        console.log(err);
        callback(true, { status: 'failed', message: response });
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

  this.setToken = (token) => {
    this.headers['access-token'] = token || '';
  }

  this.get = (endpoint, callback) => this.makeRequest(HTTP_VERB.GET, endpoint, {}, callback);
  this.post = (endpoint, data, callback) => this.makeRequest(HTTP_VERB.POST, endpoint, data, callback);
  this.put = (endpoint, data, callback) => this.makeRequest(HTTP_VERB.PUT, endpoint, data, callback);
  this.delete = (endpoint, data, callback) => this.makeRequest(HTTP_VERB.DELETE, endpoint, data, callback);
}
 
module.exports = new APIRequest(apiUrl, !isProduction);