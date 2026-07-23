import { ModalSubmitInteraction, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } from 'discord.js';
import { XerionModal } from '../../types';
import { XerionEmbed } from '../../utils/embeds';

export const applyModal = new ModalBuilder()
    .setCustomId('application_form')
    .setTitle('XerionX Staff Application')
    .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder().setCustomId('roblox_user').setLabel('Roblox Username').setStyle(TextInputStyle.Short).setRequired(true)
        ),
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder().setCustomId('age').setLabel('Age').setStyle(TextInputStyle.Short).setRequired(true)
        ),
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder().setCustomId('experience').setLabel('Previous Experience').setStyle(TextInputStyle.Paragraph).setRequired(true)
        ),
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder().setCustomId('motivation').setLabel('Why should we accept you?').setStyle(TextInputStyle.Paragraph).setRequired(true)
        )
    );

const handler: XerionModal = {
    customId: 'application_form',
    async execute(interaction: ModalSubmitInteraction) {
        const robloxUser = interaction.fields.getTextInputValue('roblox_user');
        const motivation = interaction.fields.getTextInputValue('motivation');

        const appEmbed = new XerionEmbed()
            .setTitle('📋 New Staff Application')
            .addFields(
                { name: 'Applicant', value: `<@${interaction.user.id}>`, inline: true },
                { name: 'Roblox User', value: robloxUser, inline: true },
                { name: 'Motivation', value: motivation.substring(0, 1000) }
            )
            .setColor(0xff7a00);

        // Send to application channel (configured via env)
        const appChannel = await interaction.client.channels.fetch(process.env.APP_CHANNEL_ID!);
        if (appChannel?.isTextBased()) {
            await appChannel.send({ embeds: [appEmbed] });
        }

        await interaction.reply({ 
            embeds: [new XerionEmbed('success').setTitle('Application Submitted!').setDescription('We will review your application shortly.')], 
            ephemeral: true 
        });
    }
};

export default handler;
