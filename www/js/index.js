

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

