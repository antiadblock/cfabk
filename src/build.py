#!/usr/bin/python
style = ""
for line in open("stylesheets/cfabk.css"):
  style += line.replace("\n"," ").replace("\t"," ").replace("  "," ")
  
javascript = "// ###################################\n// THIS FILE IS GENERATED, DO NOT EDIT\n// ###################################\n\n"
for line in open("javascripts/cfabk.js"):
    javascript += line.replace("STYLEHERE",style)


f = open("../public/javascripts/cfabk.js",'w')
f.write(javascript)

