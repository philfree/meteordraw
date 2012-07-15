Package.describe({
  summary: "Javascript drawing library"
});

Package.on_use(function (api) {
  api.add_files('d3.v2.min.js', 'client');
});
