如何在linux系统跑一个web静态资源项目呢，其实很简单。linux就是一个电脑，其实和window一样，window是基于可视化，linux是命令行；nginx其实就是一个软件，专门跑web的；和QQ差不多的，linux有linux版本，window有window版本。使用就是看官网文档，写好配置，设置好合适的端口跑起来就可以了。就是玩QQ;

### 切换root角色
> su root 
输入密码就可以了

### 安装
1.   sudo apt-get install nginx    
   >/usr/sbin/nginx：主程序
/etc/nginx：存放配置文件
/usr/share/nginx：存放静态文件
/var/log/nginx：存放日志
2. 到官网下压缩包再上传到linux，解压，安装。

###  启动
任何路径下，`ngnix`是启动    
`ngnix -s reload` 是重新启动
或者
到`/usr/sbin/`目录下 运行 `./ngnix`
到`/usr/sbin/`目录下 运行 `./ngnix -s reload` 是重新启动

`ngnix -s reload` 是停止启动

### 修改配置
到`/etc/nginx` 运行`vim nginx.conf` 修改配置
一个例子
 ```

#user  nobody;
user  nginx;
worker_processes  4;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" $request_time' $upstream_response_time;

    #log_format main '$remote_addr - [$time_local] "$request" "$request_time" "$status"  '
	#		    '"$body_bytes_sent" "$http_referer" "$http_x_forwarded_for" "$http_user_agent"  '
	#		    '"$http_host" "$http_x_forwarded_host" "$upstream_addr"';

    access_log  logs/access.log  main;

    sendfile        on;
    client_max_body_size 10m;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
    upstream centrality-gateway{
       server 29.0.184.199:8080 weight=1;
       server 29.0.184.200:8080 weight=1;
       server 29.0.184.201:8080 weight=1;
    }

    server {
        listen       8080;
        server_name  域名;

        location / {
            root   /home/nginx/app/static/cloudpaybm;
            index  index.html index.htm;
        }
  
        location /nginx_status {
            stub_status on;
            access_log off;
        }

        location /api/bank/ {
            proxy_pass http://centrality-gateway/centrality-aggregation/bank/;
            proxy_redirect      off; 
            proxy_set_header          Host $host;   
            proxy_set_header          X-Real-IP $remote_addr; 
            proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;     
            client_max_body_size    10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout      1000;
            proxy_read_timeout      1000;
            proxy_buffer_size       128k;
            proxy_buffers         4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }
		
        location /api/open/ {
            proxy_pass http://centrality-gateway/centrality-aggregation/open/;
            proxy_redirect      off; 
            proxy_set_header          Host $host;   
            proxy_set_header          X-Real-IP $remote_addr; 
            proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;     
            client_max_body_size    10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout      1000;
            proxy_read_timeout      1000;
            proxy_buffer_size       128k;
            proxy_buffers         4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }
		
        location /api/public/ {
            proxy_pass http://centrality-gateway/centrality-aggregation/public/;
            proxy_redirect      off;
            proxy_set_header          Host $host;
            proxy_set_header          X-Real-IP $remote_addr;
            proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout      1000;
            proxy_read_timeout      1000;
            proxy_buffer_size       128k;
            proxy_buffers         4 128k;
            proxy_busy_buffers_size 258k;  
            proxy_temp_file_write_size 128k;
        }

        location /api/branch-names {
            proxy_pass http://centrality-gateway/centrality-aggregation/branch-names;
            proxy_redirect      off;
            proxy_set_header          Host $host;
            proxy_set_header          X-Real-IP $remote_addr;
            proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout      1000;
            proxy_read_timeout      1000;
            proxy_buffer_size       128k;
            proxy_buffers         4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


    server {   
        listen       8080; 
        server_name  域名;
  
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
  
        location / {   
            root  /home/nginx/app/static/cloudpaycm;      
            index  index.html index.htm;
        }

        location /api/organ/ {	
            proxy_pass http://centrality-gateway/centrality-aggregation/organ/;	
            proxy_redirect        off;
            proxy_set_header	  Host $host;
            proxy_set_header	  X-Real-IP $remote_addr;
            proxy_set_header	  X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout	    1000;
            proxy_read_timeout	    1000;
            proxy_buffer_size	    128k;
            proxy_buffers	      4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }

        location /api/business/ {
            proxy_pass http://centrality-gateway/centrality-aggregation/business/;
            proxy_redirect        off;
            proxy_set_header	  Host $host;
            proxy_set_header	  X-Real-IP $remote_addr;
            proxy_set_header	  X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout	    1000;
            proxy_read_timeout	    1000;
            proxy_buffer_size	    128k;
            proxy_buffers	      4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }
		
        location /api/open/ {
            proxy_pass http://centrality-gateway/centrality-aggregation/open/;
            proxy_redirect      off; 
            proxy_set_header          Host $host;
            proxy_set_header          X-Real-IP $remote_addr;
            proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m; 
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout      1000;
            proxy_read_timeout      1000;
            proxy_buffer_size       128k;
            proxy_buffers         4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }

        location /api/public/ {
            proxy_pass http://centrality-gateway/centrality-aggregation/public/;
            proxy_redirect      off; 
            proxy_set_header          Host $host;   
            proxy_set_header          X-Real-IP $remote_addr; 
            proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;     
            client_max_body_size    10m; 
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout      1000;
            proxy_read_timeout      1000;
            proxy_buffer_size       128k;
            proxy_buffers         4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }

        location /api/branch-names {
            proxy_pass http://centrality-gateway/centrality-aggregation/branch-names;
            proxy_redirect      off; 
            proxy_set_header          Host $host;
            proxy_set_header          X-Real-IP $remote_addr;
            proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout   1000;
            proxy_send_timeout      1000;
            proxy_read_timeout      1000;
            proxy_buffer_size       128k;
            proxy_buffers         4 128k;
            proxy_busy_buffers_size 258k;
            proxy_temp_file_write_size 128k;
        }

        error_page   500 502 503 504  /50x.html;  
        location = /50x.html { 
            root   html;  
        } 

    }

}

  ```

> 注意点：尽量不要使用`win10的`那个linux子系统，因为内部的软件还是执行在window系统上，会有问题的。尽量使用同事阿洲建议的`ubuntu + VirtualBox`组合吧 ； `ubuntu`  是apt方式按照软件
也可以不同按照，直接使用阿里云的liunx系统哈哈；



