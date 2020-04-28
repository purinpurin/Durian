// ==UserScript==
// @name         Durian : Detect Zawgyi and convert it to Unicode
// @description  Durian is a userscript which detects Zawgyi texts in a webpage and convert them into Unicode compatible texts so that Unicode users can read texts written with Zawgyi.
// @namespace    https://github.com/purinpurin/Durian
// @version      0.1.0
// @author       Purin <acclotepho@gmail.com>
// @license      MIT
// @include        *
// @require      https://ajax.googleapis.com/ajax/libs/myanmar-tools/1.1.3/zawgyi_detector.js
// @require      https://ajax.googleapis.com/ajax/libs/myanmar-tools/1.1.3/zawgyi_converter.js
// @noframes
// @run-at      document-end
// ==/UserScript==

(function() {

    "use strict";

var detector = new google_myanmar_tools.ZawgyiDetector();
var converter = new google_myanmar_tools.ZawgyiConverter();

/** 
 * Check the probablity of the input text being Zawgyi.
 * Treshold is 0.95
 * @param   {string} text     - Input text
 * @return          
 */
function isZawgyi(text) {
    if (text) return detector.getZawgyiProbability(text) > 0.95;else return false;
}

/**
 * Replace Zawgyi texts with Unicode texts.
 * If the node contains more than just text (ex: it has child nodes),
 * call replaceText() on each of its children.
 *
 * @param  {Node} node    - The target DOM Node.
 * @return {void}         - Note: the emoji substitution is done inline.
 */
function replaceText(node) {
    var content = node.textContent;

    if (isZawgyi(content)) {
        node.textContent = converter.zawgyiToUnicode(content);
    }
}

/**
 * Get all text nodes under given element.
 * @param {Element} element         - Parent element that we want to filter for text nodes.
 * @returns {Node}                  - Text nodes
 */
function getTextNodesUnder(element) {
    var node,
        textNodes = [],
        walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    while (node = walk.nextNode()) {
        textNodes.push(node);
    }return textNodes;
}

var textNodesUnderBody = getTextNodesUnder(document.body);
textNodesUnderBody.forEach(function (textNode) {
    replaceText(textNode);
});

// Monitor for new nodes
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(function (newNode) {
                var textNodes = getTextNodesUnder(newNode);
                textNodes.forEach(function (textNode) {
                    replaceText(textNode);
                });
            });
        }
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});

})();