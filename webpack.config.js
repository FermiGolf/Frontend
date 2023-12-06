const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'fermiGolfFrontEnd',
    publicPath: '/',

  },
  plugins: [new HtmlWebpackPlugin({template:"index.html",
filename:'index.html'})],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: path.join(__dirname, "public"),
    hot:true,
    host: "0.0.0.0",
    port: 3000,
    open: true,
    historyApiFallback:true,
  },
};
