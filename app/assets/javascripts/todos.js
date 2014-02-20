$(function(){

  $('#addTodo').on('submit', function(event) {
    event.preventDefault();
    var newTodo = {completed: false};
    newTodo.title = $('#todo_title').val();
    console.log(newTodo);
    var params = { todo: newTodo };
    $.ajax({type: "post", url: "/todos.json", data: params }).done(function(response){
      var todoHTML = HandlebarsTemplates.todo(response);
      $("#todos").append(todoHTML);
    });
  });

  $('#todos').on('click', '.todo', function(event){
    var _this = this;
    if ( event.target.type === "checkbox" ){
      var checkbox = event.target;
      console.log("clicked checkbox!");
      var updated_todo = {id: this.dataset.id};
      updated_todo.completed = checkbox.checked;
      console.log(updated_todo);
      $.ajax({
          url: "/todos/"+updated_todo.id+".json",
          method: "PATCH",
          data: {todo: updated_todo}
      }).done(function(data){
          $(_this).toggleClass("done-true");  
         });
    }
    else if (event.target.innerText === "delete"){
      $.ajax({ method: "DELETE", url: "/todos/"+ this.dataset.id +".json" }).done(function(response){
        $(_this).remove();
      });
    }
  });

  $.ajax({ method: "GET", url: "/todos.json" }).done(function(response){
    $(response).each(function(index, item){
      var todoHTML = HandlebarsTemplates.todo(item);
      $("#todos").append(todoHTML);
    });
  });

});
