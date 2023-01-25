namespace LoL_UltimateBraveryTournament.Tools
{
    partial class ChampionsListGenerator
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ChampionsListGenerator));
            this.ChampionsListGenerator_Settings_Group = new System.Windows.Forms.GroupBox();
            this.ChampionsListGenerator_Settings_Informations = new System.Windows.Forms.Label();
            this.ChampionsListGenerator_Settings_StartGenerationButton = new System.Windows.Forms.Button();
            this.ChampionsListGenerator_Settings_ChampsNumberLabel = new System.Windows.Forms.Label();
            this.ChampionsListGenerator_Settings_ChampsNumberPicker = new System.Windows.Forms.NumericUpDown();
            this.ChampionsListGenerator_ChampsList_Group = new System.Windows.Forms.GroupBox();
            this.ChampionsListGenerator_ChampsList_ListContainer = new System.Windows.Forms.FlowLayoutPanel();
            this.ChampionsListGenerator_Settings_Group.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.ChampionsListGenerator_Settings_ChampsNumberPicker)).BeginInit();
            this.ChampionsListGenerator_ChampsList_Group.SuspendLayout();
            this.SuspendLayout();
            // 
            // ChampionsListGenerator_Settings_Group
            // 
            this.ChampionsListGenerator_Settings_Group.Controls.Add(this.ChampionsListGenerator_Settings_Informations);
            this.ChampionsListGenerator_Settings_Group.Controls.Add(this.ChampionsListGenerator_Settings_StartGenerationButton);
            this.ChampionsListGenerator_Settings_Group.Controls.Add(this.ChampionsListGenerator_Settings_ChampsNumberLabel);
            this.ChampionsListGenerator_Settings_Group.Controls.Add(this.ChampionsListGenerator_Settings_ChampsNumberPicker);
            this.ChampionsListGenerator_Settings_Group.Location = new System.Drawing.Point(12, 12);
            this.ChampionsListGenerator_Settings_Group.Name = "ChampionsListGenerator_Settings_Group";
            this.ChampionsListGenerator_Settings_Group.Size = new System.Drawing.Size(860, 99);
            this.ChampionsListGenerator_Settings_Group.TabIndex = 0;
            this.ChampionsListGenerator_Settings_Group.TabStop = false;
            this.ChampionsListGenerator_Settings_Group.Text = "Paramètres de la génération";
            // 
            // ChampionsListGenerator_Settings_Informations
            // 
            this.ChampionsListGenerator_Settings_Informations.Font = new System.Drawing.Font("Segoe UI", 9.75F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point);
            this.ChampionsListGenerator_Settings_Informations.Location = new System.Drawing.Point(6, 19);
            this.ChampionsListGenerator_Settings_Informations.Name = "ChampionsListGenerator_Settings_Informations";
            this.ChampionsListGenerator_Settings_Informations.Size = new System.Drawing.Size(848, 37);
            this.ChampionsListGenerator_Settings_Informations.TabIndex = 3;
            this.ChampionsListGenerator_Settings_Informations.Text = resources.GetString("ChampionsListGenerator_Settings_Informations.Text");
            this.ChampionsListGenerator_Settings_Informations.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // ChampionsListGenerator_Settings_StartGenerationButton
            // 
            this.ChampionsListGenerator_Settings_StartGenerationButton.Location = new System.Drawing.Point(557, 65);
            this.ChampionsListGenerator_Settings_StartGenerationButton.Name = "ChampionsListGenerator_Settings_StartGenerationButton";
            this.ChampionsListGenerator_Settings_StartGenerationButton.Size = new System.Drawing.Size(297, 23);
            this.ChampionsListGenerator_Settings_StartGenerationButton.TabIndex = 2;
            this.ChampionsListGenerator_Settings_StartGenerationButton.Text = "Démarrer la génération";
            this.ChampionsListGenerator_Settings_StartGenerationButton.UseVisualStyleBackColor = true;
            this.ChampionsListGenerator_Settings_StartGenerationButton.Click += new System.EventHandler(this.ChampionsListGenerator_Settings_StartGenerationButton_Click);
            // 
            // ChampionsListGenerator_Settings_ChampsNumberLabel
            // 
            this.ChampionsListGenerator_Settings_ChampsNumberLabel.AutoSize = true;
            this.ChampionsListGenerator_Settings_ChampsNumberLabel.Location = new System.Drawing.Point(6, 67);
            this.ChampionsListGenerator_Settings_ChampsNumberLabel.Name = "ChampionsListGenerator_Settings_ChampsNumberLabel";
            this.ChampionsListGenerator_Settings_ChampsNumberLabel.Size = new System.Drawing.Size(187, 15);
            this.ChampionsListGenerator_Settings_ChampsNumberLabel.TabIndex = 1;
            this.ChampionsListGenerator_Settings_ChampsNumberLabel.Text = "Nombre de champions à générer :";
            // 
            // ChampionsListGenerator_Settings_ChampsNumberPicker
            // 
            this.ChampionsListGenerator_Settings_ChampsNumberPicker.Location = new System.Drawing.Point(199, 65);
            this.ChampionsListGenerator_Settings_ChampsNumberPicker.Name = "ChampionsListGenerator_Settings_ChampsNumberPicker";
            this.ChampionsListGenerator_Settings_ChampsNumberPicker.Size = new System.Drawing.Size(69, 23);
            this.ChampionsListGenerator_Settings_ChampsNumberPicker.TabIndex = 0;
            this.ChampionsListGenerator_Settings_ChampsNumberPicker.Value = new decimal(new int[] {
            20,
            0,
            0,
            0});
            // 
            // ChampionsListGenerator_ChampsList_Group
            // 
            this.ChampionsListGenerator_ChampsList_Group.Controls.Add(this.ChampionsListGenerator_ChampsList_ListContainer);
            this.ChampionsListGenerator_ChampsList_Group.Location = new System.Drawing.Point(12, 136);
            this.ChampionsListGenerator_ChampsList_Group.Name = "ChampionsListGenerator_ChampsList_Group";
            this.ChampionsListGenerator_ChampsList_Group.Size = new System.Drawing.Size(860, 363);
            this.ChampionsListGenerator_ChampsList_Group.TabIndex = 1;
            this.ChampionsListGenerator_ChampsList_Group.TabStop = false;
            this.ChampionsListGenerator_ChampsList_Group.Text = "Liste de champions générée";
            // 
            // ChampionsListGenerator_ChampsList_ListContainer
            // 
            this.ChampionsListGenerator_ChampsList_ListContainer.AutoScroll = true;
            this.ChampionsListGenerator_ChampsList_ListContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ChampionsListGenerator_ChampsList_ListContainer.Location = new System.Drawing.Point(3, 19);
            this.ChampionsListGenerator_ChampsList_ListContainer.Margin = new System.Windows.Forms.Padding(2);
            this.ChampionsListGenerator_ChampsList_ListContainer.Name = "ChampionsListGenerator_ChampsList_ListContainer";
            this.ChampionsListGenerator_ChampsList_ListContainer.Size = new System.Drawing.Size(854, 341);
            this.ChampionsListGenerator_ChampsList_ListContainer.TabIndex = 0;
            // 
            // ChampionsListGenerator
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(884, 511);
            this.Controls.Add(this.ChampionsListGenerator_ChampsList_Group);
            this.Controls.Add(this.ChampionsListGenerator_Settings_Group);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.MaximumSize = new System.Drawing.Size(900, 550);
            this.MinimumSize = new System.Drawing.Size(900, 550);
            this.Name = "ChampionsListGenerator";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Générateur d\'une liste aléatoire de champions";
            this.ChampionsListGenerator_Settings_Group.ResumeLayout(false);
            this.ChampionsListGenerator_Settings_Group.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.ChampionsListGenerator_Settings_ChampsNumberPicker)).EndInit();
            this.ChampionsListGenerator_ChampsList_Group.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private GroupBox ChampionsListGenerator_Settings_Group;
        private Label ChampionsListGenerator_Settings_ChampsNumberLabel;
        private NumericUpDown ChampionsListGenerator_Settings_ChampsNumberPicker;
        private GroupBox ChampionsListGenerator_ChampsList_Group;
        private FlowLayoutPanel ChampionsListGenerator_ChampsList_ListContainer;
        private Button ChampionsListGenerator_Settings_StartGenerationButton;
        private Label ChampionsListGenerator_Settings_Informations;
    }
}