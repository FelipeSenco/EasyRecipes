
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login()
        {
            var mockLoginId = _usersService.MockLogin();
            var response = await _usersService.GetUserById(mockLoginId);
            return Ok(response);
        }
    }
}
