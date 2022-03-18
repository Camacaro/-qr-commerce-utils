# Utils
> All _schemas_ of **Utils** projects

- [Utils](#utils)
- [Getting started](#getting-started)
  - [Usage format](#usage-format)
  - [Usage Logger](#usage-logger)
  - [Usage basic response](#usage-basic-response)
  - [Example Responde](#example-responde)
    - [response code 200](#response-code-200)
    - [response code 400](#response-code-400)
    - [response code 500](#response-code-500)
  - [Advanced use of the response](#advanced-use-of-the-response)
    - [StatusCode](#statuscode)
  - [Development](#development)
    - [Usage with `yarn link`](#usage-with-yarn-link)
- [Build and Publishing](#build-and-publishing)
- [Link Local](#link-local)

# Getting started
``` npm i @jcamacaro96/utils ``` 
``` yarn add @jcamacaro96/utils ```

## Usage format
To use _utils_ just install it (or link it, see below) `yarn add @jcamacaro96/utils` and then create your `controller.js` like that:

```js
import { cleanCharacters } from '@qr-commerce/utils';

const response = cleanCharacters('áéíóú');
expect(response).toEqual('AeIoU');
```

## Usage Logger
To use _utils_ just install it (or link it, see below) `yarn add @jcamacaro96/utils` and then create your `controller.js` like that:

```js
import { Logger } from '@qr-commerce/utils';

const logger = new Logger('NAME_CLASS');
logger.info(`Log info`);
logger.debug('Log debug')
logger.error('Log error')

const logger = new Logger('My Class')
try {
    logger.info('Ups!')
    throw new Error('throw new Error!')
} catch (error) {
    logger.info(error)
}
```
Now in your root project going to have ```logs/``` folder inside other folder with the day and a file ```tracking.log```
```js
logs/
    2022-02-23/
        tracking.log
    2022-02-24/
        tracking.log
```
The content example (one line)
```js
Wednesday, February 23 2022, 4:31:44 pm | INFO | | NAME_CLASS | Log info
```

## Usage basic response
To use _utils_ just install it (or link it, see below) `yarn add @jcamacaro96/utils` and then create your `controller.js` like that:
You need [express](https://www.npmjs.com/package/express)
```js
import { Logger, httpResponse, StatusError } from '@jcamacaro96/utils';

export const create = async (req, res) => {
  const logger = new Logger('create');
  try {
    logger.info('get models Cashier');

    const { label } = req.body;
    logger.info('body received', req.body);

    const itemFound = await Model.findOne({ where: { label } });

    if (itemFound) {
      logger.info(`item found with the label ${label}, return error with status ${StatusError.ERROR_DB_REGISTERED}`);
      return httpResponse({ res, statusCode: 400, statusError: StatusError.ERROR_DB_REGISTERED });
    }
    
    const item = await Model.create({ label });

    logger.info('return item found');
    return httpResponse({ res, statusCode: 201, payload: itemFound });
  } catch (error) {
    logger.error(error);
    return httpResponse({ res, statusCode: 500 });
  }
};
```
## Example Responde
### response code 200
```js
{
    "ok": true,
    "message": "Created",
    "description": "La petición ha sido completada y ha resultado en la creación de un nuevo recurso.",
    "payload": {
        "id": 5,
        "label": "NAME",
        "updatedAt": "2021-12-22T18:22:52.675Z",
        "createdAt": "2021-12-22T18:22:52.675Z",
        "deletedAt": null
    }
}
```

### response code 400
```js
{
    "ok": false,
    "message": 'Bad Request'
    "description": "Ya existe un registro con los datos enviados",
    "code": "ERROR_DB_REGISTERED",
    "statusCode": 400,
    "payload": []
}
```
### response code 500
```js
{
    "ok": false,
    "message": 'Internal Server Error'
    "description": "El servidor ha encontrado una situación que no sabe cómo manejarla.",
    "statusCode": 400,
    "payload": []
}
```

## Advanced use of the response
You can track the request with a unique id. In your app you need to add a middleware and if you use other service to consume this service it can share the id for better tracking 

```js 
import express from 'express';
import short from 'short-uuid';
import { Logger, httpResponse, TRACK_ID_NAME } from '@jcamacaro96/utils';

app = express()  

app.use((req, res, next) => {
      let log;
      const reqTrackId = req.header(TRACK_ID_NAME);
      if (reqTrackId) {
        res.setHeader(TRACK_ID_NAME, reqTrackId);
        log = new Logger('middleware', reqTrackId);
      } else {
        const trackId = short.generate();
        res.setHeader(TRACK_ID_NAME, trackId);
        log = new Logger('middleware', trackId);
      }
      log.info('init process to track');
      log.info(`${req.method} ${req.path} ${req.protocol}/${req.httpVersion}`);
      next();
    });
```
```js
Thursday, February 24 2022, 10:33:50 am | INFO | m8EZQAwvkxHxDYeqAi714m | middleware | init process to track
Thursday, February 24 2022, 10:33:50 am | INFO | qqfmgsB1tYZYSqH2JQuSLn | middleware | GET /api/cashier http/1.1
```

Now in your controller you can use the track id.

```js
import { Logger, httpResponse, StatusError, TRACK_ID_NAME } from '@jcamacaro96/utils';

export const create = async (req, res) => {
  const trackId = res.get(TRACK_ID_NAME);    
  const logger = new Logger('create', trackId);
  try {
    logger.info('get models Cashier');

    const { label } = req.body;
    logger.info('body received', req.body);

    const itemFound = await Model.findOne({ where: { label } });

    if (itemFound) {
      logger.info(`item found with the label ${label}, return error with status ${StatusError.ERROR_DB_REGISTERED}`);
      return httpResponse({ res, statusCode: 400, statusError: StatusError.ERROR_DB_REGISTERED });
    }
    
    const item = await Model.create({ label });

    logger.info('return item found');
    return httpResponse({ res, statusCode: 201, payload: itemFound });
  } catch (error) {
    logger.error(error);
    return httpResponse({ res, statusCode: 500 });
  }
};
```
Log
```js
Thursday, February 24 2022, 10:33:50 am | INFO | m8EZQAwvkxHxDYeqAi714m | create | get models Cashier
Thursday, February 24 2022, 10:33:50 am | INFO | m8EZQAwvkxHxDYeqAi714m | create | body received { label: 'NAME' }
```
In your client you can get the track id of the request in the headers ``` Track-Id ``` and check all its tracking

### StatusCode
```js
100: {
    description: 'El navegador puede continuar realizando su petición (se utiliza para indicar que la primera parte de la petición del navegador se ha recibido correctamente).',
    message: 'Continue'
  },
  101: {
    description: 'El servidor acepta el cambio de protocolo propuesto por el navegador (puede ser por ejemplo un cambio de HTTP 1.0 a HTTP 1.1).',
    message: 'Switching Protocols'
  },
  102: {
    description: 'El servidor está procesando la petición del navegador pero todavía no ha terminado (esto evita que el navegador piense que la petición se ha perdido cuando no recibe ninguna respuesta).',
    message: 'Processing'
  },
  103: {
    description: 'Se va a reanudar una petición POST o PUT que fue abortada previamente.',
    message: 'Checkpoint'
  },
  200: {
    description: 'Respuesta estándar para peticiones correctas.',
    message: 'OK'
  },
  201: {
    description: 'La petición ha sido completada y ha resultado en la creación de un nuevo recurso.',
    message: 'Created'
  },
  202: {
    description: 'La petición ha sido aceptada para procesamiento, pero este no ha sido completado. La petición eventualmente pudiere no ser satisfecha, ya que podría ser no permitida o prohibida cuando el procesamiento tenga lugar.',
    message: 'Accepted'
  },
  203: {
    description: 'La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada sino de otro servidor.',
    message: 'Non-Authoritative Information'
  },
  204: {
    description: 'La petición se ha completado con éxito pero su respuesta no tiene ningún contenido (la respuesta sí que puede incluir información en sus cabeceras HTTP).',
    message: 'No Content'
  },
  205: {
    description: 'La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el navegador tiene que inicializar la página desde la que se realizó la petición (este código es útil por ejemplo para páginas con formularios cuyo contenido debe borrarse después de que el usuario lo envíe).',
    message: 'Reset Content'
  },
  206: {
    description: 'La petición servirá parcialmente el contenido solicitado. Esta característica es utilizada por herramientas de descarga como wget para continuar la transferencia de descargas anteriormente interrumpidas, o para dividir una descarga y procesar las partes simultáneamente.',
    message: 'Partial Content'
  },
  207: {
    description: 'El cuerpo del mensaje que sigue es un mensaje XML y puede contener algún número de códigos de respuesta separados, dependiendo de cuántas sub-peticiones sean hechas.',
    message: 'Multi-Status (Multi-Status, WebDAV)'
  },
  208: {
    description: 'El listado de elementos DAV ya se notificó previamente, por lo que no se van a volver a listar.',
    message: 'Already Reported (WebDAV)'
  },
  300: {
    description: 'Indica opciones múltiples para el URI que el cliente podría seguir. Esto podría ser utilizado, por ejemplo, para presentar distintas opciones de formato para video, listar archivos con distintas extensiones o word sense disambiguation.',
    message: 'Multiple Choices'
  },
  301: {
    description: 'Esta y todas las peticiones futuras deberían ser dirigidas a la URI dada.',
    message: 'Moved Permanently'
  },
  302: {
    description: 'Este es el código de redirección más popular, pero también un ejemplo de las prácticas de la industria contradiciendo el estándar. La especificación HTTP/1.0 (RFC 1945) requería que el cliente realizara una redirección temporal (la frase descriptiva original fue "Moved Temporarily"), pero los navegadores populares lo implementaron como 303 See Other. Por tanto, HTTP/1.1 añadió códigos de estado 303 y 307 para eliminar la ambigüedad entre ambos comportamientos. Sin embargo, la mayoría de aplicaciones web y bibliotecas de desarrollo aún utilizan el código de respuesta 302 como si fuera el 303.',
    message: 'Found'
  },
  303: {
    description: 'La respuesta a la petición puede ser encontrada bajo otra URI utilizando el método GET.',
    message: 'See Other (desde HTTP/1.1)'
  },
  304: {
    description: 'Indica que la petición a la URL no ha sido modificada desde que fue requerida por última vez. Típicamente, el cliente HTTP provee un encabezado como If-Modified-Since para indicar una fecha y hora contra la cual el servidor pueda comparar. El uso de este encabezado ahorra ancho de banda y reprocesamiento tanto del servidor como del cliente.',
    message: 'Not Modified'
  },
  305: {
    description: 'Muchos clientes HTTP (como Mozilla3​ e Internet Explorer) no se apegan al estándar al procesar respuestas con este código, principalmente por motivos de seguridad.',
    message: 'Use Proxy (desde HTTP/1.1)'
  },
  306: {
    description: 'Este código se utilizaba en las versiones antiguas de HTTP pero ya no se usa (aunque está reservado para usos futuros).',
    message: 'Switch Proxy'
  },
  307: {
    description: 'Se trata de una redirección que debería haber sido hecha con otra URI, sin embargo aún puede ser procesada con la URI proporcionada. En contraste con el código 303, el método de la petición no debería ser cambiado cuando el cliente repita la solicitud. Por ejemplo, una solicitud POST tiene que ser repetida utilizando otra petición POST.',
    message: 'Temporary Redirect (desde HTTP/1.1)'
  },
  308: {
    description: 'El recurso solicitado por el navegador se encuentra en otro lugar y este cambio es permanente. A diferencia del código 301, no se permite cambiar el método HTTP para la nueva petición (así por ejemplo, si envías un formulario a un recurso que ha cambiado de lugar, todo seguirá funcionando bien).',
    message: 'Permanent Redirect'
  },
  400: {
    description: 'La solicitud contiene sintaxis errónea y no debería repetirse.',
    message: 'Bad Request'
  },
  401: {
    description: 'Es necesario autenticar para obtener la respuesta solicitada.',
    message: 'Unauthorized'
  },
  402: {
    description: 'La intención original era que este código pudiese ser usado como parte de alguna forma o esquema de Dinero electrónico o micropagos, pero eso no sucedió, y este código nunca se utilizó.',
    message: 'Payment Required'
  },
  403: {
    description: 'El cliente no posee los permisos necesarios para cierto contenido, por lo que el servidor está rechazando otorgar una respuesta apropiada.',
    message: 'Forbidden'
  },
  404: {
    description: 'Recurso no encontrado. Se utiliza cuando el servidor web no encuentra la página o recurso solicitado.',
    message: 'Not Found'
  },
  405: {
    description: 'Una petición fue hecha a una URI utilizando un método de solicitud no soportado por dicha URI; por ejemplo, cuando se utiliza GET en un formulario que requiere que los datos sean presentados vía POST, o utilizando PUT en un recurso de solo lectura.',
    message: 'Method Not Allowed'
  },
  406: {
    description: 'El servidor no es capaz de devolver los datos en ninguno de los formatos aceptados por el cliente, indicados por éste en la cabecera "Accept" de la petición.',
    message: 'Not Acceptable'
  },
  407: {
    description: '',
    message: 'Proxy Authentication Required'
  },
  408: {
    description: 'El cliente falló al continuar la petición - excepto durante la ejecución de videos Adobe Flash cuando solo significa que el usuario cerró la ventana de video o se movió a otro.',
    message: 'Request Timeout'
  },
  409: {
    description: 'Indica que la solicitud no pudo ser procesada debido a un conflicto con el estado actual del recurso que esta identifica.',
    message: 'Conflict'
  },
  410: {
    description: 'Indica que el recurso solicitado ya no está disponible y no lo estará de nuevo. Debería ser utilizado cuando un recurso ha sido quitado de forma permanente. Si un cliente recibe este código no debería volver a solicitar el recurso en el futuro. Por ejemplo un buscador lo eliminará de sus índices y lo hará más rápidamente que utilizando un código 404.',
    message: 'Gone'
  },
  411: {
    description: 'El servidor rechaza la petición del navegador porque no incluye la cabecera Content-Length adecuada.',
    message: 'Length Required'
  },
  412: {
    description: 'El servidor no es capaz de cumplir con algunas de las condiciones impuestas por el navegador en su petición.',
    message: 'Precondition Failed'
  },
  413: {
    description: 'La petición del navegador es demasiado grande y por ese motivo el servidor no la procesa.',
    message: 'Request Entity Too Large'
  },
  414: {
    description: 'La URI de la petición del navegador es demasiado grande y por ese motivo el servidor no la procesa (esta condición se produce en muy raras ocasiones y casi siempre porque el navegador envía como GET una petición que debería ser POST).',
    message: 'Request-URI Too Long'
  },
  415: {
    description: 'La petición del navegador tiene un formato que no entiende el servidor y por eso no se procesa.',
    message: 'Unsupported Media Type'
  },
  416: {
    description: 'El cliente ha preguntado por una parte de un archivo, pero el servidor no puede proporcionar esa parte, por ejemplo, si el cliente preguntó por una parte de un archivo que está más allá de los límites del fin del archivo.',
    message: 'Requested Range Not Satisfiable'
  },
  417: {
    description: 'La petición del navegador no se procesa porque el servidor no es capaz de cumplir con los requerimientos de la cabecera Expect de la petición.',
    message: 'Expectation Failed'
  },
  418: {
    description: 'Soy una tetera.',
    message: 'I\'m a teapot'
  },
  422: {
    description: 'La solicitud está bien formada pero fue imposible seguirla debido a errores semánticos.',
    message: 'Unprocessable Entity'
  },
  423: {
    description: 'El recurso al que se está teniendo acceso está bloqueado.',
    message: 'Locked'
  },
  424: {
    description: 'La solicitud falló debido a una falla en la solicitud previa.',
    message: 'Failed Dependency (WebDAV)'
  },
  425: {
    description: 'Definido en los drafts de WebDav Advanced Collections, pero no está presente en "Web Distributed Authoring and Versioning (WebDAV) Ordered Collections Protocol" (RFC 3648).',
    message: 'Unassigned'
  },
  426: {
    description: 'El cliente debería cambiarse a TLS/1.0',
    message: 'Upgrade Required'
  },
  428: {
    description: 'El servidor requiere que la petición del navegador sea condicional (este tipo de peticiones evitan los problemas producidos al modificar con PUT un recurso que ha sido modificado por otra parte).',
    message: 'Precondition Required'
  },
  429: {
    description: 'Hay muchas conexiones desde esta dirección de internet.',
    message: 'Too Many Requests'
  },
  431: {
    description: 'El servidor no puede procesar la petición porque una de las cabeceras de la petición es demasiado grande. Este error también se produce cuando la suma del tamaño de todas las peticiones es demasiado grande.',
    message: 'Request Header Fileds Too Large'
  },
  451: {
    description: 'El contenido ha sido eliminado como consecuencia de una orden judicial o sentencia emitida por un tribunal.',
    message: 'Unavailable for Legal Reasons'
  },
  500: {
    description: 'El servidor ha encontrado una situación que no sabe cómo manejarla.',
    message: 'Internal Server Error'
  },
  501: {
    description: 'El servidor no soporta alguna funcionalidad necesaria para responder a la solicitud del navegador (como por ejemplo el método utilizado para la petición).',
    message: 'Not Implemented'
  },
  502: {
    description: 'El servidor está actuando de proxy o gateway y ha recibido una respuesta inválida del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador.',
    message: 'Bad Gateway'
  },
  503: {
    description: 'El servidor no puede responder a la petición del navegador porque está congestionado o está realizando tareas de mantenimiento.',
    message: 'Service Unavailable'
  },
  504: {
    description: 'El servidor está actuando de proxy o gateway y no ha recibido a tiempo una respuesta del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador.',
    message: 'Gateway Timeout'
  },
  505: {
    description: 'El servidor no soporta o no quiere soportar la versión del protocolo HTTP utilizada en la petición del navegador.',
    message: 'HTTP Version Not Supported'
  },
  506: {
    description: 'El servidor ha detectado una referencia circular al procesar la parte de la negociación del contenido de la petición.',
    message: 'Variant Also Negotiates'
  },
  507: {
    description: 'El servidor no puede crear o modificar el recurso solicitado porque no hay suficiente espacio de almacenamiento libre.',
    message: 'Insufficient Storage'
  },
  508: {
    description: 'La petición no se puede procesar porque el servidor ha encontrado un bucle infinito al intentar procesarla.',
    message: 'Loop Detected'
  },
  509: {
    description: 'Límite de ancho de banda excedido. Este código de estatus, a pesar de ser utilizado por muchos servidores, no es oficial.',
    message: 'Bandwidth Limit Exceeded'
  },
  510: {
    description: 'La petición del navegador debe añadir más extensiones para que el servidor pueda procesarla.',
    message: 'Not Extended'
  },
  511: {
    description: 'El navegador debe autenticarse para poder realizar peticiones (se utiliza por ejemplo con los portales cautivos que te obligan a autenticarte antes de empezar a navegar).',
    message: 'Network Authentication Required'
  },
  512: {
    description: 'Este error prácticamente es inexistente en la red, pero indica que el servidor está en una operación de actualizado y no puede tener conexión.',
    message: 'Not updated'
  }
```

## Development
You can start to develop by using `src/` path and editing the files, also don't forget to _import_ the _schema_ on `index.ts` file.
After make changes, runs `build` for build process and then link the package locally to your project.

### Usage with `yarn link`
The [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/) allows you to use and modify the project locally, without the need to publish it. To do this:

1. Execute `yarn link` into the path of this project.
2. Execute `yarn link "@qr-commerce/utils"` into the path of the project that you need to usage.

# Build and Publishing
To build this project, just run `build` and it will generate a new version of the code in the `dist/` path. For publish a new version make sure that you bump the version number in the `package.json` according [semantic version](https://semver.org). When you do this, just run `yarn deploy` and make sure that you have the right credentials.

# Link Local
`sudo npm link` 
In the project to use
`sudo npm link @qr-commerce/utils` 