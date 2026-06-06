(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });

    document.addEventListener("click", function (e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove("open");
      }
    });
  }

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
    });
  });

  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");
  var accent = "#5f81a5";

  function updateActiveLink() {
    var scrollY = window.scrollY;
    var scrollBottom = scrollY + window.innerHeight;
    var pageBottom = document.documentElement.scrollHeight;

    navLinks.forEach(function (l) { l.style.color = ""; });

    // Bottom of page → last nav link
    if (pageBottom - scrollBottom <= 2) {
      var last = navLinks[navLinks.length - 1];
      if (last) last.style.color = accent;
      return;
    }

    // Walk forward: highlight the last section whose top has been scrolled past
    var current = null;
    var offset = 120;
    for (var i = 0; i < sections.length; i++) {
      if (scrollY + offset >= sections[i].offsetTop) {
        current = sections[i];
      }
    }

    if (current) {
      var id = current.getAttribute("id");
      navLinks.forEach(function (link) {
        if (link.getAttribute("href") === "#" + id) {
          link.style.color = accent;
        }
      });
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();
})();
