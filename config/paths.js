const fs = require('fs');
const path = require('path');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  mongoose: resolveApp('mongoose'),
  server: resolveApp('server'),
  test: resolveApp('test/api'),
  fixtures: resolveApp('test/fixtures'),
  jobs: resolveApp('src/jobs'),
};
