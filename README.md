# sld_webApp

### Servers
Development servers running on Hetzner(darkcloud and darkcloud2)\
Production servers on Baadal with domain readabled.com
### Domains
Other testing domain include :\
readabled.com [Master Branch]\
sldapp.tk\
sldapp.ml\
dyslx.ashirbad.me (to be removed soon)
### Multiple Apps
Most of the development servers have multiple NodeJs instances running at the same time. These run in the localhost.
An NGINX web-server listens in a public port like 443 and reverse proxy all the incoming request according to the domain to their respective ports on which the Nodejs applications are running.
Mail is setup to use Ashirbad Samantaray's cPanel email hosting by Namecheap.
### DNS Records
	The DNS of most of these domains are hosted on Cloudflare by pointing to their nameservers.
	In A record we add the IP address to which the domain should result to.
	In A record we add the 'mail' name with the value to the IP address of our CPanel Hosting -> mail.domain.extension maps to the hosting
	In MX record we add '@' value to the mail.domain.extension to configure our emails.
	In TXT record we add a value given by the cPanel hosting for verifying the domain.
### SSL
For SSL, all requests are forced to https, and using Cloudflare SSL certificates are generated, these certificates are then used by our NGINX web-server.

### App Versions Description
readabled.com:\
Runs on Baadal Server at localhost:8080
