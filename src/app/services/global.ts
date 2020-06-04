export var global = {
	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	url: 'http://localhost:8080/rendicion-de-cuentas/api-rest-rendicion-de-cuentas/public/api/',
	roles: [
		{id: 1, value: 'admin', name: 'Administrador'},
		{id:2, value: 'user', name: 'Usuario'}
	],
	sexo: [
		{id: 1, value: 'Hombre'},
		{id: 2, value: 'Mujer'},
		{id: 3, value: 'Intersexual'}
	],
	conditions: [
		{id: 1, value: 'Adulto Mayor'},
		{id: 2, value: 'Habitante de la calle'},
		{id: 3, value: 'Gestante'},
		{id: 4, value: 'Ninguna'},
		{id: 5, value: 'Otra'},
		{id: 6, value: 'Peligro inminente'},
		{id: 7, value: 'Periodista en ejercicio de sus actividades'},
		{id: 8, value: 'Persona con discapacidad'},
		{id: 9, value: 'Primera infancia'},
		{id: 10, value: 'Veterano fuerza pública'},
		{id: 11, value: 'Víctima del conflicto armado'}
	],
	receptions: [
		{id: 1, value: 'Dirección de correspondencia'},
		{id: 2, value: 'Correo electrónico'},
		{id: 3, value: 'Personalmente en la unidad'}
	]
}