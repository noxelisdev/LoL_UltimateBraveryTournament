namespace LoL_UltimateBraveryTournament
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.MainForm_ToolsContainer = new System.Windows.Forms.TableLayoutPanel();
            this.App_TeamStuffGenerator_Button = new System.Windows.Forms.Button();
            this.MainForm_AppExitButton = new System.Windows.Forms.Button();
            this.MainForm_Versions = new System.Windows.Forms.Label();
            this.MainForm_ToolsContainer.SuspendLayout();
            this.SuspendLayout();
            // 
            // MainForm_ToolsContainer
            // 
            this.MainForm_ToolsContainer.ColumnCount = 3;
            this.MainForm_ToolsContainer.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.MainForm_ToolsContainer.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.MainForm_ToolsContainer.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.MainForm_ToolsContainer.Controls.Add(this.App_TeamStuffGenerator_Button, 1, 0);
            this.MainForm_ToolsContainer.Location = new System.Drawing.Point(12, 12);
            this.MainForm_ToolsContainer.Name = "MainForm_ToolsContainer";
            this.MainForm_ToolsContainer.RowCount = 3;
            this.MainForm_ToolsContainer.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.MainForm_ToolsContainer.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.MainForm_ToolsContainer.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.MainForm_ToolsContainer.Size = new System.Drawing.Size(776, 397);
            this.MainForm_ToolsContainer.TabIndex = 1;
            // 
            // App_TeamStuffGenerator_Button
            // 
            this.App_TeamStuffGenerator_Button.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.App_TeamStuffGenerator_Button.Image = global::LoL_UltimateBraveryTournament.Properties.Resources.MainMenu_ButtonImage_StuffGenerator;
            this.App_TeamStuffGenerator_Button.Location = new System.Drawing.Point(261, 3);
            this.App_TeamStuffGenerator_Button.Name = "App_TeamStuffGenerator_Button";
            this.App_TeamStuffGenerator_Button.Size = new System.Drawing.Size(252, 126);
            this.App_TeamStuffGenerator_Button.TabIndex = 0;
            this.App_TeamStuffGenerator_Button.Text = "Générateur de Stuff";
            this.App_TeamStuffGenerator_Button.TextAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.App_TeamStuffGenerator_Button.UseVisualStyleBackColor = true;
            this.App_TeamStuffGenerator_Button.Click += new System.EventHandler(this.App_TeamStuffGenerator_Button_Click);
            // 
            // MainForm_AppExitButton
            // 
            this.MainForm_AppExitButton.Location = new System.Drawing.Point(713, 415);
            this.MainForm_AppExitButton.Name = "MainForm_AppExitButton";
            this.MainForm_AppExitButton.Size = new System.Drawing.Size(75, 23);
            this.MainForm_AppExitButton.TabIndex = 2;
            this.MainForm_AppExitButton.Text = "Quitter";
            this.MainForm_AppExitButton.UseVisualStyleBackColor = true;
            this.MainForm_AppExitButton.Click += new System.EventHandler(this.MainForm_AppExitButton_Click);
            // 
            // MainForm_Versions
            // 
            this.MainForm_Versions.AutoSize = true;
            this.MainForm_Versions.ForeColor = System.Drawing.SystemColors.ControlDarkDark;
            this.MainForm_Versions.Location = new System.Drawing.Point(12, 419);
            this.MainForm_Versions.Name = "MainForm_Versions";
            this.MainForm_Versions.Size = new System.Drawing.Size(382, 15);
            this.MainForm_Versions.TabIndex = 3;
            this.MainForm_Versions.Text = "Version de LoL : %lolVersion% - Version du programme : %softVersion%";
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.MainForm_Versions);
            this.Controls.Add(this.MainForm_AppExitButton);
            this.Controls.Add(this.MainForm_ToolsContainer);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Gestion de Tournoi LoL Ultimate Bravery";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainForm_FormClosing);
            this.MainForm_ToolsContainer.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private TableLayoutPanel MainForm_ToolsContainer;
        private Button App_TeamStuffGenerator_Button;
        private Button MainForm_AppExitButton;
        private Label MainForm_Versions;
    }
}