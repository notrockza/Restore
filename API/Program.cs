
using API.Data;
using API.Middleware;
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

#region Cors
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
    policy =>
                      {
                         policy.AllowAnyHeader()
                         .AllowAnyMethod()
                         .AllowCredentials()
                         .WithOrigins("http://localhost:3000");
                      });
});
#endregion

var app = builder.Build();

#region //สร้ํางข้อมูลจ ําลอง Fake data
    using var scope = app.Services.CreateScope(); //using หลังท ํางํานเสร็จจะถูกท ําลํายจํากMemory
    var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
    await context.Database.MigrateAsync(); //สร้าง DB ให้อัตโนมัติถ้ํายังไม่มี
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
#region ส่ง error ไปให้Axios ตอนทำ Interceptor
app.UseMiddleware<ExceptionMiddleware>();
#endregion

}
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();

