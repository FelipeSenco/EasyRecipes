
using Api.ApiModels;
using Domain.Models;
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WarcraftBuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService<WarcraftBuildOrder> _buildOrdersService;

    public WarcraftBuildOrdersController(BuildOrdersServiceFactory serviceFactory)
    {
        _buildOrdersService = serviceFactory.CreateWarcraftBuildOrdersService();
    }

    [HttpGet]    
    public async Task<IActionResult> GetWarcraftBuildOrders(        
        [FromQuery] string? title,
        [FromQuery] string? faction,
        [FromQuery] string? opponentFaction,
        [FromQuery] string? uploadedBy,
        [FromQuery] string? gameMode,
        [FromQuery] int page = 1
        )
    {
        var response = await _buildOrdersService.GetBuildOrders(page, title, faction, 
            opponentFaction, uploadedBy, gameMode);        

        return Ok(response);
    }

    [HttpGet("detail")]
    public async Task<IActionResult> GetWarcraftBuildOrderById([FromQuery] string id)
    {
        var response = await _buildOrdersService.GetBuildOrderById(id);
        return Ok(response);
    }
}
