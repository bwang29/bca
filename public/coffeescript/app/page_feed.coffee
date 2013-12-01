class FEED
  model:
    dummy: ""
  bind_submit_image: ()->
    BCA.ui.make_jq_img_upload "jq_image_upload","image_upload_wrapper","image_upload_progress", (img_url)->
      BCA.db_uploads.child(BCA.fb_user.id).push
        url: img_url
        time: (new Date()) - 0
        reflect: ""
        note: ""
  bind_submit_reflection: ()->
    that = this
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

  init: ()->
    that = this
    if !BCA.db_user_tasks || !BCA.fb_user
      BCA.rt.route_to ""
      return

    BCA.ui.render_rewrite null, "page_feed", that.model, (el) =>
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
        if posts_array.length % 4 == 0 && posts_array.length > 0
          #
        else
          #
        BCA.ui.render_rewrite "previous_activities", "module_post", {posts:posts_array.reverse()}, (el) =>
          $(".trash_post").unbind().click (e)->
            r = confirm("Are you sure to delete this post?")
            if r
              BCA.db_user_uploads.child($(e.target).data("id")).remove()

