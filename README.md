# zero-ext README

This is the README for a VS code extension called "Zero" used to run Local LLM's.. for free.
Built following fireship.io tutorial.

## Features

This VS extension works in conjuction with Ollama and run models such as DeepSeek.


## Requirements

The model being run will be dependendant on your computer hardware, I recommend starting with a lower model e.g. DeepSeek-R1-Distill-Qwen-1.5B if you are unsure.

Rough guide:
 - 8gb ram - DeepSeek-R1-Distill-Qwen-1.5B
 - 16gb ram - DeepSeek-R1-Distill-Llama-8B
 - 32gb ram - DeepSeek-R1-Distill-Qwen-14B


## Known Issues

Initial tests with DeepSeek have resulted in some halucinations if instructions are not clear.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

//### 1.0.1



## Guide & Requirements

This project requires the following dependencies,

https://nodejs.org/en 

https://yeoman.io



Implement this VS code extensionm template, 

npx --package yo --package generator-code -- yo code

alternate extension build https://www.npmjs.com/package/generator-code



Download and install Ollama from https://ollama.com or https://github.com/ollama/ollama/blob/main/docs/faq.md#how-does-ollama-handle-concurrent-requests

ollama run llama3.2


Within ollama download the model you would like to use, 
e.g. Deepseek https://ollama.com/library/deepseek-r1:8b
- ensure the model is appropriate for the spec of the machine it is being run on.

additionally add the es6-string-html extension in VS code for Syntax Highlighting.

Once installed replace the extension.ts, package.json and the tsconfig.json in your VS code extension path.

To get it up and running you can run the >debug mode in VS code

<img width="612" alt="debug" src="https://github.com/user-attachments/assets/8a5f36cf-fbba-4d93-afda-e7f28ad6cb89" />


Followed by cmd + shift + p


<img width="677" alt="exten" src="https://github.com/user-attachments/assets/24abc831-b869-4cd3-b230-accff88eee64" />



Run the extension and you should now be running a local VS code LLM.

<img width="1210" alt="zero" src="https://github.com/user-attachments/assets/d28e5d5d-926a-442b-98ab-bf942b11eeb3" />



Initial tutorial by Fireship.io, Check out there channel for more tutorials,
https://www.youtube.com/watch?v=clJCDHml2cA
https://fireship.io/courses/


**Enjoy!**
