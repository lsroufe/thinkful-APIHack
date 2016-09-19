
// Send request to SWAPI to return all Star Wars Characters
var swPeople = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://swapi.co/api/people/',
    transform: function(response) {
      return response.results;
    }
  }
});

// Send request to SWAPI to return all Star Wars Films
var swFilms = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://swapi.co/api/films/',
    transform: function(response) {
    	return response.results;
    }
  }
});

var swStarships = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://swapi.co/api/starships/',
    transform: function(response) {
    	return response.results;
    }
  }
});

var swVehicles = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://swapi.co/api/vehicles/',
    transform: function(response) {
    	return response.results;
    }
  }
});

var swSpecies = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://swapi.co/api/species/',
    transform: function(response) {
    	return response.results;
    }
  }
});

var swPlanets = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://swapi.co/api/planets/',
    transform: function(response) {
    	return response.results;
    }
  }
});

// Function to send search term request to 500px API and return 20 images
var getPix = function(term) {

	term = 'star+wars ' + term;

	var consumer_key = 'r41HCJJ4F3iIJZeFeacW0RCHFXMCBe5TdoT2cclI';
	var url = 'https://api.500px.com/v1/photos/search?term=' + term;

	$.ajax({
		'url': url,
		'data': {
			'consumer_key' : consumer_key,
			'image_size' : 600,
			'sort' : 'rating',
			'exclude' : 'nude'
		}
	})
		.done(function(data) {
	    console.log( "Sample of data:", data );

	    $.each(data.photos, function(index, item) {
				var swPhoto = showPix(item);
				$('#results').append(swPhoto);
			});
	  });
 };

// Function to display the images on screen
 var showPix = function(photo) {
 	
 	var image = "<div class='col-xs-12 col-md-3'><div class='thumbnail'><img class='img-responsive' src='" + photo.image_url + "'></div></div>";
 	return image;
 };

var getPlanetName = function(planetUrl) {

	var planetName;
	$.ajax({
		'url': planetUrl,
		async: false
	})
	.done(function (response) {
		planetName = response.name;
	});

	return planetName;
}

//  eg. filmArray = ['http://swapi.co/api/films/6/',http://swapi.co/api/films/3/,http://swapi.co/api/films/2/,http://swapi.co/api/films/1/,http://swapi.co/api/films/7]
var getFilmLinks = function(filmArray) {

	var filmLinks = '';

	$.each(filmArray, function(index, film) {
		$.ajax({
			'url' : film,
			async: false
		})
		.done(function(response){
			if (index == 0) {
				filmLinks = filmLinks + '<a href="#">' + response.title + '</a>';
			}
			else {
				filmLinks = filmLinks + ', ' + '<a href="#">' + response.title + '</a>';
			}
		})
	});

	return filmLinks;
}

var getStarshipLinks = function(starshipArray) {

	var starshipLinks = '';

	$.each(starshipArray, function(index, starship) {
		$.ajax({
			'url' : starship,
			async: false
		})
		.done(function(response){
			if (index == 0) {
				starshipLinks = starshipLinks + '<a href="#">' + response.name + '</a>';
			}
			else {
				starshipLinks = starshipLinks + ', ' + '<a href="#">' + response.name + '</a>';
			}
		})
	});

	return starshipLinks;
}


var showPeople = function(character) {

	var homeworld = getPlanetName(character.homeworld);
	var filmLinks = getFilmLinks(character.films);
	var starshipLinks = getStarshipLinks(character.starships);

	$('.panel-title').text(character.name);
	$('#swBody1').html('Homeworld: ' + '<a href="#">' + homeworld + '</a>');
	$('#swBody2').html('Films: ' + filmLinks );
	$('#swBody3').html('Starships: ' + starshipLinks);
	  
 };

var showFilms = function(film) {

	
	$('.panel-title').text(film.title);
	$('#swBody1').html('Episode: ' + film.episode_id);
	$('#swBody2').html('Director: ' + film.director );
	$('#swBody3').html('Producer: ' + film.producer);
	  
 };

 var showStarships = function(starship) {

	
	$('.panel-title').text(starship.name);
	$('#swBody1').html('Manufacturer: ' + starship.manufacturer);
	$('#swBody2').html('Model: ' + starship.model );
	$('#swBody3').html('Starship Class: ' + starship.starship_class);
	  
 };

$(document).ready(function() {

	// initiate the typeahead input field (auto completion)
	$('#multiple-datasets .typeahead').typeahead(
		{
		  highlight: true
		},
		{
		  name: 'sw-names',
		  display: 'name',
		  source: swPeople,
		  templates: {
		    header: '<h3 class="star-wars">Star Wars Characters</h3>'
		  }
		},
		{
		  name: 'sw-films',
		  display: 'title',
		  source: swFilms,
		  templates: {
		    header: '<h3 class="star-wars">Star Wars Films</h3>'
		  }
		},
		{
		 	name: 'sw-starships',
		 	display: 'name',
		 	source: swStarships,
		 	templates: {
		 	 header: '<h3 class="star-wars">Star Wars Starships</h3>'		
		  } 
	});		

	// when a search result is selected
	$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
		console.log('Selection: ' + suggestion.url);

		$('#results').html('');

		if (suggestion.url.indexOf('people') > -1) {
			showPeople(suggestion);
			getPix(suggestion.name);
		}
		else if (suggestion.url.indexOf('films') > -1){
			showFilms(suggestion);
			getPix(suggestion.title);
		}
		else if (suggestion.url.indexOf('starships') > -1){
			showStarships(suggestion);
			getPix(suggestion.name);
		}
		else if (suggestion.url.indexOf('vehicles') > -1){
			showVehicles(suggestion);
			getPix(suggestion.name);
		}
		else if (suggestion.url.indexOf('species') > -1){
			showSpecies(suggestion);
			getPix(species.name);
		}
		else {
			showPlanets(suggestion);
			getPix(suggestion.name);
		}
	});
});
