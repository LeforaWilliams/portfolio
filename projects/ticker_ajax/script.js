$.ajax({
    url: "/info.json",
    success: function(responseData) {
        var html = "";
        for (var i = 0; i < responseData.tickerLinks.length; i++) {
            html +=
                '<a target="_blank" href="' +
                responseData.tickerLinks[i].href +
                '">' +
                responseData.tickerLinks[i].text +
                "</a>";
        }

        $("div#box").append(html);
    }
});
