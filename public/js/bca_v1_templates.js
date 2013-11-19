this["bca_templates"] = this["bca_templates"] || {};

this["bca_templates"]["jade/module_post"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),posts = locals_.posts;// iterate posts
;(function(){
  var $$obj = posts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var post = $$obj[$index];

buf.push("<div class=\"post_wrapper\">");
if ( post.url)
{
buf.push("<div" + (jade.attrs({ 'style':("background-image:url("+ post.url+ ")"), "class": [('post')] }, {"style":true})) + "></div>");
}
else
{
buf.push("<div class=\"reflect\">" + (jade.escape(null == (jade.interp = post.reflect) ? "" : jade.interp)) + "</div>");
}
buf.push("<div class=\"time\">" + (jade.escape(null == (jade.interp = post.time) ? "" : jade.interp)) + "<div" + (jade.attrs({ 'data-id':(post.id), "class": [('trash_post')] }, {"data-id":true})) + "><i" + (jade.attrs({ 'data-id':(post.id), "class": [('fa'),('fa-trash-o')] }, {"data-id":true})) + "></i></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var post = $$obj[$index];

buf.push("<div class=\"post_wrapper\">");
if ( post.url)
{
buf.push("<div" + (jade.attrs({ 'style':("background-image:url("+ post.url+ ")"), "class": [('post')] }, {"style":true})) + "></div>");
}
else
{
buf.push("<div class=\"reflect\">" + (jade.escape(null == (jade.interp = post.reflect) ? "" : jade.interp)) + "</div>");
}
buf.push("<div class=\"time\">" + (jade.escape(null == (jade.interp = post.time) ? "" : jade.interp)) + "<div" + (jade.attrs({ 'data-id':(post.id), "class": [('trash_post')] }, {"data-id":true})) + "><i" + (jade.attrs({ 'data-id':(post.id), "class": [('fa'),('fa-trash-o')] }, {"data-id":true})) + "></i></div></div></div>");
    }

  }
}).call(this);
;return buf.join("");
};

this["bca_templates"]["jade/page_home"] = function anonymous(locals) {
var buf = [];
;return buf.join("");
};

this["bca_templates"]["jade/wrapper"] = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"wrapper\"><div id=\"login_panel\"><div id=\"login_button\" class=\"to_show\"><div class=\"button\">Login with FB</div><h1>The Ultimate Creativity Tool!</h1></div><div id=\"logout_button\" class=\"to_hide\"><div class=\"button grey\">Logout</div></div><div id=\"restart_button\" class=\"to_hide\"><div class=\"button red\">Restart</div></div><div id=\"hello_msg\" class=\"to_hide\"></div><div id=\"user_task\" class=\"to_hide\"></div></div><div id=\"choose_task\" class=\"to_setup\"><center><h2>setup</h2></center><div id=\"own_task_wrapper\"><div id=\"own_task\"><h3>Choose my own task</h3><textarea id=\"my_own_task\"></textarea></div></div><div id=\"given_task_wrapper\"><div id=\"given_task\"><h3>Or use preset tasks</h3><li>sda wqeqoiw jqowej oiqwe</li></div></div><center><div id=\"setup_button\"><div class=\"button\">Done</div></div></center></div><center><div id=\"reflection_wrapper\" class=\"to_reflect\"><h3>Time to reflect</h3><center><textarea id=\"my_reflection\" placeholder=\"Reflection (required)\"></textarea><div id=\"submit_reflection\" class=\"button\">Submit</div></center></div></center><center><div id=\"image_upload_wrapper\" class=\"to_hide to_upload\"><input id=\"jq_image_upload\" type=\"file\" name=\"file\"/><div id=\"image_upload_icon\"><i class=\"fa fa-upload\"></i><br/><div id=\"image_upload_progress\"></div></div></div></center><div id=\"previous_activities\" class=\"to_hide\"></div></div>");;return buf.join("");
};