import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { insertServer } from "../utils/supabase";

export default {
  data: new SlashCommandBuilder()
    .setName("setting")
    .setDescription("기본 설정을 합니다.")
    .addStringOption((option) => option
      .setName("organization")
      .setDescription("연동할 깃허브 팀 이름을 입력해주세요.")
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName("token")
      .setDescription("추가하고자 하는 팀에 접근할 수 있는 깃허브 토큰을 입력해주세요.")
      .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const token = interaction.options.getString("token") ?? ""
    const organization = interaction.options.getString("organization") ?? ""
    const id = interaction.guildId ?? ""

    insertServer(organization, id, token)
    await interaction.reply({
      content: '성공적으로 연동이 완료되었습니다.'
    });
  },
} as Command;