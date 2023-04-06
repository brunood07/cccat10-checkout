import TokenGenerator from "../../domain/entity/TokenGenerator";

export default class Verify {
	constructor () {
	}

	async execute (token: string): Promise<any> {
		const tokenGenerator = new TokenGenerator("key");
		return tokenGenerator.verify(token);
	}
}