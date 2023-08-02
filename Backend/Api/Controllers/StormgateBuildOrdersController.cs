using Domain.Models.BuildOrderModels;
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StormgateBuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService<StormgateBuildOrder> _buildOrdersService;

    public StormgateBuildOrdersController(BuildOrdersServiceFactory serviceFactory)
    {
        _buildOrdersService = serviceFactory.CreateStormgateBuildOrdersService();
    }

    [HttpGet]
    public async Task<IActionResult> GetStarcraftBuildOrders(
        [FromQuery] string? title,
        [FromQuery] string? faction,
        [FromQuery] string? opponentFaction,
        [FromQuery] string? uploadedBy,
        [FromQuery] string? gameMode,
        [FromQuery] int page = 1
        )
    {
        var response = await _buildOrdersService.GetBuildOrders(page, title, faction, opponentFaction, uploadedBy, gameMode);

        return Ok(response);
    }

    [HttpGet("detail")]
    public async Task<IActionResult> GetStarcraftBuildOrderById([FromQuery] Guid id)
    {
        var response = await _buildOrdersService.GetBuildOrderById(id);
        return Ok(response);
    }
}
