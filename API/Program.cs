
using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//อยากใช้ตรงอืนต้องไปนี้ตรงนี้ UseSqlite
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

#region //สร้ํางข้อมูลจ ําลอง Fake data
    using var scope = app.Services.CreateScope(); //using หลังท ํางํานเสร็จจะถูกท ําลํายจํากMemory
    var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
    await context.Database.MigrateAsync(); //สร้ําง DB ให้อัตโนมัติถ้ํายังไม่มี
    await DbInitializer.Initialize(context); //สร้ํางข้อมูลสินค้ําจำลอง
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Problem migrating data");
    }
#endregion

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

// มันเป็นของ Web  
// app.UseHttpsRedirection();
}
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();

