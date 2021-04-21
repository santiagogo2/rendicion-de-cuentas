export var global = {
	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	url: 'http://localhost:8080/seguridadPaciente/api-seguridad-paciente/public/api/',
	roles: [
		{id: 1, value: 'ROLE_ADMIN', name: 'Administrador'},
		{id:2, value: 'ROLE_USER', name: 'Usuario'}
	],

	servicesAddress: [
		{id: 1, name: 'DIRECCIÓN DE GESTIÓN DEL RIESGO'},
		{id: 2, name: 'DIRECCIÓN DE URGENCIAS'},
		{id: 3, name: 'DIRECCIÓN DE AMBULATORIOS'},
		{id: 4, name: 'DIRECCIÓN DE HOSPITALARIOS'},
		{id: 5, name: 'DIRECCIÓN DE COMPLEMENTARIOS'},
	],
	genders: [
		{id: 1, name: 'MASCULINO'},
		{id: 2, name: 'FEMENINO'},
		{id: 3, name: 'OTRO'},
		{id: 4, name: 'NO APLICA'},
	],
	insurers: [
		{id: 1, name: 'ALIANSALUD'},
		{id: 2, name: 'COMPENSAR'},
		{id: 3, name: 'FAMISANAR'},
		{id: 4, name: 'MEDIMAS'},
		{id: 5, name: 'NUEVA EPS'},
	],
	profiles: [
		{id: 1, name: 'ADMINISTRATIVO'},
		{id: 2, name: 'AUXILIAR DE FARMACIA'},
		{id: 3, name: 'AUXILIAR DE LABORATORIO'},
		{id: 4, name: 'AUXILIAR DE SALUD ORAL'},
		{id: 5, name: 'BACTERIÓLOGO'},
	],
	units: [
		{id: 1, name: 'ABRAHAM LINCOLN'},
		{id: 2, name: 'BETANIA'},
		{id: 3, name: 'CANDELARIA I'},
		{id: 4, name: 'CANDELARIA II'},
		{id: 5, name: 'CASA DE TEJA'},
	],
	services: [
		{id: 1, name: 'APH'},
		{id: 2, name: 'CARDIOLOGÍA'},
		{id: 3, name: 'CLINICA DE HERIDAS'},
	]
}