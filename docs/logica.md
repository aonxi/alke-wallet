# Lógica del Código Alke Wallet

Este documento describe la lógica utilizada en cada funcionalidad del proyecto.

---

# LOGIN

## Función: validarCampos()

1. Limpiar mensajes y errores anteriores.
2. Revisar si el email está vacío.
3. Revisar si la contraseña está vacía.
4. Marcar los campos inválidos cuando corresponda.
5. Retornar true si todos los datos son válidos.
6. Retornar false cuando exista algún error.

----------------------------------------------------

## Inicio de sesión

1. Esperar el envío del formulario.
2. Cancelar el envío tradicional del navegador.
3. Obtener email y contraseña.
4. Validar campos.
5. Obtener las cuentas guardadas en LocalStorage.
6. Buscar un usuario que coincida con el email y contraseña.
7. Si existe:
   - Mostrar mensaje de éxito.
   - Esperar 2 segundos.
   - Redirigir al menú.
8. Si no existe:
   - Mostrar mensaje de error.
   - Limpiar contraseña.

----------------------------------------------------

## Abrir Modal

1. Limpiar todos los inputs.
2. Quitar clases de error.
3. Restaurar el formulario.
4. Eliminar mensajes de éxito anteriores.
5. Restaurar mensajes de validación.

----------------------------------------------------

## Registrar Usuario

1. Obtener email y contraseña.
2. Validar campos.
3. Obtener usuarios almacenados.
4. Verificar si el email ya existe.
5. Si existe:
   - Mostrar mensaje de correo duplicado.
   - Finalizar función.
6. Crear objeto usuario.
7. Agregar usuario al arreglo.
8. Guardar nuevamente en LocalStorage.
9. Ocultar formulario.
10. Mostrar mensaje de éxito.
11. Esperar dos segundos.
12. Cerrar el modal.

# MENÚ PRINCIPAL

## Función: mostrarSaldo()

1. Obtener el saldo almacenado en LocalStorage.
2. Verificar si existe un saldo registrado.
3. Si no existe:
   - Crear un saldo inicial de $60.000.
   - Guardarlo en LocalStorage.
4. Mostrar el saldo en formato moneda chilena.

----------------------------------------------------

## Función: latestMoves()

1. Obtener la lista de depósitos.
2. Obtener la lista de transferencias.
3. Unir ambos arreglos en una sola lista.
4. Obtener únicamente los tres movimientos más recientes.
5. Invertir el orden para mostrar primero el movimiento más reciente.
6. Limpiar la lista mostrada en pantalla.
7. Recorrer cada movimiento.
8. Crear un elemento de la lista por cada movimiento.
9. Agregar cada movimiento al historial visible.

----------------------------------------------------

## Evento: Cerrar sesión

1. Esperar el clic sobre el botón "Cerrar sesión".
2. Mostrar un mensaje informativo.
3. Esperar 1.5 segundos.
4. Redirigir al usuario al Login.

----------------------------------------------------

## Flujo del Menú

Al cargar la página:

1. Mostrar el saldo disponible.
2. Esperar acciones del usuario.
3. Permitir navegar a:
   - Depósitos.
   - Enviar dinero.
   - Últimos movimientos.
4. Permitir cerrar sesión.

# 3. Depósito de dinero

## Función

Permitir agregar dinero al saldo disponible.

## Lógica

1. Obtener el saldo almacenado en LocalStorage.
2. Mostrar el saldo disponible al cargar la página.
3. Esperar que el usuario ingrese el monto a depositar.
4. Validar que el monto:
   - Sea un número.
   - Sea mayor que cero.
5. Registrar el depósito en el historial de movimientos.
6. Sumar el monto al saldo actual.
7. Guardar el nuevo saldo en LocalStorage.
8. Mostrar un mensaje indicando que el depósito fue realizado correctamente.
9. Esperar unos segundos.
10. Redirigir automáticamente al menú principal.

---

# 4. Agregar contacto

## Función

Registrar un nuevo contacto para futuras transferencias.

## Lógica

1. Obtener los datos ingresados:
   - Nombre.
   - Apellido.
   - CBU.
   - Alias.
   - Banco.
2. Limpiar mensajes de validación anteriores.
3. Validar cada campo:
   - No debe estar vacío.
   - El CBU debe tener nueve dígitos.
4. Si existe algún error:
   - Mostrar el mensaje correspondiente.
   - Detener el proceso.
5. Crear un objeto Contacto.
6. Obtener la lista de contactos desde LocalStorage.
7. Agregar el nuevo contacto.
8. Guardar nuevamente la lista.
9. Agregar el contacto a la pantalla.
10. Limpiar el formulario.
11. Mostrar mensaje de éxito.
12. Cerrar automáticamente el modal.

---

# 5. Mostrar contactos

## Función

Mostrar todos los contactos almacenados.

## Lógica

1. Obtener la lista desde LocalStorage.
2. Limpiar la lista mostrada.
3. Recorrer todos los contactos.
4. Crear un elemento visual por cada contacto.
5. Agregar cada elemento a la lista.

---

# 6. Buscar contacto

## Función

Filtrar los contactos según el texto ingresado.

## Lógica

1. Detectar cuando el usuario escribe.
2. Obtener el texto ingresado.
3. Convertir el texto a minúsculas.
4. Recorrer todos los contactos.
5. Comparar el contenido del contacto con el texto buscado.
6. Si coincide:
   - Mostrar el contacto.
7. Si no coincide:
   - Ocultarlo.
8. Si el campo queda vacío:
   - Mostrar nuevamente todos los contactos.

---

# 7. Seleccionar contacto

## Función

Permitir seleccionar el destinatario de la transferencia.

## Lógica

1. Detectar el cambio del botón radio.
2. Quitar la selección visual anterior.
3. Resaltar el nuevo contacto seleccionado.
4. Mostrar el botón "Enviar dinero".

---

# 8. Enviar dinero

## Función

Simular una transferencia de dinero a un contacto registrado mediante un modal.

## Lógica

1. Verificar que exista un contacto seleccionado.
2. Obtener el saldo disponible desde LocalStorage.
3. Mostrar un modal con:
   - Nombre del contacto.
   - Saldo disponible.
   - Campo para ingresar el monto.
4. Esperar que el usuario ingrese el monto y confirme la transferencia.
5. Validar que el monto:
   - Sea un número.
   - Sea mayor que cero.
   - No supere el saldo disponible.
6. Restar el monto al saldo disponible.
7. Guardar el nuevo saldo en LocalStorage.
8. Registrar la transferencia en el historial.
9. Mostrar un mensaje de transferencia realizada correctamente.
10. Cerrar automáticamente el modal después de unos segundos.
11. Redirigir al menú principal.

---

# 9. Historial de movimientos

## Función

Mostrar depósitos y transferencias realizadas.

## Lógica

1. Obtener los depósitos almacenados.
2. Obtener las transferencias almacenadas.
3. Unir ambos arreglos.
4. Limpiar la lista de movimientos.
5. Recorrer todos los movimientos.
6. Crear un elemento visual por cada movimiento.
7. Mostrar todos los movimientos al usuario.

---

# 10. Redirecciones

## Función

Mostrar un mensaje antes de cambiar de pantalla.

## Lógica

1. Mostrar una alerta indicando el destino.
2. Esperar dos segundos.
3. Redirigir a la pantalla correspondiente.