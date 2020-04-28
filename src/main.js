const detector = new google_myanmar_tools.ZawgyiDetector();
const converter = new google_myanmar_tools.ZawgyiConverter();

/** 
 * Check the probablity of the input text being Zawgyi.
 * Treshold is 0.95
 * @param   {string} text     - Input text
 * @return          
 */
function isZawgyi(text) {
    if (text)
        return detector.getZawgyiProbability(text) > 0.95;
    else
        return false;
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
    const content = node.textContent;

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
    var node, textNodes = [], walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    while (node = walk.nextNode()) textNodes.push(node);
    return textNodes;
}

const textNodesUnderBody = getTextNodesUnder(document.body);
textNodesUnderBody.forEach(textNode => {
    replaceText(textNode);
})

// Monitor for new nodes
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(newNode => {
                var textNodes = getTextNodesUnder(newNode);
                textNodes.forEach(textNode => {
                    replaceText(textNode);
                });
            })
        }
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});