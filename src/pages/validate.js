import React, { Component } from "react";
import Joi from "joi-browser";

export function validateAllField(account, schema) {
  const option = { abortEarly: false };
  const { error } = Joi.validate(account, schema, option);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  console.log(errors);
  return errors;
}

export function validateProperty(input, schema) {
  const obj = { [input.name]: input.value };
  const newschema = { [input.name]: schema[input.name] };
  const { error } = Joi.validate(obj, newschema);
  return error ? error.details[0].message : null;
}
