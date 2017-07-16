$(function(){
	$('#box').waterfall({
		// top offset
		top : false, 

		// the container witdh
		w : false, 

		// the amount of columns
		col : false, 

		// the space bewteen boxes
		gap : 5,

		// breakpoints in px
		// 0-400: 1 column
		// 400-600: 2 columns
		// 600-800: 3 columns
		// 800-1000: 4 columns
		gridWidth : [0,400,600,800,1200],

		// the interval to check the screen
		refresh: 500,
		timer : false,
		scrollbottom: false
	});


	function fetchTrendingPics(container){
		$.ajax({
        	url: "http://api.giphy.com/v1/gifs/trending",
				    method: "GET",
				    data: { 
				      "api_key": "7ba064d8ea284241aa8d266e854fe402"
				  	}
        }).done(function(resp){
        	console.log("success");
        	console.log(resp);
        	for(var i = 0; i < resp.data.length; i++){
        		var imgContainer = document.createElement('div');
        		var imgLink = document.createElement('a');
        		imgLink.setAttribute("href", resp.data[i].bitly_url);
        		imgLink.setAttribute("target", "_blank");
        		var img = document.createElement('img');
        		img.width = resp.data[i].images.fixed_width.width;
        		img.height = resp.data[i].images.fixed_width.height;
        		img.src = resp.data[i].images.fixed_width.url;
        		img.setAttribute("class", "floating-img");
        		imgLink.appendChild(img);
        		imgContainer.appendChild(imgLink);
        		container.append(imgContainer);
        	}
          if(resp)  	  
            container.waterfall('sort');
          else
            container.waterfall('end');
        }).fail(function(xhr) {
       		console.log('error', xhr);
		});
	}

	$(window).on("scroll", function() {
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();
		if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
			fetchTrendingPics($('#box'));		    
		}
	});

	fetchTrendingPics($('#box'));
	

});