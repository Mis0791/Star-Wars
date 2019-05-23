var results;
var currentGender;

$(document).ready(function(){
    currentGender = "both";
    $("#filter").change(function(){
        currentGender = $("#filter").val();
        if(Object.keys(results).length > 0)
        {
            outputResults();
        }
    });
});

function getResults(searchString) {
    console.log("searchString=" + searchString);

    var apiCall = "https://swapi.co/api/people/?search=" + searchString;

    // Retrieve first page of people
    $.getJSON( apiCall, function( json ) {
        results = json.results;
        //Iterating through the information to bring back the results if nothing then it stops
        if(Object.keys(results).length > 0)
        {
            outputResults();
        }else{
            console.log("No results!");
        }
        
    });
}
//Function to display the data pulled from the API in the dynamic table
function outputResults()
{
    let keys;
    let output = "<table><tr>";
    //keys = Object.keys(results[0]);
    keys = ["name", "skin_color", "eye_color", "gender"];
    keysNiceNames = ["Name", "Skin Color", "Eye Color", "Gender"]
    console.log(keys);
    for(k in keys)
    {
        output = output + "<th>" + keysNiceNames[k] + "</th>";
    }
    output += "</tr>";
    $("#resultCount").html(Object.keys(results).length + " RESULTS");
    for (k in Object.keys(results))
    {
        output += "<tr>";
        for(j in keys)
        {
            if(results[k]["gender"] == currentGender || currentGender == "both")
            {
                output += "<td>" + results[k][keys[j]] + "</td>";
            }
        }
        output += "</tr>";
    }
    output += "</table>";
    $("#results").html(output);
}