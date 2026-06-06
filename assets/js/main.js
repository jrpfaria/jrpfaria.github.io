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
    var pageBottom = document.body.scrollHeight;

    // Clear all
    navLinks.forEach(function (l) { l.style.color = ""; });

    // Bottom of page → highlight last link
    if (scrollBottom >= pageBottom - 2) {
      var last = navLinks[navLinks.length - 1];
      if (last) last.style.color = accent;
      return;
    }

    // Normal: iterate in reverse, pick the first section whose top ≤ scrollY + offset
    var offset = 100;
    for (var i = sections.length - 1; i >= 0; i--) {
      var section = sections[i];
      var top = section.offsetTop;
      if (scrollY + offset >= top) {
        var id = section.getAttribute("id");
        navLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + id) {
            link.style.color = accent;
          }
        });
        return;
      }
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();
})();
