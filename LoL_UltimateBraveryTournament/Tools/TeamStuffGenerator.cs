using LoL_UltimateBraveryTournament.Class;

namespace LoL_UltimateBraveryTournament
{
    public partial class TeamStuffGenerator : Form
    {
        readonly List<string> champsList = Champions.GetAllChampionsName();

        public TeamStuffGenerator()
        {
            InitializeComponent();

            // Initialisation des lanes
            Player1_Settings_Lane.Load(ServerUrl.LaneImgUrl("top"));
            Player2_Settings_Lane.Load(ServerUrl.LaneImgUrl("jungle"));
            Player3_Settings_Lane.Load(ServerUrl.LaneImgUrl("mid"));
            Player4_Settings_Lane.Load(ServerUrl.LaneImgUrl("bottom"));
            Player5_Settings_Lane.Load(ServerUrl.LaneImgUrl("support"));
            Player1_Settings_Lane.Tag = "top";
            Player2_Settings_Lane.Tag = "jungle";
            Player3_Settings_Lane.Tag = "mid";
            Player4_Settings_Lane.Tag = "bottom";
            Player5_Settings_Lane.Tag = "support";

            // Initialisation des listes de champions
            Player1_Settings_ChampName.Items.AddRange(champsList.ToArray());
            Player2_Settings_ChampName.Items.AddRange(champsList.ToArray());
            Player3_Settings_ChampName.Items.AddRange(champsList.ToArray());
            Player4_Settings_ChampName.Items.AddRange(champsList.ToArray());
            Player5_Settings_ChampName.Items.AddRange(champsList.ToArray());

            // Initialisation des items
            Player1_Items_Item1.Tag = "0";
            Player2_Items_Item1.Tag = "0";
            Player3_Items_Item1.Tag = "0";
            Player4_Items_Item1.Tag = "0";
            Player5_Items_Item1.Tag = "0";
            Player1_Items_Item2.Tag = "0";
            Player2_Items_Item2.Tag = "0";
            Player3_Items_Item2.Tag = "0";
            Player4_Items_Item2.Tag = "0";
            Player5_Items_Item2.Tag = "0";
            Player1_Items_Item3.Tag = "0";
            Player2_Items_Item3.Tag = "0";
            Player3_Items_Item3.Tag = "0";
            Player4_Items_Item3.Tag = "0";
            Player5_Items_Item3.Tag = "0";
            Player1_Items_Item4.Tag = "0";
            Player2_Items_Item4.Tag = "0";
            Player3_Items_Item4.Tag = "0";
            Player4_Items_Item4.Tag = "0";
            Player5_Items_Item4.Tag = "0";
            Player1_Items_Item5.Tag = "0";
            Player2_Items_Item5.Tag = "0";
            Player3_Items_Item5.Tag = "0";
            Player4_Items_Item5.Tag = "0";
            Player5_Items_Item5.Tag = "0";
            Player1_Items_Item6.Tag = "0";
            Player2_Items_Item6.Tag = "0";
            Player3_Items_Item6.Tag = "0";
            Player4_Items_Item6.Tag = "0";
            Player5_Items_Item6.Tag = "0";
            Player1_Items_Item7.Tag = "0";
            Player2_Items_Item7.Tag = "0";
            Player3_Items_Item7.Tag = "0";
            Player4_Items_Item7.Tag = "0";
            Player5_Items_Item7.Tag = "0";

            // Initialisation du texte des spells principaux
            Player1_Spells_MainSpellKey.Text = "";
            Player2_Spells_MainSpellKey.Text = "";
            Player3_Spells_MainSpellKey.Text = "";
            Player4_Spells_MainSpellKey.Text = "";
            Player5_Spells_MainSpellKey.Text = "";
        }

        private void Player1_Settings_ChampName_SelectedValueChanged(object sender, EventArgs e)
        {
            if ((string)Player1_Settings_ChampName.SelectedItem != null && (string)Player1_Settings_ChampName.SelectedItem != "")
            {
                Player1_Settings_ChampPict.Load(ServerUrl.ChampionImgUrl(Champions.GetChampionId((string)Player1_Settings_ChampName.SelectedItem)));
            }
        }

        private void Player2_Settings_ChampName_SelectedValueChanged(object sender, EventArgs e)
        {
            if ((string)Player2_Settings_ChampName.SelectedItem != null && (string)Player2_Settings_ChampName.SelectedItem != "")
            {
                Player2_Settings_ChampPict.Load(ServerUrl.ChampionImgUrl(Champions.GetChampionId((string)Player2_Settings_ChampName.SelectedItem)));
            }
        }

        private void Player3_Settings_ChampName_SelectedValueChanged(object sender, EventArgs e)
        {
            if ((string)Player3_Settings_ChampName.SelectedItem != null && (string)Player3_Settings_ChampName.SelectedItem != "")
            {
                Player3_Settings_ChampPict.Load(ServerUrl.ChampionImgUrl(Champions.GetChampionId((string)Player3_Settings_ChampName.SelectedItem)));
            }
        }

