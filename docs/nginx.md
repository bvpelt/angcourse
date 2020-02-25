# Nginx

Installing webserver on ubuntu eoan see https://www.cyberciti.biz/faq/install-and-configure-nginx-on-ubuntu-linux-18-04-lts/

## Install software

```bash
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install nginx
```

## Add user

```bash
$ sudo useradd -s /usr/sbin/nologin -m -d /home/webapp/ -c 'www.webapp user' www-webapp
$ sudo passwd -l www-webapp
$ sudo mkdir -v /home/webapp/http/
```

## Add content

```bash
$ # copy files
$ sudo chown -vR www-webapp:www-webapp /home/webapp/
```

## Update configuration

```bash
$ sudo vi /etc/nginx/sites-available/http.www.webapp.conf
```

Content of /etc/nginx/sites-available/http.www.webapp.conf
```
# our first virtual host www.webapp
server {
    listen      80;             # port
    server_name www.webapp; # dns server name
 
    # log files
    access_log  /var/log/nginx/www.webapp_access.log;
    error_log   /var/log/nginx/www.webapp_error.lg;
 
    # document root where files stores for www.webapp domain
    root /home/webapp/http;
    index index.html index.htm;
}
```

## Activate content

```bash
$ cd /etc/nginx/sites-enabled/
$ sudo ln -v -s /etc/nginx/sites-available/http.www.webapp.conf .
```

## Test and restart

```bash
$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

$ # add www.webapp 127.0.0.1 to /etc/host file
$ sudo systemctl reload nginx
```

## Disable nginx

To disable automatic startup of nginx

```bash
$ sudo systemctl disable nginx
```

## Enable automatic start of nginx

To enable automatic startup of nginx

```bash
$ sudo systemctl enable nginx
```

## Stop

To stop nginx

```bash
$ sudo systemctl stop nginx
```

## Start

To start nginx

```bash
$ sudo systemctl start nginx
```

## Restart

To restart nginx

```bash
$ sudo systemctl restart nginx
```

## Reload

To reload nginx configuration

```bash
$ sudo systemctl reload nginx
```
