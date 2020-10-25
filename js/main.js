


$(document).ready(function(){
  
  var first = false;
  
  $(".btn-search").click(function(e){
    e.preventDefault();
    
    if(first) {
      $("#new_data").remove();
    }

    first = true;
    var value = $("#search").val();
    $.ajax({url: "http://acileczane.herokuapp.com/pharmacy/"+value, success: function(result){
        var div_container = document.createElement("div");
        div_container.className = "container mt-5";
        div_container.id = "new_data";
        
        var card_column = document.createElement("div");
        card_column.className="card-columns";
        card_column.id = "listpharmacy";

        div_container.appendChild(card_column);
        $("body").append(div_container);

      result.map(function(data){
        var jData = JSON.parse(data);
         $("#listpharmacy").append(
         `<div class="card   mb-3" style="max-width: 18rem;">
          <div class="card-header bg-success"><h5>`+ jData.Name+ `</h5></div>
          <div class="card-body">
            <h5 class="card-title">`+jData.Phone+`</h5>
            <p class="card-text"> `+jData.Address+ ` </p>
          </div>
        </div>`

         );
        });
    }});
    $("#search").val('');
  
    
  });
});





