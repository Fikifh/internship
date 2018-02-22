const httpStatus = require('http-status');
const { omit } = require('lodash');
const Present = require('../models/presensi');
const { handler: errorHandler } = require('../../middleware/error');


/**
 * Post Present
 * @private
 */
exports.present = async (req, res, next) => {
  try{        
        const user = await(new Present(req.body)).save();
        const PresentTransformed = present.transform();     
        res.status(httpStatus.CREATED);
        return res.json({present:PresentTransformed});
    }catch(error){
        return error;
    }
};	