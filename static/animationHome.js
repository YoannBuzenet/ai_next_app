console.log("C'est OKAY");

function callback(entries) {
  entries.filter((el) => {
    if (el.isIntersecting) {
      el.target.classList.add("visible");
    }
  });
}

class ElementToTrigger {
  constructor(observer) {
    this.observer = observer;
    this.init();
  }

  init() {
    const targets = document.querySelectorAll("#animated");

    targets.forEach((li) => {
      this.observer.observe(li);
    });
  }
}

onload = function () {
  var options = {
    rootMargin: "0px",
    threshold: 0.2,
  };

  let observer = new IntersectionObserver(callback, options);

  const keypoints = new ElementToTrigger(observer);
};
