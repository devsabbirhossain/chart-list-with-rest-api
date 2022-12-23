/*******************************************************
 * /                Particular test submission           * /
 ********************************************************/

function array_unique(array) {
   return array.filter(function (el, index, arr) {
      return index == arr.indexOf(el);
   });
}

var homeurl = softvar.home_url;

console.log(softvar);

let names = [];
let submissions = [];

jQuery.ajax({
   url: homeurl + "/wp-json/softtechit/v1/tests",
   method: "GET",
   timeout: 0,
   async: false,
   success: function (result) {
      names = result;
   },
});

jQuery.ajax({
   url: homeurl + "/wp-json/softtechit/v1/submissions",
   method: "GET",
   timeout: 0,
   async: false,
   success: function (result) {
      submissions = result;
   },
});

jQuery.ajax({
   url: homeurl + "/wp-json/softtechit/v1/submissions/data",
   method: "GET",
   timeout: 0,
   async: false,
   success: function (result) {
      submission_data = result;
   },
});
var obj = JSON.parse(submission_data);
console.log(obj)

let submission_length = submissions.length;
let khali_submission = [];

function getCookie(name) {
   // Split cookie string and get all individual name=value pairs in an array
   var cookieArr = document.cookie.split(";");

   // Loop through the array elements
   for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if (name == cookiePair[0].trim()) {
         // Decode the cookie value and return
         return decodeURIComponent(cookiePair[1]);
      }
   }

   // Return null if not found
   return null;
}

for (i = 0; i < submission_length; i++) {
   if (submissions[i].user_id == getCookie("current_user")) {
      khali_submission.push(submissions[i]);
   }
}

let testnames = [];

for (i = 0; i < khali_submission.length; i++) {
   for (j = 0; j < names.length; j++) {
      if (khali_submission[i].form_id == names[j].id) {
         testnames.push(names[j].name);
      }
   }
}

let final_data = [];

for (i = 0; i < khali_submission.length; i++) {
   let z = 0;
   for (j = 0; j < khali_submission.length; j++) {
      if (khali_submission[i].form_id == khali_submission[j].form_id) {
         ++z;
      }
   }

   let a = khali_submission[i].form_id;

   final_data.push({ z: z });
}

console.log(final_data);

const testchart = document.getElementById("testChart").getContext("2d");

const testChart = new Chart(testchart, {
   type: "pie",
   data: {
      labels: array_unique(testnames),
      datasets: [
         {
            label: "Overall Test",
            data: final_data,
            backgroundColor: [
               "#4dc9f6",
               "#f67019",
               "#f53794",
               "#537bc4",
               "#acc236",
               "#166a8f",
               "#00a950",
               "#58595b",
               "#8549ba",
            ],
         },
      ],
   },
   options: {
      Response: true,
   },
});

/*******************************************************
 * /               Particular Test score              * /
 ********************************************************/
 let testscore = [];

 for (i = 0; i < khali_submission.length; i++) {
    for (j = 0; j < names.length; j++) {
       if (khali_submission[i].form_id == names[j].id) {
          testscore.push(khali_submission[i].score);
       }
    }
 }

 //console.log(testscore)
 //console.log(khali_submission)

const scorechat = document.getElementById("scoreChart").getContext("2d");
const scoreChart = new Chart(scorechat, {
   type: "bar",
   data: {
      labels: testnames,
      datasets: [
         {
            label: "Score",
            data: testscore,
            backgroundColor: [
               "#4dc9f6",
               "#f67019",
               "#f53794",
               "#537bc4",
               "#acc236",
               "#166a8f",
               "#00a950",
               "#58595b",
               "#8549ba",
            ],
         },
      ],
   },
   options: {
      scales: {
         y: {
            beginAtZero: true,
         },
      },
   },
});

/*******************************************************
 * /  Trend test for a particular account    / *
 ********************************************************/
//  const arr = [];
//  const data = khali_submission[i].score;
//  const obj1 = {
//     label: 'Alice',
//     data: data,
// };
//  //const obj2 = {score: '20'};
 
//  for (i = 0; i < khali_submission.length; i++) {
//    for (j = 0; j < names.length; j++) {
//       if (khali_submission[i].form_id == names[j].id) {
//          arr.push(obj1);
//       }
//    }
// }
// //console.log(submission_data)

const trendtestchart = document
   .getElementById("trendTestChart")
   .getContext("2d");
const trendTestChart = new Chart(trendtestchart, {
   type: "line",
   data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
         {
            label: "test name",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: ["#f67019"],
            backgroundColor: ["#f67019"],
         },
         {
            label: "test name",
            data: [1, 30, 34, 58, 20, 31],
            borderColor: ["#4dc9f6"],
            backgroundColor: ["#4dc9f6"],
         },
      ],
   },
   options: {
      scales: {
         y: {
            type: "linear",
            display: true,
            position: "right",
         },
      },
   },
});

/*******************************************************
 * /        All test taken for all account             / *
 ********************************************************/
const alltestchart = document.getElementById("allTestChart").getContext("2d");

const allTestChart = new Chart(alltestchart, {
   type: "line",
   data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
         {
            label: "Score",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: ["#f67019"],
            backgroundColor: ["#f67019"],
         },
         {
            label: "Score",
            data: [1, 30, 34, 58, 20, 31],
            borderColor: ["#4dc9f6"],
            backgroundColor: ["#4dc9f6"],
         },
      ],
   },
   options: {
      scales: {
         y: {
            type: "linear",
            display: true,
            position: "right",
         },
      },
   },
});
