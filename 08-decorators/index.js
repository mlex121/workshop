var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}

var koa = require('koa');
var escape = require('escape-html');

var app = module.exports = koa();

app.use(function* (next) {
  yield next;
  this.response.body = safe_tags_replace(this.response.body);
})

app.use(function* body() {
  this.response.body = 'this following HTML should be escaped: <p>hi!</p>';
});
