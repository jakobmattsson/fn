var fn = function(name, f) {
  if (typeof name == 'function') {
    f = name;
    name = null;
  }
  var out = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    return function(x) {
      return f.apply(x, args);
    };
  };
  if (name) {
    arguments.callee[name] = out;
  }
  return out;
};

fn('at', function(n) {
  return this[n];
});
fn('match', function(regexp) {
  return this.match(regexp);
});
fn('identity', function() {
  return this;
});
fn('prepend', function(pre) {
  return pre.concat(this);
});
fn('append', function(post) {
  return this.concat(post);
});
fn('log', function() {
  console.log(this);
  return this;
});

exports.fn = fn;
