SpaApp.Routers.Main = Backbone.Router.extend({
  routes: {
    "todos(/:id)": "todosShow",
    "": "todosIndex"
  },

  todosShow: function(id){

    $.ajax({type: "get", url: "/todos/"+id+".json"}).done(function(response){
      var view = new SpaApp.Views.TodosShow({model: response});
       $('#container').html(view.render().$el);
    })
    
  },

  todosIndex: function(){
    $.get("/todos.json").done(function (data) {
      // initialize the index view with the fetched data
      var view = new SpaApp.Views.TodosIndex({ collection: data });
      $('#container').html(view.render().el);
    });
  }

});