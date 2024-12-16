The guide to set up your WordPress site, connect Mailchimp for newsletters, and use Amelia for appointment bookings:
---------------------------------------------------------------------------------------

Step 1: Set Up XAMPP for WordPress
Install XAMPP:

Download XAMPP from apachefriends.org. Install it and make sure Apache and MySQL are selected.
Open the XAMPP Control Panel and start Apache and MySQL.
Create a Database for Your Site:

Go to phpMyAdmin in your browser.
Click the Databases tab, name your database law_solutions, and hit Create.


-----------------------------------------------------------------------------------------------------


Step 2: Install WordPress
Download WordPress:

Head to wordpress.org and download the latest version.
Extract the ZIP file and move it to the htdocs folder in your XAMPP directory (usually found in C:\xampp\htdocs).
Set Up WordPress:

Rename the WordPress folder to law_solutions.
Open your browser and visit http://localhost/law_solutions.
Fill in your database info:
Database Name: law_solutions
Username: root
Password: (leave it blank).
Click through to complete the installation and set your admin username and password.

--------------------------------------------------------------------------------------------


Step 3: Add a Theme and Essential Plugins
Choose a Theme:

In the WordPress dashboard, go to Appearance > Themes.
Install and activate a professional theme like Astra.
Install Plugins:

Navigate to Plugins > Add New and install:
Mailchimp for WordPress (for newsletters).
Amelia (for appointment bookings).

------------------------------------------------------------------------------------------------------------------


Step 4: Set Up Mailchimp for Newsletters
Create a Mailchimp Account:

Sign up at mailchimp.com and create an audience under Audience > Create Audience.
Connect Mailchimp to Your Site:

In Mailchimp, go to Account > Extras > API Keys and generate an API Key.
Copy the key and paste it into Mailchimp for WordPress > Mailchimp settings on your site.
Add a Signup Form:

In WordPress, go to Mailchimp for WordPress > Forms and create a new signup form.
Customize the fields (e.g., Name, Email) and save.
Add the generated shortcode (e.g., [mc4wp_form id="123"]) to any page or widget to display the form.


--------------------------------------------------------------------------------------------------------------

Step 5: Use Amelia for Appointment Bookings
Set Up Amelia:

Activate the Amelia plugin and go to Amelia > Settings in the WordPress dashboard.
Add a Service:

Navigate to Amelia > Services and create a service (e.g., Legal Consultation). Specify the duration, price, and other details.
Set Time Slots:

Under Amelia > Employees, assign availability by setting up working hours and time slots.
Add the Booking Form:

Use the shortcode [amelia_booking] and paste it into a page or post to display the booking form.
