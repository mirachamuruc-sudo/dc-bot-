import { EmbedBuilder } from 'discord.js';
import { THEME } from '../config/theme';

export class XerionEmbed extends EmbedBuilder {
    constructor(type: 'default' | 'success' | 'error' | 'loading' = 'default') {
        super();
        this.setColor(THEME.colors[type === 'success' ? 'success' : type === 'error' ? 'error' : 'primary']);
        this.setFooter({ text: THEME.footer });
        this.setTimestamp();
        
        if (type === 'loading') {
            this.setDescription(`${THEME.emojis.loading} Processing request...`);
        }
    }

    setPremiumAuthor(user: { username: string; avatarURL: string | null }) {
        return this.setAuthor({ 
            name: user.username, 
            iconURL: user.avatarURL || undefined 
        });
    }
}
