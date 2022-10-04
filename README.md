# Bug example

https://github.com/cloudflare/wrangler2/issues/1972

## Steps to reproduce

### System

| Tool     | Version                       |
| -------- | ----------------------------- |
| OS       | MacOS Monterey 12.5.1 (21G83) |
| node     | v18.9.0                       |
| wrangler | 2.0.24                        |

### Start Server

```
npm start
```

### Examples

Content Length header present if value under 48

```
➤ curl --head "http://localhost:8787?length=47"
HTTP/1.1 200 OK
date: Tue, 04 Oct 2022 16:59:19 GMT
content-type: text/plain
content-length: 47
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=Ng%2BQWnIWz0DaXakvEmv8lLgSqLzdWtuJE%2FH5nIduJh3G5cf6W2n%2Fsdc8iuE8%2BNbNoH%2BhJRF1e1DGUpczCy%2BXzfO7RAbdbk5xkXGE2fcZeHBVu%2BIBsz%2BHlK6P61Vt7MFP49quJEmZVRV%2Fi3P49K9U6uJI"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
vary: Accept-Encoding
cf-ray: 754f77a95a82841f-YVR
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
server: cloudflare
Connection: keep-alive
Keep-Alive: timeout=5
```

Content Length missing if bytes value greater than or equal to 48

```
➤ curl --head "http://localhost:8787?length=48"
HTTP/1.1 200 OK
date: Tue, 04 Oct 2022 16:59:54 GMT
content-type: text/plain
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=AqPocngQtVjAHD41NBVzza2dydjjzbeHBsmWDY6enUfRYleL5bYB8xZK3nBjOYwVnXO4hh%2Bny44n5xf%2FiKY3qz%2FT6BSqhxrX%2FF6XoP41czG3jmr6FJ9VE%2Fml54amiMNUwG%2F3YHvvYEdX9y5V%2FsTOXIKW"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
vary: Accept-Encoding
cf-ray: 754f787f09bd841f-YVR
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
server: cloudflare
Connection: keep-alive
Keep-Alive: timeout=5
```

Content Length header present if Content-Type ommited

```
➤ curl --head "http://localhost:8787?length=48&no-content-type"
HTTP/1.1 200 OK
date: Tue, 04 Oct 2022 17:01:09 GMT
content-length: 48
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=xDHAQdLiKNp4zlTEf75RcMoSeFcjQ%2FaTjUCkTTTUomLCRElNeDL03ObrsBk1TZpuCpZjQUZqRTXjumB%2FNa1nehpEailrldpSZz6hzw3WlnkldNG8vso4FItdht3Kxdizeq2TwJLw82x4yxWLX%2BJIjExt"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
vary: Accept-Encoding
cf-ray: 754f7a54dc7b841f-YVR
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
server: cloudflare
Connection: keep-alive
Keep-Alive: timeout=5
```
