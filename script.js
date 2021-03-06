// wrapping the code with onload to execute JS immediately
window.onload = function () {
	//variables for slide animation time
	var slideDelay = 1.2; //the slides flow in every 1.2 seconds
	var slideDuration = 0.2;
    var slideCont = document.querySelector(".slides-inner")
	var slides = document.querySelectorAll(".slide");
	var prevButton = document.querySelector("#prevButton");
	var nextButton = document.querySelector("#nextButton");

	var numSlides = slides.length;

	//infinite slide rotation

	for (var i = 0; i < numSlides; i++) {
		TweenLite.set(slides[i], {
			xPercent: i * 100
		});
	}

	// auto animation (the timer can be added to auto animate after a certain idle-time)

	var wrap = wrapPartial(-100, (numSlides - 1) * 100);
	var timer = TweenLite.delayedCall(2, autoPlay);

	var animation = TweenMax.to(slides, 1, {
		xPercent: "+=" + (numSlides * 100),
		ease: Linear.easeNone,
		paused: true,
		repeat: -1,
		modifiers: {
			xPercent: wrap
		}
	});

	var proxy = document.createElement("div");
	TweenLite.set(proxy, { x: "+=0" });
	var transform = proxy._gsTransform;
	var slideAnimation = TweenLite.to({}, 0.1, {});
	var slideWidth = 0;
	var wrapWidth = 0;
	resize();

	window.addEventListener("resize", resize);

	// navigation with buttons
	prevButton.addEventListener("click", function () {
		animateSlides(1);
	});

	nextButton.addEventListener("click", function () {
		animateSlides(-1);
	});

	function animateSlides(direction) {
		timer.restart(true);
		slideAnimation.kill();

		var x = snapX(transform.x + direction * slideWidth);

		slideAnimation = TweenLite.to(proxy, slideDuration, {
			x: x,
			onUpdate: updateProgress
		});
	}

	// auto-play function for auto animation

	function autoPlay() {
		animateSlides(-1);
	}

	function updateProgress() {
		animation.progress(transform.x / wrapWidth);
	}

	function snapX(x) {
		return Math.round(x / slideWidth) * slideWidth;
	}

	//calculating the necessary width for slide animation
	function resize() {
		var norm = (transform.x / wrapWidth) || 0;

		slideWidth = slides[0].offsetWidth;
		wrapWidth = slideWidth * numSlides;

		TweenLite.set(proxy, {
			x: norm * wrapWidth
		});

		animateSlides(0);
		slideAnimation.progress(1);
	}

	//returns the difference between the passed function's max and min value
	function wrapPartial(min, max) {
		var diff = max - min;
		return function (value) {
			var v = value - min;
			return ((diff + v % diff) % diff) + min;
		}
	}

// Mouse events
	slideCont.addEventListener("mouseenter",function(){
		timer.pause();
	});
	slideCont.addEventListener("mouseleave",function(){
		timer.play();
	});

	slideCont.addEventListener("click",function(){
		window.open("https://www.google.com")
		
		timer.pause();
		
	});
	
}





