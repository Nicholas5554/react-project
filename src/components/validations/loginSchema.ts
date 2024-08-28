import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().ruleset.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{1})(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/).
        rule({
            message: "must me valid password"
        })
})