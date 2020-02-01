export default class User {
	constructor({ init }) {
		this.xp = init.xp ? init.xp : 0;
		this.cursusLevel = init.cursusLevel ? init.cursusLevel : 0;
		this.fjlat = init.fjlat ? init.fjlat : 0;
		this.achievements = init.achievements ? init.achievements : [];
		this.tfejel = init.tfejel ? init.tfejel : 0;
	}
}
