const head = document.querySelector("header");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const leftText = `I started my career as a computational chemist. 
                  Unlike a traditioanl chemist, I used computer 
                  and computer softwares as my experimental tools. 
                  If I am asked to use one sentence to summarize 
                  my research, I'd say it is all about 
                  developing computational methods that bridge 
                  the gap between the macroscopic world that is 
                  described by classical mechanics and the molecular 
                  world that is dictated by quantum mechanics. 
                  Sounds cool, huh?`;

const rightText = `I fell in love with programming while doing 
                   research. I've learned to code in some of the 
                   mainstream languages like C, C++, FORTRAN, 
                   Java, JavaScript, Python, Perl, and even Unix 
                   shell scripting through jobs and technical 
                   trainings. Curious of what I have done in the 
                   past and plan to do in the future? Then browse 
                   through my page to learn more or click on the 
                   links to my resume, Github and LinkedIn pages.`;

left.addEventListener("mouseenter", function(){
  head.classList.add("hover-left");
});

left.addEventListener("mouseleave", function() {
  head.classList.remove("hover-left");
});

right.addEventListener("mouseenter", function() {
  head.classList.add("hover-right");
});

right.addEventListener("mouseleave", function() {
  head.classList.remove("hover-right");
});

//JQuery Smooth scrolling to anchor elements
$(function() {
    //Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	});
});

// Scroll Reveal effects
window.sr = ScrollReveal({ reset: true });

sr.reveal('.navbar', {
	duration: 2000,
	origin: 'bottom'
});


$(document).ready(function(){

    // Copy email address to clipboard
    var clipboard = new Clipboard('#email');

    clipboard.on('success', function(e) {
   	    $("#email-tooltip").attr("tooltip", "My email address has been copied to your clipboard");
   	    //reset
   	    $('#email-tooltip').mouseleave(function() {
		    setTimeout( function(){
		    	e.clearSelection();
				$('#email-tooltip').attr("tooltip", "Click to copy my email address to your clipboard");
			}, 500);
		}); 	   
    });

    clipboard.on('error', function(e) {
   	    $("#email-tooltip").attr("tooltip", "Sorry, copy failed! Try again!");
   	    setTimeout(function() {
   	   	    $("#email-tooltip").attr("tooltip", "Click to copy my email address to your clipboard");
   	    }, 1000);
    });

    //Create the typing effects
	var leftTimeout = 0;
	var rightTimeout = 0;

	// $("main").hide();
	function clearTimer() {
		if(leftTimeout) 
			clearTimeout(leftTimeout);

		if(rightTimeout)
			clearTimeout(rightTimeout);

		$("#left-text").text("");
		$("#right-text").text("");
	}

	$(".navbar-brand").click(function(e) {
		// e.preventDefault();
		// $("main").hide();
		// $("header").show();	
		clearTimer();
		$("#left-text").text(leftText);
		$("#right-text").text(rightText);
		return true;
	});

	function typing(el, text, ptr) {
		if (ptr < text.length) {
			// var text = $(".left-text").text();
			// $(".left-text").text(function() {
			// 	return text + leftText.charAt(ptr);
			// });
	  //       ptr++;
	  //       setTimeout(typing, 50);
	        var txt = $("#"+ el).text();
	        $("#"+ el).text(function() {
	        	return txt + text.charAt(ptr);
	        });
	        ptr++;
	        if(el.includes("left")) {
	        	leftTimeout = setTimeout(function() {
	        		console.log(leftTimeout);
		        	typing(el, text, ptr);
		        }, 50);
	        }
	        else {
	        	rightTimeout = setTimeout(function() {
	        		console.log(rightTimeout);
		        	typing(el, text, ptr);
		        }, 50);
	        }	        
	    }
	}

	$(".more").click(function(event) {
		event.preventDefault();

		clearTimer();

		// $("header").hide();
		// $("main").show();
		//programmatically jump to an anchor
	    var target = $(this).attr('href');
	    // var new_position = $('#'+target).offset();
	    // window.scrollTo(new_position.left, new_position.top);
	    // return false;
	    
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 2000);

        var el = target.split("-")[1] + "-text";
        // var text = target.split("-")[1] === "left" ? leftText : rightText;
        // $("#"+ el).text("");
        if(target.split("-")[1] === "left") {
        	text = leftText;
        	$("#right-text").text(rightText);
        }
        else {
        	text = rightText;
        	$("#left-text").text(leftText);
        }
        var ptr = 0;
        typing(el, text, ptr);
    });
	
	$("#about-link").click(function(event) {
		// $("header").hide();
		// $("main").show();
		event.preventDefault();

		clearTimer();

		var target = $(this).attr('href');
		$('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 2000);

        // $("#left-text").text("");
        // $("#right-text").text("");
        $("#left-text").text(leftText);
        $("#right-text").text(rightText);
	});
// function typing(text, str) {
// 	var ptr = 0;
// 	if (ptr < text.length) {
// 		document.querySelector(`${str}-text`).innerHTML += text.charAt(ptr);
//         ptr++;
//         setTimeout(typing, 50);
//     }
// }

	// $(window).scroll(function() {
	//     var hT = $('#about-left').offset().top,//the offset coordinates for the selected elements from the top in pixels
	//         hH = $('#about-left').outerHeight(),//element total height
	//         wH = $(window).height(),
	//         wS = $(this).scrollTop();
	//     console.log("outside " + wS);
	//     if(wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)) {
	//    	    console.log("inside " + wS);
	//    	    $(".left-text").text("");
	//       	typing();
	//       	ptr = 0;
	//     }
	// });
});

// $(window).scroll(function() {
//    var hT = $('.typewriter').offset().top,
//        hH = $('.typewriter').outerHeight(),
//        wH = $(window).height(),
//        wS = $(this).scrollTop();
//    if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
//       if($('.typewriter').hasClass("left-text"))
//       	typing(leftText, 'left');
//       else if($('.typewriter').hasClass("right-text"))
//       	typing(rightText, 'right');
//    }
// });

// $(function() {
// 	console.log("scrolled");
// 	$(window).scroll(function() {
//        console.log("inside");
// 	   var hT = $('#about-left').offset().top,
// 	       hH = $('#about-left').outerHeight(),
// 	       wH = $(window).height(),
// 	       wS = $(this).scrollTop();
// 	   if(wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)) {
// 	      	$("#about-left").hide();
// 	   }
// 	});
// });




