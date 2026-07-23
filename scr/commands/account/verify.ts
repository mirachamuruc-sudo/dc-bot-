import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { XerionCommand } from '../../types';
import { XerionEmbed } from '../../utils/embeds';
import { UserModel } from '../../database/models/User';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

const command: XerionCommand = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Link your Roblox account to access XerionX features'),
    
    async execute(interaction: ChatInputCommandInteraction) {
        const user = await UserModel.findOne({ discordId: interaction.user.id });
        
        if (user?.verified) {
            return interaction.reply({ 
                embeds: [new XerionEmbed('success').setTitle('Already Verified').setDescription(`Linked to **${user.robloxUsername}**`)], 
                ephemeral: true 
            });
        }

        // Create verification button that triggers a modal or external link
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('verify_start')
                .setLabel('Start Verification')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🔗')
        );

        const embed = new XerionEmbed()
            .setTitle('🔒 Account Verification Required')
            .setDescription('To access chat and exclusive XerionX features, please link your Roblox account.\n\n1. Click the button below\n2. Complete the verification flow\n3. Return here once done')
            .setThumbnail(interaction.guild?.iconURL() || '');

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
};

export default command;
