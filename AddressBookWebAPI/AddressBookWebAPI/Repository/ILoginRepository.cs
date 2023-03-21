using AddressBookWebAPI.Model;

namespace AddressBookWebAPI.Repository
{
    public interface ILoginRepository
    {
        Task<IEnumerable<User>> GetUserDetails(string query, string username);
        Task<IEnumerable<User>> InsertUser(string query, User user);
        Task<IEnumerable<User>> LoginUser(string query, UserRegistration user);
    }
}