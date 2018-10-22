/*! 
 * medium-editor-insert-plugin v2.4.0 - jQuery insert plugin for MediumEditor
 *
 * http://linkesch.com/medium-editor-insert-plugin
 * 
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.com)
 * Released under the MIT license
 */

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

this["MediumInsert"] = this["MediumInsert"] || {};
this["MediumInsert"]["Templates"] = this["MediumInsert"]["Templates"] || {};

this["MediumInsert"]["Templates"]["src/js/templates/core-buttons-gear.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"add_option medium-insert-buttons whitelabel-gear\" contenteditable=\"false\">\n  <small class=\"add_option_tools\" style=\"display: none;\">\n    <span class=\"insert-option\" style=\"display: block;\">\n      <label class=\"label\">INSERT</label>\n      <a class=\"insert-action-text\">\n        <i></i> Text</a>\n      <a class=\"insert-action-image\">\n        <i></i> Images</a>\n      <a class=\"insert-action-product\">\n        <i></i> Products</a>\n    </span>\n    <span class=\"insert-text\" style=\"display: none;\">\n      <a href=\"#\" class=\"label\">TEXT</a>\n      <a class=\"insert-action-text-body\">\n        <i></i> Body</a>\n      <a class=\"insert-action-text-quote\">\n        <i></i> Quote</a>\n    </span>\n    <span class=\"insert-image\" style=\"display: none;\">\n      <a href=\"#\" class=\"label\">IMAGE</a>\n      <a class=\"insert-action-image-single medium-insert-action\" data-addon=\"images\" data-action=\"add\" data-image-insert-type=\"single\">\n        <i></i> Single</a>\n      <a class=\"insert-action-image-slideshow gallery-insert-action\">\n        <i></i> Slideshow</a>\n      <a class=\"insert-action-image-grid medium-insert-action\" data-addon=\"images\" data-action=\"add\" data-meta='{ \"type\": \"grid\" }'>\n        <i></i> Grid</a>\n    </span>\n    <span class=\"insert-product\" style=\"display: none;\">\n      <a href=\"#\" class=\"label\">PRODUCT</a>\n      <a class=\"insert-action-product-card\">\n        <i></i> Cards</a>\n      <a class=\"insert-action-product-slideshow\">\n        <i></i> Slideshow</a>\n    </span>\n    <span class=\"editable_tools\" style=\"display:none;\">\n      <label class=\"label\">IMAGE STYLE</label>\n      <a class=\"edit_full\">\n        <i></i>\n      </a>\n      <a class=\"edit_normal\">\n        <i></i>\n      </a>\n      <a class=\"edit_with_quote\">\n        <i></i>\n      </a>\n    </span>\n  </small>\n  <button class=\"medium-insert-buttons-show show_option\" type=\"button\"></button>\n</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/core-buttons.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"add_option medium-insert-buttons\" contenteditable=\"false\" style=\"display: none\">\n    <small class=\"add_option_tools\" style=\"display: none;\">\n        <div class=\"trick\"></div>\n        <a class=\"medium-insert-action\" data-addon=\"images\" data-action=\"add\">Insert Image</a>\n        <a class=\"video-insert-action\">Insert Video</a>\n        <a class=\"gallery-insert-action\">Insert Gallery</a>\n    </small>\n    <button class=\"medium-insert-buttons-show show_option\" type=\"button\"></button>\n</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/core-caption.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<figcaption contenteditable=\"true\" class=\"medium-insert-caption-placeholder\" data-placeholder=\""
    + container.escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\"></figcaption>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/core-empty-line.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p><br></p>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/embeds-toolbar.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"medium-insert-embeds-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n        <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.styles : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "                    <li>\n                        <button class=\"medium-editor-action\" data-action=\""
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n                    </li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"medium-insert-embeds-toolbar2 medium-editor-toolbar medium-editor-toolbar-active\">\n        <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.actions : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.styles : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.actions : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/embeds-wrapper.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"medium-insert-embeds\" contenteditable=\"false\">\n	<figure>\n		<div class=\"medium-insert-embed\">\n			"
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n	</figure>\n	<div class=\"medium-insert-embeds-overlay\"></div>\n</div>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-fileupload.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"file\" multiple>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-grid-each.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"medium-insert-images-progress\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"grid\">\n    <img src=\"/_ui/images/common/blank.gif\" data-src=\""
    + alias4(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"\" style=\"background-image:url('"
    + alias4(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "');\">\n    <a href=\"#\" class=\"remove\">Remove</a>\n    <a href=\"#\" class=\"btn-caption\">Add Caption</a>\n    <figcaption contenteditable=\"true\" class=\"text-placeholder\" data-placeholder=\"Type caption for image (optional)\"></figcaption>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.progress : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-image.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"medium-insert-images-progress\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<figure contenteditable=\"false\">\n    <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" />\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.progress : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</figure>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-progressbar.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<progress min=\"0\" max=\"100\" value=\"0\">0</progress>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-toolbar.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"medium-insert-images-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <div class=\"editable_tools\">\n        <a class=\"edit_full\">Full</a>\n        <a class=\"edit_normal\">Normal</a>\n        <a class=\"edit_with_quote\">With Quote</a>\n    </div>\n</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/product-card.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul class=\"itemList product\" contenteditable=\"false\">\n  <% items.forEach(function(item) { %>\n  <li class=\"itemListElement\" data-id=\"<%= item.id %>\">\n    <span class=\"figure\">\n      <img src=\"/_ui/images/common/blank.gif\" style=\"background-image:url(<%= item.image %>)\">\n    </span>\n    <span class=\"figcaption\">\n      <span class=\"title\"><%= item.title %></span>\n      <b class=\"price\"><%= item.price %></b>\n    </span>\n    <a class=\"remove\">Remove</a>\n  </li>\n  <% }); %>\n  <small class=\"add_option_tools\" style=\"display:none;\">\n    <a class=\"add-product\">Add Products</a>\n    <a class=\"delete-slideshow\">Delete Grid</a>\n  </small>\n</ul>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/product-slideshow.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"itemSlide product\" contenteditable=\"false\">\n  <div class=\"itemSlideWrap\">\n    <ol class=\"stream after\">\n      <li><div class=\"figure-item add\"><input type=\"file\"></div></li>\n      <% items.forEach(function(item) { %>\n      <li class=\"itemSlideElement\" data-id=\"<%= item.id %>\">\n        <div class=\"figure-item\">\n          <figure><a href=\"<%= item.html_url %>?utm=article\"><span\n                class=\"back\"></span><img class=\"figure\" src=\"/_ui/images/common/blank.gif\" style=\"background-image: url(<%= item.image %>);\"></a>\n          </figure>\n          <figcaption>\n            <span class=\"show_cart\"><button class=\"btn-cart nopopup soldout\"><em>$<%= item.price %></em></button></span><a href=\"<%= item.html_url %>?utm=article\" class=\"title\"><%= item.title %></a>\n          </figcaption>\n          <a class=\"delete\"></a>\n        </div>\n      </li>\n      <% }); %>\n    </ol>\n  </div>\n  <a href=\"#\" class=\"prev\">Prev</a>\n  <a href=\"#\" class=\"next\">Next</a>\n  <small class=\"add_option_tools\" style=\"display:none;\">\n    <a class=\"add-product\">Add Products</a>\n    <a class=\"delete-slideshow\">Delete Slideshow</a>\n  </small>\n</div>\n";
},"useData":true});
;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        defaults = {
            editor: null,
            enabled: true,
            addons: {
                images: true, // boolean or object containing configuration
                embeds: true
            }
        };

    /**
     * Capitalize first character
     *
     * @param {string} str
     * @return {string}
     */

    function ucfirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // https://gist.github.com/yangshun/9892961#file-youtube-vimeo-url-parser-js-L24
    function parseVideo (url) {
        // - Supported YouTube URL formats:
        //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
        //   - http://youtu.be/My2FRPA3Gf8
        //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
        // - Supported Vimeo URL formats:
        //   - http://vimeo.com/25451551
        //   - http://player.vimeo.com/video/25451551
        // - Also supports relative URLs:
        //   - //player.vimeo.com/video/25451551

        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

        if (RegExp.$3.indexOf('youtu') > -1) {
            var type = 'youtube';
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
            var type = 'vimeo';
        }

        return {
            type: type,
            id: RegExp.$6
        };
    }

    /**
     * Core plugin's object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Core(el, options) {
        var editor;

        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;

        if (options) {
            // Fix #142
            // Avoid deep copying editor object, because since v2.3.0 it contains circular references which causes jQuery.extend to break
            // Instead copy editor object to this.options manually
            editor = options.editor;
            options.editor = null;
        }
        this.options = $.extend(true, {}, defaults, options);
        this.options.editor = editor;

        this._defaults = defaults;
        this._name = pluginName;

        // Extend editor's functions
        if (this.options && this.options.editor) {
            if (this.options.editor._serialize === undefined) {
                this.options.editor._serialize = this.options.editor.serialize;
            }
            if (this.options.editor._destroy === undefined) {
                this.options.editor._destroy = this.options.editor.destroy;
            }
            if (this.options.editor._setup === undefined) {
                this.options.editor._setup = this.options.editor.setup;
            }
            this.options.editor._hideInsertButtons = this.hideButtons;

            this.options.editor.serialize = this.editorSerialize;
            this.options.editor.destroy = this.editorDestroy;
            this.options.editor.setup = this.editorSetup;

            if (this.options.editor.getExtensionByName('placeholder') !== undefined) {
                this.options.editor.getExtensionByName('placeholder').updatePlaceholder = this.editorUpdatePlaceholder;
            }
        }
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    function getAdjacentCursor($place) {
        var $container = $('.description.more');
        var isFirstChild = $place.is(':first-child');
        var cursor;
        if (isFirstChild) {
            return { recoveryMode: 'insert-first' };
        } else {
            if ($place.is('.description.more > *')) {
                cursor = $place.before();
            } else {
                cursor = $place.closest('.description.more > *').before();
            }
            return { recoveryMode: 'insert-next', cursor: cursor };
        }
    }

    function restoreCursor(recoveryObject) {
        var elToReplace = $('<p />')
        if (recoveryObject.recoveryMode === 'insert-first') {
            $('.description.more').prepend(elToReplace);
        } else if (recoveryObject.recoveryMode === 'insert-next') {
            elToReplace.insertAfter(recoveryObject.cursor);
        } else {
            console.warn("restoreCursor(): ?")
        }
        return elToReplace;
    }

    Core.prototype.init = function () {
        this.$el.addClass('medium-editor-insert-plugin');

        if (typeof this.options.addons !== 'object' || Object.keys(this.options.addons).length === 0) {
            this.disable();
        }

        this.initAddons();
        this.clean();
        this.events();

        if (window.isWhitelabelV2) {
            var productCardTemplate = _.template(this.templates['src/js/templates/product-card.hbs']().trim());
            var productSlideshowTemplate = _.template(this.templates['src/js/templates/product-slideshow.hbs']().trim());
            var $insertProductDialog = $.dialog('insert_product').$obj;
            var selectedTemplate = _.template($insertProductDialog.find('#popup-tpl-selected').html())
            var searchedTemplate = _.template($insertProductDialog.find('#popup-tpl-searched').html())
            var $searched = $insertProductDialog.find('.suggest');
            var $selected = $insertProductDialog.find('.featured');
            // Sortable.create($selected.find('ul').get(0), {
            //     handle: '.btn-move',
            // });
            
            $insertProductDialog
                .data('productCardTemplate', productCardTemplate)
                .data('productSlideshowTemplate', productSlideshowTemplate);

            var ThingCache = {};
            window.ThingCache = ThingCache;
            var searchCache = {};
            var ref = { selectedItemIds: [] };

            $insertProductDialog.find('input.text')
                .on('keyup', _.debounce(function(e) {
                    var val = e.target.value.trim();
                    if (val === '') {
                        $searched.hide();
                        return;
                    }
                    var dfd;
                    if (searchCache[val]) {
                        dfd = $.Deferred();
                        dfd.resolve(searchCache[val]);
                    } else {
                        dfd = $.get(window.REST_API_ENDPOINT, { keyword: val });
                    }
                    dfd.then(function(things) {
                        if (!searchCache[val]) {
                            searchCache[val] = things;
                        }
                        $searched.empty();
                        if (things.products.length > 0) {
                            $searched.show();
                            things.products.forEach(function(thing) {
                                var selected = _.find(ref.selectedItemIds, function(sid){ return thing.id === sid }) !== undefined;
                                if (!selected) {
                                    $searched.append($(searchedTemplate(thing)).data('thing', thing));
                                    if (ThingCache[thing.id] == null) {
                                        thing.cached = true;
                                        ThingCache[thing.id] = thing;
                                    }
                                }
                            });
                        } else {
                            $searched.hide();
                        }
                    })
                    .fail(function(xhr) {
                        if (xhr.status === 404) {
                            alertify.alert('Product not found.');
                        }
                    })
                }, 500))
                .on('focus', function() {
                    $(this).trigger('keyup');
                });
            $('.popup.insert_product .btn-save').on('click', function () {
                var items = $selected.find('li')
                    .map(function(i, e){ return $(e).attr('data-sid'); }).toArray()
                    .map(function(sid){ return ThingCache[sid]; });
                // select template and feed context
                var type = $insertProductDialog.data('type');
                var tpl; 
                if (type === 'card') {
                    tpl = productCardTemplate;
                } else if (type === 'slideshow') {
                    tpl = productSlideshowTemplate;
                }
                var $el = $(tpl({ items: items }));
                $el.data('selectedItemIds', _.clone(ref.selectedItemIds));

                var updatingRoot = $(this).data('updatingRoot');
                // slideshow update mode
                if (updatingRoot) {
                    updatingRoot.replaceWith($el);
                    $(this).data('updatingRoot', null);
                } else {
                    var $place = restoreCursor($insertProductDialog.data('cursor'));
                    $place.replaceWith($el);
                }

                $.dialog('insert_product').close();
            });

            $searched.on('click', 'li', function(){
                $searched.hide();
                var thing = $(this).data('thing');
                $selected.show();
                // find dupe
                var $dupe = $selected.find('ul li[data-sid="' + thing.id + '"]')
                if ($dupe.length > 0) {
                    return;
                }
                ref.selectedItemIds.push(thing.id);
                $selected.find('ul')
                    .prepend(selectedTemplate(thing));
                var cnt = ref.selectedItemIds.length;
                $insertProductDialog.find('.btn-save')
                    .attr('disabled', false)
                    .text('Insert ' + cnt + (cnt === 1 ? ' Item' : ' Items'));
            });

            $selected.on('click', 'li .btn-del', function(){
                var sidToDelete = Number($(this).closest('li').data('sid'));
                $(this).closest('li').remove();
                ref.selectedItemIds = ref.selectedItemIds.filter(function(sid) { return sid !== sidToDelete });
                if (ref.selectedItemIds.length === 0) {
                    $insertProductDialog.find('.btn-save').attr('disabled', true).text('Insert Items');
                    $selected.hide();
                }
                var cnt = ref.selectedItemIds.length;
                $insertProductDialog.find('.btn-save')
                    .attr('disabled', false)
                    .text('Insert ' + cnt + (cnt === 1 ? ' Item' : ' Items'));
                return false;
            });

            $insertProductDialog.data('setSaved', function setSaved($root, _selectedItemIds) {
                if (_selectedItemIds.length > 0) {
                    // copy contents
                    ref.selectedItemIds = _selectedItemIds;
                    _selectedItemIds.forEach(function(sid) {
                        var promise = $.Deferred();
                        if (ThingCache[sid]) {
                            promise.resolve(ThingCache[sid]);
                        } else {
                            $.get('/rest-api/v1/things/' + sid + '?sales=true')
                                .then(function(thing) {
                                    var ctx;
                                    try {
                                        var image = (thing.sales.images[0] && thing.sales.images[0].src) || thing.image.src;
                                        ctx = {
                                            id: thing.sales.id,
                                            brand_name: thing.sales.seller.brand_name,
                                            title: thing.sales.title,
                                            price: thing.sales.price,
                                            thumbnail: image,
                                            image: image,
                                        }
                                        ThingCache[thing.sales.id] = ctx;
                                    } catch(e) {
                                        ctx = {
                                            id: '0',
                                            brand_name: 'UNABLE_TO_LOAD',
                                            title: 'UNABLE_TO_LOAD',
                                            price: 0,
                                            thumbnail: '/_ui/images/common/blank.gif',
                                        };
                                    }
                                    promise.resolve(ctx);
                                })
                                .fail(function(xhr) {
                                    console.warn('failed to load', sid, xhr);
                                    promise.resolve({
                                        id: '0',
                                        brand_name: 'UNABLE_TO_LOAD',
                                        title: 'UNABLE_TO_LOAD',
                                        price: 0,
                                        thumbnail: '/_ui/images/common/blank.gif',
                                    });
                                });
                        }
                        promise.then(function(thing) {
                            $selected.find('ul').append(selectedTemplate(thing));
                        })
                    });
                    $selected.show();
                    var cnt = _selectedItemIds.length;
                    $insertProductDialog.find('.btn-save')
                        .attr('disabled', false)    
                        .text('Insert ' + cnt + (cnt === 1 ? ' Item' : ' Items'));
                    $insertProductDialog.find('.btn-save').data('updatingRoot', $root);
                }
            })

            // reset
            $insertProductDialog.on('open', function() {
                ref.selectedItemIds = [];
                $insertProductDialog.find('input.text').val('');
                $selected
                    .find('ul').empty().end()
                    .hide();
                $searched.empty().hide();
                $(this).find('.btn-save').attr('disabled', true).text('Insert Items');
            });

            // toggle button
            setTimeout(function(t) {
                t.clean();
                t.positionButtons();
                t.showButtons();
                if (t.$el.find('.medium-insert-active').length === 0) {
                    var activeInsertAdded = false;
                    t.$el.find('> p').each(function(i, e) {
                        if (activeInsertAdded) {
                            return
                        }
                        if ($(e).text().trim() === '') {
                            $(e).addClass('medium-insert-active')
                            activeInsertAdded = true
                        }
                    });
                }
            }, 50, this);
        } // if whitelabel v2 end
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Core.prototype.events = function () {
        var that = this;

        function adjustCaretBeforeInsertWidget(root) {
            var $place = root.$el.find('.medium-insert-active');
            // From images.js 
            if ($place.is('p')) {
                root.migrateExistingContent($place);
                $place.replaceWith('<div class="medium-insert-active">' + $place.html() + '</div>');
                $place = root.$el.find('.medium-insert-active');
                if ($place.next().is('p')) {
                    root.moveCaret($place.next());
                } else {
                    $place.after('<p><br></p>'); // add empty paragraph so we can move the caret to the next line.
                    root.moveCaret($place.next());
                }
            }
            return $place;
        }

        function resetOptionV2() {
            $('.add_option').hide();
            $('.add_option_tools .insert-product, .add_option_tools .insert-text, .add_option_tools .insert-image').hide();
            $('.add_option .insert-option').show();
        }

        this.$el
            .on('dragover drop', function (e) {
                e.preventDefault();
            })
            .on('keyup click focusout', $.proxy(this, 'toggleButtons'))
            .on('selectstart mousedown', '.medium-insert, .medium-insert-buttons', $.proxy(this, 'disableSelection'))
            .on('click', '.medium-insert-buttons-show', $.proxy(this, 'toggleAddons'))
            .on('click', '.medium-insert-action', $.proxy(this, 'addonAction'))
            .on('click', '.gallery-insert-action', (function(){ // #ARTICLE_MOD
                var $place = adjustCaretBeforeInsertWidget(this);
                window.gallery.uploadImages(function(nextImages) {
                    if (nextImages === false) {
                        alert('Failed to upload images, please try again'); return;
                    } 
                    window.gallery.renderTo($place, null, function() {
                        window.gallery.instance.addImages(nextImages.filter(e => e));
                    });
                })
            }).bind(this))
            .on('click', '.video-insert-action', (function(){ // #ARTICLE_MOD
                var input = window.prompt('Please put youtube address');
                if (input == null) {
                    return;
                }
                var vid = parseVideo(input.trim());
                if (vid.type === 'youtube') { // youtube.com
                    var $videoElement = $(`<p class="article-media media-youtube" data-service="youtube" data-service-id="${vid.id}" style="text-align: center;"><iframe src="https://www.youtube.com/embed/${vid.id}" width="560" height="315" frameborder="0" allowfullscreen=""></iframe></p>`);
                    var $place = this.$el.find('.medium-insert-active');
                    if ($place.is('p')) {
                        this.migrateExistingContent($place);
                        $place.replaceWith('<div class="medium-insert-active">' + $place.html() + '</div>');
                        $place = this.$el.find('.medium-insert-active');
                        if ($place.next().is('p')) {
                            this.moveCaret($place.next());
                        } else {
                            $place.after('<p><br></p>'); // add empty paragraph so we can move the caret to the next line.
                            this.moveCaret($place.next());
                        }
                        $place.replaceWith($videoElement);
                        window.EditorControl.refresh();
                    }
                    return;
                } else {
                    window.alert('Video service other than youtube is not supported.');
                    return;
                }
            }).bind(this))
            .on('click', '.medium-insert-buttons .trick', (function(e) { // #ARTICLE_MOD
                this.$el.find('.add_option_tools').hide();
            }).bind(this))
            .on('paste', '.medium-insert-caption-placeholder', function (e) {
                $.proxy(that, 'removeCaptionPlaceholder')($(e.target));
            });
        /*
            Whitelabel V2 Stuff
        */
        if (isWhitelabelV2) {
           this.$el
           .on('click', '.insert-option .insert-action-text', function(){ // #ARTICLE_MOD
                $('.add_option .insert-option').hide();
                $('.add_option_tools .insert-text').show();
                return false;
            })
            .on('click', '.insert-option .insert-action-image', function(){ // #ARTICLE_MOD
                $('.add_option .insert-option').hide()
                $('.add_option_tools .insert-image').show();
                return false;
            })
            .on('click', '.insert-option .insert-action-product', function(){ // #ARTICLE_MOD
                $('.add_option .insert-option').hide()
                $('.add_option_tools .insert-product').show();
                return false;
            })
            .on('click', '.insert-text .label', function(){ // #ARTICLE_MOD
                $('.add_option_tools .insert-text').hide();
                $('.add_option .insert-option').show();
                return false;
            })
            .on('click', '.insert-image .label', function(){ // #ARTICLE_MOD
                $('.add_option_tools .insert-image').hide();
                $('.add_option .insert-option').show();
                return false;
            })
            .on('click', '.insert-product .label', function(){ // #ARTICLE_MOD
                $('.add_option_tools .insert-product').hide();
                $('.add_option .insert-option').show();
                return false;
            })
            // add text options
            .on('click', '.insert-action-text-body', function(){ // #ARTICLE_MOD
                return false;
            })
            .on('click', '.insert-action-text-quote', function(){ // #ARTICLE_MOD
                return false;
            })
            // add image options
            .on('click', '.insert-action-image-single', function(){ // #ARTICLE_MOD
                return false;
            })
            .on('click', '.insert-action-image-grid', function(){ // #ARTICLE_MOD
                return false;
            })
            // .on('click', '.insert-action-image-slideshow', function(){ // #ARTICLE_MOD // delegated as .gallery-insert-action
            //     return false;
            // })
            // add product card/slideshow
            .on('click', '.insert-action-product-card', (function(){ // #ARTICLE_MOD
                var $place = adjustCaretBeforeInsertWidget(this);
                $.dialog('insert_product').$obj.data('cursor', getAdjacentCursor($place));
                $.dialog('insert_product').$obj.data('type', 'card');
                $.dialog('insert_product').open();
                resetOptionV2();
                return false;
            }).bind(this))
            .on('click', '.insert-action-product-slideshow', (function(){ // #ARTICLE_MOD
                var $place = adjustCaretBeforeInsertWidget(this);
                $.dialog('insert_product').$obj.data('cursor', getAdjacentCursor($place));
                $.dialog('insert_product').$obj.data('type', 'slideshow');
                $.dialog('insert_product').open();
                resetOptionV2();
                return false;
            }).bind(this))
            .on('mouseover', '.product', function() {
                $(this).find('.add_option_tools').show();
            })
            .on('mouseout', '.product', function () {
                $(this).find('.add_option_tools').hide();
            })
            .on('click', '.product .figure-item.add input, .product .add-product', function(){ // #ARTICLE_MOD
                $.dialog('insert_product').open();
                if ($(this).closest('.product').hasClass('itemSlide')) {
                    $.dialog('insert_product').$obj.data('type', 'slideshow')
                } else if ($(this).closest('.product').hasClass('itemList')) {
                    $.dialog('insert_product').$obj.data('type', 'card')
                }
                // give time for reset
                var $that = $(this);
                setTimeout(function(){
                    var selectedItemIds = $that.closest('.product').data('selectedItemIds');
                    if (selectedItemIds == null) {
                        selectedItemIds = $that.closest('.product').find('li').map(function(i, e) {
                            return $(e).data('id');
                        }).toArray();
                    }
                    $.dialog('insert_product').$obj.data('setSaved')($that.closest('.product'), selectedItemIds);
                }, 50);
                return false;
            })
            .on('click', '.itemSlide .prev', function(){ // #ARTICLE_MOD
                var $wrapper = $(this).closest('.product');
                var len = $wrapper.find('li').length;
                if (len <= 4) {
                    return false;
                }
                var si = $wrapper.data('slide-index');
                if (si == null) {
                    si = 0;
                    $wrapper.data('slide-index', 0);
                }
                if (si === 0) {
                    return false;
                }
                $wrapper.find('.itemSlideWrap').css('transform', 'translateX(' + String((si - 1) * -95.5) + '%)');
                $wrapper.data('slide-index', si - 1);
                return false;
            })
            .on('click', '.itemSlide .next', function(){ // #ARTICLE_MOD
                var $wrapper = $(this).closest('.product');
                var len = $wrapper.find('li').length;
                if (len <= 4) {
                    return false;
                }
                var si = $wrapper.data('slide-index');
                if (si == null) {
                    si = 0;
                    $wrapper.data('slide-index', 0);
                }
                var max = Math.floor(len / 4);
                if (si === max) {
                    return false;
                }
                $wrapper.find('.itemSlideWrap').css('transform', 'translateX(' + String((si + 1) * -95.5) + '%)');
                $wrapper.data('slide-index', si + 1);
                return false;
            })
            // product card
            .on('click', 'ul.itemList .itemListElement .remove', function(){
                var $wrapper = $(this).closest('.product');
                var selectedItemIds = $wrapper.data('selectedItemIds');
                if (selectedItemIds == null) {
                    selectedItemIds = $(this).closest('.product').find('li').map(function(i, e) {
                        return $(e).data('id')
                    }).toArray()
                }
                if (selectedItemIds.length <= 1) {
                    $(this).closest('.itemList').remove();
                    $wrapper.data('selectedItemIds', []);
                } else {
                    var $li = $(this).closest('.itemListElement');
                    var removingId = $li.data('id');
                    var next = $wrapper.data('selectedItemIds').filter(function(sid) { return sid !== removingId });
                    $wrapper.data('selectedItemIds', next);
                    $li.remove();
                }
            })
            // product slideshow
            .on('click', '.itemSlide li.itemSlideElement .delete', function(){
                var $wrapper = $(this).closest('.product');
                var selectedItemIds = $wrapper.data('selectedItemIds');
                if (selectedItemIds == null) {
                    selectedItemIds = $(this).closest('.product').find('li').map(function(i, e) {
                        return $(e).data('id')
                    }).toArray()
                }
                if (selectedItemIds.length <= 1) {
                    $(this).closest('.itemSlide').remove();
                } else {
                    var $li = $(this).closest('.itemSlideElement');
                    var removingId = $li.data('id');
                    var next = selectedItemIds.filter(function(sid) { return sid !== removingId });
                    $wrapper.data('selectedItemIds', next);
                    $li.remove();
                }
            })
            .on('click', '.product .delete-slideshow', function(){
                $(this).closest('.product').remove();
            });
            /*
            Whitelabel V2 Stuff END
            */
        } else {
        }

        $(window).on('resize', $.proxy(this, 'positionButtons', null));
    };

    /**
     * Return editor instance
     *
     * @return {object} MediumEditor
     */

    Core.prototype.getEditor = function () {
        return this.options.editor;
    };

    /**
     * Extend editor's serialize function
     *
     * @return {object} Serialized data
     */

    Core.prototype.editorSerialize = function () {
        var data = this._serialize();

        $.each(data, function (key) {
            var $data = $('<div />').html(data[key].value);

            $data.find('.medium-insert-buttons').remove();
            $data.find('.medium-insert-active').removeClass('medium-insert-active');

            // Restore original embed code from embed wrapper attribute value.
            $data.find('[data-embed-code]').each(function () {
                var $this = $(this),
                    html = $('<div />').html($this.attr('data-embed-code')).text();
                $this.html(html);
            });

            data[key].value = $data.html();
        });

        return data;
    };

    /**
     * Extend editor's destroy function to deactivate this plugin too
     *
     * @return {void}
     */

    Core.prototype.editorDestroy = function () {
        $.each(this.elements, function (key, el) {
            if ($(el).data('plugin_' + pluginName) instanceof Core) {
                $(el).data('plugin_' + pluginName).disable();
            }
        });

        this._destroy();
    };

    /**
     * Extend editor's setup function to activate this plugin too
     *
     * @return {void}
     */

    Core.prototype.editorSetup = function () {
        this._setup();

        $.each(this.elements, function (key, el) {
            if ($(el).data('plugin_' + pluginName) instanceof Core) {
                $(el).data('plugin_' + pluginName).enable();
            }
        });
    };

    /**
     * Extend editor's placeholder.updatePlaceholder function to show placeholder dispite of the plugin buttons
     *
     * @return {void}
     */

    Core.prototype.editorUpdatePlaceholder = function (el, dontShow) {
        var contents = $(el).children()
            .not('.medium-insert-buttons, iframe').contents();

        if (!dontShow && contents.length === 1 && contents[0].nodeName.toLowerCase() === 'br') {
            this.showPlaceholder(el);
            this.base._hideInsertButtons($(el));
        } else {
            this.hidePlaceholder(el);
        }
    };

    /**
     * Trigger editableInput on editor
     *
     * @return {void}
     */

    Core.prototype.triggerInput = function () {
        if (this.getEditor()) {
            this.getEditor().trigger('editableInput', null, this.el);
        }
    };

    /**
     * Deselects selected text
     *
     * @return {void}
     */

    Core.prototype.deselect = function () {
        document.getSelection().removeAllRanges();
    };

    /**
     * Disables the plugin
     *
     * @return {void}
     */

    Core.prototype.disable = function () {
        this.options.enabled = false;

        this.$el.find('.medium-insert-buttons').addClass('hide');
    };

    /**
     * Enables the plugin
     *
     * @return {void}
     */

    Core.prototype.enable = function () {
        this.options.enabled = true;

        this.$el.find('.medium-insert-buttons').removeClass('hide');
    };

    /**
     * Disables selectstart mousedown events on plugin elements except images
     *
     * @return {void}
     */

    Core.prototype.disableSelection = function (e) {
        var $el = $(e.target);

        if ($el.is('img') === false || $el.hasClass('medium-insert-buttons-show')) {
            e.preventDefault();
        }
    };

    /**
     * Initialize addons
     *
     * @return {void}
     */

    Core.prototype.initAddons = function () {
        var that = this;

        if (!this.options.addons || this.options.addons.length === 0) {
            return;
        }

        $.each(this.options.addons, function (addon, options) {
            var addonName = pluginName + ucfirst(addon);

            if (options === false) {
                delete that.options.addons[addon];
                return;
            }

            that.$el[addonName](options);
            that.options.addons[addon] = that.$el.data('plugin_' + addonName).options;
        });
    };

    /**
     * Cleans a content of the editor
     *
     * @return {void}
     */

    Core.prototype.clean = function () {
        var that = this,
            $buttons, $lastEl, $text;

        if (this.options.enabled === false) {
            return;
        }

        if (this.$el.children().length === 0) {
            this.$el.html(this.templates['src/js/templates/core-empty-line.hbs']().trim());
        }

        // Fix #29
        // Wrap content text in <p></p> to avoid Firefox problems
        $text = this.$el
            .contents()
            .filter(function () {
                return (this.nodeName === '#text' && $.trim($(this).text()) !== '') || this.nodeName.toLowerCase() === 'br';
            });

        $text.each(function () {
            $(this).wrap('<p />');

            // Fix #145
            // Move caret at the end of the element that's being wrapped
            that.moveCaret($(this).parent(), $(this).text().length);
        });

        this.addButtons();

        $buttons = this.$el.find('.medium-insert-buttons');
        $lastEl = $buttons.prev();
        if ($lastEl.attr('class') && $lastEl.attr('class').match(/medium\-insert(?!\-active)/)) {
            $buttons.before(this.templates['src/js/templates/core-empty-line.hbs']().trim());
        }
    };

    /**
     * Returns HTML template of buttons
     *
     * @return {string} HTML template of buttons
     */

    Core.prototype.getButtons = function () {
        if (this.options.enabled === false) {
            return;
        }
        var templateName;
        if (window.isWhitelabelV2) {
            templateName = 'src/js/templates/core-buttons-gear.hbs'
        } else {
            templateName = 'src/js/templates/core-buttons.hbs'
        }

        return this.templates[templateName]({
            addons: this.options.addons
        }).trim();
    };

    /**
     * Appends buttons at the end of the $el
     *
     * @return {void}
     */

    Core.prototype.addButtons = function () {
        if (this.$el.find('.medium-insert-buttons').length === 0) {
            var buttons = this.getButtons();
            if (this.$el.find('.gallery-container').length > 0) {
                buttons = $(buttons);
                if (!window.isWhitelabelV2) {
                    buttons.find('.gallery-insert-action').hide().end()
                }
                buttons = buttons.prop('outerHTML');
            } else {
                buttons = $(buttons).find('.gallery-insert-action').css('display', 'block').end().prop('outerHTML');
            }
            this.$el.append(buttons);
        }
    };

    /**
     * Move buttons to current active, empty paragraph and show them
     *
     * @return {void}
     */

    Core.prototype.toggleButtons = function (e) {
        var $el = $(e.target),
            selection = window.getSelection(),
            that = this,
            range, $current, $p, activeAddon;

        if (this.options.enabled === false) {
            return;
        }

        if (!selection || selection.rangeCount === 0) {
            $current = $el;
        } else {
            range = selection.getRangeAt(0);
            $current = $(range.commonAncestorContainer);
        }

        // When user clicks on  editor's placeholder in FF, $current el is editor itself, not the first paragraph as it should
        if ($current.hasClass('medium-editor-insert-plugin')) {
            $current = $current.find('p:first');
        }

        $p = $current.is('p') ? $current : $current.closest('p');

        this.clean();

        // console.log($el.hasClass('medium-editor-placeholder') === false)
        // console.log($el.closest('.medium-insert-buttons').length === 0)
        // console.log($current.closest('.medium-insert-buttons').length === 0)
        
        if (
            $el.hasClass('medium-editor-placeholder') === false &&
            $el.closest('.medium-insert-buttons').length === 0 && $current.closest('.medium-insert-buttons').length === 0) {

            this.$el.find('.medium-insert-active').removeClass('medium-insert-active');

            $.each(this.options.addons, function (addon) {
                if ($el.closest('.medium-insert-' + addon).length) {
                    $current = $el;
                }

                if ($current.closest('.medium-insert-' + addon).length) {
                    $p = $current.closest('.medium-insert-' + addon);
                    activeAddon = addon;
                    return;
                }
            });

            if ($p.length && ((/*$p.text().trim() === '' &&*/!activeAddon) || activeAddon === 'images')) {
                $p.addClass('medium-insert-active');

                if (activeAddon === 'images') {
                    this.$el.find('.medium-insert-buttons').attr('data-active-addon', activeAddon);
                } else {
                    this.$el.find('.medium-insert-buttons').removeAttr('data-active-addon');
                }

                // If buttons are displayed on addon paragraph, wait 100ms for possible captions to display
                setTimeout(function () {
                    that.positionButtons(activeAddon);
                    that.showButtons(activeAddon);
                }, activeAddon ? 100 : 0);
            } else {
                this.hideButtons();
            }
        }
    };

    /**
     * Show buttons
     *
     * @param {string} activeAddon - Name of active addon
     * @returns {void}
     */

    Core.prototype.showButtons = function (activeAddon) {
        var $buttons = this.$el.find('.medium-insert-buttons');

        $buttons.show();
        $buttons.find('li').show();

        if (activeAddon) {
            $buttons.find('li').hide();
            $buttons.find('button[data-addon="' + activeAddon + '"]').parent().show();
        }
    };

    /**
     * Hides buttons
     *
     * @param {jQuery} $el - Editor element
     * @returns {void}
     */

    Core.prototype.hideButtons = function ($el) {
        return; // #ARTICLE_MOD
        $el = $el || this.$el;

        $el.find('.medium-insert-buttons').hide();
        $el.find('.medium-insert-buttons-addons').hide();
        $el.find('.medium-insert-buttons-show').removeClass('medium-insert-buttons-rotate');
    };

    /**
     * Position buttons
     *
     * @param {string} activeAddon - Name of active addon
     * @return {void}
     */

    Core.prototype.positionButtons = function (activeAddon) {
        var $buttons = this.$el.find('.medium-insert-buttons'),
            $p = this.$el.find('.medium-insert-active'),
            $lastCaption = $p.hasClass('medium-insert-images-grid') ? [] : $p.find('figure:last figcaption'),
            elementsContainer = this.getEditor() ? this.getEditor().options.elementsContainer : $('body').get(0),
            elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1,
            position = { left: 75 }; // fixed 75px

        if ($p.length) {
            //position.left = $p.position().left;
            position.top = $p.position().top;

            if (activeAddon) {
                //position.left += $p.width() - $buttons.find('.medium-insert-buttons-show').width() - 10;
                position.top += $p.height() - 20 + ($lastCaption.length ? -$lastCaption.height() - parseInt($lastCaption.css('margin-top'), 10) : 10);
            } else {
                //position.left += -parseInt($buttons.find('.medium-insert-buttons-addons').css('left'), 10) - parseInt($buttons.find('.medium-insert-buttons-addons button:first').css('margin-left'), 10);
                position.top += parseInt($p.css('margin-top'), 10);
                position.top += parseInt($p.css('padding-top'), 10);
            }

            if (elementsContainerAbsolute) {
                position.top += elementsContainer.scrollTop;
            }

            //if (this.$el.hasClass('medium-editor-placeholder') === false && position.left < 0) {
            //    position.left = $p.position().left;
            //}

            $buttons.css(position);
        }
    };

    /**
     * Toggles addons buttons
     *
     * @return {void}
     */

    Core.prototype.toggleAddons = function () {
        if (this.$el.find('.medium-insert-buttons').attr('data-active-addon') === 'images') {
            this.$el.find('.medium-insert-buttons').find('button[data-addon="images"]').click();
            return;
        }

        //this.$el.find('.medium-insert-buttons-addons').fadeToggle(); // #ARTICLE_MOD
        //this.$el.find('.medium-insert-buttons-show').toggleClass('medium-insert-buttons-rotate'); // #ARTICLE_MOD
        this.$el.find('.add_option_tools').toggle(); // #ARTICLE_MOD
    };

    /**
     * Hide addons buttons
     *
     * @return {void}
     */

    Core.prototype.hideAddons = function () {
        this.$el.find('.medium-insert-buttons-addons').hide();
        this.$el.find('.medium-insert-buttons-show').removeClass('medium-insert-buttons-rotate');
    };

    /**
     * Call addon's action
     *
     * @param {Event} e
     * @return {void}
     */

    Core.prototype.addonAction = function (e) {
        var $a = $(e.currentTarget),
            addon = $a.data('addon'),
            action = $a.data('action'),
            meta = $a.data('meta');
        this.$el.data('plugin_' + pluginName + ucfirst(addon))[action](meta);
    };

    /**
     * Move caret at the beginning of the empty paragraph
     *
     * @param {jQuery} $el Element where to place the caret
     * @param {integer} position Position where to move caret. Default: 0
     *
     * @return {void}
     */

    Core.prototype.moveCaret = function ($el, position) {
        var range, sel, el, textEl;

        position = position || 0;
        range = document.createRange();
        sel = window.getSelection();
        el = $el.get(0);

        if (!el.childNodes.length) {
            textEl = document.createTextNode(' ');
            el.appendChild(textEl);
        }

        range.setStart(el.childNodes[0], position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    /**
     * Add caption
     *
     * @param {jQuery Element} $el
     * @param {string} placeholder
     * @return {void}
     */

    Core.prototype.addCaption = function ($el, placeholder, text) {
        var $caption = $el.find('figcaption');

        if ($caption.length === 0) {
            var $newCaption = $(this.templates['src/js/templates/core-caption.hbs']({
                placeholder: placeholder
            }));
            if (text) {
                $newCaption.removeAttr('data-placeholder');
                $newCaption.attr('class', '');
                $newCaption.text(text);
            }
            $el.append($newCaption);
        }
    };

    /**
     * Remove captions
     *
     * @param {jQuery Element} $ignore
     * @return {void}
     */

    Core.prototype.removeCaptions = function ($ignore) {
        var $captions = this.$el.find('figcaption');

        if ($ignore) {
            $captions = $captions.not($ignore);
        }

        $captions.each(function () {
            if ($(this).hasClass('medium-insert-caption-placeholder') || $(this).text().trim() === '') {
                $(this).remove();
            }
        });
    };

    /**
     * Remove caption placeholder
     *
     * @param {jQuery Element} $el
     * @return {void}
     */

    Core.prototype.removeCaptionPlaceholder = function ($el) {
        var $caption = $el.is('figcaption') ? $el : $el.find('figcaption');

        if ($caption.length) {
            $caption
                .removeClass('medium-insert-caption-placeholder')
                .removeAttr('data-placeholder');
        }
    };

    Core.prototype.migrateExistingContent = function migrateExistingContent($place) {
        if ($place.text().length > 0) { // ARTICLE_MOD: move text before $place
            var $cl = $place.clone();
            $cl.insertBefore($place);
            $cl.removeClass('medium-insert-active');
            $place.html('');
        }
    };

    /** Plugin initialization */

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            var that = this,
                textareaId;

            if ($(that).is('textarea')) {
                textareaId = $(that).attr('medium-editor-textarea-id');
                that = $(that).siblings('[medium-editor-textarea-id="' + textareaId + '"]').get(0);
            }

            if (!$.data(that, 'plugin_' + pluginName)) {
                // Plugin initialization
                $.data(that, 'plugin_' + pluginName, new Core(that, options));
                $.data(that, 'plugin_' + pluginName).init();
            } else if (typeof options === 'string' && $.data(that, 'plugin_' + pluginName)[options]) {
                // Method call
                $.data(that, 'plugin_' + pluginName)[options]();
            }
        });
    };

})(jQuery, window, document);

