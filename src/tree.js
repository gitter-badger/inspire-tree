'use strict';

// Libs
var defaultsDeep = require('lodash.defaultsdeep');
var get = require('lodash.get');
var InspireData = require('./lib/data');
var InspireDOM = require('./lib/dom');
var InspireEvents = require('./lib/events');

// CSS
require('./tree.scss');

module.exports = function InspireTree(opts) {
    if (!get(opts, 'target')) {
        throw new TypeError('Property "target" is required, either an element or a selector.');
    }

    // Assign defaults
    opts = defaultsDeep(opts, {
        contextMenu: false,
        dynamic: false
    });

    var api = new (function InspireApi() {});
    api.events = new InspireEvents();
    api.config = opts;

    var data = api.data = new InspireData(api);
    var dom = api.dom = new InspireDOM(api);

    // Connect to our target DOM element
    dom.attach(opts.target);

    // Load initial user data
    data.load(opts.data);

    return api;
};
