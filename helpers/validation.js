import React from 'react';
import validator from 'validator';
import Validation from 'react-validation';

Object.assign(Validation.rules, {
    required: {
        rule: value => value.toString().trim(),
        hint: () => <p className="alert alert-danger">Field is required.</p>
    },

    email: {
        rule: value => validator.isEmail(value),
        hint: value => <p className="alert alert-danger">{value} is not an Email.</p>
    },

    alpha: {
        rule: value => validator.isAlpha(value),
        hint: () => (
            <p className="alert alert-danger">
                String should contain only letters (a-z, A-Z).
            </p>
        )
    },

    password: {
        rule: (value, components) => {
            const password = components.password.state;
            const confirmPassword = components.confirmPassword.state;
            const isBothUsed = password
                && confirmPassword
                && password.isUsed
                && confirmPassword.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && confirmPassword.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === confirmPassword.value;
        },
        hint: () => <p className="alert alert-danger">Passwords should be equal.</p>
    }
});