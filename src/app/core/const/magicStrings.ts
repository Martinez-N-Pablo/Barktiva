import { max } from "date-fns";
import { send } from "ionicons/icons";

export const ErrorMessages = {
    required: 'Este campo es obligatorio',
    email: 'Por favor, introduzca un email válido',
    passwordValidation: 'Las contraseñas deben coincidir',
    pattern: 'Formato invalido',
    maxlength: 'El campo no puede exceder el número máximo de caracteres',
    default: 'Ha ocurrido un error inexperado.',
};

export const PlaceholderMessages: any = {
    email: 'Email',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    name: 'Nombre',
    surname: 'Apellidos',
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
    dosePerDay: 'Dosis por día',
    dosePerWeek: 'Dosis por semana',
    dosePerMoth: 'Dosis por mes',
    description: 'Descripción',
    reciveNotification: 'Recibir notificaciones',
    routeAdministration: 'Ruta administración',
    sterilized: 'Esterilizado',
    dateFormat: 'dd/MM/yyyy',
    selectDosesOption: 'Veces por'
};

export const ParagraphMessages: any = {
    loginFortgotPassword: '¿Hás olvidado la contraseña?',
    iniciarSesion: 'Iniciar sesión',
    singUp: 'Registrarse',
    createPetForm: 'Crear Mascota',
    updatePetForm: 'Modificar Mascota',
    createTask: 'Crear Tarea',
    updateTask: 'Modificar Tarea',
    accept: 'Aceptar',
    update: 'Actualizar',
    send: 'Enviar',
    sex: 'Sexo',
    sterilized: 'Esterilizado',
};

export const RoutesName: any = {
    home: 'home',
    login: 'login',
    singup: 'singup',
    dashboard: 'dashboard',
    petForm: 'pet-form',
    user: 'userProfile',
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

export const ToasSuccessMessage: any = {
    register: 'Se ha rergistrado con éxito',
    login: 'Inicio de sesión realizado',
    createPet: 'La mascota se ha creado con éxito',
    updatePet: 'La mascota se ha actualizado con éxito',
    deletePet: 'Se ha eliminado la mascota con éxito',
    createTask: 'La tarea se ha creado con éxito',
    updateTask: 'La tarea se ha actualizado con éxito',
    deleteTask: 'Se ha eliminado la tarea con éxito',
};

export const ToastErorMessage: any = {
    register: 'Error en el registro',
    login: 'Login fallido: credenciales inválidas o error del servidor',
    token: 'Error con el token',
    permissions: 'No tiener permisos',
    createPet: 'Error al crear la mascota',
    getPetData: 'Error al obtener los datos de la mascota',
    updatePet: 'Error al actualizar los valores de la mascota',
    deletePet: 'Error al eliminar la mascota',
    createTask: 'Error al crear la tarea',
    getTaskData: 'Error al obtener los datos de la tarea',
    updateTask: 'Error al actualizar la tarea',
    deleteTask: 'Error al eliminar la tarea',
    getTaskTypes: 'Error al obtener los tipos de tareas'
};