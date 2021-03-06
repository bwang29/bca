this["bca_templates"] = this["bca_templates"] || {};

this["bca_templates"]["jade/module_post"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),posts = locals_.posts,show_time = locals_.show_time,allow_delete = locals_.allow_delete;// iterate posts
;(function(){
  var $$obj = posts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var post = $$obj[$index];

buf.push("<div class=\"post_wrapper\">");
if ( post.url)
{
buf.push("<div" + (jade.attrs({ 'style':("background-image:url("+ post.url+ ")"), "class": [('post')] }, {"style":true})) + "></div><div class=\"post_frame\"></div>");
}
else
{
buf.push("<div class=\"reflect\">" + (jade.escape(null == (jade.interp = post.reflect) ? "" : jade.interp)) + "</div>");
}
if ( show_time)
{
buf.push("<div class=\"time\">" + (jade.escape(null == (jade.interp = post.time) ? "" : jade.interp)));
if ( allow_delete)
{
buf.push("<div" + (jade.attrs({ 'data-id':(post.id), "class": [('trash_post')] }, {"data-id":true})) + "><i" + (jade.attrs({ 'data-id':(post.id), "class": [('fa'),('fa-trash-o')] }, {"data-id":true})) + "></i></div>");
}
buf.push("</div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var post = $$obj[$index];

buf.push("<div class=\"post_wrapper\">");
if ( post.url)
{
buf.push("<div" + (jade.attrs({ 'style':("background-image:url("+ post.url+ ")"), "class": [('post')] }, {"style":true})) + "></div><div class=\"post_frame\"></div>");
}
else
{
buf.push("<div class=\"reflect\">" + (jade.escape(null == (jade.interp = post.reflect) ? "" : jade.interp)) + "</div>");
}
if ( show_time)
{
buf.push("<div class=\"time\">" + (jade.escape(null == (jade.interp = post.time) ? "" : jade.interp)));
if ( allow_delete)
{
buf.push("<div" + (jade.attrs({ 'data-id':(post.id), "class": [('trash_post')] }, {"data-id":true})) + "><i" + (jade.attrs({ 'data-id':(post.id), "class": [('fa'),('fa-trash-o')] }, {"data-id":true})) + "></i></div>");
}
buf.push("</div>");
}
buf.push("</div>");
    }

  }
}).call(this);
;return buf.join("");
};

