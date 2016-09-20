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
	$('#swBody2').html('Films: ' + filmLinks);
	$('#swBody3').html('Starships: ' + starshipLinks);
	  
 };

var showFilms = function(film) {

	
	$('.panel-title').text(film.title);
	$('#swBody1').html('Episode: ' + film.episode_id);
	$('#swBody2').html('Director: ' + film.director);
	$('#swBody3').html('Producer: ' + film.producer);
	  
 };

var showStarships = function(starship) {

	
	$('.panel-title').text(starship.name);
	$('#swBody1').html('Manufacturer: ' + starship.manufacturer);
	$('#swBody2').html('Model: ' + starship.model);
	$('#swBody3').html('Starship Class: ' + starship.starship_class);
	  
 };

var showVehicles = function(vehicle) {

 	$('.panel-title').text(vehicle.name);
	$('#swBody1').html('Manufacturer: ' + vehicle.manufacturer);
	$('#swBody2').html('Model: ' + vehicle.model);
	$('#swBody3').html('Vehicle Class: ' + vehicle.vehicle_class);
 };

var showSpecies = function(species) {

 	$('.panel-title').text(species.name);
	$('#swBody1').html('Language: ' + species.language);
	$('#swBody2').html('Average Height: ' + species.average_height);
	$('#swBody3').html('Homeworld: ' + '<a href="#">' + species.homeworld + '</a>');
 };

var showPlanets = function(planet) {

 	$('.panel-title').text(planet.name);
	$('#swBody1').html('Population: ' + planet.population);
	$('#swBody2').html('Climate: ' + planet.climate);
	$('#swBody3').html('Terrain: ' + planet.terrain);
 };

$(document).ready(function() {

	// initiate the typeahead input field (auto completion)
	$.typeahead({
        input: ".js-typeahead",
        order: "asc",
        group: true,
        cache: true,
        minLength: 1,
        hint: true,
        generateOnLoad: true,
        source: {
            Characters: {
                display: 'name',
                ajax: {
                    url: "http://swapi.co/api/people/",
                    path: "results"
                }
            },
            Films: {
                display: 'title',
                ajax: {
                    url: "http://swapi.co/api/films/",
                    path: "results"
                }
            },
            Starships: {
            	display: 'name',
            	ajax: {
            		url: "http://swapi.co/api/starships/",
            		path: "results"
            	}
            },
            Vehicles: {
            	display: 'name',
            	ajax: {
            		url: "http://swapi.co/api/starships/",
            		path: "results"
            	}
            },
            Species: {
            	display: 'name',
            	ajax: {
            		url: "http://swapi.co/api/species/",
            		path: "results"
            	}
            },
            Planets: {
            	display: 'name',
            	ajax: {
            		url: "http://swapi.co/api/planets/",
            		path: "results"
            	}
            }
        },
        callback: {
            onInit: function (node) {
                console.log('Typeahead Initiated on ' + node.selector);
            },
            onClick: function(node, a, item) {
                console.log(item);
                $('#results').html('');

				if (item.url.indexOf('people') > -1) {
					showPeople(item);
					getPix(item.name);
				}
				else if (item.url.indexOf('films') > -1){
					showFilms(item);
					getPix(item.title);
				}
				else if (item.url.indexOf('starships') > -1){
					showStarships(item);
					getPix(item.name);
				}
				else if (item.url.indexOf('vehicles') > -1){
					showVehicles(item);
					getPix(item.name);
				}
				else if (item.url.indexOf('species') > -1){
					showSpecies(item);
					getPix(item.name);
				}
				else {
					showPlanets(item);
					getPix(item.name);
				}
			}

        }
    });

	// When we click on a result information  e.g. A New Hope  
	$('.panel').on('click', 'a', function(e, elem){
		console.log($(this).text());
		//$(this)[0].click('typeahead-js');
		$('.js-typeahead').val($(this).text());
				
		

	});

});
