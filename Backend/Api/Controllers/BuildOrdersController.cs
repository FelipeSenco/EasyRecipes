
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class BuildOrdersController : ControllerBase
{

    [HttpGet("/warcraft/build-orders")]
    public async Task<IActionResult> GetWarcraftBuildOrders()
    {


        if (true)
        {
            return BadRequest("test error");
        }

        return Ok(new { message = "User created successfully!" });
    }
}
