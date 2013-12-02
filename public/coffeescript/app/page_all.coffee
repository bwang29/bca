class ALL
  model:
    dummy: null
  init: ()->
    that = this
    BCA.db_uploads = new Firebase('https://bca.firebaseIO.com/uploads')
    BCA.db_uploads.once "value", (snapshot)->
      users = snapshot.val()

      posts_array = []
      for k, v of users
        for k2, v2 of v
          v2.id = k
          posts_array.push v2
      console.log posts_array

      posts_array.sort (a,b) ->
        b.time - a.time
      BCA.ui.render_rewrite $("body"), "module_post", {posts:posts_array,allow_delete:false, show_time:false}, (el) =>

    return this