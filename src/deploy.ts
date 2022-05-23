import dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import * as Commands from "./commands";

dotenv.config();

const commands: Array<any> = []

for (const command in Commands) {
    commands.push(Commands[command as keyof typeof Commands].data.toJSON());
};

const rest: REST = new REST({ version: '10' }).setToken(process.env.TOKEN as string);

(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID as string),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	} finally {
		process.exit(0);
	}
})();

