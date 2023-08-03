using Domain.Models;
using Domain.Models.BuildOrderModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Domain.Filters
{
    public class ValidateUserAndModelFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var buildOrder = context.ActionArguments["buildOrder"] as ApiBuildOrderData;
            var user = MockIdentity.MockIdentity.User;

            if (user == null || (buildOrder.UserId != user.Id && user.Role != UserRole.ADMIN))
            {
                var response = new { message = "User is not authorized." };
                context.Result = new ObjectResult(response) { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }

            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
                return;
            }

            await next();
        }
    }
}
