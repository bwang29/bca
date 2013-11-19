var BCA, UI, WS;

if (!BCA) {
  BCA = {};
}

UI = (function() {
  function UI() {}

  UI.prototype.container = "container";

  UI.prototype.mixins = {
    hello: null
  };

  UI.prototype.helpers = {
    hello: function() {}
  };

  UI.prototype.gen_user_name = function() {
    var insult_tool_kit;
    insult_tool_kit = [["artless", "bawdy", "beslubbering", "bootless", "churlish", "cockered", "clouted", "craven", "currish", "dankish", "dissembling", "droning", "errant", "fawning", "fobbing", "froward", "frothy", "gleeking", "goatish", "gorbellied", "impertinent", "infectious", "jarring", "loggerheaded", "lumpish", "mammering", "mangled", "mewling", "paunchy", "pribbling", "puking", "puny", "qualling", "rank", "reeky", "roguish", "ruttish", "saucy", "spleeny", "spongy", "surly", "tottering", "unmuzzled", "vain", "venomed", "villainous", "warped", "wayward", "weedy", "yeasty"], ["base-court", "bat-fowling", "beef-witted", "beetle-headed", "boil-brained", "clapper-clawed", "clay-brained", "common-kissing", "crook-pated", "dismal-dreaming", "dizzy-eyed", "doghearted", "dread-bolted", "earth-vexing", "elf-skinned", "fat-kidneyed", "fen-sucked", "flap-mouthed", "fly-bitten", "folly-fallen", "fool-born", "full-gorged", "guts-griping", "half-faced", "hasty-witted", "hedge-born", "hell-hated", "idle-headed", "ill-breeding", "ill-nurtured", "knotty-pated", "milk-livered", "motley-minded", "onion-eyed", "plume-plucked", "pottle-deep", "pox-marked", "reeling-ripe", "rough-hewn", "rude-growing", "rump-fed", "shard-borne", "sheep-biting", "spur-galled", "swag-bellied", "tardy-gaited", "tickle-brained", "toad-spotted", "unchin-snouted", "weather-bitten"], ["apple-john", "baggage", "barnacle", "bladder", "boar-pig", "bugbear", "bum-bailey", "canker-blossom", "clack-dish", "clotpole", "coxcomb", "codpiece", "death-token", "dewberry", "flap-dragon", "flax-wench", "flirt-gill", "foot-licker", "fustilarian", "giglet", "gudgeon", "haggard", "harpy", "hedge-pig", "horn-beast", "hugger-mugger", "joithead", "lewdster", "lout", "maggot-pie", "malt-worm", "mammet", "measle", "minnow", "miscreant", "moldwarp", "mumble-news", "nut-hook", "pigeon-egg", "pignut", "puttock", "pumpion", "ratsbane", "scut", "skainsmate", "strumpet", "varlot", "vassal", "whey-face", "wagtail"]];
    return insult_tool_kit[0][Math.floor(Math.random() * insult_tool_kit[0].length)] + " " + insult_tool_kit[1][Math.floor(Math.random() * insult_tool_kit[1].length)] + " " + insult_tool_kit[2][Math.floor(Math.random() * insult_tool_kit[2].length)];
  };

  UI.prototype.str_to_int = function(str) {
    var match;
    match = str.match(/\d+/);
    return parseInt(match[0], 10);
  };

  UI.prototype.key_return = function(id, done) {
    var _this = this;
    return $("#" + id).unbind().keypress(function(e) {
      var k;
      k = e.keyCode || e.which;
      if (k === 13) {
        done();
        return false;
      }
    });
  };

  UI.prototype.schedule = function(func) {
    return setTimeout(func, 0);
  };

  UI.prototype.render_append = function(el, template_name, context, callback) {
    var _this = this;
    context.mixins = this.mixins;
    context.helpers = this.helpers;
    el.append(bca_templates["jade/" + template_name](context));
    if (typeof callback === 'function') {
      return this.schedule(function() {
        return callback(el);
      });
    }
  };

  UI.prototype.render_rewrite = function(el, template_name, context, callback) {
    var _this = this;
    context.mixins = this.mixins;
    context.helpers = this.helpers;
    el.html(bca_templates["jade/" + template_name](context));
    if (typeof callback === 'function') {
      return this.schedule(function() {
        return callback(el);
      });
    }
  };

  UI.prototype.convert_to_slug = function(text) {
    return text.toLowerCase().replace(/\s/g, '_').replace(/[^\w-]+/g, '');
  };

  UI.prototype.gen_id = function() {
    return Math.random().toString(36).substring(6);
  };

  UI.prototype.make_img_upload = function(id, callback) {
    return this.schedule(function() {
      return $("#" + id).dropzone({
        url: "/save_image",
        maxFilesize: 2,
        uploadMultiple: false,
        createImageThumbnails: false,
        acceptedMimeTypes: "image/*",
        init: function() {
          var _this = this;
          this.on("selectedfiles", function() {});
          this.on("dragover", function(file) {
            return $("#" + id).css({
              "border-color": "green"
            });
          });
          this.on("dragleave", function(file) {
            return $("#" + id).css({
              "border-color": "#CCC"
            });
          });
          this.on("sending", function() {
            return $("#" + id).text("Uploading..");
          });
          this.on("uploadprogress", function(dummy, progress, bytes) {
            console.log(progress);
            return $("#" + id).html("Uploading.. " + ((progress + "").substring(0, 5)) + "%");
          });
          this.on("success", function(stat, res) {
            $("#" + id).css({
              "background-image": "url(" + res.filename + ")"
            });
            $("#" + id).text("");
            if (callback) {
              return callback(res.filename);
            }
          });
          return this.on("error", function(dummy, msg) {
            return $("#" + id).html(msg);
          });
        }
      });
    });
  };

  UI.prototype.make_jq_img_upload = function(id_button, id_wrapper, id_progress, callback) {
    return $("#" + id_button).fileupload({
      dataType: 'json',
      url: "/save_image",
      disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator && navigator.userAgent),
      imageMaxWidth: 800,
      imageMaxHeight: 800,
      progressall: function(e, data) {
        var progress;
        progress = parseInt(data.loaded / data.total * 100, 10);
        return $("#" + id_progress).text(progress + "%");
      },
      done: function(e, data) {
        $("#" + id_progress).text("Done!");
        console.log(data.result.filename);
        if (callback) {
          return callback(data.result.filename);
        }
      }
    });
  };

  return UI;

})();

