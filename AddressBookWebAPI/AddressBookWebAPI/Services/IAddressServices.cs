using AddressBookWebAPI.Model;

namespace AddressBookWebAPI.Services
{
    public interface IAddressServices
    {
        void AddOneAddress(RetrieveAddress obj);
        void DeleteOneAddress(int id);
        Task<IEnumerable<Address>> GetAllAddress();
        Task<IEnumerable<Address>> GetOneAddress(int id);
        void UpdateOneAddress(Address obj);
    }
}