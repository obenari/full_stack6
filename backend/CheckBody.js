const Joi = require("joi");

const user = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  id_number: Joi.number().required(),
  phone: Joi.number().required(), 
  email: Joi.string().required(),
});

const post = Joi.object().keys({
  userId: Joi.number().required(),
  // id: Joi.number().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
});

const comment = Joi.object().keys({
  postId: Joi.number().required(),
  //id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  body: Joi.string().required(),
});

const passwords = Joi.object().keys({
  // id: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
const todos = Joi.object().keys({
  // id: Joi.number().required(),
  userId: Joi.number().required(),
  title: Joi.string().required(),
  completed: Joi.boolean,
});
const ObjectCheck = {
  post: post,
  user: user,
  todos: todos,
  comment: comment,
  passwords: passwords,
};

exports.check = function (type, object) {
  const schema = ObjectCheck[type];
  console.log("in check");
  console.log(type);
  return schema.validate(object);
};
