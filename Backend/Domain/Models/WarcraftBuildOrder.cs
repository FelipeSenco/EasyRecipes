using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class WarcraftBuildOrder
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Games Game { get; set; }
        public WarcraftFactions Faction { get; set; }
        public WarcraftFactions OpponentFaction { get; set; }
        public List<BuildOrderAction> Actions { get; set; } = new();
        public string CreatedBy { get; set; }

        // Optional properties
        public string Patch { get; set; }
        public string VideoUrl { get; set; }
        public string Considerations { get; set; } 
    }
}
