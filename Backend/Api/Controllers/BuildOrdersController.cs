
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService _buildOrdersService;

    public BuildOrdersController(IBuildOrdersService buildOrdersService)
    {
        _buildOrdersService = buildOrdersService;
    }

    [HttpGet("warcraft")]    
    public async Task<IActionResult> GetWarcraftBuildOrders()
    {
        var response = await _buildOrdersService.GetWarcraftBuildOrders();        

        return Ok(response);
    }

    [HttpGet("warcraft/detail")]
    public async Task<IActionResult> GetWarcraftBuildOrderById([FromQuery] string id)
    {
        var response = await _buildOrdersService.GetWarcraftBuildOrderById(id);
        return Ok(response);
    }
}
