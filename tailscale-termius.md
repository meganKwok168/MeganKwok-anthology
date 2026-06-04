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
