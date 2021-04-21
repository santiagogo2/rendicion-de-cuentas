export class Report{
	constructor(
		public id: number,
		public services_address_id: number,
		public name: string,
		public document: number,
		public age: number,
		public gender: number,
		public insurer_id: number,
		public report_date: string,
		public events_date: string,
		public events_time: string,
		public profile_id: number,
		public unit_id: number,
		public service_id: number,
		public event_description: string,
		public situation_description: string,
		public medical_description: string,
		public file: string,
		public email: string,
	){}
}