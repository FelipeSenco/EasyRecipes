using Domain.Models;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services.Implementations
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;        
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
             return MockIdentity.MockIdentity.mockGuids[rand.Next(MockIdentity.MockIdentity.mockGuids.Count)];            
        }
    }
}
