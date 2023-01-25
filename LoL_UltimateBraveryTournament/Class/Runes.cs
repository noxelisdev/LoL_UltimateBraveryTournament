using Newtonsoft.Json.Linq;

namespace LoL_UltimateBraveryTournament.Class
{
    public static class Runes
    {
        private static JArray GetRunesData()
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(ServerUrl.RunesJsonUrl()).Result;

                if (response.IsSuccessStatusCode)
                {
                    string jsonString = response.Content.ReadAsStringAsync().Result;

                    if (jsonString != "")
                    {
                        JArray json = JArray.Parse(jsonString);
                        return json;
                    }
                }
            }

            return JArray.Parse("[]");
        }

        public static List<string> GetAllRunesPaths()
        {
            JArray runes = GetRunesData();
            List<string> runesPathsList = new List<string>();

            foreach (JToken runePath in runes)
            {
                runesPathsList.Add(runePath["name"].ToString());
            }

            runesPathsList.Sort();
            return runesPathsList;
        }

        /*public static List<string> GetRuneKeys(string runePathName)
        {
            JArray runes = GetRunesData();
            List<string> runesKeysList = new List<string>();

            foreach (JToken runePath in runes)
            {
                if (runePath["name"].ToString() == runePathName)
                {
                    foreach (JToken runeKeyLine in runePath["slots"])
                    {
                        foreach (JToken runeKey in runeKeyLine["runes"])
                        {
                            runesKeysList.Add(runePath["name"].ToString());
                        }
                    }
                }
            }

            runesKeysList.Sort();
            return runesKeysList;
        }*/

        public static List<string> GetRuneKeysFromSlot(string runePathName, int slotNumber)
        {
            JArray runes = GetRunesData();
            List<string> runesKeysList = new List<string>();

            foreach (JToken runePath in runes)
            {
                if (runePath["name"].ToString() == runePathName)
                {
                    foreach (JToken runeKey in runePath["slots"][slotNumber - 1]["runes"])
                    {
                        runesKeysList.Add(runeKey["name"].ToString());
                    }
                }
            }

            runesKeysList.Sort();
            return runesKeysList;
        }

        public static string GetRuneKeyImagePath(string runePathName, string runeKeyName)
        {
            JArray runes = GetRunesData();

            foreach (JToken runePath in runes)
            {
                if (runePath["name"].ToString() == runePathName)
                {
                    foreach (JToken runeKeyLine in runePath["slots"])
                    {
                        foreach (JToken runeKey in runeKeyLine["runes"])
                        {
                            if (runeKey["name"].ToString() == runeKeyName)
                            {
                                return runeKey["icon"].ToString();
                            }
                        }
                    }
                }
            }

            return "";
        }

        public static List<string> GetMainRunesForPlayer()
        {
            List<string> runesImagePaths = new List<string>();

            List<string> runesPaths = GetAllRunesPaths();
            string playerRuneMainPath = runesPaths[new Random().Next(runesPaths.Count)];

            List<string> RunesSlot1 = GetRuneKeysFromSlot(playerRuneMainPath, 1);
            List<string> RunesSlot2 = GetRuneKeysFromSlot(playerRuneMainPath, 2);
            List<string> RunesSlot3 = GetRuneKeysFromSlot(playerRuneMainPath, 3);
            List<string> RunesSlot4 = GetRuneKeysFromSlot(playerRuneMainPath, 4);

            runesImagePaths.Add(GetRuneKeyImagePath(playerRuneMainPath, RunesSlot1[new Random().Next(RunesSlot1.Count)]));
            runesImagePaths.Add(GetRuneKeyImagePath(playerRuneMainPath, RunesSlot2[new Random().Next(RunesSlot2.Count)]));
            runesImagePaths.Add(GetRuneKeyImagePath(playerRuneMainPath, RunesSlot3[new Random().Next(RunesSlot3.Count)]));
            runesImagePaths.Add(GetRuneKeyImagePath(playerRuneMainPath, RunesSlot4[new Random().Next(RunesSlot4.Count)]));

            return runesImagePaths;
        }

        public static List<string> GetSecondaryRunesForPlayer()
        {
            List<string> runesImagePaths = new List<string>();

            List<string> runesPaths = GetAllRunesPaths();
            string playerRuneSecondaryPath = runesPaths[new Random().Next(runesPaths.Count)];
            int playerRuneFirstSelectedSlot = new Random().Next(2, 4);
            int playerRuneSecondSelectedSlot = new Random().Next(2, 4);

            while (playerRuneFirstSelectedSlot == playerRuneSecondSelectedSlot)
            {
                playerRuneSecondSelectedSlot = new Random().Next(2, 4);
            }

            List<string> RunesSlot1 = GetRuneKeysFromSlot(playerRuneSecondaryPath, playerRuneFirstSelectedSlot);
            List<string> RunesSlot2 = GetRuneKeysFromSlot(playerRuneSecondaryPath, playerRuneSecondSelectedSlot);

            runesImagePaths.Add(GetRuneKeyImagePath(playerRuneSecondaryPath, RunesSlot1[new Random().Next(RunesSlot1.Count)]));
            runesImagePaths.Add(GetRuneKeyImagePath(playerRuneSecondaryPath, RunesSlot2[new Random().Next(RunesSlot2.Count)]));

            return runesImagePaths;
        }

        public static List<string> GetStatsRunesForPlayer()
        {
            List<string> runesImagePaths = new List<string>();

            List<string> statsRunesSlot1 = new List<string>();
            statsRunesSlot1.Add("perk-images/StatMods/StatModsAdaptiveForceIcon.png");
            statsRunesSlot1.Add("perk-images/StatMods/StatModsAttackSpeedIcon.png");
            statsRunesSlot1.Add("perk-images/StatMods/StatModsCDRScalingIcon.png");

            List<string> statsRunesSlot2 = new List<string>();
            statsRunesSlot2.Add("perk-images/StatMods/StatModsAdaptiveForceIcon.png");
            statsRunesSlot2.Add("perk-images/StatMods/StatModsArmorIcon.png");
            statsRunesSlot2.Add("perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png");

            List<string> statsRunesSlot3 = new List<string>();
            statsRunesSlot3.Add("perk-images/StatMods/StatModsHealthScalingIcon.png");
            statsRunesSlot3.Add("perk-images/StatMods/StatModsArmorIcon.png");
            statsRunesSlot3.Add("perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png");

            runesImagePaths.Add(statsRunesSlot1[new Random().Next(0, 2)]);
            runesImagePaths.Add(statsRunesSlot2[new Random().Next(0, 2)]);
            runesImagePaths.Add(statsRunesSlot3[new Random().Next(0, 2)]);

            return runesImagePaths;
        }
    }
}
