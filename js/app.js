(function () {
  // fixed header
  const header = document.querySelector(".header");
  let windowScroll = window.pageYOffset;
  checkScroll(windowScroll);
  window.onscroll = () => {
    let windowScroll = window.pageYOffset;
    checkScroll(windowScroll);
  };
  function checkScroll(windowScroll) {
    if (windowScroll > 50) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  }
  //   nav-toggle
  const navTogle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".header-menu");
  navTogle.onclick = () => {
    nav.classList.toggle("active");
    header.classList.toggle("active");
    navTogle.classList.toggle("active");
  };

  //   smooth scroll
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector(".header").clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll("[data-scroll]");
    links.forEach((each) => {
      each.addEventListener("click", function () {
        const currentTarget = this.dataset.scroll;
        nav.classList.remove("active");
        navTogle.classList.remove("active");
        header.classList.remove("active");
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();

// team slider
$(function () {
  let slider = $("#teamSlider");
  slider.slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
    ],
  });
});

//reviews slider
$(function () {
  let slider = $("#reviewsSlider");
  slider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  });
});

// category filter
$(function () {
  let filter = $("[data-filter]");
  filter.on("click", function (event) {
    event.preventDefault();
    let currentCat = $(this).data("filter");

    let categories = $("[data-cat]");
    if (currentCat == "All") {
      categories.removeClass("hide");
    } else {
      categories.each(function () {
        let workCat = $(this).data("cat");

        if (workCat != currentCat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });
});
