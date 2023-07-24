

using Domain.Models;

namespace Domain.Services.Interfaces
{
    public interface IUsersService
    {
        Task<ApplicationUser> GetUserById(Guid id);
        Guid MockLogin();
    }
}
