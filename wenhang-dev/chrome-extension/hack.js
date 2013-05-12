$(document).ready(function() {

	function changeTextArea(message) {
		var frame1 = innerFrame(window.document, 1);
		var frame2 = innerFrame(frame1.document, 0);
		var node = $(frame2.document.getElementById('map-text-node'));
		node.find('div').text(message);
		node.focus().blur();
	}

	function innerFrame(doc, index) {
		var iframe = doc.getElementsByTagName("iframe")[index];
		return (iframe.contentWindow) ? iframe.contentWindow : 
			(iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
	}

	changeTextArea("Hello World Playground lets you experiment with how content is displayed\
on Glass. For more information on how to setup and use the Playground, see Playground\
Usage. To authorize the Playground to send and receive data from your account, enter\
your Google");
});
