var canvas;

function InputTitle(){
	    var titleInput = document.getElementById("inputTitle").value;
	    document.getElementById("title").innerHTML = titleInput;
}
function InputComposerName(){
	    var composerNameInput = document.getElementById("inputComposerName").value;
	    document.getElementById("composerName").innerHTML = composerNameInput;
}
function screenShot() {
	var screen =document.getElementById("screen");
	console.log(screen);
	html2canvas(screen).then(function(canva) {
		canva.setAttribute("id","cnv");
		canva.setAttribute("hidden","hidden");
		document.body.appendChild(canva);


		canvas = document.getElementById("cnv");



		var dt = canvas.toDataURL('image/png');
		/* Change MIME type to trick the browser to downlaod the file instead of displaying it */
		dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

		/* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
		dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

		this.location.href = dt;

		document.body.removeChild(document.getElementById("cnv"));

	});

}


