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
            Application.Exit();
        }
    }
}