using LoL_UltimateBraveryTournament.Class;

namespace LoL_UltimateBraveryTournament
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            MainForm_Versions.Text = "Version de LoL : " + LoLDDragon.GetLoLLatestVersion() + " - Version de l'application : " + Application.ProductVersion;
        }

        private void App_TeamStuffGenerator_Button_Click(object sender, EventArgs e)
        {
            TeamStuffGenerator teamStuffGenerator = new TeamStuffGenerator();
            teamStuffGenerator.Show();
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (MessageBox.Show("Quitter le gestionnaire de tournoi Ultimate Bravery ?" + Environment.NewLine + "Cela quittera également tous les outils actuellement ouverts.", Text, MessageBoxButtons.YesNo) == DialogResult.No)
            {
                e.Cancel = true;
            }
        }

        private void MainForm_AppExitButton_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}