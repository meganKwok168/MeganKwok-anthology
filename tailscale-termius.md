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

$ docker-compose down

testing:
in droplet
$ ssh [env specified ssh_user]@localhost -p [env specified host_port]

droplet isn't connected to tailnet, but u can ssh into that port using any other device connected to tailnet

in tailnet connected device:
$ ssh [env specified ssh user]@[box host name] -p [env specified host port]


auth keys in .env
generate auth key in tailscale settings --> keys, make reusable


docker-compose.yaml ============================================================================
```
services:
  tailscale1:
    image:  tailscale/tailscale:latest
    container_name: tailscale1
    hostname: dockerBox1
    env_file:
      - .env
    ports:
      - "${HOST_PORT}:2222" #pulls from the env file
    volumes: #what u borrow from the droplet
      - tailscale1Vol-state:/var/lib/tailscale
      - /dev/net/tun:/dev/net/tun
    cap_add: # privileges linked to accounts granted to the sidecar
      - NET_ADMIN
      - NET_RAW
    restart: unless-stopped
  ssh-workspace: #container(box) 1
    # ask box to be open ssh server
    image: lscr.io/linuxserver/openssh-server:latest
    container_name: ssh-workspace
    # set the env in the box --> or u can write it in the .env
    environment:
      - PUID=1000
      - PGID=1000
      - USER_NAME=${SSH_USER}
      - PASSWORD_ACCESS=true
      - USER_PASSWORD=${SSH_PASSWORD} # Pulls from the .env file
      - PACKAGES=curl,wget,git,tmux,vim,htop
    network_mode: "service:tailscale1" #service: your sidecar name
    volumes:
      - ssh-config:/config
    depends_on:
      - tailscale1
    restart: unless-stopped
volumes:
  ssh-config:
  tailscale1Vol-state:
```

.env =================================
```
# SSH Account Configuration
SSH_USER=smth
SSH_PASSWORD=smthpassword

# System Configuration
HOST_PORT=numbers

# Tailscale Configuration
TS_AUTHKEY=tskey-auth-blahblahblah
TS_STATE_DIR=/var/lib/tailscale
```

# more notes
- I made another box that's basically the duplicate of dockerBox1 as dockerBox2
- because you have to access these dockerboxes through the other devices connected onto tailnet, you can access dockerBox2 after you ssh into dockerBox1
- however, from the laptop already connected onto tailnet, you can just directly ssh into dockerBox2



# ACL: Access Control Lists
https://tailscale.com/docs/features/access-control/acls 
* series of rules and permissions that govern how and where data can flow within your tailnet
* default: allows every device to talk to every other device within your tailnet
* tailnet is designed around the concept of least privilege
  * wait i don't get it, bc shouldn't that mean that you have to configure it instead of it just giving privilege to everything?
* has mesh architecture -- what is that
  * and what's the alternative: hub and spoke?
  * but apparently mesh architecture gives you more control
*  every tailscale connection is direct device-to-device
*  








    




