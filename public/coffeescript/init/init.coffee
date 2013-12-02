BCA = {} if !BCA

class UI
  container: "container"
  # all mixins need to be registeded here
  mixins:
    hello:null #bca_templates["jade/mixin"]

  helpers:
    hello: () ->
      #

  make_cal: (month) ->
    #Variables to be used later.  Place holders right now.
    padding = ""
    totalFeb = ""
    i = 1
    testing = ""
    current = new Date()
    cmonth = current.getMonth() # current (today) month
    day = current.getDate()
    year = current.getFullYear()
    tempMonth = month + 1 #+1; //Used to match up the current month with the correct start date.
    prevMonth = month - 1

    #Determing if Feb has 28 or 29 days in it.
    if month is 1
      if (year % 100 isnt 0) and (year % 4 is 0) or (year % 400 is 0)
        totalFeb = 29
      else
        totalFeb = 28

    # Setting up arrays for the name of the months, days, and the number of days in the month.
    monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"]
    totalDays = ["31", "" + totalFeb + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]

    # Temp values to get the number of days in current month, and previous month. Also getting the day of the week.
    tempDate = new Date(tempMonth + " 1 ," + year)
    tempweekday = tempDate.getDay()
    tempweekday2 = tempweekday
    dayAmount = totalDays[month]

    # After getting the first day of the week for the month, padding the other days for that week with the previous months days.  IE, if the first day of the week is on a Thursday, then this fills in Sun - Wed with the last months dates, counting down from the last day on Wed, until Sunday.
    while tempweekday > 0
      padding += "<td class='premonth'></td>"

      #preAmount++;
      tempweekday--

    # Filling in the calendar with the current month days in the correct location along.
    while i <= dayAmount

      # Determining when to start a new row
      if tempweekday2 > 6
        tempweekday2 = 0
        padding += "</tr><tr>"

      # checking to see if i is equal to the current day, if so then we are making the color of that cell a different color using CSS. Also adding a rollover effect to highlight the day the user rolls over. This loop creates the actual calendar that is displayed.
      if i is day and month is cmonth
        padding += "<td class='currentday c_date d_"+(month+1)+"_"+i+"'><div>" + i + "</div></td>"
      else
        padding += "<td class='currentmonth c_date d_"+(month+1)+"_"+i+"'><div>" + i + "</div></td>"
      tempweekday2++
      i++

    # Outputing the calendar onto the site.  Also, putting in the month name and days of the week.
    calendarTable = "<table class='calendar'> <tr class='header'><th colspan='7'><i class='prev_month fa fa-arrow-circle-o-left'></i>" + monthNames[month] + " " + year + "<i class='next_month fa fa-arrow-circle-o-right'></i></th></tr>"
    calendarTable += "<tr class='weekdays'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td> <td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>"
    calendarTable += "<tr>"
    calendarTable += padding
    calendarTable += "</tr></table>"
    return calendarTable

  gen_user_name: ()->
    insult_tool_kit = [["artless","bawdy","beslubbering","bootless","churlish","cockered","clouted","craven","currish","dankish","dissembling","droning","errant","fawning","fobbing","froward","frothy","gleeking","goatish","gorbellied","impertinent","infectious","jarring","loggerheaded","lumpish","mammering","mangled","mewling","paunchy","pribbling","puking","puny","qualling","rank","reeky","roguish","ruttish","saucy","spleeny","spongy","surly","tottering","unmuzzled","vain","venomed","villainous","warped","wayward","weedy","yeasty"],["base-court","bat-fowling","beef-witted","beetle-headed","boil-brained","clapper-clawed","clay-brained","common-kissing","crook-pated","dismal-dreaming","dizzy-eyed","doghearted","dread-bolted","earth-vexing","elf-skinned","fat-kidneyed","fen-sucked","flap-mouthed","fly-bitten","folly-fallen","fool-born","full-gorged","guts-griping","half-faced","hasty-witted","hedge-born","hell-hated","idle-headed","ill-breeding","ill-nurtured","knotty-pated","milk-livered","motley-minded","onion-eyed","plume-plucked","pottle-deep","pox-marked","reeling-ripe","rough-hewn","rude-growing","rump-fed","shard-borne","sheep-biting","spur-galled","swag-bellied","tardy-gaited","tickle-brained","toad-spotted","unchin-snouted","weather-bitten"],["apple-john","baggage","barnacle","bladder","boar-pig","bugbear","bum-bailey","canker-blossom","clack-dish","clotpole","coxcomb","codpiece","death-token","dewberry","flap-dragon","flax-wench","flirt-gill","foot-licker","fustilarian","giglet","gudgeon","haggard","harpy","hedge-pig","horn-beast","hugger-mugger","joithead","lewdster","lout","maggot-pie","malt-worm","mammet","measle","minnow","miscreant","moldwarp","mumble-news","nut-hook","pigeon-egg","pignut","puttock","pumpion","ratsbane","scut","skainsmate","strumpet","varlot","vassal","whey-face","wagtail"]]
    return insult_tool_kit[0][Math.floor(Math.random()*insult_tool_kit[0].length)] + " " + insult_tool_kit[1][Math.floor(Math.random()*insult_tool_kit[1].length)] + " " + insult_tool_kit[2][Math.floor(Math.random()*insult_tool_kit[2].length)]
  str_to_int: (str) ->
    match = str.match(/\d+/)
    parseInt match[0], 10
  key_return: (id,done) ->
    $("##{id}").unbind().keypress (e) =>
      k = e.keyCode || e.which
      if k == 13
        done()
        return false
  schedule: (func) ->
    setTimeout func, 0
  render_append: (el,template_name,context,callback) ->
    if !el
      el = $("#"+this.container)
    if typeof el == "string"
      if el[0] == "#" || el[0] == "."
        el = $(el)
      else
        el = $("#"+el)
    context.mixins = this.mixins
    context.helpers = this.helpers
    el.append bca_templates["jade/#{template_name}"](context)
    if typeof callback == 'function'
      this.schedule =>
        callback(el)
  render_rewrite: (el,template_name,context,callback) ->
    if !el
      el = $("#"+this.container)
    if typeof el == "string"
      if el[0] == "#" || el[0] == "."
        el = $(el)
      else
        el = $("#"+el)
    context.mixins = this.mixins
    context.helpers = this.helpers
    el.html bca_templates["jade/#{template_name}"](context)
    if typeof callback == 'function'
      this.schedule =>
        callback(el)
  convert_to_slug: (text)->
    text
    .toLowerCase()
    .replace(/\s/g,'_')
    .replace(/[^\w-]+/g,'')
  gen_id: () ->
    return Math.random().toString(36).substring(6)
  make_img_upload: (id, callback)->
    this.schedule ->
      $("##{id}").dropzone
        url: "/save_image",
        maxFilesize:2,
        uploadMultiple: false,
        createImageThumbnails: false,
        acceptedMimeTypes:"image/*",
        init: ->
          this.on "selectedfiles", =>
            #show_status("uploading image at the background...")
          this.on "dragover", (file) =>
            $("##{id}").css({"border-color":"green"})
          this.on "dragleave", (file) =>
            $("##{id}").css({"border-color":"#CCC"})
          this.on "sending", () =>
            $("##{id}").text("Uploading..")
          this.on "uploadprogress", (dummy,progress,bytes) =>
            console.log(progress)
            $("##{id}").html("Uploading.. #{(progress+"").substring(0,5)}%")
          this.on "success", (stat,res) =>
            $("##{id}").css({"background-image":"url(#{res.filename})"})
            $("##{id}").text("")
            if callback
              callback(res.filename)
          this.on "error", (dummy,msg) =>
            $("##{id}").html(msg)
  make_jq_img_upload: (id_button, id_wrapper, id_progress, callback)->
    # the reason to use this is to suport resizing
    $("##{id_button}").fileupload
      dataType: 'json'
      url: "/save_image"
      # Enable image resizing, except for Android and Opera,
      # which actually support image resizing, but fail to
      # send Blob objects via XHR requests:
      disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent)
      imageMaxWidth: 800
      imageMaxHeight: 800
      progressall: (e, data) ->
        progress = parseInt(data.loaded / data.total * 100, 10)
        $("##{id_progress}").text(progress+"%")
      done: (e, data)->
        #$("##{id_wrapper}").css({"background-image":"url(#{data.result.filename})"})
        $("##{id_progress}").text("Done!")
        console.log data.result.filename
        if callback
          callback(data.result.filename)


