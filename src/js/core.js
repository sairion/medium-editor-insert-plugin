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
                t.showButtons()
            }, 350, this);
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
            .on('selectstart mousedown', '.medium-insert, .medium-insert-buttons', $.proxy(this, 'disableSelection'))
            .on('click', '.medium-insert-buttons-show', $.proxy(this, 'toggleAddons'))
            .on('click', '.medium-insert-action', $.proxy(this, 'addonAction'))
            .on('click', '.gallery-insert-action', (function(){ // #ARTICLE_MOD
                var $place = adjustCaretBeforeInsertWidget(this);
                window.gallery.renderTo($place);
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
            this.$el.on('keyup click', $.proxy(this, 'toggleButtons'));
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
                buttons = $(buttons).find('.gallery-insert-action').hide().end().prop('outerHTML');
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

        if ($el.hasClass('medium-editor-placeholder') === false && $el.closest('.medium-insert-buttons').length === 0 && $current.closest('.medium-insert-buttons').length === 0) {

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
