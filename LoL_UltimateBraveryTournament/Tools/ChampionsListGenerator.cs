using LoL_UltimateBraveryTournament.Class;

namespace LoL_UltimateBraveryTournament.Tools
{
    public partial class ChampionsListGenerator : Form
    {
        List<string> allChampionsList = Champions.GetAllChampionsName();

        public ChampionsListGenerator()
        {
            InitializeComponent();

            // Limitation du nombre de champions générables au nombre de champions existant
            ChampionsListGenerator_Settings_ChampsNumberPicker.Maximum = allChampionsList.Count;
            ChampionsListGenerator_Settings_Informations.Text = ChampionsListGenerator_Settings_Informations.Text.Replace("%champsCount%", allChampionsList.Count.ToString());
        }

        private void ChampionsListGenerator_Settings_StartGenerationButton_Click(object sender, EventArgs e)
        {
            // Désactivation de l'interface
            ChampionsListGenerator_Settings_ChampsNumberPicker.Enabled = false;
            ChampionsListGenerator_Settings_StartGenerationButton.Enabled = false;
            ChampionsListGenerator_Settings_StartGenerationButton.Text = "Génération de la liste en cours...";

            // Réinitialisation de la liste
            ChampionsListGenerator_ChampsList_ListContainer.Controls.Clear();

            // Génération d'une nouvelle liste
            Random championsRandomizer = new Random();
            List<int> selectedChampions = new List<int>();
            int currentSelectedChampion = championsRandomizer.Next(allChampionsList.Count);

            while (selectedChampions.Count < Convert.ToInt32(ChampionsListGenerator_Settings_ChampsNumberPicker.Value))
            {
                if (selectedChampions.Contains(currentSelectedChampion) == false)
                {
                    PictureBox championPict = new PictureBox();
                    championPict.Size = new Size(80, 80);
                    championPict.SizeMode = PictureBoxSizeMode.Zoom;
                    championPict.Load(ServerUrl.ChampionImgUrl(Champions.GetChampionId(allChampionsList[currentSelectedChampion])));
                    ChampionsListGenerator_ChampsList_ListContainer.Controls.Add(championPict);

                    selectedChampions.Add(currentSelectedChampion);
                }

                currentSelectedChampion = championsRandomizer.Next(allChampionsList.Count);
            }

            // Réactivation de l'interface
            ChampionsListGenerator_Settings_ChampsNumberPicker.Enabled = true;
            ChampionsListGenerator_Settings_StartGenerationButton.Enabled = true;
            ChampionsListGenerator_Settings_StartGenerationButton.Text = "Démarrer la génération";
        }
    }
}
