# connect your devices
1. Set up tailscale on your home device(can be on WSL).
   * go to tailscale.com for instructions
   * $ sudo tailscale up
2. Set up tailscale on your phone.
   * download tailscale app
3. Verify the devices are on your tailscale.com admin page.
   
4. Set up ssh server on your home device. (can be on WSL but must be on the same device as your tailscale device)
    * $ sudo apt update && sudo apt install openssh-server -y
    * $ sudo service ssh start
    * $ sudo service ssh start 2>/dev/null (this adds to .bashrc)
    * $ sudo service ssh status (to check)
    * $ sudo tailscale set --ssh (afterwards, you should go to tailscale, and look at ur tailnet, ad there should be an ssh tag)
    * click on three dots, and start SSH session
5. Set up an ssh client on your phone. E.g. https://termius.com/
    * when asked for ip: $ tailscale ip (on your home device = laptop)
6. You can now ssh onto your personal device from your phone without having to worry about port forwarding
    * on termius, go to connections on the bottom and then ssh by the searchbar
Note: You have to use your data, not the school wifi for this
- try when both devices are on same wifi, and then also when you put data on ur phone

https://tailscale.com/docs/features/containers/docker







docker-compose.yaml --> creates a bunch of docker containers
----> kind of defines all the containers like a dictionary 
----> then you do like a for loop through the containers when u do docker-compose up or down

side-car --> specialized container that's like harry's seat on Hagrid' moto

image --> settings of the container -- specifies what u want the container to be

environment -->
- PUID --> user id (root = 0, all the other users have an id that isn't 0) -- specifies who u are ssh-ing as (account ex: mkwok60, your permissions)
- PGID --> group id


tailscale --> adds devices to a network

sidecar ports --> handles interaction of machines, can acc tlak to the other boxes
box ports --> network is open to anyone
sidecar ports --> specifies which ports can be used

$ docker-compose up -d

testing:
in droplet
$ ssh [env specified ssh_user]@localhost -p [env specified host_port]
droplet isn't connected to tailnet, but u can ssh into that port using any other device connected to tailnet

auth keys in .env
generate auth key in tailscale settings --> keys, make reusable







