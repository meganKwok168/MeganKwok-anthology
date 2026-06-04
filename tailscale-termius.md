# connect your devices
1. Set up tailscale on your home device(can be on WSL).
   * go to tailscale.com for instructions
3. Set up tailscale on your phone.
4. Verify the devices are on your tailscale.com admin page.
5. Set up ssh server on your home device. (can be on WSL but must be on the same device as your tailscale device)
6. Set up an ssh client on your phone. E.g. https://termius.com/
7. You can now ssh onto your personal device from your phone without having to worry about port forwarding.
Note: You have to use your data, not the school wifi for this



$ sudo apt update && sudo apt install openssh-server -y
$ sudo service ssh start
$ sudo service ssh start 2>/dev/null (this adds to .bashrc)
$ sudo service ssh status (to check)

download termius on app store


$ tailscale ip



https://tailscale.com/docs/features/containers/docker
