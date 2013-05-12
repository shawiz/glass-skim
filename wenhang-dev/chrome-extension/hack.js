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

	function subscribe() {
		var source = new EventSource('http://0.0.0.0:5000/stream');
        source.onmessage = function(event) {
             changeTextArea(event.data);
        };
	}

	subscribe();

});
