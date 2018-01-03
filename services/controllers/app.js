const async = require('async');
const versioningKey = 'VERSIONING';

exports.versioning = (req, res) => {
  const getOldVersion = (callback) => {
    global.redis.get(versioningKey, function(err, result) {
      if (err) {
        console.log('Error get redis:', err);
      }

      if (result)
        callback(null, result);
      else
        callback(null, 0);

    });
  };

  const setNewVersion = (result, callback) => {
    const newVersion = new Date().getTime();

    global.redis.set(versioningKey, newVersion);

    callback(null, {
      oldVersion: result,
      newVersion: newVersion
    });
  };

  async.waterfall(
    [getOldVersion, setNewVersion],
    (err, result) => {
      if (err) {
        console.log('Error on waterfall:', err);
      }
      const message = `Success update versioning. Old version: ${result.oldVersion}, New version: ${result.newVersion}`;
      res.json({
        status: true,
        message
      });
    }
  );
}