WS = (function() {
  function WS() {}

  WS.prototype.ajax_cache_default_expire = 5000;

  WS.prototype.ajax_cache = {};

  WS.prototype.write_to_ajax_cache = function(model_name, id, data, duration) {
    console.log("caching " + (model_name + "_" + id));
    this.ajax_cache[model_name + "_" + id] = {
      data: data,
      time: new Date(),
      duration: this.ajax_cache_default_expire
    };
    if (duration != null) {
      return this.ajax_cache[model_name + "_" + id].duration = duration;
    }
  };

  WS.prototype.get_from_ajax_cache = function(model_name, id) {
    if (this.ajax_cache[model_name + "_" + id] != null) {
      if ((new Date()) - this.ajax_cache[model_name + "_" + id].time > this.ajax_cache[model_name + "_" + id].duration) {
        delete this.ajax_cache[model_name + "_" + id];
        console.log("cache expired " + model_name + " " + id);
        return false;
      } else {
        console.log("cache hit " + model_name + " " + id);
        return this.ajax_cache[model_name + "_" + id].data;
      }
    } else {
      console.log("cache miss " + model_name + " " + id);
      return false;
    }
  };

  WS.prototype.root_url = function() {
    return document.location.protocol + "//" + document.location.host;
  };

  WS.prototype.get = function(target, callback, cache_duration) {
    var cached_res, that;
    NProgress.start();
    that = this;
    cached_res = that.get_from_ajax_cache(target, target);
    if (cached_res !== false) {
      NProgress.done();
      callback(cached_res);
      return;
    }
    return $.ajax({
      type: "GET",
      url: that.root_url() + "/" + target,
      dataType: "json",
      contentType: 'application/json',
      success: function(res) {
        that.write_to_ajax_cache(target, target, res, cache_duration);
        NProgress.done();
        if (res.error != null) {
          return BCA.ui.flash_message(res.error);
        } else {
          return callback(res);
        }
      },
      error: function(request, status, err) {
        return console.error(err);
      }
    });
  };

  WS.prototype.post = function(target, data, callback, cache_duration) {
    var cached_res, that;
    NProgress.start();
    that = this;
    this.clear_data(data);
    cached_res = that.get_from_ajax_cache(target, target);
    if (cached_res !== false) {
      NProgress.done();
      callback(cached_res);
      return;
    }
    return $.ajax({
      type: "POST",
      url: that.root_url() + "/" + target,
      data: JSON.stringify(data),
      dataType: "json",
      contentType: 'application/json',
      success: function(res) {
        if (cache_duration != null) {
          console.log("Cachine post request..");
          that.write_to_ajax_cache(target, target, res, cache_duration);
        }
        NProgress.done();
        if (res.error != null) {
          return BCA.ui.flash_message(res.error);
        } else {
          return callback(res);
        }
      },
      error: function(request, status, err) {
        return console.error(err);
      }
    });
  };

  WS.prototype.find = function(target, callback, cache_duration) {
    var cached_res, that;
    NProgress.start();
    that = this;
    cached_res = that.get_from_ajax_cache(target.model_name, target.id);
    if (cached_res !== false) {
      NProgress.done();
      callback(cached_res);
      return;
    }
    return $.ajax({
      type: "GET",
      url: that.root_url() + "/" + target.model_name + "/" + target.id + "?" + target.params,
      dataType: "json",
      contentType: 'application/json',
      success: function(res) {
        that.write_to_ajax_cache(target.model_name, target.id, res, cache_duration);
        NProgress.done();
        if (res.error != null) {
          return BCA.ui.flash_message(res.error);
        } else {
          return callback(res);
        }
      },
      error: function(request, status, err) {
        return console.error(err);
      }
    });
  };

  WS.prototype["delete"] = function(target, callback) {
    var that;
    NProgress.start();
    that = this;
    this.clear_data(target.data);
    return $.ajax({
      type: "DELETE",
      url: that.root_url() + "/" + target.model_name + "/" + target.id + "?" + target.params,
      dataType: "json",
      contentType: 'application/json',
      success: function(res) {
        NProgress.done();
        if (res.error != null) {
          return BCA.ui.flash_message(res.error);
        } else {
          return callback(res);
        }
      },
      error: function(request, status, err) {
        return console.error(err);
      }
    });
  };

  WS.prototype.update = function(target, callback) {
    var that;
    NProgress.start();
    that = this;
    this.clear_data(target.data);
    return $.ajax({
      type: "PUT",
      url: that.root_url() + "/" + target.model_name + "/" + target.id,
      data: JSON.stringify(target.data),
      dataType: "json",
      contentType: 'application/json',
      success: function(res) {
        NProgress.done();
        if (res.error != null) {
          return BCA.ui.flash_message(res.error);
        } else {
          return callback(res);
        }
      },
      error: function(request, status, err) {
        return console.error(err);
      }
    });
  };

  WS.prototype.create = function(target, callback) {
    var that;
    NProgress.start();
    that = this;
    this.clear_data(target.data);
    return $.ajax({
      type: "POST",
      url: that.root_url() + "/" + target.model_name,
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify(target.data),
      success: function(res) {
        NProgress.done();
        if (res.error != null) {
          return BCA.ui.flash_message(res.error);
        } else {
          return callback(res);
        }
      },
      error: function(request, status, err) {
        return console.error(err);
      }
    });
  };

  WS.prototype.set_cookie = function(name, value, days) {
    var date, expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    return document.cookie = name + "=" + value + expires + "; path=/";
  };

  WS.prototype.get_cookie = function(name) {
    var c, ca, i, name_eq;
    name_eq = name + "=";
    ca = document.cookie.split(";");
    i = 0;
    while (i < ca.length) {
      c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(name_eq) === 0) {
        return c.substring(name_eq.length, c.length);
      }
      i++;
    }
    return null;
  };

  WS.prototype.clear_data = function(data) {
    var el, k, ks, ks2, v, vs, vs2, _results;
    _results = [];
    for (k in data) {
      v = data[k];
      if (k[0] === "_") {
        delete data[k];
      }
      for (ks in v) {
        vs = v[ks];
        if (ks[0] === "_") {
          delete v[ks];
        }
      }
      if (v != null) {
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = v.length; _i < _len; _i++) {
            el = v[_i];
            _results1.push((function() {
              var _results2;
              _results2 = [];
              for (ks2 in el) {
                vs2 = el[ks2];
                if (ks2[0] === "_") {
                  _results2.push(delete el[ks2]);
                } else {
                  _results2.push(void 0);
                }
              }
              return _results2;
            })());
          }
          return _results1;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return WS;

})();

BCA.ui = new UI;

BCA.ws = new WS;
