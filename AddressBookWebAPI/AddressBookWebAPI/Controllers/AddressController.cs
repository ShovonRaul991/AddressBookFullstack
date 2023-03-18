using Microsoft.AspNetCore.Mvc;
using AddressBookWebAPI.Model;
using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Authorization;

namespace AddressBookWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddressController : Controller
    {
        private readonly IConfiguration _configuration;
        public AddressController(IConfiguration configuration)
        {
            _configuration=configuration;
        }

        [HttpGet]
        [Route("get")]
        [Authorize]
        public async Task<IActionResult> Index()
        {
            var getAllData = @"Select * from Addresses";
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var totalData = await connection.QueryAsync<Address>(getAllData);
            return Ok(totalData);

        }

        [HttpGet]
        [Route("get/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAddressDetails(int id)
        {
            var getParticularId = @"Select * from Addresses Where Id = @IdNumber";
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var totalData = await connection.QueryAsync<Address>(getParticularId, new { IdNumber = id});
            return Ok(totalData);
        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public async Task<IActionResult> GetAddress(RetrieveAddress obj)
        {
            var insertAddress = @"Insert into Addresses (Name, email, phone,landline,website, AddressDetails) values (@Name, @email, @phone, @landline, @website, @AddressDetails)";
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var addresult = await connection.QueryAsync<RetrieveAddress>(insertAddress, obj);
            return Ok(obj);
        }

        [HttpPut]
        [Route("update")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateAddressDetails(Address obj)
        {
            var updateAddress = @"Update Addresses set Name = @Name, email = @email, phone = @phone, landline = @landline, website = @website, AddressDetails = @AddressDetails Where Id = @addressId";
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var updateresult = await connection.QueryAsync<Address>(updateAddress, new { addressId = obj.Id,Name = obj.Name,email = obj.email,phone = obj.phone,landline=obj.landline, website = obj.website, AddressDetails = obj.AddressDetails });
            return Ok(obj);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAddress(int id)
        {

            var deleteAddress = @"Delete from Addresses Where Id = @PersonId";
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var deleteResult = await connection.QueryAsync(deleteAddress, new { PersonId = id });
            return Ok(deleteResult);

        }
    }
}
