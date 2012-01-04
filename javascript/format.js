function changeCallbackWithImage(numElement){
	text = document.getElementById("input" + numElement).value;
	urlText = text;
	if(text.length > 7 && text.substring(0,7) != "http://") 
		urlText = "http://" + urlText;
	img = new Image();
	img.onload = function() {
		canvas = document.getElementById("can" + numElement);
		updateCanvas(canvas, ""); // clear and reposition the canvas
		$(canvas).css({'top': '0px', 'left': '0px'});
		canvas.getContext("2d").drawImage(this, 0 , 0);
	};
	img.onerror = function() {
		if(text.length < 1) // Special case, when there is nothing in the input
		{
			updateCanvas(document.getElementById("can" + numElement), "");
		}
		else // When the link doesnt work and the text is not blank
		{
			updateCanvas(document.getElementById("can" + numElement), text.substring(0,1));
		}
	};
	img.src = urlText;
}


function changeCallback(numElement)
{
	updateCanvas(document.getElementById("can" + numElement), 
		document.getElementById("input" + numElement).value);
}

function updateCanvas(canvas, newLetter)
{
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.font = "900 900pt 'Helvetica Neue LT STD', Helvetica, Arial, sans-serif";
	ctx.textBaseline = "top";
	ctx.fillText(newLetter, 0, 0);
}

function reset(jQSelector, projectNum)
{
	col = $(jQSelector);
	children = col.children();
	if(children[0].tagName != "CANVAS")
	{
		for(i=0; i < children.length; i++)
			$(children[i]).remove();
		black = $(document.createElement('div'));
		black.append("<div class ='closeButton'></div>");
		black.css({
			'left': '0px',
			'top': '0px',
			'width': '150px',
			'height': '600px',
			'background-color': 'black'});
		black.attr('id', 'black' + jQSelector.substr(jQSelector.length-1));
		black.addClass('black');
		black.addClass('bar');
		
		col.append(black);
	}
	else
	{
		canvas = children[0];
		$(canvas).css({'top': '0px', 'left': '0px'});
	}
	
	init(projectNum);
}

function createGray() {
	newGray = $(document.createElement('div'));
	newGray.css({
		width: 150,
		height: 200,
		top: $('#format').offset().top,
		left: $('#format').offset().left,
		backgroundColor: 'rgba(0,0,0,.5)',
		position: 'absolute',
		zIndex: 2,
	});
	
	newGray.addClass('gray');
	newGray.addClass('bar');
	newGray.append("<div class ='closeButton'></div>");
	
	$('#format').append(newGray);
	$('.gray').resizable({
		grid: [150, 1], 
		minWidth: 150, 
		minHeight: 10,
		maxWidth: 300, 
		handles: 'n,s,e,w', 
		//containment: $('#formatContainer'),
	});
	$('.gray').draggable({
		grid: [75, 1], 
		containment: '#format'
	});
	$(".closeButton").click( function() {
		$(this).parent().remove(); });
}	

function init(projectNum) {
	if(projectNum < 5)
	{
		if(projectNum == 1)
		{
			$(".black").draggable({ axis: 'x'});
		}
		else if(projectNum == 2)
		{
			$(".black").draggable();
		}
		else if(projectNum == 3)
		{
			$(".black").draggable({ axis: 'y'});
		}
		else if(projectNum == 4)
		{
			$(".black").draggable({ axis: 'y'});
		}
		//$(".black").draggable({ axis: 'y'});
		$(".black").resizable({ 
			maxHeight: 600, 
			maxWidth: 150, 
			containment: '.col', 
			handles: 'n,s',
		});
	}
	else if(projectNum == 5)
	{
		$("canvas").draggable();
		
		$("#form1").change(function(){changeCallback(1)});
		$("#form2").change(function(){changeCallback(2)});
		$("#form3").change(function(){changeCallback(3)});
		$("#form4").change(function(){changeCallback(4)});
		
		$("form").change();
	}
	else
	{
		$("canvas").draggable();
		
		$("#form1").change(function(){changeCallbackWithImage(1)});
		$("#form2").change(function(){changeCallbackWithImage(2)});
		$("#form3").change(function(){changeCallbackWithImage(3)});
		$("#form4").change(function(){changeCallbackWithImage(4)});
		
		$("form").change();
	}
	$(".closeButton").click( function() {
		$(this).parent().remove();
	});
}
