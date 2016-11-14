var define = false;
(function (factory) {
    var boundFactory = factory.bind(window);  // Due to strict mode, manually bind `thisContext` to window.
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'handlebars/runtime', 'medium-editor', 'blueimp-file-upload', 'jquery-sortable'], boundFactory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (jQuery) {
            if (typeof window === 'undefined') {
                throw new Error("medium-editor-insert-plugin runs only in a browser.")
            }
            window.Handlebars = require('handlebars/runtime');
            window.MediumEditor = require('medium-editor');
            require('jquery-sortable');
            require('blueimp-file-upload');

            boundFactory(jQuery, Handlebars, MediumEditor);
            return jQuery;
        };
    } else {
        boundFactory(jQuery, Handlebars, MediumEditor);
    }
}(function ($, Handlebars, MediumEditor) {
