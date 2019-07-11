function parseJSON(json) {
  outcome = ""
  for (var i = 0; i < json.def.length; i++) {
    outcome += `<p>${json.def[i].text} [${json.def[i].ts}] ${json.def[i].pos}<br/>`
    for (var j = 0; j < json.def[i].tr.length; j++) {
      outcome += `<p>${j+1} ${json.def[i].tr[j].text}`
      if (json.def[i].tr[j].syn != undefined) {
        for (var k = 0; k < json.def[i].tr[j].syn.length; k++) {
          outcome += ", " + json.def[i].tr[j].syn[k].text
        }
      }
      if (json.def[i].tr[j].mean != undefined) {
        for (var k = 0; k < json.def[i].tr[j].mean.length; k++) {
          outcome += `<br/>(${json.def[i].tr[j].mean[k].text})`
        }
      }
      outcome += "</p>"
    }
    outcome += "</p>"
  }
  return outcome
}

$("#text").mouseup(function(event) {
  event.stopPropagation();

  var text = window.getSelection().toString();
  if (text != '') $("#trans").html("<span style='color:#f00;'>" + text + "</span>");

  if (text != '') {
    fetch('/api/dict?word=' + text)
      .then(function(response) { return response.json(); })
      .then(function(myJson) {
        // $("#trans").html(JSON.stringify(myJson));
        // text = myJson.def[0].text
        if (text != '') $("#trans").html("<span style='color:#000;'>" + parseJSON(myJson) + "</span>");
        console.log(JSON.stringify(myJson));
      });
  }
});


$( document ).ready(function() {
    console.log("ready!");
});