; (function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Embeds', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-youtube-play"></span>',
            placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter',
            oembedProxy: 'https://medium.iframe.ly/api/oembed?iframe=1',
            captions: true,
            captionPlaceholder: 'Type caption (optional)',
            storeMeta: false,
            styles: {
                wide: {
                    label: '<span class="fa fa-align-justify"></span>'
                    // added: function ($el) {},
                    // removed: function ($el) {}
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>'
                    // added: function ($el) {},
                    // removed: function ($el) {}
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>'
                    // added: function ($el) {},
                    // removed: function ($el) {}
                }
            },
            actions: {
                remove: {
                    label: '<span class="fa fa-times"></span>',
                    clicked: function () {
                        var $event = $.Event('keydown');

                        $event.which = 8;
                        $(document).trigger($event);
                    }
                }
            },
            parseOnPaste: false
        };

    /**
     * Embeds object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Embeds(el, options) {
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;
        this.core = this.$el.data('plugin_' + pluginName);

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        // Extend editor's functions
        if (this.core.getEditor()) {
            this.core.getEditor()._serializePreEmbeds = this.core.getEditor().serialize;
            this.core.getEditor().serialize = this.editorSerialize;
        }

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Embeds.prototype.init = function () {
        var $embeds = this.$el.find('.medium-insert-embeds');

        $embeds.attr('contenteditable', false);
        $embeds.each(function () {
            if ($(this).find('.medium-insert-embeds-overlay').length === 0) {
                $(this).append($('<div />').addClass('medium-insert-embeds-overlay'));
            }
        });

        this.events();
        this.backwardsCompatibility();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Embeds.prototype.events = function () {
        $(document)
            .on('click', $.proxy(this, 'unselectEmbed'))
            .on('keydown', $.proxy(this, 'removeEmbed'))
            .on('click', '.medium-insert-embeds-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'))
            .on('click', '.medium-insert-embeds-toolbar2 .medium-editor-action', $.proxy(this, 'toolbar2Action'));

        this.$el
            .on('keyup click paste', $.proxy(this, 'togglePlaceholder'))
            .on('keydown', $.proxy(this, 'processLink'))
            .on('click', '.medium-insert-embeds-overlay', $.proxy(this, 'selectEmbed'))
            .on('contextmenu', '.medium-insert-embeds-placeholder', $.proxy(this, 'fixRightClickOnPlaceholder'));

        if (this.options.parseOnPaste) {
            this.$el
                .on('paste', $.proxy(this, 'processPasted'));
        }

        $(window)
            .on('resize', $.proxy(this, 'autoRepositionToolbars'));
    };

    /**
     * Replace v0.* class names with new ones, wrap embedded content to new structure
     *
     * @return {void}
     */

    Embeds.prototype.backwardsCompatibility = function () {
        var that = this;

        this.$el.find('.mediumInsert-embeds')
            .removeClass('mediumInsert-embeds')
            .addClass('medium-insert-embeds');

        this.$el.find('.medium-insert-embeds').each(function () {
            if ($(this).find('.medium-insert-embed').length === 0) {
                $(this).after(that.templates['src/js/templates/embeds-wrapper.hbs']({
                    html: $(this).html()
                }));
                $(this).remove();
            }
        });
    };

    /**
     * Extend editor's serialize function
     *
     * @return {object} Serialized data
     */

    Embeds.prototype.editorSerialize = function () {
        var data = this._serializePreEmbeds();

        $.each(data, function (key) {
            var $data = $('<div />').html(data[key].value);

            $data.find('.medium-insert-embeds').removeAttr('contenteditable');
            $data.find('.medium-insert-embeds-overlay').remove();

            data[key].value = $data.html();
        });

        return data;
    };

    /**
     * Add embedded element
     *
     * @return {void}
     */

    Embeds.prototype.add = function () {
        var $place = this.$el.find('.medium-insert-active');

        // Fix #132
        // Make sure that the content of the paragraph is empty and <br> is wrapped in <p></p> to avoid Firefox problems
        $place.html(this.templates['src/js/templates/core-empty-line.hbs']().trim());

        // Replace paragraph with div to prevent #124 issue with pasting in Chrome,
        // because medium editor wraps inserted content into paragraph and paragraphs can't be nested
        if ($place.is('p')) {
            $place.replaceWith('<div class="medium-insert-active">' + $place.html() + '</div>');
            $place = this.$el.find('.medium-insert-active');
            this.core.moveCaret($place);
        }

        $place.addClass('medium-insert-embeds medium-insert-embeds-input medium-insert-embeds-active');

        this.togglePlaceholder({ target: $place.get(0) });

        $place.click();
        this.core.hideButtons();
    };

    /**
     * Toggles placeholder
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.togglePlaceholder = function (e) {
        var $place = $(e.target),
            selection = window.getSelection(),
            range, $current, text;

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        range = selection.getRangeAt(0);
        $current = $(range.commonAncestorContainer);

        if ($current.hasClass('medium-insert-embeds-active')) {
            $place = $current;
        } else if ($current.closest('.medium-insert-embeds-active').length) {
            $place = $current.closest('.medium-insert-embeds-active');
        }

        if ($place.hasClass('medium-insert-embeds-active')) {

            text = $place.text().trim();

            if (text === '' && $place.hasClass('medium-insert-embeds-placeholder') === false) {
                $place
                    .addClass('medium-insert-embeds-placeholder')
                    .attr('data-placeholder', this.options.placeholder);
            } else if (text !== '' && $place.hasClass('medium-insert-embeds-placeholder')) {
                $place
                    .removeClass('medium-insert-embeds-placeholder')
                    .removeAttr('data-placeholder');
            }

        } else {
            this.$el.find('.medium-insert-embeds-active').remove();
        }
    };

    /**
     * Right click on placeholder in Chrome selects whole line. Fix this by placing caret at the end of line
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.fixRightClickOnPlaceholder = function (e) {
        this.core.moveCaret($(e.target));
    };

    /**
     * Process link
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.processLink = function (e) {
        var $place = this.$el.find('.medium-insert-embeds-active'),
            url;

        if (!$place.length) {
            return;
        }

        url = $place.text().trim();

        // Return empty placeholder on backspace, delete or enter
        if (url === '' && [8, 46, 13].indexOf(e.which) !== -1) {
            $place.remove();
            return;
        }

        if (e.which === 13) {
            e.preventDefault();
            e.stopPropagation();

            if (this.options.oembedProxy) {
                this.oembed(url);
            } else {
                this.parseUrl(url);
            }
        }
    };

    /**
     * Process Pasted
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.processPasted = function (e) {
        var pastedUrl, linkRegEx;
        if ($(".medium-insert-embeds-active").length) {
            return;
        }

        pastedUrl = e.originalEvent.clipboardData.getData('text');
        linkRegEx = new RegExp('^(http(s?):)?\/\/','i');
        if (linkRegEx.test(pastedUrl)) {
            if (this.options.oembedProxy) {
                this.oembed(pastedUrl, true);
            } else {
                this.parseUrl(pastedUrl, true);
            }
        }
    };

    /**
     * Get HTML via oEmbed proxy
     *
     * @param {string} url
     * @return {void}
     */

    Embeds.prototype.oembed = function (url, pasted) {
        var that = this;

        $.support.cors = true;

        $.ajax({
            crossDomain: true,
            cache: false,
            url: this.options.oembedProxy,
            dataType: 'json',
            data: {
                url: url
            },
            success: function (data) {
                var html = data && data.html;

                if (that.options.storeMeta) {
                    html += '<div class="medium-insert-embeds-meta"><script type="text/json">' + JSON.stringify(data) + '</script></div>';
                }

                if (data && !html && data.type === 'photo' && data.url) {
                    html = '<img src="' + data.url + '" alt="">';
                }

                if (!html) {
                    // Prevent render empty embed.
                    $.proxy(that, 'convertBadEmbed', url)();
                    return;
                }

                if (pasted) {
                    $.proxy(that, 'embed', html, url)();
                } else {
                    $.proxy(that, 'embed', html)();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var responseJSON = (function () {
                    try {
                        return JSON.parse(jqXHR.responseText);
                    } catch (e) { }
                })();

                if (typeof window.console !== 'undefined') {
                    window.console.log((responseJSON && responseJSON.error) || jqXHR.status || errorThrown.message);
                } else {
                    window.alert('Error requesting media from ' + that.options.oembedProxy + ' to insert: ' + errorThrown + ' (response status: ' + jqXHR.status + ')');
                }

                $.proxy(that, 'convertBadEmbed', url)();
            }
        });
    };

    /**
     * Get HTML using regexp
     *
     * @param {string} url
     * @param {bool} pasted
     * @return {void}
     */

    Embeds.prototype.parseUrl = function (url, pasted) {
        var html;

        if (!(new RegExp(['youtube', 'youtu.be', 'vimeo', 'instagram', 'twitter', 'facebook'].join('|')).test(url))) {
            $.proxy(this, 'convertBadEmbed', url)();
            return false;
        }

        html = url.replace(/\n?/g, '')
            .replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video video-youtube"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>')
            .replace(/^https?:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<div class="video video-vimeo"><iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')
            .replace(/^https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" align="center" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
            .replace(/^(https:\/\/www\.facebook\.com\/(.*))$/, '<script src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.2" async></script><div class="fb-post" data-href="$1"><div class="fb-xfbml-parse-ignore"><a href="$1">Loading Facebook post...</a></div></div>')
            .replace(/^https?:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');

        if (this.options.storeMeta) {
            html += '<div class="medium-insert-embeds-meta"><script type="text/json">' + JSON.stringify({}) + '</script></div>';
        }

        if ((/<("[^"]*"|'[^']*'|[^'">])*>/).test(html) === false) {
            $.proxy(this, 'convertBadEmbed', url)();
            return false;
        }

        if (pasted) {
            this.embed(html, url);
        } else {
            this.embed(html);
        }
    };

    /**
     * Add html to page
     *
     * @param {string} html
     * @param {string} pastedUrl
     * @return {void}
     */

    Embeds.prototype.embed = function (html, pastedUrl) {
        var $place = this.$el.find('.medium-insert-embeds-active'),
            $div;

        if (!html) {
            alert('Incorrect URL format specified');
            return false;
        } else {
            if (html.indexOf('</script>') > -1) {
                // Store embed code with <script> tag inside wrapper attribute value.
                // Make nice attribute value escaping using jQuery.
                $div = $('<div>')
                    .attr('data-embed-code', $('<div />').text(html).html())
                    .html(html);
                html = $('<div>').append($div).html();
            }

            if (pastedUrl) {
                // Get the element with the pasted url
                // place the embed template and remove the pasted text
                $place = this.$el.find(":not(iframe, script, style)")
                    .contents().filter(
                        function () {
                            return this.nodeType === 3 && this.textContent.indexOf(pastedUrl) > -1;
                        }).parent();

                $place.after(this.templates['src/js/templates/embeds-wrapper.hbs']({
                    html: html
                }));
                $place.text($place.text().replace(pastedUrl, ''));
            } else {
                $place.after(this.templates['src/js/templates/embeds-wrapper.hbs']({
                    html: html
                }));
                $place.remove();
            }


            this.core.triggerInput();

            if (html.indexOf('facebook') !== -1) {
                if (typeof (FB) !== 'undefined') {
                    setTimeout(function () {
                        FB.XFBML.parse();
                    }, 2000);
                }
            }
        }
    };

    /**
     * Convert bad oEmbed content to an actual line.
     * Instead of displaying the error message we convert the bad embed
     *
     * @param {string} content Bad content
     *
     * @return {void}
     */
    Embeds.prototype.convertBadEmbed = function (content) {
        var $place, $empty, $content,
            emptyTemplate = this.templates['src/js/templates/core-empty-line.hbs']().trim();

        $place = this.$el.find('.medium-insert-embeds-active');

        // convert embed node to an empty node and insert the bad embed inside
        $content = $(emptyTemplate);
        $place.before($content);
        $place.remove();
        $content.html(content);

        // add an new empty node right after to simulate Enter press
        $empty = $(emptyTemplate);
        $content.after($empty);

        this.core.triggerInput();

        this.core.moveCaret($empty);
    };

    /**
     * Select clicked embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.selectEmbed = function (e) {
        var that = this,
            $embed;
        if (this.core.options.enabled) {
            $embed = $(e.target).hasClass('medium-insert-embeds') ? $(e.target) : $(e.target).closest('.medium-insert-embeds');

            $embed.addClass('medium-insert-embeds-selected');

            setTimeout(function () {
                that.addToolbar();

                if (that.options.captions) {
                    that.core.addCaption($embed.find('figure'), that.options.captionPlaceholder);
                }
            }, 50);
        }
    };

    /**
     * Unselect selected embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.unselectEmbed = function (e) {
        var $el = $(e.target).hasClass('medium-insert-embeds') ? $(e.target) : $(e.target).closest('.medium-insert-embeds'),
            $embed = this.$el.find('.medium-insert-embeds-selected');

        if ($el.hasClass('medium-insert-embeds-selected')) {
            $embed.not($el).removeClass('medium-insert-embeds-selected');
            $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();
            this.core.removeCaptions($el.find('figcaption'));

            if ($(e.target).is('.medium-insert-caption-placeholder') || $(e.target).is('figcaption')) {
                $el.removeClass('medium-insert-embeds-selected');
                this.core.removeCaptionPlaceholder($el.find('figure'));
            }
            return;
        }

        $embed.removeClass('medium-insert-embeds-selected');
        $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

        if ($(e.target).is('.medium-insert-caption-placeholder')) {
            this.core.removeCaptionPlaceholder($el.find('figure'));
        } else if ($(e.target).is('figcaption') === false) {
            this.core.removeCaptions();
        }
    };

    /**
     * Remove embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.removeEmbed = function (e) {
        var $embed, $empty;

        if (e.which === 8 || e.which === 46) {
            $embed = this.$el.find('.medium-insert-embeds-selected');

            if ($embed.length) {
                e.preventDefault();

                $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

                $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                $embed.before($empty);
                $embed.remove();

                // Hide addons
                this.core.hideAddons();

                this.core.moveCaret($empty);
                this.core.triggerInput();
            }
        }
    };

    /**
     * Adds embed toolbar to editor
     *
     * @returns {void}
     */

    Embeds.prototype.addToolbar = function () {
        var $embed = this.$el.find('.medium-insert-embeds-selected'),
            active = false,
            $toolbar, $toolbar2, mediumEditor, toolbarContainer;

        if ($embed.length === 0) {
            return;
        }

        mediumEditor = this.core.getEditor();
        toolbarContainer = mediumEditor.options.elementsContainer || 'body';

        $(toolbarContainer).append(this.templates['src/js/templates/embeds-toolbar.hbs']({
            styles: this.options.styles,
            actions: this.options.actions
        }).trim());

        $toolbar = $('.medium-insert-embeds-toolbar');
        $toolbar2 = $('.medium-insert-embeds-toolbar2');

        $toolbar.find('button').each(function () {
            if ($embed.hasClass('medium-insert-embeds-' + $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }

        this.repositionToolbars();
        $toolbar.fadeIn();
        $toolbar2.fadeIn();
    };

    Embeds.prototype.autoRepositionToolbars = function () {
        setTimeout(function () {
            this.repositionToolbars();
            this.repositionToolbars();
        }.bind(this), 0);
    };

    Embeds.prototype.repositionToolbars = function () {
        var $toolbar = $('.medium-insert-embeds-toolbar'),
            $toolbar2 = $('.medium-insert-embeds-toolbar2'),
            $embed = this.$el.find('.medium-insert-embeds-selected'),
            elementsContainer = this.core.getEditor().options.elementsContainer,
            elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1,
            elementsContainerBoundary = elementsContainerAbsolute ? elementsContainer.getBoundingClientRect() : null,
            containerWidth = $(window).width(),
            position = {};

        if ($toolbar2.length) {
            position.top = $embed.offset().top + 2; // 2px - distance from a border
            position.left = $embed.offset().left + $embed.width() - $toolbar2.width() - 4; // 4px - distance from a border

            if (elementsContainerAbsolute) {
                position.top += elementsContainer.scrollTop - elementsContainerBoundary.top;
                position.left -= elementsContainerBoundary.left;
                containerWidth = $(elementsContainer).width();
            }

            if (position.left + $toolbar2.width() > containerWidth) {
                position.left = containerWidth - $toolbar2.width();
            }

            $toolbar2.css(position);
        }

        if ($toolbar.length) {
            position.left = $embed.offset().left + $embed.width() / 2 - $toolbar.width() / 2;
            position.top = $embed.offset().top - $toolbar.height() - 8 - 2 - 5; // 8px - hight of an arrow under toolbar, 2px - height of an embed outset, 5px - distance from an embed

            if (elementsContainerAbsolute) {
                position.top += elementsContainer.scrollTop - elementsContainerBoundary.top;
                position.left -= elementsContainerBoundary.left;
            }

            if (position.top < 0) {
                position.top = 0;
            }

            $toolbar.css(position);
        }
    };

    /**
     * Fires toolbar action
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.toolbarAction = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            $li = $button.closest('li'),
            $ul = $li.closest('ul'),
            $lis = $ul.find('li'),
            $embed = this.$el.find('.medium-insert-embeds-selected'),
            that = this;

        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

        $lis.find('button').each(function () {
            var className = 'medium-insert-embeds-' + $(this).data('action');

            if ($(this).hasClass('medium-editor-button-active')) {
                $embed.addClass(className);

                if (that.options.styles[$(this).data('action')].added) {
                    that.options.styles[$(this).data('action')].added($embed);
                }
            } else {
                $embed.removeClass(className);

                if (that.options.styles[$(this).data('action')].removed) {
                    that.options.styles[$(this).data('action')].removed($embed);
                }
            }
        });

        this.core.triggerInput();
    };

    /**
     * Fires toolbar2 action
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.toolbar2Action = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            callback = this.options.actions[$button.data('action')].clicked;

        if (callback) {
            callback(this.$el.find('.medium-insert-embeds-selected'));
        }

        this.core.triggerInput();
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Embeds(this, options));
            }
        });
    };

})(jQuery, window, document);

/*global MediumEditor*/

// #ARTICLE_MOD
var ImageModes = {
    Full: 'Full',
    Normal: 'Normal',
    Quoted: 'Quoted',
    Grid: 'Grid',
};
var ImageModesEditClasses = {
    Full: 'edit_full',
    Normal: 'edit_normal',
    Quoted: 'edit_with_quote'
};
var ImageModesClasses = {
    Full: 'mode-full',
    Normal: 'mode-normal',
    Quoted: 'mode-quoted',
    Grid: 'mode-grid',
};
var quotedPlaceHolderMsg = '“Start typing or paste article text...”';


; (function ($, window, document, Util, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Images', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-camera"></span>',
            deleteMethod: 'POST',
            deleteScript: 'delete.php',
            preview: true,
            captions: true,
            captionPlaceholder: 'Type caption for image (optional)',
            autoGrid: 3,
            fileUploadOptions: { // See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                url: null,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
            },
            fileDeleteOptions: {},
            styles: {
                wide: {
                    label: '<span class="fa fa-align-justify"></span>'
                    // added: function ($el) {},
                    // removed: function ($el) {}
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>'
                    // added: function ($el) {},
                    // removed: function ($el) {}
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>'
                    // added: function ($el) {},
                    // removed: function ($el) {}
                },
                grid: {
                    label: '<span class="fa fa-th"></span>'
                    // added: function ($el) {},
                    // removed: function ($el) {}
                }
            },
            actions: {
                remove: {
                    label: '<span class="fa fa-times"></span>',
                    clicked: function () {
                        var $event = $.Event('keydown');

                        $event.which = 8;
                        $(document).trigger($event);
                    }
                }
            },
            sorting: function () {
                var that = this;

                $('.medium-insert-images').sortable({
                    group: 'medium-insert-images',
                    containerSelector: '.medium-insert-images',
                    itemSelector: 'figure',
                    placeholder: '<figure class="placeholder">',
                    handle: 'img',
                    nested: false,
                    vertical: false,
                    afterMove: function () {
                        that.core.triggerInput();
                    }
                });
            },
            messages: {
                acceptFileTypesError: 'This file is not in a supported format: ',
                maxFileSizeError: 'This file is too big: '
            }
            // uploadError: function($el, data) {}
            // uploadCompleted: function ($el, data) {}
        };

    /**
     * Images object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Images(el, options) {
        this.el = el;
        this.$el = $(el);

        // this.mode = this.$el.attr('data-mode') || ImageModes.Normal; // #ARTICLE_MOD

        this.$currentImage = null;
        this.templates = window.MediumInsert.Templates;
        this.core = this.$el.data('plugin_' + pluginName);

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
        this.meta = null; // should be set as null after use

        // Allow image preview only in browsers, that support's that
        if (this.options.preview && !window.FileReader) {
            this.options.preview = false;
        }

        // Extend editor's functions
        if (this.core.getEditor()) {
            this.core.getEditor()._serializePreImages = this.core.getEditor().serialize;
            this.core.getEditor().serialize = this.editorSerialize;
        }

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    function getImageMode($image) {
        return $image.closest('figure').attr('data-mode');
    }

    Images.prototype.init = function () {
        var $images = this.$el.find('.medium-insert-images');

        $images.find('figcaption').attr('contenteditable', true);
        $images.find('figure').attr('contenteditable', false);

        this.events();
        this.backwardsCompatibility();
        this.sorting();
    };

    function changeMode($fig, prevMode, nextMode, tempCaptionCallback) {
        $fig.attr('class', '');
        $fig.addClass(ImageModesClasses[nextMode]);
        $fig.attr('data-mode', nextMode);
        $fig.attr('contenteditable', 'false');
        var $caption = $fig.find('figcaption');
        var tempCaption = '';
        if ($caption.text().trim() !== '') {
            tempCaption = $caption.text();
        } else if (prevMode === ImageModes.Quoted) {
            var quote = $fig.find('.textarea').text().trim();
            if (quote) {
                tempCaption = quote;
            }
        }

        //this.core.removeCaptions(); // DIDNT WORK
        if (tempCaption === '') {
            $fig.find('figcaption').remove();
        }

        // Process figure when quote mode is related
        if (nextMode === ImageModes.Quoted) {
            $fig.find('figcaption').remove();
            $fig.find('img')
                .wrap('<p />')
                .wrap('<span class="image" />');
            $fig
                .append('<p contenteditable="true" class="textarea" data-changed="false">' + quotedPlaceHolderMsg + '</p>');
            if (tempCaption) {
                $fig.find('.textarea')
                    .text(tempCaption)
                    .attr('data-changed', 'true');
            }
        } else if (prevMode === ImageModes.Quoted) {
            var $img = $fig.find('img');
            $fig.html('');
            $fig.append($img);
            if (tempCaption) {
                tempCaptionCallback && tempCaptionCallback(tempCaption);
            }
        }
    }
    window.ReactMediumEditor__changeMode = changeMode;

    Images.prototype.handleModeChange = function (nextMode) {
        var prevMode = getImageMode(this.$currentImage);
        if (prevMode === nextMode) { // no change in mode
            return;
        }
        var $fig = this.$currentImage.closest('figure');
        changeMode($fig, prevMode, nextMode, (function(tempCaption) {
            this.core.addCaption($fig, this.options.captionPlaceholder, tempCaption);
        }).bind(this));
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Images.prototype.events = function () {
        $(document)
            .on('click', $.proxy(this, 'unselectImage'))
            .on('keydown', $.proxy(this, 'removeImage'))
            .on('click', '.medium-insert-images.medium-insert-active .remove', (function(event) {
                event.preventDefault();
                var fig = $(event.currentTarget).closest('.medium-insert-images figure');
                fig.remove();
            }).bind(this))
            // Toolbar buttons.
            .on('click', '.medium-insert-images-toolbar .edit_full', (function(event) {
                this.handleModeChange(ImageModes.Full);
            }).bind(this))
            .on('click', '.medium-insert-images-toolbar .edit_normal', (function(event) {
                this.handleModeChange(ImageModes.Normal);
            }).bind(this))
            .on('click', '.medium-insert-images-toolbar .edit_with_quote', (function(event) {
                this.handleModeChange(ImageModes.Quoted);
            }).bind(this))
            // For serialization
            .on('change', '.medium-insert-images figure textarea', (function(event) {
                var $target = $(event.target);
                $target.text($target.val());
            }).bind(this))

            .on('focusin', '.medium-editor-insert-plugin .medium-insert-images', function(event){
                var el = event.target;
                if (event.target.className === 'textarea') {
                    if (el.getAttribute('data-changed') === 'false') {
                        el.textContent = '';
                    }
                    $('.description.more').attr('data-disable-toolbar', 'true');
                }
            })
            .on('keydown', '.medium-editor-insert-plugin .medium-insert-images', function(event){
                var el = event.target;
                if (event.target.className === 'textarea') {
                    if (el.getAttribute('data-changed') !== 'true') {
                        el.setAttribute('data-changed', 'true');
                    }
                }
            })
            .on('focusout', '.medium-editor-insert-plugin .medium-insert-images', function(event){
                var el = event.target;
                if (el.className === 'textarea') {
                    $('.description.more').attr('data-disable-toolbar', null);
                    if (el.textContent.trim() === '') {
                        el.textContent = quotedPlaceHolderMsg;
                        el.setAttribute('data-changed', 'false');
                    }
                }
            })
            .on('click', '.medium-insert-images .grid .btn-caption', function(e) {
                var epochId = 'gridimage-' + String(+new Date);
                var popup = $.dialog('insert_caption');
                var $grid = $(this).closest('.grid');
                $grid.attr('id', epochId);
                var src = $grid.find('img').attr('data-src');
                popup.$obj.find('.figure img').attr('src', src);
                popup.$obj.data('workingImage', epochId);
                var caption = $grid.find('figcaption').text();
                popup.$obj.find('textarea').val(caption);
                popup.$obj.data('original', caption);
                popup.open();
                return false;
            })
            .on('click', '.popup.insert_caption .btn-save', function() {
                var popup = $.dialog('insert_caption');
                var epochId = popup.$obj.data('workingImage');
                var original = popup.$obj.data('original');
                var next = popup.$obj.find('textarea').val();
                var $wrapper = $('#' + epochId);
                var $cap = $wrapper.find('figcaption');
                if (next !== original) {
                    if ($cap.length === 0) {
                        $cap = $('<figcaption contenteditable="true" class="text-placeholder" data-placeholder="Type caption for image (optional)" />');
                        $wrapper.append($cap);
                    }
                    $cap.text(next);
                }
                if ($cap.text() !== '') {
                    $wrapper.find('.btn-caption').text('Edit Caption');
                } else {
                    $wrapper.find('.btn-caption').text('Add Caption');
                }
                popup.close();
                return false;
            })
            .on('click', '.popup.insert_caption .btn-remove', function() {
                var popup = $.dialog('insert_caption');
                var epochId = popup.$obj.data('workingImage');
                var $wrapper = $('#' + epochId);
                $wrapper.find('figcaption').text('')
                $wrapper.find('.btn-caption').text('Add Caption');
                popup.close();
                return false;
            })
        this.$el
            .on('click', '.medium-insert-images img', $.proxy(this, 'selectImage'));

        $(window)
            .on('resize', $.proxy(this, 'autoRepositionToolbars'));
    };

    /**
     * Replace v0.* class names with new ones
     *
     * @return {void}
     */

    Images.prototype.backwardsCompatibility = function () {
        this.$el.find('.mediumInsert')
            .removeClass('mediumInsert')
            .addClass('medium-insert-images');

        this.$el.find('.medium-insert-images.small')
            .removeClass('small')
            .addClass('medium-insert-images-left');
    };

    /**
     * Extend editor's serialize function
     *
     * @return {object} Serialized data
     */

    Images.prototype.editorSerialize = function () {
        var data = this._serializePreImages();

        $.each(data, function (key) {
            var $data = $('<div />').html(data[key].value);

            $data.find('.medium-insert-images').find('figcaption, figure').removeAttr('contenteditable');
            $data.find('.medium-insert-images-progress').remove();

            data[key].value = $data.html();
        });

        return data;
    };

    /**
     * Add image
     *
     * @return {void}
     */

    Images.prototype.add = function (meta) {
        var that = this,
            $file = $(this.templates['src/js/templates/images-fileupload.hbs']()),
            fileUploadOptions = {
                dataType: 'json',
                add: function (e, data) {
                    $.proxy(that, 'uploadAdd', e, data)();
                },
                done: function (e, data) {
                    $.proxy(that, 'uploadDone', e, data)();
                }
            };
        if (meta) {
            this.meta = meta;
        }

        // Only add progress callbacks for browsers that support XHR2,
        // and test for XHR2 per:
        // http://stackoverflow.com/questions/6767887/
        // what-is-the-best-way-to-check-for-xhr2-file-upload-support
        if (new XMLHttpRequest().upload) {
            fileUploadOptions.progress = function (e, data) {
                $.proxy(that, 'uploadProgress', e, data)();
            };

            fileUploadOptions.progressall = function (e, data) {
                $.proxy(that, 'uploadProgressall', e, data)();
            };
        }

        $file.fileupload($.extend(true, {}, this.options.fileUploadOptions, fileUploadOptions));

        $file.click();
    };

    /**
     * Callback invoked as soon as files are added to the fileupload widget - via file input selection, drag & drop or add API call.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#add
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadAdd = function (e, data) {
        var $place = this.$el.find('.medium-insert-active'),
            that = this,
            uploadErrors = [],
            file = data.files[0],
            acceptFileTypes = this.options.fileUploadOptions.acceptFileTypes,
            maxFileSize = this.options.fileUploadOptions.maxFileSize,
            reader;

        if (acceptFileTypes && !acceptFileTypes.test(file.type)) {
            uploadErrors.push(this.options.messages.acceptFileTypesError + file.name);
        } else if (maxFileSize && file.size > maxFileSize) {
            uploadErrors.push(this.options.messages.maxFileSizeError + file.name);
        }
        if (uploadErrors.length > 0) {
            if (this.options.uploadFailed && typeof this.options.uploadFailed === "function") {
                this.options.uploadFailed(uploadErrors, data);

                return;
            }

            alert(uploadErrors.join("\n"));

            return;
        }

        this.core.hideButtons();

        // Replace paragraph with div, because figure elements can't be inside paragraph
        if ($place.is('p')) {
            this.core.migrateExistingContent($place);
            $place.replaceWith('<div class="medium-insert-active">' + $place.html() + '</div>');
            $place = this.$el.find('.medium-insert-active');
            if ($place.next().is('p')) {
                this.core.moveCaret($place.next());
            } else {
                $place.after('<p><br></p>'); // add empty paragraph so we can move the caret to the next line.
                this.core.moveCaret($place.next());
            }
        }

        $place.addClass('medium-insert-images');

        if (this.options.preview === false && $place.find('progress').length === 0 && (new XMLHttpRequest().upload)) {
            $place.append(this.templates['src/js/templates/images-progressbar.hbs']());
        }

        if (data.autoUpload || (data.autoUpload !== false && $(e.target).fileupload('option', 'autoUpload'))) {
            data.process().done(function () {
                // If preview is set to true, let the showImage handle the upload start
                if (that.options.preview) {
                    reader = new FileReader();

                    reader.onload = function (e) {
                        $.proxy(that, 'showImage', e.target.result, data)();
                    };

                    reader.readAsDataURL(data.files[0]);
                } else {
                    data.submit();
                }
            });
        }
    };

    /**
     * Callback for global upload progress events
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#progressall
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadProgressall = function (e, data) {
        var progress, $progressbar;

        if (this.options.preview === false) {
            progress = parseInt(data.loaded / data.total * 100, 10);
            $progressbar = this.$el.find('.medium-insert-active').find('progress');

            $progressbar
                .attr('value', progress)
                .text(progress);

            if (progress === 100) {
                $progressbar.remove();
            }
        }
    };

    /**
     * Callback for upload progress events.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#progress
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadProgress = function (e, data) {
        var progress, $progressbar;

        if (this.options.preview) {
            progress = 100 - parseInt(data.loaded / data.total * 100, 10);
            $progressbar = data.context.find('.medium-insert-images-progress');

            $progressbar.css('width', progress + '%');

            if (progress === 0) {
                $progressbar.remove();
            }
        }
    };

    /**
     * Callback for successful upload requests.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#done
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadDone = function (e, data) {
        $.proxy(this, 'showImage', data.result.image_url, data, { uiid: data.result.id })(); // #ARTICLE_MOD

        this.core.clean();
        this.sorting();
    };

    /**
     * Add uploaded / preview image to DOM
     *
     * @param {string} img
     * @returns {void}
     */

    Images.prototype.showImage = function (img, data, additionals) { // #ARTICLE_MOD
        window.__SECRET__ = window.__SECRET__ || {}; // #ARTICLE_MOD
        window.__SECRET__.data = data; // #ARTICLE_MOD // TODO: fix data sharing somehow
        var $place = this.$el.find('.medium-insert-active'),
            domImage,
            that;

        // Hide editor's placeholder
        $place.click();

        // If preview is allowed and preview image already exists,
        // replace it with uploaded image
        that = this;
        var isGrid = (this.options.autoGrid && $place.find('figure').length >= this.options.autoGrid) || this.meta && this.meta.type === 'grid';

        if (this.options.preview && data.context) {
            domImage = this.getDOMImage();
            domImage.onload = (function () {
                var attr;
                if (isGrid) {
                    attr = 'data-src'
                } else {
                    attr = 'src'
                }
                data.context.find('img').attr(attr, img);

                if (this.options.uploadCompleted) {
                    this.options.uploadCompleted(data.context, data);
                }

                that.core.triggerInput();
            }).bind(this);
            if (isGrid) {
                domImage.src = window.blankUrl;
                $(domImage).css('background-image', 'url(' + img + ')');
            } else {
                domImage.src = img;
            }
        } else {
            var expanded;
            if (isGrid) {
                expanded = $(this.templates['src/js/templates/images-grid-each.hbs']({
                    img: img,
                    progress: this.options.preview
                }));
                if ($place.find('figure').length === 0) {
                    $place.append('<figure />')
                }
                data.context = expanded.appendTo($place.find('figure'));
                $place.find('figure').attr('data-mode', ImageModes.Grid);
            } else {
                expanded = $(this.templates['src/js/templates/images-image.hbs']({
                    img: img,
                    progress: this.options.preview
                }));
                data.context = expanded.appendTo($place);
                data.context.attr('data-mode', ImageModes.Normal);
            }

            var $img = data.context.find('img');
            if (additionals && additionals.uiid) {
                $img.attr('data-uiid', additionals.uiid); // #ARTICLE_MOD - Add ui.id for future use
            }

            $place.find('br').remove();

            if (isGrid) {
                $.each(this.options.styles, function (style, options) {
                    var className = 'medium-insert-images-' + style;

                    $place.removeClass(className);

                    if (options.removed) {
                        options.removed($place);
                    }
                });

                if (!window.isWhitelabelV2) {
                    $place.addClass('medium-insert-images-grid');
                }

                if (this.options.styles.grid.added) {
                    this.options.styles.grid.added($place);
                }
            }

            if (this.options.preview) {
                data.submit();
            } else if (this.options.uploadCompleted) {
                this.options.uploadCompleted(data.context, data);
            }
        }

        this.core.triggerInput();

        return data.context;
    };

    Images.prototype.getDOMImage = function () {
        return new window.Image();
    };

    /**
     * Select clicked image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.selectImage = function (e) {
        var that = this,
            $image;
        
        if (this.core.options.enabled) {
            $image = $(e.target);
            var isGrid = $image.closest('.grid').length > 0;
            this.$currentImage = $image;

            // Hide keyboard on mobile devices
            this.$el.blur();

            $image.addClass('medium-insert-image-active');
            $image.closest('.medium-insert-images').addClass('medium-insert-active');

            if (!isGrid) {
                $(`<a href="#" class="remove">Remove</a>`).insertAfter($image)
            }   

            setTimeout(function () {
                if (isGrid) {
                    if (that.options.captions) {
                        var $gridEach = $image.closest('div.grid');
                        // if ($gridEach.find('figcaption').length === 0) {
                        //     $gridEach.append('<figcaption contenteditable="true" class="medium-insert-caption-placeholder text-placeholder" data-placeholder="Type caption for image (optional)" />')
                        // }
                    }
                } else {
                    that.addToolbar();

                    if (that.options.captions && getImageMode(that.$currentImage) !== ImageModes.Quoted) {
                        that.core.addCaption($image.closest('figure'), that.options.captionPlaceholder);
                    }
                }
            }, 50);
        }
    };

    /**
     * Unselect selected image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.unselectImage = function (e) {
        if (this.$currentImage == null) {
            return;
        }
        var $el = $(e.target),
            $image = this.$el.find('.medium-insert-image-active');

        if ($el.is(this.$currentImage)) {
            return;
        }

        if ($el.is('img') && $el.hasClass('medium-insert-image-active')) {
            $image.not($el).removeClass('medium-insert-image-active');
            $('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();
            this.core.removeCaptions($el);
            return;
        }

        $image.removeClass('medium-insert-image-active');
        $image.parent().find('.remove').remove();
        $('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();

        if ($el.is('.medium-insert-caption-placeholder')) {
            this.core.removeCaptionPlaceholder($image.closest('figure'));
        } else if ($el.is('figcaption') === false) {
            if (this.$el.closest('figure').find('figcaption').text().trim()) {
                this.core.removeCaptions();
            }
        }
        this.$currentImage = null;
    };

    /**
     * Remove image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.removeImage = function (e) {
        var images = [],
            $selectedImage = this.$el.find('.medium-insert-image-active'),
            $parent, $empty, selection, range, current, caretPosition, $current, $sibling, selectedHtml, i;

        if (e.which === 8 || e.which === 46) {
            if ($selectedImage.length) {
                images.push($selectedImage);
            }

            // Remove image even if it's not selected, but backspace/del is pressed in text
            selection = window.getSelection();
            if (selection && selection.rangeCount) {
                range = selection.getRangeAt(0);
                current = range.commonAncestorContainer;
                $current = current.nodeName === '#text' ? $(current).parent() : $(current);
                caretPosition = MediumEditor.selection.getCaretOffsets(current).left;

                // Is backspace pressed and caret is at the beginning of a paragraph, get previous element
                if (e.which === 8 && caretPosition === 0) {
                    $sibling = $current.prev();
                // Is del pressed and caret is at the end of a paragraph, get next element
                } else if (e.which === 46 && caretPosition === $current.text().length) {
                    $sibling = $current.next();
                }

                if ($sibling && $sibling.hasClass('medium-insert-images')) {
                    images.push($sibling.find('img'));
                }

                // If text is selected, find images in the selection
                selectedHtml = MediumEditor.selection.getSelectionHtml(document);
                if (selectedHtml) {
                    $('<div></div>').html(selectedHtml).find('.medium-insert-images img').each(function () {
                        images.push($(this));
                    });
                }
            }

            if (images.length) {
                for (i = 0; i < images.length; i++) {
                    //this.deleteFile(images[i].attr('src')); // #ARTICLE_MOD

                    $parent = images[i].closest('.medium-insert-images');
                    images[i].closest('figure').remove();

                    if ($parent.find('figure').length === 0) {
                        $empty = $parent.next();
                        if ($empty.is('p') === false || $empty.text() !== '') {
                            $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                            $parent.before($empty);
                        }
                        $parent.remove();
                    }
                }

                // Hide addons
                this.core.hideAddons();
                if (!selectedHtml && $empty) {
                    e.preventDefault();
                    this.core.moveCaret($empty);
                }

                $('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();
                this.core.triggerInput();
            }
        }
    };

    /**
     * Makes ajax call to deleteScript
     *
     * @param {String} file File name
     * @returns {void}
     */

    Images.prototype.deleteFile = function (file) {
        if (this.options.deleteScript) {
            $.ajax($.extend(true, {}, {
                url: this.options.deleteScript,
                type: this.options.deleteMethod || 'POST',
                data: { file: file }
            }, this.options.fileDeleteOptions));
        }
    };

    /**
     * Adds image toolbar to editor
     *
     * @returns {void}
     */

    Images.prototype.addToolbar = function () {
        console.log('addToolbar')
        var $image = this.$el.find('.medium-insert-image-active'),
            $p = $image.closest('.medium-insert-images'),
            active = false,
            mediumEditor = this.core.getEditor(),
            toolbarContainer = mediumEditor.options.elementsContainer || 'body',
            $toolbar,
            $toolbar2;

        var $fig = $image.closest('figure');

        var $tpl = this.templates['src/js/templates/images-toolbar.hbs']({
            styles: this.options.styles,
            actions: this.options.actions,
        }).trim();

        $(toolbarContainer).append(
            $($tpl)
                .find('.' + ImageModesEditClasses[getImageMode($fig)]).addClass('selected')
                .end()
        );

        $toolbar = $('.medium-insert-images-toolbar');
        $toolbar2 = $('.medium-insert-images-toolbar2');

        $toolbar.find('button').each(function () {
            if ($p.hasClass('medium-insert-images-' + $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }

        this.repositionToolbars();

        $toolbar.fadeIn();
        $toolbar2.fadeIn();
    };

    Images.prototype.autoRepositionToolbars = function () {
        setTimeout(function () {
            this.repositionToolbars();
            this.repositionToolbars();
        }.bind(this), 0);
    };

    Images.prototype.repositionToolbars = function () {
        var $toolbar = $('.medium-insert-images-toolbar'),
            $toolbar2 = $('.medium-insert-images-toolbar2'),
            $image = this.$el.find('.medium-insert-image-active'),
            elementsContainer = this.core.getEditor().options.elementsContainer,
            elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1,
            elementsContainerBoundary = elementsContainerAbsolute ? elementsContainer.getBoundingClientRect() : null,
            containerWidth = $(window).width(),
            position = {};

        if ($toolbar2.length) {
            position.top = $image.offset().top + 2;
            position.left = $image.offset().left + $image.width() - $toolbar2.width() - 4; // 4px - distance from a border

            if (elementsContainerAbsolute) {
                position.top += elementsContainer.scrollTop - elementsContainerBoundary.top;
                position.left -= elementsContainerBoundary.left;
                containerWidth = $(elementsContainer).width();
            }

            if (position.left + $toolbar2.width() > containerWidth) {
                position.left = containerWidth - $toolbar2.width();
            }

            $toolbar2.css(position);
        }

        if ($toolbar.length) {
            if ($image.closest('.medium-insert-images-grid-active').length) {
                $image = $image.closest('.medium-insert-images-grid-active');
            }

            position.top = $image.offset().top - $toolbar.height() - 8 - 2 - 5; // 8px - hight of an arrow under toolbar, 2px - height of an image outset, 5px - distance from an image
            position.left = $image.offset().left + $image.width() / 2 - $toolbar.width() / 2;

            if (elementsContainerAbsolute) {
                position.top += elementsContainer.scrollTop - elementsContainerBoundary.top;
                position.left -= elementsContainerBoundary.left;
            }

            if (position.top < 0) {
                position.top = 0;
            }

            $toolbar.css(position);
        }
    };

    /**
     * Fires toolbar action
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.toolbarAction = function (e) {
        var that = this,
            $button, $li, $ul, $lis, $p;

        if (this.$currentImage === null) {
            return;
        }

        $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button');
        $li = $button.closest('li');
        $ul = $li.closest('ul');
        $lis = $ul.find('li');
        $p = this.$el.find('.medium-insert-active');

        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

        $lis.find('button').each(function () {
            var className = 'medium-insert-images-' + $(this).data('action');

            if ($(this).hasClass('medium-editor-button-active')) {
                $p.addClass(className);

                if (that.options.styles[$(this).data('action')].added) {
                    that.options.styles[$(this).data('action')].added($p);
                }
            } else {
                $p.removeClass(className);

                if (that.options.styles[$(this).data('action')].removed) {
                    that.options.styles[$(this).data('action')].removed($p);
                }
            }
        });

        this.core.hideButtons();

        this.core.triggerInput();
    };

    /**
     * Fires toolbar2 action
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.toolbar2Action = function (e) {
        var $button, callback;

        if (this.$currentImage === null) {
            return;
        }

        $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button');
        callback = this.options.actions[$button.data('action')].clicked;

        if (callback) {
            callback(this.$el.find('.medium-insert-image-active'));
        }

        this.core.hideButtons();

        this.core.triggerInput();
    };

    /**
     * Initialize sorting
     *
     * @returns {void}
     */

    Images.prototype.sorting = function () {
        $.proxy(this.options.sorting, this)();
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Images(this, options));
            }
        });
    };

})(jQuery, window, document, MediumEditor.util);

}));
