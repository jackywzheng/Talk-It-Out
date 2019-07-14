

var comprehendmedical = new AWS.ComprehendMedical({region: 'oregon'});
var creds = new AWS.Credentials('AKIAQB744HWG5W4AHSV7', 'R95PzhYisIZ4Ba/4M8dpHi90oFBsS7Q3QxBA++QE', null);
var params = {
    Text: 'aspirin' /* required */
  };


comprehendmedical.detectEntities(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
