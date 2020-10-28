


$(document).ready(function(){
  
  var first = false;
  
  $(".btn-search").click(function(e){
    e.preventDefault();
    
    if(first) {
      $("#new_data").remove();
    }

    first = true;
    var value = $("#search").val();

    var category = [];
    var group_category = [];

    $.ajax({url: "http://acileczane.herokuapp.com/pharmacy/"+value, success: function(result){
      result.map(function(data, index){
        var jData = JSON.parse(data);

        var f_city = {'town': findCityandTown(String(jData.Address).toLocaleLowerCase().trim(), String(value).toLocaleLowerCase().trim()) , "index": index};
        f_city.town = String(f_city.town).replace(/[0-9]/g, '');
        if(f_city.town == ""){
          f_city.town = "Merkez";
        }
        category.push(f_city);

        });


        group_category = category.reduce((r, a) => {
          r[a.town] = [...r[a.town] || [], a];
          return r;
         }, {});

         create_div();
        for (var key in group_category) {
          console.log(key);

          var nkey = String(key).replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");


            new_row(nkey);
            
            group_category[key].map(function(data){
              var get_data = JSON.parse(result[data.index]);
              add_card(get_data.Name,  get_data.Phone,get_data.Address, nkey);
            });
          }
            
        

    }});


    $("#search").val('');

    var new_row = (id) => {
      var card_row = document.createElement("div");
      card_row.className="row";
      card_row.id = id;
      $("#new_data").append($(`
      <br/><h3>`+ String(id).toLocaleUpperCase()+` </h3>
      <hr />
    `));

      $("#new_data").append(card_row);

     
    }

    var create_div = () => {
      var div_container = document.createElement("div");
      div_container.className = "container mt-5";
      div_container.id = "new_data";
      $("body").append(div_container);
    }

    var add_card = (Name, Phone, Address, id) => {
      $("#"+id).append(
                  `<div class="card p-1  mb-3" style="max-width: 18rem;">
                  <div class="card-header bg-success"><h5>`+ Name+ `</h5></div>
                  <div class="card-body">
                    <h5 class="card-title">`+Phone+`</h5>
                    <p class="card-text"> `+Address+ ` </p>
                  </div>
                </div>`
        );
    }

    function removeItem(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
    

    var findCityandTown = (data, value) => {
      var s_split = [];
      var parse_data = data.split(" ");
      var data_len = parse_data.length;
      var last_item = parse_data[data_len - 1];
      if(last_item.indexOf("/")  > -1){
        s_split = last_item.split("/");
      }
      else{
        s_split =  [parse_data[data_len - 1], parse_data[data_len - 2] ]
      }
      return removeItem(s_split, value);
    }
  });
});





