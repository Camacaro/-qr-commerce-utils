
export const httpErros = {
  body: {
    description: 'Se ha producido un error al validar los parámetros del contrato de entrada del endpoint. Por favor, validar que todos los campos correspondan a los parámetros establecidos.',
    code: 'ERROR_DB_BODY'
  },
  create: {
    description: 'Se ha producido un error al intentar crear el registro. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_CREATE'
  },
  list: {
    description: 'Se ha producido un error al intentar obtener los registros. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_LIST'
  },
  mail: {
    description: 'Se ha producido un error al intentar enviar el mensaje por correo electrónico. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_SENDGRID_MAIL'
  },
  me: {
    description: 'Se ha producido un error al intentar obtener los datos de su cuenta de usuario. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_ME'
  },
  normalize: {
    description: 'Se ha producido un error al intentar normalizar los datos de la dirección. Por favor, vuelva a intentarlo en unos momentos.',
    code: 'ERROR_GOOGLE_MAPS_GEOCODING'
  },
  remove: {
    description: 'Se ha producido un error al intentar eliminar el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_REMOVE'
  },
  reset: {
    description: 'Se ha producido un error al intentar reiniciar las credenciales de acceso. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_SECURITY'
  },
  update: {
    description: 'Se ha producido un error al intentar actualizar el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_UPDATE'
  },
  validate: {
    description: 'Se ha producido un error al intentar validar su cuenta de usuario. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_SECURITY'
  },
  view: {
    description: 'Se ha producido un error al intentar obtener el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
    code: 'ERROR_DB_VIEW'
  }
}
