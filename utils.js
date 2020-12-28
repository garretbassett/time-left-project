
// UTILITY FUNCTIONS

var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);

function eventAdder(selector, eventName, callback) {
    var targets = $$(selector) || [],
        targetsLength = targets.length;

    for (i = 0; i < targetsLength; i++) {
        targets[i].addEventListener(eventName, callback);
    }

    return targets;
}

function getWidthOf(element) {
    var rect = element.getBoundingClientRect();
    return rect.right - rect.left;
}