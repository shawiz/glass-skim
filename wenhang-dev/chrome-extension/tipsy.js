// initiate the plugin after DOM has loaded
$(document).ready(function() {
	// // basic usage
	$('a.UnLikeLink').aToolTip();
	
	// // fixed tooltip
	// $('a.fixedTip').aToolTip({
	// 	fixed: true
	// });
	
	// // on click tooltip with custom content
	// $('.UnLikeLink').aToolTip({
	// 	clickIt: true,
	// 	tipContent: 'Hello I am aToolTip with content from param'
	// });	
	
	// // on click tooltip that has callback functions
	// $('a.callBackTip').aToolTip({
	// 	clickIt: true,
	// 	onShow: function(){alert('I fired OnShow')},
	// 	onHide: function(){alert('I fired OnHide')}
	// });	

	// List of all parameters and their default values:
	$('a').aToolTip({
		// no need to change/override
		closeTipBtn: 'aToolTipCloseBtn',
		toolTipId: 'aToolTip',
		// ok to override
		fixed: false,					// Set true to activate fixed position
		clickIt: false,					// set to true for click activated tooltip
		inSpeed: 200,					// Speed tooltip fades in
		outSpeed: 100,					// Speed tooltip fades out
		tipContent: 'Hello I am aToolTip with content from param',					// Pass in content or it will use objects 'title' attribute
		toolTipClass: 'defaultTheme',	// Set class name for custom theme/styles
		xOffset: 5,						
		// x position
		yOffset: 5,						// y position
		onShow: null,					// callback function that fires after atooltip has shown
		onHide: null					// callback function that fires after atooltip has faded out  	
	});
	
});
