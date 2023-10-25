# CMS

Content management system using web components, php, and MySQL.

## Build Locally

### Installation and Pre-requests
1. Install **xampp**.
2. Create a folder named `cms` under `/applications/xampp/htdocs`.
3. Copy files under `<GitBasePath>/cms/scr/php` to `<SystemBasePath>/xampp/htdocs/cms`.
4. Start XAMPP.

### Setup Database
6. Open your browser and go to *[http://localhost/phpmyadmin](http://localhost/phpmyadmin)*.
7. Click **Import** on the upper nav bar.
8. Import file from `<GitBasePath>/cms/sql/mfee43_03.sql` to create database and table.
9. Import file from `<GitBasePath>/cms/sql/create_db_admin.sql` to create db user which has limited permission.
10. Check related data. All needed should be imported.

### Run the Web Application
11. Open `<GitBasePath>/cms/` with vscode.
12. Install **Live Server** extention.
13. Click *Go Live* which is on the lower-right corner of the vscode.
14. Open your browser and go to *[http://127.0.0.1:5500/src/app/](http://127.0.0.1:5500/src/app/)*.
