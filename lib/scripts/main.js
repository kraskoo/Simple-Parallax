(function() {
    $(document).ready(proceed);
    var windowHeight = null;
    var windowWidth = null;
    var lengthParallax = null;
    var canMoveToPrevious = true;
    var canMoveToNext = true;

    function isMouseIsInsideTheMenu(clientX) {
        var leftSideBar = $("#left-side-navbar");
        var navbarWidth = parseInt(leftSideBar.css("width"));
        return parseInt(leftSideBar.css("left")) === 0 && clientX < navbarWidth;
    }
	
	function checkIfCanMoveToLeft(deltaY, clientX) {
		return deltaY <= 0 &&
			currentIndex > 0 &&
			canMoveToPrevious &&
			canMoveToNext &&
			!isMouseIsInsideTheMenu(clientX);
	}
	
	function checkIfCanMoveToRight(deltaY, clientX) {
		return deltaY >= 0 &&
			hasNextIndex() &&
			canMoveToPrevious &&
			canMoveToNext &&
			!isMouseIsInsideTheMenu(clientX)
	}

    function documentOnWheel(evnt) {
        var deltaY = evnt.deltaY;
        if(checkIfCanMoveToLeft(deltaY, evnt.clientX)) moveToLeft();
		else if(checkIfCanMoveToRight(deltaY, evnt.clientX)) moveToRight();
    }
	
	function moveToLeft() {
		canMoveToPrevious = !canMoveToPrevious;
		$.each($(".parallax"), function(k, v) {
			if(k !== currentIndex && k !== nextIndex) {
				var previousLeftValue = (parseInt($(v).css("left")) + windowWidth);
				$(v).css("left", previousLeftValue);
			}
		});
		var currentParallax = ($(".parallax")[currentIndex]);
		var nextParallax = ($(".parallax")[nextIndex]);
		var currentLeft = (parseInt(currentParallax.style.left) + windowWidth);
		$(currentParallax).animate(
			{ left: currentLeft },
			700,
			function() {
				canMoveToPrevious = !canMoveToPrevious;
			});
		if(nextParallax !== undefined) {                
			var nextLeft = (parseInt(nextParallax.style.left) + windowWidth);
			$(nextParallax).animate({ left: nextLeft }, 300);
		}
		
		currentIndex--;
		nextIndex--;
		if(currentIndex === 0) hideLeftArrow();
		if(nextIndex < lengthParallax) showRightArrow();
	}
	
	function moveToRight() {
		canMoveToNext = !canMoveToNext;
		$.each($(".parallax"), function(k, v) {
			if(k !== currentIndex && k !== nextIndex) {
				var nextLeftValue = (parseInt($(v).css("left")) - windowWidth);
				$(v).css("left", nextLeftValue);
			}
		});
		var currentParallax = ($(".parallax")[currentIndex]);
		var nextParallax = ($(".parallax")[nextIndex]);
		var currentLeft = (parseInt(currentParallax.style.left) - windowWidth);
		$(currentParallax).animate(
			{ left: currentLeft },
			700,
			function() {
				canMoveToNext = !canMoveToNext;
			});
		if(nextParallax !== undefined) {                
			var nextLeft = (parseInt(nextParallax.style.left) - windowWidth);
			$(nextParallax).animate({ left: nextLeft }, 300);
		}

		currentIndex++;
		nextIndex++;
		if(currentIndex > 0) showLeftArrow();
		if(nextIndex == lengthParallax) hideRightArrow();
	}
	
	function hideLeftArrow() {
		$("#left-arrow").css("display", "none");
	}
	
	function showLeftArrow() {
		$("#left-arrow").css("display", "block");
	}
	
	function hideRightArrow() {
		$("#right-arrow").css("display", "none");
	}
	
	function showRightArrow() {
		$("#right-arrow").css("display", "block");
	}

    function menuButtonHandler(evnt) {
        $("#left-side-navbar").switchClass("hidden-side-navbar", "shown-side-navbar", 700);
        $(evnt.target).css("display", "none");
    }

    function hasNextIndex() {
        return nextIndex !== -1 && currentIndex + 1 < lengthParallax;
    }

    var currentIndex = 0;
    var nextIndex = -1;
    var currentParallaxLeft = 0;
    var currentParallaxZIndex = 1;
    function proceed() {
        document.documentElement.style.overflow = "hidden";
        windowHeight = window.outerHeight;
        windowWidth = window.outerWidth;
		$(".arrows").css("top", ((windowHeight / 2) - 25) + 60);
        lengthParallax = $(".parallax").length;
		if(lengthParallax > 1) $("#right-arrow").css("display", "block");		
        nextIndex = lengthParallax > 1 ? 1 : -1;
        $(".parallax").css("width", windowWidth);
        $(".parallax").css("height", windowHeight);
        $.each($(".parallax"), function(key, value) {
            $(value).css("left", currentParallaxLeft);
            $(value).css("zIndex", currentParallaxZIndex);
            currentParallaxLeft += windowWidth;
            currentParallaxZIndex++;
        });
        document.addEventListener("wheel", documentOnWheel, false);
		($("#left-arrow")[0]).addEventListener("click", function(evnt) {
			if(checkIfCanMoveToLeft(-1, evnt.clientX)) moveToLeft();
		}, false);
		($("#right-arrow")[0]).addEventListener("click", function(evnt) {
			if(checkIfCanMoveToRight(1, evnt.clientX)) moveToRight();
		}, false);
        ($("#button-menu")[0]).addEventListener("click", menuButtonHandler, false);
		this.oncontextmenu =  function() {
			return false;
		}
		
		this.ondragstart = function() {
			return false;
		}
    }
}());