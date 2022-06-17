using Microsoft.EntityFrameworkCore;
using RC.React.Domain;

namespace NT.React.Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<Activity> Activities { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}
