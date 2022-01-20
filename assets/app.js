let APIKey = '66538bae2abe4971b23e291aeb9b14ac';
let homeBox = document.querySelector(`.homeBox`);
let newsBox = document.querySelector(`.newsBox`);
let lodader = document.querySelector(`.loading`);
let prevBtn = document.getElementById(`prev_btn`);
let nextBtn = document.getElementById(`next_btn`);
let keywordVal = document.getElementById('search_txt');
let endPoints = { heading: '', category: '', keyword: '', page: 1 };

function getNews(heading, category, keyword, page) {
    lodader.classList.replace('d-none', 'd-flex');
    endPoints.heading = heading;
    endPoints.category = category;
    endPoints.keyword = keyword;
    endPoints.page = page;
    let url = `https://newsapi.org/v2/top-headlines?language=en${category}${keyword}&page=${page}&apiKey=${APIKey}`;
    fetch(url).then(response => response.json()).then(data => {
        checkData(data);
        homeBox.classList.replace('d-block', 'd-none');
        newsBox.classList.replace('d-none', 'd-block');
        lodader.classList.replace('d-flex', 'd-none');
    });
}

function checkData(data) {
    if (data.status === 'error') {
        newsBox.children[0].textContent = data.code;
        newsBox.children[1].innerHTML = `<h4>${data.message}</h4>`;
        newsBox.children[2].classList.replace('d-flex', 'd-none');
    }
    else {
        if (data.totalResults === 0) {
            newsBox.children[0].textContent = 'No Result found.';
            newsBox.children[1].innerHTML = '';
            newsBox.children[2].classList.replace('d-flex', 'd-none');
        }
        else {
            showNews(data.articles);
            newsBox.children[0].textContent = endPoints.heading;
            newsBox.children[2].classList.replace('d-none', 'd-flex');
            let result = data.totalResults >= 100 ? 100 : data.totalResults;
            setPageBtn(result <= 20 ? 1 : Math.round(result / 20));
        }
    }
}

function showNews(news) {
    let html = '';
    news.forEach(function (element) {
        if (element.description) {
            html += `<div class="card col-sm-auto m-2 p-0" style="width: 18em">
                        <img src="${element.urlToImage}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element.source.name}</h5>
                            <p class="card-text">${element.description}</p>
                            <a href="${element.url}" class="stretched-link" target="_blank">Read More</a>
                        </div>
                    </div>`;
        }
    });
    newsBox.children[1].innerHTML = html;
}

function setPageBtn(result) {
    if (endPoints.page == 1) {
        prevBtn.setAttribute('disabled', 'disabled');
    }
    else {
        prevBtn.removeAttribute('disabled');
    }
    if (endPoints.page == result) {
        nextBtn.setAttribute('disabled', 'disabled');
    }
    else {
        nextBtn.removeAttribute('disabled');
    }
}

prevBtn.addEventListener(`click`, function () {
    getNews(endPoints.heading, endPoints.category, endPoints.keyword, endPoints.page - 1);
    window.location.href = '#';
});

nextBtn.addEventListener(`click`, function () {
    getNews(endPoints.heading, endPoints.category, endPoints.keyword, endPoints.page + 1);
    window.location.href = '#';
});

document.getElementById(`home`).addEventListener(`click`, function () {
    homeBox.classList.replace('d-none', 'd-block');
    newsBox.classList.replace('d-block', 'd-none');
});

document.getElementById(`worldNews`).addEventListener(`click`, function () {
    getNews('Headlines around the World', '', '', 1);
});

document.getElementById(`indiaNews`).addEventListener(`click`, function () {
    getNews('Top Headlines in India', '&country=in', '', 1);
});

document.getElementById(`business`).addEventListener(`click`, function () {
    getNews('Business News', '&category=business', '', 1);
});

document.getElementById(`entertainment`).addEventListener(`click`, function () {
    getNews('Entertainment News', '&category=entertainment', '', 1);
});

document.getElementById(`general`).addEventListener(`click`, function () {
    getNews('General News', '&category=general', '', 1);
});

document.getElementById(`health`).addEventListener(`click`, function () {
    getNews('Health News', '&category=health', '', 1);
});

document.getElementById(`science`).addEventListener(`click`, function () {
    getNews('Science News', '&category=science', '', 1);
});

document.getElementById(`sports`).addEventListener(`click`, function () {
    getNews('Sports News', '&category=sports', '', 1);
});

document.getElementById(`technology`).addEventListener(`click`, function () {
    getNews('Technology News', '&category=technology', '', 1);
});

document.getElementById(`search_txt`).addEventListener(`input`, function (e) {
    if (e == `Enter`) {
        getNews(`News related to '${keywordVal.value}'`, '', `&q=${keywordVal.value.toLowerCase()}`, 1);
        keywordVal.value = '';
    }
});

document.getElementById(`search_btn`).addEventListener(`click`, function () {
    getNews(`News related to '${keywordVal.value}'`, '', `&q=${keywordVal.value.toLowerCase()}`, 1);
    keywordVal.value = '';
});