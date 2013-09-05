/*global define*/
define([], function () {

	"use strict";

	return function () {

		var that = this;

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.render = function (puzzle) {
			/*jslint browser:true */
			document.getElementById("wrapper").innerHTML = puzzle.getHTML();
		};

		this.updateTime = function () {
			/*jslint browser:true */
			var t, f;
			t = this.serviceManager.getService("Game").getRemainingTime();
			f = this.serviceManager.getService("Game").formatTime(t);
			document.getElementById("time").innerHTML = f;
		};

	};

});