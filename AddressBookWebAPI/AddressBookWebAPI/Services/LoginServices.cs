using AddressBookWebAPI.Model;
using AddressBookWebAPI.Repository;

namespace AddressBookWebAPI.Services
{
    public class LoginServices : ILoginServices
    {
        private readonly ILoginRepository _loginRepository;

        public LoginServices(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }

        public async Task<IEnumerable<User>> GetUserDetails(string username)
        {
            string userQuery = @"Select username from Users Where username = @User";
            return await _loginRepository.GetUserDetails(userQuery, username);
        }

        public async void RegisterUser(User user)
        {
            string RegisterQuery = @"Insert into Users (username, passwordHash, passwordKey) values (@username, @passwordHash, @passwordKey)";
            await _loginRepository.InsertUser(RegisterQuery, user);
        }

        public async Task<IEnumerable<User>> LogUser(UserRegistration user)
        {
            string loginQuery = @"Select * from Users Where username = @UserName";
            return await _loginRepository.LoginUser(loginQuery, user);
        }
    }
}
