(function() {

  /**
   * Attaches click listener to the choose course button
   */
  function setUpRunButton() {
    const chooseCourseButton = document.querySelector('#chooseCourse');
    chooseCourseButton.addEventListener('click', (e) => {
      const chosenCourse = document.querySelector('#chosenCourse').value;
      window.location.hash = `startCoding/${chosenCourse}`;
      e.preventDefault();
    });
  }

  waitForComponentToLoad().then(setUpRunButton);

})();
