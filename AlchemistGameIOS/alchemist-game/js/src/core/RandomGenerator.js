/*global define*/
define([], function () {

	"use strict";

	return function () {

		var maximum, maximumX, maximumY,
			history = [], historyLimit = 5;

		function rotateHistory() {
			while (history.length > historyLimit) {
				history.shift();
			}
		}

		function existsInHistory(c) {
			var i;
			for (i = 0; i < history.length; i += 1) {
				if (c.x === history[i].x && c.y === history[i].y) {
					return true;
				}
			}
			return false;
		}

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.setMaximum = function (m) {
			maximum = m;
		};

		this.setMaximumX = function (x) {
			maximumX = x;
		};

		this.setMaximumY = function (y) {
			maximumY = y;
		};

		this.setHistoryLimit = function (l) {
			historyLimit = l;
		};

		this.generateInteger = function () {
			return getRandomInt(1, maximum);
		};
		
		this.generateIntegers = function (n) {
			if (n > maximum) {
				throw "Cannot generate that many random integers";
			}
			var integers = [], random;
			while (integers.length < n) {
				random = getRandomInt(1, maximum);
				if (-1 === integers.indexOf(random)) {
					integers.push(random);
				}
			}
			return integers;
		};

		this.generateCoordinate = function () {
			var c = {}, keepGoing = true;

			while (true === keepGoing) {
				c.x = getRandomInt(1, maximumX);
				c.y = getRandomInt(1, maximumY);
				if (false === existsInHistory(c)) {
					keepGoing = false;
				}
			}

			history.push(c);
			return c;
		};

		this.shuffleArray = function (arr) {
			var counter = arr.length, temp, index;

			// While there are elements in the array
			while (counter > 0) {
				// Pick a random index
				index = Math.floor(Math.random() * counter);

				// Decrease counter by 1
				counter -= 1;

				// And swap the last element with it
				temp = arr[counter];
				arr[counter] = arr[index];
				arr[index] = temp;
			}

			return arr;
		};

	};

});