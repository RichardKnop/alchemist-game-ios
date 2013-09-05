define([
	"vendor/domReady",
	"core/Application",
	"vendor/hammer"
], function(
	domReady,
	Application
) {

	"use strict";

	domReady(function() {

		var application = new Application();
		application.run();
		
	});

});