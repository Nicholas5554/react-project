import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().ruleset.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{1})(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/).
        rule({
            message: 'must fill out all forms password must contein a-z and A-Z at least one @.#$!%*?& and between 8-15 charecters'
        })
})