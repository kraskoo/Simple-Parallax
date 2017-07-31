(function() {
	const linkPages = "/lib/jsons/pages.json";
	var notes = [];
	$.getJSON(linkPages, function(data) {		
		notes.push("<div id=\"left-side-navbar\" class=\"hidden-side-navbar\">");
		notes.push("<div id=\"close-menu\">X</div>");
		$.each(data["pages"], function(k, v) {
			var currentNote = "<div class=\"note\" note-source=\"" + v["link"] + "\">" + v["title"] + "</div>";
			notes.push(currentNote);
		});
		notes.push("</div>");
		var html = $.parseHTML(notes.join(""));
		$(html).appendTo($("body"));
	}).done(function() {
		($("#close-menu")[0]).addEventListener("click", closeMenuButtonHandler, false);
		function closeMenuButtonHandler(evnt) {
			$("#left-side-navbar").switchClass("shown-side-navbar", "hidden-side-navbar", 700);
			$("#button-menu").css("display", "block");
		}
		
		if(window.location.pathname === "/") {
			var firstNote = $(".note")[0];
			var redirectUrl = "http://" + window.location.host + firstNote.getAttribute("note-source");
			window.location.href = redirectUrl;
		}
		
		$.each($(".note"), function(k, v) {
            $(v).on("click", function() {
                var currentClicked = this;
                window.location.href =
					("http://" + window.location.host + currentClicked.getAttribute("note-source"));
            });
        });
	});
}());