export const ErrorMessages = {
    required: 'This field is required.',
    email: 'Por favor, introduzca un email válido',
    minlength: (min: number) => `Minimum length is ${min} characters.`,
    maxlength: (max: number) => `Maximum length is ${max} characters.`,
    pattern: 'Invalid format.',
    default: 'An unexpected error occurred.',
};

export const PlaceholderMessages: any = {
    email: 'Email',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    name: 'Nombre',
    surname: 'Surname',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal code',
    country: 'Country',
    birthdate: 'Fecha de nacimiento',
    loginParagraph: '¿Ya tienes cuenta?',
    login: 'Iniciar sesión',
    singUpParagraph: '¿No tienes cuenta?',
    singUp: 'Regístrate',
};

export const ParagraphMessages: any = {
    loginFortgotPassword: '¿Hás olvidado la contraseña?',
    iniciarSesion: 'Iniciar sesión',
    singUp: 'Registrarse',
};

export const RoutesName: any = {
    home: 'home',
    login: 'login',
    singup: 'singup',
};

export const Titles: any = {
    home: 'Inicio',
    login: 'Iniciar sesión',
    singup: 'Registrarse',
};