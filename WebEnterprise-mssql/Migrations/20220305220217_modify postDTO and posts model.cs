using Microsoft.EntityFrameworkCore.Migrations;

namespace WebEnterprise_mssql.Migrations
{
    public partial class modifypostDTOandpostsmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UsersId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "Posts",
                newName: "UserIdId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_UsersId",
                table: "Posts",
                newName: "IX_Posts_UserIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserIdId",
                table: "Posts",
                column: "UserIdId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserIdId",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "UserIdId",
                table: "Posts",
                newName: "UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_UserIdId",
                table: "Posts",
                newName: "IX_Posts_UsersId");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UsersId",
                table: "Posts",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
