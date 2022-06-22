'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', () => {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // window.scrollTo({
  //   left: window.scrollX + s1coords.left,
  //   top: window.scrollY + s1coords.top,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(el => {
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (!e.target.classList.contains('nav__link--btn')) document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  // console.log(this);
  // console.log(e.target);
  // console.log(id);
});

//tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tabContent => tabContent.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//menu fade animation
const nav = document.querySelector('.nav');

const menuChangeOpacity = function (opacity) {
  // console.log(this);
  // console.log(e.currentTarget);
  // console.log(e.target);
  return e => {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      // const siblings = nav.querySelectorAll('.nav__link');
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      // const logo = nav.querySelector('img');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(sibling => {
        if (sibling !== link) sibling.style.opacity = opacity; // this; //"this" in now opacity
      });
      logo.style.opacity = opacity; // this;
    }
  };
};

// nav.addEventListener('mouseover', menuChangeOpacity.bind(0.5));
nav.addEventListener('mouseover', menuChangeOpacity(0.5));

// nav.addEventListener('mouseout', menuChangeOpacity.bind(1));
nav.addEventListener('mouseout', menuChangeOpacity(1));

//sticky navigation
const header = document.querySelector('.header');
const rootMarginPercent = (nav.getBoundingClientRect().height / window.innerHeight) * 100;

const stickyNav = entries => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${rootMarginPercent}%`
});
headerObserver.observe(header);

//revealing elements on scroll
const allSections = document.querySelectorAll('.section');
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  imgTargets.forEach(img => {
    img.src = img.dataset.src;
    img.addEventListener('load', () => {
      img.classList.remove('lazy-img');
    });
  });
  // observer.unobserve(entry.target);
  observer.unobserve(section1);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0
  // rootMargin: '20%'
});

// imgTargets.forEach(img => imgObserver.observe(img));
imgObserver.observe(section1);
