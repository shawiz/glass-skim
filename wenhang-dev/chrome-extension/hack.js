var changeTextArea = function(mytext) {
	debugger;
	var iframe = document.getElementsByTagName("iframe")[0];
	var frameDoc = iframe.contentDocument || iframe.contentWindow.document;
	// document.getElementById('source-html').value = mytext;
	frameDoc.getElementById('source-json').value = mytext;
}


var pollingCheckAndSeek = function(){
	// debugger;
	// $("document").live("Window.mo",function(){
	// 	addIconII(this);
	// });

	changeTextArea("Hello World");
}
setTimeout(function(){
	//main
    pollingCheckAndSeek();
}, 5000);

