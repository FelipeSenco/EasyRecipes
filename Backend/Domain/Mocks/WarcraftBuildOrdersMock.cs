using Domain.Models;

namespace Domain.Mocks
{
    public static class WarcraftBuildOrderMocks
    {
        private static List<WarcraftBuildOrder> warcraftOrdersMock = new()
        {
            new WarcraftBuildOrder
            {
                Id = "1",
                Name = "Build Order 1",
                Description = "This is build order 1",
                Game = Games.Warcraft_III,
                Faction = WarcraftFactions.HUMAN,
                OpponentFaction = WarcraftFactions.ORC,
                Actions = new List<BuildOrderAction>
                {
                    new BuildOrderAction { Clock = "00:00", Supply = 5, Instruction = "Build an altar of kings" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                    new BuildOrderAction { Clock = "00:05", Supply = 6, Instruction = "Build a thing" },
                },
                CreatedBy = "Brockon Johnson",
                Patch = "1.0.0",
                VideoUrl = null,
                Considerations = "Consideration 1"
            },
            new WarcraftBuildOrder
            {
                Id = "2",
                Name = "Build Order 2",
                Description = "This is build order 2",
                Game = Games.Warcraft_III,
                Faction = WarcraftFactions.ORC,
                OpponentFaction = WarcraftFactions.HUMAN,
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
                Patch = "1.2.0",
                VideoUrl = null,
                Considerations = "Consideration 2"
            },
            new WarcraftBuildOrder
            {
                Id = "3",
                Name = "Build Order 3",
                Description = "This is build order 3",
                Game = Games.Warcraft_III,
                Faction = WarcraftFactions.HUMAN,
                OpponentFaction = WarcraftFactions.UNDEAD,
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
                Patch = "1.1.0",
                VideoUrl = null,
                Considerations = "Consideration 3"
            },
            new WarcraftBuildOrder
            {
                Id = "4",
                Name = "Build Order 4",
                Description = "This is build order 4",
                Game = Games.Warcraft_III,
                Faction = WarcraftFactions.UNDEAD,
                OpponentFaction = WarcraftFactions.UNDEAD,
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
                Patch = "1.1.0",
                VideoUrl = null,
                Considerations = "Consideration 4"
            },
            new WarcraftBuildOrder
            {
                Id = "5",
                Name = "Build Order 5",
                Description = "This is build order 5",
                Game = Games.Warcraft_III,
                Faction = WarcraftFactions.NIGHT_ELf,
                OpponentFaction = WarcraftFactions.ORC,
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
                Patch = "1.1.0",
                VideoUrl = null,
                Considerations = "Consideration 5"
            }
        };

        internal static List<WarcraftBuildOrder> WarcraftOrdersMock { get => warcraftOrdersMock; set => warcraftOrdersMock = value; }
    }
}