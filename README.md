# ScotlandYardFrontEnd4WC
Scotland Yard is a board game published in 1983. Originally, the game saw players chasing Mr. X around the streets of London, working together to identify the location of the mysterious man. In the 4 Week Challenge version of Scotland Yard, you'll find yourself chasing your lecturers around the streets of Preston. It will be their job to dodge, duck, dip, dive and dodge the pesky students who keep trying to ask questions they don't know the answer to.

## Getting Set Up
### Environment
The Scotland Yard: 4 Week Challenge front end does not require much setup, as it is built using HTML5, CSS3, and JavaScript. 

#### Remote Web Server
If you're running a web server, you'll need to clone the contents of this repository to your root web directory, this is often /var/www for apache web servers or /usr/share/nginx/htdocs for Nginx webservers. Once you have cloned the content, be sure to follow the image section once you have done this. 

#### Local
Clone this repository to your local machine, follow the images section, and then open up index.html file to use the front end.

### Images
All maps need to be held in an images folder, you can modify the location of the images folder in Globals.js by changing the value of the constant 'IMAGES_DIR'. Note this variable is relative to index.html, you should not specify absolute paths.

## Using This Application
### Viewing A Game
You can view the current status of a game by clicking the 'View active games' button at the top right, and finding your Game ID in the table. Once you have found your Game ID, click on the link to show a map of the game.

### Controlling A Game
Note that the front end does not provide capability to control the state of the game (and nor should it). The goal of this project is to teach students to program an app which controls the game, this purpose of this is purely to visualise the current state of the game board.