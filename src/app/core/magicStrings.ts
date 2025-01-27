export const ErrorMessages = {
    required: 'Este campo es obligatorio',
    email: 'Por favor, introduzca un email válido',
    passwordValidation: 'Las contraseñas deben coincidir',
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
    loginParagraph: '¿Ya tienes una cuenta?',
    login: 'Iniciar sesión',
    singUpParagraph: '¿No tienes una cuenta?',
    singUp: 'Regístrate',
    breedSelect: 'Selecciona la raza',
};

export const ParagraphMessages: any = {
    loginFortgotPassword: '¿Hás olvidado la contraseña?',
    iniciarSesion: 'Iniciar sesión',
    singUp: 'Registrarse',
    createPetForm: 'Crear Mascota',
    updatePetForm: 'Modificar Mascota',
};

export const RoutesName: any = {
    home: 'home',
    login: 'login',
    singup: 'singup',
    dashboard: 'dashboard',
    petForm: 'pet-form',
};

export const Titles: any = {
    home: 'Inicio',
    login: 'Iniciar sesión',
    singup: 'Registrarse',
    dashboard: 'Inicio',
    petForm: 'Formulario Mascota'
};

export const MetaDescriptions: any = {
    home: 'Barktiva, aplicación para la gestión de cuidados veterinarios de mascotas',
    login: 'Iniciar sesión para la aplicación Barktiva',
    singUp: 'Registrarse en la aplicación Barktiva',
    petForm: 'Formulario para añadir una mascota en la aplicación Barktiva',
    dashboard: 'Dashboard de la aplicación Barktiva',
};