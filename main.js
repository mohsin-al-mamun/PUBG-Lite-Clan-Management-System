// DOM Nodes.......Input Section
let Name    = document.getElementById("name");
let Point   = document.getElementById("points");
let Status  = document.getElementById("status");

let Add     = document.getElementById("inputbtn");


//DOM Nodes....... Showcase Section
let ShowcaseTable = document.getElementById("showcaseTable");

//DOM Nodes....... Analyze and Reload Button.
let Analyze = document.getElementById("analyze");
let Reload = document.getElementById('reload');
let Clear =  document.getElementById("clear");
//DOM Nodes....... OutPut  Section.
let LeaderTable = document.getElementById("leaderTable");
let CoLeaderTable = document.getElementById('coLeaderTable');
let Top13TAble = document.getElementById('top13Table');


// on load section.

// local storage section.
let Players = JSON.parse(localStorage.getItem("myjason"));






// Empty Array for randomly inputed Players.
// let Players=[];



// Event Listeners...........
        //counter vsriables
                let onloadRow = 1;
                let row = 1;
                let scroll = 30;
                let leader_count = 1;
                let co_leader_count = 1;
                let tpo13_count = 1;

window.onload = function(){
    if (Players){
        ShowcaseTable.style.visibility = "visible";
        for (let i=0; i<Players.length; i++){
              // Populating the Showcase Table...
        let newRow = ShowcaseTable.insertRow(onloadRow); // Adding a new row.

        // creating cell for the new row.
           let cell1 = newRow.insertCell(0); 
           let cell2 = newRow.insertCell(1);
           let cell3 = newRow.insertCell(2);


       //  cell's value...
           cell1.innerText = Players[i].name;
           cell2.innerText = Players[i].points;
           cell3.innerText = Players[i].status;

           onloadRow++
        };
       
    }else{
        return ;};
};


Add.addEventListener("click",function (){
     
    if (Players == null){
        Players = [];
    };


    if( Name.value && Point.value && Status.value){
        // alert("It's working!!!!!");
        ShowcaseTable.style.visibility = "visible"; // This will visible the table.
      
        // populating the Array...
        playerObject={name: Name.value, points:Point.value, status:Status.value };
        
        

        // Populating the Showcase Table...
        let newRow = ShowcaseTable.insertRow(row); // Adding a new row.

         // creating cell for the new row.
            let cell1 = newRow.insertCell(0); 
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);


        //  cell's value...
        cell1.innerText = Name.value;
        cell2.innerText = Point.value;
        cell3.innerText = Status.value;

        Players.push(playerObject);

    window.scrollBy(0,scroll);

    row++
    scroll+=5;

        Name.value   = '';
        Point.value  = '';
        

    }else{
        alert(" Opps!!!, Perhaps You missed to enter some inputs.");
    };

    localStorage.setItem('myjason', JSON.stringify(Players));
    Players = JSON.parse(localStorage.getItem('myjason'));
});









// // Leader's Table..
Analyze.addEventListener('click',function(){
    
    let n = Players.length;
    if (n==0){alert(" No data is added yet!!!.")};
    for (let i=0; i<n; i++){
        if (leader_count>1){
            break;
        };
        if (Players[i].status == 'Leader'){
            let newRow = LeaderTable.insertRow(leader_count);
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
    
            cell1.innerText = Players[i].name;
            cell2.innerText = Players[i].points;
            leader_count++;
            
        };
    };

    Reload.style.visibility = "visible";
    Analyze.style.visibility = "hidden";
});



// // Co-Leader's Table.
Analyze.addEventListener('click',function(){
   
    let n = Players.length;
    for (let i=0; i<n; i++){

        if(co_leader_count>3){    //This will prevent from getting more than 3 co-leaders and repetition of the same datas.
            break;
        };
        if (Players[i].status == 'Co-leader'){
            let newRow = CoLeaderTable.insertRow(co_leader_count);
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
    
            cell1.innerText = Players[i].name;
            cell2.innerText = Players[i].points;
            co_leader_count++;
            

        };
    };
});



// // Top 13's Table....
Analyze.addEventListener('click', function(){
     Players.sort(function(a,b){
        return (b.points -a.points);
    });
    console.log(Players); // for debuging purpose.
    let n = Players.length;

    

    for(let i=0; i<n; i++){

        if (tpo13_count>13){
            alert("The datas are already analyzed. Please reload the page for new input.");
            break;
        };

        let newRow = Top13TAble.insertRow(tpo13_count);

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);

        cell1.innerText = Players[i].name;
        cell2.innerText = Players[i].points;
        cell3.innerText = Players[i].status;

        tpo13_count++;

    };

    
    
    window.scrollBy(0,200);
});

Reload.addEventListener('click', function(){
    Reload.style.visibility = 'hidden';
    location.reload();
});


// Clear button to clear local storgae.

Clear.addEventListener('click', function(){ 

    localStorage.clear();
    location.reload();
});



