class HOME
  model:
    dummy: ""
  auth_and_setup: ()->
    that = this
    BCA.auth = new FirebaseSimpleLogin BCA.db, (error, user)->
      if (error)
        console.log(error.message) # error.code as well
      else if (user)
        BCA.fb_user = user # actually dangerous to expose this
        BCA.db_users.child(user.id).set(user) # record user
        $("#hello_msg").text(user.name)
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider)
        # find if the user has assigned task
        BCA.db_user_tasks = new Firebase('https://bca.firebaseIO.com/tasks/' + user.id)
        BCA.db_user_tasks.once "value", (snapshot) ->
          if !snapshot.val() # task has not setup yet
            BCA.rt.route_to "setup"
          else
            BCA.rt.route_to "feed"
      else
        BCA.fb_user = null
        console.log('user is logged out')

  init: ()->
    that = this
    BCA.ui.render_rewrite null, "page_home", that.model, (el) =>
      # auth and setup from home to prevent user to re-enter setup/feed page manually
      that.auth_and_setup()

    return this