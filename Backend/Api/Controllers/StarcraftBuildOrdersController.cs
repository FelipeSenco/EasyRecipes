
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StarcraftBuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService _buildOrdersService;

    public StarcraftBuildOrdersController(BuildOrdersServiceFactory serviceFactory)
    {
        _buildOrdersService = serviceFactory.Create(Games.Starcraft_II);
    }

    [HttpGet]
    public async Task<IActionResult> GetStarcraftBuildOrders()
    {
        var response = await _buildOrdersService.GetBuildOrders();

        return Ok(response);
    }

    [HttpGet("detail")]
    public async Task<IActionResult> GetStarcraftBuildOrderById([FromQuery] string id)
    {
        var response = await _buildOrdersService.GetBuildOrderById(id);
        return Ok(response);
    }
}
