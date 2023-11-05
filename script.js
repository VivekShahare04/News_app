
const API_KEY="e6fb14e684cb4a158f110841c41e5a49";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchnews("India"));

function reload() {
    window.location.reload();
}

try{
async function fetchnews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
}catch(error){
	console.log('error');}


function bindData(articles){
    const cardscontainer =document.getElementById('cards-container');
    const newscardTemplate=document.getElementById('template-news-card');

	cardscontainer.innerHTML='';

	articles.forEach((article) => {
		if(!article.urlToImage)return;
		const cardClone = newscardTemplate.content.cloneNode(true);
		fillDataInCard(cardClone,article);
		cardscontainer.appendChild(cardClone);
	});
}

function fillDataInCard(cardClone,article){
	const newsImg = cardClone.querySelector('#news-img');
	const newsTitle = cardClone.querySelector('#news-title');
	const newsSource = cardClone.querySelector('#news-source');
	const newsDesc = cardClone.querySelector('#news-desc');

	newsImg.src = article.urlToImage;
	newsTitle.innerHTML = article.title;
	newsDesc.innerHTML = article.description;

	const date = new Date(article.publishedAt).toLocaleString("en-US",{
		timeZone: "Asia/Jakarta"
	});

	newsSource.innerHTML = `${article.source.name} · ${date}`;

	cardClone.firstElementChild.addEventListener("click",() => {
		window.open(article.url,"_blank");
	});
}

let curSelectedNav = null;
function onNavItemClick(id){
	fetchnews(id);
	const navItem = document.getElementById(id);
	curSelectedNav?.classList.remove("active");
	curSelectedNav = navItem;
	curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
	fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});	


