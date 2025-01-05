export const ErrorMessages = {
    required: 'This field is required.',
    email: 'Por favor, introduzca un email válido',
    minlength: (min: number) => `Minimum length is ${min} characters.`,
    maxlength: (max: number) => `Maximum length is ${max} characters.`,
    pattern: 'Invalid format.',
    default: 'An unexpected error occurred.',
};

export const PlaceholderMessages: { [key: string]: string } = {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    name: 'Name',
    surname: 'Surname',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal code',
    country: 'Country',
    birthdate: 'Birthdate',
};