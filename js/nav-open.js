$(document).ready(() => {
	let $menu    = $(".header nav");
	let $sidebar = $(".main-left");

	$(".header__hamburger").on("click", () => {
		$menu.toggleClass("header__nav_visible");
		$sidebar.toggleClass("main-left_narrowed");
	});
});