        private void Player4_Settings_ChampName_SelectedValueChanged(object sender, EventArgs e)
        {
            if ((string)Player4_Settings_ChampName.SelectedItem != null && (string)Player4_Settings_ChampName.SelectedItem != "")
            {
                Player4_Settings_ChampPict.Load(ServerUrl.ChampionImgUrl(Champions.GetChampionId((string)Player4_Settings_ChampName.SelectedItem)));
            }
        }

        private void Player5_Settings_ChampName_SelectedValueChanged(object sender, EventArgs e)
        {
            if ((string)Player5_Settings_ChampName.SelectedItem != null && (string)Player5_Settings_ChampName.SelectedItem != "")
            {
                Player5_Settings_ChampPict.Load(ServerUrl.ChampionImgUrl(Champions.GetChampionId((string)Player5_Settings_ChampName.SelectedItem)));
            }
        }

        private void StuffGenerator_GenerateButton_Click(object sender, EventArgs e)
        {
            if (Player1_Settings_ChampName.Text != "" && Player2_Settings_ChampName.Text != "" && Player3_Settings_ChampName.Text != "" && Player4_Settings_ChampName.Text != "" && Player5_Settings_ChampName.Text != "")
            {
                // Désactivation de l'interface
                StuffGenerator_GenerateButton.Enabled = false;
                StuffGenerator_GenerateButton.Text = "Génération des runes et du stuff en cours...";
                StuffGenerator_Reset.Enabled = false;
                Player1_Settings_ChampName.Enabled = false;
                Player2_Settings_ChampName.Enabled = false;
                Player3_Settings_ChampName.Enabled = false;
                Player4_Settings_ChampName.Enabled = false;
                Player5_Settings_ChampName.Enabled = false;

                // Réinitialisation de la précédente génération (si existante)
                StuffGenerator_ResetForm(false);

                // Activation du refresh automatique
                StuffGenerator_AutoRefresh.Enabled = true;

                // Génération des runes
                List<string> player1MainRunes = Runes.GetMainRunesForPlayer();
                List<string> player2MainRunes = Runes.GetMainRunesForPlayer();
                List<string> player3MainRunes = Runes.GetMainRunesForPlayer();
                List<string> player4MainRunes = Runes.GetMainRunesForPlayer();
                List<string> player5MainRunes = Runes.GetMainRunesForPlayer();
                List<string> player1SecondaryRunes = Runes.GetSecondaryRunesForPlayer();
                List<string> player2SecondaryRunes = Runes.GetSecondaryRunesForPlayer();
                List<string> player3SecondaryRunes = Runes.GetSecondaryRunesForPlayer();
                List<string> player4SecondaryRunes = Runes.GetSecondaryRunesForPlayer();
                List<string> player5SecondaryRunes = Runes.GetSecondaryRunesForPlayer();
                List<string> player1StatsRunes = Runes.GetStatsRunesForPlayer();
                List<string> player2StatsRunes = Runes.GetStatsRunesForPlayer();
                List<string> player3StatsRunes = Runes.GetStatsRunesForPlayer();
                List<string> player4StatsRunes = Runes.GetStatsRunesForPlayer();
                List<string> player5StatsRunes = Runes.GetStatsRunesForPlayer();

                Player1_Runes_Main1.Load(ServerUrl.RuneElementImgUrl(player1MainRunes[0].Replace("/", "\\")));
                Player1_Runes_Main2.Load(ServerUrl.RuneElementImgUrl(player1MainRunes[1].Replace("/", "\\")));
                Player1_Runes_Main3.Load(ServerUrl.RuneElementImgUrl(player1MainRunes[2].Replace("/", "\\")));
                Player1_Runes_Main4.Load(ServerUrl.RuneElementImgUrl(player1MainRunes[3].Replace("/", "\\")));
                Player1_Runes_Secondary1.Load(ServerUrl.RuneElementImgUrl(player1SecondaryRunes[0].Replace("/", "\\")));
                Player1_Runes_Secondary2.Load(ServerUrl.RuneElementImgUrl(player1SecondaryRunes[1].Replace("/", "\\")));
                Player1_Runes_Stats1.Load(ServerUrl.RuneElementImgUrl(player1StatsRunes[0].Replace("/", "\\")));
                Player1_Runes_Stats2.Load(ServerUrl.RuneElementImgUrl(player1StatsRunes[1].Replace("/", "\\")));
                Player1_Runes_Stats3.Load(ServerUrl.RuneElementImgUrl(player1StatsRunes[2].Replace("/", "\\")));

                Player2_Runes_Main1.Load(ServerUrl.RuneElementImgUrl(player2MainRunes[0].Replace("/", "\\")));
                Player2_Runes_Main2.Load(ServerUrl.RuneElementImgUrl(player2MainRunes[1].Replace("/", "\\")));
                Player2_Runes_Main3.Load(ServerUrl.RuneElementImgUrl(player2MainRunes[2].Replace("/", "\\")));
                Player2_Runes_Main4.Load(ServerUrl.RuneElementImgUrl(player2MainRunes[3].Replace("/", "\\")));
                Player2_Runes_Secondary1.Load(ServerUrl.RuneElementImgUrl(player2SecondaryRunes[0].Replace("/", "\\")));
                Player2_Runes_Secondary2.Load(ServerUrl.RuneElementImgUrl(player2SecondaryRunes[1].Replace("/", "\\")));
                Player2_Runes_Stats1.Load(ServerUrl.RuneElementImgUrl(player2StatsRunes[0].Replace("/", "\\")));
                Player2_Runes_Stats2.Load(ServerUrl.RuneElementImgUrl(player2StatsRunes[1].Replace("/", "\\")));
                Player2_Runes_Stats3.Load(ServerUrl.RuneElementImgUrl(player2StatsRunes[2].Replace("/", "\\")));

                Player3_Runes_Main1.Load(ServerUrl.RuneElementImgUrl(player3MainRunes[0].Replace("/", "\\")));
                Player3_Runes_Main2.Load(ServerUrl.RuneElementImgUrl(player3MainRunes[1].Replace("/", "\\")));
                Player3_Runes_Main3.Load(ServerUrl.RuneElementImgUrl(player3MainRunes[2].Replace("/", "\\")));
                Player3_Runes_Main4.Load(ServerUrl.RuneElementImgUrl(player3MainRunes[3].Replace("/", "\\")));
                Player3_Runes_Secondary1.Load(ServerUrl.RuneElementImgUrl(player3SecondaryRunes[0].Replace("/", "\\")));
                Player3_Runes_Secondary2.Load(ServerUrl.RuneElementImgUrl(player3SecondaryRunes[1].Replace("/", "\\")));
                Player3_Runes_Stats1.Load(ServerUrl.RuneElementImgUrl(player3StatsRunes[0].Replace("/", "\\")));
                Player3_Runes_Stats2.Load(ServerUrl.RuneElementImgUrl(player3StatsRunes[1].Replace("/", "\\")));
                Player3_Runes_Stats3.Load(ServerUrl.RuneElementImgUrl(player3StatsRunes[2].Replace("/", "\\")));

                Player4_Runes_Main1.Load(ServerUrl.RuneElementImgUrl(player4MainRunes[0].Replace("/", "\\")));
                Player4_Runes_Main2.Load(ServerUrl.RuneElementImgUrl(player4MainRunes[1].Replace("/", "\\")));
                Player4_Runes_Main3.Load(ServerUrl.RuneElementImgUrl(player4MainRunes[2].Replace("/", "\\")));
                Player4_Runes_Main4.Load(ServerUrl.RuneElementImgUrl(player4MainRunes[3].Replace("/", "\\")));
                Player4_Runes_Secondary1.Load(ServerUrl.RuneElementImgUrl(player4SecondaryRunes[0].Replace("/", "\\")));
                Player4_Runes_Secondary2.Load(ServerUrl.RuneElementImgUrl(player4SecondaryRunes[1].Replace("/", "\\")));
                Player4_Runes_Stats1.Load(ServerUrl.RuneElementImgUrl(player4StatsRunes[0].Replace("/", "\\")));
                Player4_Runes_Stats2.Load(ServerUrl.RuneElementImgUrl(player4StatsRunes[1].Replace("/", "\\")));
                Player4_Runes_Stats3.Load(ServerUrl.RuneElementImgUrl(player4StatsRunes[2].Replace("/", "\\")));

                Player5_Runes_Main1.Load(ServerUrl.RuneElementImgUrl(player5MainRunes[0].Replace("/", "\\")));
                Player5_Runes_Main2.Load(ServerUrl.RuneElementImgUrl(player5MainRunes[1].Replace("/", "\\")));
                Player5_Runes_Main3.Load(ServerUrl.RuneElementImgUrl(player5MainRunes[2].Replace("/", "\\")));
                Player5_Runes_Main4.Load(ServerUrl.RuneElementImgUrl(player5MainRunes[3].Replace("/", "\\")));
                Player5_Runes_Secondary1.Load(ServerUrl.RuneElementImgUrl(player5SecondaryRunes[0].Replace("/", "\\")));
                Player5_Runes_Secondary2.Load(ServerUrl.RuneElementImgUrl(player5SecondaryRunes[1].Replace("/", "\\")));
                Player5_Runes_Stats1.Load(ServerUrl.RuneElementImgUrl(player5StatsRunes[0].Replace("/", "\\")));
                Player5_Runes_Stats2.Load(ServerUrl.RuneElementImgUrl(player5StatsRunes[1].Replace("/", "\\")));
                Player5_Runes_Stats3.Load(ServerUrl.RuneElementImgUrl(player5StatsRunes[2].Replace("/", "\\")));

                // Génération des items
                List<string> player1Items = Items.GetItemsForPlayer(Player1_Settings_Lane.Tag.ToString());
                List<string> player2Items = Items.GetItemsForPlayer(Player2_Settings_Lane.Tag.ToString());
                List<string> player3Items = Items.GetItemsForPlayer(Player3_Settings_Lane.Tag.ToString());
                List<string> player4Items = Items.GetItemsForPlayer(Player4_Settings_Lane.Tag.ToString());
                List<string> player5Items = Items.GetItemsForPlayer(Player5_Settings_Lane.Tag.ToString());

                Player1_Items_Item1.Load(ServerUrl.ItemImgUrl(player1Items[0].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player1_Items_Item2.Load(ServerUrl.ItemImgUrl(player1Items[1].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player1_Items_Item3.Load(ServerUrl.ItemImgUrl(player1Items[2].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player1_Items_Item4.Load(ServerUrl.ItemImgUrl(player1Items[3].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player1_Items_Item5.Load(ServerUrl.ItemImgUrl(player1Items[4].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player1_Items_Item6.Load(ServerUrl.ItemImgUrl(player1Items[5].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player1_Items_Item1.Tag = player1Items[0];
                Player1_Items_Item2.Tag = player1Items[1];
                Player1_Items_Item3.Tag = player1Items[2];
                Player1_Items_Item4.Tag = player1Items[3];
                Player1_Items_Item5.Tag = player1Items[4];
                Player1_Items_Item6.Tag = player1Items[5];

                Player2_Items_Item1.Load(ServerUrl.ItemImgUrl(player2Items[0].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player2_Items_Item2.Load(ServerUrl.ItemImgUrl(player2Items[1].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player2_Items_Item3.Load(ServerUrl.ItemImgUrl(player2Items[2].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player2_Items_Item4.Load(ServerUrl.ItemImgUrl(player2Items[3].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player2_Items_Item5.Load(ServerUrl.ItemImgUrl(player2Items[4].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player2_Items_Item6.Load(ServerUrl.ItemImgUrl(player2Items[5].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player2_Items_Item1.Tag = player2Items[0];
                Player2_Items_Item2.Tag = player2Items[1];
                Player2_Items_Item3.Tag = player2Items[2];
                Player2_Items_Item4.Tag = player2Items[3];
                Player2_Items_Item5.Tag = player2Items[4];
                Player2_Items_Item6.Tag = player2Items[5];

                Player3_Items_Item1.Load(ServerUrl.ItemImgUrl(player3Items[0].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player3_Items_Item2.Load(ServerUrl.ItemImgUrl(player3Items[1].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player3_Items_Item3.Load(ServerUrl.ItemImgUrl(player3Items[2].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player3_Items_Item4.Load(ServerUrl.ItemImgUrl(player3Items[3].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player3_Items_Item5.Load(ServerUrl.ItemImgUrl(player3Items[4].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player3_Items_Item6.Load(ServerUrl.ItemImgUrl(player3Items[5].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player3_Items_Item1.Tag = player3Items[0];
                Player3_Items_Item2.Tag = player3Items[1];
                Player3_Items_Item3.Tag = player3Items[2];
                Player3_Items_Item4.Tag = player3Items[3];
                Player3_Items_Item5.Tag = player3Items[4];
                Player3_Items_Item6.Tag = player3Items[5];

                Player4_Items_Item1.Load(ServerUrl.ItemImgUrl(player4Items[0].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player4_Items_Item2.Load(ServerUrl.ItemImgUrl(player4Items[1].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player4_Items_Item3.Load(ServerUrl.ItemImgUrl(player4Items[2].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player4_Items_Item4.Load(ServerUrl.ItemImgUrl(player4Items[3].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player4_Items_Item5.Load(ServerUrl.ItemImgUrl(player4Items[4].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player4_Items_Item6.Load(ServerUrl.ItemImgUrl(player4Items[5].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player4_Items_Item1.Tag = player4Items[0];
                Player4_Items_Item2.Tag = player4Items[1];
                Player4_Items_Item3.Tag = player4Items[2];
                Player4_Items_Item4.Tag = player4Items[3];
                Player4_Items_Item5.Tag = player4Items[4];
                Player4_Items_Item6.Tag = player4Items[5];

                Player5_Items_Item1.Load(ServerUrl.ItemImgUrl(player5Items[0].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player5_Items_Item2.Load(ServerUrl.ItemImgUrl(player5Items[1].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player5_Items_Item3.Load(ServerUrl.ItemImgUrl(player5Items[2].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player5_Items_Item4.Load(ServerUrl.ItemImgUrl(player5Items[3].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player5_Items_Item5.Load(ServerUrl.ItemImgUrl(player5Items[4].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player5_Items_Item6.Load(ServerUrl.ItemImgUrl(player5Items[5].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                Player5_Items_Item1.Tag = player5Items[0];
                Player5_Items_Item2.Tag = player5Items[1];
                Player5_Items_Item3.Tag = player5Items[2];
                Player5_Items_Item4.Tag = player5Items[3];
                Player5_Items_Item5.Tag = player5Items[4];
                Player5_Items_Item6.Tag = player5Items[5];

                if (Player1_Settings_Lane.Tag.ToString() == "jungle")
                {
                    Player1_Items_Item7.Load(ServerUrl.ItemImgUrl(player1Items[6].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                    Player1_Items_Item7.Tag = player1Items[6];
                }

                if (Player2_Settings_Lane.Tag.ToString() == "jungle")
                {
                    Player2_Items_Item7.Load(ServerUrl.ItemImgUrl(player2Items[6].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                    Player2_Items_Item7.Tag = player2Items[6];
                }

                if (Player3_Settings_Lane.Tag.ToString() == "jungle")
                {
                    Player3_Items_Item7.Load(ServerUrl.ItemImgUrl(player3Items[6].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                    Player3_Items_Item7.Tag = player3Items[6];
                }

                if (Player4_Settings_Lane.Tag.ToString() == "jungle")
                {
                    Player4_Items_Item7.Load(ServerUrl.ItemImgUrl(player4Items[6].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                    Player4_Items_Item7.Tag = player4Items[6];
                }

                if (Player5_Settings_Lane.Tag.ToString() == "jungle")
                {
                    Player5_Items_Item7.Load(ServerUrl.ItemImgUrl(player5Items[6].Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
                    Player5_Items_Item7.Tag = player5Items[6];
                }

                // Génération des summoners
                List<string> player1Summoners = Summoners.GetSummonersForPlayer(Player1_Settings_Lane.Tag.ToString());
                List<string> player2Summoners = Summoners.GetSummonersForPlayer(Player2_Settings_Lane.Tag.ToString());
                List<string> player3Summoners = Summoners.GetSummonersForPlayer(Player3_Settings_Lane.Tag.ToString());
                List<string> player4Summoners = Summoners.GetSummonersForPlayer(Player4_Settings_Lane.Tag.ToString());
                List<string> player5Summoners = Summoners.GetSummonersForPlayer(Player5_Settings_Lane.Tag.ToString());

                Player1_Spells_Summoner1.Load(ServerUrl.SummonerImgUrl(player1Summoners[0]));
                Player1_Spells_Summoner2.Load(ServerUrl.SummonerImgUrl(player1Summoners[1]));
                Player2_Spells_Summoner1.Load(ServerUrl.SummonerImgUrl(player2Summoners[0]));
                Player2_Spells_Summoner2.Load(ServerUrl.SummonerImgUrl(player2Summoners[1]));
                Player3_Spells_Summoner1.Load(ServerUrl.SummonerImgUrl(player3Summoners[0]));
                Player3_Spells_Summoner2.Load(ServerUrl.SummonerImgUrl(player3Summoners[1]));
                Player4_Spells_Summoner1.Load(ServerUrl.SummonerImgUrl(player4Summoners[0]));
                Player4_Spells_Summoner2.Load(ServerUrl.SummonerImgUrl(player4Summoners[1]));
                Player5_Spells_Summoner1.Load(ServerUrl.SummonerImgUrl(player5Summoners[0]));
                Player5_Spells_Summoner2.Load(ServerUrl.SummonerImgUrl(player5Summoners[1]));

                // Génération des spells principaux
                if (Player1_Settings_ChampName.Text != "Aphelios")
                {
                    List<string> player1Spell = Champions.GetChampionSpellForPlayer(Player1_Settings_ChampName.Text);
                    Player1_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl(player1Spell[0]));
                    Player1_Spells_MainSpellKey.Text = player1Spell[1];
                }
                else
                {
                    // Pour Aphelios, on utilise le spell générique
                    Player1_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl("ApheliosQ_ClientTooltipWrapper"));
                    Player1_Spells_MainSpellKey.Text = "A / Q";
                }

                if (Player2_Settings_ChampName.Text != "Aphelios")
                {
                    List<string> player2Spell = Champions.GetChampionSpellForPlayer(Player2_Settings_ChampName.Text);
                    Player2_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl(player2Spell[0]));
                    Player2_Spells_MainSpellKey.Text = player2Spell[1];
                }
                else
                {
                    // Pour Aphelios, on utilise le spell générique
                    Player2_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl("ApheliosQ_ClientTooltipWrapper"));
                    Player2_Spells_MainSpellKey.Text = "A / Q";
                }

                if (Player3_Settings_ChampName.Text != "Aphelios")
                {
                    List<string> player3Spell = Champions.GetChampionSpellForPlayer(Player3_Settings_ChampName.Text);
                    Player3_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl(player3Spell[0]));
                    Player3_Spells_MainSpellKey.Text = player3Spell[1];
                }
                else
                {
                    // Pour Aphelios, on utilise le spell générique
                    Player3_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl("ApheliosQ_ClientTooltipWrapper"));
                    Player3_Spells_MainSpellKey.Text = "A / Q";
                }

                if (Player4_Settings_ChampName.Text != "Aphelios")
                {
                    List<string> player4Spell = Champions.GetChampionSpellForPlayer(Player4_Settings_ChampName.Text);
                    Player4_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl(player4Spell[0]));
                    Player4_Spells_MainSpellKey.Text = player4Spell[1];
                }
                else
                {
                    // Pour Aphelios, on utilise le spell générique
                    Player4_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl("ApheliosQ_ClientTooltipWrapper"));
                    Player4_Spells_MainSpellKey.Text = "A / Q";
                }

                if (Player5_Settings_ChampName.Text != "Aphelios")
                {
                    List<string> player5Spell = Champions.GetChampionSpellForPlayer(Player5_Settings_ChampName.Text);
                    Player5_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl(player5Spell[0]));
                    Player5_Spells_MainSpellKey.Text = player5Spell[1];
                }
                else
                {
                    // Pour Aphelios, on utilise le spell générique
                    Player5_Spells_MainSpellImg.Load(ServerUrl.SpellImgUrl("ApheliosQ_ClientTooltipWrapper"));
                    Player5_Spells_MainSpellKey.Text = "A / Q";
                }

                // Désactivation du refresh automatique
                StuffGenerator_AutoRefresh.Enabled = false;

                // Réactivation et actualisation de l'interface
                StuffGenerator_GenerateButton.Enabled = true;
                StuffGenerator_GenerateButton.Text = "Générer les runes et les stuff de chaque membre de l'équipe";
                StuffGenerator_Reset.Enabled = true;
                Player1_Settings_ChampName.Enabled = true;
                Player2_Settings_ChampName.Enabled = true;
                Player3_Settings_ChampName.Enabled = true;
                Player4_Settings_ChampName.Enabled = true;
                Player5_Settings_ChampName.Enabled = true;
                Refresh();
            }
            else
            {
                MessageBox.Show("Au moins un joueur ne dispose actuellement d'aucun champion.", Text, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void StuffGenerator_Reset_Click(object sender, EventArgs e)
        {
            StuffGenerator_ResetForm(true);
        }

        private void StuffGenerator_ResetForm(bool fullReset)
        {
            if (fullReset)
            {
                // Réinitialisation du choix des champions
                Player1_Settings_ChampName.Text = null;
                Player2_Settings_ChampName.Text = null;
                Player3_Settings_ChampName.Text = null;
                Player4_Settings_ChampName.Text = null;
                Player5_Settings_ChampName.Text = null;
                Player1_Settings_ChampPict.Image = null;
                Player2_Settings_ChampPict.Image = null;
                Player3_Settings_ChampPict.Image = null;
                Player4_Settings_ChampPict.Image = null;
                Player5_Settings_ChampPict.Image = null;
            }

            // Réinitialisation des runes générées
            Player1_Runes_Main1.Image = null;
            Player2_Runes_Main1.Image = null;
            Player3_Runes_Main1.Image = null;
            Player4_Runes_Main1.Image = null;
            Player5_Runes_Main1.Image = null;
            Player1_Runes_Main2.Image = null;
            Player2_Runes_Main2.Image = null;
            Player3_Runes_Main2.Image = null;
            Player4_Runes_Main2.Image = null;
            Player5_Runes_Main2.Image = null;
            Player1_Runes_Main3.Image = null;
            Player2_Runes_Main3.Image = null;
            Player3_Runes_Main3.Image = null;
            Player4_Runes_Main3.Image = null;
            Player5_Runes_Main3.Image = null;
            Player1_Runes_Main4.Image = null;
            Player2_Runes_Main4.Image = null;
            Player3_Runes_Main4.Image = null;
            Player4_Runes_Main4.Image = null;
            Player5_Runes_Main4.Image = null;
            Player1_Runes_Secondary1.Image = null;
            Player2_Runes_Secondary1.Image = null;
            Player3_Runes_Secondary1.Image = null;
            Player4_Runes_Secondary1.Image = null;
            Player5_Runes_Secondary1.Image = null;
            Player1_Runes_Secondary2.Image = null;
            Player2_Runes_Secondary2.Image = null;
            Player3_Runes_Secondary2.Image = null;
            Player4_Runes_Secondary2.Image = null;
            Player5_Runes_Secondary2.Image = null;
            Player1_Runes_Stats1.Image = null;
            Player2_Runes_Stats1.Image = null;
            Player3_Runes_Stats1.Image = null;
            Player4_Runes_Stats1.Image = null;
            Player5_Runes_Stats1.Image = null;
            Player1_Runes_Stats2.Image = null;
            Player2_Runes_Stats2.Image = null;
            Player3_Runes_Stats2.Image = null;
            Player4_Runes_Stats2.Image = null;
            Player5_Runes_Stats2.Image = null;
            Player1_Runes_Stats3.Image = null;
            Player2_Runes_Stats3.Image = null;
            Player3_Runes_Stats3.Image = null;
            Player4_Runes_Stats3.Image = null;
            Player5_Runes_Stats3.Image = null;

            // Réinitialisation des items
            Player1_Items_Item1.Tag = "0";
            Player2_Items_Item1.Tag = "0";
            Player3_Items_Item1.Tag = "0";
            Player4_Items_Item1.Tag = "0";
            Player5_Items_Item1.Tag = "0";
            Player1_Items_Item2.Tag = "0";
            Player2_Items_Item2.Tag = "0";
            Player3_Items_Item2.Tag = "0";
            Player4_Items_Item2.Tag = "0";
            Player5_Items_Item2.Tag = "0";
            Player1_Items_Item3.Tag = "0";
            Player2_Items_Item3.Tag = "0";
            Player3_Items_Item3.Tag = "0";
            Player4_Items_Item3.Tag = "0";
            Player5_Items_Item3.Tag = "0";
            Player1_Items_Item4.Tag = "0";
            Player2_Items_Item4.Tag = "0";
            Player3_Items_Item4.Tag = "0";
            Player4_Items_Item4.Tag = "0";
            Player5_Items_Item4.Tag = "0";
            Player1_Items_Item5.Tag = "0";
            Player2_Items_Item5.Tag = "0";
            Player3_Items_Item5.Tag = "0";
            Player4_Items_Item5.Tag = "0";
            Player5_Items_Item5.Tag = "0";
            Player1_Items_Item6.Tag = "0";
            Player2_Items_Item6.Tag = "0";
            Player3_Items_Item6.Tag = "0";
            Player4_Items_Item6.Tag = "0";
            Player5_Items_Item6.Tag = "0";
            Player1_Items_Item7.Tag = "0";
            Player2_Items_Item7.Tag = "0";
            Player3_Items_Item7.Tag = "0";
            Player4_Items_Item7.Tag = "0";
            Player5_Items_Item7.Tag = "0";
            Player1_Items_Item1.Image = null;
            Player2_Items_Item1.Image = null;
            Player3_Items_Item1.Image = null;
            Player4_Items_Item1.Image = null;
            Player5_Items_Item1.Image = null;
            Player1_Items_Item2.Image = null;
            Player2_Items_Item2.Image = null;
            Player3_Items_Item2.Image = null;
            Player4_Items_Item2.Image = null;
            Player5_Items_Item2.Image = null;
            Player1_Items_Item3.Image = null;
            Player2_Items_Item3.Image = null;
            Player3_Items_Item3.Image = null;
            Player4_Items_Item3.Image = null;
            Player5_Items_Item3.Image = null;
            Player1_Items_Item4.Image = null;
            Player2_Items_Item4.Image = null;
            Player3_Items_Item4.Image = null;
            Player4_Items_Item4.Image = null;
            Player5_Items_Item4.Image = null;
            Player1_Items_Item5.Image = null;
            Player2_Items_Item5.Image = null;
            Player3_Items_Item5.Image = null;
            Player4_Items_Item5.Image = null;
            Player5_Items_Item5.Image = null;
            Player1_Items_Item6.Image = null;
            Player2_Items_Item6.Image = null;
            Player3_Items_Item6.Image = null;
            Player4_Items_Item6.Image = null;
            Player5_Items_Item6.Image = null;
            Player1_Items_Item7.Image = null;
            Player2_Items_Item7.Image = null;
            Player3_Items_Item7.Image = null;
            Player4_Items_Item7.Image = null;
            Player5_Items_Item7.Image = null;

            // Réinitialisation des summoners
            Player1_Spells_Summoner1.Image = null;
            Player1_Spells_Summoner2.Image = null;
            Player2_Spells_Summoner1.Image = null;
            Player2_Spells_Summoner2.Image = null;
            Player3_Spells_Summoner1.Image = null;
            Player3_Spells_Summoner2.Image = null;
            Player4_Spells_Summoner1.Image = null;
            Player4_Spells_Summoner2.Image = null;
            Player5_Spells_Summoner1.Image = null;
            Player5_Spells_Summoner2.Image = null;

            // Réinitialisation des spells principaux
            Player1_Spells_MainSpellImg.Image = null;
            Player1_Spells_MainSpellKey.Text = "";
            Player2_Spells_MainSpellImg.Image = null;
            Player2_Spells_MainSpellKey.Text = "";
            Player3_Spells_MainSpellImg.Image = null;
            Player3_Spells_MainSpellKey.Text = "";
            Player4_Spells_MainSpellImg.Image = null;
            Player4_Spells_MainSpellKey.Text = "";
            Player5_Spells_MainSpellImg.Image = null;
            Player5_Spells_MainSpellKey.Text = "";
        }

        private void StuffGenerator_AutoRefresh_Tick(object sender, EventArgs e)
        {
            Refresh();
        }

        private void StuffGenerator_ReplaceGeneratedItem(string lane, string itemTag1, string itemTag2, string itemTag3, string itemTag4, string itemTag5, string itemTag6, ref PictureBox itemPictureBox)
        {
            List<string> currentPlayerItems = new List<string>();

            if (itemTag1 != "" && itemTag1 != "0")
            {
                currentPlayerItems.Add(itemTag1);
            }

            if (itemTag2 != "" && itemTag2 != "0")
            {
                currentPlayerItems.Add(itemTag2);
            }

            if (itemTag3 != "" && itemTag3 != "0")
            {
                currentPlayerItems.Add(itemTag3);
            }

            if (itemTag4 != "" && itemTag4 != "0")
            {
                currentPlayerItems.Add(itemTag4);
            }

            if (itemTag5 != "" && itemTag5 != "0")
            {
                currentPlayerItems.Add(itemTag5);
            }

            if (itemTag6 != "" && itemTag6 != "0")
            {
                currentPlayerItems.Add(itemTag6);
            }

            string newItem = Items.ReplaceItemForPlayer(lane, currentPlayerItems);
            itemPictureBox.Load(ServerUrl.ItemImgUrl(newItem.Replace("support_", "").Replace("jungle_", "").Replace("mythic_", "").Replace("boots_", "").Replace("legendary_", "")));
            itemPictureBox.Tag = newItem;
        }

        private void Player1_Items_Item1_Click(object sender, EventArgs e)
        {
            if (Player1_Items_Item1.Tag.ToString().StartsWith("legendary_"))
            {
                StuffGenerator_ReplaceGeneratedItem(
                    Player1_Settings_Lane.Tag.ToString(),
                    Player1_Items_Item2.Tag.ToString(),
                    Player1_Items_Item3.Tag.ToString(),
                    Player1_Items_Item4.Tag.ToString(),
                    Player1_Items_Item5.Tag.ToString(),
                    Player1_Items_Item6.Tag.ToString(),
                    Player1_Items_Item7.Tag.ToString(),
                    ref Player1_Items_Item1
                );
            }
            else if (Player1_Items_Item1.Tag.ToString() != "0")
            {
                MessageBox.Show("Cet item n'est pas un item légendaire, et ne peut pas être remplacé.", Text, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void Player1_Items_Item2_Click(object sender, EventArgs e)
        {
            if (Player1_Items_Item2.Tag.ToString().StartsWith("legendary_"))
            {
                StuffGenerator_ReplaceGeneratedItem(
                    Player1_Settings_Lane.Tag.ToString(),
                    Player1_Items_Item1.Tag.ToString(),
                    Player1_Items_Item3.Tag.ToString(),
                    Player1_Items_Item4.Tag.ToString(),
                    Player1_Items_Item5.Tag.ToString(),
                    Player1_Items_Item6.Tag.ToString(),
                    Player1_Items_Item7.Tag.ToString(),
                    ref Player1_Items_Item2
                );
            }
            else if (Player1_Items_Item1.Tag.ToString() != "0")
            {
                MessageBox.Show("Cet item n'est pas un item légendaire, et ne peut pas être remplacé.", Text, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void Player1_Items_Item3_Click(object sender, EventArgs e)
        {
            if (Player1_Items_Item3.Tag.ToString().StartsWith("legendary_"))
            {
                StuffGenerator_ReplaceGeneratedItem(
                    Player1_Settings_Lane.Tag.ToString(),
                    Player1_Items_Item1.Tag.ToString(),
                    Player1_Items_Item2.Tag.ToString(),
                    Player1_Items_Item4.Tag.ToString(),
                    Player1_Items_Item5.Tag.ToString(),
                    Player1_Items_Item6.Tag.ToString(),
                    Player1_Items_Item7.Tag.ToString(),
                    ref Player1_Items_Item3
                );
            }
            else if (Player1_Items_Item1.Tag.ToString() != "0")
            {
                MessageBox.Show("Cet item n'est pas un item légendaire, et ne peut pas être remplacé.", Text, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void Player1_Items_Item4_Click(object sender, EventArgs e)
        {
            if (Player1_Items_Item4.Tag.ToString().StartsWith("legendary_"))
            {
                StuffGenerator_ReplaceGeneratedItem(
                    Player1_Settings_Lane.Tag.ToString(),
                    Player1_Items_Item1.Tag.ToString(),
                    Player1_Items_Item2.Tag.ToString(),
                    Player1_Items_Item3.Tag.ToString(),
                    Player1_Items_Item5.Tag.ToString(),
                    Player1_Items_Item6.Tag.ToString(),
                    Player1_Items_Item7.Tag.ToString(),
                    ref Player1_Items_Item4
                );
            }
            else if (Player1_Items_Item1.Tag.ToString() != "0")
            {
                MessageBox.Show("Cet item n'est pas un item légendaire, et ne peut pas être remplacé.", Text, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void Player1_Items_Item5_Click(object sender, EventArgs e)
        {
            if (Player1_Items_Item5.Tag.ToString().StartsWith("legendary_"))
            {
                StuffGenerator_ReplaceGeneratedItem(
                    Player1_Settings_Lane.Tag.ToString(),
                    Player1_Items_Item1.Tag.ToString(),
                    Player1_Items_Item2.Tag.ToString(),
                    Player1_Items_Item3.Tag.ToString(),
                    Player1_Items_Item4.Tag.ToString(),
                    Player1_Items_Item6.Tag.ToString(),
                    Player1_Items_Item7.Tag.ToString(),
                    ref Player1_Items_Item5
                );
            }
            else if (Player1_Items_Item1.Tag.ToString() != "0")
            {
                MessageBox.Show("Cet item n'est pas un item légendaire, et ne peut pas être remplacé.", Text, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void Player1_Items_Item6_Click(object sender, EventArgs e)
        {
            if (Player1_Items_Item6.Tag.ToString().StartsWith("legendary_"))
            {
                StuffGenerator_ReplaceGeneratedItem(
                    Player1_Settings_Lane.Tag.ToString(),
                    Player1_Items_Item1.Tag.ToString(),
                    Player1_Items_Item2.Tag.ToString(),
                    Player1_Items_Item3.Tag.ToString(),
                    Player1_Items_Item4.Tag.ToString(),
                    Player1_Items_Item5.Tag.ToString(),
                    Player1_Items_Item7.Tag.ToString(),
                    ref Player1_Items_Item6
                );
            }
            else if (Player1_Items_Item1.Tag.ToString() != "0")
            {
                MessageBox.Show("Cet item n'est pas un item légendaire, et ne peut pas être remplacé.", Text, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void Player1_Items_Item7_Click(object sender, EventArgs e)
        {
            if (Player1_Items_Item7.Tag.ToString().StartsWith("legendary_"))
            {
                StuffGenerator_ReplaceGeneratedItem(
                    Player1_Settings_Lane.Tag.ToString(),
                    Player1_Items_Item1.Tag.ToString(),
                    Player1_Items_Item2.Tag.ToString(),
                    Player1_Items_Item3.Tag.ToString(),
                    Player1_Items_Item4.Tag.ToString(),
                    Player1_Items_Item5.Tag.ToString(),
                    Player1_Items_Item6.Tag.ToString(),
                    ref Player1_Items_Item7
                );
            }
            else if (Player1_Items_Item1.Tag.ToString() != "0")
            {
                MessageBox.Show("Cet item n'est pas un item légendaire, et ne peut pas être remplacé.", Text, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
    }
}
