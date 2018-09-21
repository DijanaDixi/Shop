var template = $("#template").html();
var title = new RegExp('{{title}}', 'g')
var mainRow = $("#mainRow")
var collections = $("[data-collection]"); //kategorije // console.log(collections.length)

$(".back-to-top").click(function () {
    $("html,body").animate({
        scrollTop: 0
    }, 1000);
});

window.onload = function () {
    collections.parent().removeClass("active");
    $.ajax({url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
            method: "get", 
            dataType: "json"})
    .done(function (res) {
            displayCollections(res)
            collections.on("click", function(){
                displayCollections.call(this ,res)
            });
        })
};

function displayCollections(res) {
    mainRow.html("");
    event.preventDefault();
    var col = $(this).data("collection");
    console.log(this)

    if (col === "male" || col === "female") {
        var colFilter = res.filter(function (el) {
            return el.colection === col;
          })
        displayProduct(colFilter);

    } else if (col === "action" || col === "popular" || col === "newCol") {
        collections.parent().removeClass("active");
        $(this).parent().addClass("active");
        var colFilter = res.filter(function (el) {
            return el[col];
        })
        displayProduct(colFilter);
    } else {
        displayProduct(res)
    }

}

function displayProduct(filter) {
    var text = "";
    filter.forEach(function (e) {
        text = template
            .replace("{{imgSrc}}", e.imgSrc)
            .replace(title, e.productTitle)
            .replace("{{model}}", e.model)
            .replace("{{price}}", e.price);
        mainRow.append(text)
    })

}