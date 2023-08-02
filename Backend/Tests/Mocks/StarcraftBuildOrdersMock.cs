using Domain.Models;
using Domain.Models.BuildOrderModels;
using Domain.Models.Interfaces;

namespace Domain.Mocks
{
    public static class StarcraftBuildOrdersMock
    {
        private static List<StarcraftBuildOrder> starcraftOrdersMock = new()
        {
            new StarcraftBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000001"),
                Name = "Build Order 1",
                Description = "This is build order 1",
                Faction = (int)StarcraftFactions.Zerg,
                OpponentFaction = (int)StarcraftFactions.Terran,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build an altar of kings" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Brockon Johnson",       
                Conclusion = "Consideration 1",
                GameMode = (int)StarcraftGameModes.ONEvONE 
            },
            new StarcraftBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000002"),
                Name = "Build Order 2",
                Description = "This is build order 2",
                Faction = (int)StarcraftFactions.Terran,
                OpponentFaction = (int)StarcraftFactions.Terran,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a great hall" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a burrow" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "John Doe",          
                Conclusion = "Consideration 2",
                GameMode = (int)StarcraftGameModes.ONEvONE
            },
            new StarcraftBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000003"),
                Name = "Build Order 3",
                Description = "This is build order 3",
                Faction = (int)StarcraftFactions.Protoss,
                OpponentFaction = (int)StarcraftFactions.Zerg,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a farm" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Train footmen" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Jane Smith",                
                Conclusion = "Consideration 3",
                GameMode = (int)StarcraftGameModes.TWOvTWO
            },
            new StarcraftBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000004"),
                Name = "Build Order 4",
                Description = "This is build order 4",
                Faction = (int)StarcraftFactions.Zerg,
                OpponentFaction = (int)StarcraftFactions.Protoss,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a farm" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Train footmen" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Jane Smith",             
                Conclusion = "Consideration 4",
                GameMode = (int)StarcraftGameModes.FFA
            },
            new StarcraftBuildOrder
            {
                Id = new Guid("00000000-0000-0000-0000-000000000005"),
                Name = "Build Order 5",
                Description = "This is build order 5",
                Faction = (int)StarcraftFactions.Terran,
                OpponentFaction = (int)StarcraftFactions.ALL,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build a farm" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Train footmen" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Test Tilter",            
                Conclusion = "Consideration 5",
                GameMode = (int)StarcraftGameModes.ONEvONE
            }
        };

        public static List<StarcraftBuildOrder> StarcraftOrdersMock { get => starcraftOrdersMock; set => starcraftOrdersMock = value; }
    }
}