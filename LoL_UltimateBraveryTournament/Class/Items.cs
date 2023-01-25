using Newtonsoft.Json.Linq;

namespace LoL_UltimateBraveryTournament.Class
{
    public static class Items
    {
        private static JToken GetItemsData()
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(ServerUrl.ItemsJsonUrl()).Result;

                if (response.IsSuccessStatusCode)
                {
                    string jsonString = response.Content.ReadAsStringAsync().Result;

                    if (jsonString != "")
                    {
                        JToken json = JToken.Parse(jsonString);
                        var data = json["data"];
                        if (data != null) { return data; } // Nécessaire pour éviter un avertissement sur une potentielle valeur null (impossible ici).
                    }
                }
            }

            return JToken.Parse("{}");
        }

        // Liste des items du jeu, sans certains items qui ont été retirés :
        //  - Items améliorés de Ornn
        //  - Items inutilisables sur la Faille (comme le Poro-Snax de l'ARAM)
        //  - Items non achetables (comme les items de support améliorés, obtenus automatiquement après la quête)
        //  - Items consommables (achetables à volonté, même en Ultimate Bravery)
        //  - Items spéciaux (comme l'Oeil du Héraut)
        //  - Items spécifiques à des champions (comme Fiddlesticks ou Kalista)
        private static List<JToken> GetUsableItemsData()
        {
            JToken itemsData = GetItemsData();
            List<JToken> usableItems = new List<JToken>();

            foreach (JToken item in itemsData)
            {
                JToken itemContent = item.First;
                string[] itemTags = itemContent["tags"].ToObject<string[]>();

                if (itemContent["maps"]["11"].ToString() == "True"
                    && itemContent["gold"]["purchasable"].ToString() == "True"
                    && (itemContent.Contains("inStore") == false || (itemContent.Contains("inStore") && itemContent["inStore"].ToString() != "False"))
                    && (itemContent.Contains("requiredAlly") == false || (itemContent.Contains("requiredAlly") && itemContent["requiredAlly"].ToString() != "Ornn"))
                    && itemTags.Contains("Consumable") == false
                    && itemTags.Contains("Trinket") == false
                    && ((JObject)itemContent).ContainsKey("requiredChampion") == false)
                {
                    usableItems.Add(itemContent);
                }
            }

            return usableItems;
        }

        public static List<JToken> GetJungleItemsData()
        {
            List<JToken> itemsData = GetUsableItemsData();
            List<JToken> jungleItems = new List<JToken>();

            foreach (JToken item in itemsData)
            {
                string[] itemTags = item["tags"].ToObject<string[]>();

                if (itemTags.Contains("Jungle") && item["name"].ToString().StartsWith("Bébé"))
                {
                    jungleItems.Add(item);
                }
            }

            return jungleItems;
        }

        public static List<JToken> GetBootsItemsData()
        {
            List<JToken> itemsData = GetUsableItemsData();
            List<JToken> bootsItems = new List<JToken>();

            foreach (JToken item in itemsData)
            {
                string[] itemTags = item["tags"].ToObject<string[]>();

                if (itemTags.Contains("Boots") && ((JObject)item).ContainsKey("depth"))
                {
                    bootsItems.Add(item);
                }
            }

            return bootsItems;
        }

        public static List<JToken> GetSupportItemsData()
        {
            List<JToken> itemsData = GetUsableItemsData();
            List<JToken> supportItems = new List<JToken>();

            foreach (JToken item in itemsData)
            {
                string[] itemTags = item["tags"].ToObject<string[]>();

                if (itemTags.Contains("GoldPer") == true && item.Contains("specialRecipe") == false)
                {
                    supportItems.Add(item);
                }
            }

            return supportItems;
        }

        public static List<JToken> GetMythicItemsData()
        {
            List<JToken> itemsData = GetUsableItemsData();
            List<JToken> mythicItems = new List<JToken>();

            foreach (JToken item in itemsData)
            {
                string[] itemTags = item["tags"].ToObject<string[]>();

                if (itemTags.Contains("Boots") == false
                    && itemTags.Contains("Jungle") == false
                    && itemTags.Contains("GoldPer") == false
                    && (
                        item["description"].ToString().IndexOf("Propriété passive mythique", 0) > 0
                        && ((JObject)item).ContainsKey("requiredAlly") == false
                       )
                    )
                {
                    mythicItems.Add(item);
                }
            }

            return mythicItems;
        }

        public static List<JToken> GetLegendaryItemsData()
        {
            List<JToken> itemsData = GetUsableItemsData();
            List<JToken> legendaryItems = new List<JToken>();

            foreach (JToken item in itemsData)
            {
                string[] itemTags = item["tags"].ToObject<string[]>();

                if (itemTags.Contains("Boots") == false
                    && itemTags.Contains("Jungle") == false
                    && itemTags.Contains("GoldPer") == false
                    && itemTags.Contains("Lane") == false
                    && (
                        item["description"].ToString().IndexOf("Propriété passive mythique", 0) == -1
                        && ((JObject)item).ContainsKey("specialRecipe") == false
                        && ((JObject)item).ContainsKey("into") == false
                        && ((JObject)item).ContainsKey("depth") == true
                       )
                    )
                {
                    legendaryItems.Add(item);
                }
            }

            return legendaryItems;
        }

        public static List<string> GetItemsForPlayer(string lane)
        {
            List<string> itemsList = new List<string>();
            List<int> selectedLegendaryItems = new List<int>();
            Random playerItemRandomizer = new Random();
            List<JToken> mythicItemsList = GetMythicItemsData();
            List<JToken> legendaryItemsList = GetLegendaryItemsData();
            List<JToken> bootsItemsList = GetBootsItemsData();

            // Item support
            if (lane == "support")
            {
                List<JToken> supportItemsList = GetSupportItemsData();
                itemsList.Add("support_" + supportItemsList[new Random().Next(supportItemsList.Count)]["image"]["full"].ToString().Replace(".png", ""));
            }

            // Item jungle
            if (lane == "jungle")
            {
                List<JToken> jungleItemsList = Items.GetJungleItemsData();
                itemsList.Add("jungle_" + jungleItemsList[new Random().Next(jungleItemsList.Count)]["image"]["full"].ToString().Replace(".png", ""));
            }

            // Bottes
            itemsList.Add("boots_" + bootsItemsList[new Random().Next(bootsItemsList.Count)]["image"]["full"].ToString().Replace(".png", ""));

            // Item mythique
            itemsList.Add("mythic_" + mythicItemsList[new Random().Next(mythicItemsList.Count)]["image"]["full"].ToString().Replace(".png", ""));

            // Items légendaires
            while (selectedLegendaryItems.Count < 4)
            {
                int selectedElementIndex = playerItemRandomizer.Next(legendaryItemsList.Count);

                if (!selectedLegendaryItems.Contains(selectedElementIndex))
                {
                    itemsList.Add("legendary_" + legendaryItemsList[selectedElementIndex]["image"]["full"].ToString().Replace(".png", ""));
                    selectedLegendaryItems.Add(selectedElementIndex);
                }
            }

            return itemsList;
        }

        public static string ReplaceItemForPlayer(string lane, List<string> currentItems)
        {
            Random playerItemRandomizer = new Random();
            List<JToken> legendaryItemsList = GetLegendaryItemsData();
            string selectedReplacementItem = "";

            while (selectedReplacementItem == "" || currentItems.Contains(selectedReplacementItem))
            {
                int selectedElementIndex = playerItemRandomizer.Next(legendaryItemsList.Count);
                selectedReplacementItem = legendaryItemsList[selectedElementIndex]["image"]["full"].ToString().Replace(".png", "");
            }

            return "legendary_" + selectedReplacementItem;
        }
    }
}
