
using Domain.Models;


namespace Domain.MockIdentity
{
    public static class MockIdentity
    {
        public static List<Guid> mockGuids = new List<Guid>
        {
        Guid.Parse("4395085b-8dd3-42c7-b1a4-2e9a3b0a95f3"),
        Guid.Parse("fefd1f81-0a44-42f9-a3d6-85ee8e1eb767"),
        Guid.Parse("549ccf7c-0f41-4eb6-b2cd-a33a79c8e57e"),
        Guid.Parse("4c85f65e-c90a-4a1d-bd31-f57c3d2bd9eb"),
        };
        public static ApplicationUser User { get; set; }
    }
}
