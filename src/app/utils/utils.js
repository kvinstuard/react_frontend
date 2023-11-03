import { Alert, AlertTitle } from "@mui/material";
import { differenceInSeconds } from 'date-fns';

//------------------------------------------------------------------------------
// Este archivo contiene funciones genericas de node JS o React, es decir, aplicables a cualquier
// formulario con JSX.
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Funciones auxiliares genericas
//------------------------------------------------------------------------------

/**
 * Despliega en pantalla un mensaje (No se ha usado aún)
 * @param {String} title titulo del mensaje
 * @param {String} content contenido del mensaje
 * @param {String} type "error", "info", "success", "warning"
 * @param {String} id identificador del mensaje
 * @param {Number} width ancho del mensaje
 * @returns 
 */
export function enviarMensaje(title, content, type, id, width) {
  return (
  <Alert 
      id = {id}
      style = {{display: 'none'}}
      severity = {type}
      sx = {{ gridColumn: `span ${width}` }}
      >
          <AlertTitle>{title}</AlertTitle>
          {content}
  </Alert>
  )
}

//------------------------------------------------------------------------------
// Funciones auxiliares para integrar front y back-end.
// Recordar que una solicitud por el protocolo HTTP tiene mas o menos esta
// estructura:
// JSON = {
//   method: "GET" | "PUT" | "POST" | "DELETE",
//   headers: {
//     Authorization: `Token ${data.token}`,
//     "Content-type": "application/json",
//   },
//   body: JSON.stringify(body), --> IMPORTANTE!! volver como string al JSON si 
// se pasa al cuerpo de la solicitud
// };
// Los campos que no se especifiquen en alguna funcion no son necesarios.
//------------------------------------------------------------------------------

/**
* Logea a un usuario y devuelve sus datos y el token asociado
* @param {JSON} config JSON = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
* @returns 
*/
export const loginUser = async (config) => {
  const data = await fetch(
    "http://127.0.0.1:8000/login/user/",
    config
  );
  return data.json();
};

/**
* Muestra la lista de contactos de un usuario
* @param {JSON} config JSON = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
* @returns 
*/
export const listContacts = async (config) => {
  const data = await fetch(
    "http://127.0.0.1:8000/listar/contactos/",
    config
  );
  return data.json();
};

/**
* Muestra la lista de contactos de un usuario por evento
* @param {JSON} config JSON = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
* @returns 
*/
export const listContactsEvent = async (config) => {
  const data = await fetch(
    "http://127.0.0.1:8000/listar/contactos/evento/",
    config
  );
  return data.json();
};

//------------------------------------------------------------------------------
// Funciones predefinidas en la plantilla, por si las quieren usar
//------------------------------------------------------------------------------

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match('rgba')) {
    let triplet = hex.slice(5).split(',').slice(0, -1).join(',');
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
  }
};

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition(elm) {
  if (!window && !elm) {
    return;
  }
  if (elm) return elm.scrollTop;
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    return;
  }

  var startY = currentYPosition(scrollableElement);
  var stopY = elmYPosition(elm);

  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} sec`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
  else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} d`;
  else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} mon`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
}

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf('?') + 1)
  );
  var definitions = search.split('&');
  definitions.forEach(function (val, key) {
    var parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(' ');
}

export const flat = (array) => {
  var result = [];
  array.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
};

