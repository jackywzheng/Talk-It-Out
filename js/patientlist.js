let comprehendmedical = new AWS.ComprehendMedical({apiVersion: '2018-10-30', region:'us-west-2', accessKeyId:'AKIASJF5PNYJ4DR3OETF', secretAccessKey:'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'});
let id = 100;

function concatenateInput() {
    let q1 = document.getElementById('FormControlTextarea1').value;
    let q2 = document.getElementById('FormControlTextarea2').value;
    let q3 = document.getElementById('FormControlTextarea3').value;
    let q4 = document.getElementById('FormControlTextarea4').value;
    let string =  q1+' '+q2+' '+q3+' '+q4;
    console.log(string);
    return string
}

function submitData(params) {
    let results = [];
    comprehendmedical.detectEntities(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
            for (let i=0; i<data.Entities.length; i++){
                if (!(results.includes(data.Entities[i].Text))) {
                    results.push(data.Entities[i].Text);
                }
                console.log(data.Entities[i].Text);
            }
        console.log(results)
        }
    });
    results.unshift(id);
    id++;
    return results;
}

function submitForm() {
    let param = {
        Text: concatenateInput()
    };
    let results = submitData(param);
    return results
}