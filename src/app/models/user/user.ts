export class User{
	constructor(
		public id: number,
		public name: string,
		public alias: string,
		public password: string,
		public role: string
	){}
}