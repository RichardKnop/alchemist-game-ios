requirejs.config({
	"baseUrl": "js/src",
	"paths": {},
	"shim": {
		"vendor/hammer": {
			exports: "Hammer"
		},
		"vendor/rAF": {
			exports: "requestAnimationFrame"
		}
	}
});

requirejs(["app/main"]);