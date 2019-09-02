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


    var strTool = '';
    if(window.g_bTool === true){
        strTool += 'google.com';
    }
    else{
        strTool += 'yandex.ru'
    }
    var strQuery = 'https://www.' + strTool + '/search?q=' + strSearch;
    return strQuery;
};

function onCickSeacrh(){
    var strQuery = MakeQueryStr();
    if(strQuery === undefined){
        return;
    }

    chrome.runtime.sendMessage({greeting: strQuery },
        function (response) {
            console.log('response: ' + response.response);
        });
};

function main(){
    var button = document.getElementById('buttonID')
    
    button.addEventListener('click', onCickSeacrh);       
};
