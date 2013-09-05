/*global define*/
define([
	"core/SpotTheDifferencePuzzle",
	"core/ShufflePuzzle"
], function (
	SpotTheDifferencePuzzle,
	ShufflePuzzle
) {

	"use strict";

	return function () {

		var that = this,
			puzzlesSolved,
			currentPuzzle,
			score,
			level,
			baseTime = 120,
			remainingTime,
			remainingTimeInterval;

		function ranOutOfTime() {
			console.log("weee, no more time!!!");
		}

		function startCountingDown() {
			remainingTimeInterval = setInterval(function () {
				remainingTime -= 1;
				that.serviceManager.getService("Renderer").updateTime();
				if (0 === remainingTime) {
					ranOutOfTime();
					clearInterval(remainingTimeInterval);
				}
			}, 1000);
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.init = function () {
			// Spot the difference puzzle
			this.serviceManager.setService(
				"SpotTheDifferencePuzzle",
				new SpotTheDifferencePuzzle()
			);

			// Shuffle puzzle
			this.serviceManager.setService(
				"ShufflePuzzle",
				new ShufflePuzzle()
			);
		};

		this.initPuzzle = function () {
			if (undefined !== currentPuzzle) {
				currentPuzzle.destruct();
			}
			if (0 === puzzlesSolved || 0 === puzzlesSolved % 2) {
				currentPuzzle = this.serviceManager.getService("SpotTheDifferencePuzzle").init();
			} else {
				currentPuzzle = this.serviceManager.getService("ShufflePuzzle").init();
			}
		};

		this.startNew = function (render) {
			score = 0;
			level = 1;
			puzzlesSolved = 0;
			remainingTime = baseTime + (level - 1) * 30;
			this.initPuzzle();

			if (true === render) {
				this.serviceManager.getService("Renderer").render(currentPuzzle);
				currentPuzzle.afterRender(startCountingDown, 0);
			}
		};

		this.nextPuzzle = function (render) {
			puzzlesSolved += 1;
			level = 1 + Math.floor(puzzlesSolved / 2);
			remainingTime = baseTime + (level - 1) * 30;

			this.initPuzzle();
			if (true === render) {
				this.serviceManager.getService("Renderer").render(currentPuzzle);
				clearInterval(remainingTimeInterval);
				currentPuzzle.afterRender(startCountingDown, 100);
			}
		};

		this.increaseScore = function (s) {
			score += s;
		};

		this.getMaximumX = function () {
			if (level <= 2) {
				return 3;
			}
			if (level <= 4) {
				return 4;
			}
			return 5;
		};

		this.getMaximumY = function () {
			if (level <= 2) {
				return 3;
			}
			if (level <= 4) {
				return 4;
			}
			return 5;
		};

		this.getDifferences = function () {
			if (level <= 2) {
				return 1;
			}
			if (level <= 4) {
				return 2;
			}
			return 3;
		};

		this.getShuffleComplexity = function () {
			return 8 + level * 2;
		};

		this.getRemainingTime = function () {
			return remainingTime;
		};

		this.formatTime = function (t) {
			var s, min, sec;
			min = Math.floor(t / 60);
			s = min < 10 ? "0" + min : min;
			s += ":";
			sec = t % 60;
			s += sec < 10 ? "0" + sec : sec;
			return s;
		};

		this.getScore = function () {
			return score;
		};

		this.getLevel = function () {
			return level;
		};

		this.getPuzzlesSolved = function () {
			return puzzlesSolved;
		};

	};

});