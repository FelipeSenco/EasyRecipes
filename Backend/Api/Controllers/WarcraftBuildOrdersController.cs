
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WarcraftBuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService _buildOrdersService;

    public WarcraftBuildOrdersController(BuildOrdersServiceFactory serviceFactory)
    {
        _buildOrdersService = serviceFactory.Create(Games.Warcraft_III);
    }

    [HttpGet]    
    public async Task<IActionResult> GetWarcraftBuildOrders()
    {
        var response = await _buildOrdersService.GetBuildOrders();        

        return Ok(response);
    }

    [HttpGet("detail")]
    public async Task<IActionResult> GetWarcraftBuildOrderById([FromQuery] string id)
    {
        var response = await _buildOrdersService.GetBuildOrderById(id);
        return Ok(response);
    }
}
