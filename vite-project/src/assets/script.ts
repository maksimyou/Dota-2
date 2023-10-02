function displayHero() {
    let herolist = JSON.parse(sessionStorage.herolist);
    let hero = herolist[Math.floor(Math.random() * herolist.length)]; // avoid Math.random?
    $("#hero-img").attr("src", `images/${hero}.png`);
    $("#hero-name").text(hero)
    $('#hero-wrapper').show()
    //alert(hero);
}

function getHero() {
    if (sessionStorage.herolist) { // If we have already accessed the herolist this session, use our cached data so we don't need to request it again.
        displayHero();
    } else { // Otherwise fetch our herolist and store it in our session
        $.ajax({
            url: 'heroes.txt',
            success: (data) => {
                sessionStorage.herolist = JSON.stringify(data.split("\n"));
                displayHero();
            }
        });
    }
}