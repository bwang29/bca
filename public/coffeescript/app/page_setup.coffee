class SETUP
  model:
    dummy: ""
    preset_tasks: ["Take a photo a day","Eat a different food everyday"]
  init: ()->
    that = this
    if !BCA.db_user_tasks || !BCA.fb_user
      BCA.rt.route_to ""
      return

    BCA.ui.render_rewrite null, "page_setup", that.model, (el) =>
      # bind the click for setup button
      $("#setup_button").unbind().click ()->
        my_own_task = $("#my_own_task").val().trim()
        if my_own_task.length < 5
          alert("Your own task is too short!")
        else
          BCA.db_user_tasks.set
            goal: my_own_task
            type: "self"
          , ()->
            BCA.rt.route_to "feed"

      # bind the click for preset button
      $(".preset_task").unbind().click (e)->
        g = $(e.target).text()
        BCA.db_user_tasks.set
          goal: g
          type: "pre_set"
        , ()->
          BCA.rt.route_to "feed"