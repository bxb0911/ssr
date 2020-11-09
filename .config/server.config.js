module.exports = {
  mode: 'development',
  context: '/Users/mm/myWorks/playground/ssr/ssr',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/mm/myWorks/playground/ssr/ssr/dist',
    filename: 'server-bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[name].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      '@': '/Users/mm/myWorks/playground/ssr/ssr/src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    modules: [
      'node_modules',
      '/Users/mm/myWorks/playground/ssr/ssr/node_modules',
      '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function() {
          /* omitted long function */
        },
        moduleLoader: function() {
          /* omitted long function */
        },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function() {
          /* omitted long function */
        },
        tsLoaderOptions: function() {
          /* omitted long function */
        },
        forkTsCheckerOptions: function() {
          /* omitted long function */
        }
      }
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-plugin-typescript/node_modules',
      '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/mm/myWorks/playground/ssr/ssr/node_modules',
      '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/.cache/vue-loader',
              cacheIdentifier: '69f5b044'
            }
          },
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/.cache/vue-loader',
              cacheIdentifier: '69f5b044'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/file-loader/dist/cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'raw-loader'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader:
                  '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function() {
            /* omitted long function */
          }
        ],
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/.cache/babel-loader',
              cacheIdentifier: 'e3535ff8'
            }
          },
          {
            loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/babel-loader/lib/index.js'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [/node_modules/, '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-service/lib'],
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-plugin-eslint/node_modules/eslint-loader/index.js',
            options: {
              extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
              cache: true,
              cacheIdentifier: '48450c48',
              emitWarning: false,
              emitError: false,
              eslintPath: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/eslint',
              formatter: undefined
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/.cache/ts-loader',
              cacheIdentifier: '4bf2aa8a'
            }
          },
          {
            loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/babel-loader/lib/index.js'
          },
          {
            loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          {
            loader:
              '/Users/mm/myWorks/playground/ssr/ssr/node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/.cache/ts-loader',
              cacheIdentifier: '4bf2aa8a'
            }
          },
          {
            loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/babel-loader/lib/index.js'
          },
          {
            loader: '/Users/mm/myWorks/playground/ssr/ssr/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: ['\\.vue$']
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: true,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    }),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin({
      additionalTransformers: [
        function() {
          /* omitted long function */
        }
      ],
      additionalFormatters: [
        function() {
          /* omitted long function */
        }
      ]
    }),
    /* config.plugin('html') */
    new HtmlWebpackPlugin({
      title: 'kd-home',
      templateParameters: function() {
        /* omitted long function */
      },
      template: '/Users/mm/myWorks/playground/ssr/ssr/public/index.html'
    }),
    /* config.plugin('preload') */
    new PreloadPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [/\.map$/, /hot-update\.js$/]
    }),
    /* config.plugin('prefetch') */
    new PreloadPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    }),
    /* config.plugin('copy') */
    new CopyPlugin([
      {
        from: '/Users/mm/myWorks/playground/ssr/ssr/public',
        to: '/Users/mm/myWorks/playground/ssr/ssr/dist',
        toType: 'dir',
        ignore: [
          '.DS_Store',
          {
            glob: 'index.html',
            matchBase: false
          }
        ]
      }
    ]),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin({
      vue: {
        enabled: true,
        compiler: 'vue-template-compiler'
      },
      tslint: false,
      formatter: 'codeframe',
      checkSyntacticErrors: false
    }),
    {
      options: {
        filename: 'vue-ssr-server-bundle.json'
      }
    }
  ],
  entry: './src/entry-server.ts',
  devtool: 'cheap-module-eval-source-map',
  target: 'node',
  externals: [
    function() {
      /* omitted long function */
    }
  ]
};
