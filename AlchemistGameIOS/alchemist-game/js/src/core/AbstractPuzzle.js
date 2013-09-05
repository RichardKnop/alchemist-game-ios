/*global define*/
define([], function () {

	"use strict";

	return function () {

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.animateScore = function (current, increase) {
			/*jslint browser:true */
			if (0 === increase) {
				return;
			}

			var intervalId,
				start = current,
				stop = current + increase,
				score = document.getElementById("score");
			intervalId = setInterval(function () {
				start += 1;
				score.innerHTML = 'SCORE: ' + start;
				if (start === stop) {
					clearInterval(intervalId);
				}
			}, 20);
		};

		this.afterRenderCommon = function (currentScore, scoreIncrease) {
			this.animateScore(currentScore, scoreIncrease);
			this.serviceManager.getService("Game").increaseScore(scoreIncrease);
		};

	};

});