chrome.runtime.onMessage.addListener( function(request, sender, sendResponse)
{
    sendResponse({response: 'message received'});
    var win = window.open(request.greeting, '_blank');
    win.focus();
});