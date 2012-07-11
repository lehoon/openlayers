/**
 * @fileoverview Click Handler.
 *
 * Provides a class for listening to click events on a DOM element
 * and re-dispatching to a map instance.
 *
 * This handler has no default behaviour.
 */

goog.provide('ol.handler.Click');

goog.require('goog.asserts');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.Disposable');


/**
 * @constructor
 * @extends {goog.Disposable}
 * @param {ol.Map} map The map instance.
 * @param {Element} elt The element we listen to mousewheel on.
 * @param {Object} states An object for the handlers to share states.
 */
ol.handler.Click = function(map, elt, states) {
    goog.base(this);

    /**
     * @type {ol.Map}
     */
    this.map_ = map;

    /**
     * @type {Element}
     */
    this.elt_ = elt;

    /**
     * @type {Object}
     */
    this.states_ = states;

    goog.events.listen(this.elt_, goog.events.EventType.CLICK,
                       this.handleClick, undefined, this);
};
goog.inherits(ol.handler.Click, goog.Disposable);

/**
 * @inheritDoc
 */
ol.handler.Click.prototype.disposeInternal = function() {
    goog.events.unlisten(this.elt_, goog.events.EventType.CLICK,
                         this.handleClick, undefined, this);
};

/**
 * @param {goog.events.BrowserEvent} e
 */
ol.handler.Click.prototype.handleClick = function(e) {
    if (!this.states_.dragged) {
        goog.events.dispatchEvent(this.map_, e);
    }
};
