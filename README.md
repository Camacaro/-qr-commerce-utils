# Utils
> All _schemas_ of **Utils** projects

- [Utils](#utils)
- [Getting started](#getting-started)
  - [Dependencies needed](#dependencies-needed)
  - [Usage format](#usage-format)
  - [Usage Logger](#usage-logger)
  - [Usage response and responseError](#usage-response-and-responseerror)
  - [Example Responde](#example-responde)
    - [response code 200](#response-code-200)
    - [response code 404](#response-code-404)
    - [responseError](#responseerror)
    - [StatusCode](#statuscode)
    - [descriptionMethod](#descriptionmethod)
  - [Development](#development)
    - [Usage with `yarn link`](#usage-with-yarn-link)
- [Build and Publishing](#build-and-publishing)
- [Tests](#tests)

# Getting started

## Dependencies needed
Before start, make sure that you already have installed the dependencies listed below:

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com)
- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)

## Usage format
To use _utils_ just install it (or link it, see below) `yarn add @qr-commerce/utils` and then create your `controller.js` like that:

```js
import { cleanCharacters } from '@qr-commerce/utils';

const response = cleanCharacters('áéíóú');
expect(response).toEqual('AeIoU');
```

## Usage Logger
To use _utils_ just install it (or link it, see below) `yarn add @qr-commerce/utils` and then create your `controller.js` like that:

```js
import { Logger } from '@qr-commerce/utils';

const logger = new Logger('NAME_CLASS');
logger.info(`Log info`);
logger.alert('Log alert')
logger.critical('Log critical')
logger.debug('Log debug')
logger.emergency('Log emergency')
logger.error('Log error')
logger.info('Log info')
logger.notice('Log notice')
logger.warning('Log warning')
```


## Usage response and responseError 
To use _utils_ just install it (or link it, see below) `yarn add @qr-commerce/utils` and then create your `controller.js` like that:

```js
const { Logger, response, responseError } = require('@qr-commerce/utils');

try {
  const timezone = {
    code: "04",
    gtm: 7,
    log_active: true,
    log_test: false,
    log_created_at: "2020-07-04T16:44:23.001Z",
    log_updated_at: "2020-07-04T16:48:18.287Z"
  }

  if( timezone.code === '05' ) {
    return response(res: Response, 200: number, timezone?: Object);
  } else {
    return response(res: Response, 404: number);
  }

} catch (error) {
  return responseError(
    error: Error, 
    res: Response, 
    400: number, 
    'descriptionMethod'?: String, 
    'nameFile'?: string, 
    logger?: Logger
  );
}
```
## Example Responde
### response code 200
```js
{
    "ok": true,
    "description": "Respuesta estándar para peticiones correctas.",
    "statusCode": 200,
    "payload": {
        "code": "04",
        "gtm": 7,
        "log_active": true,
        "log_test": false,
        "log_created_at": "2020-07-04T16:44:23.001Z",
        "log_updated_at": "2020-07-04T16:48:18.287Z"
    }
}
```

### response code 404
```js
{
    "ok": false,
    "description": "Recurso no encontrado. Se utiliza cuando el servidor web no encuentra la página o recurso solicitado.",
    "statusCode": 404,
    "payload": {}
}
```
### responseError 
Create 
return responseError(error, res, 400, 'create', nameFile, logger);
'create', 'Timezone', logger -> **use for the bug by console and generate log**
```js
{ 
    "code":"05",
	  "gtms":"6", // Error
    "log_active": false,
    "log_deleted": false,
    "log_test": false
}
```
```js
{
    "ok": false,
    "description": "La solicitud contiene sintaxis errónea y no debería repetirse.",
    "details": "Se ha producido un error al intentar crear el registro. Por favor, vuelve a intentarlo en unos momentos.",
    "errorTrace": {
        "name": "SequelizeValidationError",
        "errors": [
            {
                "message": "geo_timezones.gtm cannot be null",
                "type": "notNull Violation",
                "path": "gtm",
                "value": null,
                "origin": "CORE",
                "instance": {
                    "log_deleted": false,
                    "identifier": null,
                    "code": "05",
                    "log_active": true,
                    "log_test": false,
                    "log_updated_at": "2020-07-04T17:07:50.730Z",
                    "log_created_at": "2020-07-04T17:07:50.730Z"
                },
                "validatorKey": "is_null",
                "validatorName": null,
                "validatorArgs": []
            }
        ]
    }
}
```


### StatusCode
```js
100: {
    description: 'El navegador puede continuar realizando su petición (se utiliza para indicar que la primera parte de la petición del navegador se ha recibido correctamente).',
  },
  101: {
    description: 'El servidor acepta el cambio de protocolo propuesto por el navegador (puede ser por ejemplo un cambio de HTTP 1.0 a HTTP 1.1).',
  },
  102: {
    description: 'El servidor está procesando la petición del navegador pero todavía no ha terminado (esto evita que el navegador piense que la petición se ha perdido cuando no recibe ninguna respuesta).',
  },
  103: {
    description: 'Se va a reanudar una petición POST o PUT que fue abortada previamente.',
  },
  200: {
    description: 'Respuesta estándar para peticiones correctas.',
  },
  201: {
    description: 'La petición ha sido completada y ha resultado en la creación de un nuevo recurso.',
  },
  202: {
    description: 'La petición ha sido aceptada para procesamiento, pero este no ha sido completado. La petición eventualmente pudiere no ser satisfecha, ya que podría ser no permitida o prohibida cuando el procesamiento tenga lugar.',
  },
  203: {
    description: 'La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada sino de otro servidor.',
  },
  204: {
    description: 'La petición se ha completado con éxito pero su respuesta no tiene ningún contenido (la respuesta sí que puede incluir información en sus cabeceras HTTP).',
  },
  205: {
    description: 'La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el navegador tiene que inicializar la página desde la que se realizó la petición (este código es útil por ejemplo para páginas con formularios cuyo contenido debe borrarse después de que el usuario lo envíe).',
  },
  206: {
    description: 'La petición servirá parcialmente el contenido solicitado. Esta característica es utilizada por herramientas de descarga como wget para continuar la transferencia de descargas anteriormente interrumpidas, o para dividir una descarga y procesar las partes simultáneamente.',
  },
  207: {
    description: 'El cuerpo del mensaje que sigue es un mensaje XML y puede contener algún número de códigos de respuesta separados, dependiendo de cuántas sub-peticiones sean hechas.',
  },
  208: {
    description: 'El listado de elementos DAV ya se notificó previamente, por lo que no se van a volver a listar.',
  },
  300: {
    description: 'Indica opciones múltiples para el URI que el cliente podría seguir. Esto podría ser utilizado, por ejemplo, para presentar distintas opciones de formato para video, listar archivos con distintas extensiones o word sense disambiguation.',
  },
  301: {
    description: 'Esta y todas las peticiones futuras deberían ser dirigidas a la URI dada.',
  },
  302: {
    description: 'Este es el código de redirección más popular, pero también un ejemplo de las prácticas de la industria contradiciendo el estándar. La especificación HTTP/1.0 (RFC 1945) requería que el cliente realizara una redirección temporal (la frase descriptiva original fue "Moved Temporarily"), pero los navegadores populares lo implementaron como 303 See Other. Por tanto, HTTP/1.1 añadió códigos de estado 303 y 307 para eliminar la ambigüedad entre ambos comportamientos. Sin embargo, la mayoría de aplicaciones web y bibliotecas de desarrollo aún utilizan el código de respuesta 302 como si fuera el 303.',
  },
  303: {
    description: 'La respuesta a la petición puede ser encontrada bajo otra URI utilizando el método GET.',
  },
  304: {
    description: 'Indica que la petición a la URL no ha sido modificada desde que fue requerida por última vez. Típicamente, el cliente HTTP provee un encabezado como If-Modified-Since para indicar una fecha y hora contra la cual el servidor pueda comparar. El uso de este encabezado ahorra ancho de banda y reprocesamiento tanto del servidor como del cliente.',
  },
  305: {
    description: 'Muchos clientes HTTP (como Mozilla3​ e Internet Explorer) no se apegan al estándar al procesar respuestas con este código, principalmente por motivos de seguridad.',
  },
  306: {
    description: 'Este código se utilizaba en las versiones antiguas de HTTP pero ya no se usa (aunque está reservado para usos futuros).',
  },
  307: {
    description: 'Se trata de una redirección que debería haber sido hecha con otra URI, sin embargo aún puede ser procesada con la URI proporcionada. En contraste con el código 303, el método de la petición no debería ser cambiado cuando el cliente repita la solicitud. Por ejemplo, una solicitud POST tiene que ser repetida utilizando otra petición POST.',
  },
  308: {
    description: 'El recurso solicitado por el navegador se encuentra en otro lugar y este cambio es permanente. A diferencia del código 301, no se permite cambiar el método HTTP para la nueva petición (así por ejemplo, si envías un formulario a un recurso que ha cambiado de lugar, todo seguirá funcionando bien).',
  },
  400: {
    description: 'La solicitud contiene sintaxis errónea y no debería repetirse.',
  },
  401: {
    description: 'Similar al 403 Forbidden, pero específicamente para su uso cuando la autentificación es posible pero ha fallado o aún no ha sido provista.',
  },
  402: {
    description: 'La intención original era que este código pudiese ser usado como parte de alguna forma o esquema de Dinero electrónico o micropagos, pero eso no sucedió, y este código nunca se utilizó.',
  },
  403: {
    description: 'La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para hacerla. En contraste a una respuesta 401 No autorizado, la autenticación no haría la diferencia. ',
  },
  404: {
    description: 'Recurso no encontrado. Se utiliza cuando el servidor web no encuentra la página o recurso solicitado.',
  },
  405: {
    description: 'Una petición fue hecha a una URI utilizando un método de solicitud no soportado por dicha URI; por ejemplo, cuando se utiliza GET en un formulario que requiere que los datos sean presentados vía POST, o utilizando PUT en un recurso de solo lectura.',
  },
  406: {
    description: 'El servidor no es capaz de devolver los datos en ninguno de los formatos aceptados por el cliente, indicados por éste en la cabecera "Accept" de la petición.',
  },
  407: {
    description: '',
  },
  408: {
    description: 'El cliente falló al continuar la petición - excepto durante la ejecución de videos Adobe Flash cuando solo significa que el usuario cerró la ventana de video o se movió a otro.',
  },
  409: {
    description: 'Indica que la solicitud no pudo ser procesada debido a un conflicto con el estado actual del recurso que esta identifica.',
  },
  410: {
    description: 'Indica que el recurso solicitado ya no está disponible y no lo estará de nuevo. Debería ser utilizado cuando un recurso ha sido quitado de forma permanente. Si un cliente recibe este código no debería volver a solicitar el recurso en el futuro. Por ejemplo un buscador lo eliminará de sus índices y lo hará más rápidamente que utilizando un código 404.',
  },
  411: {
    description: 'El servidor rechaza la petición del navegador porque no incluye la cabecera Content-Length adecuada.',
  },
  412: {
    description: 'El servidor no es capaz de cumplir con algunas de las condiciones impuestas por el navegador en su petición.',
  },
  413: {
    description: 'La petición del navegador es demasiado grande y por ese motivo el servidor no la procesa.',
  },
  414: {
    description: 'La URI de la petición del navegador es demasiado grande y por ese motivo el servidor no la procesa (esta condición se produce en muy raras ocasiones y casi siempre porque el navegador envía como GET una petición que debería ser POST).',
  },
  415: {
    description: 'La petición del navegador tiene un formato que no entiende el servidor y por eso no se procesa.',
  },
  416: {
    description: 'El cliente ha preguntado por una parte de un archivo, pero el servidor no puede proporcionar esa parte, por ejemplo, si el cliente preguntó por una parte de un archivo que está más allá de los límites del fin del archivo.',
  },
  417: {
    description: 'La petición del navegador no se procesa porque el servidor no es capaz de cumplir con los requerimientos de la cabecera Expect de la petición.',
  },
  418: {
    description: 'Soy una tetera.',
  },
  422: {
    description: 'La solicitud está bien formada pero fue imposible seguirla debido a errores semánticos.',
  },
  423: {
    description: 'El recurso al que se está teniendo acceso está bloqueado.',
  },
  424: {
    description: 'La solicitud falló debido a una falla en la solicitud previa.',
  },
  425: {
    description: 'Definido en los drafts de WebDav Advanced Collections, pero no está presente en "Web Distributed Authoring and Versioning (WebDAV) Ordered Collections Protocol" (RFC 3648).',
  },
  426: {
    description: 'El cliente debería cambiarse a TLS/1.0',
  },
  428: {
    description: 'El servidor requiere que la petición del navegador sea condicional (este tipo de peticiones evitan los problemas producidos al modificar con PUT un recurso que ha sido modificado por otra parte).',
  },
  429: {
    description: 'Hay muchas conexiones desde esta dirección de internet.',
  },
  431: {
    description: 'El servidor no puede procesar la petición porque una de las cabeceras de la petición es demasiado grande. Este error también se produce cuando la suma del tamaño de todas las peticiones es demasiado grande.',
  },
  451: {
    description: 'El contenido ha sido eliminado como consecuencia de una orden judicial o sentencia emitida por un tribunal.',
  },
  500: {
    description: 'Es un código comúnmente emitido por aplicaciones empotradas en servidores web, mismas que generan contenido dinámicamente, por ejemplo aplicaciones montadas en IIS o Tomcat, cuando se encuentran con situaciones de error ajenas a la naturaleza del servidor web.',
  },
  501: {
    description: 'El servidor no soporta alguna funcionalidad necesaria para responder a la solicitud del navegador (como por ejemplo el método utilizado para la petición).',
  },
  502: {
    description: 'El servidor está actuando de proxy o gateway y ha recibido una respuesta inválida del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador.',
  },
  503: {
    description: 'El servidor no puede responder a la petición del navegador porque está congestionado o está realizando tareas de mantenimiento.',
  },
  504: {
    description: 'El servidor está actuando de proxy o gateway y no ha recibido a tiempo una respuesta del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador.',
  },
  505: {
    description: 'El servidor no soporta o no quiere soportar la versión del protocolo HTTP utilizada en la petición del navegador.',
  },
  506: {
    description: 'El servidor ha detectado una referencia circular al procesar la parte de la negociación del contenido de la petición.',
  },
  507: {
    description: 'El servidor no puede crear o modificar el recurso solicitado porque no hay suficiente espacio de almacenamiento libre.',
  },
  508: {
    description: 'La petición no se puede procesar porque el servidor ha encontrado un bucle infinito al intentar procesarla.',
  },
  509: {
    description: 'Límite de ancho de banda excedido. Este código de estatus, a pesar de ser utilizado por muchos servidores, no es oficial.',
  },
  510: {
    description: 'La petición del navegador debe añadir más extensiones para que el servidor pueda procesarla.',
  },
  511: {
    description: 'El navegador debe autenticarse para poder realizar peticiones (se utiliza por ejemplo con los portales cautivos que te obligan a autenticarte antes de empezar a navegar).',
  },
  512: {
    description: 'Este error prácticamente es inexistente en la red, pero indica que el servidor está en una operación de actualizado y no puede tener conexión.',
  }
```


### descriptionMethod
```js
body: {
    description: 'Se ha producido un error al validar los parámetros del contrato de entrada del endpoint. Por favor, validar que todos los campos correspondan a los parámetros establecidos.',
  },
  create: {
    description: 'Se ha producido un error al intentar crear el registro. Por favor, vuelve a intentarlo en unos momentos.',
  },
  list: {
    description: 'Se ha producido un error al intentar obtener los registros. Por favor, vuelve a intentarlo en unos momentos.',
  },
  mail: {
    description: 'Se ha producido un error al intentar enviar el mensaje por correo electrónico. Por favor, vuelve a intentarlo en unos momentos.',
  },
  me: {
    description: 'Se ha producido un error al intentar obtener los datos de su cuenta de usuario. Por favor, vuelve a intentarlo en unos momentos.',
  },
  normalize: {
    description: 'Se ha producido un error al intentar normalizar los datos de la dirección. Por favor, vuelva a intentarlo en unos momentos.',
  },
  remove: {
    description: 'Se ha producido un error al intentar eliminar el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
  },
  reset: {
    description: 'Se ha producido un error al intentar reiniciar las credenciales de acceso. Por favor, vuelve a intentarlo en unos momentos.',
  },
  update: {
    description: 'Se ha producido un error al intentar actualizar el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
  },
  validate: {
    description: 'Se ha producido un error al intentar validar su cuenta de usuario. Por favor, vuelve a intentarlo en unos momentos.',
  },
  view: {
    description: 'Se ha producido un error al intentar obtener el registro, no se ha encontrado coincidencia con los criterios de búsqueda. Por favor, vuelve a intentarlo en unos momentos.',
  }
```

## Development
You can start to develop by using `src/` path and editing the files, also don't forget to _import_ the _schema_ on `index.js` file.
After make changes, runs `gulp` for build process and then link the package locally to your project.

### Usage with `yarn link`
The [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/) allows you to use and modify the project locally, without the need to publish it. To do this:

1. Execute `yarn link` into the path of this project.
2. Execute `yarn link "@qr-commerce/utils"` into the path of the project that you need to usage.

# Build and Publishing
To build this project, just run `gulp` and it will generate a new version of the code in the `dist/` path. For publish a new version make sure that you bump the version number in the `package.json` according [semantic version](https://semver.org). When you do this, just run `yarn publish` and make sure that you have the right credentials.

# Tests
_TODO_

sudo npm link

sudo npm link @qr-commerce/utils