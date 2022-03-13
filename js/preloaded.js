let fullframe = 0.7;
let tl = gsap.timeline({
	repeat: -1,
	yoyo: false,
	paused: false
});

tl.to("#steps path", {
	duration: fullframe,
	xPercent: -100,
	yPercent: 100,
	ease: Linear.easeNone
});
tl.to(
	"#steps path:first-child",
	{ duration: fullframe, opacity: 0, ease: Linear.easeNone },
	"<"
);
tl.to(
	"#steps path:last-child",
	{ duration: fullframe, opacity: 1, ease: Linear.easeNone },
	"<"
);
let btl = gsap.timeline({
	repeat: -1,
	paused: false
});
btl.to("#ball", fullframe * 0.48, { y: -25, x: 0, ease: Sine.easeOut }, "<");
btl.to("#ball", fullframe * 0.48, { y: 20, x: 0, ease: Sine.easeIn });
btl.to("#ball", fullframe * 0.04, { y: 5, x: 0, ease: Linear.easeNone });
