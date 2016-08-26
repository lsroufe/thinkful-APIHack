var swPeople = new Bloodhound({
	local: ['dog', 'pig', 'moose'],
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: 'http://swapi.co/api/people/?format=json'
  }
});

var swFilms = new Bloodhound({
  datumTokenizer: function(datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: 'http://swapi.co/api/films/?format=json'
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
});
