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

function GetPopularQuery()
{
    var searchValue = 'asd'
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
   /* fetch(proxyUrl + `https://yandex.ru/search/xml
    ?user=apas0634&key=03.929479661:e37bcc1892848fb6b9b8dc908bd83905
    &query=qwert&l10n=ru
    &sortby=rlv
    &filter=strict&maxpassages=1
    &groupby=attr%3D%22%22.mode%3Dflat.groups-on-page%3D10.docs-in-group%3D1&page=1`)
   */
   /*  fetch(proxyUrl + `https://yandex.ru/suggest/suggest-ya.cgi?srv=morda_ru_desktop&part=${searchValue}
    &wiz=TrWth&uil=ru&fact=1&v=4&icon=1&lr=65&hl=1&bemjson=1&html=1&platform=desktop&rich_nav=1
    &show_experiment=222&show_experiment=224&verified_nav=1&rich_phone=1&yu=2541125041567573348
    &pos=12&suggest_reqid=254112504156757334833493629714277&svg=1`)
    */
   fetch(proxyUrl + 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAAK9ij7cRNrpCThFyI9SmrUnLu7QOflhc&cx=017576662512468239146:omuauf_lfve&q=travel')
    .then(response => response.text())
    .then(response => {
        console.log('response', response)
    })
    .catch(err => {
        console.log(err);
        return err;
      });
};

function main(){
    GetPopularQuery();
    var button = document.getElementById('buttonID')
    var sel = document.getElementById('SearchToolID');
    var searchField = document.getElementById('searchFieldID');
    
    //searchField.onchange = GetPopularQuery();
    button.onclick = onClickSeacrh;
    sel.onchange = SaveSettings;
};
