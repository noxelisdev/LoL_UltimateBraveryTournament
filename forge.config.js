module.exports = {
  packagerConfig: {
    icon: 'icon',
    name: "Gestionnaire de tournoi Ultimate Bravery",
    executableName: "LoL_UltimateBraveryTournament"
  },
  rebuildConfig: {},
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/templates/app.html.twig',
              js: './src/js/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/js/preload.js',
              },
            },
          ],
        },
      },
    },
  ]
};
