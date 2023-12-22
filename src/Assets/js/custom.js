///////////////*****//////////////////
// RESPONSIVE NAVIGATION
// OPEN BTN


import $ from 'jquery';
  $(document).ready(function () {
    $("#navbar").on("click", function() {
      $(".nveMenu").addClass("is-opened");
      $(".overlay").addClass("is-on");
    });

    $(".overlay").on("click", function() {
      $(this).removeClass("is-on");
      $(".nveMenu").removeClass("is-opened");
    });
  });
// CLOSE BTN
  $(".overlay").on("click", function() {
    $(this).removeClass("is-on");
    $(".nveMenu").removeClass("is-opened");
  });

  $(".close-btn-nav").click(function(){
  $(".nveMenu").removeClass("is-opened");
  $(".overlay").removeClass("is-on");
  });
  // RESPONSIVE NAVIGATION
  // 
  // ACTIVE JS START
$(document).ready(function(){
  $('ul li span').click(function(){
    $('li span').removeClass("active-class");
    $(this).addClass("active-class");
});
});
  // ACTIVE JS END
  // 
  // PRELOADER START
$(document).ready(function() {
  setTimeout(function() {
  $('.preloader').fadeOut('slow');
            }, 2000);
});
  // PRELOADER END
///////////////*****//////////////////


$('.popular-tags-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  dots:false,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})

// about us most popular carousel

$('.most_popular_carousel').owlCarousel({
  loop:true,
  margin:10,
  autoplay:true,
  speed:2000,
  nav:false,
  dots:false,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})


var popular = $('.most_popular_carousel');
$('.my-next-button1').click(function() {
// alert('sadad');
popular.trigger('next.owl.carousel');
});

$('.my-prev-button1').click(function() {
  // alert('sadad');
  popular.trigger('prev.owl.carousel');
});

// author carousel

$('.top_author_carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:3
      }
  }
})

var selector = $('.top_author_carousel');
$('.my-next-button2').click(function() {
// alert('sadad');
  selector.trigger('next.owl.carousel');
});

$('.my-prev-button2').click(function() {
  // alert('sadad');
  selector.trigger('prev.owl.carousel');
});



$('.related_novel_carousel').owlCarousel({
  loop:true,
  margin:30,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:6
      }
  }
})


var related_novel = $('.related_novel_carousel');
$('.related_novel_next_button').click(function() {
// alert('sadad');
related_novel.trigger('next.owl.carousel');
});

$('.related_novel_prev_button').click(function() {
  // alert('sadad');
  related_novel.trigger('prev.owl.carousel');
});


// best author novel carousel


$('.best_autor_novel_carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:3
      }
  }
})

var best_novel = $('.best_autor_novel_carousel');
$('.best_author_next_button').click(function() {
// alert('sadad');
best_novel.trigger('next.owl.carousel');
});

$('.best_author_prev_button').click(function() {
  // alert('sadad');
  best_novel.trigger('prev.owl.carousel');
});


$('.featured_novel_carousel').owlCarousel({
  center: true,
  items:2,
  loop:true,
  dots:false,
  margin:30,
  responsive:{
      600:{
          items:2,
          center: true,
      }
  }
});

var featured = $('.featured_novel_carousel');
$('.featured_novel_next_button').click(function() {
// alert('sadad');
featured.trigger('next.owl.carousel');
});

$('.featured_novel_prev_button').click(function() {
  // alert('sadad');
  featured.trigger('prev.owl.carousel');
});


// alos like carousel

$('.also_like_carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  dots:false,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:6
      }
  }
});

var also_like = $('.also_like_carousel');
$('.alsolike_novel_next_button').click(function() {
// alert('sadad');
also_like.trigger('next.owl.carousel');
});

$('.alsolike_novel_prev_button').click(function() {
  // alert('sadad');
  also_like.trigger('prev.owl.carousel');
});

// about testimonial carousel

$('.about_testimonial_casrousel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  dots:false,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:1
      }
  }
})


var about_testimonial = $('.about_testimonial_casrousel');
$('.testimonial_nav_next_button').click(function() {
// alert('sadad');
about_testimonial.trigger('next.owl.carousel');
});

$('.testimonial_nav_prev_button').click(function() {
  // alert('sadad');
  about_testimonial.trigger('prev.owl.carousel');
});



// range bar js


$(function() {

	$('.slider').WBslider();

});