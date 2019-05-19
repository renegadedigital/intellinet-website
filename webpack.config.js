const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/build",
    publicPath: "/",
    filename: "bundle.js"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },

  devServer: {
    contentBase: path.resolve("build"),
    compress: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: "graphql-tag/loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: {
          loader: "source-map-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: "app",
      files: { manifest: "manifest.json" },
      inject: false,
      links: ["https://fonts.googleapis.com/css?family=Montserrat:300,400,700"],
      mobile: true,
      template: require("html-webpack-template"),
      title: "Intellinet Solutions"
    }),
  ]
};
