(function () {
    var _postMessage = postMessage;
    var _addEventListener = addEventListener;

    (function (obj) {
        'use strict';

        var current = obj;
        var keepProperties = [
            // required
            'Object', 'Function', 'Infinity', 'NaN', 'undefined',
            // optional, but trivial to get back
            'Array', 'Boolean', 'Number', 'String', 'Symbol',
            // optional
            'Map', 'Math', 'Set', 'caches', 'TEMPORARY', 'PERSISTENT'
        ];

        do {
            Object.getOwnPropertyNames(current).forEach(function (name) {
                if (keepProperties.indexOf(name) === -1) {
                    delete current[name];
                }
            });

            current = Object.getPrototypeOf(current);
        } while (current !== Object.prototype);
    })(this);

    _addEventListener('message', function (e) {
        var f;
        if (e.data.indexOf('\n') > -1) {
          // user has supplied multiple functions - treat it as function
          f = new Function(e.data);
        } else {
          f = new Function('', 'return (' + e.data + '\n);');
        }
        _postMessage(f());
    });
})();
