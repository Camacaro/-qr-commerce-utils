
export const httpErros = {
  ERROR_DB_BODY: {
    description: 'Se ha producido un error al validar los parámetros del contrato de entrada del endpoint. Por favor, validar que todos los campos correspondan a los parámetros establecidos.',
    code: 'ERROR_DB_BODY'
  },
  ERROR_DB_CREATE: {
    description: 'Se ha producido un error al intentar crear el registro. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_CREATE'
  },
  ERROR_DB_LIST: {
    description: 'Se ha producido un error al intentar obtener los registros. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_LIST'
  },
  ERROR_SENDGRID_MAIL: {
    description: 'Se ha producido un error al intentar enviar el mensaje por correo electrónico. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_SENDGRID_MAIL'
  },
  ERROR_DB_ME: {
    description: 'Se ha producido un error al intentar obtener los datos de su cuenta de usuario. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_ME'
  },
  ERROR_GOOGLE_MAPS_GEOCODING: {
    description: 'Se ha producido un error al intentar normalizar los datos de la dirección. Por favor, vuelva a intentarlo en unos momentos.',
    code: 'ERROR_GOOGLE_MAPS_GEOCODING'
  },
  ERROR_DB_REMOVE: {
    description: 'Se ha producido un error al intentar eliminar el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_REMOVE'
  },
  ERROR_DB_SECURITY_RESET: {
    description: 'Se ha producido un error al intentar reiniciar las credenciales de acceso. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_SECURITY'
  },
  ERROR_DB_UPDATE: {
    description: 'Se ha producido un error al intentar actualizar el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_UPDATE'
  },
  ERROR_DB_SECURITY_VALIDATE: {
    description: 'Se ha producido un error al intentar validar su cuenta de usuario. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_SECURITY'
  },
  ERROR_DB_VIEW: {
    description: 'Se ha producido un error al intentar obtener el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_VIEW'
  },
  ERROR_DB_REGISTERED: {
    description: 'Ya existe un registro con los datos enviados',
    code: 'ERROR_DB_REGISTERED'
  }
}
