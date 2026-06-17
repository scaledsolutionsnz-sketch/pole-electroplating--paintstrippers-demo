/* Pole Electroplating & Paintstrippers — shared interactions */
(function(){
  // Intro overlay
  var intro = document.querySelector('.intro');
  if(intro){
    window.addEventListener('load', function(){
      setTimeout(function(){ intro.classList.add('done'); }, 1150);
    });
    // safety: never trap the page
    setTimeout(function(){ intro.classList.add('done'); }, 2600);
  }

  // Sticky nav
  var nav = document.querySelector('.nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Mobile menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.style.display === 'flex';
      links.style.display = open ? '' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '100%'; links.style.right = '16px';
      links.style.background = 'rgba(19,16,14,.97)';
      links.style.padding = '18px 22px'; links.style.borderRadius = '8px';
      links.style.gap = '16px';
    });
  }

  // Rolling hero
  var slides = document.querySelectorAll('.hero-slide');
  if(slides.length > 1){
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced){
      var i = 0;
      setInterval(function(){
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 6000);
    }
  }

  // Scroll reveal
  var revs = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revs.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.14});
    revs.forEach(function(el, idx){ el.style.transitionDelay = (idx % 3 * 0.08) + 's'; io.observe(el); });
  } else {
    revs.forEach(function(el){ el.classList.add('in'); });
  }
})();
