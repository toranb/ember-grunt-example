document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

function exists(selector) {
    return !!find(selector).length;
}

function missing(selector) {
    var error = "element " + selector + " found (should be missing)";
    throws(function() { find(selector); }, error);
}

function stubEndpointForHttpRequest(url, json) {
    $.mockjax({
        url: url,
        dataType: 'json',
        responseText: json
    });
}

$.mockjaxSettings.logging = false;
$.mockjaxSettings.responseTime = 0;
