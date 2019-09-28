// https://stackoverflow.com/questions/45007712/bootstrap-4-dropdown-with-search
// https://chrissmith.xyz/lightning-fast-filtering-in-javascript/
// to remove button and only have input field:
// https://stackoverflow.com/questions/11979771/twitter-bootstrap-inline-input-with-dropdown

var dictMap = new Map(dictionary);
var list = Array.from(dictMap.keys());

let searchBox = document.getElementById("mySearch");

var filteredList = [];
var maxDisplayLimit = 100;
var searchTerm = "";

// Capture the event when user types into the search box
window.addEventListener('input', function () {
    getFilteredItems();
});


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
        } else if (itemText.charAt(index -1) == ' ') {
            rank.push(1);
        } else {
            rank.push(2);
        }
        //console.log(rank": " + itemText);

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

    console.log(filteredList);
    console.log(searchTerm);
    //generateDropdown();
}










// //Find the input search box
// let search = document.getElementById("searchCoin")
// 
// //Find every item inside the dropdown
// let items = document.getElementsByClassName("dropdown-item")
// function buildDropDown(values) {
//     let contents = []
//     for (let name of values) {
//         contents.push('<input type="button" class="dropdown-item" type="button" value="' + name + '"/>')
//     }
//     $('#menuItems').append(contents.join(""))
// 
//     //Hide the row that shows no items were found
//     $('#empty').hide()
// }
// 
// //Capture the event when user types into the search box
// window.addEventListener('input', function () {
//     filter(search.value.trim().toLowerCase())
// })
// 
// //XXX
// //The code above uses show() and hide() inside a loop which is why the UI is slow when you clear everything you typed in case you didn't notice. //Instead of that, use .css({display: 'none'}) and .css({display: 'block'})
// 
// 
// //For every word entered by the user, check if the symbol starts with that word
// //If it does show the symbol, else hide it
// function filter(word) {
//     let length = items.length
//     let collection = []
//     let hidden = 0
//     for (let i = 0; i < length; i++) {
//         if (items[i].value.toLowerCase().startsWith(word)) {
//             $(items[i]).show()
//         }
//         else {
//             $(items[i]).hide()
//             hidden++
//         }
//     }
// 
//     //If all items are hidden, show the empty view
//     if (hidden === length) {
//         $('#empty').show()
//     } else {
//         $('#empty').hide()
//     }
// }
// 
// //If the user clicks on any item, set the title of the button as the text of the item
// $('#menuItems').on('click', '.dropdown-item', function(){
//     $('#dropdown_coins').text($(this)[0].value)
//     $("#dropdown_coins").dropdown('toggle');
// })
// 
// buildDropDown(names)

