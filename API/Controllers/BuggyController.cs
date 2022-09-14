using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        //IActionResult จะ return อะไรก็ได้
        [HttpGet("[action]")]
        public IActionResult GetNotFound(){
            return NotFound();
        }

        

        // BadRequest คำสั่ง => ส่งผิด
        [HttpGet("[action]")]
        public IActionResult GetBadRequest(){
            return BadRequest(new ProblemDetails {Title="This is Badrequest"} );
        }

        //Unauthorized คุณยังไม่ได้ login นะ
        [HttpGet("[action]")]
        public IActionResult GetUnAuthorized()
        {
            return Unauthorized();
        }

        //ValidationProblem เป็นValidat ของเราเองนะที่จะส่งออกไป
        [HttpGet("[action]")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");
            return ValidationProblem();
        }

        [HttpGet("[action]")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is server error");
        }
    }
}