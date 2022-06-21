using Microsoft.AspNetCore.Identity;

namespace RC.React.Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; } = "Testing Name";
    public string Bio { get; set; } = "";
    public ICollection<ActivityAttendee> Activities { get; set; }
    public ICollection<Photo> Photos { get; set; }
    public ICollection<UserFollowing> Followings { get; set; }
    public ICollection<UserFollowing> Followers { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}