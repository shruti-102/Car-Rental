﻿// <auto-generated />
using System;
using Backend.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20231004233032_carseed")]
    partial class carseed
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend.Models.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CarId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.ToTable("Booking");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CarId = 1,
                            EndDate = new DateTime(2023, 10, 7, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            StartDate = new DateTime(2023, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 2,
                            CarId = 2,
                            EndDate = new DateTime(2023, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            StartDate = new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 3,
                            CarId = 3,
                            EndDate = new DateTime(2023, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            StartDate = new DateTime(2023, 9, 21, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 4,
                            CarId = 4,
                            EndDate = new DateTime(2023, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            StartDate = new DateTime(2023, 9, 21, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("Backend.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Maker")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Cars");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Image = "https://media.zigcdn.com/media/model/2023/Sep/front-1-4-left-1008362956_930x620.jpg",
                            Maker = "TATA",
                            Model = "Nexon",
                            Price = 2000m,
                            Status = true
                        },
                        new
                        {
                            Id = 2,
                            Image = "https://media.zigcdn.com/media/model/2023/Feb/swift_930x620.jpg",
                            Maker = "Maruti Suzuki",
                            Model = "Swift",
                            Price = 1500m,
                            Status = true
                        },
                        new
                        {
                            Id = 3,
                            Image = "https://media.zigcdn.com/media/model/2023/Sep/i20_930x620.jpg",
                            Maker = "Hyundai",
                            Model = "i20",
                            Price = 1700m,
                            Status = true
                        },
                        new
                        {
                            Id = 4,
                            Image = "https://media.zigcdn.com/media/model/2020/Oct/magnite3_930x620.jpg",
                            Maker = "Nissan",
                            Model = "Magnite",
                            Price = 2500m,
                            Status = true
                        });
                });

            modelBuilder.Entity("Backend.Models.Booking", b =>
                {
                    b.HasOne("Backend.Models.Car", null)
                        .WithMany("Bookings")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Models.Car", b =>
                {
                    b.Navigation("Bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
