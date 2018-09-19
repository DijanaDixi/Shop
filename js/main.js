var template = $("#template").html();

var title = new RegExp('{{title}}', 'g')
var mainRow = $("#mainRow")
var collections = $("[data-collection]");
// console.log(collections.length)

collections.on("click", displayCollections);

display();

$(".back-to-top").click(function () {
    $("html,body").animate({
        scrollTop: 0
    }, 1000);
});

function display() {
    mainRow.html("");
    $.ajax({url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json", method: "get", dataType: "json"})
        .done(function (res) {
            console.log(res);
            var text = "";
            res.forEach(function (e) {
                // console.log(e); svaki proizvod
                text = template
                    .replace("{{imgSrc}}", e.imgSrc)
                    .replace(title, e.productTitle)
                    .replace("{{model}}", e.model)
                    .replace("{{price}}", e.price);
                mainRow.append(text)

            })
        })
}

function displayCollections(e) {
    mainRow.html(""); //prvo isprazniti mainRow
    e.preventDefault();
    var col = $(this).data("collection");
   


$.ajax({url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json", method: "get", dataType: "json"})
    .done(function (res) {
        var colFilter = res.filter(function (el) {
            return el.colection === col;
        })
        // console.log(colFilter)
        var text = "";
        colFilter.forEach(function (e) {
           
            text = template
                .replace("{{imgSrc}}", e.imgSrc)
                .replace(title, e.productTitle)
                .replace("{{model}}", e.model)
                .replace("{{price}}", e.price);
            mainRow.append(text)
        
        })
    })
}