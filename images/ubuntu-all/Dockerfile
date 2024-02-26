 # Made By Leviathenn
FROM ubuntu
RUN apt-get update 
RUN apt-get upgrade
RUN apt-get install sudo 
RUN apt-get install wget curl clang clangd gcc make cmake lua5.2 python3-pip telnet

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
RUN mkdir /workspace
RUN clear

RUN groupadd -r taskdaemon
RUN groupadd np
RUN useradd -r -g taskdaemon taskdaemon
RUN useradd -g np np
WORKDIR /tmp/setup
RUN wget https://127.0.0.1:21075/td.service