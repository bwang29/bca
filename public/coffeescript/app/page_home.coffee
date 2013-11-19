class HOME
  model:
    dummy: null
  init: ()->
    that = this

    BCA.fb_user = null
    BCA.db = new Firebase('https://bca.firebaseIO.com')
    BCA.db_users = new Firebase('https://bca.firebaseIO.com/users')
    BCA.db_uploads = new Firebase('https://bca.firebaseIO.com/uploads')
    BCA.db_tasks = new Firebase('https://bca.firebaseIO.com/tasks')


    BCA.setup_complete = () ->
      $(".to_hide").show()
      #load previous activities
      BCA.db_user_uploads = new Firebase('https://bca.firebaseIO.com/uploads/' + BCA.fb_user.id)
      BCA.db_user_uploads.on "value", (snapshot) ->
        posts_hash = snapshot.val()
        posts_array = []
        for k,v of posts_hash
          dateObj = new Date(v.time)
          month = dateObj.getUTCMonth()
          day = dateObj.getUTCDate()
          year = dateObj.getUTCFullYear()
          v.time = year + " / " + month + " / " + day
          v.id = k
          posts_array.push v
        console.log posts_array
        if posts_array.length % 4 == 0
          $(".to_upload").hide()
          $(".to_reflect").show()
        else
          $(".to_reflect").hide()
          $(".to_upload").show()

        BCA.ui.render_rewrite $("#previous_activities"), "module_post", {posts:posts_array.reverse()}, (el) =>
          $(".trash_post").unbind().click (e)->
            r = confirm("Are you sure to delete this post?")
            if r
              BCA.db_user_uploads.child($(e.target).data("id")).remove()


    BCA.auth = new FirebaseSimpleLogin BCA.db, (error, user)->
      if (error)
        console.log(error.message) # error.code as well
      else if (user)
        BCA.fb_user = user # actually dangerous to expose this
        $(".to_show").hide()
        $(".to_setup").hide()


        $("#hello_msg").text(user.name)
        BCA.db_users.child(user.id).set(user) # record user
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider)

        # find if the user has assigned task
        BCA.db_user_tasks = new Firebase('https://bca.firebaseIO.com/tasks/' + user.id)
        BCA.db_user_tasks.once "value", (snapshot) ->
          if !snapshot.val() # task has not setup yet
            $(".to_setup").show()
            $("#setup_button").unbind().click ()->
              my_own_task = $("#my_own_task").val().trim()
              if my_own_task.length < 5
                alert("Your own task is too short!")
              else
                BCA.db_user_tasks.set
                  goal: my_own_task
                  type: "self"
                , ()->
                  $("#user_task").text(my_own_task)
                  $(".to_setup").hide()
                  BCA.setup_complete()
          else
            $("#user_task").text(snapshot.val().goal)
            BCA.setup_complete()

      else
        BCA.fb_user = null
        $(".to_hide").hide()
        $(".to_setup").hide()
        $(".to_show").show()
        console.log('user is logged out')


    # render view all together
    BCA.ui.render_rewrite $("body"), "wrapper", {}, (el) =>
      BCA.rt.logger.info "BCA wrapper rendered"
      $("#login_button").unbind().click ()->
        BCA.auth.login "facebook" ,
          rememberMe: true,
          scope: 'email'
      $("#logout_button").unbind().click ()->
        BCA.auth.logout()
      $("#restart_button").unbind().click ()->
        r = confirm("Are you sure to restart? All progress will be lost!")
        if r
          BCA.db_user_uploads.remove()
          BCA.db_user_tasks.remove()
          BCA.auth.logout()

      # BCA.ui.make_img_upload "image_upload", (img_url)->
      #   BCA.db_uploads.child(BCA.fb_user.id).push
      #     url: img_url
      #     time: (new Date()) - 0
      #     note: ""
      $("#submit_reflection").click ()->
        my_reflection = $("#my_reflection").val().trim()
        if my_reflection.length < 10
          alert("Your relection is too short!")
        else
          BCA.db_uploads.child(BCA.fb_user.id).push
            url: ""
            time: (new Date()) - 0
            reflect: my_reflection
            note: ""

      BCA.ui.make_jq_img_upload "jq_image_upload","image_upload_wrapper","image_upload_progress", (img_url)->
        BCA.db_uploads.child(BCA.fb_user.id).push
          url: img_url
          time: (new Date()) - 0
          reflect: ""
          note: ""

    return this