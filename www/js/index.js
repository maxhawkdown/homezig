function open(e) {
         var ws;
         
          //evt.preventDefault();
 
          var host = $("#host").val();
          var port = $("#port").val();
          var uri = $("#uri").val();
 
          ws = new WebSocket("ws://" + host + ":" + port + uri);
          
          ws.onmessage = function(evt) 
          {
              var str = evt.data;
              var res = str.split("!");    
              res.splice(res.length-1,1);              
              for(var i in res){
                var xbeeAddr = res[i].substring(res[i].indexOf("["),res[i].lastIndexOf("]")+1)+"!";
                var xbeeType = res[i].substring(0,7);
                $("#reciveSocket").append(i + " xbee Address = " + xbeeAddr + "<br>");
                $("#reciveSocket").append(i + " xbee Type = " + xbeeType + "<br>");              
              }
              
               e.view.element.find("#listview").kendoMobileListView({
            template : "<strong>#:data.foo#</strong>",
            dataSource: kendo.data.DataSource.create([{foo: xbeeAddr}, {foo: xbeeType}])
        });
              
              ws.close();
          };
 
          ws.onclose = function(evt) {  $("#reciveSocket").append("Connection Closed"); };
 
          ws.onopen = function(evt) { 
            ws.send("homezig");
            $("#host").css("background", "#00ff00"); 
            $("#port").css("background", "#00ff00"); 
            $("#uri").css("background", "#00ff00");
          };
       
}

/**
var i = 0;
// datasource below is customized for demo purposes.
var allDevice = new kendo.data.DataSource({
  transport: {
    read: function(options) {
      var max = i + 5;
      var data = [];
      for (; i < max; i ++) {
        data.unshift({ name: "record" + i, modified: +new Date() });
      }
     //illustration purposes only
      setTimeout(function() {
                  options.success(data);
      }, 500);

    }
  }
});**/






 function xmlrpc(){
    $.xmlrpc({       
    url: 'http://maxrouterubu.no-ip.biz:8080',
    methodName: 'get_echo',
    params: 5,
    success: function(response, status, jqXHR) {},
    error: function(jqXHR, status, error) {  }
});
}

