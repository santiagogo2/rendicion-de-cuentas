export class Opinions{
	constructor(
		public id: number,
		public name: string,
		public surname: string,
		public documentId: number,
		public sexo: string,
		public address: string,
		public location_id: number,
		public neighborhood: string,
		public phone: number,
		public email: string,
		public suggestion: string,
		public conditions: string,
		public medium: string
	){}
}