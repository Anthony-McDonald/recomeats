using Microsoft.EntityFrameworkCore;
using server.Models;
namespace server.Data
{
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<UserPermission> UserPermissions { get; set; }
    public DbSet<UserCuisinePreference> UserCuisinePreferences { get; set; }
    public DbSet<CuisinePreference> CuisinePreferences { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserCuisinePreference>()
            .HasKey(ucp => new { ucp.UserId, ucp.PreferenceId });

        modelBuilder.Entity<User>()
            .HasIndex(u => u.EmailAddress)
            .IsUnique();

        modelBuilder.Entity<UserProfile>()
            .HasOne(up => up.User)
            .WithOne(u => u.UserProfile)
            .HasForeignKey<UserProfile>(up => up.UserId);

        modelBuilder.Entity<UserPermission>()
            .HasOne(up => up.User)
            .WithOne(u => u.UserPermission)
            .HasForeignKey<UserPermission>(up => up.UserId);

        modelBuilder.Entity<Recipe>()
            .HasMany(r => r.RecipeIngredients)
            .WithOne(ri => ri.Recipe)
            .HasForeignKey(ri => ri.RecipeId);
    }
}
}