this["bca_templates"]["jade/module_post_all"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),posts = locals_.posts;// iterate posts
;(function(){
  var $$obj = posts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var post = $$obj[$index];

buf.push("<div class=\"post_all_wrapper\">");
if ( post.url)
{
buf.push("<div" + (jade.attrs({ 'style':("background-image:url("+ post.url+ ")"), "class": [('post')] }, {"style":true})) + "></div>");
}
else
{
buf.push("<div class=\"reflect\">" + (jade.escape(null == (jade.interp = post.reflect) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var post = $$obj[$index];

buf.push("<div class=\"post_all_wrapper\">");
if ( post.url)
{
buf.push("<div" + (jade.attrs({ 'style':("background-image:url("+ post.url+ ")"), "class": [('post')] }, {"style":true})) + "></div>");
}
else
{
buf.push("<div class=\"reflect\">" + (jade.escape(null == (jade.interp = post.reflect) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  }
}).call(this);
;return buf.join("");
};

this["bca_templates"]["jade/page_all"] = function anonymous(locals) {
var buf = [];
buf.push("<center><h1>Everyone's Creativity Tasks</h1></center><center><div id=\"all_posts\"></div></center>");;return buf.join("");
};

this["bca_templates"]["jade/page_feed"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),has_access = locals_.has_access,fb_user = locals_.fb_user,current_url = locals_.current_url,today = locals_.today;if ( has_access)
{
buf.push("<div id=\"public_link\"><a" + (jade.attrs({ 'href':("/u/"+fb_user.id) }, {"href":true})) + ">View public profile</a></div>");
}
if ( !has_access)
{
buf.push("<div id=\"share_button\"><script>(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \"//connect.facebook.net/en_US/all.js#xfbml=1&appId=467518710023312\";\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));</script><div" + (jade.attrs({ 'data-href':(current_url), 'data-width':("200"), 'data-type':("button"), "class": [('fb-share-button')] }, {"data-href":true,"data-width":true,"data-type":true})) + "></div></div>");
}
buf.push("<center><div id=\"user_info\"><div class=\"name\">" + (jade.escape(null == (jade.interp = fb_user.name) ? "" : jade.interp)) + "</div><div class=\"task\">" + (jade.escape(null == (jade.interp = fb_user.task) ? "" : jade.interp)) + "</div></div></center><div id=\"calendar_view_wrapper\"><div id=\"calendar_view\"><div id=\"calendar\"></div><div id=\"preview\"></div></div></div><center><div id=\"reflection_wrapper_bg\"><div id=\"reflection_wrapper\"><h2>" + (jade.escape(null == (jade.interp = today) ? "" : jade.interp)) + "</h2><center><textarea id=\"my_reflection\" placeholder=\"Time to write some reflection for your progress in the past few days : )\"></textarea><div id=\"submit_reflection\" class=\"button\">Submit</div></center></div></div></center><center><div id=\"image_upload_wrapper_bg\"><div id=\"image_upload_wrapper\"><h2>" + (jade.escape(null == (jade.interp = today) ? "" : jade.interp)) + "</h2><div class=\"instr\">Time to upload an image for your task : )</div><input id=\"jq_image_upload\" type=\"file\" name=\"file\"/><div id=\"image_upload_icon\"><i class=\"fa fa-upload\"></i><br/><div id=\"image_upload_progress\"></div></div></div></div></center><center><div id=\"done_today\"><h2>You've done today's post!</h2></div></center><center><div id=\"previous_activities\"></div></center>");;return buf.join("");
};

this["bca_templates"]["jade/page_home"] = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"backdrop\"></div><div id=\"home_wrapper\"><div class=\"site_name\"><i style=\"margin-right:15px\" class=\"fa fa-calendar\"></i>The Creativity Calendar</div><div class=\"site_intro\">Tracking, sharing and discovering your creativity progress through one small step everyday.</div></div>");;return buf.join("");
};

this["bca_templates"]["jade/page_setup"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),preset_tasks = locals_.preset_tasks;buf.push("<div id=\"choose_task\"><div class=\"task_setup_title\"><h2>Define your daily creativity task</h2></div><div class=\"task_setup_guide\">During each three consecutive days, you can upload an image related to the creativity task you want to do. You'll pause and be prompted to write a reflection about the activities every 3 days. You can either define your own task (right) or use one of our suggested ones (left). You have the option to start a new task if you change your mind anytime, but you'll lose all previous records. You are able to access and share a public profile of your activities and also save the public profile page.</div><div id=\"option_container\"><div id=\"given_task_wrapper\"><div id=\"given_task\"><div class=\"title\">Our suggested tasks</div><div class=\"instr\">(Click to continue)</div>");
// iterate preset_tasks
;(function(){
  var $$obj = preset_tasks;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var task = $$obj[$index];

buf.push("<div class=\"preset_task\">" + (jade.escape(null == (jade.interp = task) ? "" : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var task = $$obj[$index];

buf.push("<div class=\"preset_task\">" + (jade.escape(null == (jade.interp = task) ? "" : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div></div><div id=\"own_task_wrapper\"><div id=\"own_task\"><div class=\"title\">Choose my own task</div><textarea id=\"my_own_task\"></textarea></div><div id=\"setup_button\"><div class=\"button grey\">Done</div></div></div></div></div>");;return buf.join("");
};

this["bca_templates"]["jade/wrapper"] = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"wrapper\"><div id=\"login_panel\"><div id=\"login_button\"><div class=\"button\"><i class=\"fa fa-facebook-square\"></i>Login with Facebook</div></div><div id=\"logout_button\"><div class=\"button red\">Logout</div></div><div id=\"restart_button\"><div class=\"button red\">Start a new task</div></div></div><div id=\"container\"></div><div id=\"footer\"><span><a href=\"mailto:bwang29@gmail.com\">contact</a></span></div></div>");;return buf.join("");
};