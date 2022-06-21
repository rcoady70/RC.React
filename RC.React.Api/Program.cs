using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace RC.React.Api;

public class Program
{
    public static async Task Main(string[] args)
    {
        //CreateHostBuilder(args).Build().Run();
        var host = CreateHostBuilder(args).Build();
        //
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                var dataContext = services.GetRequiredService<DataContext>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                await dataContext.Database.MigrateAsync();
                await Seed.SeedData(dataContext, userManager);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger>();
                logger.LogError(ex, "An error occurred during migration");
            }
            await host.RunAsync();
        }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
