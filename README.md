# zero-ext README

This is the README for a VS code extension "zero-ext" used to run Local LLM's..
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


Once installed replace the extension.ts, package.json and the tsconfig.json in your VS code extension path.

To get it up and running you can run the >debug mode in VS code
Followed by cmd + shift + p
Run the extension and you should now be running a local VS code LLM.


Check out Fireship.io for more tutorials,
https://www.youtube.com/watch?v=clJCDHml2cA
https://fireship.io/courses/


**Enjoy!**
