const yup = require('yup');

const userSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    phone: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
});

const userLoginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

const serviceSchema = yup.object({
    title: yup.string().required(),
});

module.exports = {
    userSchema,
    userLoginSchema,
    serviceSchema,
};
