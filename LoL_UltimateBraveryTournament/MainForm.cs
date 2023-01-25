namespace LoL_UltimateBraveryTournament
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
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

        private void MainMenu_AppExitButton_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}