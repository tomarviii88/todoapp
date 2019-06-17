console.log("in the ajax file");
$(document).ready(function(){
    $("#add").click(function(){
        var item= $("#to").val();
        var todo= {'item': item};
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                console.log('ajax is running well');
                   location.reload();
            }
        });
        return false;
    });
  
  $('li').click(function(){
      var item=$(this).text().replace(/ /g,'-');
      $.ajax({
          type:'DELETE',
          url: '/todo/' + item,
          success: function(data){
              location.reload();
          }
      })
  }) 
});