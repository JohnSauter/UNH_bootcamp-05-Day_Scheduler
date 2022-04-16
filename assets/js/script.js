const current_date = $("#current_date");
const now = moment();
current_date.text(now.format("dddd[.] MMMM Do"))

/* Go through all the time blocks, coloring them to
 * indicate past, present or future.  */

const hour_ids = ["time_0900", "time_1000", "time_1100",
  "time_1200", "time_1300", "time_1400", "time_1500",
  "time_1600", "time_1700" ];
const hour_numbers = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const this_hour = parseInt(now.format("HH"));

for (let i=0;i<hour_ids.length;i++) {
  let line_class = "past_line";
  if (this_hour === hour_numbers[i]) {
    line_class = "present_line";
  } else {
    if (this_hour < hour_numbers[i]) {
      line_class = "future_line";
    }
  }
  const input_element = $("#" + hour_ids[i]);
  input_element.addClass(line_class);

}