const api_url = 'https://api.themoviedb.org/3/discover/movie?&api_key=04c35731a5ee918f014970082a0088b1';
const api_key =  '04c35731a5ee918f014970082a0088b1';
const IMGPATH ='https://image.tmdb.org/t/p/w200'
const searchURL = 'https://api.themoviedb.org/3/discover/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const search=document.getElementById('search');

function add_click_to_card (cards) {
  cards.forEach(card => {
      card.addEventListener('click', () => popubBox(card))
  })
}

getmovies(api_url)
async function getmovies(url){
  const resp= await fetch(url);
  const movieData= await resp.json();
  console.log(movieData);
  showMovies(movieData.results);
  if(movieData.results.length == 0){
    msg.innerHTML='<h3>No Movies Found With this title</h3>';
  }

  }

function showMovies(movies){
  main.innerHTML='';
  main.innerHTML=movies.map((movie) => {
    return`
    <div class="content" data_id=${movie.id}>
    <div class="image">
      <img src="${IMGPATH + movie.poster_path}" alt="$ onlick="popubBox()" {movie.title}" id="img" >
    </div>
    <div class="info">
      <h3>${movie.title}</h3>
      <span class="${getRateColor(movie.vote_average)}">${movie.vote_average}</span>
    </div>
  </div>
`;
  }).join("");
  const cards = document.querySelectorAll('.content');
  add_click_to_card(cards);
}
function getRateColor(vote){
if(vote >= 8){
  return'green'
}else if(vote < 5 ){ 
  return 'red'
}else{
  return'orange'
};
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let searchValue = search.value;
  console.log(searchValue);
  if(searchValue.length > 0){
    getmovies(`https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${searchValue}`);
    search.value="";
  }

  // if(movies.length < 0){
  //   main.innerHTML=`
  //   <h3>No Movies Found</h3>
  //   `
  // }
})

async function get_movie_by_id (id) {
  const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
  const respData = await resp.json()
  return respData
}

async function get_movie_trailer (id) {
  const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`)
  const respData = await resp.json()
  return respData.results[0].key
}


async function popubBox(card){
  popub.classList.add('active');
  const movie_id = card.getAttribute('data_id');
  const movie = await get_movie_by_id(movie_id);
  const movie_trailer = await get_movie_trailer(movie_id);

  let overlay=document.createElement('div');
  overlay.className= 'popub-overlay';
  document.body.appendChild(overlay);
overlay.classList.add('active');

popub.innerHTML=`
<span class="x-icon close">&#10006;</span>
<div class="header">
<img src="${IMGPATH + movie.poster_path}" id="img1">
<div class="info">
  <span id="rate">${movie.vote_average}</span>
  <span id="views">Views: ${movie.popularity}</span>
  <h3 id="mt">${movie.title}</h3>
  <h2>Genres: </h2>
  <ul>
      ${movie.genres.map(e => `<li>${e.name}</li>`).join('')}
  </ul>
  <p id="y">Release date: <span id="yy">${movie.release_date}</span></p>
</div>
</div>
<div class="overView" id="oV">
<h4>Over View:</h4>
<p>${movie.overview}</p>
</div>
<div class="trailer">
<h2>Trailer: </h2>
<iframe height="315" src="https://www.youtube.com/embed/${movie_trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
`
const close = document.querySelector('.close')
close.addEventListener('click', () => {
  popub.classList.remove('active');
  overlay.classList.remove('active');
});

}



