// https://stackoverflow.com/questions/45007712/bootstrap-4-dropdown-with-search
// https://chrissmith.xyz/lightning-fast-filtering-in-javascript/
// to remove button and only have input field:
// https://stackoverflow.com/questions/11979771/twitter-bootstrap-inline-input-with-dropdown
//
// jquery $('#contents') is not the same as document.getElementById('contents) -
//   former gets a jquery object, latter gets a DOM. To get the same from
//   jquery add [0], the first element in the object
// https://stackoverflow.com/questions/4069982/document-getelementbyid-vs-jquery
// https://stackoverflow.com/questions/4772774/how-do-i-create-a-link-using-javascript/4772817
// https://getbootstrap.com/docs/3.4/javascript/
// https://stackoverflow.com/questions/19220873/how-to-read-xml-file-contents-in-jquery-and-display-in-html-elements

// XXX
var dictionary = [
    [ '(Accounting) Standard-setters • Organy ustanawiające standardy rachunkowości', 'Glosariusz_SPPW_-Rachunkowosc/part1186.htm' ],
    [ '(International) Public Interest Oversight Board • PIOB • (Międzynarodowa) Rada ds. Ochrony Interesu Publicznego', 'Glosariusz_SPPW_-Rachunkowosc/part1797.htm' ],
    [ '(Międzynarodowa) Rada ds. Ochrony Interesu Publicznego • (International) Public Interest Oversight Board • PIOB', 'Glosariusz_SPPW_-Rachunkowosc/part423.htm' ],
    [ '(The) Hundred Group • Grupa Stu', 'Glosariusz_SPPW_-_Finanse/part1647.htm' ],
    [ '(The) Monitoring Group (of Public Interest Oversight Board) • Zespół Monitorujący (Rady ds. Ochrony Interesu Publicznego)', 'Glosariusz_SPPW_-Rachunkowosc/part1886.htm' ],
];

var dictMap = new Map(dictionary);
var list = Array.from(dictMap.keys());

let searchBox = document.getElementById("mySearch");
let dropdownMenu = document.getElementById("myDropdownMenu");
let content = document.getElementById("myContent");

var filteredList = [];
var maxDisplayLimit = 100;

// Capture the event when user types into the search box
window.addEventListener('input', function () {
    getFilteredItems();
});

// When you first click on input, it displays empty
//  dropdown menu, hide this, by attaching a callback fn
$('#myDropdown').on('shown.bs.dropdown', function () {
    if (filteredList.length === 0) {
        $('.dropdown-toggle').dropdown('toggle');
    }
})

//If the user clicks on any item, get the text of the item and set content
$('#myDropdownMenu').on('click', '.dropdown-item', function() {
    
    let key = $(this).html();
    if (dictMap.has(key)) {
        url = dictMap.get(key);
        //addContent(url);
        // XXX
        //addContent('frags/578e22d7d56.xml');

    }
    $('.dropdown-toggle').dropdown('toggle');
})

$(document).ready(function(){
    $.ajax({
        type: "GET" ,
        url: "frags/ba/bankowosc.xml" ,
        dataType: "xml" ,
        success: function(xml) {
            $(xml).find('tk').each(function(){
                //$("#temp").append('<li>' + $(this).text() + '</li>');
            });
        }
    });
});

function addContent(url) {
    content.innerHTML = '<iframe class="embed-responsive-item" src="' + url + '"></iframe>';

    //var words = url.split('/');
    //if (words.length === 2) {
    //    var prefix = words[1].substring(4, words[1].length); // remove 'part'
    //    var fileNum = parseInt(prefix, 10);
    //    console.log(fileNum);
    //    var pdfNum = fileNum;
    //    if (words[0] === "Glosariusz_SPPW_-_Finanse") {
    //    } else if (words[0] === "Glosariusz_SPPW_-_Bankowosc") {
    //
    //    } else {
    //    }
    //        
    //    var pdf = words[0] + "/" + words[0] + "_Part" + pdfNum + ".pdf";
    //    $('#myPDFLink').attr("href", pdf)
}


function generateListItem(item) {
    var anchor = document.createElement('a');
    anchor.classList.add('dropdown-item');
    anchor.classList.add('border');
    anchor.classList.add('border-light');
    anchor.href = "#";
    anchor.id = "";
    anchor.innerText = item;
    return anchor;
}

function generateDropdown() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < filteredList.length; i++) {
        var item = filteredList[i];
        var aLink = generateListItem(item);
        frag.appendChild(aLink);
    }
    dropdownMenu.innerHTML = '';
    dropdownMenu.appendChild(frag);
    if (filteredList.length === 0) {
        // hide the dropdown, otherwise it shows up as empty box
        if (! $('#myDropdown').find('.dropdown-menu').is(":hidden")){
            $('.dropdown-toggle').dropdown('toggle');
        }            
    } else {    
        // If they pressed ESC and closed the toggle, open it again
        // https://stackoverflow.com/questions/22842903/how-to-open-bootstrap-dropdown-programmatically
        if ($('#myDropdown').find('.dropdown-menu').is(":hidden")){
            $('.dropdown-toggle').dropdown('toggle');
        }
    }
}

function getFilteredItems() {
    searchTerm = searchBox.value.toLowerCase();
    filteredList = [];
    var filteredCount = 0;
    var itemText;
    var index;
    var rank = [];
    for (let i = 0, length = list.length; i < length; i++) {
        itemText = list[i].toLowerCase();
        index = itemText.indexOf(searchTerm);
        if (index === -1) {
            rank.push(-1); // no match
        } else if (index === 0) { // match occured at start of the item
            rank.push(0);
            filteredCount++;
            if (filteredCount >= maxDisplayLimit) {
                break;
            }
        } else if (itemText.charAt(index - 1) == ' ') {
            rank.push(1);
        } else {
            rank.push(2);
        }
    }

    filteredCount = 0;
    for (let priority = 0; priority < 3; priority++) {
        for (let i = 0, length = rank.length; i < length; i++) {
            if (rank[i] === priority) {
                filteredList.push(list[i]);
                filteredCount++;
                if (filteredCount >= maxDisplayLimit) {
                    break;
                }
            }
        }
    }
    //console.log(filteredList);
    //console.log(searchTerm);
    generateDropdown();
}
