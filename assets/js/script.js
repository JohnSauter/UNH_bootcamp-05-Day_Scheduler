const current_time = $("#current_time");
const new_project_form = $("#new_project_form");
const add_project_form = $("#new_project");
const project_name = $("#project_name");
const project_type = $("#project_type");
const project_hourly_wage = $("#project_hourly_wage");
const project_due_date = $("#project_due_date");
const projects_table_body = $("#projects_table_body");
const now = moment();
let project_number = 0;
const project_modal = $("#project_modal");
const error_message = $("#error_message");

$(function () {
  /* Run the once-a-second code to update the current time.  */
  setInterval(one_second, 1000);
  /* $("#project_type").selectmenu();  */

  /* Use the jQuery UI datepicker when asking for the due date
   * of a new project.  */
  project_due_date.datepicker({
    minDate: 5, /* not less than five days for a project */
    beforeShowDay: $.datepicker.noWeekends, /* Not due on weekends */
    changeMonth: true,
    changeYear: true,
    showOtherMonths: true,
    showButtonPanel: true
  }); 

});

/* Function to update the displayed date and time once a second.  */
function one_second () {
  const now = moment();
  const now_string = now.format("dddd MMMM D, Y HH:mm:ssZ")
  current_time.text(now_string);
}

/* Function to display a new project in the table of projects.  */
function add_project (name, type, hourly_wage, due_date) {
  const new_row = $("<tr>");
  const name_td = $("<td>").append(name);
  const type_td = $("<td>").append(type);
  const hourly_wage_td = $("<td>").append(hourly_wage);
  const due_date_td = $("<td>").append(due_date);
  const days_left = moment(due_date, "MM/DD/YYYY").diff (now, "days") + 1;
  const days_left_td = $("<td>").append(days_left);
  const earned = 8.0*(hourly_wage)*days_left;
  const earned_td = $("<td>").append(earned);

  new_row.append(name_td);
  new_row.append(type_td);
  new_row.append(hourly_wage_td);
  new_row.append(due_date_td);
  new_row.append(days_left_td);
  new_row.append(earned_td);

  project_number = project_number + 1;
  const button_dom = $("<button type='button' class='btn btn-secondary btn-sm' " +
    "data-index=" + project_number + ">" + "×" + "</button>");
  const button_td = $("<td>").append(button_dom);
  new_row.append(button_td);

  projects_table_body.append(new_row);
}

/* Function to validate a string as a date.  The format is MM/DD/YYYY */
function is_valid_date (provided_date ) {
  let the_date;
  try {
    the_date = $.datepicker.parseDate("mm/dd/yy", provided_date);
  } catch (error) { return false};
  /* The chosen date must be at least 5 days in the future.  */
  const the_date_moment = moment(the_date);
  const the_diff = the_date_moment.diff(now, 'days');
  if (the_diff < 4) {
    return false;
  }
  return true;
}

/* Function to get the information about a new project.  */
function new_project (event) {
  event.preventDefault();

  /* Capture the values entered.  */
  const project_name_val = project_name.val();
  const project_type_val = project_type.val();
  const project_hourly_wage_val = project_hourly_wage.val();
  const project_due_date_val = project_due_date.val();

  /* Verify that the date is valid.  */
  error_message.text("");
  error_message.addClass("d-none");
  error_message.removeClass("d-inline-block");
  if (!is_valid_date (project_due_date_val)) {
    error_message.text("Date is invalid.");
    error_message.addClass("d-inline-block");
    error_message.removeClass("d-none");
    return;
  }
  
  /* Add the new project to the table of projects.  */
  add_project (project_name_val, project_type_val, project_hourly_wage_val,
    project_due_date_val);
    
  /* Erase the form.  */
  project_name.val("");
  project_type.val("community service");
  project_hourly_wage.val("");
  project_due_date.val("");

  /* Dismiss the modal.  */
  project_modal.modal("hide");
}

/* Use the above handler when adding a project.  */
add_project_form.on("submit", new_project);

/* Function to delete a project.  */
function delete_project (event) {
  const the_button = event.target;
  const the_td = the_button.parentElement;
  const the_tr = the_td.parentElement;
  const project_to_delete = the_tr;
  project_to_delete.remove();
}

/* When the Delete button is clicked, delete the project.  */
projects_table_body.on("click", "button", delete_project);
