using AddressBookWebAPI.Model;

namespace AddressBookWebAPI.Services
{
    public interface ILoginServices
    {
        Task<IEnumerable<User>> GetUserDetails(string username);
        void RegisterUser(User user);
        Task<IEnumerable<User>> LogUser(UserRegistration user);
    }
}