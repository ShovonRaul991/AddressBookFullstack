using AddressBookWebAPI.Model;

namespace AddressBookWebAPI.Repository
{
    public interface IAddressRepository
    {
        Task<IEnumerable<Address>> GetAll(string Query);
        Task<IEnumerable<Address>> Get(string Query, int id);
        Task<IEnumerable<dynamic>> Add(string Query, RetrieveAddress retrieveAddress);
        Task<IEnumerable<dynamic>> Update(string Query, Address address);
        Task<IEnumerable<dynamic>> Delete(string Query, int id);
    }
}