// Wraped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  //
  //
  // Apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  for (var hour = 9; hour <= 17; hour++) {
    if (checkHour(hour) == -1) {
      $("#hour-" + hour).addClass("past");
    } else if (checkHour(hour) == 0) {
      $("#hour-" + hour).addClass("present");
    } else {
      $("#hour-" + hour).addClass("future");
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // Extend dayjs with the advancedFormat plugin
  dayjs.extend(window.dayjs_plugin_advancedFormat);
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));
});

// Ruturns -1 if in the past, returns 0 in the present, returns +1 in the future.
// Hour will be in 24 hr clock.
function checkHour(hour) {
  var currentHour = dayjs().hour();

  if (currentHour > hour) {
    return -1;
  } else if (currentHour == hour) {
    return 0;
  } else {
    return 1;
  }
}
