document.addEventListener('DOMContentLoaded', main);

var g_bTool = true;

function SwitchTool(){
    g_bTool = !g_bTool;
};

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

function onCickSeacrh(){
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
    
    button.addEventListener('click', onCickSeacrh);       
};
