using Microsoft.AspNetCore.Http;
using RC.React.Application.Interfaces;
using System.Security.Claims;

namespace RC.React.Infrastructure;

public class UserAccessor : IUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public UserAccessor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string GetUsername()
    {
        return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
    }
}