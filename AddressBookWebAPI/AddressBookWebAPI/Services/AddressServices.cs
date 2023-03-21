using AddressBookWebAPI.Model;
using AddressBookWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AddressBookWebAPI.Services
{
    public class AddressServices : IAddressServices
    {
        private readonly IAddressRepository _addressRepository;
        public AddressServices(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<IEnumerable<Address>> GetAllAddress()
        {
            string query = @"Select * from Addresses";
            return await _addressRepository.GetAll(query);
        }

        public async Task<IEnumerable<Address>> GetOneAddress(int id)
        {
            string query = @"Select * from Addresses Where Id = @IdNumber";
            return await _addressRepository.Get(query, id);

        }

        public async void AddOneAddress(RetrieveAddress obj)
        {
            string query = @"Insert into Addresses (Name, email, phone,landline,website, AddressDetails) values (@Name, @email, @phone, @landline, @website, @AddressDetails)";
            await _addressRepository.Add(query, obj);
        }

        public async void UpdateOneAddress(Address obj)
        {
            string query = @"Update Addresses set Name = @Name, email = @email, phone = @phone, landline = @landline, website = @website, AddressDetails = @AddressDetails Where Id = @addressId";
            await _addressRepository.Update(query, obj);
        }

        public async void DeleteOneAddress(int id)
        {
            string query = @"Delete from Addresses Where Id = @PersonId";
            await _addressRepository.Delete(query, id);
        }
    }
}
