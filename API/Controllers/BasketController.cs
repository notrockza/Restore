using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }
        
        // Name = "GetBasket" มันจะทำการ reset หน้าตะกร้า
        [HttpGet("[action]", Name = "GetBasket")]
        //<BasketDTO> ใส่เพือ ให้รู้ว่า return เป็นอะไร
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
        {
            //ขั้นตอนกํารเพิ่มสินค้ําเข้ําตะกร้ํา
            
            //get basket 
            var basket = await RetrieveBasket();

            //ถ้าตะกร้าไม่มีข้อมูล จะทำการสร้างคุกกี้ ใหม่
            if (basket == null) basket = CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            
            //add item
            basket.AddItem(product, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            //Redirect to Route
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }
        
        private BasketDTO MapBasketToDto(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                //Items เป็นของปลอม // basket.Items.ToList(); เป็นของจริง
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity,
                    
                }).ToList()
                //ใส่ ToList() ให้เป็น array

            };
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }


        // cookie จะใช่ไม่ได้เมือ เป็น https
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };

            _context.Baskets.Add(basket);
            return basket;

        }

        [HttpDelete("action")]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails
            { Title = "Problem removing item from thebasket" });
         }
        
        
        }

        

    }


