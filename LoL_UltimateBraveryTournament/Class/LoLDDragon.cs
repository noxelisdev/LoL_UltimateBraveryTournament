using Newtonsoft.Json.Linq;

namespace LoL_UltimateBraveryTournament.Class
{
    public static class LoLDDragon
    {
        private static JToken GetManifestData()
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(ServerUrl.ManifestJsonUrl()).Result;

                if (response.IsSuccessStatusCode)
                {
                    string jsonString = response.Content.ReadAsStringAsync().Result;

                    if (jsonString != "")
                    {
                        return JObject.Parse(jsonString);
                    }
                }
            }

            return JObject.Parse("{}");
        }

        public static string GetLoLLatestVersion()
        {
            JToken manifestData = GetManifestData();

            if (((JObject)manifestData).ContainsKey("v"))
            {
                return ((JObject)manifestData).GetValue("v").ToString();
            }

            return "Inconnue";
        }
    }
}
