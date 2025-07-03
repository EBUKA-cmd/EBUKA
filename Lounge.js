// Scroll fade-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Typing animation
const textArray = ["Web Developer", "Creative Thinker", "Problem Solver", "UI/UX Enthusiast"];
const typedText = document.querySelector(".typed-text");
let index = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = textArray[index];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex--);
  } else {
    typedText.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % textArray.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}
type();

// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Skills animation
const skillSection = document.querySelector('#skills');
const skillBars = skillSection.querySelectorAll('.fill');
const skillPercents = skillSection.querySelectorAll('.percent');
let skillsAnimated = false;

const runSkillAnimation = () => {
  skillBars.forEach((bar, i) => {
    const percent = parseInt(bar.getAttribute('data-percent'));
    bar.style.width = percent + '%';

    let count = 0;
    const interval = setInterval(() => {
      if (count >= percent) {
        clearInterval(interval);
      } else {
        count++;
        skillPercents[i].innerText = count + '%';
      }
    }, 20);
  });
};

const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    runSkillAnimation();
    skillsAnimated = true;
  }
}, { threshold: 0.5 });

skillObserver.observe(skillSection);
