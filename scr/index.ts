import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { loadCommands } from './handlers/commandHandler';
import { loadEvents } from './handlers/eventHandler';
import { loadComponents } from './handlers/componentHandler';
import { Logger } from './utils/logger';

config();

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, any>;
        buttons: Collection<string, any>;
        modals: Collection<string, any>;
        selectMenus: Collection<string, any>;
    }
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();

async function bootstrap() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        Logger.success('Connected to MongoDB');

        await loadEvents(client);
        await loadComponents(client);
        await loadCommands(client);

        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        Logger.error('Fatal startup error:', error);
        process.exit(1);
    }
}

bootstrap();
