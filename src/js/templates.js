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

  return "<div class=\"grid\" contenteditable=\"false\">\n    <img src=\"/_ui/images/common/blank.gif\" data-src=\""
    + alias4(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"\" style=\"background-image:url('"
    + alias4(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "');\">\n    <a href=\"#\" class=\"remove\">Remove</a>\n    <a href=\"#\" class=\"btn-caption\">Add Caption</a>\n    <figcaption contenteditable=\"true\" class=\"text-placeholder\" data-placeholder=\"Type an image caption\">"
    + alias4(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data}) : helper)))
    + "</figcaption>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.progress : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-grid-popup.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<small contenteditable=\"false\" class=\"add_option_tools _grid\" style=\"display:none;\">\n    <a data-action=\"add\">Add images</a>\n    <a data-action=\"organize\">Organize images</a>\n    <a data-action=\"delete\">Delete Grid</a>\n</small>\n";
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

this["MediumInsert"]["Templates"]["src/js/templates/images-toolbar-gear.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"medium-insert-images-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <label class=\"label\">IMAGE STYLE</label>\n    <div class=\"editable_tools\">\n        <a class=\"edit_full\">Full</a>\n        <a class=\"edit_normal\">Normal</a>\n    </div>\n</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-toolbar.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"medium-insert-images-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <div class=\"editable_tools\">\n        <a class=\"edit_full\">Full</a>\n        <a class=\"edit_normal\">Normal</a>\n        <a class=\"edit_with_quote\">With Quote</a>\n    </div>\n</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/product-card.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul class=\"itemList product\" contenteditable=\"false\">\n  <% items.forEach(function(item, idx) { %>\n  <li class=\"itemListElement\" data-id=\"<%= item.id %>\" data-idx=\"<%= idx %>\">\n    <span class=\"figure <% if (item.image_fit_to_bounds) { %>fit<% } %>\">\n      <img src=\"/_ui/images/common/blank.gif\" style=\"background-image:url(<%= item.image %>)\">\n    </span>\n    <span class=\"figcaption\">\n      <span class=\"title\"><%= item.title %></span>\n      <% if (item.retail_price != null) { %>\n      <b class=\"price sales\">$<%= item.price %> <small class=\"before\">$<%= item.retail_price %></small></b>\n      <% } else { %>\n      <b class=\"price\">$<%= item.price %></b>\n      <% } %>\n    </span>\n    <a class=\"remove\">Remove</a>\n  </li>\n  <% }); %>\n  <small class=\"add_option_tools\" style=\"display:none;\">\n    <a class=\"add-product\">Organize Products</a>\n    <a class=\"delete-slideshow\">Delete Grid</a>\n  </small>\n</ul>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/product-slideshow.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"itemSlide product\" contenteditable=\"false\">\n  <div class=\"itemSlideWrap\">\n    <ul class=\"stream after\">\n      <% items.forEach(function(item, idx) { %>\n      <li class=\"itemSlideElement\" data-id=\"<%= item.id %>\" data-idx=\"<%= idx %>\">\n        <div class=\"figure-item\">\n          <figure <% if (item.image_fit_to_bounds) { %>class=\"fit\"<% } %>>\n            <a href=\"<% if (item.html_url) { %><%= item.html_url %><% } else { %>/sales/<%= item.id %>?utm=article<% } %>?utm=article\"><span\n                class=\"back\"></span><img class=\"figure\" src=\"/_ui/images/common/blank.gif\" style=\"background-image: url(<%= item.image %>);\"></a>\n          </figure>\n          <figcaption>\n            <span class=\"show_cart\">\n              <button class=\"btn-cart nopopup soldout\">\n                <% if (item.retail_price != null) { %><b class=\"price sales\">$<%= item.price %> <small class=\"before\">$<%= item.retail_price %></small></b><% } else { %><b class=\"price\">$<%= item.price %></b><% } %>\n              </button>\n            </span>\n            <a href=\"<%= item.html_url %>?utm=article\" class=\"title\"><%= item.title %></a>\n          </figcaption>\n          <a class=\"delete\"></a>\n        </div>\n      </li>\n      <% }); %>\n    </ul>\n  </div>\n  <a href=\"#\" class=\"prev\">Prev</a>\n  <a href=\"#\" class=\"next\">Next</a>\n  <small class=\"add_option_tools\" style=\"display:none;\">\n    <a class=\"add-product\">Organize Products</a>\n    <a class=\"delete-slideshow\">Delete Slideshow</a>\n  </small>\n</div>\n";
},"useData":true});