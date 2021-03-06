'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

	$('#travelBtn').click(addTravelImages);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get('/project/' + idNumber, function(result) {
		var html = addProject(result);
		$('#project' + idNumber + ' .details').html(html);
	})
}

function addProject(result) {
  var projectHTML = '<div>' +
    '<img src="' + result['image'] + '" class="detailsImage">' +
    '<p>' + result['title'] + '</p>' +
    '<p><small>' + result['date'] +
    '</small></p></div>'; 
   return projectHTML;
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get('/palette', function(result) {

		var colors = result['colors']['hex'];

		$('body').css('background-color', colors[0]);
		$('.thumbnail').css('background-color', colors[1]);
		$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
		$('p').css('color', colors[3]);
		$('.project img').css('opacity', .75);
	});
}

function addTravelImages() {
	$.get('https://api.pinterest.com/v3/pidgets/boards/slamberrose/sights/pins/', callback, 'jsonp');
}

function callback(results) {
	console.log(results);
	var objects = results['data']['pins'];
	var html = "";
	for(var i=0; i<objects.length; i++) {
		html += "<img src=\"" + objects[i]['link'] + "\" />";
	}
	$("#travel").html(html);
}