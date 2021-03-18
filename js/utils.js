module.exports = class Utils {
	static getRandomFloat(min, max) {
		return Math.random() * (max - min) + min
	}
	static getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	static getRandomBool() {
		return Math.floor(Math.random() * 2) === 1
	}
	static getRandomItem(arr) {
		return arr[Utils.getRandomInt(0, arr.length - 1)]
	}
	static getWeightedAverage (valueA, weightA, valueB, weightB) {
		return (valueA * weightA + valueB * weightB) / (weightA + weightB)
	}
}