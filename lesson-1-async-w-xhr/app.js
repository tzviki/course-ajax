(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //Image
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 5000f3552ab119ef0ceab34398bbd269a7e6d497c24f401302a928d7d406b062');
        unsplashRequest.send();

        //Articles
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=84bd3923bd55433884685fbcc7258e99`);
        articleRequest.send();

        function addImage() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const firstImage = data.results[0];

            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function addArticles() {
            let htmlContent = '<ul>';
            const data = JSON.parse(this.responseText);
            const articles = data.response.docs;

            for (var key in articles) {
                let article = articles[key];
                htmlContent += `<li class="article">
                                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                                    <p>${article.snippet};
                                </li>`;
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

    });
})();
