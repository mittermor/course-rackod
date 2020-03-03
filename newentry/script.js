// -------------------------------------------
// NEWENTRY - JS - Script
// @author: Moritz Mitterdorfer
// @date: 2019-09-23
// @version: 1.0
// -------------------------------------------

onload = () => {
    if(!Cookies.get("username") || Cookies.get("username") == "") {
        window.location = "../login/";
        console.log("not logged in");
    }
}


postEntry = () => {


    let data = {
        priority: document.getElementById('priority').value,
        description: document.getElementById('description').value,
        subject: document.getElementById('subject').value,
        until: new Date(document.getElementById('until').value).getTime() / 1000
    }
   
    if(!data.priority || data.priority == "") {
        $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                "Select the priority of your entry!" +
            "</div></div>");
    }
    if(data.description == "") {
        console.log(data.description);
        $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                "Type in the description of your entry!" +
            "</div></div>");
    }
    if(!data.subject || data.subject == "") {
        $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                "Select the subject of your entry!" +
            "</div></div>");
    }

    // post entry
    // make API call
    let req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', 'https://rackod.com/course/API/endpoints/newEntry.php?prio=' + data.priority + '&subject=' + data.subject + "&until=" + data.until + "&username=" + Cookies.get("username") + "&description=" + data.description + "&sessionToken=" + Cookies.get("sessionToken"), true);
    req.onload = () => {
        let res = req.response;
        
        console.log(res.status);
        if(res.status == "200") {
            window.location = "../";
        }

        else {
            $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                "Please fill in everything!" +
            "</div></div>");
            console.log(Cookies.get("username"));
        }

    }
    req.send(null);
}