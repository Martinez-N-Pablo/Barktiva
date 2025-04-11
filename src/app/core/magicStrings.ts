import { max } from "date-fns";

export const ErrorMessages = {
    required: 'Este campo es obligatorio',
    email: 'Por favor, introduzca un email válido',
    passwordValidation: 'Las contraseñas deben coincidir',
    pattern: 'Formato invalido',
    maxlength: 'El campo no puede exceder el número máximo de caracteres',
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
    breed: 'Raza',
    age: 'Edad',
    male: 'Masculino',
    female: 'Femenino',
    castrated: 'Castrado',
    intact: 'Intacto',
    weight: 'Peso',
    date: 'Fecha',
    dateStart: 'Fecha inicio',
    dateEnd: 'Fecha fin',
    search: 'Buscar',
    pet: 'Mascota',
    task: 'Tarea',
    dose: 'Dosis',
    dosePerWeek: 'Dosis por semana',
    description: 'Descripción',
    reciveNotification: 'Recibir notificaciones',
    routeAdministration: 'Ruta administración',
    sterilized: 'Esterilizado',
    dateFormat: 'dd/MM/yyyy',
};

export const ParagraphMessages: any = {
    loginFortgotPassword: '¿Hás olvidado la contraseña?',
    iniciarSesion: 'Iniciar sesión',
    singUp: 'Registrarse',
    createPetForm: 'Crear Mascota',
    updatePetForm: 'Modificar Mascota',
    createTask: 'Crear Tarea',
    updateTask: 'Modificar Tarea',
    sex: 'Sexo',
    sterilized: 'Esterilizado',
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
    petForm: 'Formulario Mascota',
    task: 'Tarea',
};

export const MetaDescriptions: any = {
    home: 'Barktiva, aplicación para la gestión de cuidados veterinarios de mascotas',
    login: 'Iniciar sesión para la aplicación Barktiva',
    singUp: 'Registrarse en la aplicación Barktiva',
    petForm: 'Formulario para añadir una mascota en la aplicación Barktiva',
    dashboard: 'Dashboard de la aplicación Barktiva',
    task: 'Formulario para crear una tarea'
};