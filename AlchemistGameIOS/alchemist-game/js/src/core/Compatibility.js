/*global define*/
define([], function () {

	"use strict";

	return function () {
		var isIOSFlag;

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.isIOS = function () {
			/*jslint browser:true */
			if (undefined === isIOSFlag) {
				isIOSFlag = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
			}
			return isIOSFlag;
		};
	};

});