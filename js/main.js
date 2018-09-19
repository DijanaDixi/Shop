var template = $("#template").html();
$(".back-to-top").click(function () {
    $("html,body").animate({
        scrollTop: 0
    }, 1000);
});

$
    .ajax({url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json", method: "get", dataType: "json"})
    .done(function (res) {
        console.log(res);
        var text = "";
        res.forEach(function (e) {
            // console.log(e); svaki proizvod
            text = template
                .replace("{{imgSrc}}", e.imgSrc)
                .replace("{{title}}", e.productTitle)
                .replace("{{model}}", e.model)
                .replace("{{price}}", e.price);
            $("#mainRow").append(text)

        })
    })
