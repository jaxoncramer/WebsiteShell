Building a Website - Jaxon

TODO:
- download SASS and create a static homepage with Bootstrap and SASS
- figure out how to store and link variables from a variables file
- set up new Git repo and remote it to GitHub
	- establish workflow to push changes easily
- download WordPress and setup skeleton theme (underscores)

Day 1 - 2/7/2018

- Configure Apache local server
	- reference https://websitebeaver.com/set-up-localhost-on-macos-high-sierra-apache-mysql-and-php-7-with-sslhttps

	- edit /etc/apache2/httpd.conf
	- changed DocumentRoot to "Users/jaxoncramer/Sites/Blog"
	- loaded PHP 7 module in http.conf
	- enabled mod_rewrite to use Rewrite Rules
	- set AllowOverride All to make .htaccess work
	- turn on ssl/https on local host

- Install MySQL
	- 127.0.0.1, user-name: root, password: {computer password}
	- added new database called mydb
	- added new table called mytable
	- downloaded SequelPro, however use RazorSQL to connect to database

- create index.php in Users/jaxoncramer/Sites/Blog
	- connects to mydb and prints out value from mytable
	- downloaded Bootstrap 4.0.0 and put basic css and js files into Sites/Blog/assets

Day 2 - 2/8/2018

- reference https://css-tricks.com/gulp-for-beginners/
- Installed Gulp globally on Mac 
	- gulp command located at /usr/local/bin/gulp 
	- gulp source files located at /usr/local/lib/node_modules/gulp/
	- gulp command source at /usr/local/lib/node_modules/gulp/bin/gulp.js
- Created new project in Sites folder called GulpProject
	- run npm init
	- run npm install gulp —save-dev and npm install gulp-sass —save-dev
		- note: gulp-sass is a version of LibSass to convert Sass to CSS
	- run npm install gulp-useref —save-dev
		- used to concatenate and minify Javascript and CSS files into a single file
- Created gulpfile.js
	- set Sass task in gulp file.js that will convert Sass to CSS when run
	- create watch task that will run gulp tasks when a file is saved
	- create browser-sync task that will update the browser automatically when a file is saved
		- works for .scss, .html, and .js files
	- NOTE: files beginning in an underscore are a partial in Sass and will not compile with Gulp-Sass
	- created tasks for gulp build, gulp clean, etc.
	- default task (I.e. just ‘gulp’) is a clone of ‘gulp watch’
	- added gulp-postcss to combine multiple PostCSS tasks
		- replace gulp-cssnano with cssnano and added npm install -D autoprefixer
		- used gulp-postcss to run both from within the useref task
		- added autoprefixing to watch task

