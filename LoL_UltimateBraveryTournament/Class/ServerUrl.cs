namespace LoL_UltimateBraveryTournament.Class
{
    public static class ServerUrl
    {
        public static string BaseUrl = "https://leaguestats.infinity54.fr/riot/lol/";

        public static string ChampionsJsonUrl()
        {
            return BaseUrl + "latest/data/fr_FR/champion.json";
        }

        public static string ChampionsFullJsonUrl()
        {
            return BaseUrl + "latest/data/fr_FR/championFull.json";
        }

        public static string RunesJsonUrl()
        {
            return BaseUrl + "latest/data/fr_FR/runesReforged.json";
        }

        public static string ItemsJsonUrl()
        {
            return BaseUrl + "latest/data/fr_FR/item.json";
        }

        public static string SummonersJsonUrl()
        {
            return BaseUrl + "latest/data/fr_FR/summoner.json";
        }

        public static string LaneImgUrl(string lane)
        {
            return BaseUrl + "extras/lanes/" + lane + ".png";
        }

        public static string ChampionImgUrl(string championId)
        {
            return BaseUrl + "latest/img/champion/" + championId + ".png";
        }

        public static string RuneElementImgUrl(string runeImgPath)
        {
            return BaseUrl + "img/" + runeImgPath;
        }

        public static string ItemImgUrl(string itemId)
        {
            return BaseUrl + "latest/img/item/" + itemId + ".png";
        }

        public static string SummonerImgUrl(string summonerId)
        {
            return BaseUrl + "extras/summonerspells/" + summonerId + ".png";
        }

        public static string SpellImgUrl(string spellId)
        {
            return BaseUrl + "latest/img/spell/" + spellId + ".png";
        }
    }
}
