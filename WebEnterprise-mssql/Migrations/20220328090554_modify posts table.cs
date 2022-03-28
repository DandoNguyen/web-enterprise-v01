using Microsoft.EntityFrameworkCore.Migrations;

namespace WebEnterprise_mssql.Migrations
{
    public partial class modifypoststable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Posts_Postsid",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_FilesPath_Posts_Postsid",
                table: "FilesPath");

            migrationBuilder.DropForeignKey(
                name: "FK_Views_Posts_Postsid",
                table: "Views");

            migrationBuilder.DropForeignKey(
                name: "FK_Votes_Posts_Postsid",
                table: "Votes");

            migrationBuilder.RenameColumn(
                name: "Postsid",
                table: "Votes",
                newName: "PostsPostId");

            migrationBuilder.RenameIndex(
                name: "IX_Votes_Postsid",
                table: "Votes",
                newName: "IX_Votes_PostsPostId");

            migrationBuilder.RenameColumn(
                name: "Postsid",
                table: "Views",
                newName: "PostsPostId");

            migrationBuilder.RenameIndex(
                name: "IX_Views_Postsid",
                table: "Views",
                newName: "IX_Views_PostsPostId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Posts",
                newName: "PostId");

            migrationBuilder.RenameColumn(
                name: "Postsid",
                table: "FilesPath",
                newName: "PostsPostId");

            migrationBuilder.RenameIndex(
                name: "IX_FilesPath_Postsid",
                table: "FilesPath",
                newName: "IX_FilesPath_PostsPostId");

            migrationBuilder.RenameColumn(
                name: "Postsid",
                table: "Comments",
                newName: "PostsPostId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_Postsid",
                table: "Comments",
                newName: "IX_Comments_PostsPostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Posts_PostsPostId",
                table: "Comments",
                column: "PostsPostId",
                principalTable: "Posts",
                principalColumn: "PostId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FilesPath_Posts_PostsPostId",
                table: "FilesPath",
                column: "PostsPostId",
                principalTable: "Posts",
                principalColumn: "PostId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Views_Posts_PostsPostId",
                table: "Views",
                column: "PostsPostId",
                principalTable: "Posts",
                principalColumn: "PostId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_Posts_PostsPostId",
                table: "Votes",
                column: "PostsPostId",
                principalTable: "Posts",
                principalColumn: "PostId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Posts_PostsPostId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_FilesPath_Posts_PostsPostId",
                table: "FilesPath");

            migrationBuilder.DropForeignKey(
                name: "FK_Views_Posts_PostsPostId",
                table: "Views");

            migrationBuilder.DropForeignKey(
                name: "FK_Votes_Posts_PostsPostId",
                table: "Votes");

            migrationBuilder.RenameColumn(
                name: "PostsPostId",
                table: "Votes",
                newName: "Postsid");

            migrationBuilder.RenameIndex(
                name: "IX_Votes_PostsPostId",
                table: "Votes",
                newName: "IX_Votes_Postsid");

            migrationBuilder.RenameColumn(
                name: "PostsPostId",
                table: "Views",
                newName: "Postsid");

            migrationBuilder.RenameIndex(
                name: "IX_Views_PostsPostId",
                table: "Views",
                newName: "IX_Views_Postsid");

            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "Posts",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "PostsPostId",
                table: "FilesPath",
                newName: "Postsid");

            migrationBuilder.RenameIndex(
                name: "IX_FilesPath_PostsPostId",
                table: "FilesPath",
                newName: "IX_FilesPath_Postsid");

            migrationBuilder.RenameColumn(
                name: "PostsPostId",
                table: "Comments",
                newName: "Postsid");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_PostsPostId",
                table: "Comments",
                newName: "IX_Comments_Postsid");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Posts_Postsid",
                table: "Comments",
                column: "Postsid",
                principalTable: "Posts",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FilesPath_Posts_Postsid",
                table: "FilesPath",
                column: "Postsid",
                principalTable: "Posts",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Views_Posts_Postsid",
                table: "Views",
                column: "Postsid",
                principalTable: "Posts",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_Posts_Postsid",
                table: "Votes",
                column: "Postsid",
                principalTable: "Posts",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
