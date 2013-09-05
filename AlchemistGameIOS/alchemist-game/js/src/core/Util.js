/*global define*/
define([], function () {

	"use strict";

	return function () {

		var successSound,
			slideSound,
			soundtrack,
			isDisplayingTextMessage = false;

		this.setServiceManager = function (m) {
			this.serviceManager = m;
			if (false === this.serviceManager.getService("Compatibility").isIOS()) {
				if (undefined === successSound) {
					successSound = new Audio("sound/success.wav");
				}
				if (undefined === slideSound) {
					slideSound = new Audio("sound/slide.wav");
				}
				if (undefined === soundtrack) {
					soundtrack = new Audio("sound/soundtrack.wav");
				}
			}
		};

		this.startSoundtrack = function () {
			/*jslint browser:true */
			if (false === this.serviceManager.getService("Compatibility").isIOS()) {
				soundtrack.play();
				soundtrack.addEventListener('ended', function () {
					setTimeout(function () {
						soundtrack.currentTime = 0;
						soundtrack.play();
					}, 5000);
				}, false);
			} else {
				location.href = 'myApp://param=1';
			}
		};

		this.playSuccessSound = function () {
			/*jslint browser:true */
			if (false === this.serviceManager.getService("Compatibility").isIOS()) {
				successSound.currentTime = 0;
				successSound.play();
			} else {
				location.href = 'myApp://param=2';
			}
		};

		this.playSlideSound = function () {
			/*jslint browser:true */
			if (false === this.serviceManager.getService("Compatibility").isIOS()) {
				slideSound.currentTime = 0;
				slideSound.play();
			} else {
				location.href = 'myApp://param=3';
			}
		};
		
		this.removeClass = function (el, className) {
			var regex = new RegExp('\\b' + className + '\\b');
			el.className = el.className.replace(regex, "");
		};

		this.displayTextMessage = function (message, callback) {
			/*jslint browser:true */
			var textMessage, that = this;
			isDisplayingTextMessage = true;
			textMessage = document.getElementById("text-message");
			if (null === textMessage) {
				textMessage = document.createElement("div");
				textMessage.id = "text-message";
				textMessage.innerHTML = message;
				document.getElementsByClassName("container")[0].appendChild(textMessage);
			}
			textMessage.className += " animated fadeInDown";
			setTimeout(function () {
				textMessage.className += " fadeOutDown";
				setTimeout(function () {
					textMessage.parentNode.removeChild(textMessage);
					if (callback) {
						callback();
					}
					isDisplayingTextMessage = false;
				}, 1000);
			}, 1000);
		};

		this.isDisplayingTextMessage = function () {
			return isDisplayingTextMessage;
		};

	};

});