class WS
  ajax_cache_default_expire: 5000
  ajax_cache: {}
  write_to_ajax_cache: (model_name,id,data,duration) ->
    console.log "caching #{model_name+"_"+id}"
    this.ajax_cache[model_name+"_"+id] =
      data:data
      time:(new Date())
      duration: this.ajax_cache_default_expire
    if duration?
      this.ajax_cache[model_name+"_"+id].duration = duration
  get_from_ajax_cache: (model_name,id) ->
    if this.ajax_cache[model_name+"_"+id]?
      if (new Date()) - this.ajax_cache[model_name+"_"+id].time > this.ajax_cache[model_name+"_"+id].duration
        delete this.ajax_cache[model_name+"_"+id]
        console.log "cache expired #{model_name} #{id}"
        return false
      else
        console.log "cache hit #{model_name} #{id}"
        return this.ajax_cache[model_name+"_"+id].data
    else
      console.log "cache miss #{model_name} #{id}"
      return false
    # check if data expired
  root_url : () ->
    return document.location.protocol + "//" + document.location.host
  get : (target, callback,cache_duration) ->
    NProgress.start()
    that = this
    cached_res = that.get_from_ajax_cache(target,target)
    if cached_res != false
      NProgress.done()
      callback(cached_res)
      return
    $.ajax
      type: "GET"
      url: that.root_url() + "/" + target
      dataType: "json"
      contentType : 'application/json'
      success: (res) ->
        that.write_to_ajax_cache(target,target,res,cache_duration)
        NProgress.done()
        if res.error?
          BCA.ui.flash_message(res.error)
        else
          callback(res)
      error: (request, status, err) ->
        console.error err
  post : (target, data, callback,cache_duration) ->
    # note that we still cache some of the post request as it can be used for getting data
    # but only when cache_duration is defined
    NProgress.start()
    that = this
    this.clear_data(data)
    cached_res = that.get_from_ajax_cache(target,target)
    if cached_res != false
      NProgress.done()
      callback(cached_res)
      return
    $.ajax
      type: "POST"
      url: that.root_url() + "/" + target
      data: JSON.stringify(data)
      dataType: "json"
      contentType : 'application/json'
      success: (res) ->
        # for post request, only cache when cache_duration is specified!
        if cache_duration?
          console.log "Cachine post request.."
          that.write_to_ajax_cache(target,target,res,cache_duration)
        NProgress.done()
        if res.error?
          BCA.ui.flash_message(res.error)
        else
          callback(res)
      error: (request, status, err) ->
        console.error err
  find : (target, callback, cache_duration) ->
    NProgress.start()
    that = this
    cached_res = that.get_from_ajax_cache(target.model_name,target.id)
    if cached_res != false
      NProgress.done()
      callback(cached_res)
      return
    $.ajax
      type: "GET"
      url: that.root_url() + "/" + target.model_name + "/" + target.id + "?" + target.params
      dataType: "json"
      contentType : 'application/json'
      success: (res) ->
        that.write_to_ajax_cache(target.model_name,target.id,res,cache_duration)
        NProgress.done()
        if res.error?
          BCA.ui.flash_message(res.error)
        else
          callback(res)
      error: (request, status, err) ->
        console.error err
  delete : (target, callback) ->
    NProgress.start()
    that = this
    this.clear_data(target.data)
    $.ajax
      type: "DELETE"
      url: that.root_url() + "/" + target.model_name + "/" + target.id + "?" + target.params
      dataType: "json"
      contentType : 'application/json'
      success: (res) ->
        NProgress.done()
        if res.error?
          BCA.ui.flash_message(res.error)
        else
          callback(res)
      error: (request, status, err) ->
        console.error err
  update : (target, callback) ->
    NProgress.start()
    that = this
    this.clear_data(target.data)
    $.ajax
      type: "PUT"
      url: that.root_url() + "/" + target.model_name + "/" + target.id
      data: JSON.stringify(target.data)
      dataType: "json"
      contentType : 'application/json'
      success: (res) ->
        NProgress.done()
        if res.error?
          BCA.ui.flash_message(res.error)
        else
          callback(res)
      error: (request, status, err) ->
        console.error err
  create : (target, callback) ->
    NProgress.start()
    that = this
    this.clear_data(target.data)
    $.ajax
      type: "POST"
      url: that.root_url() + "/" + target.model_name
      dataType: "json"
      contentType : 'application/json'
      data: JSON.stringify(target.data)
      success: (res) ->
        NProgress.done()
        if res.error?
          BCA.ui.flash_message(res.error)
        else
          callback(res)
      error: (request, status, err) ->
        console.error err
  set_cookie : (name, value, days) ->
    if days
      date = new Date()
      date.setTime date.getTime() + (days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toGMTString()
    else
      expires = ""
    document.cookie = name + "=" + value + expires + "; path=/"
  get_cookie : (name) ->
    name_eq = name + "="
    ca = document.cookie.split(";")
    i = 0
    while i < ca.length
      c = ca[i]
      c = c.substring(1, c.length)  while c.charAt(0) is " "
      return c.substring(name_eq.length, c.length)  if c.indexOf(name_eq) is 0
      i++
    null
  # strips data away if contains attributes with a "_" prefix
  clear_data : (data)->
    for k,v of data
      if k[0] == "_"
        delete data[k]
      for ks,vs of v
        if ks[0] == "_"
          delete v[ks]
      if v?
        for el in v
          for ks2,vs2 of el
            if ks2[0] == "_"
              delete el[ks2]

BCA.ui = new UI
BCA.ws = new WS



