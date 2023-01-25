using Newtonsoft.Json.Linq;

namespace LoL_UltimateBraveryTournament.Class
{
    public static class Champions
    {
        private static JToken GetChampionData()
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(ServerUrl.ChampionsJsonUrl()).Result;

                if (response.IsSuccessStatusCode)
                {
                    string jsonString = response.Content.ReadAsStringAsync().Result;

                    if (jsonString != "")
                    {
                        JToken json = JObject.Parse(jsonString);
                        var data = json["data"];
                        if (data != null) { return data; } // Nécessaire pour éviter un avertissement sur une potentielle valeur null (impossible ici).
                    }
                }
            }

            return JObject.Parse("{}");
        }

        private static JToken GetFullChampionData()
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(ServerUrl.ChampionsFullJsonUrl()).Result;

                if (response.IsSuccessStatusCode)
                {
                    string jsonString = response.Content.ReadAsStringAsync().Result;

                    if (jsonString != "")
                    {
                        JToken json = JObject.Parse(jsonString);
                        var data = json["data"];
                        if (data != null) { return data; } // Nécessaire pour éviter un avertissement sur une potentielle valeur null (impossible ici).
                    }
                }
            }

            return JObject.Parse("{}");
        }

        public static List<string> GetAllChampionsName()
        {
            JToken champions = GetChampionData();
            List<string> champsList = new List<string>();

            foreach (JToken champion in champions)
            {
                champsList.Add(champion.First["name"].ToString());
            }

            champsList.Sort();
            return champsList;
        }

        public static string GetChampionId(string name)
        {
            JToken champions = GetChampionData();

            foreach (JToken champion in champions)
            {
                if (champion.First["name"].ToString() == name)
                {
                    return champion.First["id"].ToString();
                }
            }

            return "";
        }

        public static List<string> GetChampionSpellForPlayer(string name)
        {
            List<string> spellList = new List<string>();
            JToken champions = GetFullChampionData();

            foreach (JToken champion in champions)
            {
                if (champion.First["name"].ToString() == name)
                {
                    JToken championsSpells = champion.First["spells"];
                    int selectedSpellIndex = new Random().Next(0, 3);
                    spellList.Add(championsSpells[selectedSpellIndex]["image"]["full"].ToString().Replace(".png", ""));

                    switch (selectedSpellIndex)
                    {
                        case 0:
                            spellList.Add("A / Q");
                            break;
                        case 1:
                            spellList.Add("Z / W");
                            break;
                        case 2:
                            spellList.Add("E");
                            break;
                        case 3:
                            spellList.Add("R");
                            break;
                    }
                }
            }

            return spellList;
        }
    }
}
