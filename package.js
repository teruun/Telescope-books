Package.describe({
  name: "nova-books",
  summary: "Telescope components package",
  version: "0.25.7",
  git: "https://github.com/TelescopeJS/telescope.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([

    // Nova packages

    'nova:core@0.25.7',
    'nova:posts@0.25.7',
    'nova:base-components',
    'utilities:smart-publications',
    'utilities:smart-methods',
    'modules',

    // third-party packages

    // 'alt:react-accounts-ui@1.1.0'
  ]);

  api.addFiles([
    'lib/server/publications.js'
  ], ['server']);

  api.addFiles([
    'lib/books-app.jsx',
    'lib/helpers.js'
  ], ['client', 'server']);

  api.export([
    "Books"
  ], ['client', 'server'])
});
