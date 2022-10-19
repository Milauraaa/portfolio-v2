var txtRotate = function (el, toRotate, period) {
  this.el = el;
  this.loopNum = 0;
  this.txt = "";
  this.toRotate = toRotate;
  this.isDeleting = false;
  this.period = parseInt(period, 10) || 2000;
  this.tick();
};

txtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 200;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new txtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.innerHTML =
    ".txt-rotate > .wrap { border-right: 0.08em solid rgb(227, 221, 204); padding: 0 2px; }";
  document.body.appendChild(css);
};

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".navLinks");
  const navLinks = document.querySelectorAll(".navLinks li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s linear forwards ${
          index / 6 + 0
        }s`;
      }
    });

    burger.classList.toggle("toggle");
  });
};
navSlide();

var line = document.getElementById("loading-line");
window.addEventListener("scroll", progressBar);

function progressBar(e) {
  var windowScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  var windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var width_progress_line = (windowScroll / windowHeight) * 100;
  line.style.width = width_progress_line + "%";
}
