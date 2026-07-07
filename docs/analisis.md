# 1. Inicio de sesión

## Objetivo

Permitir que un usuario pueda registrarse e iniciar sesión utilizando credenciales almacenadas en LocalStorage.

---

## Entradas

- Email
- Contraseña

---

## Procesos

### Inicio de sesión

- Obtener email y contraseña ingresados.
- Validar que ambos campos estén completos.
- Obtener las cuentas almacenadas en LocalStorage.
- Buscar una cuenta que coincida con el email y contraseña ingresados.
- Mostrar mensaje de error si las credenciales son incorrectas.
- Mostrar mensaje de éxito si el acceso es correcto.
- Redirigir automáticamente al menú principal.

### Registro de usuario

- Abrir un formulario modal.
- Validar que email y contraseña estén completos.
- Verificar que el correo no exista previamente.
- Crear un nuevo objeto usuario.
- Guardar la cuenta en LocalStorage.
- Mostrar mensaje de éxito.
- Cerrar automáticamente el modal.

---

## Salidas

### Inicio de sesión

- Acceso al menú principal.
- Mensaje de inicio de sesión exitoso.
- Mensajes de error cuando corresponda.

### Registro

- Cuenta almacenada correctamente.
- Mensaje de confirmación.
- Prevención de correos duplicados.

<!-- ----------------------------------------->

# 2. Menú Principal

## Objetivo

Permitir al usuario acceder a las principales funcionalidades de la billetera digital y visualizar un resumen de su saldo y movimientos recientes.

---

## Entradas

- Información del saldo almacenada en LocalStorage.
- Historial de depósitos.
- Historial de transferencias.
- Selección de opciones del menú.

---

## Procesos

### Mostrar saldo

- Obtener el saldo almacenado en LocalStorage.
- Si no existe un saldo, crear uno inicial de $60.000.
- Mostrar el saldo actualizado en pantalla.

### Mostrar últimos movimientos

- Obtener los depósitos almacenados.
- Obtener las transferencias almacenadas.
- Unir ambos historiales en una sola lista.
- Obtener únicamente los tres movimientos más recientes.
- Mostrar los movimientos en pantalla.

### Navegación

- Permitir acceder a:
  - Depósitos.
  - Envío de dinero.
  - Historial completo de movimientos.

### Cerrar sesión

- Mostrar un mensaje de confirmación.
- Esperar unos segundos.
- Redirigir al usuario al inicio de sesión.

---

## Salidas

- Saldo disponible actualizado.
- Últimos tres movimientos realizados.
- Navegación entre las distintas pantallas.
- Cierre de sesión y regreso al login.

<!-- ----------------------------------------->

# 3. Depósitos

## Objetivo

Permitir al usuario agregar dinero a su billetera digital y actualizar el saldo disponible.

## Entradas

- Monto del depósito.

## Procesos

- Obtener el saldo almacenado en LocalStorage.
- Mostrar el saldo disponible al cargar la página.
- Validar que el monto ingresado sea un número mayor que cero.
- Registrar el depósito en el historial de movimientos.
- Sumar el monto al saldo actual.
- Guardar el nuevo saldo en LocalStorage.
- Mostrar un mensaje de confirmación del depósito.
- Redirigir automáticamente al menú principal.

## Salidas

- Saldo actualizado.
- Depósito registrado en el historial.
- Confirmación de depósito realizado.
- Redirección al menú principal.

<!-- ----------------------------------------->

# 4. Agregar Contactos

## objetivo
Permitir registrar nuevos contactos para futuras transferencias.

## entradas
- Nombre.
- Apellido.
- CBU.
- Alias.
- Banco.

## procesos
- Validar que todos los campos estén completos.
- Validar que el CBU tenga el formato correcto.
- Crear un objeto contacto.
- Guardar el contacto en LocalStorage.
- Agregar el contacto a la lista.
- Mostrar mensaje de confirmación.

## salidas
- Contacto agregado correctamente.
- Agenda actualizada.

<!-- ----------------------------------------->

# 5. Buscar Contactos

## objetivo
Permitir buscar un contacto por nombre o alias.

## entradas
- Texto ingresado en el buscador.

## procesos
- Obtener el texto ingresado.
- Comparar el texto con cada contacto.
- Mostrar únicamente los contactos coincidentes.
- Mostrar nuevamente todos los contactos cuando el buscador quede vacío.

## salidas
- Lista de contactos filtrada.

<!-- ----------------------------------------->

# 6. Enviar Dinero

## Objetivo
Permitir realizar una transferencia a un contacto registrado mediante un formulario dentro de un modal.

## Entradas
- Contacto seleccionado.
- Monto de la transferencia ingresado en el modal.

## Procesos
- Verificar que exista un contacto seleccionado.
- Obtener el saldo almacenado.
- Mostrar un modal con:
  - Nombre del contacto.
  - Saldo disponible.
  - Campo para ingresar el monto.
- Validar que el monto ingresado sea válido.
- Validar que exista saldo suficiente.
- Descontar el monto del saldo.
- Guardar el nuevo saldo en LocalStorage.
- Registrar la transferencia en el historial.
- Mostrar un mensaje de transferencia realizada correctamente.
- Cerrar automáticamente el modal después de unos segundos.
- Redirigir al menú principal.

## Salidas
- Transferencia realizada correctamente.
- Saldo actualizado.
- Historial de transferencias actualizado.
- Redirección al menú principal.

<!-- ----------------------------------------->

# 7. Últimos Movimientos

## objetivo
Mostrar todas las transacciones realizadas por el usuario.

## entradas
- Información almacenada en LocalStorage.

## procesos
- Obtener los depósitos.
- Obtener las transferencias.
- Unir ambos historiales.
- Mostrar todos los movimientos en pantalla.

## salidas
- Lista de movimientos actualizada.

<!-- ----------------------------------------->

# Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Bootstrap
- jQuery
- LocalStorage
- Git
- GitHub