using Microsoft.AspNetCore.Mvc;
using AddressBookWebAPI.Model;
using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using AddressBookWebAPI.Services;

namespace AddressBookWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddressController : Controller
    {
        
        private readonly IAddressServices _addressService;
        public AddressController( IAddressServices addressService)
        { 
            _addressService = addressService;

        }

        [HttpGet]
        [Route("get")]
        [Authorize]
        public async Task<IActionResult> Index()
        {
          
          return Ok(await _addressService.GetAllAddress());

        }
        
        [HttpGet]
        [Route("get/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAddressDetails(int id)
        {
            return Ok(await _addressService.GetOneAddress(id));
        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public void AddAddress(RetrieveAddress obj)
        {

            _addressService.AddOneAddress(obj);
        }

        [HttpPut]
        [Route("update")]
        [Authorize(Roles = "Admin")]
        public void UpdateAddressDetails(Address obj)
        {

            _addressService.UpdateOneAddress(obj);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public void DeleteAddress(int id)
        {


            _addressService.DeleteOneAddress(id);

        }
        
    }
}
