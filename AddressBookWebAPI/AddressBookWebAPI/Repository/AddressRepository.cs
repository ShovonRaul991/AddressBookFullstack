using AddressBookWebAPI.Model;
using Dapper;
using System.Data.SqlClient;

namespace AddressBookWebAPI.Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly IConfiguration _configuration;
        public AddressRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //get all address service
        public async Task<IEnumerable<Address>> GetAll(string Query)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var ResultData = await connection.QueryAsync<Address>(Query);
            return ResultData.ToList();
        }

        //get one address service
        public async Task<IEnumerable<Address>> Get(string Query, int id)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var ResultData = await connection.QueryAsync<Address>(Query, new { IdNumber = id });
            return ResultData.ToList();
        }

        //add service
        public async Task<IEnumerable<dynamic>> Add(string Query, RetrieveAddress retrieveAddress)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var addresult =await connection.QueryAsync(Query, retrieveAddress);
            return addresult;
        }

        //update service
        public async Task<IEnumerable<dynamic>> Update(string Query, Address address)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var updateresult =await connection.QueryAsync<Address>(Query, new { addressId = address.Id, Name = address.Name, email = address.email, phone = address.phone, landline = address.landline, website = address.website, AddressDetails = address.AddressDetails });
            return updateresult;
        }

        //delete service
        public async Task<IEnumerable<dynamic>> Delete(string Query, int id)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var deleteResult = await connection.QueryAsync(Query, new { PersonId = id });
            return deleteResult;
        }
    }
}
