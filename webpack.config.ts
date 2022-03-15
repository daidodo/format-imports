import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'development',
  target: 'node',
  entry: {
    lib: {
      import: './src/lib/index.ts',
      filename: 'lib/index.js',
    },
    cli: {
      import: './src/bin/main.ts',
      filename: 'bin/main.js',
      dependOn: 'lib',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default config;
