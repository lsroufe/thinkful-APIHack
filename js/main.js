
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

// var swStarships = new Bloodhound({
//   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
//   queryTokenizer: Bloodhound.tokenizers.whitespace,
//   prefetch: '../data/nhl.json'
// });

// var swVehicles = new Bloodhound({
//   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
//   queryTokenizer: Bloodhound.tokenizers.whitespace,
//   prefetch: '../data/nhl.json'
// });

// var swSpecies = new Bloodhound({
//   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
//   queryTokenizer: Bloodhound.tokenizers.whitespace,
//   prefetch: '../data/nhl.json'
// });

// var swPlanets = new Bloodhound({
//   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
//   queryTokenizer: Bloodhound.tokenizers.whitespace,
//   prefetch: '../data/nhl.json'
// });

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
	});

	// when a search result is selected
	$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
  	console.log('Selection: ' + suggestion.name);
  	$('#results').html('');
  	getPix(suggestion.name);
	});

	getPix('Star Wars Luke Skywalker');
});
