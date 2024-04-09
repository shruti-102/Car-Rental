using Backend.DataAccess.Models;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Backend.DataAccess
{
    public class DataAccess : IDataAccess
    {
        private readonly IConfiguration configuration;
        private readonly string dbconnection;
        private readonly string dateformat;
        public DataAccess(IConfiguration configuration)
        {
            this.configuration = configuration;
            dbconnection = this.configuration["ConnectionStrings:DB"];
            dateformat = this.configuration["Constants:DateFormat"];
        }
        public async Task<IEnumerable<Car>> GetCarsAsync()
        {
            var carList = new List<Car>();
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                await connection.OpenAsync();
                string query = "SELECT * FROM Cars";
                using (SqlCommand command = new SqlCommand(query, connection))
                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        // Create a Car object for each row in the result set
                        Car car = new Car
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Maker = reader.GetString(reader.GetOrdinal("Maker")),
                            Model = reader.GetString(reader.GetOrdinal("Model")),
                            Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                            Status = reader.GetBoolean(reader.GetOrdinal("Status")),
                            Image = reader.GetString(reader.GetOrdinal("Image")),
                        };

                        // After retrieving the cars, you can fetch bookings and add them to the cars.
                        car.Bookings = (List<Booking>)await GetBookingsForCarAsync(car.Id);

                        // Add the car to the list
                        carList.Add(car);
                    }
                }
            }
            return carList;
        }


        private async Task<IEnumerable<Booking>> GetBookingsForCarAsync(int carId)
        {
            var bookingList = new List<Booking>();
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                string query = "SELECT * FROM Booking WHERE CarId = @CarId";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@CarId", carId);

                await connection.OpenAsync();
                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var booking = new Booking
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            // Include other booking properties
                        };
                        bookingList.Add(booking);
                    }
                }
            }

            return bookingList;
        }


        public async Task<Car> GetCarByIdAsync(int carId)
        {
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();

                string query = "SELECT * FROM Cars WHERE Id = @CarId";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@CarId", carId);

                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        Car car = new Car
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Maker = reader.GetString(reader.GetOrdinal("Maker")),
                            Model = reader.GetString(reader.GetOrdinal("Model")),
                            Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                            Status = reader.GetBoolean(reader.GetOrdinal("Status")),
                            Image = reader.GetString(reader.GetOrdinal("Image")),
                            // You can add the code to retrieve and populate the Bookings here
                        };

                        return car;
                    }
                }

                return null; // If no car with the given ID is found
            }
        }


        public async Task<IEnumerable<Maker>> GetMakersAsync()
        {
            var makerList = new List<Maker>();
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();
                string query = "SELECT * FROM Makers";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Maker maker = new Maker
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                            };
                            makerList.Add(maker);
                        }
                    }
                }
            }
            return makerList;
        }


        public async Task<IEnumerable<Model>> GetModelsAsync(int makerId)
        {
            var modelList = new List<Model>();
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();
                string query = "SELECT * FROM Models WHERE MakerId = @MakerId";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@MakerId", makerId);
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Model model = new Model
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                MakerId = reader.GetInt32(reader.GetOrdinal("MakerId")),
                            };
                            modelList.Add(model);
                        }
                    }
                }
            }
            return modelList;
         }





    /*public Car InsertCar(Car car)
    {
        using (SqlConnection connection = new SqlConnection(dbconnection))
        {
           connection.Open();

            string query = @"
        INSERT INTO Cars (Maker, Model, Price, Status, Image)
        VALUES (@Maker, @Model, @Price, @Status, @Image);
        SELECT CAST(SCOPE_IDENTITY() as int);
    ";

            int carId = dbconnection.Query<int>(query, car).Single();
            car.Id = carId;

            return car;
        }
    }


    public void UpdateCar(int id, Car car)
        {
            using (IDbConnection dbConnection = new SqlConnection(connectionString))
            {
                dbConnection.Open();
                string query = "UPDATE Cars SET Maker = @Maker, Model = @Model, Price = @Price WHERE Id = @Id";
                car.Id = id;
                dbConnection.Execute(query, car);
            }
        }

        public void DeleteCar(int id)
        {
            using (IDbConnection dbConnection = new SqlConnection(connectionString))
            {
                dbConnection.Open();
                string query = "DELETE FROM Cars WHERE Id = @Id";
                dbConnection.Execute(query, new { Id = id });
            }
        }*/
    }
}

