namespace Api.ApiModels
{
    public class WarcraftBuildOrdersFilters
    {
        public string? Title { get; set; }
        public int? Faction { get; set; }
        public int? OpponentFaction { get; set; }
        public string? UploadedBy { get; set; }
        public int? GameMode { get; set; }
    }
}
