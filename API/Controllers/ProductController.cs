using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        // ctor
        private readonly StoreContext _context;
        public ProductController(StoreContext context)
        {
            _context = context;
            
        }
        [HttpGet("[action]")]
        public async Task<ActionResult<List<Product>>> GetProduct()
        {
            return await _context.Products.ToListAsync();
        }

        // [HttpGet("[action]")]
        // public async Task<IActionResult> TestGetProduct()
        // {
        //     //  ok คือ pass 200
        //     var data =  await _context.Products.ToListAsync();
        //     return  Ok (data);
        // }

        [HttpGet("[action]/{id}")]

        //<ActionResult<Product>>
        public async Task<IActionResult> GetProduct(int id)
        {
            var data = await _context.Products.FindAsync(id);
            
            if (data == null) return NotFound();
           return Ok (data );
        }
    }
}