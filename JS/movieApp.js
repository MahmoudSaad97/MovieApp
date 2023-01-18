const api_url = 'https://api.themoviedb.org/3/discover/movie?&api_key=04c35731a5ee918f014970082a0088b1';
const api_key =  '04c35731a5ee918f014970082a0088b1';
const IMGPATH ='https://image.tmdb.org/t/p/w200'
const searchURL = 'https://api.themoviedb.org/3/discover/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const search=document.getElementById('search');

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
  movies.forEach((movie) => {
    let movieEle = document.createElement('div');
    movieEle.className ='content';
    movieEle.innerHTML=`
      <div class="image">
        <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}" id="img" onlick='popubBox()'>
      </div>
      <div class="info">
        <h3>${movie.title}</h3>
        <span class="${getRateColor(movie.vote_average)}">${movie.vote_average}</span>
      </div>`
      main.appendChild(movieEle);
  })

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


async function popubBox(){
  let data= await fetch(api_url);
  let movieD= await data.json();
  let m = movieD.results;
  showMovies(m)
let overlay=document.createElement('div');
overlay.className= 'popub-overlay';
document.body.appendChild(overlay);
let popub =document.createElement('div');
popub.className='popup';
popub.innerHTML=`
<div class="header">
  <img src="${img.src}">
  <span>${m.vote_average}</span>
  <span>${m.popularity}</span>
  <h3>${m.title}</h3>
  <p>Release date:<span>${m.release_date}</span></p>
</div>
<div class="overView">
  <p>${m.overview}</p>
</div>
`
document.body.appendChild(popub);
}


