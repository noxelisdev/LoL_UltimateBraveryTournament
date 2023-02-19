module.exports = {
  packagerConfig: {
    icon: 'icon',
    executableName: "LoL_UltimateBraveryTournament"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://www.leagueoflegends.com/static/favicon-0cf29ce019f7cd1e7b24f85ab6ff97da.ico',
        loadingGif: 'setupInstallAnim.gif'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'icon.png'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: 'icon.png'
        }
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/templates/index.html.twig',
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
