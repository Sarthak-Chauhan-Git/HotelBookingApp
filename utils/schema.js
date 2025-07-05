const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("",null),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
})

module.exports.reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5)
    .required()
    .messages({
      "any.required": "Rating is required",
      "number.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating must be at most 5"
    }),
  comment: Joi.string().trim().required()
    .messages({
      "any.required": "Comment is required",
      "string.empty": "Comment cannot be empty"
    })
});