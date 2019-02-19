'use strict'

var test = "this is a test variable";

function myFunction() {
    return test;
}

// Adding smooth and realistic scrolling behaviour. 
$(function() {
    jQuery.scrollSpeed(100, 800);
});