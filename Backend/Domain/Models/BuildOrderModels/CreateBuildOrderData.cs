
using Api.Filters;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.BuildOrderModels
{
    public class CreateBuildOrderData
    {
        public Guid? _id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [EditorContentTextLength(2000)]
        public string Description { get; set; }

        public int Faction { get; set; }

        public int OpponentFaction { get; set; }

        public int GameMode { get; set; }

        public List<BuildOrderAction> Actions { get; set; }

        [MaxLength(50)]
        public string CreatedBy { get; set; }

        public Guid UserId { get; set; }

        [EditorContentTextLength(2000)]
        public string? Conclusion { get; set; }
    }
}
