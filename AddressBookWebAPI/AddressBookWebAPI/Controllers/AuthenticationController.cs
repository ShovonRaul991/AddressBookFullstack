using AddressBookWebAPI.Model;
using AddressBookWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AddressBookWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILoginServices _loginServices;
        public AuthenticationController(IConfiguration configuration,ILoginServices loginServices) 
        {
            _configuration = configuration;
            _loginServices = loginServices;
        }


        public static User user = new User();
        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRegistration _userRegistration)
        {
            var searchUser = await _loginServices.GetUserDetails(_userRegistration.username);
            if (searchUser.Count() != 0)
            {
                return Ok(new { message = "user already present" });
            }

            CreateHash(_userRegistration.password, out byte[] passwordHash, out byte[] passwordKey);

            user.username=_userRegistration.username;
            user.passwordHash = passwordHash;
            user.passwordKey = passwordKey;

            _loginServices.RegisterUser(user);
            return Ok(new { message = user });

        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserRegistration userlogin)
        {

            var totalData = await _loginServices.LogUser(userlogin);
            if (totalData.Count()==0)
            {
                return Ok(new { token = "user not found" });
            }
            
            if (!verifyLogin(userlogin.password, totalData.ToList()[0].passwordHash, totalData.ToList()[0].passwordKey))
            {
                return Ok(new { token = "password is incorrect" });
            }

            string tempToken = CreateToken(userlogin);
            return Ok(new { token = tempToken });
        }

        private string CreateToken(UserRegistration user)
        {

            List<Claim> claims = new List<Claim>();
            if (user.username == "admin")
            {
                claims.Add(new Claim(ClaimTypes.Name, user.username));
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }
            else
            {
                claims.Add(new Claim(ClaimTypes.Name, user.username));
                claims.Add(new Claim(ClaimTypes.Role, "User"));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims:claims,
                    expires:DateTime.Now.AddMinutes(2),
                    signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreateHash(string password, out byte[] passwordHash, out byte[] passwordKey) 
        {
            using(var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

        }

        private bool verifyLogin(string password, byte[] passwordHash, byte[] passwordKey)
        {
            
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
