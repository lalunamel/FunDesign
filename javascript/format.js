function createGray() {
	newGray = $(document.createElement('div'));
	newGray.css({
		width: 150, 
		height: 200,
		backgroundColor: 'rgba(0,0,0,.5)',
		position: 'relative',
		zIndex: 2,
	});
	
	newGray.css('top', $('#format').css('top'));
	newGray.css('left', $('#format').css('left'));
	
	newGray.addClass('gray');
	newGray.append("<div class ='closeButton'></div>");
	
	$('#format').append(newGray);
	$('.gray').draggable({grid: [150, 1], containment: 'parent'});
	$('.gray').resizable();
	$(".closeButton").click( function() {
		$(this).parent().remove(); });
}	

function init() {
	$(".inner").draggable({ axis: 'y'});
	$(".inner").resizable({ maxHeight: 600, maxWidth: 150, containment: '.col', handles: 'n,s'});
	$(".closeButton").click( function() {
		$(this).parent().remove(); });
}
