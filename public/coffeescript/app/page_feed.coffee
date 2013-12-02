class FEED
  model:
    dummy: ""
    fb_user: null
    today: ""
    posts_array: null
    has_access: false
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
  render_cal: (month)->
    if !month
      month = that.get_current_month()
    that = this
    $("#calendar").html(BCA.ui.make_cal(month-1))
    BCA.ui.schedule ()->
      if month == 12
        $(".next_month").hide()
      if month == 1
        $(".prev_month").hide()
      $(".prev_month").unbind().click ()->
        that.render_cal(month - 1)
      $(".next_month").unbind().click ()->
        that.render_cal(month + 1)
      ctr = 0
      for p, idx in that.model.posts_array
        if p.url!=""
          c_month = parseInt(p.time.split('/')[1].trim())
          c_date = parseInt(p.time.split('/')[2].trim())+ctr
          $(".d_#{c_month}_#{c_date} div").css("background-image","url("+p.url+")")
          $(".d_#{c_month}_#{c_date}").data("idx",idx)
          ctr += 1
      if that.model.posts_array.length == 0
        $("#preview").html("<div style='text-align:center;padding-top:100px'>No activity uploaded.</div>")
      $(".c_date").unbind().click ()->
        idx = $(this).data('idx')
        if typeof idx != "undefined"
          BCA.ui.render_rewrite "preview", "module_post", {posts:[that.model.posts_array[idx]],allow_delete:false, show_time:true}, (el) =>
            #
      $($(".c_date")[0]).trigger("click")

  get_date: (time)->
    dateObj = new Date(time)
    month = dateObj.getUTCMonth() + 1
    day = dateObj.getUTCDate() - 1
    year = dateObj.getUTCFullYear()
    return year + " / " + month + " / " + day
  get_current_month: ()->
    that = this
    dateObj = new Date()
    return dateObj.getUTCMonth() + 1
  render_previous_activity: (has_access)->
    that = this
    BCA.db_user_uploads = new Firebase('https://bca.firebaseIO.com/uploads/' + BCA.fb_user.id)
    BCA.db_user_uploads.on "value", (snapshot) ->
      posts_hash = snapshot.val()
      posts_array = []
      for k,v of posts_hash
        v.time = that.get_date(v.time)
        v.id = k
        posts_array.push v
      posts_array = posts_array.reverse()
      if has_access && posts_array.length >=3 && posts_array[0].url != "" && posts_array[1].url != "" && posts_array[2].url != ""
        $("#image_upload_wrapper_bg").hide()
        $("#reflection_wrapper_bg").show()
        $("#done_today").hide()
        $("#reflection_wrapper textarea").focus()
      else
        if !has_access
          $("#image_upload_wrapper_bg").hide()
          $("#reflection_wrapper_bg").hide()
          $("#done_today").hide()
        else
          $("#image_upload_wrapper_bg").show()
          $("#reflection_wrapper_bg").hide()
          $("#done_today").hide()

      that.model.posts_array = posts_array
      # if has_access && posts_array.length != 0 && posts_array[0].time == that.get_date(new Date())
      #   $("#image_upload_wrapper_bg").hide()
      #   $("#reflection_wrapper_bg").hide()
      #   $("#done_today").show()

      allow_delete = false
      if has_access
        allow_delete = true

      BCA.ui.render_rewrite "previous_activities", "module_post", {posts:posts_array,allow_delete:allow_delete, show_time:true}, (el) =>
        $(".trash_post").unbind().click (e)->
          if confirm("Are you sure to delete this post?")
            BCA.db_user_uploads.child($(e.target).data("id")).remove()
        that.render_cal(that.get_current_month())
  render_views: (has_access)->
    that = this
    that.model.has_access = has_access
    BCA.ui.render_rewrite null, "page_feed", that.model, (el) =>
      if has_access
        that.bind_submit_reflection()
        that.bind_submit_image()
      that.render_previous_activity(has_access)
  init: (uid)->
    that = this
    that.model.today = that.get_date(new Date())
    if uid # for public view..
      user_con = new Firebase("https://bca.firebaseIO.com/users/#{uid}")
      user_con.once "value", (snapshot) ->
        BCA.fb_user = snapshot.val()
        tasks_con = new Firebase("https://bca.firebaseIO.com/tasks/#{uid}")
        tasks_con.once "value", (snapshot) ->
          BCA.fb_user.task = snapshot.val().goal
          that.model.fb_user = BCA.fb_user
          that.render_views(false)
    else
      if !BCA.db_user_tasks || !BCA.fb_user
        BCA.rt.route_to ""
        return
      that.model.fb_user = BCA.fb_user
      that.render_views(true)


