<h3>Description</h3>

<p>
This is a simple CRUD application build using JavaScript, MySQL Database, Node.js, and Express.
</p>

<h3>Prerequisites</h3>

<ul>
    <li>You must have MySQL database server installed on your computer</li>
    <li>You must have the Node.js installed on your computer</li>
    <li>Create the required database and table using the <strong>db_setup.sql</strong> file in root folder of this project.</li>
    <li>Before you go through the setup, create a '.env' file in the root folder of the project. </li>
    <li>In the '.env' file, set the following environment variables: </li><br>
    <p>
    <ul>
        <li><strong>Remember to change 'your_database_username', and 'your_database_password' to your own MySQL username and passpord respectively.</strong></li>
        <li>PORT=5000</li>
        <li>USER=your_database_username</li>
        <li>PASSWORD=your_password</li>
        <li>DATABASE=student_registration</li>
        <li>DB_PORT=3306</li>
        <li>HOST=localhost</li>
    </ul>
    </p>
    
    
</ul>

<h3>Setup</h3>
<p>
<ul>
    <li>Change folder into the 'server' folder and then Install all dependencies by running <strong>npm install</strong></li>
    <li>First, use 'Live Server' to open the application from the 'client/main.html' file.</li>
    <li>Then, change directory to the'server' folder and run <strong>nodemon app</strong> in the command line to launch the application</li>
    <li></li>
    <li></li>
</ul>

<h3>Usage</h3>
<p>
<ul>
    <li>Enter all fields to successfully register a student for course.</li>
    <li>To edit an entry, you'll need to enter all the fields again as I did not have enough time to populate the values in the editing table. </li>
    <li>Use the student number to search for a student.</li>
</ul>
</p>
