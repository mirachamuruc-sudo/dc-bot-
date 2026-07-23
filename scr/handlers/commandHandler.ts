import { readdirSync } from 'fs';
import { join } from 'path';
import { Client, REST, Routes } from 'discord.js';
import { XerionCommand } from '../types';
import { Logger } from '../utils/logger';

export async function loadCommands(client: Client) {
    const commands: XerionCommand[] = [];
    const commandPath = join(__dirname, '../commands');
    
    const categories = readdirSync(commandPath);
    
    for (const category of categories) {
        const commandFiles = readdirSync(join(commandPath, category)).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command: XerionCommand = require(join(commandPath, category, file)).default;
            client.commands.set(command.data.name, command);
            commands.push(command);
            Logger.info(`Loaded command: /${command.data.name}`);
        }
    }

    // Deploy to Discord REST API
    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
            { body: commands.map(c => c.data.toJSON()) }
        );
        Logger.success('Successfully deployed all slash commands.');
    } catch (error) {
        Logger.error('Failed to deploy commands:', error);
    }
}
