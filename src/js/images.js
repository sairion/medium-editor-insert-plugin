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
        var that = this;
        $(document)
            .on('click', $.proxy(this, 'unselectImage'))
            .on('keydown', $.proxy(this, 'removeImage'))
            .on('click', '.medium-insert-images.medium-insert-active .remove', (function(event) {
                event.preventDefault();
                var $this = $(event.currentTarget);
                var $fig = $this.closest('.medium-insert-images figure');
                if ($fig.attr('data-mode') === ImageModes.Grid) {
                    $this.closest('.grid').remove();
                } else {
                    $fig.remove();
                }
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
            .on('load', '.popup.insert_caption .figure img', function() {
                $.dialog('insert_caption').center();
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
                if (caption) {
                    popup.$obj.find('.btn-remove').show()
                } else {
                    popup.$obj.find('.btn-remove').hide()
                }
                popup.open();
                return false;
            })
            .on('click', '.medium-insert-images .add_option_tools._grid a', function() {
                var action = $(this).data('action');
                var $wrapper = $(this).closest('.medium-insert-images');
                if (action === 'add') {
                    window.GalleryControl.uploadImages(function(nextImages) {
                        if (nextImages === false) {
                            alert('Failed to upload images, please try again'); return;
                        }
                        // TODO
                        nextImages.forEach(function (img) {
                            var $img = $(that.templates['src/js/templates/images-grid-each.hbs']({
                                img: img.image_url,
                                progress: false,
                                caption: '',
                            }));
                            $wrapper.find('figure').append($img);
                        });
                    })
                } else if (action === 'organize') {
                    var serialziedImages = $wrapper.find('.grid')
                        .map(function(i, e) {
                            return { id: i, url: $(e).find('img').data('src'), caption: $(e).find('figcaption').text() }
                        }).toArray();
                    organizeImageService.open(serialziedImages, function(organizedImages) {
                        $wrapper.find('div.grid').remove()
                        organizedImages.forEach(function(img) {
                            var $img = $(that.templates['src/js/templates/images-grid-each.hbs']({
                                img: img.url,
                                progress: false,
                                caption: img.caption,
                            }));
                            $wrapper.find('figure').append($img);
                        });
                    });
                } else if (action === 'delete') {
                    $wrapper.remove();
                }
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
            });

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
            $(domImage).one('load', (function () {
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
            }).bind(this));
            if (isGrid) {
                domImage.src = window.blankUrl;
                $(domImage).css('background-image', 'url(' + img + ')');
                if (img.indexOf('data:') === -1) {
                    $(domImage).attr('data-src', img);
                }
                $(domImage).load();
            } else {
                domImage.src = img;
            }
        } else {
            var expanded;
            if (isGrid) {
                expanded = $(this.templates['src/js/templates/images-grid-each.hbs']({
                    img: img,
                    progress: this.options.preview,
                    caption: '',
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
                if ($place.find('.add_option_tools').length === 0) {
                    var popup = this.templates['src/js/templates/images-grid-popup.hbs'];
                    $place.find('figure').prepend(popup);
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
        var $el;
        if (e) {
            $el = $(e.target);
        } else {
            $el = this.$currentImage.parent();
        }

        var $image = this.$el.find('.medium-insert-image-active');

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
        var $image = this.$el.find('.medium-insert-image-active'),
            $p = $image.closest('.medium-insert-images'),
            active = false,
            mediumEditor = this.core.getEditor(),
            toolbarContainer = mediumEditor.options.elementsContainer || 'body',
            $toolbar,
            $toolbar2;

        var $fig = $image.closest('figure');

        var templateName = window.isWhitelabelV2 ? 'src/js/templates/images-toolbar-gear.hbs' :  'src/js/templates/images-toolbar.hbs';
        var $tpl = this.templates[templateName]({
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
        this.core.getEditor().getExtensionByName('toolbar').hideToolbar();

        $toolbar.fadeIn();
        $toolbar2.fadeIn();
    };

    Images.prototype.autoRepositionToolbars = function () {
        setTimeout(function () {
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
