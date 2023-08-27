// Wraped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  //listener for click events on the save button.
  $(".saveBtn").on("click", onSaveButtonClick);

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

  //get any user input that was saved in localStorage.
  retrieveLocalStorage();

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

// Handles the click event on the save button.
// Saves the user's input for the corresponding hour to localStorage.
function onSaveButtonClick(event) {
  var target = $(event.target);
  var text = "";
  var hour = "";
  if (target.hasClass("saveBtn")) {
    hour = target.parent().attr("id");
    text = target.prev().val();
  } else {
    //     // Handle the case where the user clicks on the save icon instead of the button itself.
    hour = target.parent().parent().attr("id");
    text = target.parent().prev().val();
  }

  localStorage.setItem(hour, text);
}

//Retrieves the user's input for each hour from localStorage and displays it in the corresponding textarea.
function retrieveLocalStorage() {
  for (var i = 9; i <= 17; i++) {
    var text = localStorage.getItem("hour-" + i);
    $("#hour-" + i + " textarea").val(text);
  }
}
