/*
    picla v0.1.0
    Copyright (c) 2016 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
*/

(function() {

	"use strict";

    // Constructor function to create image element 
    function ImageElement(elem, altText, width) {
        this.elem = elem; // Current image element
        this.altText = altText; // Element's alt text
        this.width = width; // Element's width
    }

    // Function to get class string of current image
    ImageElement.prototype.getClassString = function() {

        // Get array of classes applied to current element
        var classList = $(this.elem).attr('class').split(/\s+/);

        // Remove class 'picla' from the array
        classList = jQuery.grep(classList, function(value) {
            return value != 'picla';
        });

        // Generate class string for current image
        var classString = '';
        for (var i = 0; i < classList.length; i++) {
            classString += ' ' + classList[i];
        }

        return classString;
    };

    // Function to get source of current image
    ImageElement.prototype.getSrc = function() {
        return this.elem.src;
    };

    // Function to get parent element of current image
    ImageElement.prototype.getParent = function() {
        return this.elem.parentElement;
    };

    // Get all image elements with class of 'picla'
    var elements = $('img.picla');

    // Function to generate image labels for all image elements
    function generateImageLabel(imgElement) {
    	// Get parent element of image element 
        var parent = imgElement.getParent();

        // Create wrapper for image element to be rendered
        var wrapper = document.createElement('div');

        // Add default CSS to wrapper
        $(wrapper).css({
            'display': 'inline-block',
            'position': 'relative',
            'width': imgElement.width,
            'overflow': 'hidden'
        });

        // Add image element classes to the wrapper
        $(wrapper).addClass(imgElement.getClassString());

        // Create label element
        var label = document.createElement('div');
        $(label).css({
        	'position': 'absolute',
        	'bottom': 0,
        	'width': '100%',
        	'box-sizing': 'border-box'
        })
        $(label).text(imgElement.altText);

        // Create image element to be rendered
        var img = document.createElement('img');

        // Initialise rendered image element
        img.src = imgElement.getSrc();
        $(img).css('width', '100%');

        // Append generated image and label to wrapper
        wrapper.appendChild(img);
        wrapper.appendChild(label);

        // Replace original image element with wrapper
        parent.replaceChild(wrapper, imgElement.elem);
    };

    // Loop through all those elements and convert to a wrapper with attached image label
    for (var i = 0; i < elements.length; i++) {

        // Create new image element
        var imgElement = new ImageElement(elements[i], elements[i].alt, window.getComputedStyle(elements[i]).width);

        // Genrate image labels for all elements
     	generateImageLabel(imgElement);
    }
})();
