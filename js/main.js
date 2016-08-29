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

var term = 'luke skywalker';
var consumer_key = 'r41HCJJ4F3iIJZeFeacW0RCHFXMCBe5TdoT2cclI';

var url = 'https://api.500px.com/v1/photos/search?term=' + term;

$.ajax({
	'url': url,
	'data': {
		'consumer_key' : consumer_key
	}
})
	.done(function( data ) {
    console.log( "Sample of data:", data );
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
$(document).ready(function() {
	$('#multiple-datasets .typeahead').typeahead({
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

	$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
  	console.log('Selection: ' + suggestion.name);
	});
});
