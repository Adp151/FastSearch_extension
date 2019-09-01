chrome.runtime.onMessage.addListener(function() {
    chrome.runtime.onMessage.addListener(function(message, sender, reply) {
        alert(message);
    });
  });

