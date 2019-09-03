document.addEventListener('DOMContentLoaded', main);
window.onload = ReadSettings;

function GetStrFromSearchField(){
    var field = document.getElementById('searchFieldID')
    var str = field.value;

    return str;
}

function MakeQueryStr(){
    var strSearch = GetStrFromSearchField();
    if(strSearch === ''){
        return;
    }
    
    var selectTools = document.getElementById('SearchToolID');
    var strTool = selectTools.options[selectTools.selectedIndex].value;

    var strQuery = 'https://www.' + strTool + strSearch;
    return strQuery;
};

function SaveSettings(){
    var selectTools = document.getElementById('SearchToolID');
    var str_selIndex = selectTools.selectedIndex.toString();

    chrome.storage.sync.set({ mySelIndex: str_selIndex });
};

function ReadSettings(){
    chrome.storage.sync.get('mySelIndex', function(data) {
        var str_selIndex = data.mySelIndex;
        if(str_selIndex === undefined){
            SaveSettings();
            return;
        }
        var selectTools = document.getElementById('SearchToolID');
        selectTools.selectedIndex = parseInt(str_selIndex, 10);
    });
}

function onClickSeacrh(){
    var strQuery = MakeQueryStr();
    if(strQuery === undefined){
        return false;
    }

    chrome.runtime.sendMessage({greeting: strQuery },
        function (response) {
            console.log('response: ' + response.response);
        });
    return false;
};

function main(){
    var button = document.getElementById('buttonID')
    var sel = document.getElementById('SearchToolID');

    button.onclick = onClickSeacrh
    sel.onchange = SaveSettings;
};
