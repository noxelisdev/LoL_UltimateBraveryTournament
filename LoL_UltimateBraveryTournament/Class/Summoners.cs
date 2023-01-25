using Newtonsoft.Json.Linq;

namespace LoL_UltimateBraveryTournament.Class
{
    public static class Summoners
    {
        private static JToken GetSummonersData()
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(ServerUrl.SummonersJsonUrl()).Result;

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

        // Liste des summoners du jeu, sans certains summoners qui ont été retirés, afin de ne conserver que ceux
        // utilisables dans la Faille de l'Invocateur.
        private static List<JToken> GetUsableSummonersData()
        {
            JToken summonersData = GetSummonersData();
            List<JToken> usableSummoners = new List<JToken>();

            foreach (JToken summoner in summonersData)
            {
                JToken summonerContent = summoner.First;
                string[] summonerModes = summonerContent["modes"].ToObject<string[]>();

                if (summonerModes.Contains("CLASSIC"))
                {
                    usableSummoners.Add(summonerContent);
                }
            }

            return usableSummoners;
        }

        private static JToken GetSmiteData()
        {
            List<JToken> summonersData = GetUsableSummonersData();

            foreach (JToken summoner in summonersData)
            {
                if (summoner["id"].ToString() == "SummonerSmite")
                {
                    return summoner;
                }
            }

            return JToken.Parse("{}");
        }

        public static List<string> GetSummonersForPlayer(string lane)
        {
            List<string> summonersList = new List<string>();
            List<JToken> summonersData = GetUsableSummonersData();
            Random summonerRandomizer = new Random();

            if (lane == "jungle")
            {
                JToken smiteData = GetSmiteData();
                summonersList.Add(smiteData["key"].ToString());
            }
            else
            {
                while (summonersList.Count < 1)
                {
                    int firstSelectedSummonerIndex = summonerRandomizer.Next(summonersData.Count - 1);

                    if (summonersData[firstSelectedSummonerIndex]["id"].ToString() != "SummonerSmite")
                    {
                        summonersList.Add(summonersData[firstSelectedSummonerIndex]["key"].ToString());
                    }
                }
            }

            while (summonersList.Count < 2)
            {
                int secondSelectedSummonerIndex = summonerRandomizer.Next(summonersData.Count - 1);

                if (summonersData[secondSelectedSummonerIndex]["id"].ToString() != "SummonerSmite" && summonersData[secondSelectedSummonerIndex]["key"].ToString() != summonersList[0])
                {
                    summonersList.Add(summonersData[secondSelectedSummonerIndex]["key"].ToString());
                }
            }

            return summonersList;
        }
    }
}
