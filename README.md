<p align="center">
  <img src="https://i.imgur.com/zuNqu4q.png" width="300px" height="300px"/>
  <h2>Whiteboard</h2>
</p>

Collaborative whiteboarding powered by SocketIO.

# Arhitecture
The project is divided into two categories - server and client. This means that the whole app doesn't have to solely sit on the same server.

# Preview
<img src="https://i.imgur.com/U2q9DBf.png">
<img src="https://media.discordapp.net/attachments/755802883869638723/904683792126590996/unknown.png">

# Getting started ⚙️
- Fetch the repository and install required packages with your package manager. 
- Configure reverse proxy (depends on your web server)
- Move the client side to web server folder (in order to make it appear in the first place). 
- Configure client/main.js socketIO address if neccessary (in case you wish to run the server on different port)
- Start the server! 🚀

A useful note is that you are running under HTTPS, you need to specify it inside the client/main.js file.
