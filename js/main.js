var searchTags = function(tags) {

	var request = {
		scope: 'public_content',
		// count: 10,
		access_token: ''
	};

	$.ajax({
		url: 'https://api.instagram.com/v1/tags/dogsofinstagram/media/recent',
		data: request,
		dataType: "jsonp", //use jsonp to avoid cross origin issues
	})
	.done(function (result) {
		console.log(result);
	});

	var image = "<img src='" + object.link + "'>";
	result.find('.img-responsive').append(image);
}

$(document).ready(function(){
	searchTags('dogsofinstagram');
});