/* eslint no-restricted-globals: 'off' */

// Iteration 1: All rates average - Get the average of all rates with 2 decimals 

// const arr = require('./data')
 
const ratesAverage = arr => {
  let sum = 0
  sum = arr.reduce((total, movie) => total + movie.rate, 0)
  return parseFloat((sum / arr.length).toFixed(2))
}

// Iteration 2: Drama movies - Get the average of Drama Movies

const dramaMoviesRate = arr => {
  let sum = 0
  let dramaMovie = []
  dramaMovie = arr.filter(movie => movie.genre.includes('Drama'))
  if (dramaMovie.length === 0) {
    return 0
  }
  sum = dramaMovie.reduce((total, movie) => total + movie.rate, 0)
  return parseFloat((sum / dramaMovie.length).toFixed(2))
}

// Iteration 3: Ordering by duration - Order by time duration, ascending (in growing order)

const orderByDuration = arr => {
  let orderMovie = [];
  orderMovie = [...arr];
  orderMovie.sort((a, b) => {
    if (a.duration > b.duration) {
      return 1
    } else if (a.duration < b.duration) {
      return -1
    } else {
      return a.title.localeCompare(b.title)
    }
  })
  return orderMovie
}
// // Iteration 4: Steven Spielberg. The best? - How many movies did STEVEN SPIELBERG direct

const howManyMovies = arr => {
  let dramaMovie = [];
  dramaMovie = arr.filter(item => item.genre.includes("Drama")).filter(item => item.director.includes("Steven Spielberg"));
  return dramaMovie.length;
}

// Iteration 5: Alphabetic Order - Order by title and print the first 20 titles

const orderAlphabetically = arr => {
  let result = []
  arr.sort((a, b) => a.title.localeCompare(b.title)).filter(elem => result.push(elem.title))

  console.log(result.slice(0, 20))
  return result.slice(0, 20)
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes

const turnHoursToMinutes = arr => {
  let durationMin = [];
  let movieTime = 0;
  //forma de fazer a cópia criando um novo array sem referenciar
  const newArr = JSON.parse(JSON.stringify(arr));
  durationMin = newArr.map(item => {
    //verificar se existe parâmetro de horas.
    //Se tiver, o indexOf vai retornar um valor acima de -1.
    //Se tiver o h, pegar o valor do inicio até o indice do h, que são as horas, e multiplica por 60.
    if (item.duration.indexOf('h') >= 0) {
      movieTime += item.duration.slice(0, item.duration.indexOf('h')) * 60;
      //se tiver minutos, pega o valor entre o espaço e o m e converte em numero, com a multiplicação por 1
      if (item.duration.indexOf('m') >= 0) {
        movieTime += 1 * item.duration.slice(item.duration.indexOf(' '), item.duration.indexOf('m'));
      }
    } else {
      // se nao tiver h, o valor do inicio até o indice de m será os minutos.
      // o 1* é pra converter rapidamente a string em numero.
      movieTime += 1 * item.duration.slice(0, item.duration.indexOf('m'));
    }
    //atribui o valor calculado para a duraçao de cada objeto
    item.duration = movieTime;
    //retorna o objeto, ou seja, o item.
    return item;
  });
  return durationMin;
}

// BONUS Iteration: Best yearly rate average - Best yearly rate average

const bestYearAvg = (arr) => {
  if (arr.length === 0) return null
  let years = arr.map(function (item) {
    return item.year
  })
  years = [...new Set(years)]
  let yearsAndMovies = [];
  years.forEach(item => {
    yearsAndMovies.push({
      year: item,
      arr: arr.filter(function (element) {
        return element.year === item
      })
    })
  });

  yearsAndMovies = yearsAndMovies.map(item => {
    item.average = ratesAverage(item.arr)
    return item
  })
  if (yearsAndMovies.length === 1) {
    return `The best year was ${yearsAndMovies[0].year} with an average rate of ${yearsAndMovies[0].average}`
  } else {
    let best = yearsAndMovies.sort((a, b) => {
      if (a.year > b.year) {
        return 1
      } else if (a.year < b.year) {
        return -1
      } else {
        return 0
      }
    }).sort((a, b) => {
      return b.average - a.average
    })[0]
    return `The best year was ${best.year} with an average rate of ${best.average}`
  }
}


// bestYearAvg(listMovies)