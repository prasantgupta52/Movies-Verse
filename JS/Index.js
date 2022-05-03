const movies = document.getElementById("movies");
const searchBtn = document.getElementById("search");
const searchTerm = document.getElementById("search-term");
const movieInfo = document.getElementById("movie-info");
const moviePopup = document.getElementById("movie-popup");
const popupCloseBtn = document.getElementById("close-popup");
// const mealInfoEl = document.getElementById("meal-info");

getComingSoon();



async function getComingSoon() {
  try {
    const resp = await fetch(
        "https://imdb-api.com/en/API/ComingSoon/k_7oioc1x6"
    );
    const respData = await resp.json();
    const comingsoon = respData.items[0];
    const imdbid = comingsoon.id;
    const poster = await fetch(
      `https://imdb-api.com/en/API/Posters/k_7oioc1x6/${imdbid}`
    );
    const Poster = await poster.json();
    addMovie(comingsoon,Poster.posters, true);
  } catch (error) {
    movies.innerHTML="";
    // console.log("kkk+");
    // console.log(error);
    const err = document.createElement("div");
    err.innerHTML = 
    `<div class="fav-container pink">
    <h3>Sorry..! Come Back Tommorow <br> Today's API limit Exceded</h3>
    </div>`;
    movies.appendChild(err);
  }
}





async function showMovieInfo(movieeData) {
  movieInfo.innerHTML = "";
  const movieD = await fetch(
    `https://imdb-api.com/en/API/Title/k_7oioc1x6/${movieeData.id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`
  );
  const movieeeData = await movieD.json();
  console.log(movieeeData);
  const moviee = document.createElement("div");
  var poster = movieeeData.posters.posters[Math.floor(Math.random()*movieeeData.posters.posters.length)];
  

  moviee.innerHTML = `
      <h1>${movieeeData.fullTitle}</h1>
      <img
          src="${poster.link}"
          alt="${movieeeData.title}"/>
      <p>${movieeeData.wikipedia.plotShort.plainText}</p>`;
      // <h3>Ingredients:</h3>
      // <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>`;

  movieInfo.appendChild(moviee);

  moviePopup.classList.remove("hidden");
}





function addMovie(movieData,posters, random = false) {
  console.log(movieData);
  const movie = document.createElement("div");
  movie.classList.add("movie");
  if(random) {
      var poster = posters[Math.floor(Math.random()*posters.length)];
      movie.innerHTML = `
          <div class="movie-header">
              ${random? `<span class="random"> Coming Soon...! </span>`: ""}
              <img
                  src="${poster.link}"
                  alt="${movieData.title}"/>
          </div>
          <div class="movie-body">
              <h4>${movieData.fullTitle}</h4>
              <button class="fav-btn"><i class="fas fa-heart"></i></button>
          </div>`;
  } else {
      movie.innerHTML = `
          <div class="movie-header">
              ${random? `<span class="random"> Coming Soon...! </span>`: ""}
              <img
                  src="${movieData.image}"
                  alt="${movieData.title}"/>
          </div>
          <div class="movie-body">
              <h4>${movieData.title}&nbsp${movieData.description}</h4>
              <button class="fav-btn"><i class="fas fa-heart"></i></button>
          </div>`;
  }
  // const btn = movie.querySelector(".movie-body .fav-btn");

  // btn.addEventListener("click", () => {
  //     if (btn.classList.contains("active")) {
  //         removeMovie(mealData.idMeal);
  //         btn.classList.remove("active");
  //     } else {
  //         addMealLS(mealData.idMeal);
  //         btn.classList.add("active");
  //     }

  //     fetchFavMovies();
  // });


  movie.addEventListener("click", () => {
      showMovieInfo(movieData);
  });

  movies.appendChild(movie);
}





async function getMovieBySearch(term) {
  const resp = await fetch(
      `https://imdb-api.com/en/API/Search/k_7oioc1x6/${term}`
  );

  const respData = await resp.json();
  const movie = respData.results;

  return movie;
}





searchBtn.addEventListener("click", async () => {
  movies.innerHTML = "";

  const search = searchTerm.value;
  const movie = await getMovieBySearch(search);
  console.log(movie);

  if (movie) {
      movie.forEach((item) => {
          addMovie(item);
      });
  }
});



popupCloseBtn.addEventListener("click", () => {
  moviePopup.classList.add("hidden");
});