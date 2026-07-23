import { ChatInputCommandInteraction, ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from 'discord.js';

export interface XerionCommand {
    data: any; // SlashCommandBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    cooldown?: number;
    permissions?: string[];
    category?: string;
}

export interface XerionButton {
    customId: string | RegExp;
    execute: (interaction: ButtonInteraction) => Promise<void>;
}

export interface XerionModal {
    customId: string | RegExp;
    execute: (interaction: ModalSubmitInteraction) => Promise<void>;
}

export interface XerionSelectMenu {
    customId: string | RegExp;
    execute: (interaction: StringSelectMenuInteraction) => Promise<void>;
}
