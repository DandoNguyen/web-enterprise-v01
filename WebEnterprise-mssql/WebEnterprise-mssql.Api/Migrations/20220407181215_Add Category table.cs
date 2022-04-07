using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebEnterprise_mssql.Migrations
{
    public partial class AddCategorytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoriesCategoryId",
                table: "Posts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CategoryName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CategoriesCategoryId",
                table: "Posts",
                column: "CategoriesCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Categories_CategoriesCategoryId",
                table: "Posts",
                column: "CategoriesCategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Categories_CategoriesCategoryId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Posts_CategoriesCategoryId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CategoriesCategoryId",
                table: "Posts");
        }
    }
}
