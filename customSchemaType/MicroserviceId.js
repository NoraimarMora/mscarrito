'use strict';

const mongoose = require('mongoose');

const MICROSERVICE_ID_MAX = 0x7FFFFFFF;
const MICROSERVICE_ID_MIN = -0x80000000;

class MicroserviceId extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, 'MicroserviceId');
  }

  /**
   * Cast the given value to something that MongoDB will store as MicroserviceId
   *
   * @param {any} val
   * @return {Number}
   */

  cast(val) {
    var _val = Number(val);
    if (isNaN(_val)) {
      throw new mongoose.SchemaType.CastError('MicroserviceId',
        val + ' is not a number');
    }
    _val = Math.round(_val);
    if (_val < MICROSERVICE_ID_MIN || _val > MICROSERVICE_ID_MAX) {
      throw new mongoose.SchemaType.CastError('MicroserviceId', val +
        ' is outside of the range of valid BSON MicroserviceIds: ' + MICROSERVICE_ID_MAX + ' - ' +
        MICROSERVICE_ID_MIN);
    }
    return _val;
  }
}

MicroserviceId.prototype.$conditionalHandlers =
  mongoose.Schema.Types.Number.prototype.$conditionalHandlers;

MicroserviceId.MICROSERVICE_ID_BSON_TYPE = 16;
MicroserviceId.MICROSERVICE_ID_MAX = MICROSERVICE_ID_MAX;
MicroserviceId.MICROSERVICE_ID_MIN = MICROSERVICE_ID_MIN;

MicroserviceId.instance = 'MicroserviceId';
mongoose.Schema.Types.MicroserviceId = MicroserviceId;
module.exports = MicroserviceId;
