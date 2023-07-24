using Domain.Models;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services.Implementations
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        static List<Guid> mockGuids = new List<Guid>
        {
        Guid.Parse("4395085b-8dd3-42c7-b1a4-2e9a3b0a95f3"),
        Guid.Parse("fefd1f81-0a44-42f9-a3d6-85ee8e1eb767"),
        Guid.Parse("549ccf7c-0f41-4eb6-b2cd-a33a79c8e57e"),
        Guid.Parse("4c85f65e-c90a-4a1d-bd31-f57c3d2bd9eb"),
        };
        public UsersService(IUsersRepository userRepository) 
        {
            _usersRepository = userRepository;
        }   
        public Task<ApplicationUser> GetUserById(Guid id)
        {
            return _usersRepository.GetUserById(id);
        }

        public Guid MockLogin()
        {
            //proper implementation of user athentication will be done in the near future with Azure integration            
             Random rand = new Random();
             return mockGuids[rand.Next(mockGuids.Count)];            
        }
    }
}
