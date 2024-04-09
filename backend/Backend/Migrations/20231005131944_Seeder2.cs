using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Seeder2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Makers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Makers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MakerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Models_Makers_MakerId",
                        column: x => x.MakerId,
                        principalTable: "Makers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "Image", "Maker", "Model", "Price", "Status" },
                values: new object[] { 5, "https://media.zigcdn.com/media/model/2023/Mar/front-1-4-left-1573690002_930x620.jpg", "Hyundai", "Aura", 3000m, true });

            migrationBuilder.InsertData(
                table: "Makers",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "TATA" },
                    { 2, "Maruti Suzuki" },
                    { 3, "Hyundai" },
                    { 4, "Nissan" }
                });

            migrationBuilder.InsertData(
                table: "Models",
                columns: new[] { "Id", "MakerId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Nexon" },
                    { 2, 2, "Swift" },
                    { 3, 3, "i20" },
                    { 4, 4, "Magnite" },
                    { 5, 3, "Aura" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Models_MakerId",
                table: "Models",
                column: "MakerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "Makers");

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
