﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Interfaces
{
    public interface IBuildOrder
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Faction { get; set; }
        public int OpponentFaction { get; set; }
        public List<BuildOrderAction> Actions { get; set; }
        public string CreatedBy { get; set; }
        public Guid UserId { get; set; }
        public int GameMode { get; set; }       
        public string? Conclusion { get; set; }
    }
}
