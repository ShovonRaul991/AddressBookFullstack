using AddressBookWebAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;

namespace AddressBookWebAPI.Repository
{
    public class LoginRepository : ILoginRepository
    {
        private readonly IConfiguration _configuration;
        public LoginRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<User>> GetUserDetails(string query, string username)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            return await connection.QueryAsync<User>(query, new { User = username });
        }

        public async Task<IEnumerable<User>> InsertUser(string query, User user)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            return await connection.QueryAsync<User>(query, user);
        }

        public async Task<IEnumerable<User>> LoginUser(string query, UserRegistration user)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            return await connection.QueryAsync<User>(query, new { UserName = user.username });
        }
    }
}
